import Link from "next/link";
import { site } from "@/site.config";
import { buildYear } from "@/lib/build";
import { LogoLink } from "./logo";
import { footerColumns } from "./nav-data";
import { SocialIcons } from "./social-icons";

export function SiteFooter() {
  return (
    <footer data-site-footer="" className="mt-auto border-t border-border bg-surface-1/40">
      <div className="container-page py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-4">
          <div className="flex flex-col gap-3">
            <LogoLink className="self-start" />
            <p className="text-small text-muted-foreground">{site.tagline}</p>
            <p className="text-small text-muted-foreground">
              Made in India{site.city ? `, ${site.city}` : ""}
            </p>
          </div>
          <nav aria-label="Footer" className="grid gap-10 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-3">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h2 className="text-overline text-muted-foreground">{column.title}</h2>
              <ul className="mt-3 flex flex-col">
                {column.links.map((link) => (
                  <li key={link.href}>
                    {link.href.startsWith("/") ? (
                      <Link href={link.href} className="inline-flex min-h-9 items-center text-small hover:text-primary">
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.href} className="inline-flex min-h-9 items-center text-small hover:text-primary">
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          </nav>
        </div>
        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
          <p className="text-small text-muted-foreground">
            © {buildYear} {site.legalName}. All rights reserved.
          </p>
          <SocialIcons />
        </div>
      </div>
    </footer>
  );
}
