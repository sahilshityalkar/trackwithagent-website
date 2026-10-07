import { BarChart3, Goal, Home, List, PiggyBank, Settings, Users, UsersRound, X } from "lucide-react";
import type { ReactNode } from "react";
import { demo } from "@/content/demo";
import { formatINR } from "@/lib/format";
import { QrTile } from "../qr-tile";
import { Meter } from "./parts";

type Page = "home" | "groups" | "reports";

function Sidebar({ active }: { active: Page }) {
  const items: [Page | "other", ReactNode, string][] = [
    ["home", <Home key="h" className="size-3.5" />, "Home"],
    ["other", <List key="l" className="size-3.5" />, "Entries"],
    ["other", <PiggyBank key="b" className="size-3.5" />, "Budgets"],
    ["other", <Goal key="g" className="size-3.5" />, "Goals"],
    ["other", <Users key="f" className="size-3.5" />, "Friends"],
    ["groups", <UsersRound key="gr" className="size-3.5" />, "Groups"],
    ["reports", <BarChart3 key="r" className="size-3.5" />, "Reports"],
    ["other", <Settings key="s" className="size-3.5" />, "Settings"],
  ];
  return (
    <div className="flex w-[17%] shrink-0 flex-col gap-0.5 border-r border-border bg-surface-1 p-2 text-[9.5px]">
      <div className="mb-2 flex items-center gap-1.5 px-1.5 py-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/products/finance.svg" alt="" className="size-4 rounded-[5px]" />
        <span className="font-display text-[10.5px] font-bold">Finance</span>
      </div>
      {items.map(([key, icon, label]) => (
        <span
          key={label}
          className={`flex items-center gap-1.5 rounded-md px-1.5 py-1 ${key === active ? "bg-primary-soft font-semibold text-primary" : "text-muted-foreground"}`}
        >
          {icon}
          {label}
        </span>
      ))}
    </div>
  );
}

