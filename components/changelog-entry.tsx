import type { ReactNode } from "react";

/** One changelog release: date, version chip, title and short bullets. */
export function Entry({ date, version, title, children }: { date: string; version?: string; title: string; children?: ReactNode }) {
  return (
    <article className="relative grid gap-3 border-t border-border py-10 first:border-0 first:pt-0 sm:grid-cols-[12rem_1fr] sm:gap-10">
      <div className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-2">
        <p className="text-small font-semibold text-muted-foreground">{date}</p>
        {version && (
          <span className="rounded-full bg-primary-soft px-2.5 py-0.5 font-mono text-[0.75rem] font-semibold text-primary">
            {version}
          </span>
        )}
      </div>
      <div>
        <h2 className="font-display text-2xl font-bold tracking-[-0.01em]">{title}</h2>
        <div className="prose-legal mt-3 measure">{children}</div>
      </div>
    </article>
  );
}
