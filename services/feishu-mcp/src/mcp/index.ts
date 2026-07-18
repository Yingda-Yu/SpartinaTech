import { z } from "zod";
import { sendTextMessage } from "@/feishu";
import { getCachedResult, cacheResult } from "@/idempotency";

interface MCPRequest {
  jsonrpc: string;
  method: string;
  params?: unknown;
  id?: string | number;
}

interface MCPResponse {
  jsonrpc: string;
  result?: unknown;
  error?: {
    code: number;
    message: string;
    data?: unknown;
  };
  id?: string | number;
}

const sendMessageSchema = z.object({
  text: z.string().min(1).max(4000),
  title: z.string().optional(),
  idempotency_key: z.string().min(1),
});

export async function handleMCPRequest(body: MCPRequest): Promise<MCPResponse> {
  const { method, params, id } = body;

  switch (method) {
    case "initialize":
      return {
        jsonrpc: "2.0",
        result: {
          name: "Spartina Feishu MCP",
          version: "0.1.0",
          description: "Send messages and files to Feishu groups",
          tools: [
            {
              name: "feishu_send_message",
              description: "Send a text message to the configured Feishu group",
              parameters: {
                type: "object",
                properties: {
                  text: {
                    type: "string",
                    description: "Message text (1-4000 characters)",
                  },
                  title: {
                    type: "string",
                    description: "Optional message title",
                  },
                  idempotency_key: {
                    type: "string",
                    description: "Idempotency key to prevent duplicate messages",
                  },
                },
                required: ["text", "idempotency_key"],
              },
            },
          ],
        },
        id,
      };

    case "tools/list":
      return {
        jsonrpc: "2.0",
        result: {
          tools: [
            {
              name: "feishu_send_message",
              description: "Send a text message to the configured Feishu group",
              parameters: {
                type: "object",
                properties: {
                  text: {
                    type: "string",
                    description: "Message text (1-4000 characters)",
                  },
                  title: {
                    type: "string",
                    description: "Optional message title",
                  },
                  idempotency_key: {
                    type: "string",
                    description: "Idempotency key to prevent duplicate messages",
                  },
                },
                required: ["text", "idempotency_key"],
              },
            },
          ],
        },
        id,
      };

    case "feishu_send_message": {
      try {
        const parsed = sendMessageSchema.safeParse(params);
        if (!parsed.success) {
          return {
            jsonrpc: "2.0",
            error: {
              code: -32602,
              message: "Invalid parameters",
              data: parsed.error.errors,
            },
            id,
          };
        }

        const { text, title, idempotency_key } = parsed.data;

        const cachedResult = getCachedResult(idempotency_key);
        if (cachedResult) {
          return {
            jsonrpc: "2.0",
            result: cachedResult,
            id,
          };
        }

        const fullText = title ? `【${title}】\n${text}` : text;
        const result = await sendTextMessage(fullText);

        const responseResult = {
          delivered: true,
          message_id: result.message_id,
          chat_id: result.chat_id,
          timestamp: Date.now(),
          idempotency_key,
        };

        cacheResult(idempotency_key, responseResult);

        return {
          jsonrpc: "2.0",
          result: responseResult,
          id,
        };
      } catch (error) {
        return {
          jsonrpc: "2.0",
          error: {
            code: -32000,
            message: error instanceof Error ? error.message : "Internal error",
          },
          id,
        };
      }
    }

    default:
      return {
        jsonrpc: "2.0",
        error: {
          code: -32601,
          message: `Method not found: ${method}`,
        },
        id,
      };
  }
}
