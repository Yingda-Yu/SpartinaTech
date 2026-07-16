import { NextRequest, NextResponse } from 'next/server';

// ═══════════════════════════════════════════════════════════════════
// SpartinaTech Auto Image Generation - Receiver API Route
// ═══════════════════════════════════════════════════════════════════
//
// POST /api/auto-images
//   Receives a batch of generated images and metadata.
//   Body: { batchId, category, images: [{ filename, title, base64 }], zipUrl }
//   Authorization: Bearer token via AUTOMATIC_IMAGES_TOKEN env var
//
// GET /api/auto-images?limit=10
//   Returns recent auto-generated image batches metadata.
//
// NOTE: This implementation uses in-memory storage (Map) for demo purposes.
//       For production, upgrade to Vercel Blob (for image files) and
//       Vercel KV (for metadata) to persist data across deployments and
//       serverless invocations.
// ═══════════════════════════════════════════════════════════════════

// ─── Types ──────────────────────────────────────────────────────────

interface ImageMetadata {
  filename: string;
  title: string;
  base64?: string;
}

interface BatchRecord {
  batchId: string;
  category: string;
  images: Array<Pick<ImageMetadata, 'filename' | 'title'>>;
  zipUrl?: string;
  receivedAt: string; // ISO timestamp
  ip: string;
}

interface RequestBody {
  batchId?: unknown;
  category?: unknown;
  images?: unknown;
  zipUrl?: unknown;
}

// ─── In-memory storage ─────────────────────────────────────────────
// NOTE: Replace with Vercel KV (metadata) + Vercel Blob (image files)
//       in production. In-memory storage does NOT persist across
//       serverless function invocations or deployments.
const batches = new Map<string, BatchRecord>();
const MAX_STORED_BATCHES = 200;

// ─── Rate limiting (in-memory, per IP) ─────────────────────────────
// NOTE: For multi-instance / serverless deployments, use Vercel KV or
//       Upstash Redis for distributed rate limiting.
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 60; // max 60 requests / minute per IP
const requestCounts = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = requestCounts.get(ip);
  if (!entry || now > entry.resetAt) {
    requestCounts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX_REQUESTS;
}

// Periodically clean up expired rate-limit entries to avoid memory leaks.
// `.unref?.()` keeps this from blocking process exit in Node runtimes.
if (typeof setInterval !== 'undefined') {
  const cleanup = setInterval(() => {
    const now = Date.now();
    for (const [ip, entry] of requestCounts) {
      if (now > entry.resetAt) {
        requestCounts.delete(ip);
      }
    }
  }, 5 * 60_000);
  cleanup.unref?.();
}

// ─── Helpers ───────────────────────────────────────────────────────

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  return 'unknown';
}

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

function corsResponse(
  body: unknown,
  init?: { status?: number; headers?: HeadersInit },
): NextResponse {
  const headers = new Headers(init?.headers);
  for (const [key, value] of Object.entries(CORS_HEADERS)) {
    headers.set(key, value);
  }
  return NextResponse.json(body, { status: init?.status ?? 200, headers });
}

function unauthorized(message: string): NextResponse {
  return corsResponse({ ok: false, error: message }, { status: 401 });
}

function badRequest(message: string): NextResponse {
  return corsResponse({ ok: false, error: message }, { status: 400 });
}

function tooManyRequests(): NextResponse {
  return corsResponse(
    {
      ok: false,
      error: 'Rate limit exceeded. Max 60 requests/minute per IP.',
    },
    { status: 429 },
  );
}

function serverError(message: string): NextResponse {
  return corsResponse({ ok: false, error: message }, { status: 500 });
}

function verifyToken(req: NextRequest): boolean {
  const expected = process.env.AUTOMATIC_IMAGES_TOKEN;
  if (!expected) {
    // Fail closed: if no token is configured, deny all POST requests.
    return false;
  }
  const authHeader = req.headers.get('authorization') ?? '';
  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  if (!match) return false;

  // Constant-time-ish comparison to reduce timing-attack surface.
  const received = match[1].trim();
  if (received.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < received.length; i++) {
    diff |= received.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}

// ─── Feishu notification (optional) ────────────────────────────────
// If FEISHU_WEBHOOK_URL is set, forward a card message to the configured
// Feishu custom bot. This is fire-and-forget: failures are logged but do
// not affect the API response.
async function notifyFeishu(batch: BatchRecord): Promise<void> {
  const webhookUrl = process.env.FEISHU_WEBHOOK_URL;
  if (!webhookUrl) return; // Feishu forwarding is optional

  const card = {
    msg_type: 'interactive',
    card: {
      header: {
        title: { tag: 'plain_text', content: 'SpartinaTech 图片批次已生成' },
        template: 'blue',
      },
      elements: [
        {
          tag: 'div',
          fields: [
            {
              is_short: true,
              text: { tag: 'lark_md', content: `**批次ID**\n${batch.batchId}` },
            },
            {
              is_short: true,
              text: { tag: 'lark_md', content: `**分类**\n${batch.category}` },
            },
            {
              is_short: true,
              text: {
                tag: 'lark_md',
                content: `**图片数量**\n${batch.images.length}`,
              },
            },
            {
              is_short: true,
              text: {
                tag: 'lark_md',
                content: `**接收时间**\n${batch.receivedAt}`,
              },
            },
          ],
        },
        ...(batch.zipUrl
          ? [
              {
                tag: 'action',
                actions: [
                  {
                    tag: 'button',
                    text: { tag: 'plain_text', content: '下载 ZIP 压缩包' },
                    url: batch.zipUrl,
                    type: 'primary',
                  },
                ],
              },
            ]
          : []),
        {
          tag: 'div',
          text: {
            tag: 'lark_md',
            content:
              batch.images.length > 0
                ? batch.images
                    .slice(0, 10)
                    .map((img, i) => `${i + 1}. ${img.title} (\`${img.filename}\`)`)
                    .join('\n')
                : '(无图片)',
          },
        },
      ],
    },
  };

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(card),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      console.error(
        `[auto-images] Feishu webhook returned ${res.status}: ${text.slice(0, 200)}`,
      );
    }
  } catch (err) {
    console.error('[auto-images] Feishu notification failed:', err);
  }
}

