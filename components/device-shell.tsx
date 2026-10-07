import type { ReactNode } from "react";
import { site } from "@/site.config";

type ShellProps = { children: ReactNode; label?: string; className?: string };

/** Phone bezel around a 300px wide screen (a 390 × 844 viewport drawn smaller). */
export function PhoneShell({ children, label, className = "", compact = false }: ShellProps & { compact?: boolean }) {
  return (
    <div className={`relative w-[320px] shrink-0 rounded-[52px] bg-bezel p-2.5 shadow-elev-3 ring-1 ring-white/10 ${className}`}>
      <div
        className={`relative w-[300px] overflow-hidden rounded-[42px] bg-background ${compact ? "h-[540px]" : "h-[649px]"}`}
        role={label ? "img" : undefined}
        aria-label={label}
      >
        {children}
      </div>
    </div>
  );
}

/** Minimal browser window: three neutral dots and the Finance address. */
export function BrowserShell({ children, label, className = "" }: ShellProps) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-border bg-surface-2 shadow-elev-3 ${className}`}>
      <div className="flex h-10 items-center gap-3 border-b border-border px-4">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-muted-foreground/30" />
          <span className="size-2.5 rounded-full bg-muted-foreground/30" />
          <span className="size-2.5 rounded-full bg-muted-foreground/30" />
        </span>
        <span className="mx-auto truncate rounded-full bg-surface-3 px-4 py-0.5 font-mono text-[0.6875rem] text-muted-foreground">
          {site.finance.host}
        </span>
        <span className="w-[42px] shrink-0" aria-hidden="true" />
      </div>
      <div
        className="relative aspect-[16/10] w-full overflow-hidden bg-background"
        role={label ? "img" : undefined}
        aria-label={label}
      >
        {children}
      </div>
    </div>
  );
}
