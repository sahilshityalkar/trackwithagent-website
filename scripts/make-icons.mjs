// Builds the favicon set from the company mark.
// Usage: node scripts/make-icons.mjs
import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";

const gradient = `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6a30de"/><stop offset="0.55" stop-color="#c0008a"/><stop offset="1" stop-color="#c64100"/></linearGradient></defs>`;
const glyph = `<g fill="none" stroke="#fff" stroke-width="36" stroke-linecap="round" stroke-linejoin="round"><path d="M124 356L212 268L284 316L352 216"/><circle cx="372" cy="186" r="52" stroke-width="16" opacity="0.55"/></g><circle cx="372" cy="186" r="30" fill="#fff"/>`;

const rounded = readFileSync("app/icon.svg");
// Full-bleed square, for Apple touch icons (iOS rounds the corners itself).
const square = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">${gradient}<rect width="512" height="512" fill="url(#g)"/>${glyph}</svg>`);
// Maskable: glyph shrunk into the central 80% safe zone.
const maskable = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">${gradient}<rect width="512" height="512" fill="url(#g)"/><g transform="translate(256 256) scale(0.78) translate(-256 -256)">${glyph}</g></svg>`);

const png = (svg, size) => sharp(svg, { density: 384 }).resize(size, size).png().toBuffer();

writeFileSync("app/apple-icon.png", await png(square, 180));
writeFileSync("public/icon-192.png", await png(rounded, 192));
writeFileSync("public/icon-512.png", await png(rounded, 512));
writeFileSync("public/icon-maskable-512.png", await png(maskable, 512));

// favicon.ico with 16 and 32 px PNG entries.
const images = [await png(rounded, 16), await png(rounded, 32)];
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(images.length, 4);
const entries = [];
let offset = 6 + 16 * images.length;
images.forEach((img, i) => {
  const size = i === 0 ? 16 : 32;
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size, 0);
  entry.writeUInt8(size, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(img.length, 8);
  entry.writeUInt32LE(offset, 12);
  offset += img.length;
  entries.push(entry);
});
writeFileSync("app/favicon.ico", Buffer.concat([header, ...entries, ...images]));
console.log("icons written");
