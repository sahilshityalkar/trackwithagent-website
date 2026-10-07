import type { ReactNode } from "react";
import { Reveal } from "./reveal";

type Props = {
  id?: string;
  title?: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
  /** Adds one soft brand glow behind the section heading. */
  glow?: boolean;
  headingLevel?: "h1" | "h2";
};

/** A page section with an optional H2 and intro, inside the page container. */
export function Section({ id, title, intro, children, className = "", glow = false, headingLevel = "h2" }: Props) {
  const Heading = headingLevel;
  const headingId = id ? `${id}-title` : undefined;
  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className={`relative py-16 sm:py-20 lg:py-28 ${className}`}
    >
      {glow && (
        <div aria-hidden="true" className="glow-brand absolute -top-10 left-1/2 h-64 w-[min(36rem,90vw)] -translate-x-1/2" />
      )}
      <div className="container-page relative">
        {(title || intro) && (
          <Reveal className="mb-10 max-w-2xl lg:mb-14">
            {title && (
              <Heading id={headingId} className={headingLevel === "h1" ? "text-display" : "text-title"}>
                {title}
              </Heading>
            )}
            {intro && <p className="mt-4 text-subtitle text-muted-foreground">{intro}</p>}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
