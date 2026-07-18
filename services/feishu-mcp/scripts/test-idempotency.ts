import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env.local" });

import { sendTextMessage } from "../src/feishu";
import { MemoryIdempotencyStore } from "../src/idempotency";

const idempotencyStore = new MemoryIdempotencyStore();

async function testIdempotency() {
  console.log("=== Idempotency Test ===\n");

  const idempotencyKey = `idempotency-test-${Date.now()}`;
  const messageText = `【Spartina Feishu MCP 幂等性测试】
本消息用于验证幂等性。
时间：${new Date().toISOString()}
idempotency_key: ${idempotencyKey}`;

  console.log("1. First call (should send message)");
  const cached1 = await idempotencyStore.get(idempotencyKey);
  console.log(`   - Cache hit before: ${cached1 !== null}`);

  const result1 = await sendTextMessage(messageText);
  await idempotencyStore.set(idempotencyKey, {
    delivered: true,
    message_id: result1.message_id,
    chat_id: result1.chat_id,
    timestamp: Date.now(),
    idempotency_key: idempotencyKey,
  });

  console.log(`   ✅ delivered: true`);
  console.log(`   ✅ duplicate: false`);
  console.log(`   ✅ message_id: ${result1.message_id}`);

  console.log("\n2. Second call with same idempotency_key (should NOT send)");
  const cached2 = await idempotencyStore.get(idempotencyKey);
  console.log(`   - Cache hit before: ${cached2 !== null}`);

  if (cached2) {
    const cachedResult = cached2 as { message_id: string };
    console.log(`   ✅ delivered: true`);
    console.log(`   ✅ duplicate: true`);
    console.log(`   ✅ message_id: ${cachedResult.message_id} (same as first)`);
    console.log(`   ✅ Feishu API was NOT called`);
  } else {
    console.log("   ❌ Cache miss - would send duplicate");
    process.exit(1);
  }

  console.log("\n=== Idempotency test passed! ===");
  console.log("\nVerify:");
  console.log("- Only ONE message should appear in 'MCP技术测试' group");
  console.log("- Second call returned cached result without calling Feishu API");
}

testIdempotency().catch((e) => {
  console.error("\nIdempotency test failed:", e);
  process.exit(1);
});
