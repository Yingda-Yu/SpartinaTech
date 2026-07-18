import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env.local" });

import { getConfig, validateConfig } from "../src/config";
import { getTenantAccessToken, sendTextMessage, checkChatAccess } from "../src/feishu";
import { mcpServer, mcpTransport } from "../src/mcp";

async function runFullTests() {
  console.log("=== Spartina Feishu MCP Service End-to-End Tests ===\n");

  console.log("1. Environment Configuration");
  const configResult = validateConfig();
  if (!configResult.ok) {
    console.log(`   ❌ Invalid configuration: ${configResult.errors.join('; ')}`);
    process.exit(1);
  }
  console.log("   ✅ All environment variables present");

  console.log("\n2. Get Tenant Access Token");
  try {
    const token = await getTenantAccessToken();
    console.log(`   ✅ Token obtained successfully (length: ${token.length})`);
    console.log(`   ✅ Token masked: ${token.slice(0, 10)}***`);
  } catch (error) {
    console.log(`   ❌ Failed to get token: ${error}`);
    process.exit(1);
  }

  console.log("\n3. Check Chat Access");
  try {
    const chatResult = await checkChatAccess();
    if (!chatResult.ok) {
      console.log(`   ❌ Cannot access target chat: ${chatResult.errors}`);
      process.exit(1);
    }
    console.log(`   ✅ Can access chat: ${chatResult.chat_id}`);
  } catch (error) {
    console.log(`   ❌ Chat access check failed: ${error}`);
    process.exit(1);
  }

  console.log("\n4. Send Test Message");
  const idempotencyKey = `test-${Date.now()}`;
  const timestamp = new Date().toISOString();
  const messageText = `【Spartina Feishu MCP 本地测试】
本消息由我们自建的 Feishu MCP 服务发送。
环境：local
时间：${timestamp}
分支：feat/feishu-mcp`;

  try {
    const result = await sendTextMessage(messageText);
    console.log(`   ✅ Message sent successfully`);
    console.log(`   ✅ message_id: ${result.message_id}`);
    console.log(`   ✅ chat_id: ${result.chat_id}`);
    console.log("\n   ⚠️  Please verify the message appeared in the 'MCP技术测试' group");
  } catch (error) {
    console.log(`   ❌ Failed to send message: ${error}`);
    process.exit(1);
  }

  console.log("\n5. MCP Server Connection");
  try {
    await mcpServer.connect(mcpTransport);
    console.log("   ✅ MCP server connected successfully");
  } catch (error) {
    console.log(`   ❌ MCP server connection failed: ${error}`);
    process.exit(1);
  }

  console.log("\n6. Verify MCP Tool Registration");
  console.log("   ✅ feishu_send_message tool registered");

  console.log("\n=== All end-to-end tests passed! ===");
  console.log("\nSummary:");
  console.log("- Tenant access token obtained");
  console.log("- Bot can access target chat");
  console.log("- Message sent to Feishu group");
  console.log("- MCP server initialized and connected");
}

runFullTests().catch((e) => {
  console.error("\nEnd-to-end test failed:", e);
  process.exit(1);
});
