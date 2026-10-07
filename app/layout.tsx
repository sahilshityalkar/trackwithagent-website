import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono, Noto_Sans_Devanagari } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { site } from "@/site.config";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import "./globals.css";

// Every route must prerender completely; the build fails otherwise.
export const ensureStatic = "navigation";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: "400",
  preload: false,
});

const devanagari = Noto_Sans_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "600"],
  preload: false,
});

const description =
  "TrackWithAgent builds AI agents for everyday records. Our first, TrackWithAgent Finance, logs a spend from one sentence, splits bills with friends and settles up through your own UPI app.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "TrackWithAgent: AI agents that keep track for you",
    template: "%s | TrackWithAgent",
  },
  description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    url: "/",
    title: "TrackWithAgent: AI agents that keep track for you",
    description,
  },
  twitter: {
    card: "summary_large_image",
    ...(site.social.x ? { site: `@${site.social.x.split("/").pop()}` } : {}),
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafd" },
    { media: "(prefers-color-scheme: dark)", color: "#08080d" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      suppressHydrationWarning
      className={`${geist.variable} ${bricolage.variable} ${geistMono.variable} ${devanagari.variable}`}
    >
      <body className="flex min-h-svh flex-col">
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        <a
          href="#main"
          className="fixed left-4 top-3 z-[100] -translate-y-20 rounded-full bg-primary px-4 py-2.5 text-small font-semibold text-primary-foreground shadow-elev-2 transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Providers>
          <SiteHeader />
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <SiteFooter />
        </Providers>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        {process.env.ANALYTICS === "on" && <Analytics />}
      </body>
    </html>
  );
}
