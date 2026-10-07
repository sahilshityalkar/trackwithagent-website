"use client";

import Link from "next/link";
import { AnimatePresence, m } from "motion/react";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { site } from "@/site.config";
import { spring } from "@/lib/motion";
import { ButtonLink } from "./button";
import { ComingSoonChip, LiveChip } from "./chip";
import { ProductIcon } from "./logo";
import { mainLinks, productLinks } from "./nav-data";
import { ThemeToggle } from "./theme-toggle";

const focusable = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Full-height menu sheet below 1024px. Traps focus, closes on Escape, locks page scroll. */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const sheetId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    // Pause Lenis while the sheet is open, if it is running.
    html.classList.add("lenis-stopped");
    requestAnimationFrame(() => sheetRef.current?.querySelector<HTMLElement>(focusable)?.focus());

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab" || !sheetRef.current) return;
      const nodes = Array.from(sheetRef.current.querySelectorAll<HTMLElement>(focusable));
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    const wide = window.matchMedia("(min-width: 64rem)");
    const onWide = () => wide.matches && setOpen(false);
    wide.addEventListener("change", onWide);

    return () => {
      html.style.overflow = previous;
      document.body.style.overflow = "";
      html.classList.remove("lenis-stopped");
      document.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [open, close]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={sheetId}
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="inline-flex size-11 items-center justify-center rounded-full hover:bg-surface-3"
      >
        <Menu className="size-5" aria-hidden="true" />
      </button>
      <AnimatePresence>
        {open && (
          <m.div
            ref={sheetRef}
            id={sheetId}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={spring.smooth}
            className="fixed inset-0 z-[60] flex h-dvh flex-col overflow-y-auto bg-background"
            data-lenis-prevent
          >
            <div className="container-page flex h-16 shrink-0 items-center justify-between">
              <span className="font-display text-[1.0625rem] font-bold tracking-[-0.02em]">Menu</span>
              <button
                type="button"
                onClick={close}
                aria-label="Close menu"
                className="inline-flex size-11 items-center justify-center rounded-full hover:bg-surface-3"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <nav aria-label="Mobile" className="container-page flex flex-1 flex-col gap-8 pb-10 pt-4">
              <div>
                <p className="text-overline text-muted-foreground">Products</p>
                <ul className="mt-3 flex flex-col gap-1">
                  {productLinks.map((product) => (
                    <li key={product.href}>
                      <Link
                        href={product.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 rounded-xl p-2 hover:bg-surface-3"
                      >
                        <ProductIcon product={product.icon} size={40} />
                        <span className="flex flex-col">
                          <span className="flex items-center gap-2 text-lg font-semibold">
                            {product.name}
                            {product.status === "live" ? <LiveChip /> : <ComingSoonChip />}
                          </span>
                          <span className="text-small text-muted-foreground">{product.line}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/products"
                      onClick={() => setOpen(false)}
                      className="flex min-h-11 items-center rounded-xl px-2 font-semibold text-primary hover:bg-surface-3"
                    >
                      All products
                    </Link>
                  </li>
                </ul>
              </div>
              <ul className="flex flex-col border-t border-border pt-6">
                {mainLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-12 items-center rounded-xl px-2 font-display text-2xl font-semibold hover:bg-surface-3"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-3 border-t border-border pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-small text-muted-foreground">Theme</span>
                  <ThemeToggle />
                </div>
                <ButtonLink href={site.finance.login} variant="secondary" size="lg">
                  Log in
                </ButtonLink>
                <ButtonLink href={site.finance.signup} size="lg">
                  Get started
                </ButtonLink>
              </div>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
