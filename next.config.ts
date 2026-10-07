import type { NextConfig } from "next";
import createMDX from "@next/mdx";

// Captured once at build time. Pages read it from process.env, because
// calling new Date() while prerendering is not allowed with Cache Components.
const buildDate = new Date().toISOString();

const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "worker-src 'self' blob:",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  // Add "; preload" only after the owner confirms every subdomain is HTTPS only.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Content-Security-Policy", value: csp },
];

const finance = "https://finance.trackwithagent.com";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  pageExtensions: ["ts", "tsx", "mdx"],
  env: {
    BUILD_DATE: buildDate,
    // Analytics only works on Vercel; locally its script would 404.
    ANALYTICS: process.env.VERCEL ? "on" : "",
  },
  images: { formats: ["image/avif", "image/webp"] },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      { source: "/privacy", destination: "/legal/privacy", permanent: true },
      { source: "/terms", destination: "/legal/terms", permanent: true },
      { source: "/cookies", destination: "/legal/cookies", permanent: true },
      { source: "/data-deletion", destination: "/delete-account", permanent: true },
      { source: "/legal/data-deletion", destination: "/delete-account", permanent: true },
      { source: "/finance", destination: "/products/finance", permanent: true },
      { source: "/replay", destination: "/products/replay", permanent: true },
      { source: "/login", destination: `${finance}/login`, permanent: true },
      { source: "/signup", destination: `${finance}/signup`, permanent: true },
      { source: "/app", destination: finance, permanent: true },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
  },
});

export default withMDX(nextConfig);
