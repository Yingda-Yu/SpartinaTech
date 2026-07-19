import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const PREVIEW_URL = "https://feishu-aecffjj5i-spartina-tech.vercel.app";
const MCP_URL = `${PREVIEW_URL}/api/mcp`;
const ACCESS_TOKEN = process.env.SPARTINA_MCP_ACCESS_TOKEN || "";

async function mcpRequest(method: string, params?: Record<string, unknown>, token?: string): Promise<{ status: number; response: any }> {
  const actualToken = token !== undefined ? token : ACCESS_TOKEN;
  console.log(`  Sending ${method} with token length: ${actualToken?.length || 0}`);
  
  const response = await fetch(MCP_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(actualToken && { 'Authorization': `Bearer ${actualToken}` }),
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: Math.random().toString(36).substr(2, 9),
      method,
      params,
    }),
  });
  return { status: response.status, response: await response.json() };
}

async function testHealthz(): Promise<void> {
  console.log("\n=== 1. Testing /api/healthz ===");
  const response = await fetch(`${PREVIEW_URL}/api/healthz`);
  console.log(`Status: ${response.status}`);
  console.log(`Response: ${await response.text()}`);
}

async function testReadyz(): Promise<void> {
  console.log("\n=== 2. Testing /api/readyz ===");
  const response = await fetch(`${PREVIEW_URL}/api/readyz`);
  console.log(`Status: ${response.status}`);
  const data = await response.json();
  console.log(`Response:`, JSON.stringify(data, null, 2));
  
  const redisCheck = data.checks?.find((c: any) => c.name === 'idempotency_store');
  if (redisCheck) {
    console.log(`\nRedis Status: ${redisCheck.ok ? 'HEALTHY' : 'DEGRADED'}`);
    console.log(`Redis Error: ${redisCheck.error || 'None'}`);
  }
}

async function testNoToken(): Promise<void> {
  console.log("\n=== 3. Testing No Bearer Token ===");
  const result = await mcpRequest('initialize', undefined, '');
  console.log(`Status: ${result.status}`);
  console.log(`Response:`, JSON.stringify(result.response, null, 2));
}

async function testInvalidToken(): Promise<void> {
  console.log("\n=== 4. Testing Invalid Bearer Token ===");
  const result = await mcpRequest('initialize', undefined, 'invalid-token-123');
  console.log(`Status: ${result.status}`);
  console.log(`Response:`, JSON.stringify(result.response, null, 2));
}

async function testInitialize(): Promise<void> {
  console.log("\n=== 5. Testing initialize ===");
  const result = await mcpRequest('initialize');
  console.log(`Status: ${result.status}`);
  console.log(`Response:`, JSON.stringify(result.response, null, 2));
}

async function testToolsList(): Promise<void> {
  console.log("\n=== 6. Testing tools/list ===");
  const result = await mcpRequest('tools/list');
  console.log(`Status: ${result.status}`);
  console.log(`Response:`, JSON.stringify(result.response, null, 2));
}

async function testFeishuSendMessage(): Promise<{ message_id: string; idempotency_key: string } | null> {
  console.log("\n=== 7. Testing feishu_send_message ===");
  
  const idempotencyKey = `test-message-${Date.now()}`;
  const result = await mcpRequest('tools/call', {
    name: 'feishu_send_message',
    arguments: {
      text: 'Preview verification: feishu_send_message tool test',
      idempotency_key: idempotencyKey,
    },
  });
  
  console.log(`Status: ${result.status}`);
  console.log(`Response:`, JSON.stringify(result.response, null, 2));
  console.log(`message_id: ${result.response.result?.structuredContent?.message_id}`);
  console.log(`delivered: ${result.response.result?.structuredContent?.delivered}`);
  
  return result.response.result?.structuredContent 
    ? { message_id: result.response.result.structuredContent.message_id, idempotency_key: idempotencyKey }
    : null;
}

