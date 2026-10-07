import { site } from "@/site.config";
import { hero } from "@/content/home";
import { ButtonLink } from "../button";
import { HeroPoster } from "./hero-poster";
import { HeroSceneLoader } from "./hero-scene-loader";

/** Server-rendered hero: copy on the left, the scene slot on the right. */
export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-title" className="relative -mt-16 overflow-hidden pt-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 [background:var(--gradient-glow)] opacity-70" />
      <div className="container-page relative grid min-h-[calc(100svh-4rem)] items-center gap-10 py-12 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:py-16">
        <div className="relative z-10 max-w-xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-1/70 px-3 py-1 text-small font-semibold backdrop-blur">
            <span className="size-2 rounded-full bg-success animate-pulse-dot" aria-hidden="true" />
            {hero.overline}
          </p>
          <h1 id="hero-title" className="mt-6 text-display-xl text-balance">
            {hero.title}
          </h1>
          <p className="mt-6 text-subtitle text-muted-foreground">{hero.subhead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={site.finance.signup} size="lg">
              Get started
            </ButtonLink>
            <ButtonLink href="#how-it-works" variant="secondary" size="lg">
              See how it works
            </ButtonLink>
          </div>
          <p className="mt-5 text-small text-muted-foreground">{hero.note}</p>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[34rem] lg:aspect-[4/3] lg:max-w-none">
          <HeroSceneLoader poster={<HeroPoster />} />
        </div>
      </div>
    </section>
  );
}
