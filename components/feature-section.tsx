import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "./reveal";

type Props = {
  id: string;
  title: string;
  intro: ReactNode;
  items: ReactNode[];
  visual: ReactNode;
  reverse?: boolean;
  after?: ReactNode;
};

/** Product page section: copy and a feature list on one side, a screen on the other. */
export function FeatureSection({ id, title, intro, items, visual, reverse = false, after }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="py-16 sm:py-20 lg:py-24">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className={reverse ? "lg:order-2" : ""}>
          <h2 id={`${id}-title`} className="text-title">
            {title}
          </h2>
          <p className="mt-4 text-subtitle text-muted-foreground measure">{intro}</p>
          <ul className="mt-6 flex flex-col gap-3">
            {items.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
                  <Check className="size-3" aria-hidden="true" />
                </span>
                <span className="measure">{item}</span>
              </li>
            ))}
          </ul>
          {after}
        </Reveal>
        <Reveal index={1} className={`relative flex justify-center ${reverse ? "lg:order-1" : ""}`}>
          <div aria-hidden="true" className="glow-brand absolute inset-10" />
          <div className="relative w-full">{visual}</div>
        </Reveal>
      </div>
    </section>
  );
}
