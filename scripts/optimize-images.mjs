import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const imagesDir = path.join(rootDir, "public", "images");

const WEBP_QUALITY = 78;
const WEBP_EFFORT = 5;

const MAX_WIDTHS = {
  hero: 1600,
  industrial: 1600,
  services: 1200,
  projects: 1200,
  "visual-proof": 1200,
  wallpapers: 1200,
  brand: 1200,
  education: 1200,
  "game-film": 1200,
  "game-assets": 1600,
};

function getCategory(dirPath) {
  const relative = path.relative(imagesDir, dirPath);
  const parts = relative.split(path.sep);
  return parts[0] || "default";
}

function getMaxWidth(dirPath) {
  const category = getCategory(dirPath);
  return MAX_WIDTHS[category] || 1200;
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function processImage(inputPath, outputPath, dirPath) {
  const maxWidth = getMaxWidth(dirPath);
  const originalSize = fs.statSync(inputPath).size;

  let pipeline = sharp(inputPath).rotate();

  const metadata = await pipeline.metadata();
  if (metadata.width && metadata.width > maxWidth) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
  }

  pipeline = pipeline.webp({ quality: WEBP_QUALITY, effort: WEBP_EFFORT });

  await pipeline.toFile(outputPath);

  const webpSize = fs.statSync(outputPath).size;
  const savings = originalSize - webpSize;
  const savingsPercent = ((savings / originalSize) * 100).toFixed(1);

  return { originalSize, webpSize, savings, savingsPercent };
}

async function walkDir(dir, results = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath, results);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if ([".png", ".jpg", ".jpeg"].includes(ext)) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

async function main() {
  console.log("\n🖼️  Image Optimization Script");
  console.log("=".repeat(60));
  console.log(`Quality: ${WEBP_QUALITY}, Effort: ${WEBP_EFFORT}`);
  console.log("");

  if (!fs.existsSync(imagesDir)) {
    console.error("❌ Images directory not found:", imagesDir);
    process.exit(1);
  }

  const images = await walkDir(imagesDir);
  console.log(`Found ${images.length} images to process`);
  console.log("");

  let totalOriginal = 0;
  let totalWebp = 0;
  let processed = 0;
  let skipped = 0;

  for (const imgPath of images) {
    const dirPath = path.dirname(imgPath);
    const ext = path.extname(imgPath);
    const baseName = path.basename(imgPath, ext);
    const webpPath = path.join(dirPath, `${baseName}.webp`);
    const relativePath = path.relative(rootDir, imgPath);

    const originalSize = fs.statSync(imgPath).size;
    totalOriginal += originalSize;

    if (fs.existsSync(webpPath)) {
      const webpSize = fs.statSync(webpPath).size;
      totalWebp += webpSize;
      skipped++;
      console.log(`⏭️  SKIP (exists): ${relativePath}`);
      continue;
    }

    try {
      const result = await processImage(imgPath, webpPath, dirPath);
      totalWebp += result.webpSize;
      processed++;

      const savingsStr = result.savings > 0
        ? `-${result.savingsPercent}% (${formatBytes(result.savings)})`
        : `+${Math.abs(result.savingsPercent)}%`;

      console.log(
        `✅ ${relativePath}`.padEnd(60) +
        `${formatBytes(result.originalSize)} → ${formatBytes(result.webpSize)}`.padEnd(30) +
        savingsStr
      );
    } catch (err) {
      console.log(`❌ ERROR: ${relativePath} - ${err.message}`);
    }
  }

  console.log("");
  console.log("=".repeat(60));
  console.log("📊 Optimization Report");
  console.log("=".repeat(60));
  console.log(`Total images found:    ${images.length}`);
  console.log(`Newly processed:       ${processed}`);
  console.log(`Already existed:       ${skipped}`);
  console.log("");
  console.log(`Total original size:   ${formatBytes(totalOriginal)}`);
  console.log(`Total WebP size:       ${formatBytes(totalWebp)}`);
  const totalSavings = totalOriginal - totalWebp;
  const totalSavingsPercent = totalOriginal > 0
    ? ((totalSavings / totalOriginal) * 100).toFixed(1)
    : 0;
  console.log(`Total savings:         ${formatBytes(Math.abs(totalSavings))} (${totalSavingsPercent}%)`);
  console.log("");
  console.log("✅ Done!");
  console.log("");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
