import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/site.config";
import { ButtonLink } from "@/components/button";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";

const description =
  "TrackWithAgent builds AI agents that do the tracking for you, starting with Finance for money in India. Why we started, what we believe and how we build.";

export const metadata: Metadata = {
  title: { absolute: "About TrackWithAgent" },
  description,
  alternates: { canonical: "/about" },
  openGraph: { title: "About TrackWithAgent", description, url: "/about" },
};

const beliefs = [
  "Logging should take seconds, not forms.",
  "An agent proposes and a person decides. Our agents never change your records without your tap.",
  "Built for India first: rupees, UPI, Hindi and Hinglish.",
  "Your data is yours to export and delete.",
];

function Founder() {
  const { founder } = site;
  if (!founder.name) return null;
  const initials = founder.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
  return (
    <div className="flex items-center gap-5 rounded-3xl border border-border bg-surface-1 p-6">
      {founder.photo ? (
        <Image src={founder.photo} alt={founder.name} width={72} height={72} className="size-18 rounded-full object-cover" />
      ) : (
        <span
          aria-hidden="true"
          className="flex size-18 shrink-0 items-center justify-center rounded-full bg-gradient-brand-strong font-display text-xl font-bold text-white"
        >
          {initials}
        </span>
      )}
      <div>
        <p className="font-display text-lg font-bold">{founder.name}</p>
        {founder.role && <p className="text-small text-muted-foreground">{founder.role}</p>}
        {founder.bio && <p className="mt-2 measure">{founder.bio}</p>}
      </div>
    </div>
  );
}

export default function AboutPage() {
  const facts = [
    site.foundedYear && `Founded ${site.foundedYear}`,
    site.city && `Based in ${site.city}, India`,
    site.legalName && `Legal entity: ${site.legalName}`,
  ].filter(Boolean) as string[];

  return (
    <>
      <PageHeader overline="About" title="We build agents that do the tracking." />

      <div className="container-page grid gap-16 pb-20 sm:pb-28 lg:grid-cols-[1fr_20rem] lg:gap-20">
        <div className="flex flex-col gap-14">
          <Reveal as="section">
            <h2 className="text-title">Why we started</h2>
            <p className="mt-4 text-subtitle text-muted-foreground measure">
              Most of us keep track of life in a spreadsheet, a notes app, or not at all. Finance started as a Google Sheet for
              one person&apos;s spending, then for a flat of friends splitting rent and groceries. The sheet was slow on a phone
              and could not answer a simple question like “how much did I spend on food last month?”. So we built an app you can
              just tell, and that asks before it writes anything down.
            </p>
          </Reveal>

          <Reveal as="section">
            <h2 className="text-title">What we believe</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {beliefs.map((belief) => (
                <li key={belief} className="rounded-2xl border border-border bg-surface-1 p-5">
                  {belief}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal as="section">
            <h2 className="text-title">How we build</h2>
            <p className="mt-4 text-subtitle text-muted-foreground measure">
              Finance is designed, built and tested by a team of AI agents (a product manager, designer, engineers, QA and a
              security reviewer) working under one human owner who sets the direction and approves every release. We use the
              same idea in our products: agents do the work, people stay in charge.
            </p>
          </Reveal>
        </div>

        <aside aria-labelledby="company-title" className="flex flex-col gap-6 lg:pt-1">
          <h2 id="company-title" className="text-overline text-muted-foreground">
            Company
          </h2>
          <Founder />
          {facts.length > 0 && (
            <ul className="flex flex-col divide-y divide-border rounded-3xl border border-border bg-surface-1">
              {facts.map((fact) => (
                <li key={fact} className="px-5 py-4 text-small">
                  {fact}
                </li>
              ))}
            </ul>
          )}
          <div>
            <ButtonLink href="/contact" variant="secondary">
              Say hello
            </ButtonLink>
          </div>
        </aside>
      </div>
    </>
  );
}
