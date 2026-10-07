import type { MetadataRoute } from "next";
import { site } from "@/site.config";
import { buildDate } from "@/lib/build";

const pages = [
  "/",
  "/products",
  "/products/finance",
  "/products/replay",
  "/about",
  "/security",
  "/contact",
  "/changelog",
  "/legal",
  "/legal/privacy",
  "/legal/terms",
  "/legal/cookies",
  "/legal/acceptable-use",
  "/legal/ai",
  "/delete-account",
];

/** Legal pages change on their effective date; everything else on each build. */
function lastModified(path: string) {
  const isLegal = path.startsWith("/legal/") || path === "/delete-account";
  const effective = new Date(site.effectiveDate);
  return isLegal && !Number.isNaN(effective.getTime()) ? effective : buildDate;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((path) => ({
    url: path === "/" ? site.url : `${site.url}${path}`,
    lastModified: lastModified(path),
    changeFrequency: path.startsWith("/legal") ? "yearly" : "monthly",
    priority: path === "/" ? 1 : path === "/products/finance" ? 0.9 : 0.6,
  }));
}
