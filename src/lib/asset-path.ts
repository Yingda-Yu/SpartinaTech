const assetBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function assetPath(path: string): string {
  if (!path) return path;
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  if (path.startsWith(`${assetBasePath}/`)) {
    return path;
  }
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${assetBasePath}${normalizedPath}`;
}

export function getWebpPath(pngPath: string): string {
  if (!pngPath) return pngPath;
  return pngPath.replace(/\.(png|jpg|jpeg)$/i, ".webp");
}

export function getFallbackPath(webpPath: string): string {
  if (!webpPath) return webpPath;
  return webpPath.replace(/\.webp$/i, ".png");
}
