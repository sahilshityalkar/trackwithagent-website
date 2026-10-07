import type { Metadata } from "next";
import { isPlaceholder, site, waitlistMailto } from "@/site.config";
import { ButtonLink } from "@/components/button";
import { ComingSoonChip } from "@/components/chip";
import { EmailLink } from "@/components/email";
import { ProductIcon } from "@/components/logo";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";

const title = "TrackWithAgent Replay: coming soon";

export const metadata: Metadata = {
  title: { absolute: title },
  description: site.replay.description,
  alternates: { canonical: "/products/replay" },
  robots: { index: true, follow: true },
  openGraph: { title, description: site.replay.description, url: "/products/replay" },
};

function WaitlistButton() {
  if (site.replay.waitlistFormUrl) {
    return (
      <ButtonLink href={site.replay.waitlistFormUrl} size="lg" target="_blank" rel="noopener">
        Join the waitlist
      </ButtonLink>
    );
  }
  // Until a real inbox is set in site.config.ts, the button cannot open an email.
  if (isPlaceholder(site.contactEmail)) {
    return (
      <span className="inline-flex h-12 items-center rounded-full bg-gradient-brand-strong px-6 font-semibold text-white opacity-80">
        Join the waitlist
      </span>
    );
  }
  return (
    <ButtonLink href={waitlistMailto} size="lg" aria-label={`Join the waitlist by email to ${site.contactEmail}`}>
      Join the waitlist
    </ButtonLink>
  );
}

export default function ReplayPage() {
  return (
    <>
      <section aria-labelledby="replay-title" className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 [background:var(--gradient-glow)] opacity-50" />
        <div className="container-page relative flex flex-col items-center pb-16 pt-16 text-center sm:pt-24">
          <ProductIcon product="replay" size={96} className="shadow-elev-3" />
          <div className="mt-8">
            <ComingSoonChip shimmer />
          </div>
          <h1 id="replay-title" className="mt-5 text-display">
            TrackWithAgent Replay
          </h1>
          <p className="mt-4 text-subtitle font-semibold">{site.replay.tagline}</p>
          <p className="mt-4 max-w-xl text-subtitle text-muted-foreground">{site.replay.description}</p>
          <p className="mt-6 font-mono text-small text-muted-foreground">{site.replay.host}</p>
        </div>
      </section>

      <section aria-labelledby="waitlist-title" className="container-page pb-16">
        <Reveal className="mx-auto max-w-2xl rounded-3xl border border-border bg-surface-1 p-8 text-center sm:p-12">
          <h2 id="waitlist-title" className="text-title">
            Join the waitlist
          </h2>
          <p className="mt-3 text-muted-foreground">We will email you once when Replay opens. No newsletter.</p>
          <div className="mt-8 flex justify-center">
            <WaitlistButton />
          </div>
          <p className="mt-6 text-small text-muted-foreground">
            Prefer to write? Email <EmailLink email={site.contactEmail} subject="Replay waitlist" /> with the subject Replay
            waitlist.
          </p>
        </Reveal>
      </section>

      <section aria-labelledby="meanwhile-title" className="container-page pb-20 sm:pb-28">
        <h2 id="meanwhile-title" className="mb-6 text-center text-title">
          While you wait, Finance is live.
        </h2>
        <div className="mx-auto max-w-xl">
          <ProductCard product="finance" />
        </div>
      </section>
    </>
  );
}
