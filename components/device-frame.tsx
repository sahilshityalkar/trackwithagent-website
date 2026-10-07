import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import type { ReactNode } from "react";
import { site } from "@/site.config";

// Read once at build time: which owner screenshots exist in public/screenshots.
const screenshotDir = join(process.cwd(), "public", "screenshots");
const available = new Set(existsSync(screenshotDir) ? readdirSync(screenshotDir) : []);

export function hasScreenshot(file: string) {
  return available.has(file);
}

type Props = {
  variant: "phone" | "browser";
  /** File name in public/screenshots. When missing, `mock` renders instead. */
  screenshot?: string;
  alt: string;
  /** Coded stand-in for the screen, built from brand tokens and demo values. */
  mock?: ReactNode;
  className?: string;
  sizes?: string;
};

/** A phone (390 × 844 screen, drawn at 300px wide) or a minimal browser window. */
export function DeviceFrame({ variant, screenshot, alt, mock, className = "", sizes }: Props) {
  const showImage = screenshot && hasScreenshot(screenshot);

  if (variant === "phone") {
    return (
      <div className={`relative w-[320px] shrink-0 rounded-[52px] bg-[oklch(0.2_0.01_286)] p-2.5 shadow-elev-3 ring-1 ring-white/10 ${className}`}>
        <div
          className="relative h-[649px] w-[300px] overflow-hidden rounded-[42px] bg-background"
          role={showImage ? undefined : "img"}
          aria-label={showImage ? undefined : alt}
        >
          {showImage ? (
            <Image
              src={`/screenshots/${screenshot}`}
              alt={alt}
              width={390}
              height={844}
              sizes={sizes ?? "300px"}
              className="h-full w-full object-cover object-top"
            />
          ) : (
            <div aria-hidden="true" className="h-full w-full">
              {mock}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden rounded-2xl border border-border bg-surface-2 shadow-elev-3 ${className}`}>
      <div className="flex h-10 items-center gap-3 border-b border-border px-4">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-muted-foreground/30" />
          <span className="size-2.5 rounded-full bg-muted-foreground/30" />
          <span className="size-2.5 rounded-full bg-muted-foreground/30" />
        </span>
        <span className="mx-auto rounded-full bg-surface-3 px-4 py-0.5 font-mono text-[0.6875rem] text-muted-foreground">
          {site.finance.host}
        </span>
        <span className="w-[42px]" aria-hidden="true" />
      </div>
      <div
        className="relative aspect-[16/10] w-full overflow-hidden bg-background"
        role={showImage ? undefined : "img"}
        aria-label={showImage ? undefined : alt}
      >
        {showImage ? (
          <Image
            src={`/screenshots/${screenshot}`}
            alt={alt}
            width={1440}
            height={900}
            sizes={sizes ?? "(min-width: 1024px) 720px, 100vw"}
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <div aria-hidden="true" className="h-full w-full">
            {mock}
          </div>
        )}
      </div>
    </div>
  );
}
