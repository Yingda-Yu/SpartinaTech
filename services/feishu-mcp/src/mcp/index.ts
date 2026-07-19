import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { sendTextMessage, sendImageMessage, sendFileMessage } from "@/feishu";
import { IdempotencyStore, createIdempotencyStore, IdempotencyRecord, isProduction, getRedisConfig } from "@/idempotency";

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

export function setIdempotencyStore(store: IdempotencyStore): void {
  idempotencyStore = store;
  redisInitialized = true;
}

export const mcpServer = new McpServer(
  { name: "Spartina Feishu MCP", version: "0.1.0" },
  {
    capabilities: {
      tools: {},
    },
    instructions: "Send messages and files to Feishu groups.",
  }
);

async function handleToolCall(
  toolName: string,
  idempotencyKey: string,
  title: string | undefined,
  sendFn: () => Promise<{ message_id: string; chat_id: string; [key: string]: unknown }>
) {
  const chatId = process.env.FEISHU_CHAT_ID?.trim() || "";
  const fullKey = `feishu-mcp:${toolName}:${chatId}:${idempotencyKey}`;

  const store = getOrCreateIdempotencyStore();

  const getCachedResult = async (): Promise<unknown | null> => {
    const cached = await store.get(fullKey);
    if (!cached) return null;

    const record = cached as IdempotencyRecord;
    if (record.status === 'sent' && record.result) {
      return record.result;
    }
    return null;
  };

  const cachedResult = await getCachedResult();
  if (cachedResult) {
    const result = cachedResult as {
      delivered: boolean;
      message_id: string;
      chat_id: string;
      timestamp: number;
      idempotency_key: string;
      [key: string]: unknown;
    };
    return {
      content: [{ type: "text" as const, text: `Message already sent: ${result.message_id}` }],
      structuredContent: {
        delivered: true,
        duplicate: true,
        message_id: result.message_id,
        chat_id: result.chat_id,
        timestamp: result.timestamp,
        idempotency_key: idempotencyKey,
        ...extractExtraFields(result),
      },
    };
  }

  const acquired = await (store as any).setProcessing?.(fullKey);
  if (acquired === false) {
    for (let i = 0; i < 10; i++) {
      await new Promise(resolve => setTimeout(resolve, 200));
      const waitingResult = await getCachedResult();
      if (waitingResult) {
        const result = waitingResult as {
          delivered: boolean;
          message_id: string;
          chat_id: string;
          timestamp: number;
          idempotency_key: string;
          [key: string]: unknown;
        };
        return {
          content: [{ type: "text" as const, text: `Message already sent: ${result.message_id}` }],
          structuredContent: {
            delivered: true,
            duplicate: true,
            message_id: result.message_id,
            chat_id: result.chat_id,
            timestamp: result.timestamp,
            idempotency_key: idempotencyKey,
            ...extractExtraFields(result),
          },
        };
      }
    }
    throw new Error("Message is currently being processed");
  }

  try {
    const result = await sendFn();

    const responseResult = {
      delivered: true,
      duplicate: false,
      message_id: result.message_id,
      chat_id: result.chat_id,
      timestamp: Date.now(),
      idempotency_key: idempotencyKey,
      ...extractExtraFields(result),
    };

    await store.set(fullKey, responseResult);

    return {
      content: [{ type: "text" as const, text: `Message sent successfully: ${result.message_id}` }],
      structuredContent: responseResult,
    };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    await (store as any).setFailed?.(fullKey, errorMessage);
    throw e;
  }
}

function extractExtraFields(result: { [key: string]: unknown }): Record<string, unknown> {
  const { delivered, duplicate, message_id, chat_id, timestamp, idempotency_key, ...rest } = result as any;
  return rest;
}

mcpServer.registerTool(
  "feishu_send_message",
  {
    description: "Send a text message to the configured Feishu group",
    inputSchema: z.object({
      text: z.string().min(1).max(4000).describe("Message text (1-4000 characters)"),
      title: z.string().optional().describe("Optional message title"),
      idempotency_key: z.string().min(1).describe("Idempotency key to prevent duplicate messages"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  },
  async ({ text, title, idempotency_key }) => {
    const fullText = title ? `【${title}】\n${text}` : text;
    return await handleToolCall("feishu_send_message", idempotency_key, title, () => sendTextMessage(fullText));
  }
);

mcpServer.registerTool(
  "feishu_send_image",
  {
    description: "Send an image to the configured Feishu group",
    inputSchema: z.object({
      url: z.string().url().describe("Image URL (HTTPS only, max 10MB)"),
      title: z.string().optional().describe("Optional message title"),
      idempotency_key: z.string().min(1).describe("Idempotency key to prevent duplicate messages"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  },
  async ({ url, title, idempotency_key }) => {
    return await handleToolCall("feishu_send_image", idempotency_key, title, () => sendImageMessage(url, title));
  }
);

mcpServer.registerTool(
  "feishu_send_file",
  {
    description: "Send a file (ZIP, PDF, DOCX, etc.) to the configured Feishu group",
    inputSchema: z.object({
      url: z.string().url().describe("File URL (HTTPS only, max 10MB)"),
      title: z.string().optional().describe("Optional message title"),
      idempotency_key: z.string().min(1).describe("Idempotency key to prevent duplicate messages"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  },
  async ({ url, title, idempotency_key }) => {
    return await handleToolCall("feishu_send_file", idempotency_key, title, () => sendFileMessage(url, title));
  }
);

export const mcpTransport = new StreamableHTTPServerTransport({
  sessionIdGenerator: undefined,
});
