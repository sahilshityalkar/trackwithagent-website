// Enforces the copy rules on site text: no em or en dashes, no spaced
// hyphen used as a dash, and no banned marketing words.
// Checks string literals and JSX text in code files, and prose in MDX.
// Usage: npm run lint:copy
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const banned = [
  "seamless", "seamlessly", "unlock", "elevate", "empower", "revolutionize", "revolutionise",
  "supercharge", "leverage", "harness", "game-changer", "game changing", "cutting-edge",
  "state-of-the-art", "next-generation", "delve", "effortless", "effortlessly", "robust",
  "in today's fast-paced world", "look no further", "whether you're", "say goodbye to",
  "take it to the next level", "all-in-one", "best-in-class", "world-class", "magic", "magical",
  "AI-powered", "lorem", "ipsum", "TODO",
];
const bannedRe = new RegExp(`\\b(${banned.map((w) => w.replace(/[-']/g, (c) => `\\${c}`)).join("|")})\\b`, "i");

function walk(dir: string, out: string[] = []) {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name.startsWith(".")) {
      if (name !== ".well-known") continue;
    }
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, out);
    else out.push(path);
  }
  return out;
}

const files = [
  ...walk(join(root, "app")).filter((f) => /\.(tsx|ts|mdx)$/.test(f)),
  ...walk(join(root, "components")).filter((f) => /\.(tsx|ts)$/.test(f)),
  ...walk(join(root, "content")).filter((f) => /\.(ts|tsx|mdx)$/.test(f)),
  join(root, "site.config.ts"),
];

/** Strips comments so only user-facing text is checked. */
function stripComments(source: string) {
  return source
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, (m) => m.replace(/[^\n]/g, " "))
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
    .replace(/(^|[^:"'`])\/\/.*$/gm, (m, p1) => p1 + " ".repeat(m.length - p1.length));
}

/** Text a visitor can read: string literals and JSX text in code; prose in MDX. */
function readableChunks(line: string, isMdx: boolean) {
  if (isMdx) return /^\s*(import|export)\b/.test(line) ? [] : [line];
  const chunks: string[] = [];
  for (const m of line.matchAll(/"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'|`((?:[^`\\]|\\.)*)`/g)) {
    // Template expressions like ${a - b} are code, not copy.
    chunks.push((m[1] ?? m[2] ?? m[3] ?? "").replace(/\$\{[^}]*\}/g, " "));
  }
  for (const m of line.matchAll(/<[A-Za-z][^<>]*>([^<>{}]+)</g)) chunks.push(m[1]);
  if (!/[<>{}();=]/.test(line) && /[a-z]{3,}\s+[a-z]{3,}/i.test(line)) chunks.push(line); // wrapped JSX text
  return chunks;
}

const problems: string[] = [];
for (const file of files) {
  const isMdx = file.endsWith(".mdx");
  const lines = stripComments(readFileSync(file, "utf8")).split("\n");
  lines.forEach((line, i) => {
    for (const chunk of readableChunks(line, isMdx)) {
      const where = `${relative(root, file)}:${i + 1}`;
      if (/[–—]/.test(chunk)) problems.push(`${where}  em or en dash: ${chunk.trim().slice(0, 80)}`);
      if (/\S - \S/.test(chunk) && !/^\s*[-*] /.test(chunk)) problems.push(`${where}  spaced hyphen used as a dash: ${chunk.trim().slice(0, 80)}`);
      const word = chunk.match(bannedRe);
      if (word) problems.push(`${where}  banned word "${word[1]}": ${chunk.trim().slice(0, 80)}`);
    }
  });
}

if (problems.length) {
  console.error(`Copy rules failed (${problems.length}):\n` + [...new Set(problems)].join("\n"));
  process.exit(1);
}
console.log(`Copy rules passed for ${files.length} files.`);
