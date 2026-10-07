// Renders the finished 3D hero once per theme and saves the static posters
// shown before (or instead of) the live scene.
// Usage: npm run build && npm start -- -p 4321, then: npm run make:poster
import { chromium } from "@playwright/test";
import sharp from "sharp";
import { mkdirSync, statSync } from "node:fs";
import { join } from "node:path";

const base = process.env.BASE_URL ?? "http://localhost:4321";
const outDir = join(process.cwd(), "public", "hero");
mkdirSync(outDir, { recursive: true });

const hideEverythingElse = `
  html, body { background: transparent !important; }
  body * { visibility: hidden !important; }
  [data-hero-slot], [data-hero-slot] * { visibility: visible !important; }
`;

const browser = await chromium.launch({ args: ["--use-angle=default", "--ignore-gpu-blocklist"] });
try {
  for (const theme of ["dark", "light"] as const) {
    const context = await browser.newContext({
      viewport: { width: 800, height: 600 },
      deviceScaleFactor: 2,
      colorScheme: theme,
      reducedMotion: "no-preference",
    });
    const page = await context.newPage();
    await page.goto(`${base}/?poster=1`, { waitUntil: "networkidle" });
    await page.addStyleTag({ content: hideEverythingElse });
    await page.waitForSelector("html[data-hero-ready='1']", { timeout: 30_000 });
    // Let textures, fonts and the transmission buffer settle.
    await page.waitForTimeout(1500);
    const png = await page.locator("[data-hero-slot]").screenshot({ omitBackground: true, type: "png" });
    const file = join(outDir, `poster-${theme}.avif`);
    await sharp(png).resize(1600, 1200).avif({ quality: 50, effort: 6 }).toFile(file);
    console.log(`${file}: ${(statSync(file).size / 1024).toFixed(0)} KB`);
    await context.close();
  }
} finally {
  await browser.close();
}
