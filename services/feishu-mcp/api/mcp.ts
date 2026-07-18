import { VercelRequest, VercelResponse } from "@vercel/node";
import { authenticateBearerToken } from "@/auth";
import { mcpServer, mcpTransport } from "@/mcp";

let transportConnected = false;

async function ensureTransportConnected(): Promise<void> {
  if (!transportConnected) {
    await mcpServer.connect(mcpTransport);
    transportConnected = true;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const authorization = req.headers.authorization ?? null;
  if (!authenticateBearerToken(authorization)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  await ensureTransportConnected();

  try {
    await mcpTransport.handleRequest(
      req as any,
      res as any,
      req.body
    );
  } catch (error) {
    console.error("MCP request error:", error);
    res.status(500).json({
      jsonrpc: "2.0",
      error: {
        code: -32000,
        message: error instanceof Error ? error.message : "Internal error",
      },
    });
  }
}
