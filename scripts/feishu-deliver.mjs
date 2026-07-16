/**
 * feishu-deliver.mjs
 *
 * Delivers generated images and notifications to a Feishu / Lark group chat.
 *
 * Two delivery modes are supported:
 *   - Mode A (default): Custom Bot Webhook, driven by FEISHU_WEBHOOK_URL.
 *       Sends an interactive card message (category-colored header, batch
 *       metadata, image-title preview, download + homepage buttons).
 *   - Mode B: App API, activated when FEISHU_APP_ID + FEISHU_APP_SECRET are
 *       set. Obtains a tenant_access_token, uploads the ZIP file, sends a file
 *       message, then sends the same interactive card. Falls back to the
 *       webhook (when available) if the App API path fails.
 *
 * Design constraints:
 *   - Uses only Node.js built-ins: global `fetch`, `node:fs/promises`,
 *     `node:path`, `node:crypto`. No npm dependencies.
 *   - Runs on Ubuntu (GitHub Actions) and Windows.
 *   - Never throws out of `deliverToFeishu`: failures are logged so the
 *     surrounding pipeline keeps running.
 *
 * Environment variables:
 *   FEISHU_WEBHOOK_URL   Custom bot webhook URL (Mode A / fallback target).
 *   FEISHU_APP_ID        App ID (defaults to the org app id below).
 *   FEISHU_APP_SECRET    App secret (presence selects Mode B).
 *   FEISHU_CHAT_ID       Target chat_id (defaults to the org group below).
 *   SITE_URL             Public site base URL (defaults to spartina.tech).
 *
 * Node.js >= 18 is required (global fetch + AbortController).
 */

import { readFile } from 'node:fs/promises';
import { basename } from 'node:path';
import { randomBytes } from 'node:crypto';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const FEISHU_API_BASE = 'https://open.feishu.cn';

/** Default target group chat ("米草科技有限公司"). */
const DEFAULT_CHAT_ID = 'oc_a416c665d186a8d388f96327047700f9';

/** Default Feishu App ID. */
const DEFAULT_APP_ID = 'cli_a965abcba6fadbd3';

/** Default public site URL. */
const DEFAULT_SITE_URL = 'https://spartina.tech';

/** Category -> Feishu card header template color. */
const CATEGORY_COLORS = {
  'visual-assets': 'purple',
  'game-assets': 'green',
  'industrial': 'blue',
  'education': 'orange',
};

/** Fallback header color for unknown categories. */
const DEFAULT_COLOR = 'blue';

/** Default per-request timeout in milliseconds. */
const DEFAULT_TIMEOUT_MS = 30_000;

/** Maximum number of image titles rendered inside the card. */
const MAX_TITLE_PREVIEW = 10;

// ---------------------------------------------------------------------------
// Structured logging (stderr, one JSON object per line)
// ---------------------------------------------------------------------------

/**
 * Emit a structured JSON log line to stderr.
 *
 * @param {string} event - Logical event name (e.g. "deliver_start").
 * @param {Record<string, unknown>} [data] - Additional structured fields.
 * @returns {void}
 */
