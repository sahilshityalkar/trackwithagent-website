import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Ban, Bot, Database, KeyRound, Link2, Lock, ShieldCheck, Trash2, type LucideIcon } from "lucide-react";
import { site } from "@/site.config";
import { EmailLink } from "@/components/email";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";

const description =
  "How TrackWithAgent protects Finance data: no bank access, bcrypt passwords, HttpOnly sessions, per-user isolation, an AI that cannot act alone, and how to report a vulnerability.";

export const metadata: Metadata = {
  title: "Security at TrackWithAgent",
  description,
  alternates: { canonical: "/security" },
  openGraph: { title: "Security at TrackWithAgent", description, url: "/security" },
};

const practices: { icon: LucideIcon; title: string; body: ReactNode }[] = [
  {
    icon: Ban,
    title: "We never touch your money.",
    body: "Finance has no access to your bank. We never ask for bank logins, card numbers or your UPI PIN. Settling up opens your own UPI app; the payment happens there, not with us.",
  },
  {
    icon: KeyRound,
    title: "Passwords and sessions.",
    body: "Passwords are stored only as bcrypt hashes, so we cannot read them. Your session lives in a secure, HttpOnly cookie that scripts cannot read and that expires after 30 days. Changing your password ends your older sessions. After 10 wrong passwords for one email within 15 minutes, login pauses for that email.",
  },
  {
    icon: ShieldCheck,
    title: "Your data is walled off.",
    body: "Every request checks who you are and returns only your own records, or the shared records of groups you belong to.",
  },
  {
    icon: Lock,
    title: "Encrypted in transit.",
    body: "Every page and API call uses HTTPS. Data at rest is stored with our database provider, Neon, which encrypts stored data.",
  },
  {
    icon: Bot,
    title: "The AI cannot act alone.",
    body: (
      <>
        The assistant can read your records to answer you, but every change goes through a confirm card that only you can
        approve. We also limit how many requests each person can make, to protect the service from abuse.{" "}
        <Link href="/legal/ai" className="font-semibold text-primary hover:underline">
          How we use AI
        </Link>
      </>
    ),
  },
  {
    icon: Link2,
    title: "Invite links.",
    body: "Group invite links use long random tokens. We store only a fingerprint (hash) of each token, links expire, and the person who made one can revoke it.",
  },
  {
    icon: Trash2,
    title: "Deletion that actually deletes.",
    body: (
      <>
        When you delete your account, you are signed out everywhere. After a 30-day grace period, your account and everything
        in it are permanently erased.{" "}
        <Link href="/delete-account" className="font-semibold text-primary hover:underline">
          How deletion works
        </Link>
      </>
    ),
  },
  {
    icon: Database,
    title: "Where your data lives.",
    body: `The app runs on Vercel (${site.hosting.vercelRegion}) and stores data in a Postgres database on Neon (${site.hosting.neonRegion}). Cloudflare provides our DNS only.`,
  },
];

export default function SecurityPage() {
  return (
    <>
      <PageHeader
        overline="Security"
        title="How we keep your data safe"
        intro="Finance holds personal money records, so we treat them carefully. Here is what we do today, in plain words."
      />

      <div className="container-page pb-20 sm:pb-28">
        <ul className="grid gap-4 md:grid-cols-2">
          {practices.map(({ icon: Icon, title, body }, i) => (
            <Reveal as="li" key={title} index={i} className="flex gap-4 rounded-3xl border border-border bg-surface-1 p-6 sm:p-7">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-display text-lg font-bold">{title}</h2>
                <p className="mt-1.5 text-muted-foreground">{body}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <section id="report" aria-labelledby="report-title" className="mt-16 scroll-mt-24">
          <Reveal className="rounded-3xl border border-border bg-surface-1 p-7 sm:p-10">
            <h2 id="report-title" className="text-title">
              Report a security issue
            </h2>
            <p className="mt-4 text-muted-foreground measure">
              Found a vulnerability? Email <EmailLink email={site.securityEmail} subject="Security report" /> with steps to
              reproduce. Please give us reasonable time to fix it before sharing it publicly, and do not access other
              people&apos;s data, run denial-of-service tests or use automated scanners against production. We will acknowledge
              your report within 3 working days and keep you updated. We do not run a paid bug bounty yet, but we will thank you
              publicly if you would like.
            </p>
            <p className="mt-4 text-small text-muted-foreground">
              Machine-readable contact:{" "}
              <a href="/.well-known/security.txt" className="font-mono text-primary hover:underline">
                /.well-known/security.txt
              </a>
            </p>
          </Reveal>
        </section>

        <p className="mt-10 text-small text-muted-foreground measure">
          We are a young company and do not hold security certifications yet. We will update this page as our practices grow.
        </p>
      </div>
    </>
  );
}
