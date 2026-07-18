import { getConfig, validateConfig } from "../src/config";
import { authenticateBearerToken } from "../src/auth";
import { getTenantAccessToken, sendTextMessage, checkChatAccess } from "../src/feishu";
import { handleMCPRequest } from "../src/mcp";

async function runTests() {
  console.log("=== Spartina Feishu MCP Service Tests ===\n");

  console.log("1. Environment Configuration");
  const configResult = validateConfig();
  if (!configResult.ok) {
    console.log("   ❌ Missing environment variables:", configResult.missing);
    process.exit(1);
  }
  console.log("   ✅ All required environment variables present");

  console.log("\n2. Bearer Token Authentication");
  const validToken = authenticateBearerToken(`Bearer ${process.env.SPARTINA_MCP_ACCESS_TOKEN}`);
  const invalidToken = authenticateBearerToken("Bearer invalid-token");
  const noToken = authenticateBearerToken(null);
  console.log(`   ✅ Valid token: ${validToken}`);
  console.log(`   ✅ Invalid token: ${!invalidToken}`);
  console.log(`   ✅ No token: ${!noToken}`);

  console.log("\n3. Feishu API - Get Tenant Access Token");
  try {
    const token = await getTenantAccessToken();
    console.log(`   ✅ Token obtained successfully (length: ${token.length})`);
  } catch (e) {
    console.log(`   ❌ Failed to get token: ${e}`);
    process.exit(1);
  }

  console.log("\n4. Feishu API - Check Chat Access");
  try {
    const chatAccessible = await checkChatAccess();
    if (chatAccessible) {
      console.log("   ✅ Can access target chat");
    } else {
      console.log("   ❌ Cannot access target chat");
      process.exit(1);
    }
  } catch (e) {
    console.log(`   ❌ Failed to check chat access: ${e}`);
    process.exit(1);
  }

  console.log("\n5. MCP Protocol - tools/list");
  const toolsListResponse = await handleMCPRequest({ jsonrpc: "2.0", method: "tools/list", id: 1 });
  if (toolsListResponse.result && Array.isArray((toolsListResponse.result as any).tools)) {
    console.log(`   ✅ Tools discovered: ${(toolsListResponse.result as any).tools.length}`);
  } else {
    console.log("   ❌ Failed to list tools");
    process.exit(1);
  }

  console.log("\n6. MCP Protocol - initialize");
  const initResponse = await handleMCPRequest({ jsonrpc: "2.0", method: "initialize", id: 1 });
  if (initResponse.result && (initResponse.result as any).name) {
    console.log(`   ✅ Initialized: ${(initResponse.result as any).name}`);
  } else {
    console.log("   ❌ Failed to initialize");
    process.exit(1);
  }

  console.log("\n7. MCP Protocol - feishu_send_message");
  const testText = `【Spartina Feishu MCP 测试】\nMCP 服务已成功通过本地测试向飞书发送消息。\n时间：${new Date().toISOString()}\n环境：development`;
  const testKey = `test-${Date.now()}`;
  
  try {
    const sendResponse = await handleMCPRequest({
      jsonrpc: "2.0",
      method: "feishu_send_message",
      params: {
        text: testText,
        idempotency_key: testKey,
      },
      id: 1,
    });

    if (sendResponse.result && (sendResponse.result as any).delivered) {
      console.log(`   ✅ Message sent successfully`);
      console.log(`   - message_id: ${(sendResponse.result as any).message_id}`);
      console.log(`   - chat_id: ${(sendResponse.result as any).chat_id}`);
    } else {
      console.log(`   ❌ Failed to send message: ${JSON.stringify(sendResponse.error)}`);
      process.exit(1);
    }
  } catch (e) {
    console.log(`   ❌ Exception: ${e}`);
    process.exit(1);
  }

  console.log("\n8. Idempotency Check");
  const duplicateResponse = await handleMCPRequest({
    jsonrpc: "2.0",
    method: "feishu_send_message",
    params: {
      text: "This should NOT be sent again",
      idempotency_key: testKey,
    },
    id: 2,
  });

  if (duplicateResponse.result && (duplicateResponse.result as any).delivered) {
    console.log("   ✅ Duplicate request returned cached result (no duplicate send)");
  } else {
    console.log("   ❌ Idempotency failed");
    process.exit(1);
  }

  console.log("\n=== All tests passed! ===");
  process.exit(0);
}

runTests().catch((e) => {
  console.error("Test failed with error:", e);
  process.exit(1);
});
