import { useId } from "react";
import Link from "next/link";

type MarkProps = { size?: number; className?: string; ring?: "dot" | "empty" };

/** The company mark: the brand tile with a rising track line ending in the agent dot. */
export function Mark({ size = 28, className, ring = "dot" }: MarkProps) {
  const id = useId();
  const gradientId = `mark-${id}`;
  return (
    <svg
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6a30de" />
          <stop offset="0.55" stopColor="#c0008a" />
          <stop offset="1" stopColor="#c64100" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" rx="160" fill={`url(#${gradientId})`} />
      <g fill="none" stroke="#fff" strokeWidth="36" strokeLinecap="round" strokeLinejoin="round">
        <path d="M124 356L212 268L284 316L352 216" />
        <circle cx="372" cy="186" r="52" strokeWidth="16" opacity="0.55" />
      </g>
      {ring === "dot" && <circle cx="372" cy="186" r="30" fill="#fff" />}
    </svg>
  );
}

/** Mark plus the "TrackWithAgent" wordmark, linking home. */
export function LogoLink({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 rounded-lg ${className}`}
      aria-label="TrackWithAgent home"
    >
      <Mark size={28} />
      <span className="font-display text-[1.0625rem] font-bold tracking-[-0.02em]">TrackWithAgent</span>
    </Link>
  );
}

type ProductIconProps = { product: "finance" | "replay"; size?: number; className?: string };

/** Product tile. Replay renders desaturated because it has not launched. */
export function ProductIcon({ product, size = 48, className = "" }: ProductIconProps) {
  return (
    // Plain img: tiny local SVGs gain nothing from the image optimiser.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/products/${product}.svg`}
      alt=""
      width={size}
      height={size}
      className={`${product === "replay" ? "saturate-[0.6]" : ""} ${className}`}
      style={{ borderRadius: size * 0.31 }}
    />
  );
}
