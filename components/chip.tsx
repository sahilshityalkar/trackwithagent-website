import type { ReactNode } from "react";

export function LiveChip({ children = "Live" }: { children?: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-3 px-2.5 py-0.5 text-[0.75rem] font-semibold text-success-ink">
      <span className="size-1.5 rounded-full bg-success animate-pulse-dot" aria-hidden="true" />
      {children}
    </span>
  );
}

export function ComingSoonChip({ shimmer = false }: { shimmer?: boolean }) {
  return (
    <span className="relative inline-flex items-center gap-1.5 overflow-hidden rounded-full border border-border bg-surface-3 px-2.5 py-0.5 text-[0.75rem] font-semibold text-warning-ink">
      <span className="size-1.5 rounded-full bg-warning" aria-hidden="true" />
      Coming soon
      {shimmer && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-linear-to-r from-transparent via-white/25 to-transparent animate-shimmer motion-reduce:hidden"
        />
      )}
    </span>
  );
}

export function Overline({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-overline text-primary ${className}`}>{children}</p>;
}
