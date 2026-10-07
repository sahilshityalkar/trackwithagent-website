"use client";

import Link from "next/link";
import { AnimatePresence, m } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { spring } from "@/lib/motion";
import { ProductIcon } from "./logo";
import { ComingSoonChip, LiveChip } from "./chip";
import { productLinks } from "./nav-data";

/** Disclosure menu for products: Enter/Space opens, arrows move, Escape closes and returns focus. */
export function ProductsMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [open]);

  const items = () => Array.from(panelRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? []);

  const onButtonKey = (event: KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      requestAnimationFrame(() => items()[0]?.focus());
    }
  };

  const onPanelKey = (event: KeyboardEvent) => {
    const links = items();
    const index = links.indexOf(document.activeElement as HTMLAnchorElement);
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      buttonRef.current?.focus();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      links[(index + 1) % links.length]?.focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      links[(index - 1 + links.length) % links.length]?.focus();
    } else if (event.key === "Home") {
      event.preventDefault();
      links[0]?.focus();
    } else if (event.key === "End") {
      event.preventDefault();
      links[links.length - 1]?.focus();
    }
  };

  return (
    <div
      ref={wrapRef}
      className="relative"
      onBlur={(event) => {
        if (open && !wrapRef.current?.contains(event.relatedTarget as Node)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          buttonRef.current?.focus();
        }
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={onButtonKey}
        className="inline-flex h-11 items-center gap-1 rounded-full px-3.5 text-[0.9375rem] font-medium text-muted-foreground transition-colors hover:text-foreground aria-expanded:text-foreground"
      >
        Products
        <ChevronDown
          className={`size-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      <AnimatePresence>
        {open && (
          <m.div
            ref={panelRef}
            id={panelId}
            onKeyDown={onPanelKey}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={spring.snappy}
            className="absolute left-1/2 top-full z-50 mt-2 w-[22rem] -translate-x-1/2 origin-top rounded-2xl border border-border bg-surface-2 p-2 shadow-elev-3"
          >
            <ul className="flex flex-col">
              {productLinks.map((product) => (
                <li key={product.href}>
                  <Link
                    href={product.href}
                    onClick={() => setOpen(false)}
                    className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-surface-3 focus-visible:bg-surface-3"
                  >
                    <ProductIcon product={product.icon} size={40} className="shrink-0" />
                    <span className="flex flex-col gap-1">
                      <span className="flex items-center gap-2 font-semibold">
                        {product.name}
                        {product.status === "live" ? <LiveChip /> : <ComingSoonChip />}
                      </span>
                      <span className="text-small text-muted-foreground">{product.line}</span>
                    </span>
                  </Link>
                </li>
              ))}
              <li className="mt-1 border-t border-border pt-1">
                <Link
                  href="/products"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl px-3 py-2.5 text-small font-semibold text-primary hover:bg-surface-3"
                >
                  All products <span aria-hidden="true">→</span>
                </Link>
              </li>
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
