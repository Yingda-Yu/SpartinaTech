import type { NextApiRequest, NextApiResponse } from "next";
import { authenticateBearerToken } from "@/auth";
import { sendTextMessage, sendImageMessage, sendFileMessage } from "@/feishu";
import { IdempotencyStore, createIdempotencyStore, isProduction, getRedisConfig } from "@/idempotency";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp";
import * as z from "zod";

let idempotencyStore: IdempotencyStore | null = null;
let redisInitialized = false;

function getOrCreateIdempotencyStore(): IdempotencyStore {
  if (!redisInitialized) {
    try {
      idempotencyStore = createIdempotencyStore();
    } catch (e) {
      if (isProduction()) {
        throw e;
      }
      idempotencyStore = null;
    }
    redisInitialized = true;
  }

  if (!idempotencyStore) {
    throw new Error("Idempotency store not available");
  }

  return idempotencyStore;
}

function checkRedisForProduction(): void {
  if (isProduction()) {
    const { url, token } = getRedisConfig();
    if (!url || !token) {
      throw new Error("Redis configuration is required in production");
    }

    const store = getOrCreateIdempotencyStore();
    if (!store.isReady()) {
      throw new Error("Redis connection failed in production");
    }
  }
}

async function processToolCall(toolName: string, toolArguments: Record<string, unknown>) {
  const chatId = process.env.FEISHU_CHAT_ID?.trim() || "";
  const idempotencyKey = toolArguments.idempotency_key as string;
  const title = toolArguments.title as string | undefined;
  const fullKey = `feishu-mcp:${toolName}:${chatId}:${idempotencyKey}`;

  console.log(`[MCP] processToolCall key=${fullKey}`);

  const store = getOrCreateIdempotencyStore();

  const getCachedResult = async (waitForProcessing: boolean = false): Promise<unknown | null> => {
    const cached = await store.get(fullKey);
    if (!cached) {
      console.log(`[MCP] getCachedResult: no cache`);
      return null;
    }

    const record = cached as any;

    if (record.status === 'sent' && record.result) {
      console.log(`[MCP] getCachedResult: found sent record`);
      return record.result;
    }

    if (record.status === 'processing' && waitForProcessing) {
      console.log(`[MCP] getCachedResult: waiting for processing...`);
      for (let i = 0; i < 15; i++) {
        await new Promise(resolve => setTimeout(resolve, 300));
        const updated = await store.get(fullKey);
        if (!updated) return null;
        const updatedRecord = updated as any;
        if (updatedRecord.status === 'sent' && updatedRecord.result) {
          console.log(`[MCP] getCachedResult: found sent record after waiting`);
          return updatedRecord.result;
        }
        if (updatedRecord.status === 'failed') {
          console.log(`[MCP] getCachedResult: found failed record`);
          throw new Error(updatedRecord.error || "Message sending failed");
        }
      }
      console.log(`[MCP] getCachedResult: timeout waiting`);
      throw new Error("Message is currently being processed");
    }

    console.log(`[MCP] getCachedResult: returning null for status=${record.status}`);
    return null;
  };

  const cachedResult = await getCachedResult(true);
  if (cachedResult) {
    console.log(`[MCP] returning cached result`);
    const cached = cachedResult as { delivered: boolean; message_id: string; chat_id: string; timestamp: number; [key: string]: unknown };
    return {
      content: [{ type: "text" as const, text: `Message already sent: ${cached.message_id}` }],
      structuredContent: {
        delivered: true,
        duplicate: true,
        message_id: cached.message_id,
        chat_id: cached.chat_id,
        timestamp: cached.timestamp,
        idempotency_key: idempotencyKey,
        ...extractExtraFields(cached),
      },
    };
  }

  const acquired = await (store as any).setProcessing?.(fullKey);
  console.log(`[MCP] setProcessing returned: ${acquired}`);
  if (acquired === false) {
    console.log(`[MCP] lock not acquired, waiting...`);
    for (let i = 0; i < 15; i++) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const waitingResult = await getCachedResult();
        if (waitingResult) {
          console.log(`[MCP] found cached result while waiting`);
          const cached = waitingResult as { delivered: boolean; message_id: string; chat_id: string; timestamp: number; [key: string]: unknown };
          return {
            content: [{ type: "text" as const, text: `Message already sent: ${cached.message_id}` }],
            structuredContent: {
              delivered: true,
              duplicate: true,
              message_id: cached.message_id,
              chat_id: cached.chat_id,
              timestamp: cached.timestamp,
              idempotency_key: idempotencyKey,
              ...extractExtraFields(cached),
            },
          };
        }
      const cached = await store.get(fullKey);
      const record = cached as any;
      if (record?.status === 'failed') {
        throw new Error(record.error || "Message sending failed");
      }
    }
    throw new Error("Message is currently being processed");
  }

  console.log(`[MCP] lock acquired, sending message`);
  try {
    let sendResult: { message_id: string; chat_id: string; [key: string]: unknown };

    switch (toolName) {
      case "feishu_send_message": {
        const text = toolArguments.text as string;
        if (!text) {
          throw new Error("Missing required argument: text");
        }
        const fullText = title ? `【${title}】\n${text}` : text;
        sendResult = await sendTextMessage(fullText);
        break;
      }
      case "feishu_send_image": {
        const url = toolArguments.url as string;
        if (!url) {
          throw new Error("Missing required argument: url");
        }
        sendResult = await sendImageMessage(url, title);
        break;
      }
      case "feishu_send_file": {
        const url = toolArguments.url as string;
        if (!url) {
          throw new Error("Missing required argument: url");
        }
        sendResult = await sendFileMessage(url, title);
        break;
      }
      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }

    const responseResult = {
      delivered: true,
      duplicate: false,
      message_id: sendResult.message_id,
      chat_id: sendResult.chat_id,
      timestamp: Date.now(),
      idempotency_key: idempotencyKey,
      ...extractExtraFields(sendResult),
    };

    console.log(`[MCP] calling store.set with message_id=${sendResult.message_id}`);
    await store.set(fullKey, responseResult);
    console.log(`[MCP] store.set completed`);

    return {
      content: [{ type: "text" as const, text: `Message sent successfully: ${sendResult.message_id}` }],
      structuredContent: responseResult,
    };
  } catch (e) {
    console.log(`[MCP] error occurred: ${e instanceof Error ? e.message : String(e)}`);
    const errorMessage = e instanceof Error ? e.message : String(e);
    await (store as any).setFailed?.(fullKey, errorMessage);
    throw e;
  }
}

