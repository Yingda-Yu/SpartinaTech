export interface IdempotencyStore {
  get(idempotencyKey: string): Promise<unknown | null>;
  set(idempotencyKey: string, result: unknown): Promise<void>;
  delete(idempotencyKey: string): Promise<void>;
  cleanup(): Promise<void>;
}

export class MemoryIdempotencyStore implements IdempotencyStore {
  private readonly store = new Map<string, { result: unknown; timestamp: number }>();
  private readonly maxCacheAgeMs = 24 * 60 * 60 * 1000;

  async get(idempotencyKey: string): Promise<unknown | null> {
    const record = this.store.get(idempotencyKey);
    if (!record) return null;

    if (Date.now() - record.timestamp > this.maxCacheAgeMs) {
      this.store.delete(idempotencyKey);
      return null;
    }

    return record.result;
  }

  async set(idempotencyKey: string, result: unknown): Promise<void> {
    this.store.set(idempotencyKey, {
      result,
      timestamp: Date.now(),
    });
  }

  async delete(idempotencyKey: string): Promise<void> {
    this.store.delete(idempotencyKey);
  }

  async cleanup(): Promise<void> {
    const now = Date.now();
    for (const [key, record] of this.store.entries()) {
      if (now - record.timestamp > this.maxCacheAgeMs) {
        this.store.delete(key);
      }
    }
  }

  get size(): number {
    return this.store.size;
  }
}

export { MemoryIdempotencyStore as __DEV_ONLY_MemoryIdempotencyStore };
