import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env.local" });

async function testVercelPreview(previewUrl: string) {
  console.log(`=== Testing Vercel Preview: ${previewUrl} ===\n`);

  const mcpToken = process.env.SPARTINA_MCP_ACCESS_TOKEN;
  if (!mcpToken) {
    console.error("SPARTINA_MCP_ACCESS_TOKEN not configured");
    process.exit(1);
  }

  console.log("1. GET /healthz");
  try {
    const response = await fetch(`${previewUrl}/healthz`);
    const data = await response.json();
    console.log(`   HTTP Status: ${response.status}`);
    console.log(`   Response: ${JSON.stringify(data)}`);
    if (response.status === 200 && data.ok === true) {
      console.log("   ✅ PASSED");
    } else {
      console.log("   ❌ FAILED");
      process.exit(1);
    }
  } catch (e) {
    console.log(`   ❌ FAILED: ${e}`);
    process.exit(1);
  }

  console.log("\n2. GET /readyz");
  try {
    const response = await fetch(`${previewUrl}/readyz`);
    const data = await response.json();
    console.log(`   HTTP Status: ${response.status}`);
    console.log(`   Response: ${JSON.stringify(data)}`);
    if (response.status === 200 && data.ok === true) {
      console.log("   ✅ PASSED");
    } else {
      console.log("   ❌ FAILED");
      process.exit(1);
    }
  } catch (e) {
    console.log(`   ❌ FAILED: ${e}`);
    process.exit(1);
  }

  console.log("\n3. POST /mcp without Authorization");
  try {
    const response = await fetch(`${previewUrl}/mcp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", method: "initialize", id: 1 }),
    });
    console.log(`   HTTP Status: ${response.status}`);
    if (response.status === 401) {
      console.log("   ✅ PASSED");
    } else {
      console.log("   ❌ FAILED");
      process.exit(1);
    }
  } catch (e) {
    console.log(`   ❌ FAILED: ${e}`);
    process.exit(1);
  }

  console.log("\n4. POST /mcp with wrong Bearer Token");
  try {
    const response = await fetch(`${previewUrl}/mcp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer wrong-token-123",
      },
      body: JSON.stringify({ jsonrpc: "2.0", method: "initialize", id: 1 }),
    });
    console.log(`   HTTP Status: ${response.status}`);
    if (response.status === 401) {
      console.log("   ✅ PASSED");
    } else {
      console.log("   ❌ FAILED");
      process.exit(1);
    }
  } catch (e) {
    console.log(`   ❌ FAILED: ${e}`);
    process.exit(1);
  }

  console.log("\n5. POST /mcp - initialize");
  try {
    const response = await fetch(`${previewUrl}/mcp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${mcpToken}`,
      },
      body: JSON.stringify({ jsonrpc: "2.0", method: "initialize", id: 1 }),
    });
    const data = await response.json();
    console.log(`   HTTP Status: ${response.status}`);
    if (response.status === 200 && data.result?.name === "Spartina Feishu MCP") {
      console.log(`   ✅ PASSED - Server: ${data.result.name}`);
    } else {
      console.log(`   ❌ FAILED: ${JSON.stringify(data)}`);
      process.exit(1);
    }
  } catch (e) {
    console.log(`   ❌ FAILED: ${e}`);
    process.exit(1);
  }

  console.log("\n6. POST /mcp - tools/list");
  try {
    const response = await fetch(`${previewUrl}/mcp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${mcpToken}`,
      },
      body: JSON.stringify({ jsonrpc: "2.0", method: "tools/list", id: 1 }),
    });
    const data = await response.json();
    console.log(`   HTTP Status: ${response.status}`);
    const tools = data.result?.tools || [];
    console.log(`   Tools discovered: ${tools.length}`);
    const sendMessageTool = tools.find((t: any) => t.name === "feishu_send_message");
    if (sendMessageTool) {
      console.log("   ✅ PASSED - feishu_send_message found");
      console.log(`   Annotations:`);
      console.log(`     readOnlyHint: ${sendMessageTool.annotations?.readOnlyHint ?? "N/A"}`);
      console.log(`     destructiveHint: ${sendMessageTool.annotations?.destructiveHint ?? "N/A"}`);
      console.log(`     idempotentHint: ${sendMessageTool.annotations?.idempotentHint ?? "N/A"}`);
      console.log(`     openWorldHint: ${sendMessageTool.annotations?.openWorldHint ?? "N/A"}`);
    } else {
      console.log("   ❌ FAILED - feishu_send_message not found");
      process.exit(1);
    }
  } catch (e) {
    console.log(`   ❌ FAILED: ${e}`);
    process.exit(1);
  }

  console.log("\n7. POST /mcp - tools/call (send message)");
  try {
    const idempotencyKey = `vercel-preview-${Date.now()}`;
    const timestamp = new Date().toISOString();
    const response = await fetch(`${previewUrl}/mcp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${mcpToken}`,
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "tools/call",
        id: 1,
        params: {
          toolName: "feishu_send_message",
          arguments: {
            title: "【Spartina Feishu MCP Vercel Preview 测试】",
            text: `本消息由部署在 Vercel Preview 的自建 MCP 服务发送。
环境：preview
分支：feat/feishu-mcp
时间：${timestamp}
Deployment URL：${previewUrl}`,
            idempotency_key: idempotencyKey,
          },
        },
      }),
    });
    const data = await response.json();
    console.log(`   HTTP Status: ${response.status}`);
    if (response.status === 200 && data.result) {
      const structuredContent = data.result.structuredContent || {};
      console.log(`   ✅ PASSED`);
      console.log(`   delivered: ${structuredContent.delivered}`);
      console.log(`   duplicate: ${structuredContent.duplicate}`);
      console.log(`   message_id: ${structuredContent.message_id}`);
      console.log(`   chat_id: ${structuredContent.chat_id}`);
    } else {
      console.log(`   ❌ FAILED: ${JSON.stringify(data)}`);
      process.exit(1);
    }
  } catch (e) {
    console.log(`   ❌ FAILED: ${e}`);
    process.exit(1);
  }

  console.log("\n=== All Vercel Preview tests passed! ===");
}

if (process.argv.length < 3) {
  console.error("Usage: tsx scripts/test-vercel-preview.ts <preview-url>");
  process.exit(1);
}

const previewUrl = process.argv[2];
testVercelPreview(previewUrl).catch((e) => {
  console.error("Test failed:", e);
  process.exit(1);
});
