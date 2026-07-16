/**
 * SpartinaTech Auto Image Generation Pipeline
 * ═══════════════════════════════════════════════════════════════
 * 
 * Orchestrates the full pipeline:
 *   1. Generate 30 diverse prompts (rotating by hour)
 *   2. Call OpenAI Image API (gpt-image-1 / dall-e-2 / dall-e-3)
 *   3. Save images to public/images/auto/{batchId}/
 *   4. Create manifest.json + batch.zip
 *   5. Optionally upload to SpartinaTech website API
 *   6. Deliver notification + download link to Feishu group
 * 
 * Runs in: GitHub Actions (Ubuntu) or locally (Windows/macOS)
 * Dependencies: Node.js 22+ built-in modules only
 * 
 * Usage:
 *   node scripts/auto-generate-pipeline.mjs
 * 
 * Environment variables (see .env.example for details):
 *   OPENAI_API_KEY        (required) OpenAI Platform API key
 *   OPENAI_IMAGE_MODEL    (optional) gpt-image-1 | dall-e-2 | dall-e-3
 *   IMAGE_COUNT           (optional) default 30
 *   OPENAI_IMAGE_SIZE     (optional) default 1024x1024
 *   SITE_URL              (optional) default https://spartina.tech
 *   FEISHU_WEBHOOK_URL    (optional) custom bot webhook
 *   FEISHU_APP_ID         (optional) app credentials for file upload
 *   FEISHU_APP_SECRET      optional)
 *   FEISHU_CHAT_ID        (optional) target group chat ID
 *   API_UPLOAD_URL        (optional) SpartinaTech API endpoint
 *   API_UPLOAD_TOKEN      (optional) auth token for API
 *   CONCURRENCY           (optional) parallel API calls, default 5
 *   MAX_RETRIES           (optional) retry count, default 3
 */

import { generatePrompts, getBatchMetadata, BATCH_SIZE } from './prompts-rotator.mjs';
import { deliverToFeishu } from './feishu-deliver.mjs';
import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ─── Config ──────────────────────────────────────────────────────────

const CONFIG = {
  apiKey: process.env.OPENAI_API_KEY,
  model: process.env.OPENAI_IMAGE_MODEL || 'gpt-image-1',
  count: parseInt(process.env.IMAGE_COUNT || String(BATCH_SIZE), 10),
  size: process.env.OPENAI_IMAGE_SIZE || '1024x1024',
  siteUrl: (process.env.SITE_URL || 'https://spartina.tech').replace(/\/$/, ''),
  concurrency: parseInt(process.env.CONCURRENCY || '5', 10),
  maxRetries: parseInt(process.env.MAX_RETRIES || '3', 10),
  retryBaseDelay: 2000,
  // Feishu
  feishuWebhookUrl: process.env.FEISHU_WEBHOOK_URL,
  feishuAppId: process.env.FEISHU_APP_ID,
  feishuAppSecret: process.env.FEISHU_APP_SECRET,
  feishuChatId: process.env.FEISHU_CHAT_ID || 'oc_a416c665d186a8d388f96327047700f9',
  // API upload
  apiUploadUrl: process.env.API_UPLOAD_URL,
  apiUploadToken: process.env.API_UPLOAD_TOKEN,
};

// ─── Logging ────────────────────────────────────────────────────────

function log(event, data = {}) {
  const entry = { ts: new Date().toISOString(), event, ...data };
  process.stderr.write(JSON.stringify(entry) + '\n');
}

// ─── Paths ──────────────────────────────────────────────────────────

function getProjectRoot() {
  // Walk up from __dirname (scripts/) to find the project root
  let dir = __dirname;
  for (let i = 0; i < 5; i++) {
    if (existsSync(join(dir, 'package.json')) && existsSync(join(dir, 'src'))) {
      return dir;
    }
    dir = dirname(dir);
  }
  // Fallback: assume parent of scripts/
  return dirname(__dirname);
}

function getOutputDir(batchId) {
  const root = getProjectRoot();
  return join(root, 'public', 'images', 'auto', batchId);
}

