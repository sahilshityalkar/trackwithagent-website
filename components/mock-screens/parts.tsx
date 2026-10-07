import type { ReactNode } from "react";
import { BarChart3, Home, List, Plus, Users } from "lucide-react";
import { formatINR } from "@/lib/format";

/** Generic status bar: time and neutral signal and battery shapes, no brand artwork. */
export function StatusBar() {
  return (
    <div className="flex h-9 shrink-0 items-center justify-between px-6 pt-2 text-[11px] font-semibold tabular">
      <span>9:41</span>
      <span className="flex items-center gap-1" aria-hidden="true">
        <span className="flex items-end gap-px">
          <span className="h-1 w-0.5 rounded-sm bg-current" />
          <span className="h-1.5 w-0.5 rounded-sm bg-current" />
          <span className="h-2 w-0.5 rounded-sm bg-current" />
          <span className="h-2.5 w-0.5 rounded-sm bg-current" />
        </span>
        <span className="ml-1 h-2.5 w-5 rounded-[3px] border border-current p-px">
          <span className="block h-full w-3/4 rounded-[1px] bg-current" />
        </span>
      </span>
    </div>
  );
}

export function AppBar({ title, right }: { title: string; right?: ReactNode }) {
  return (
    <div className="flex h-11 shrink-0 items-center justify-between px-4">
      <span className="font-display text-[17px] font-bold tracking-[-0.01em]">{title}</span>
      {right}
    </div>
  );
}

type Tab = "home" | "transactions" | "friends" | "reports";

export function BottomNav({ active = "home" }: { active?: Tab }) {
  const item = (tab: Tab, icon: ReactNode, label: string) => (
    <span className={`flex flex-col items-center gap-0.5 text-[9px] font-medium ${active === tab ? "text-primary" : "text-muted-foreground"}`}>
      {icon}
      {label}
    </span>
  );
  return (
    <div className="mt-auto flex h-14 shrink-0 items-center justify-around border-t border-border bg-surface-1 px-2 pb-1">
      {item("home", <Home className="size-4" />, "Home")}
      {item("transactions", <List className="size-4" />, "Entries")}
      <span className="flex size-10 -translate-y-2 items-center justify-center rounded-full bg-gradient-brand-strong text-white shadow-brand">
        <Plus className="size-5" />
      </span>
      {item("friends", <Users className="size-4" />, "Friends")}
      {item("reports", <BarChart3 className="size-4" />, "Reports")}
    </div>
  );
}

export function MockCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-border bg-surface-1 p-3 ${className}`}>{children}</div>;
}

/** Budget-style bar: green under 75%, amber under 100%, red over. */
export function Meter({ value, className = "" }: { value: number; className?: string }) {
  const tone = value >= 1 ? "bg-danger" : value >= 0.75 ? "bg-warning" : "bg-success";
  return (
    <div className={`h-1.5 w-full overflow-hidden rounded-full bg-surface-3 ${className}`}>
      <div className={`h-full rounded-full ${tone}`} style={{ width: `${Math.min(value, 1) * 100}%` }} />
    </div>
  );
}

export function Money({ value, className = "" }: { value: number; className?: string }) {
  return <span className={`tabular ${className}`}>{formatINR(value)}</span>;
}

/** Full phone screen shell: status bar, content, optional bottom nav. */
export function PhoneScreen({ children, nav }: { children: ReactNode; nav?: Tab | false }) {
  return (
    <div className="flex h-full w-full flex-col bg-background text-foreground">
      <StatusBar />
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">{children}</div>
      {nav !== false && <BottomNav active={nav ?? "home"} />}
    </div>
  );
}
