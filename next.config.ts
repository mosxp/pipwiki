import type { NextConfig } from "next";

const repository = process.env.GITHUB_REPOSITORY ?? "";
const [owner, repo] = repository.split("/");
const isProjectPage =
  process.env.GITHUB_ACTIONS === "true" &&
  Boolean(repo) &&
  repo !== `${owner}.github.io`;

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  ...(isProjectPage ? { basePath: `/${repo}` } : {}),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