// ─── OPTIONS (CORS preflight) ──────────────────────────────────────

export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

// ─── POST /api/auto-images ─────────────────────────────────────────
// Receives a batch of generated images and metadata.

export async function POST(req: NextRequest): Promise<NextResponse> {
  const ip = getClientIp(req);

  // 1. Rate limit check
  if (isRateLimited(ip)) {
    return tooManyRequests();
  }

  // 2. Auth check (Bearer token)
  if (!verifyToken(req)) {
    return unauthorized(
      'Invalid or missing Bearer token. Set AUTOMATIC_IMAGES_TOKEN env var.',
    );
  }

  // 3. Parse & validate JSON body
  let body: RequestBody;
  try {
    body = (await req.json()) as RequestBody;
  } catch {
    return badRequest('Invalid JSON body.');
  }

  const { batchId, category, images, zipUrl } = body;

  if (!batchId || typeof batchId !== 'string') {
    return badRequest('Missing or invalid "batchId" (expected string).');
  }
  if (!category || typeof category !== 'string') {
    return badRequest('Missing or invalid "category" (expected string).');
  }
  if (!Array.isArray(images) || images.length === 0) {
    return badRequest('Missing or empty "images" array.');
  }

  // Validate each image entry
  const normalizedImages: Array<{ filename: string; title: string }> = [];
  for (let i = 0; i < images.length; i++) {
    const img = images[i] as ImageMetadata | undefined;
    if (!img || typeof img.filename !== 'string' || typeof img.title !== 'string') {
      return badRequest(
        `images[${i}] must contain "filename" (string) and "title" (string).`,
      );
    }
    normalizedImages.push({ filename: img.filename, title: img.title });
  }

  // 4. Store metadata
  //    NOTE: base64 data is intentionally NOT stored in memory to avoid OOM.
  //    In production, upload base64 to Vercel Blob and store the returned URL.
  const record: BatchRecord = {
    batchId,
    category,
    images: normalizedImages,
    zipUrl: typeof zipUrl === 'string' ? zipUrl : undefined,
    receivedAt: new Date().toISOString(),
    ip,
  };

  batches.set(batchId, record);

  // Evict oldest entries if exceeding the storage cap
  if (batches.size > MAX_STORED_BATCHES) {
    const sorted = [...batches.entries()].sort(
      (a, b) =>
        new Date(a[1].receivedAt).getTime() - new Date(b[1].receivedAt).getTime(),
    );
    const toRemove = sorted.slice(0, batches.size - MAX_STORED_BATCHES);
    for (const [id] of toRemove) {
      batches.delete(id);
    }
  }

  // 5. Optionally forward notification to Feishu (non-blocking)
  notifyFeishu(record).catch((err) => {
    console.error('[auto-images] Unhandled Feishu notification error:', err);
  });

  // 6. Return success
  return corsResponse({
    ok: true,
    batchId,
    count: images.length,
    receivedAt: record.receivedAt,
  });
}

// ─── GET /api/auto-images?limit=10 ─────────────────────────────────
// Returns recent auto-generated image batches metadata.

export async function GET(req: NextRequest): Promise<NextResponse> {
  const ip = getClientIp(req);

  // Rate limit check
  if (isRateLimited(ip)) {
    return tooManyRequests();
  }

  // Parse limit query param (default 10, max 50)
  const { searchParams } = new URL(req.url);
  const rawLimit = searchParams.get('limit');
  let limit = 10;
  if (rawLimit) {
    const parsed = parseInt(rawLimit, 10);
    if (Number.isNaN(parsed) || parsed < 1) {
      return badRequest('"limit" must be a positive integer.');
    }
    limit = Math.min(parsed, 50);
  }

  try {
    // Return most recent batches (sorted by receivedAt desc)
    const recent = [...batches.values()]
      .sort(
        (a, b) =>
          new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime(),
      )
      .slice(0, limit)
      .map(({ ip: _ip, ...rest }) => rest); // strip internal IP field

    return corsResponse({
      ok: true,
      count: recent.length,
      total: batches.size,
      batches: recent,
    });
  } catch (err) {
    console.error('[auto-images] GET handler error:', err);
    return serverError('Failed to retrieve batches.');
  }
}
