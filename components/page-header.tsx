import type { ReactNode } from "react";

type Props = { overline?: ReactNode; title: ReactNode; intro?: ReactNode; children?: ReactNode };

/** Top of an inner page: optional overline, the page H1 and an intro. */
export function PageHeader({ overline, title, intro, children }: Props) {
  return (
    <div className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 [background:var(--gradient-glow)] opacity-60" />
      <div className="container-page relative pb-10 pt-14 sm:pb-14 sm:pt-20">
        {overline && <p className="text-overline text-primary">{overline}</p>}
        <h1 className="mt-3 max-w-3xl text-display text-balance">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-subtitle text-muted-foreground">{intro}</p>}
        {children}
      </div>
    </div>
  );
}
