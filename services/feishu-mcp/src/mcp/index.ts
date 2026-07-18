import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { sendTextMessage } from "@/feishu";
import { MemoryIdempotencyStore, IdempotencyStore } from "@/idempotency";

let idempotencyStore: IdempotencyStore = new MemoryIdempotencyStore();

export function setIdempotencyStore(store: IdempotencyStore): void {
  idempotencyStore = store;
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
    const cachedResult = await idempotencyStore.get(idempotency_key);
    if (cachedResult) {
      const result = cachedResult as {
        delivered: boolean;
        message_id: string;
        chat_id: string;
        timestamp: number;
        idempotency_key: string;
      };
      return {
        content: [{ type: "text", text: `Message already sent: ${result.message_id}` }],
        structuredContent: {
          delivered: true,
          duplicate: true,
          message_id: result.message_id,
          chat_id: result.chat_id,
          timestamp: result.timestamp,
          idempotency_key,
        },
      };
    }

    const fullText = title ? `【${title}】\n${text}` : text;
    const result = await sendTextMessage(fullText);

    const responseResult = {
      delivered: true,
      duplicate: false,
      message_id: result.message_id,
      chat_id: result.chat_id,
      timestamp: Date.now(),
      idempotency_key,
    };

    await idempotencyStore.set(idempotency_key, responseResult);

    return {
      content: [{ type: "text", text: `Message sent successfully: ${result.message_id}` }],
      structuredContent: responseResult,
    };
  }
);

export const mcpTransport = new StreamableHTTPServerTransport({
  sessionIdGenerator: undefined,
});
