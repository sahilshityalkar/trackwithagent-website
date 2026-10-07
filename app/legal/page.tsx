import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/site.config";
import { EmailLink } from "@/components/email";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { legalPages } from "@/content/legal";

const description =
  "Legal documents for trackwithagent.com and TrackWithAgent Finance: Privacy Policy, Terms of Service, Cookie Policy, Acceptable Use, AI use and account deletion.";

export const metadata: Metadata = {
  title: "Legal",
  description,
  alternates: { canonical: "/legal" },
  openGraph: { title: "Legal | TrackWithAgent", description, url: "/legal" },
};

export default function LegalIndexPage() {
  return (
    <>
      <PageHeader
        title="Legal"
        intro={
          <>
            These documents apply to trackwithagent.com and to TrackWithAgent Finance. Questions:{" "}
            <EmailLink email={site.privacyEmail} />.
          </>
        }
      />
      <div className="container-page pb-20 sm:pb-28">
        <ul className="grid gap-4 md:grid-cols-2">
          {legalPages.map((page, i) => (
            <Reveal as="li" key={page.href} index={i}>
              <Link
                href={page.href}
                className="group flex h-full flex-col rounded-3xl border border-border bg-surface-1 p-6 transition-colors hover:border-primary/50 sm:p-7"
              >
                <span className="flex items-center justify-between gap-4">
                  <span className="font-display text-lg font-bold">{page.title}</span>
                  <span aria-hidden="true" className="text-primary transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
                <span className="mt-2 text-muted-foreground">{page.summary}</span>
                {page.href !== "/delete-account" && (
                  <span className="mt-4 text-small text-muted-foreground">Effective {site.effectiveDate}</span>
                )}
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </>
  );
}
