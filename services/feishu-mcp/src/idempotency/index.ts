interface IdempotencyRecord {
  idempotency_key: string;
  result: unknown;
  timestamp: number;
}

const idempotencyStore: Map<string, IdempotencyRecord> = new Map();

const MAX_CACHE_AGE_MS = 24 * 60 * 60 * 1000;

export function getCachedResult(idempotencyKey: string): unknown | null {
  const record = idempotencyStore.get(idempotencyKey);
  if (!record) return null;

  if (Date.now() - record.timestamp > MAX_CACHE_AGE_MS) {
    idempotencyStore.delete(idempotencyKey);
    return null;
  }

  return record.result;
}

export function cacheResult(idempotencyKey: string, result: unknown): void {
  idempotencyStore.set(idempotencyKey, {
    idempotency_key: idempotencyKey,
    result,
    timestamp: Date.now(),
  });
}

export function cleanupOldRecords(): void {
  const now = Date.now();
  for (const [key, record] of idempotencyStore.entries()) {
    if (now - record.timestamp > MAX_CACHE_AGE_MS) {
      idempotencyStore.delete(key);
    }
  }
}
