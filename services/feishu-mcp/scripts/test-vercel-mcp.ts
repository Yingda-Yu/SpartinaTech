import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const MCP_URL = "https://feishu-6n9zx2jhe-spartina-tech.vercel.app/api/mcp";
const ACCESS_TOKEN = process.env.SPARTINA_MCP_ACCESS_TOKEN || "";

function getTimestamp() {
  return new Date().toLocaleString('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

function generateIdempotencyKey() {
  return `vercel-preview-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

async function testNoToken() {
  console.log("=== 1. POST /api/mcp without Authorization ===");
  const response = await fetch(MCP_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "1",
      method: "initialize",
      params: {}
    })
  });
  console.log(`Status: ${response.status}`);
  const text = await response.text();
  console.log(`Response: ${text.substring(0, 500)}`);
  return { status: response.status, ok: response.status === 401 };
}

async function testWrongToken() {
  console.log("\n=== 2. POST /api/mcp with wrong Bearer Token ===");
  const response = await fetch(MCP_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer wrong-token-12345'
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "2",
      method: "initialize",
      params: {}
    })
  });
  console.log(`Status: ${response.status}`);
  const text = await response.text();
  console.log(`Response: ${text.substring(0, 500)}`);
  return { status: response.status, ok: response.status === 401 };
}

async function testInitialize() {
  console.log("\n=== 3. MCP initialize ===");
  const response = await fetch(MCP_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ACCESS_TOKEN}`
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "3",
      method: "initialize",
      params: {}
    })
  });
  console.log(`Status: ${response.status}`);
  const text = await response.text();
  console.log(`Response: ${text.substring(0, 1000)}`);
  try {
    const json = JSON.parse(text);
    return { status: response.status, ok: response.ok && json.result, result: json.result };
  } catch {
    return { status: response.status, ok: false, result: null };
  }
}

async function testNotificationsInitialized() {
  console.log("\n=== 4. MCP notifications/initialized ===");
  const response = await fetch(MCP_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ACCESS_TOKEN}`
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "4",
      method: "notifications/initialized",
      params: {}
    })
  });
  console.log(`Status: ${response.status}`);
  const text = await response.text();
  console.log(`Response: ${text.substring(0, 500)}`);
  return { status: response.status, ok: response.ok };
}

async function testToolsList() {
  console.log("\n=== 5. MCP tools/list ===");
  const response = await fetch(MCP_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ACCESS_TOKEN}`
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "5",
      method: "tools/list",
      params: {}
    })
  });
  console.log(`Status: ${response.status}`);
  const text = await response.text();
  console.log(`Response: ${text.substring(0, 2000)}`);
  try {
    const json = JSON.parse(text);
    const tools = json.result?.tools || [];
    const feishuTool = tools.find((t: any) => t.name === 'feishu_send_message');
    if (feishuTool) {
      console.log("\n✓ Found feishu_send_message tool");
      console.log("  annotations:", JSON.stringify(feishuTool.annotations));
    } else {
      console.log("\n✗ feishu_send_message tool not found");
    }
    return { status: response.status, ok: response.ok && tools.length > 0, tools, feishuTool };
  } catch {
    return { status: response.status, ok: false, tools: [], feishuTool: null };
  }
}