function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-lg border border-border bg-surface-1 p-2 ${className}`}>{children}</div>;
}

function Donut() {
  const total = demo.categories.reduce((sum, c) => sum + c.amount, 0);
  const r = 15;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg viewBox="0 0 40 40" className="size-16 -rotate-90">
      {demo.categories.map((cat) => {
        const len = (cat.amount / total) * c;
        const el = (
          <circle
            key={cat.name}
            cx="20"
            cy="20"
            r={r}
            fill="none"
            stroke={cat.color}
            strokeWidth="6"
            strokeDasharray={`${len} ${c - len}`}
            strokeDashoffset={-offset}
          />
        );
        offset += len;
        return el;
      })}
    </svg>
  );
}

export function DashboardDesktopMock() {
  const max = Math.max(...demo.trend);
  return (
    <div className="flex h-full w-full bg-background text-foreground">
      <Sidebar active="home" />
      <div className="flex flex-1 flex-col gap-2 p-3 text-[9.5px]">
        <p className="font-display text-[13px] font-bold">October overview</p>
        <div className="grid grid-cols-3 gap-2">
          {[
            ["Spent", demo.month.spent],
            ["Income", demo.month.income],
            ["Net", demo.month.income - demo.month.spent],
          ].map(([label, value]) => (
            <Panel key={label as string}>
              <p className="text-muted-foreground">{label}</p>
              <p className="font-display text-[14px] font-bold tabular">{formatINR(value as number)}</p>
            </Panel>
          ))}
        </div>
        <div className="grid flex-1 grid-cols-[1fr_1.3fr] gap-2">
          <Panel className="flex flex-col">
            <p className="font-semibold">By category</p>
            <div className="mt-1 flex flex-1 items-center gap-2">
              <Donut />
              <ul className="flex flex-col gap-0.5">
                {demo.categories.map((cat) => (
                  <li key={cat.name} className="flex items-center gap-1">
                    <span className="size-1.5 rounded-full" style={{ background: cat.color }} />
                    {cat.name} <span className="text-muted-foreground tabular">{formatINR(cat.amount)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Panel>
          <Panel className="flex flex-col">
            <p className="font-semibold">Last 6 months</p>
            <div className="mt-1 flex flex-1 items-end gap-1.5">
              {demo.trend.map((value, i) => (
                <div key={demo.trendMonths[i]} className="flex flex-1 flex-col items-center gap-0.5">
                  <div
                    className={`w-full rounded-t ${i === demo.trend.length - 1 ? "bg-primary" : "bg-primary-soft"}`}
                    style={{ height: `${(value / max) * 64}px` }}
                  />
                  <span className="text-[8px] text-muted-foreground">{demo.trendMonths[i]}</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
        <Panel>
          <p className="mb-1 font-semibold">Recent</p>
          {demo.transactions[0].items.concat(demo.transactions[1].items.slice(0, 1)).map((t) => (
            <div key={t.title} className="flex justify-between border-t border-border py-0.5 first:border-0">
              <span>
                {t.emoji} {t.title}
              </span>
              <span className="tabular">{formatINR(t.amount)}</span>
            </div>
          ))}
        </Panel>
      </div>
    </div>
  );
}

export function SettleUpDesktopMock() {
  return (
    <div className="relative flex h-full w-full bg-background text-foreground">
      <Sidebar active="groups" />
      <div className="flex flex-1 flex-col gap-2 p-3 text-[9.5px]">
        <p className="font-display text-[13px] font-bold">🏠 {demo.group}</p>
        <Panel>
          <p className="mb-1 font-semibold">Balances</p>
          {[
            ["Rohan", "owes you", 450],
            ["You", "owe Priya", 1200],
            ["Kabir", "is settled up", 0],
          ].map(([who, what, amount]) => (
            <div key={who as string} className="flex justify-between border-t border-border py-1 first:border-0">
              <span>
                {who} {what}
              </span>
              {(amount as number) > 0 && <span className="font-semibold tabular">{formatINR(amount as number)}</span>}
            </div>
          ))}
        </Panel>
        <Panel>
          <p className="mb-1 font-semibold">Shared expenses</p>
          {[
            ["Groceries", "Paid by you", 620],
            ["Wi-Fi bill", "Paid by Priya", 1180],
            ["Gas cylinder", "Paid by Rohan", 1100],
          ].map(([what, who, amount]) => (
            <div key={what as string} className="flex justify-between border-t border-border py-1 first:border-0">
              <span>
                {what} <span className="text-muted-foreground">· {who}</span>
              </span>
              <span className="tabular">{formatINR(amount as number)}</span>
            </div>
          ))}
        </Panel>
      </div>
      {/* settle-up dialog */}
      <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-[2px]">
        <div className="w-[46%] rounded-xl border border-border bg-surface-2 p-3 text-center text-[10px] shadow-elev-3">
          <div className="flex items-center justify-between">
            <span className="font-display text-[12px] font-bold">Settle up with Priya</span>
            <X className="size-3.5 text-muted-foreground" />
          </div>
          <p className="mt-2 font-display text-[22px] font-bold tabular">₹1,200</p>
          <div className="mt-2 flex justify-center">
            <QrTile size={84} />
          </div>
          <p className="mt-1.5 text-muted-foreground">Scan with any UPI app · priya@okbank</p>
          <span className="mt-2 flex h-7 items-center justify-center rounded-full bg-gradient-brand-strong text-[10px] font-semibold text-white">
            Mark as paid
          </span>
        </div>
      </div>
    </div>
  );
}

export function ReportsDesktopMock() {
  const rows = [
    { name: "Rent", now: 9000, before: 9000 },
    { name: "Food", now: 5700, before: 4320 },
    { name: "Travel", now: 2100, before: 3200 },
    { name: "Other", now: 1440, before: 3350 },
  ];
  const max = 9000;
  return (
    <div className="flex h-full w-full bg-background text-foreground">
      <Sidebar active="reports" />
      <div className="flex flex-1 flex-col gap-2 p-3 text-[9.5px]">
        <div className="flex items-center justify-between">
          <p className="font-display text-[13px] font-bold">October report</p>
          <span className="flex gap-1 rounded-full bg-surface-3 p-0.5 text-[9px] font-semibold">
            <span className="rounded-full bg-background px-2 py-0.5">Month</span>
            <span className="px-2 py-0.5 text-muted-foreground">Year</span>
          </span>
        </div>
        <Panel className="flex-1">
          <div className="mb-1.5 flex gap-3 text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-primary" /> October
            </span>
            <span className="flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-surface-3 ring-1 ring-border" /> September
            </span>
          </div>
          {rows.map((row) => (
            <div key={row.name} className="mb-1.5 grid grid-cols-[18%_1fr_20%] items-center gap-2">
              <span>{row.name}</span>
              <div className="flex flex-col gap-0.5">
                <div className="h-1.5 rounded-full bg-primary" style={{ width: `${(row.now / max) * 100}%` }} />
                <div className="h-1.5 rounded-full bg-surface-3" style={{ width: `${(row.before / max) * 100}%` }} />
              </div>
              <span className="text-right tabular">{formatINR(row.now)}</span>
            </div>
          ))}
        </Panel>
        <div className="grid grid-cols-2 gap-2">
          <Panel>
            <p className="font-semibold">Insight</p>
            <p className="text-muted-foreground">Food up 32% vs last month</p>
          </Panel>
          <Panel>
            <p className="font-semibold">Other spending</p>
            <Meter value={0.43} className="mt-1" />
            <p className="mt-0.5 text-muted-foreground">57% less than September</p>
          </Panel>
        </div>
      </div>
    </div>
  );
}
