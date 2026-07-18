import { VercelRequest, VercelResponse } from "@vercel/node";
import { validateConfig } from "@/config";
import { healthCheck } from "@/feishu";

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const configResult = validateConfig();
  if (!configResult.ok) {
    return res.status(503).json({
      ok: false,
      errors: configResult.missing.map((key) => `${key} is missing`),
    });
  }

  const feishuResult = await healthCheck();
  if (!feishuResult.ok) {
    return res.status(503).json({
      ok: false,
      errors: feishuResult.errors,
    });
  }

  res.status(200).json({ ok: true });
}
