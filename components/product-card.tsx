import { site } from "@/site.config";
import { ButtonLink } from "./button";
import { ComingSoonChip, LiveChip } from "./chip";
import { ProductIcon } from "./logo";

type Props = { product: "finance" | "replay"; size?: "md" | "lg"; headingLevel?: "h2" | "h3" };

/** Product card. The buttons are the links, not the whole card. */
export function ProductCard({ product, size = "md", headingLevel = "h3" }: Props) {
  const Heading = headingLevel;
  const isFinance = product === "finance";
  const large = size === "lg";

  return (
    <article className="group relative flex h-full flex-col">
      <div
        aria-hidden="true"
        className="glow-brand absolute -inset-4 opacity-0 transition-opacity duration-200 group-hover:opacity-60 group-focus-within:opacity-60"
      />
      <div
        className={`relative flex h-full flex-col rounded-3xl border border-border bg-surface-1 shadow-elev-1 ${
          large ? "p-7 sm:p-10" : "p-6 sm:p-8"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <ProductIcon product={product} size={large ? 64 : 56} />
          {isFinance ? <LiveChip /> : <ComingSoonChip />}
        </div>
        <Heading className={`mt-6 font-display font-bold tracking-[-0.015em] ${large ? "text-[1.75rem] leading-9" : "text-2xl"}`}>
          {isFinance ? "TrackWithAgent Finance" : "TrackWithAgent Replay"}
        </Heading>
        <p className="mt-3 text-muted-foreground measure">
          {isFinance
            ? "Track spending, split bills with friends and settle up through your own UPI app. Talk to it in English, Hindi or Hinglish."
            : site.replay.tagline}
        </p>
        <p className="mt-4 font-mono text-small text-muted-foreground">
          {isFinance ? site.finance.host : site.replay.host}
        </p>
        <div className="mt-auto flex flex-wrap gap-3 pt-8">
          {isFinance ? (
            <>
              <ButtonLink href={site.finance.signup}>Get started</ButtonLink>
              <ButtonLink href="/products/finance" variant="secondary" aria-label="Learn more about TrackWithAgent Finance">
                Learn more
              </ButtonLink>
            </>
          ) : (
            <ButtonLink href="/products/replay" variant="secondary">
              Join the waitlist
            </ButtonLink>
          )}
        </div>
      </div>
    </article>
  );
}
