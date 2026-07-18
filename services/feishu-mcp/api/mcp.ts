import { NextRequest } from "next/server";
import { authenticateBearerToken } from "@/auth";
import { handleMCPRequest } from "@/mcp";

export const config = {
  runtime: "edge",
};

export async function POST(request: NextRequest) {
  const authorization = request.headers.get("Authorization");
  if (!authenticateBearerToken(authorization)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const body = await request.json();
    const response = await handleMCPRequest(body);
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        jsonrpc: "2.0",
        error: {
          code: -32000,
          message: error instanceof Error ? error.message : "Internal error",
        },
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export async function GET(request: NextRequest) {
  const authorization = request.headers.get("Authorization");
  if (!authenticateBearerToken(authorization)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const response = await handleMCPRequest({ jsonrpc: "2.0", method: "tools/list" });
  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
