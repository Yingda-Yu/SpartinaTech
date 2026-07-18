import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export async function GET(request: NextRequest) {
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
