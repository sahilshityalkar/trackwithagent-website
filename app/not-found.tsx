import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/site.config";
import { ButtonLink } from "@/components/button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/** The company track line, ending in an empty ring: the agent lost the trail. */
function OffTrack() {
  return (
    <svg viewBox="0 0 512 400" className="h-40 w-auto sm:h-48" aria-hidden="true">
      <defs>
        <linearGradient id="off-track" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#6a30de" />
          <stop offset="0.55" stopColor="#c0008a" />
          <stop offset="1" stopColor="#c64100" />
        </linearGradient>
      </defs>
      <path
        d="M60 330L180 210L280 270L380 130"
        pathLength={1}
        fill="none"
        stroke="url(#off-track)"
        strokeWidth="28"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-draw"
      />
      <circle cx="412" cy="88" r="40" fill="none" stroke="url(#off-track)" strokeWidth="14" opacity="0.7" />
    </svg>
  );
}

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[70svh] flex-col items-center justify-center py-20 text-center">
      <OffTrack />
      <h1 className="mt-8 text-display">This page went off track.</h1>
      <p className="mt-4 text-subtitle text-muted-foreground">The link may be old or mistyped.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/" size="lg">
          Go home
        </ButtonLink>
        <ButtonLink href={site.finance.url} variant="secondary" size="lg">
          Open Finance
        </ButtonLink>
      </div>
      <p className="mt-8 flex gap-6 text-small">
        <Link href="/products" className="text-primary hover:underline">
          Products
        </Link>
        <Link href="/contact" className="text-primary hover:underline">
          Contact
        </Link>
      </p>
    </section>
  );
}