function extractExtraFields(result: { [key: string]: unknown }): Record<string, unknown> {
  const { delivered, duplicate, message_id, chat_id, timestamp, idempotency_key, ...rest } = result as any;
  return rest;
}

function createMcpServer(): McpServer {
  const server = new McpServer({
    name: "Spartina Feishu MCP",
    version: "0.1.0",
    description: "MCP server for Feishu message sending",
  }, {
    capabilities: {
      logging: {},
    },
  });

  server.registerTool("feishu_send_message", {
    description: "Send a text message to the configured Feishu group",
    inputSchema: z.object({
      text: z.string().describe("Message text (1-4000 characters)"),
      title: z.string().describe("Optional message title").optional(),
      idempotency_key: z.string().describe("Idempotency key to prevent duplicate messages"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  }, async ({ text, title, idempotency_key }) => {
    checkRedisForProduction();
    return processToolCall("feishu_send_message", { text, title, idempotency_key });
  });

  server.registerTool("feishu_send_image", {
    description: "Send an image to the configured Feishu group",
    inputSchema: z.object({
      url: z.string().describe("Image URL (HTTPS only, max 10MB)"),
      title: z.string().describe("Optional message title").optional(),
      idempotency_key: z.string().describe("Idempotency key to prevent duplicate messages"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  }, async ({ url, title, idempotency_key }) => {
    checkRedisForProduction();
    return processToolCall("feishu_send_image", { url, title, idempotency_key });
  });

  server.registerTool("feishu_send_file", {
    description: "Send a file (ZIP, PDF, DOCX, etc.) to the configured Feishu group",
    inputSchema: z.object({
      url: z.string().describe("File URL (HTTPS only, max 10MB)"),
      title: z.string().describe("Optional message title").optional(),
      idempotency_key: z.string().describe("Idempotency key to prevent duplicate messages"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  }, async ({ url, title, idempotency_key }) => {
    checkRedisForProduction();
    return processToolCall("feishu_send_file", { url, title, idempotency_key });
  });

  return server;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authorization = req.headers.authorization || null;

  if (!authenticateBearerToken(authorization)) {
    return res.status(401).json({ id: null, jsonrpc: "2.0", error: { code: -32601, message: "Unauthorized" } });
  }

  try {
    const server = createMcpServer();

    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
      enableJsonResponse: true,
    });

    await server.connect(transport);

    await transport.handleRequest(req, res, req.body);

    res.on("close", () => {
      transport.close();
      server.close();
    });

  } catch (error) {
    console.error("[MCP] Error handling request:", error);
    if (!res.headersSent) {
      const message = error instanceof Error ? error.message : String(error);
      res.status(500).json({
        jsonrpc: "2.0",
        error: {
          code: -32603,
          message: "Internal server error",
        },
        id: null,
      });
    }
  }
}
