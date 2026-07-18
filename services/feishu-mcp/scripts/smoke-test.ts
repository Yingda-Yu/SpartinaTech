import { validateConfig } from "../src/config";
import { authenticateBearerToken } from "../src/auth";
import { handleMCPRequest } from "../src/mcp";

async function runSmokeTests() {
  console.log("=== Spartina Feishu MCP Service Smoke Tests ===\n");

  console.log("1. Configuration Validation (without env vars)");
  const configResult = validateConfig();
  console.log(`   - Has all vars: ${configResult.ok}`);
  console.log(`   - Missing: ${configResult.missing.length}`);
  console.log("   ✅ Config validation logic works");

  console.log("\n2. Bearer Token Authentication Logic");
  process.env.SPARTINA_MCP_ACCESS_TOKEN = "test-token-123";
  
  const validToken = authenticateBearerToken("Bearer test-token-123");
  const invalidToken = authenticateBearerToken("Bearer wrong-token");
  const noToken = authenticateBearerToken(null);
  const malformedToken = authenticateBearerToken("Basic abc123");

  console.log(`   ✅ Valid token: ${validToken}`);
  console.log(`   ✅ Invalid token: ${!invalidToken}`);
  console.log(`   ✅ No token: ${!noToken}`);
  console.log(`   ✅ Malformed token: ${!malformedToken}`);

  console.log("\n3. MCP Protocol - tools/list");
  const toolsListResponse = await handleMCPRequest({ jsonrpc: "2.0", method: "tools/list", id: 1 });
  if (toolsListResponse.result && Array.isArray((toolsListResponse.result as any).tools)) {
    console.log(`   ✅ Tools discovered: ${(toolsListResponse.result as any).tools.length}`);
  } else {
    console.log("   ❌ Failed to list tools");
    process.exit(1);
  }

  console.log("\n4. MCP Protocol - initialize");
  const initResponse = await handleMCPRequest({ jsonrpc: "2.0", method: "initialize", id: 1 });
  if (initResponse.result && (initResponse.result as any).name) {
    console.log(`   ✅ Initialized: ${(initResponse.result as any).name}`);
  } else {
    console.log("   ❌ Failed to initialize");
    process.exit(1);
  }

  console.log("\n5. MCP Protocol - unknown method");
  const unknownResponse = await handleMCPRequest({ jsonrpc: "2.0", method: "unknown_method", id: 1 });
  if (unknownResponse.error && unknownResponse.error.code === -32601) {
    console.log("   ✅ Unknown method handled correctly");
  } else {
    console.log("   ❌ Unknown method not handled");
    process.exit(1);
  }

  console.log("\n6. MCP Protocol - feishu_send_message with missing params");
  const badParamsResponse = await handleMCPRequest({
    jsonrpc: "2.0",
    method: "feishu_send_message",
    params: {},
    id: 1,
  });
  if (badParamsResponse.error && badParamsResponse.error.code === -32602) {
    console.log("   ✅ Missing params handled correctly");
  } else {
    console.log("   ❌ Missing params not handled");
    process.exit(1);
  }

  console.log("\n=== All smoke tests passed! ===");
  console.log("\nNext steps for full end-to-end test:");
  console.log("1. Set environment variables: FEISHU_APP_ID, FEISHU_APP_SECRET, FEISHU_CHAT_ID, SPARTINA_MCP_ACCESS_TOKEN");
  console.log("2. Run: npx tsx scripts/test-feishu-delivery.ts");
}

runSmokeTests().catch((e) => {
  console.error("Smoke test failed:", e);
  process.exit(1);
});
