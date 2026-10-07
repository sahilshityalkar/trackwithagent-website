import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import type { ReactNode } from "react";
import { BrowserShell, PhoneShell } from "./device-shell";

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

/** A device frame showing the owner's screenshot, or a coded mock until it exists. */
export function DeviceFrame({ variant, screenshot, alt, mock, className = "", sizes }: Props) {
  const showImage = Boolean(screenshot && hasScreenshot(screenshot));
  const Shell = variant === "phone" ? PhoneShell : BrowserShell;
  const [width, height] = variant === "phone" ? [390, 844] : [1440, 900];
  const defaultSizes = variant === "phone" ? "300px" : "(min-width: 1024px) 720px, 100vw";

  return (
    <Shell className={className} label={showImage ? undefined : alt}>
      {showImage ? (
        <Image
          src={`/screenshots/${screenshot}`}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes ?? defaultSizes}
          className="h-full w-full object-cover object-top"
        />
      ) : (
        <div aria-hidden="true" className="h-full w-full">
          {mock}
        </div>
      )}
    </Shell>
  );
}