function log(event, data = {}) {
  const line = JSON.stringify({ ts: new Date().toISOString(), event, ...data });
  process.stderr.write(line + '\n');
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Resolve a Feishu card header color for a category.
 *
 * @param {string} [category]
 * @returns {string} A Feishu header template name.
 */
function getCategoryColor(category) {
  return CATEGORY_COLORS[category] || DEFAULT_COLOR;
}

/**
 * `fetch` wrapper that aborts after a timeout and normalizes abort errors.
 *
 * @param {string} url
 * @param {RequestInit & { timeoutMs?: number }} [options]
 * @returns {Promise<Response>}
 */
async function fetchWithTimeout(url, options = {}) {
  const { timeoutMs = DEFAULT_TIMEOUT_MS, ...init } = options;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } catch (err) {
    if (err && err.name === 'AbortError') {
      throw new Error(`Request to ${url} timed out after ${timeoutMs}ms`);
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Best-effort JSON parsing of a response body. Never throws.
 *
 * @param {Response} res
 * @returns {Promise<unknown>}
 */
async function safeJson(res) {
  const text = await res.text();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    return { _raw: text };
  }
}

/**
 * Build a multipart/form-data body without external dependencies.
 *
 * @param {Array<{ name: string; value?: string; filename?: string; contentType?: string; data?: Buffer }>} fields
 * @returns {{ body: Buffer; contentType: string }}
 */
function buildMultipart(fields) {
  const boundary = '----FeishuBoundary' + randomBytes(16).toString('hex');
  const chunks = [];

  for (const field of fields) {
    chunks.push(Buffer.from(`--${boundary}\r\n`, 'utf8'));
    if (field.data && field.filename) {
      const disposition =
        `Content-Disposition: form-data; name="${field.name}"; filename="${field.filename}"\r\n` +
        `Content-Type: ${field.contentType || 'application/octet-stream'}\r\n\r\n`;
      chunks.push(Buffer.from(disposition, 'utf8'));
      chunks.push(field.data);
      chunks.push(Buffer.from('\r\n', 'utf8'));
    } else {
      const disposition =
        `Content-Disposition: form-data; name="${field.name}"\r\n\r\n` +
        `${field.value ?? ''}\r\n`;
      chunks.push(Buffer.from(disposition, 'utf8'));
    }
  }
  chunks.push(Buffer.from(`--${boundary}--\r\n`, 'utf8'));

  return {
    body: Buffer.concat(chunks),
    contentType: `multipart/form-data; boundary=${boundary}`,
  };
}

/**
 * Mask sensitive portions of a webhook URL for safe logging.
 *
 * @param {string} url
 * @returns {string}
 */
function maskUrl(url) {
  if (!url) return '';
  try {
    const u = new URL(url);
    const tok = u.searchParams.get('token') || '';
    if (tok) {
      u.searchParams.set('token', tok.slice(0, 4) + '****');
    }
    return `${u.origin}${u.pathname}?${u.searchParams.toString()}`;
  } catch {
    return url.slice(0, 32) + '****';
  }
}

/**
 * Resolve a download URL: absolute if it already starts with http(s),
 * otherwise concatenated with the site URL.
 *
 * @param {string} siteUrl
 * @param {string} downloadPath
 * @returns {string}
 */
function resolveDownloadUrl(siteUrl, downloadPath) {
  if (!downloadPath) return '';
  if (/^https?:\/\//i.test(downloadPath)) return downloadPath;
  const base = (siteUrl || '').replace(/\/+$/, '');
  const suffix = downloadPath.startsWith('/') ? downloadPath : `/${downloadPath}`;
  return `${base}${suffix}`;
}

// ---------------------------------------------------------------------------
// Card construction (Feishu interactive card schema, lark_md)
// ---------------------------------------------------------------------------

/**
 * Build a Feishu interactive card describing a generated image batch.
 *
 * @param {object} opts
 * @param {Array<{filename:string,title?:string,category?:string,filepath?:string}>} [opts.images]
 * @param {string} [opts.batchId]
 * @param {string} [opts.category]
 * @param {number} [opts.count]
 * @param {string} [opts.siteUrl]
 * @param {string} [opts.downloadPath]
 * @returns {object} A Feishu card schema object.
 */
function buildCard(opts) {
  const {
    images = [],
    batchId,
    category,
    count,
    siteUrl = DEFAULT_SITE_URL,
    downloadPath,
  } = opts;

  const color = getCategoryColor(category);
  const timestamp = new Date().toISOString();
  const total = typeof count === 'number' ? count : images.length;

  const titles = images
    .map((img) => img.title)
    .filter(Boolean)
    .slice(0, MAX_TITLE_PREVIEW);

  const lines = [];
  lines.push(`**批次 ID：** ${batchId || '-'}`);
  lines.push(`**类别：** ${category || '-'}`);
  lines.push(`**图片数量：** ${total}`);
  lines.push(`**时间：** ${timestamp}`);

  if (titles.length) {
    lines.push('');
    lines.push(`**图片标题（前 ${titles.length} 张）：**`);
    for (const t of titles) {
      lines.push(`- ${t}`);
    }
    if (images.length > MAX_TITLE_PREVIEW) {
      lines.push(`- ... 及其他 ${images.length - MAX_TITLE_PREVIEW} 张`);
    }
  }

  const actions = [];
  const downloadUrl = resolveDownloadUrl(siteUrl, downloadPath);
  if (downloadUrl) {
    actions.push({
      tag: 'button',
      text: { tag: 'plain_text', content: '下载 ZIP 压缩包' },
      url: downloadUrl,
      type: 'primary',
    });
  }
  actions.push({
    tag: 'button',
    text: { tag: 'plain_text', content: '查看官网' },
    url: DEFAULT_SITE_URL,
    type: 'default',
  });

  return {
    config: { wide_screen_mode: true },
    header: {
      title: {
        tag: 'plain_text',
        content: `🤖 SpartinaTech 自动图像生成 · ${batchId || ''}`.trim(),
      },
      template: color,
    },
    elements: [
      { tag: 'div', text: { tag: 'lark_md', content: lines.join('\n') } },
      { tag: 'hr' },
      { tag: 'action', actions },
    ],
  };
}

// ---------------------------------------------------------------------------
// Public API: Mode A - Custom Bot Webhook
// ---------------------------------------------------------------------------

/**
 * Send an interactive card message via a Feishu custom bot webhook.
 *
 * @param {string} webhookUrl - The custom bot webhook URL.
 * @param {string|object} cardContent - Card schema (object) or its JSON string.
 * @returns {Promise<object>} Parsed webhook response.
 * @throws {Error} If the webhook URL is missing, the HTTP call fails, or the
 *   Feishu API returns a non-zero `code`.
 */
export async function sendFeishuCard(webhookUrl, cardContent) {
  if (!webhookUrl) {
    throw new Error('sendFeishuCard: webhookUrl is required');
  }
  const card =
    typeof cardContent === 'string' ? JSON.parse(cardContent) : cardContent;

  log('webhook_send_start', { url: maskUrl(webhookUrl) });

  const res = await fetchWithTimeout(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ msg_type: 'interactive', card }),
  });

  const body = await safeJson(res);
  log('webhook_send_end', { status: res.status, body });

  if (!res.ok) {
    throw new Error(`Feishu webhook HTTP ${res.status}: ${JSON.stringify(body)}`);
  }
  // Feishu webhooks return { code: 0, ... } on success.
  if (body && typeof body === 'object' && 'code' in body && body.code !== 0) {
    throw new Error(
      `Feishu webhook error code ${body.code}: ${body.msg || ''}`
    );
  }
  return body;
}

