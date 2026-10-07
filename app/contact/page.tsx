import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import type { ReactNode } from "react";
import { isPlaceholder, site } from "@/site.config";
import { CopyButton } from "@/components/copy-button";
import { EmailLink } from "@/components/email";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";


export const metadata = pageMetadata({
  title: "Contact TrackWithAgent",
  description:
    "Contact TrackWithAgent about partnerships, help with Finance, privacy requests, security reports or our Grievance Officer. Replies within two working days.",
  path: "/contact",
  absolute: true,
});

type Card = { title: string; email: string; name?: string; help?: ReactNode; link?: { href: string; label: string } };

const cards: Card[] = [
  { title: "General and partnerships", email: site.contactEmail },
  {
    title: "Help with Finance",
    email: site.supportEmail,
    help: "Forgot your password? Write from the email address on your account and we will reset it after checking it is you.",
  },
  { title: "Privacy and data requests", email: site.privacyEmail },
  { title: "Security reports", email: site.securityEmail, link: { href: "/security#report", label: "How to report an issue" } },
  {
    title: "Grievance Officer",
    name: site.grievance.name,
    email: site.grievance.email,
    link: { href: "/legal/privacy#grievance", label: "About grievances" },
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader title="Get in touch" intro="We read every message. Most replies go out within two working days." />

      <div className="container-page pb-20 sm:pb-28">
        <ul className="grid gap-4 md:grid-cols-2">
          {cards.map((card, i) => (
            <Reveal as="li" key={card.title} index={i} className="flex flex-col rounded-3xl border border-border bg-surface-1 p-6 sm:p-7">
              <h2 className="font-display text-lg font-bold">{card.title}</h2>
              {card.name && <p className="mt-1 text-muted-foreground">{card.name}</p>}
              <div className="mt-3 flex min-w-0 items-center gap-1">
                <EmailLink email={card.email} className="min-w-0 break-all" />
                {!isPlaceholder(card.email) && <CopyButton value={card.email} label={`${card.title} email`} />}
              </div>
              {card.help && <p className="mt-3 text-small text-muted-foreground">{card.help}</p>}
              {card.link && (
                <Link href={card.link.href} className="mt-auto pt-4 text-small font-semibold text-primary hover:underline">
                  {card.link.label}
                </Link>
              )}
            </Reveal>
          ))}
          <Reveal as="li" index={cards.length} className="rounded-3xl border border-border bg-surface-1 p-6 sm:p-7">
            <h2 className="font-display text-lg font-bold">Postal address</h2>
            <address className="mt-3 not-italic text-muted-foreground">
              {site.legalName}
              <br />
              {site.address}
            </address>
          </Reveal>
        </ul>
      </div>
    </>
  );
}
