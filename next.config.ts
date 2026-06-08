import type { NextConfig } from "next";

const githubPagesBasePath =
  process.env.GITHUB_PAGES === "true" ? "/SpartinaTech" : undefined;

const nextConfig: NextConfig = {
  output: "export",
  basePath: githubPagesBasePath,
  assetPrefix: githubPagesBasePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
