import type { ReactNode } from "react";
import { site } from "@/site.config";
import { ButtonLink } from "./button";
import { Reveal } from "./reveal";

type Props = { title: string; text?: string; footnote?: ReactNode };

/** Final call to action: white text on the hero gradient with a magenta glow. */
export function CtaBand({
  title,
  text = "Sign up in under a minute and log your first spend by typing “₹50 chai”.",
  footnote,
}: Props) {
  return (
    <section aria-labelledby="cta-title" className="container-page py-16 sm:py-20">
      <Reveal className="relative overflow-hidden rounded-[32px] bg-gradient-hero px-6 py-14 text-center text-white sm:px-12 sm:py-20">
        <h2 id="cta-title" className="text-display">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-subtitle text-white/85">{text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href={site.finance.signup} variant="white" size="lg">
            Get started
          </ButtonLink>
          <ButtonLink href={site.finance.login} variant="outline-white" size="lg">
            Log in
          </ButtonLink>
        </div>
        {footnote && <p className="mx-auto mt-6 max-w-xl text-small text-white/80">{footnote}</p>}
      </Reveal>
    </section>
  );
}