// ---------------------------------------------------------------------------
// Public API: Mode B - App API
// ---------------------------------------------------------------------------

/**
 * Obtain a tenant_access_token using internal app credentials.
 *
 * @param {string} appId
 * @param {string} appSecret
 * @returns {Promise<string>} tenant_access_token
 * @throws {Error} If the API call fails or no token is returned.
 */
async function getTenantAccessToken(appId, appSecret) {
  log('token_request_start', { appId });

  const res = await fetchWithTimeout(
    `${FEISHU_API_BASE}/open-apis/auth/v3/tenant_access_token/internal`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ app_id: appId, app_secret: appSecret }),
    }
  );

  const body = await safeJson(res);
  log('token_request_end', {
    status: res.status,
    code: body && body.code,
    hasToken: Boolean(body && body.tenant_access_token),
  });

  if (!res.ok || (body && body.code !== 0) || !body?.tenant_access_token) {
    throw new Error(
      `Failed to obtain tenant_access_token: ${JSON.stringify(body)}`
    );
  }
  return body.tenant_access_token;
}

/**
 * Upload a file to Feishu and return its `file_key`.
 *
 * @param {string} appToken - A valid tenant_access_token.
 * @param {string} filePath - Absolute path to the file on disk.
 * @param {string} [fileName] - Override file name (defaults to basename).
 * @returns {Promise<string>} The uploaded file's `file_key`.
 * @throws {Error} If the upload fails or no file_key is returned.
 */
