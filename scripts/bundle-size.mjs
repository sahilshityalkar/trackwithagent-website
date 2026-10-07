// Reports gzipped JS for a built page: what loads up front, and the lazy 3D chunk.
// Usage: npm run build && npm start (port 4321), then: node scripts/bundle-size.mjs [path]
import { gzipSync } from "node:zlib";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const base = "http://localhost:4321";
const path = process.argv[2] ?? "/";
const html = await (await fetch(base + path)).text();
const initial = [...html.matchAll(/<script[^>]+src="([^"]+\.js)"/g)].map((m) => m[1]);

const chunkDir = join(".next", "static", "chunks");
const gz = (file) => gzipSync(readFileSync(join(chunkDir, file))).length;

let total = 0;
for (const src of new Set(initial)) {
  const file = src.split("/_next/static/chunks/")[1];
  if (!file) continue;
  total += gz(file);
}
console.log(`Initial JS on ${path}: ${(total / 1024).toFixed(1)} KB gzipped across ${new Set(initial).size} scripts`);

const all = readdirSync(chunkDir).filter((f) => f.endsWith(".js"));
const three = all.filter((f) => readFileSync(join(chunkDir, f), "utf8").includes("MeshTransmissionMaterial") || readFileSync(join(chunkDir, f), "utf8").includes("WebGLRenderer"));
let threeTotal = 0;
for (const file of three) threeTotal += gz(file);
const inInitial = three.some((f) => initial.some((src) => src.endsWith(f)));
console.log(`3D chunks: ${(threeTotal / 1024).toFixed(1)} KB gzipped (${three.join(", ")}); in initial bundle: ${inInitial}`);
