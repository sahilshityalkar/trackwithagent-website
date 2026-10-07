import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Read once at build time (sync reads keep the images static). Paths are
// spelled out so the bundler only traces these files.
const fontDir = join(process.cwd(), "public", "fonts");
const fonts = [
  { name: "Bricolage", data: readFileSync(join(fontDir, "bricolage-800.woff")), weight: 800 as const, style: "normal" as const },
  { name: "Geist", data: readFileSync(join(fontDir, "geist-400.woff")), weight: 400 as const, style: "normal" as const },
  { name: "Geist", data: readFileSync(join(fontDir, "geist-600.woff")), weight: 600 as const, style: "normal" as const },
  { name: "GeistMono", data: readFileSync(join(fontDir, "geist-mono-400.woff")), weight: 400 as const, style: "normal" as const },
];
const productDir = join(process.cwd(), "public", "products");
const toDataUri = (svg: Buffer) => `data:image/svg+xml;base64,${svg.toString("base64")}`;
const marks = {
  company: toDataUri(readFileSync(join(process.cwd(), "app", "icon.svg"))),
  finance: toDataUri(readFileSync(join(productDir, "finance.svg"))),
  replay: toDataUri(readFileSync(join(productDir, "replay.svg"))),
};

type Options = { title: string; subtitle: string; mark?: keyof typeof marks };

/** 1200 × 630 share card: dark canvas, brand glow, mark, title, subtitle and the domain. */
export function ogImage({ title, subtitle, mark = "company" }: Options) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#08080d",
          backgroundImage:
            "radial-gradient(circle at 88% 0%, rgba(198,40,160,0.55), transparent 45%), radial-gradient(circle at 100% 40%, rgba(106,48,222,0.45), transparent 40%), radial-gradient(circle at 70% 10%, rgba(198,65,0,0.25), transparent 35%)",
          color: "#f4f4f8",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={marks[mark]} width={72} height={72} alt="" />
          <span style={{ fontFamily: "Geist", fontWeight: 600, fontSize: 30, letterSpacing: "-0.01em" }}>
            {mark === "company" ? "TrackWithAgent" : mark === "finance" ? "TrackWithAgent Finance" : "TrackWithAgent Replay"}
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 980 }}>
          <span style={{ fontFamily: "Bricolage", fontWeight: 800, fontSize: 64, lineHeight: 1.08, letterSpacing: "-0.03em" }}>
            {title}
          </span>
          <span style={{ fontFamily: "Geist", fontWeight: 400, fontSize: 28, lineHeight: 1.35, color: "#c9c8d6" }}>{subtitle}</span>
        </div>
        <span style={{ fontFamily: "GeistMono", fontSize: 24, color: "#a8a7b8" }}>trackwithagent.com</span>
      </div>
    ),
    { width: 1200, height: 630, fonts },
  );
}
