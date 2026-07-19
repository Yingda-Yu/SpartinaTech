import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const MCP_URL = process.env.MCP_URL || "http://localhost:3000/api/mcp";
const ACCESS_TOKEN = process.env.SPARTINA_MCP_ACCESS_TOKEN;

async function testHandshake() {
  console.log("=== MCP Handshake Test ===");
  console.log("MCP URL:", MCP_URL);

  if (!ACCESS_TOKEN) {
    console.error("Error: SPARTINA_MCP_ACCESS_TOKEN not set");
    process.exit(1);
  }

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
  console.log("   id:", initResult.id);
  console.log("   protocolVersion:", initResult.result?.protocolVersion);
  console.log("   serverInfo:", initResult.result?.serverInfo);

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
  console.log("   tools:", toolsResult.result?.tools?.map((t: { name: string }) => t.name));

  console.log("\n4. Testing feishu_send_message...");
  const idempotencyKey = "handshake-test-" + Date.now();
  const sendResponse = await fetch(MCP_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 2,
      method: "tools/call",
      params: {
        name: "feishu_send_message",
        arguments: {
          text: "Handshake test - " + new Date().toISOString(),
          idempotency_key: idempotencyKey,
        },
      },
    }),
  });
  const sendResult = await sendResponse.json();
  console.log("   Status:", sendResponse.status);
  console.log("   message_id:", sendResult.result?.structuredContent?.message_id);
  console.log("   duplicate:", sendResult.result?.structuredContent?.duplicate);

  console.log("\n5. Testing idempotency (same key)...");
  const duplicateResponse = await fetch(MCP_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 3,
      method: "tools/call",
      params: {
        name: "feishu_send_message",
        arguments: {
          text: "Duplicate test",
          idempotency_key: idempotencyKey,
        },
      },
    }),
  });
  const duplicateResult = await duplicateResponse.json();
  console.log("   Status:", duplicateResponse.status);
  console.log("   message_id:", duplicateResult.result?.structuredContent?.message_id);
  console.log("   duplicate:", duplicateResult.result?.structuredContent?.duplicate);

  console.log("\n=== All handshake tests completed ===");
}

testHandshake();
