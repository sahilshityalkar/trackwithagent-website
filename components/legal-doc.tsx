import { Children, isValidElement, type ReactNode } from "react";
import { site } from "@/site.config";
import { H2 } from "@/mdx-components";
import { slugify, textOf } from "@/lib/slug";
import { EmailLink } from "./email";

type Props = { title: string; children: ReactNode; intro?: ReactNode; dated?: boolean };

type TocItem = { id: string; label: string };

/** Collects every H2 written in the MDX body, in order, for the table of contents. */
function collectToc(children: ReactNode): TocItem[] {
  const items: TocItem[] = [];
  Children.forEach(children, (child) => {
    if (!isValidElement<{ id?: string; children?: ReactNode }>(child)) return;
    if (child.type !== H2 && child.type !== "h2") return;
    const label = textOf(child.props.children);
    items.push({ id: child.props.id ?? slugify(label), label });
  });
  return items;
}

/** Shared legal page template: title, dates, sticky contents on desktop, and a contact box. */
export function LegalDoc({ title, children, intro, dated = true }: Props) {
  const toc = collectToc(children);
  return (
    <div className="container-page pb-20 pt-14 sm:pb-28 sm:pt-20">
      <div className="lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
        <div className="lg:col-start-2">
          <h1 className="text-display">{title}</h1>
          {dated && (
            <p className="mt-4 text-small text-muted-foreground">
              Effective {site.effectiveDate} · Last updated {site.effectiveDate}
            </p>
          )}
          {intro && <div className="mt-5 text-subtitle text-muted-foreground measure">{intro}</div>}
        </div>

        {toc.length > 0 && (
          <nav
            data-legal-toc=""
            aria-label="On this page"
            className="mt-10 rounded-2xl border border-border bg-surface-1 p-5 lg:sticky lg:top-24 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:max-h-[calc(100svh-8rem)] lg:self-start lg:overflow-y-auto lg:border-0 lg:bg-transparent lg:px-1 lg:py-0"
            data-lenis-prevent
          >
            <p className="text-overline text-muted-foreground">On this page</p>
            <ol className="mt-3 flex flex-col gap-1 text-small">
              {toc.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="block rounded-md py-1 text-muted-foreground hover:text-foreground">
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="lg:col-start-2">
          <article className="prose-legal mt-10 measure">{children}</article>
          <aside className="mt-14 rounded-2xl border border-border bg-surface-1 p-6 measure no-print">
            <p className="font-semibold">Questions?</p>
            <p className="mt-1 text-muted-foreground">
              Contact <EmailLink email={site.privacyEmail} />.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