// ─── OpenAI Image API ───────────────────────────────────────────────

async function generateSingleImage(prompt, index) {
  const { model, apiKey, size } = CONFIG;
  
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not set');
  }

  const body = {
    model,
    prompt,
    n: 1,
    size,
    response_format: 'b64_json',
  };

  // gpt-image-1 uses a slightly different response format
  if (model === 'gpt-image-1') {
    delete body.response_format; // gpt-image-1 always returns b64_json
  }

  let lastError;
  
  for (let attempt = 1; attempt <= CONFIG.maxRetries; attempt++) {
    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'unknown');
        const status = response.status;
        
        // Rate limit or server error: retry
        if (status === 429 || status >= 500) {
          lastError = new Error(`OpenAI API ${status}: ${errorText}`);
          log('api_retry', { index, attempt, status, error: errorText.substring(0, 200) });
          const delay = CONFIG.retryBaseDelay * Math.pow(2, attempt - 1);
          await sleep(delay);
          continue;
        }
        
        // Client error: don't retry
        throw new Error(`OpenAI API ${status}: ${errorText.substring(0, 500)}`);
      }

      const data = await response.json();
      
      if (!data.data || !data.data[0]) {
        throw new Error('OpenAI API returned no image data');
      }

      const b64 = data.data[0].b64_json;
      if (!b64) {
        throw new Error('OpenAI API returned no b64_json field');
      }

      return b64;
    } catch (err) {
      if (err.message.startsWith('OpenAI API 4') || err.message.startsWith('OpenAI API 5')) {
        // Already handled above, this is the lastError from retry
        lastError = err;
        continue;
      }
      // Network error or JSON parse error
      lastError = err;
      log('api_error', { index, attempt, error: err.message.substring(0, 200) });
      const delay = CONFIG.retryBaseDelay * Math.pow(2, attempt - 1);
      await sleep(delay);
    }
  }

  throw lastError || new Error(`Failed after ${CONFIG.maxRetries} retries`);
}

// ─── Batch Generation ───────────────────────────────────────────────

async function generateBatch(prompts) {
  const results = [];
  const errors = [];
  
  // Process in concurrent batches
  for (let i = 0; i < prompts.length; i += CONFIG.concurrency) {
    const batch = prompts.slice(i, i + CONFIG.concurrency);
    const batchNum = Math.floor(i / CONFIG.concurrency) + 1;
    const totalBatches = Math.ceil(prompts.length / CONFIG.concurrency);
    
    log('batch_start', { batch: batchNum, total: totalBatches, indices: batch.map(b => b.filename) });

    const promises = batch.map(async (item, j) => {
      const index = i + j;
      try {
        const b64 = await generateSingleImage(item.prompt, index);
        const buffer = Buffer.from(b64, 'base64');
        log('image_generated', { index, filename: item.filename, sizeKB: Math.round(buffer.length / 1024) });
        return { ...item, buffer, success: true };
      } catch (err) {
        log('image_failed', { index, filename: item.filename, error: err.message.substring(0, 200) });
        errors.push({ filename: item.filename, error: err.message });
        return { ...item, buffer: null, success: false, error: err.message };
      }
    });

    const batchResults = await Promise.all(promises);
    results.push(...batchResults);
  }

  return { results, errors };
}

// ─── File Operations ───────────────────────────────────────────────

function saveImages(results, outputDir) {
  const saved = [];
  
  for (const result of results) {
    if (!result.success || !result.buffer) {
      continue;
    }
    
    const filepath = join(outputDir, result.filename);
    writeFileSync(filepath, result.buffer);
    saved.push({
      filename: result.filename,
      title: result.title,
      category: result.category,
      filepath,
      sizeBytes: result.buffer.length,
    });
  }

  return saved;
}

