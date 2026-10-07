import type { ReactNode } from "react";
import { site } from "@/site.config";

// Simple monochrome glyphs drawn for this site (lucide no longer ships brand icons).
const icons: Record<keyof typeof site.social, { label: string; path: ReactNode }> = {
  x: {
    label: "TrackWithAgent on X",
    path: <path d="M4 4l16 16M20 4L4 20" strokeLinecap="round" />,
  },
  linkedin: {
    label: "TrackWithAgent on LinkedIn",
    path: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" strokeLinecap="round" />
      </>
    ),
  },
  github: {
    label: "TrackWithAgent on GitHub",
    path: (
      <path
        d="M9 19c-4 1.3-4-2-6-2.5m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  instagram: {
    label: "TrackWithAgent on Instagram",
    path: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5v.01" strokeLinecap="round" />
      </>
    ),
  },
};

/** Renders only the social links that are filled in site.config.ts. */
export function SocialIcons() {
  const entries = (Object.keys(icons) as (keyof typeof site.social)[]).filter((key) => site.social[key]);
  if (entries.length === 0) return null;
  return (
    <ul className="flex items-center gap-1">
      {entries.map((key) => (
        <li key={key}>
          <a
            href={site.social[key]}
            aria-label={icons[key].label}
            className="inline-flex size-11 items-center justify-center rounded-full text-muted-foreground hover:bg-surface-3 hover:text-foreground"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              {icons[key].path}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
