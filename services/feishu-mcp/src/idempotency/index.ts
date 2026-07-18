export interface IdempotencyStore {
  get(idempotencyKey: string): Promise<unknown | null>;
  set(idempotencyKey: string, result: unknown): Promise<void>;
  delete(idempotencyKey: string): Promise<void>;
  cleanup(): Promise<void>;
  isReady(): boolean;
}

export type IdempotencyStatus = 'processing' | 'sent' | 'failed';

export interface IdempotencyRecord {
  status: IdempotencyStatus;
  result?: unknown;
  error?: string;
  timestamp: number;
}

export class MemoryIdempotencyStore implements IdempotencyStore {
  private readonly store = new Map<string, IdempotencyRecord>();
  private readonly maxCacheAgeMs = 7 * 24 * 60 * 60 * 1000;

  isReady(): boolean {
    return true;
  }

  async get(idempotencyKey: string): Promise<unknown | null> {
    const record = this.store.get(idempotencyKey);
    if (!record) return null;

    if (Date.now() - record.timestamp > this.maxCacheAgeMs) {
      this.store.delete(idempotencyKey);
      return null;
    }

    if (record.status === 'sent') {
      return record.result;
    }

    return record;
  }

  async set(idempotencyKey: string, result: unknown): Promise<void> {
    this.store.set(idempotencyKey, {
      status: 'sent',
      result,
      timestamp: Date.now(),
    });
  }

  async setProcessing(idempotencyKey: string): Promise<boolean> {
    const existing = this.store.get(idempotencyKey);
    if (existing) {
      return false;
    }
    this.store.set(idempotencyKey, {
      status: 'processing',
      timestamp: Date.now(),
    });
    return true;
  }

  async setFailed(idempotencyKey: string, error: string): Promise<void> {
    this.store.set(idempotencyKey, {
      status: 'failed',
      error,
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

export class RedisIdempotencyStore implements IdempotencyStore {
  private client: any;
  private readonly ttlSeconds: number;
  private readonly isConnected: boolean;

  constructor(redisUrl: string, redisToken: string, ttlSeconds: number = 604800) {
    this.ttlSeconds = ttlSeconds;
    try {
      const { Redis } = require('@upstash/redis');
      this.client = new Redis({ url: redisUrl, token: redisToken });
      this.isConnected = true;
    } catch {
      this.isConnected = false;
    }
  }

  isReady(): boolean {
    return this.isConnected;
  }

  private buildKey(toolName: string, chatId: string, idempotencyKey: string): string {
    return `feishu-mcp:${toolName}:${chatId}:${idempotencyKey}`;
  }

  async get(idempotencyKey: string): Promise<unknown | null> {
    if (!this.isConnected) return null;
    try {
      const value = await this.client.get(idempotencyKey);
      if (!value) return null;
      const record = JSON.parse(value) as IdempotencyRecord;
      if (record.status === 'sent') {
        return record.result;
      }
      return record;
    } catch {
      return null;
    }
  }

  async set(idempotencyKey: string, result: unknown): Promise<void> {
    if (!this.isConnected) return;
    try {
      const record: IdempotencyRecord = {
        status: 'sent',
        result,
        timestamp: Date.now(),
      };
      await this.client.set(idempotencyKey, JSON.stringify(record), {
        nx: false,
        ex: this.ttlSeconds,
      });
    } catch {
      // Redis errors are silent in set operations
    }
  }

  async setProcessing(idempotencyKey: string): Promise<boolean> {
    if (!this.isConnected) return false;
    try {
      const record: IdempotencyRecord = {
        status: 'processing',
        timestamp: Date.now(),
      };
      const result = await this.client.set(idempotencyKey, JSON.stringify(record), {
        nx: true,
        ex: 60,
      });
      return result === 'OK';
    } catch {
      return false;
    }
  }

  async setFailed(idempotencyKey: string, error: string): Promise<void> {
    if (!this.isConnected) return;
    try {
      const record: IdempotencyRecord = {
        status: 'failed',
        error,
        timestamp: Date.now(),
      };
      await this.client.set(idempotencyKey, JSON.stringify(record), {
        nx: false,
        ex: this.ttlSeconds,
      });
    } catch {
      // Redis errors are silent in set operations
    }
  }

  async delete(idempotencyKey: string): Promise<void> {
    if (!this.isConnected) return;
    try {
      await this.client.del(idempotencyKey);
    } catch {
      // Redis errors are silent in delete operations
    }
  }

  async cleanup(): Promise<void> {
    // Redis handles cleanup via TTL, no manual cleanup needed
  }

  async close(): Promise<void> {
    if (this.client && typeof this.client.quit === 'function') {
      try {
        await this.client.quit();
      } catch {
        // Ignore close errors
      }
    }
  }
}

export function createIdempotencyStore(): IdempotencyStore {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  const ttlSeconds = parseInt(process.env.IDEMPOTENCY_TTL_SECONDS || '604800', 10);

  if (redisUrl && redisToken) {
    return new RedisIdempotencyStore(redisUrl, redisToken, ttlSeconds);
  }

  return new MemoryIdempotencyStore();
}

export { MemoryIdempotencyStore as __DEV_ONLY_MemoryIdempotencyStore };