function createManifest(batchMetadata, savedImages, errors) {
  return {
    batchId: batchMetadata.batchId,
    category: batchMetadata.category,
    description: batchMetadata.description,
    timestamp: batchMetadata.timestamp,
    model: CONFIG.model,
    size: CONFIG.size,
    totalRequested: CONFIG.count,
    totalGenerated: savedImages.length,
    totalFailed: errors.length,
    images: savedImages.map(img => ({
      filename: img.filename,
      title: img.title,
      category: img.category,
      sizeBytes: img.sizeBytes,
      url: `${CONFIG.siteUrl}/images/auto/${batchMetadata.batchId}/${img.filename}`,
    })),
    errors: errors.length > 0 ? errors : undefined,
    generatedBy: 'SpartinaTech Auto Pipeline',
    version: '1.0.0',
  };
}

function createZip(outputDir, batchId) {
  const zipPath = join(outputDir, 'batch.zip');
  const platform = process.platform;
  
  try {
    if (platform === 'win32') {
      // Windows: use PowerShell Compress-Archive
      const psCmd = `Compress-Archive -Path "${outputDir}\\*.png" -DestinationPath "${zipPath}" -Force`;
      execSync(`powershell -Command "${psCmd}"`, { stdio: 'pipe' });
    } else {
      // Linux/macOS: use zip command
      execSync(`cd "${outputDir}" && zip -j batch.zip *.png`, { stdio: 'pipe' });
    }
    
    const zipSize = statSync(zipPath).size;
    log('zip_created', { zipPath, sizeMB: Math.round(zipSize / (1024 * 1024) * 100) / 100 });
    return zipPath;
  } catch (err) {
    log('zip_error', { error: err.message.substring(0, 200) });
    // Fallback: try to create zip without images that might have failed
    return null;
  }
}

// ─── API Upload (Optional) ──────────────────────────────────────────

async function uploadToWebsite(savedImages, batchMetadata, zipPath) {
  if (!CONFIG.apiUploadUrl || !CONFIG.apiUploadToken) {
    log('api_upload_skipped', { reason: 'API_UPLOAD_URL or API_UPLOAD_TOKEN not set' });
    return { skipped: true };
  }

  try {
    // Upload manifest + metadata (not the actual image files, those go via git)
    const payload = {
      batchId: batchMetadata.batchId,
      category: batchMetadata.category,
      images: savedImages.map(img => ({
        filename: img.filename,
        title: img.title,
        category: img.category,
      })),
      zipUrl: `${CONFIG.siteUrl}/images/auto/${batchMetadata.batchId}/batch.zip`,
    };

    const response = await fetch(CONFIG.apiUploadUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CONFIG.apiUploadToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => 'unknown');
      log('api_upload_error', { status: response.status, error: text.substring(0, 200) });
      return { success: false, error: text };
    }

    const data = await response.json().catch(() => ({}));
    log('api_upload_success', { batchId: batchMetadata.batchId });
    return { success: true, data };
  } catch (err) {
    log('api_upload_error', { error: err.message.substring(0, 200) });
    return { success: false, error: err.message };
  }
}

// ─── Cleanup Old Batches ────────────────────────────────────────────

function cleanupOldBatches(outputBaseDir, maxKeep = 48) {
  try {
    if (!existsSync(outputBaseDir)) return;
    
    const batches = readdirSync(outputBaseDir)
      .map(name => ({
        name,
        path: join(outputBaseDir, name),
        mtime: statSync(join(outputBaseDir, name)).mtimeMs,
      }))
      .sort((a, b) => b.mtime - a.mtime);

    if (batches.length <= maxKeep) return;

    const toRemove = batches.slice(maxKeep);
    for (const batch of toRemove) {
      try {
        execSync(`rm -rf "${batch.path}"`, { stdio: 'pipe' });
        log('cleanup_batch', { batch: batch.name });
      } catch {
        // Ignore cleanup errors
      }
    }
  } catch {
    // Non-fatal
  }
}

// ─── Utilities ──────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function formatDuration(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
}

// ─── Main Pipeline ──────────────────────────────────────────────────

