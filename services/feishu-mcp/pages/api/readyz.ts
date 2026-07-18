import type { NextApiRequest, NextApiResponse } from "next";
import { validateConfig } from "@/config";
import { getTenantAccessToken, checkChatAccess } from "@/feishu";
import { createIdempotencyStore, RedisIdempotencyStore } from "@/idempotency";

interface CheckResult {
  name: string;
  ok: boolean;
  error?: string;
}

interface ReadyzResponse {
  ok: boolean;
  checks: CheckResult[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ReadyzResponse>) {
  const checks: CheckResult[] = [];

  const configValidation = validateConfig();
  checks.push({
    name: "env_config",
    ok: configValidation.ok,
    error: configValidation.errors.length > 0 ? configValidation.errors.join("; ") : undefined,
  });

  if (!configValidation.ok) {
    return res.status(503).json({ ok: false, checks });
  }

  try {
    await getTenantAccessToken();
    checks.push({ name: "tenant_access_token", ok: true });
  } catch (e) {
    checks.push({ name: "tenant_access_token", ok: false, error: "Failed to obtain tenant_access_token" });
  }

  try {
    const chatAccess = await checkChatAccess();
    checks.push({
      name: "chat_access",
      ok: chatAccess.ok,
      error: chatAccess.errors.length > 0 ? chatAccess.errors.join("; ") : undefined,
    });
  } catch (e) {
    checks.push({ name: "chat_access", ok: false, error: "Failed to check chat access" });
  }

  const idempotencyStore = createIdempotencyStore();
  const isRedis = idempotencyStore instanceof RedisIdempotencyStore;
  
  checks.push({
    name: "idempotency_store",
    ok: idempotencyStore.isReady(),
    error: isRedis ? (idempotencyStore.isReady() ? undefined : "Redis connection failed") : "Using MemoryIdempotencyStore (development only)",
  });

  const allOk = checks.every((c) => c.ok);

  return res.status(allOk ? 200 : 503).json({ ok: allOk, checks });
}
