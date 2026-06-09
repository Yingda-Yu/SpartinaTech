import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const githubPagesBasePath = "/SpartinaTech";

const nextConfig: NextConfig = isGitHubPages
  ? {
      output: "export",
      basePath: githubPagesBasePath,
      assetPrefix: `${githubPagesBasePath}/`,
      env: {
        NEXT_PUBLIC_BASE_PATH:
          process.env.NEXT_PUBLIC_BASE_PATH ?? githubPagesBasePath,
      },
      images: {
        unoptimized: true,
      },
    }
  : {};

export default nextConfig;
