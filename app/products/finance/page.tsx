import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/site.config";
import { screenshots } from "@/content/screenshots";
import { ArrowLink, ButtonLink } from "@/components/button";
import { LiveChip } from "@/components/chip";
import { CtaBand } from "@/components/cta-band";
import { DeviceFrame } from "@/components/device-frame";
import { BrowserWithPhones, PhonePair, ScaledPhone } from "@/components/device-stack";
import { FeatureSection } from "@/components/feature-section";
import { JsonLd } from "@/components/json-ld";
import { ProductIcon } from "@/components/logo";
import { AssistantDemo } from "@/components/mock-screens/assistant-demo";
import { DashboardDesktopMock, ReportsDesktopMock, SettleUpDesktopMock } from "@/components/mock-screens/desktop-screens";
import {
  BudgetsMock,
  DashboardMock,
  FriendsMock,
  GoalsMock,
  PasteSmsMock,
  QuickAddMock,
  SettingsMock,
} from "@/components/mock-screens/phone-screens";
import { Reveal } from "@/components/reveal";
import { Tilt } from "@/components/tilt";
import { financeAppSchema } from "@/lib/schema";

const title = "TrackWithAgent Finance: track every rupee, split with friends, settle by UPI";
const description =
  "A personal finance tracker for India with an AI assistant you can talk to in English, Hindi or Hinglish. Free during early access.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/products/finance" },
  openGraph: { title, description, url: "/products/finance" },
};

const prompts = [
  "How much did I spend on travel in August?",
  "Add ₹500 to my Goa trip goal",
  "What bills are due this week?",
  "Who owes me?",
  "kal uber 120",
];

const specs: [string, string][] = [
  ["Works on", "Any modern browser on phone, tablet or computer. Installable to the home screen."],
  ["Languages", "Screens in English. Assistant understands English, Hindi and Hinglish."],
  ["Voice input", "Chrome, Edge and Safari. Not available in Firefox."],
  ["Currency", "Indian rupee (₹) with lakh grouping"],
  ["Payments", "Hands off to your own UPI app. Finance never moves or holds money."],
  ["Price", "Free during early access"],
  ["Your data", "Export transactions as CSV any time. Delete your account from Settings."],
  ["Current version", `v${site.finance.version}, released ${site.finance.releaseDate}`],
];

