import * as THREE from "three";

export type ScenePalette = {
  surface: string;
  text: string;
  primary: string;
  accent: string;
  light: number;
  /** Self-lighting on card bodies so light-mode cards read as white. */
  cardGlow: number;
};

// sRGB approximations of the CSS tokens (three.js does not read oklch).
export const palettes: Record<"dark" | "light", ScenePalette> = {
  dark: { surface: "#1d1c27", text: "#f3f3f8", primary: "#8d7cf6", accent: "#ef6fb4", light: 1, cardGlow: 0 },
  light: { surface: "#ffffff", text: "#1f1b2e", primary: "#5b39df", accent: "#e0358f", light: 0.7, cardGlow: 0.55 },
};

const BRAND = ["#6a30de", "#c0008a", "#c64100"];

function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** The page's own font stack, so canvas text matches the site and covers Devanagari and ₹. */
export function pageFontFamily() {
  return getComputedStyle(document.body).fontFamily || "system-ui, sans-serif";
}

/** Label face for a card: a thin brand-gradient edge and centred text on a transparent field. */
export function makeCardTexture(label: string, palette: ScenePalette, family: string) {
  const w = 720;
  const h = 300;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  const radius = 48;

  const edge = ctx.createLinearGradient(0, 0, w, h);
  edge.addColorStop(0, BRAND[0]);
  edge.addColorStop(0.55, BRAND[1]);
  edge.addColorStop(1, BRAND[2]);
  ctx.lineWidth = 5;
  ctx.strokeStyle = edge;
  roundedRect(ctx, 4, 4, w - 8, h - 8, radius);
  ctx.stroke();

  let size = 96;
  ctx.font = `600 ${size}px ${family}`;
  while (ctx.measureText(label).width > w - 110 && size > 40) {
    size -= 4;
    ctx.font = `600 ${size}px ${family}`;
  }
  ctx.fillStyle = palette.text;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, w / 2, h / 2 + size * 0.04);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

/** Soft sunset glow placed behind the agent; the glass sphere refracts it. */
export function makeGlowTexture() {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  // Each blob fades to its own colour at zero alpha (not to black) and stays
  // inside the texture, so no grey halo or square edge shows.
  const layers: [number, number, number, string][] = [
    [0.4, 0.42, 0.3, "122,64,255"],
    [0.6, 0.47, 0.3, "230,40,170"],
    [0.52, 0.64, 0.28, "255,120,30"],
    [0.5, 0.5, 0.16, "255,220,240"],
  ];
  for (const [x, y, r, rgb] of layers) {
    const g = ctx.createRadialGradient(x * size, y * size, 0, x * size, y * size, size * r);
    g.addColorStop(0, `rgba(${rgb},1)`);
    g.addColorStop(1, `rgba(${rgb},0)`);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
