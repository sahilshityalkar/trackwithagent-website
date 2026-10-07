import { CalendarClock, ClipboardPaste, FileDown, Gauge, MessageCircle, QrCode, type LucideIcon } from "lucide-react";
import { highlights } from "@/content/home";
import { ArrowLink } from "./button";
import { QrTile } from "./qr-tile";
import { Reveal } from "./reveal";
import { Section } from "./section";

const icons: Record<(typeof highlights)[number]["key"], LucideIcon> = {
  talk: MessageCircle,
  upi: QrCode,
  sms: ClipboardPaste,
  budget: Gauge,
  recurring: CalendarClock,
  data: FileDown,
};

function ChatVisual() {
  return (
    <div aria-hidden="true" className="mt-6 flex flex-col gap-2 text-small">
      <div className="max-w-[85%] self-end rounded-2xl rounded-br-md bg-primary px-3.5 py-2 text-primary-foreground">
        How much did I spend on travel in August?
      </div>
      <div className="max-w-[85%] self-start rounded-2xl rounded-bl-md bg-surface-3 px-3.5 py-2">
        <span className="tabular font-semibold">₹2,840</span> on travel in August, mostly Uber (
        <span className="tabular">₹1,960</span>). That is <span className="tabular">₹410</span> less than July.
      </div>
    </div>
  );
}

function UpiVisual() {
  return (
    <div aria-hidden="true" className="mt-6 flex items-stretch gap-3">
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-center justify-between gap-2 rounded-2xl bg-surface-3 px-3.5 py-2.5 text-small">
          <span>
            Rohan owes you <span className="tabular font-semibold text-success-ink">₹450</span>
          </span>
          <span className="rounded-full border border-border bg-surface-1 px-2.5 py-0.5 text-[0.75rem] font-semibold">Remind</span>
        </div>
        <div className="flex items-center justify-between gap-2 rounded-2xl bg-surface-3 px-3.5 py-2.5 text-small">
          <span>
            You owe Priya <span className="tabular font-semibold">₹1,200</span>
          </span>
          <span className="rounded-full bg-gradient-brand-strong px-2.5 py-0.5 text-[0.75rem] font-semibold text-white">
            Pay by UPI
          </span>
        </div>
      </div>
      <QrTile size={92} className="hidden shrink-0 sm:block" />
    </div>
  );
}

export function FinanceHighlights() {
  return (
    <Section id="finance" title="Finance, built for how India pays" glow>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map((item, i) => {
          const Icon = icons[item.key];
          const large = "large" in item && item.large;
          return (
            <Reveal
              as="li"
              key={item.key}
              index={i}
              className={`flex flex-col rounded-3xl border border-border bg-surface-1 p-6 shadow-elev-1 sm:p-7 ${
                large ? "sm:col-span-2" : ""
              }`}
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold tracking-[-0.01em]">{item.title}</h3>
              <p className="mt-2 text-muted-foreground">{item.body}</p>
              {item.key === "talk" && <ChatVisual />}
              {item.key === "upi" && <UpiVisual />}
            </Reveal>
          );
        })}
      </ul>
      <div className="mt-8">
        <ArrowLink href="/products/finance">See everything Finance does</ArrowLink>
      </div>
    </Section>
  );
}
