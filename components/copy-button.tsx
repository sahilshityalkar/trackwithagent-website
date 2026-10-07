"use client";

import { AnimatePresence, m } from "motion/react";
import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { spring } from "@/lib/motion";

/** Copies text to the clipboard and announces "Copied" through a polite live region. */
export function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked; the address stays visible to copy by hand.
    }
  };

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${label}`}
        className="inline-flex size-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-surface-3 hover:text-foreground active:scale-[0.97]"
      >
        {copied ? <Check className="size-4 text-success-ink" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? `Copied ${value}` : ""}
      </span>
      <AnimatePresence>
        {copied && (
          <m.span
            aria-hidden="true"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={spring.snappy}
            className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-foreground px-3 py-1 text-[0.75rem] font-semibold text-background"
          >
            Copied
          </m.span>
        )}
      </AnimatePresence>
    </span>
  );
}