async function testToolsCall() {
  console.log("\n=== 6. MCP tools/call (feishu_send_message) ===");
  const idempotencyKey = generateIdempotencyKey();
  const content = `本消息由部署在 Vercel Preview 的自建 MCP 服务发送。\n环境：preview\n分支：feat/feishu-mcp\n时间：${getTimestamp()}\nEndpoint：/api/mcp`;
  
  console.log(`idempotency_key: ${idempotencyKey}`);
  
  const response = await fetch(MCP_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ACCESS_TOKEN}`
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "6",
      method: "tools/call",
      params: {
        name: "feishu_send_message",
        arguments: {
          title: "【Spartina Feishu MCP Vercel Preview 测试】",
          text: content,
          idempotency_key: idempotencyKey
        }
      }
    })
  });
  console.log(`Status: ${response.status}`);
  const text = await response.text();
  console.log(`Response: ${text.substring(0, 2000)}`);
  
  try {
    const json = JSON.parse(text);
    const structuredContent = json.result?.structuredContent;
    const messageId = structuredContent?.message_id || json.result?.message_id;
    console.log(`\nmessage_id: ${messageId}`);
    console.log(`delivered: ${structuredContent?.delivered}`);
    console.log(`duplicate: ${structuredContent?.duplicate}`);
    return { status: response.status, ok: response.ok && messageId, messageId, result: json.result };
  } catch {
    return { status: response.status, ok: false, messageId: null, result: null };
  }
}

async function main() {
  console.log("========================================");
  console.log("  Vercel Preview MCP 云端验证测试");
  console.log("========================================");
  console.log(`MCP Endpoint: ${MCP_URL}`);
  console.log("========================================\n");
  
  const results: {
    previewUrl: string;
    mcpEndpoint: string;
    noToken: { status: number; ok: boolean } | null;
    wrongToken: { status: number; ok: boolean } | null;
    initialize: { status: number; ok: boolean; result?: any } | null;
    toolsList: { status: number; ok: boolean; tools: any[]; feishuTool: any } | null;
    toolsCall: { status: number; ok: boolean; messageId: string | null; result?: any } | null;
  } = {
    previewUrl: MCP_URL.replace('/api/mcp', ''),
    mcpEndpoint: MCP_URL,
    noToken: null,
    wrongToken: null,
    initialize: null,
    toolsList: null,
    toolsCall: null
  };
  
  results.noToken = await testNoToken();
  results.wrongToken = await testWrongToken();
  results.initialize = await testInitialize();
  
  if (results.initialize.ok) {
    await testNotificationsInitialized();
    results.toolsList = await testToolsList();
    
    if (results.toolsList.feishuTool) {
      console.log("\n--- Checking tool annotations ---");
      const annotations = results.toolsList.feishuTool.annotations || {};
      console.log(`readOnlyHint: ${annotations.readOnlyHint} (expected: false)`);
      console.log(`destructiveHint: ${annotations.destructiveHint} (expected: false)`);
      console.log(`idempotentHint: ${annotations.idempotentHint} (expected: true)`);
      console.log(`openWorldHint: ${annotations.openWorldHint} (expected: true)`);
      
      results.toolsCall = await testToolsCall();
    } else {
      console.log("\n✗ Skip tools/call: feishu_send_message tool not found");
    }
  } else {
    console.log("\n✗ Skip MCP protocol tests: initialize failed");
  }
  
  console.log("\n========================================");
  console.log("              测试报告");
  console.log("========================================");
  console.log(`Preview URL: ${results.previewUrl}`);
  console.log(`MCP Endpoint: ${results.mcpEndpoint}`);
  console.log(`无 Token 请求状态: ${results.noToken?.status || 'N/A'} (期望: 401) ${results.noToken?.ok ? '✓' : '✗'}`);
  console.log(`错误 Token 请求状态: ${results.wrongToken?.status || 'N/A'} (期望: 401) ${results.wrongToken?.ok ? '✓' : '✗'}`);
  console.log(`initialize 结果: ${results.initialize?.ok ? '✓ 成功' : '✗ 失败'} (${results.initialize?.status || 'N/A'})`);
  console.log(`tools/list 结果: ${results.toolsList?.ok ? '✓ 成功' : '✗ 失败'} (工具数: ${results.toolsList?.tools.length || 0})`);
  console.log(`  - feishu_send_message: ${results.toolsList?.feishuTool ? '✓ 发现' : '✗ 未发现'}`);
  if (results.toolsList?.feishuTool) {
    const a = results.toolsList.feishuTool.annotations || {};
    console.log(`  - readOnlyHint: ${a.readOnlyHint} (期望: false)`);
    console.log(`  - destructiveHint: ${a.destructiveHint} (期望: false)`);
    console.log(`  - idempotentHint: ${a.idempotentHint} (期望: true)`);
    console.log(`  - openWorldHint: ${a.openWorldHint} (期望: true)`);
  }
  console.log(`tools/call 结果: ${results.toolsCall?.ok ? '✓ 成功' : '✗ 失败'} (${results.toolsCall?.status || 'N/A'})`);
  console.log(`飞书 message_id: ${results.toolsCall?.messageId || 'N/A'}`);
  console.log("========================================");
  
  const allPass = 
    (results.noToken?.ok || false) &&
    (results.wrongToken?.ok || false) &&
    (results.initialize?.ok || false) &&
    (results.toolsList?.ok || false) &&
    (results.toolsList?.feishuTool || false) &&
    (results.toolsCall?.ok || false);
  
  console.log(`\n综合结果: ${allPass ? '✓ 所有测试通过' : '✗ 部分测试失败'}`);
}

main().catch(e => {
  console.error("\n测试执行出错:", e.message);
  process.exit(1);
});
