import type { ReactNode } from "react";
import { site } from "@/site.config";

function Screen({ children }: { children: ReactNode }) {
  return (
    <div
      aria-hidden="true"
      className="flex h-28 w-full flex-col justify-center gap-1.5 rounded-xl border border-border bg-background p-3 text-[10px] leading-tight"
    >
      {children}
    </div>
  );
}

const Field = ({ label }: { label: string }) => (
  <span className="rounded-md border border-border bg-surface-3 px-2 py-1 text-muted-foreground">{label}</span>
);

const steps: { text: ReactNode; screen: ReactNode }[] = [
  {
    text: (
      <>
        Log in at <a href={site.finance.login}>{site.finance.host}</a>.
      </>
    ),
    screen: (
      <Screen>
        <Field label="Email" />
        <Field label="Password" />
        <span className="rounded-full bg-gradient-brand-strong py-1 text-center font-semibold text-white">Log in</span>
      </Screen>
    ),
  },
  {
    text: "Open Settings.",
    screen: (
      <Screen>
        <span className="font-semibold">Settings</span>
        <span className="flex justify-between border-b border-border pb-1">
          Name <span className="text-muted-foreground">Aarav</span>
        </span>
        <span className="flex justify-between border-b border-border pb-1">
          UPI ID <span className="text-muted-foreground">aarav@okbank</span>
        </span>
        <span className="flex justify-between">Your data</span>
      </Screen>
    ),
  },
  {
    text: "Choose Delete account.",
    screen: (
      <Screen>
        <span className="flex justify-between border-b border-border pb-1">Export transactions</span>
        <span className="rounded-md border border-danger/50 px-2 py-1.5 font-semibold text-danger">Delete account</span>
      </Screen>
    ),
  },
  {
    text: "Type your email address to confirm, then confirm.",
    screen: (
      <Screen>
        <span>Type your email to confirm</span>
        <Field label="aarav@example.com" />
        <span className="rounded-full bg-danger py-1 text-center font-semibold text-white">Delete my account</span>
      </Screen>
    ),
  },
];

export function DeleteSteps() {
  return (
    <ol className="mt-6! grid list-none! gap-4 pl-0! sm:grid-cols-2">
      {steps.map((step, i) => (
        <li key={i} className="mt-0! flex flex-col gap-3 rounded-2xl border border-border bg-surface-1 p-4">
          <span className="flex items-start gap-3">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gradient-brand-strong text-small font-bold text-white">
              {i + 1}
            </span>
            <span className="pt-0.5 text-foreground">{step.text}</span>
          </span>
          {step.screen}
        </li>
      ))}
    </ol>
  );
}

const timeline = [
  { when: "Right away", what: "You are signed out on every device and nobody can log in to the account." },
  {
    when: "For 30 days",
    what: "Your data is kept in case you change your mind. Log in again within 30 days and the deletion is cancelled, with everything as you left it.",
  },
  {
    when: "After 30 days",
    what: "Your account and all its data are permanently deleted by our daily clean-up. This cannot be undone.",
  },
];

export function DeletionTimeline() {
  return (
    <ol className="relative mt-6! flex list-none! flex-col gap-6 border-l-2 border-border pl-6!">
      {timeline.map((item) => (
        <li key={item.when} className="relative mt-0!">
          <span
            aria-hidden="true"
            className="absolute -left-[33px] top-1 size-4 rounded-full border-4 border-background bg-gradient-brand-strong"
          />
          <p className="font-semibold text-foreground">{item.when}</p>
          <p className="mt-1">{item.what}</p>
        </li>
      ))}
    </ol>
  );
}
