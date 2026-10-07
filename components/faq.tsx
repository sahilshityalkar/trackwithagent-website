import { Plus } from "lucide-react";
import Link from "next/link";
import type { FaqItem } from "@/content/faq";

/** Native <details> accordion: works without JavaScript and with the keyboard. */
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-border rounded-3xl border border-border bg-surface-1">
      {items.map((item) => (
        <details key={item.question} className="group px-5 sm:px-7 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-semibold">
            <h3 className="text-base">{item.question}</h3>
            <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-3 transition-transform duration-200 group-open:rotate-45">
              <Plus className="size-4" aria-hidden="true" />
            </span>
          </summary>
          <div className="pb-6 pr-12 text-muted-foreground measure">
            <p>{item.answer}</p>
            {item.link && (
              <p className="mt-2">
                <Link href={item.link.href} className="font-semibold text-primary hover:underline">
                  {item.link.label}
                </Link>
              </p>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}