async function testMessageDuplicate(originalKey: string): Promise<void> {
  console.log("\n=== 8. Testing feishu_send_message Idempotency ===");
  
  console.log(`\n--- Waiting 2 seconds before duplicate call ---`);
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  console.log(`\n--- 8.1 Second call with same key: ${originalKey} ---`);
  const result = await mcpRequest('tools/call', {
    name: 'feishu_send_message',
    arguments: {
      text: 'This should be a duplicate - should NOT appear in group',
      idempotency_key: originalKey,
    },
  });
  
  console.log(`Status: ${result.status}`);
  console.log(`Response:`, JSON.stringify(result.response, null, 2));
  console.log(`message_id: ${result.response.result?.structuredContent?.message_id}`);
  console.log(`duplicate: ${result.response.result?.structuredContent?.duplicate}`);
}

async function testConcurrentIdempotency(): Promise<void> {
  console.log("\n=== 9. Testing Concurrent Idempotency ===");
  
  const idempotencyKey = `test-concurrent-${Date.now()}`;
  
  console.log(`\n--- 9.1 Concurrent calls with same key: ${idempotencyKey} ---`);
  
  const promises = Array.from({ length: 3 }, async (_, i) => {
    const result = await mcpRequest('tools/call', {
      name: 'feishu_send_message',
      arguments: {
        text: `Concurrent test - request ${i + 1}`,
        idempotency_key: idempotencyKey,
      },
    });
    return { request: i + 1, ...result };
  });
  
  const results = await Promise.all(promises);
  
  results.forEach((result) => {
    console.log(`\nRequest ${result.request}:`);
    console.log(`Status: ${result.status}`);
    console.log(`message_id: ${result.response.result?.structuredContent?.message_id}`);
    console.log(`duplicate: ${result.response.result?.structuredContent?.duplicate}`);
  });
  
  const messageIds = results.map(r => r.response.result?.structuredContent?.message_id);
  const uniqueIds = [...new Set(messageIds)].filter(Boolean);
  
  console.log(`\n--- 9.2 Concurrency Verification ---`);
  console.log(`Total requests: ${results.length}`);
  console.log(`Unique message_ids: ${uniqueIds.length}`);
  console.log(`Concurrent control working: ${uniqueIds.length === 1}`);
}

async function testDifferentKeys(): Promise<void> {
  console.log("\n=== 10. Testing Different Keys ===");
  
  const key1 = `test-diff-key1-${Date.now()}`;
  const key2 = `test-diff-key2-${Date.now()}`;
  
  console.log(`\n--- 10.1 First key: ${key1} ---`);
  const result1 = await mcpRequest('tools/call', {
    name: 'feishu_send_message',
    arguments: {
      text: 'Different key test - message 1',
      idempotency_key: key1,
    },
  });
  console.log(`Status: ${result1.status}`);
  console.log(`message_id: ${result1.response.result?.structuredContent?.message_id}`);
  
  console.log(`\n--- 10.2 Second key: ${key2} ---`);
  const result2 = await mcpRequest('tools/call', {
    name: 'feishu_send_message',
    arguments: {
      text: 'Different key test - message 2',
      idempotency_key: key2,
    },
  });
  console.log(`Status: ${result2.status}`);
  console.log(`message_id: ${result2.response.result?.structuredContent?.message_id}`);
  
  console.log(`\n--- 10.3 Verification ---`);
  console.log(`Different message_ids: ${result1.response.result?.structuredContent?.message_id !== result2.response.result?.structuredContent?.message_id}`);
}

async function testFeishuSendImage(): Promise<{ message_id: string; idempotency_key: string; image_key: string } | null> {
  console.log("\n=== 11. Testing feishu_send_image ===");

  const idempotencyKey = `test-image-${Date.now()}`;
  const imageUrl = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop";

  const result = await mcpRequest('tools/call', {
    name: 'feishu_send_image',
    arguments: {
      url: imageUrl,
      idempotency_key: idempotencyKey,
    },
  });

  console.log(`Status: ${result.status}`);
  console.log(`Response:`, JSON.stringify(result.response, null, 2));
  console.log(`message_id: ${result.response.result?.structuredContent?.message_id}`);
  console.log(`image_key: ${result.response.result?.structuredContent?.image_key}`);
  console.log(`delivered: ${result.response.result?.structuredContent?.delivered}`);

  return result.response.result?.structuredContent
    ? {
        message_id: result.response.result.structuredContent.message_id,
        idempotency_key: idempotencyKey,
        image_key: result.response.result.structuredContent.image_key,
      }
    : null;
}

