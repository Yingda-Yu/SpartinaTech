import { z } from "zod";

const envSchema = z.object({
  FEISHU_APP_ID: z.string().min(1),
  FEISHU_APP_SECRET: z.string().min(1),
  FEISHU_CHAT_ID: z.string().regex(/^oc_/, "FEISHU_CHAT_ID must start with 'oc_'"),
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

export function validateConfig(): { ok: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!process.env.FEISHU_APP_ID) {
    errors.push("FEISHU_APP_ID is missing");
  } else if (process.env.FEISHU_APP_ID.includes("Value:")) {
    errors.push("FEISHU_APP_ID contains invalid 'Value:' prefix");
  }

  if (!process.env.FEISHU_APP_SECRET) {
    errors.push("FEISHU_APP_SECRET is missing");
  } else if (process.env.FEISHU_APP_SECRET.includes("Value:")) {
    errors.push("FEISHU_APP_SECRET contains invalid 'Value:' prefix");
  }

  if (!process.env.FEISHU_CHAT_ID) {
    errors.push("FEISHU_CHAT_ID is missing");
  } else if (!process.env.FEISHU_CHAT_ID.startsWith("oc_")) {
    errors.push("FEISHU_CHAT_ID must start with 'oc_'");
  } else if (process.env.FEISHU_CHAT_ID.includes("Value:")) {
    errors.push("FEISHU_CHAT_ID contains invalid 'Value:' prefix");
  }

  if (!process.env.SPARTINA_MCP_ACCESS_TOKEN) {
    errors.push("SPARTINA_MCP_ACCESS_TOKEN is missing");
  } else if (process.env.SPARTINA_MCP_ACCESS_TOKEN.includes("Value:")) {
    errors.push("SPARTINA_MCP_ACCESS_TOKEN contains invalid 'Value:' prefix");
  }

  return { ok: errors.length === 0, errors };
}

export function sanitizeConfig(): EnvConfig {
  const config = {
    FEISHU_APP_ID: (process.env.FEISHU_APP_ID || "").trim(),
    FEISHU_APP_SECRET: (process.env.FEISHU_APP_SECRET || "").trim(),
    FEISHU_CHAT_ID: (process.env.FEISHU_CHAT_ID || "").trim(),
    SPARTINA_MCP_ACCESS_TOKEN: (process.env.SPARTINA_MCP_ACCESS_TOKEN || "").trim(),
    FEISHU_API_BASE_URL: (process.env.FEISHU_API_BASE_URL || "https://open.feishu.cn").trim(),
  };

  const result = envSchema.safeParse(config);
  if (!result.success) {
    throw new Error(`Invalid environment configuration: ${result.error.message}`);
  }

  return result.data;
}