async function main() {
  const startTime = Date.now();
  
  log('pipeline_start', {
    model: CONFIG.model,
    count: CONFIG.count,
    size: CONFIG.size,
    concurrency: CONFIG.concurrency,
  });

  // 1. Validate config
  if (!CONFIG.apiKey) {
    log('fatal_error', { error: 'OPENAI_API_KEY is not set' });
    process.exit(1);
  }

  // 2. Generate prompts and metadata
  const now = new Date();
  const batchMetadata = getBatchMetadata(now);
  const allPrompts = generatePrompts(now);
  const prompts = allPrompts.slice(0, CONFIG.count);

  log('batch_info', {
    batchId: batchMetadata.batchId,
    category: batchMetadata.category,
    description: batchMetadata.description,
    promptCount: prompts.length,
  });

  // 3. Create output directory
  const outputDir = getOutputDir(batchMetadata.batchId);
  mkdirSync(outputDir, { recursive: true });
  log('output_dir', { path: outputDir });

  // 4. Generate images
  log('generation_start', { count: prompts.length, model: CONFIG.model });
  const { results, errors } = await generateBatch(prompts);
  log('generation_complete', {
    success: results.filter(r => r.success).length,
    failed: errors.length,
  });

  // 5. Save images to disk
  const savedImages = saveImages(results, outputDir);
  log('images_saved', { count: savedImages.length, dir: outputDir });

  if (savedImages.length === 0) {
    log('fatal_error', { error: 'No images were successfully generated' });
    process.exit(1);
  }

  // 6. Create manifest.json
  const manifest = createManifest(batchMetadata, savedImages, errors);
  const manifestPath = join(outputDir, 'manifest.json');
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  log('manifest_saved', { path: manifestPath, images: manifest.totalGenerated });

  // 7. Create ZIP archive
  const zipPath = createZip(outputDir, batchMetadata.batchId);

  // 8. Cleanup old batches (keep latest 48 = 2 days of hourly batches)
  const outputBaseDir = dirname(outputDir);
  cleanupOldBatches(outputBaseDir, 48);

  // 9. Upload to website API (optional)
  const apiResult = await uploadToWebsite(savedImages, batchMetadata, zipPath);

  // 10. Deliver to Feishu
  const downloadPath = `/images/auto/${batchMetadata.batchId}/batch.zip`;
  
  log('feishu_delivery_start', {
    webhookConfigured: !!CONFIG.feishuWebhookUrl,
    appConfigured: !!(CONFIG.feishuAppId && CONFIG.feishuAppSecret),
    chatId: CONFIG.feishuChatId,
  });

  const feishuResult = await deliverToFeishu({
    images: savedImages.map(img => ({
      filename: img.filename,
      title: img.title,
      category: img.category,
      filepath: img.filepath,
    })),
    zipPath: zipPath || '',
    batchId: batchMetadata.batchId,
    category: batchMetadata.category,
    count: savedImages.length,
    siteUrl: CONFIG.siteUrl,
    downloadPath,
  });

  log('feishu_delivery_complete', { result: feishuResult });

  // 11. Summary
  const duration = Date.now() - startTime;
  const summary = {
    batchId: batchMetadata.batchId,
    category: batchMetadata.category,
    model: CONFIG.model,
    requested: CONFIG.count,
    generated: savedImages.length,
    failed: errors.length,
    zipCreated: !!zipPath,
    apiUploaded: apiResult.success || apiResult.skipped,
    feishuDelivered: feishuResult.success,
    duration: formatDuration(duration),
    outputDir,
    downloadUrl: `${CONFIG.siteUrl}${downloadPath}`,
    manifestUrl: `${CONFIG.siteUrl}/images/auto/${batchMetadata.batchId}/manifest.json`,
  };

  log('pipeline_complete', summary);

  // Print summary to stdout for GitHub Actions
  console.log(JSON.stringify(summary, null, 2));

  // Exit with error code if too many failures
  if (errors.length > CONFIG.count * 0.5) {
    log('warning', { message: 'More than 50% of images failed' });
    process.exit(1);
  }
}

// ─── Entry Point ────────────────────────────────────────────────────

main().catch(err => {
  log('fatal_error', { error: err.message, stack: err.stack?.substring(0, 500) });
  process.exit(1);
});