async function testFeishuSendFile(): Promise<{ message_id: string; idempotency_key: string; file_key: string } | null> {
  console.log("\n=== 12. Testing feishu_send_file (PDF) ===");

  const idempotencyKey = `test-pdf-${Date.now()}`;
  const fileUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

  const result = await mcpRequest('tools/call', {
    name: 'feishu_send_file',
    arguments: {
      url: fileUrl,
      idempotency_key: idempotencyKey,
    },
  });

  console.log(`Status: ${result.status}`);
  console.log(`Response:`, JSON.stringify(result.response, null, 2));
  console.log(`message_id: ${result.response.result?.structuredContent?.message_id}`);
  console.log(`file_key: ${result.response.result?.structuredContent?.file_key}`);
  console.log(`delivered: ${result.response.result?.structuredContent?.delivered}`);

  return result.response.result?.structuredContent
    ? {
        message_id: result.response.result.structuredContent.message_id,
        idempotency_key: idempotencyKey,
        file_key: result.response.result.structuredContent.file_key,
      }
    : null;
}

async function testFeishuSendZip(): Promise<{ message_id: string; idempotency_key: string; file_key: string } | null> {
  console.log("\n=== 13. Testing feishu_send_file (ZIP) ===");

  const idempotencyKey = `test-zip-${Date.now()}`;
  const fileUrl = "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-zip-file.zip";

  const result = await mcpRequest('tools/call', {
    name: 'feishu_send_file',
    arguments: {
      url: fileUrl,
      idempotency_key: idempotencyKey,
    },
  });

  console.log(`Status: ${result.status}`);
  console.log(`Response:`, JSON.stringify(result.response, null, 2));
  console.log(`message_id: ${result.response.result?.structuredContent?.message_id}`);
  console.log(`file_key: ${result.response.result?.structuredContent?.file_key}`);
  console.log(`delivered: ${result.response.result?.structuredContent?.delivered}`);

  return result.response.result?.structuredContent
    ? {
        message_id: result.response.result.structuredContent.message_id,
        idempotency_key: idempotencyKey,
        file_key: result.response.result.structuredContent.file_key,
      }
    : null;
}

async function testZipIdempotency(originalKey: string): Promise<void> {
  console.log("\n=== 14. Testing ZIP Idempotency ===");

  console.log(`\n--- Waiting 2 seconds before duplicate call ---`);
  await new Promise(resolve => setTimeout(resolve, 2000));

  console.log(`\n--- 14.1 Second call with same key: ${originalKey} ---`);
  const result = await mcpRequest('tools/call', {
    name: 'feishu_send_file',
    arguments: {
      url: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-zip-file.zip",
      idempotency_key: originalKey,
    },
  });

  console.log(`Status: ${result.status}`);
  console.log(`Response:`, JSON.stringify(result.response, null, 2));
  console.log(`message_id: ${result.response.result?.structuredContent?.message_id}`);
  console.log(`duplicate: ${result.response.result?.structuredContent?.duplicate}`);
}

async function main() {
  console.log("=".repeat(60));
  console.log("  Spartina Feishu MCP - Full Preview Verification");
  console.log("=".repeat(60));
  console.log(`Preview URL: ${PREVIEW_URL}`);
  console.log(`MCP URL: ${MCP_URL}`);
  console.log("=".repeat(60));
  
  await testHealthz();
  await testReadyz();
  await testNoToken();
  await testInvalidToken();
  await testInitialize();
  await testToolsList();
  
  const messageResult = await testFeishuSendMessage();
  if (messageResult) {
    await testMessageDuplicate(messageResult.idempotency_key);
  }
  
  await testConcurrentIdempotency();
  await testDifferentKeys();
  
  await testFeishuSendImage();
  await testFeishuSendFile();

  const zipResult = await testFeishuSendZip();
  if (zipResult) {
    await testZipIdempotency(zipResult.idempotency_key);
  }

  console.log("\n" + "=".repeat(60));
  console.log("  Verification Complete");
  console.log("=".repeat(60));
}

main().catch(console.error);