export default function FinancePage() {
  return (
    <>
      <section aria-labelledby="finance-title" className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 [background:var(--gradient-glow)] opacity-70" />
        <div className="container-page relative grid items-center gap-12 pb-16 pt-12 sm:pt-16 lg:grid-cols-[1fr_1.1fr] lg:pb-24">
          <div>
            <div className="flex items-center gap-3">
              <ProductIcon product="finance" size={48} />
              <p className="text-overline text-primary">TrackWithAgent Finance</p>
              <LiveChip />
            </div>
            <h1 id="finance-title" className="mt-6 text-display text-balance">
              Track every rupee. Split with friends. Settle by UPI.
            </h1>
            <p className="mt-5 text-subtitle text-muted-foreground measure">
              Log a spend in seconds by typing or saying it. Finance keeps your budgets, balances and group accounts up to date,
              and asks before it saves anything.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={site.finance.signup} size="lg">
                Get started
              </ButtonLink>
              <ButtonLink href={site.finance.login} variant="secondary" size="lg">
                Log in
              </ButtonLink>
            </div>
            <p className="mt-5 font-mono text-small text-muted-foreground">{site.finance.host}</p>
          </div>
          <Tilt className="relative mx-auto w-full max-w-xl">
            <div className="relative pb-10 sm:pb-0 sm:pl-24 sm:pt-10">
              <div className="hidden sm:block">
                <DeviceFrame
                  variant="browser"
                  screenshot={screenshots.S3.file}
                  alt={screenshots.S3.alt}
                  mock={<DashboardDesktopMock />}
                />
              </div>
              <ScaledPhone
                screen={{ screenshot: screenshots.S1.file, alt: screenshots.S1.alt, mock: <DashboardMock /> }}
                scale={0.62}
                className="mx-auto sm:absolute sm:-bottom-8 sm:left-0 sm:mx-0 sm:[transform:translateZ(40px)]"
              />
            </div>
          </Tilt>
        </div>
      </section>

      <FeatureSection
        id="add"
        title="Add money in seconds"
        intro="A spend should take less time than the chai. Every way in ends at the same quick check before saving."
        items={[
          "Quick add from any screen: tap +, type the amount on a keypad and pick a category.",
          "Say it: type or speak one sentence like “₹120 uber yesterday” and the form fills itself.",
          "Paste a bank or UPI SMS to prefill an entry. It is read on your phone; Finance never reads your inbox.",
          "Transfers between your own accounts, like an ATM withdrawal, without counting them as spending.",
          "Recurring entries for rent, EMI, Netflix or salary post themselves on their day each month.",
        ]}
        visual={
          <PhonePair
            front={{ screenshot: screenshots.S4.file, alt: screenshots.S4.alt, mock: <QuickAddMock /> }}
            back={{ screenshot: screenshots.S11.file, alt: screenshots.S11.alt, mock: <PasteSmsMock /> }}
          />
        }
      />

      <FeatureSection
        id="assistant"
        reverse
        title="An assistant that knows your numbers"
        intro="Ask questions or ask it to do things, in English, Hindi or Hinglish. It answers from your real records."
        items={[
          "Every add, change or delete it proposes appears as an editable card. Nothing is saved until you tap Confirm.",
          "Available on every page, not only a chat screen.",
          "Voice input in English (India) or Hindi in Chrome, Edge and Safari. Replies can be read aloud.",
          "Simple entries still work without the AI service, through a built-in parser, with the same confirm card.",
        ]}
        after={
          <>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Things you can ask">
              {prompts.map((prompt) => (
                <li key={prompt} className="rounded-full border border-border bg-surface-1 px-3 py-1.5 text-small">
                  {prompt}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-small text-muted-foreground">
              Fair use: 6 assistant messages a minute and 100 a day per person.{" "}
              <Link href="/legal/ai" className="font-semibold text-primary hover:underline">
                How we use AI
              </Link>
            </p>
          </>
        }
        visual={
          <div className="flex justify-center">
            <DeviceFrame
              variant="phone"
              screenshot={screenshots.S5.file}
              alt={screenshots.S5.alt}
              mock={<AssistantDemo step={2} animate={false} />}
            />
          </div>
        }
      />

      <FeatureSection
        id="split"
        title="Split with friends, settle by UPI"
        intro="For flatmates and trips. Everyone sees the same numbers, and paying back takes one tap."
        items={[
          "Groups with equal or custom splits. Each member's share also lands in their own tracker.",
          "One net balance per friend across all groups, with suggested settle-ups.",
          "Settle up opens your own UPI app with the exact amount on a phone, or shows a QR code on a laptop. Finance never moves or holds money.",
          "Send a polite reminder with the UPI link through your own WhatsApp.",
          "Invite links: friends join a group in one tap, even before they have an account.",
        ]}
        visual={
          <BrowserWithPhones
            browser={{ screenshot: screenshots.S7.file, alt: screenshots.S7.alt, mock: <SettleUpDesktopMock /> }}
            phones={[{ screenshot: screenshots.S6.file, alt: screenshots.S6.alt, mock: <FriendsMock /> }]}
          />
        }
      />

      <FeatureSection
        id="overview"
        reverse
        title="Know where you stand"
        intro="One look tells you how the month is going and what you can still spend."
        items={[
          "A dashboard with this month's spending, income and net, account balances, budgets and a 6-month trend.",
          "Safe to spend today: one number for what you can spend and stay on track.",
          "Budgets per category with green, amber and red progress, and what is left per day.",
          "Savings goals with a target and date, like ₹25,000 for Goa by December.",
          "Monthly and yearly reports, plus insights like “Food up 32% vs last month”.",
          "A logging streak and small celebrations at real milestones.",
        ]}
        visual={
          <BrowserWithPhones
            browser={{ screenshot: screenshots.S10.file, alt: screenshots.S10.alt, mock: <ReportsDesktopMock /> }}
            phones={[
              { screenshot: screenshots.S8.file, alt: screenshots.S8.alt, mock: <BudgetsMock /> },
              { screenshot: screenshots.S9.file, alt: screenshots.S9.alt, mock: <GoalsMock /> },
            ]}
          />
        }
      />

      <FeatureSection
        id="data"
        title="Your data stays yours"
        intro="No bank login, no lock-in. Bring your old records in and take them out whenever you like."
        items={[
          "Import your old Google Sheet or bank history from CSV, and export all your transactions to CSV any time.",
          "No bank login, card number or UPI PIN, ever.",
          "Delete your account from Settings, with 30 days to change your mind.",
          "Light and dark mode, designed for phones first. Add it to your home screen and it opens like an app.",
        ]}
        after={
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            <ArrowLink href="/security">How we protect your data</ArrowLink>
            <ArrowLink href="/delete-account">How deletion works</ArrowLink>
          </div>
        }
        visual={
          <div className="flex justify-center">
            <DeviceFrame variant="phone" alt="Finance settings with CSV import, CSV export and Delete account" mock={<SettingsMock />} />
          </div>
        }
      />

      <section aria-labelledby="specs-title" className="py-16 sm:py-20">
        <div className="container-page">
          <Reveal className="mx-auto max-w-3xl">
            <h2 id="specs-title" className="text-title">
              Finance at a glance
            </h2>
            <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-surface-1">
              <table className="w-full text-left">
                <caption className="sr-only">Finance at a glance</caption>
                <tbody>
                  {specs.map(([label, value]) => (
                    <tr key={label} className="border-b border-border last:border-0">
                      <th scope="row" className="w-[38%] px-5 py-4 align-top text-small font-semibold sm:px-7">
                        {label}
                      </th>
                      <td className="px-5 py-4 text-small text-muted-foreground sm:px-7">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Try it with your next chai."
        footnote={
          site.finance.demoLogin
            ? "Want to look around first? Log in with demo@demo.com and password demo1234. The demo data is shared and resets."
            : undefined
        }
      />

      <JsonLd data={financeAppSchema()} />
    </>
  );
}
