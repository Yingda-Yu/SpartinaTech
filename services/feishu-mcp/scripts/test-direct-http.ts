import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const MCP_URL = process.env.MCP_URL || "http://localhost:3000/api/mcp";
const ACCESS_TOKEN = process.env.SPARTINA_MCP_ACCESS_TOKEN;

async function testDirectHTTP() {
  console.log("=== Direct HTTP Test ===");
  console.log("MCP URL:", MCP_URL);

  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json, text/event-stream",
    "Authorization": `Bearer ${ACCESS_TOKEN}`,
  };

  console.log("\n1. Testing initialize(id=0)...");
  const initResponse = await fetch(MCP_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 0,
      method: "initialize",
      params: {
        protocolVersion: "2024-11-05",
        capabilities: {},
        clientInfo: {
          name: "test-client",
          version: "1.0.0",
        },
      },
    }),
  });
  const initResult = await initResponse.json();
  console.log("   Status:", initResponse.status);
  console.log("   Result:", JSON.stringify(initResult, null, 2));

  console.log("\n2. Testing notifications/initialized (no id)...");
  const notifyResponse = await fetch(MCP_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "notifications/initialized",
      params: {},
    }),
  });
  console.log("   Status:", notifyResponse.status);
  const notifyText = await notifyResponse.text();
  console.log("   Body:", notifyText || "(empty)");

  console.log("\n3. Testing tools/list...");
  const toolsResponse = await fetch(MCP_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "1",
      method: "tools/list",
      params: {},
    }),
  });
  const toolsResult = await toolsResponse.json();
  console.log("   Status:", toolsResponse.status);
  console.log("   Result:", JSON.stringify(toolsResult, null, 2));

  console.log("\n=== Direct HTTP tests completed ===");
}

testDirectHTTP();
