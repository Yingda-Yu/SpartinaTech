import { NextRequest } from "next/server";
import { validateConfig } from "@/config";
import { healthCheck } from "@/feishu";

export const config = {
  runtime: "edge",
};

export async function GET(request: NextRequest) {
  const configResult = validateConfig();
  if (!configResult.ok) {
    return new Response(
      JSON.stringify({
        ok: false,
        errors: configResult.missing.map((key) => `${key} is missing`),
      }),
      {
        status: 503,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const feishuResult = await healthCheck();
  if (!feishuResult.ok) {
    return new Response(
      JSON.stringify({
        ok: false,
        errors: feishuResult.errors,
      }),
      {
        status: 503,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
