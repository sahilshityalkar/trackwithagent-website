// Fails if any unfilled [PLACEHOLDER] text or leftover junk reached the built pages.
// Usage: npm run build && npm run check:launch
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const dir = join(process.cwd(), ".next", "server", "app");

function walk(path: string, out: string[] = []) {
  for (const name of readdirSync(path)) {
    const full = join(path, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (name.endsWith(".html")) out.push(full);
  }
  return out;
}

const placeholder = /\[[A-Z][A-Z0-9 ,.'()/:-]{2,}\]/g;
const junk = /\b(lorem|ipsum|TODO|undefined|NaN)\b|\[object Object\]|[–—]/g;

let failures = 0;
for (const file of walk(dir)) {
  // Only visible text matters: drop scripts, styles and tags.
  const text = readFileSync(file, "utf8")
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ");
  const found = [...new Set([...(text.match(placeholder) ?? []), ...(text.match(junk) ?? [])])];
  if (found.length) {
    failures += found.length;
    console.error(`${relative(dir, file)}: ${found.join(", ")}`);
  }
}

if (failures) {
  console.error(`\n${failures} item(s) to fix before launch. Fill them in site.config.ts.`);
  process.exit(1);
}
console.log("Launch check passed: no placeholders or leftover text in the built pages.");
