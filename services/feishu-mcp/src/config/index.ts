import { z } from "zod";

const envSchema = z.object({
  FEISHU_APP_ID: z.string().min(1),
  FEISHU_APP_SECRET: z.string().min(1),
  FEISHU_CHAT_ID: z.string().min(1),
  SPARTINA_MCP_ACCESS_TOKEN: z.string().min(1),
  FEISHU_API_BASE_URL: z.string().url().default("https://open.feishu.cn"),
});

export type EnvConfig = z.infer<typeof envSchema>;

export function getConfig(): EnvConfig {
  const env = {
    FEISHU_APP_ID: process.env.FEISHU_APP_ID || "",
    FEISHU_APP_SECRET: process.env.FEISHU_APP_SECRET || "",
    FEISHU_CHAT_ID: process.env.FEISHU_CHAT_ID || "",
    SPARTINA_MCP_ACCESS_TOKEN: process.env.SPARTINA_MCP_ACCESS_TOKEN || "",
    FEISHU_API_BASE_URL: process.env.FEISHU_API_BASE_URL || "https://open.feishu.cn",
  };

  const result = envSchema.safeParse(env);
  if (!result.success) {
    throw new Error(`Invalid environment configuration: ${result.error.message}`);
  }

  return result.data;
}

export function validateConfig(): { ok: boolean; missing: string[] } {
  const missing: string[] = [];
  if (!process.env.FEISHU_APP_ID) missing.push("FEISHU_APP_ID");
  if (!process.env.FEISHU_APP_SECRET) missing.push("FEISHU_APP_SECRET");
  if (!process.env.FEISHU_CHAT_ID) missing.push("FEISHU_CHAT_ID");
  if (!process.env.SPARTINA_MCP_ACCESS_TOKEN) missing.push("SPARTINA_MCP_ACCESS_TOKEN");
  return { ok: missing.length === 0, missing };
}