export async function uploadFileToFeishu(appToken, filePath, fileName) {
  if (!appToken) {
    throw new Error('uploadFileToFeishu: appToken is required');
  }
  if (!filePath) {
    throw new Error('uploadFileToFeishu: filePath is required');
  }

  const name = fileName || basename(filePath);
  const data = await readFile(filePath);

  log('file_upload_start', { fileName: name, size: data.length });

  // `duration` is the file_key validity window in seconds; must be > 0.
  const durationSeconds = String(Math.max(1, Math.ceil(data.length / 1024)));

  const { body, contentType } = buildMultipart([
    { name: 'file_type', value: 'zip' },
    { name: 'file_name', value: name },
    { name: 'duration', value: durationSeconds },
    { name: 'file', filename: name, contentType: 'application/zip', data },
  ]);

  const res = await fetchWithTimeout(`${FEISHU_API_BASE}/open-apis/im/v1/files`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${appToken}`,
      'Content-Type': contentType,
    },
    body,
  });

  const json = await safeJson(res);
  log('file_upload_end', {
    status: res.status,
    code: json && json.code,
    hasFileKey: Boolean(json && json.data && json.data.file_key),
  });

  if (!res.ok || (json && json.code !== 0) || !json?.data?.file_key) {
    throw new Error(`File upload failed: ${JSON.stringify(json)}`);
  }
  return json.data.file_key;
}

/**
 * Send a message to a Feishu chat via the App API.
 *
 * @param {string} token - A valid tenant_access_token.
 * @param {string} chatId - Target chat_id.
 * @param {string} msgType - Message type ("text", "file", "interactive", ...).
 * @param {object|string} content - Message content (objects are JSON-stringified).
 * @returns {Promise<object>} Parsed API response.
 * @throws {Error} If required args are missing or the API returns an error.
 */
export async function sendFeishuMessage(token, chatId, msgType, content) {
  if (!token) {
    throw new Error('sendFeishuMessage: token is required');
  }
  if (!chatId) {
    throw new Error('sendFeishuMessage: chatId is required');
  }
  if (!msgType) {
    throw new Error('sendFeishuMessage: msgType is required');
  }

  const contentStr =
    typeof content === 'string' ? content : JSON.stringify(content);

  log('message_send_start', { chatId, msgType });

  const res = await fetchWithTimeout(
    `${FEISHU_API_BASE}/open-apis/im/v1/messages?receive_id_type=chat_id`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        receive_id: chatId,
        msg_type: msgType,
        content: contentStr,
      }),
    }
  );

  const json = await safeJson(res);
  log('message_send_end', {
    chatId,
    msgType,
    status: res.status,
    code: json && json.code,
  });

  if (!res.ok || (json && json.code !== 0)) {
    throw new Error(
      `Feishu message send failed (${msgType}): ${JSON.stringify(json)}`
    );
  }
  return json;
}

// ---------------------------------------------------------------------------
// Orchestrator
// ---------------------------------------------------------------------------

/**
 * Deliver a batch of generated images and a notification card to Feishu.
 *
 * Strategy:
 *   - If FEISHU_APP_SECRET is set -> Mode B (App API):
 *       1. Obtain tenant_access_token.
 *       2. Best-effort: upload ZIP + send a file message.
 *       3. Send the interactive card message.
 *       On any fatal failure, fall back to the webhook (if configured).
 *   - Otherwise -> Mode A (webhook) via FEISHU_WEBHOOK_URL.
 *
 * This function NEVER throws: all errors are logged so the calling pipeline
 * (GitHub Actions / local script) can continue.
 *
 * @param {object} [options]
 * @param {Array<{filename:string,title?:string,category?:string,filepath?:string}>} [options.images]
 * @param {string} [options.zipPath] - Absolute path to the batch ZIP file.
 * @param {string} [options.batchId] - e.g. "20260717-14".
 * @param {string} [options.category] - e.g. "industrial".
 * @param {number} [options.count] - Number of images in the batch.
 * @param {string} [options.siteUrl] - Public site base URL.
 * @param {string} [options.downloadPath] - Site-relative or absolute ZIP path.
 * @returns {Promise<{ mode: string; success: boolean }>}
 */
export async function deliverToFeishu(options = {}) {
  const {
    images = [],
    zipPath,
    batchId,
    category,
    count,
    siteUrl = process.env.SITE_URL || DEFAULT_SITE_URL,
    downloadPath,
  } = options;

  log('deliver_start', {
    batchId,
    category,
    count,
    imageCount: images.length,
    hasZip: Boolean(zipPath),
  });

  const card = buildCard({
    images,
    batchId,
    category,
    count,
    siteUrl,
    downloadPath,
  });

  const appId = process.env.FEISHU_APP_ID || DEFAULT_APP_ID;
  const appSecret = process.env.FEISHU_APP_SECRET;
  const webhookUrl = process.env.FEISHU_WEBHOOK_URL;
  const chatId = process.env.FEISHU_CHAT_ID || DEFAULT_CHAT_ID;

  // App secret presence selects Mode B (App ID has a default).
  const useAppApi = Boolean(appSecret);

  let mode = 'webhook';
  let success = false;

  if (useAppApi) {
    mode = 'app_api';
    log('mode_selected', { mode, appId });

    try {
      const token = await getTenantAccessToken(appId, appSecret);
      log('token_acquired');

      // Best-effort ZIP upload + file message. Failures here do not abort the
      // card delivery below.
      if (zipPath) {
        try {
          const fileName = basename(zipPath);
          const fileKey = await uploadFileToFeishu(token, zipPath, fileName);
          log('file_uploaded', { fileKey, fileName });

          await sendFeishuMessage(token, chatId, 'file', { file_key: fileKey });
          log('file_message_sent', { chatId });
        } catch (err) {
          log('file_delivery_failed', { error: err.message });
          // Continue to card delivery.
        }
      }

      // Interactive card message. A failure here triggers webhook fallback.
      try {
        await sendFeishuMessage(token, chatId, 'interactive', card);
        log('card_message_sent', { chatId });
        success = true;
      } catch (err) {
        log('card_message_failed', { error: err.message });
        throw err;
      }
    } catch (err) {
      log('app_api_failed', { error: err.message });

      // Fall back to webhook if available.
      if (webhookUrl) {
        log('fallback_to_webhook');
        try {
          await sendFeishuCard(webhookUrl, JSON.stringify(card));
          success = true;
          mode = 'webhook_fallback';
          log('webhook_fallback_success');
        } catch (e) {
          log('webhook_fallback_failed', { error: e.message });
        }
      } else {
        log('no_webhook_fallback', {
          hint: 'Configure FEISHU_WEBHOOK_URL to enable graceful fallback.',
        });
      }
    }
  } else {
    mode = 'webhook';
    log('mode_selected', { mode });

    if (!webhookUrl) {
      log('no_webhook_configured', {
        hint:
          'Set FEISHU_WEBHOOK_URL (Mode A) or FEISHU_APP_ID + FEISHU_APP_SECRET (Mode B) to enable delivery.',
      });
    } else {
      try {
        await sendFeishuCard(webhookUrl, JSON.stringify(card));
        success = true;
      } catch (err) {
        log('webhook_failed', { error: err.message });
        // Do NOT throw - the pipeline must continue.
      }
    }
  }

  log('deliver_end', { batchId, mode, success });
  return { mode, success };
}

// ---------------------------------------------------------------------------
// Internal helpers re-exported for testing / reuse
// ---------------------------------------------------------------------------

export { buildCard, getCategoryColor, CATEGORY_COLORS };

// When executed directly (e.g. `node feishu-deliver.mjs`), run a self-test
// that posts a dry-run card if a webhook URL is configured.
const isMain = (() => {
  if (typeof process !== 'undefined' && process.argv[1]) {
    const entry = process.argv[1].replace(/\\/g, '/').toLowerCase();
    return entry.endsWith('feishu-deliver.mjs');
  }
  return false;
})();

if (isMain) {
  const sample = {
    images: [
      { filename: '01.png', title: '工业场景 - 装配线', category: 'industrial' },
      { filename: '02.png', title: '工业场景 - 机械臂', category: 'industrial' },
    ],
    zipPath: undefined,
    batchId: 'DRY-RUN',
    category: 'industrial',
    count: 2,
    siteUrl: DEFAULT_SITE_URL,
    downloadPath: '/images/auto/DRY-RUN/batch.zip',
  };

  log('selftest_start');
  deliverToFeishu(sample)
    .then((res) => {
      log('selftest_end', res);
    })
    .catch((err) => {
      // Should not happen (deliverToFeishu never throws), but guard anyway.
      log('selftest_unexpected_error', { error: err.message });
      process.exitCode = 1;
    });
}
