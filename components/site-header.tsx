"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/site.config";
import { ButtonLink } from "./button";
import { LogoLink } from "./logo";
import { MobileNav } from "./mobile-nav";
import { mainLinks } from "./nav-data";
import { ProductsMenu } from "./products-menu";
import { ThemeToggle } from "./theme-toggle";

/** Sticky header: transparent over the hero, frosted with a hairline after 24px of scroll. */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-site-header=""
      className={`sticky top-0 z-50 h-16 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled
          ? "border-border bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/80"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="container-page flex h-full items-center justify-between gap-4">
        <LogoLink />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            <li>
              <ProductsMenu />
            </li>
            {mainLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex h-11 items-center rounded-full px-3.5 text-[0.9375rem] font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <ButtonLink href={site.finance.login} variant="ghost" size="sm">
            Log in
          </ButtonLink>
          <ButtonLink href={site.finance.signup} size="sm">
            Get started
          </ButtonLink>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <ButtonLink href={site.finance.signup} size="sm">
            Get started
          </ButtonLink>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
