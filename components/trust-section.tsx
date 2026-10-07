import { CircleCheck, DoorOpen, Landmark, Lock, type LucideIcon } from "lucide-react";
import { trust } from "@/content/home";
import { ArrowLink } from "./button";
import { Reveal } from "./reveal";
import { Section } from "./section";

const icons: LucideIcon[] = [Landmark, CircleCheck, Lock, DoorOpen];

export function TrustSection() {
  return (
    <Section id="trust" title="Careful with your money and your data">
      <ul className="grid gap-4 sm:grid-cols-2">
        {trust.map((item, i) => {
          const Icon = icons[i];
          return (
            <Reveal as="li" key={item.title} index={i} className="flex gap-4 rounded-3xl border border-border bg-surface-1 p-6 sm:p-7">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-lg font-bold">{item.title}</h3>
                <p className="mt-1.5 text-muted-foreground">{item.body}</p>
              </div>
            </Reveal>
          );
        })}
      </ul>
      <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
        <ArrowLink href="/security">How we protect your data</ArrowLink>
        <ArrowLink href="/legal/ai">How we use AI</ArrowLink>
      </div>
    </Section>
  );
}
