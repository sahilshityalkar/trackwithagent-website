import { site } from "@/site.config";

export const productLinks = [
  {
    href: "/products/finance",
    name: "Finance",
    status: "live" as const,
    line: "Money tracking you can talk to",
    icon: "finance" as const,
  },
  {
    href: "/products/replay",
    name: "Replay",
    status: "soon" as const,
    line: site.replay.tagline,
    icon: "replay" as const,
  },
];

export const mainLinks = [
  { href: "/security", label: "Security" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const footerColumns = [
  {
    title: "Products",
    links: [
      { href: "/products/finance", label: "Finance" },
      { href: "/products/replay", label: "Replay" },
      { href: "/products", label: "All products" },
      { href: site.finance.login, label: "Log in to Finance" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/security", label: "Security" },
      { href: "/changelog", label: "What's new" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/legal/privacy", label: "Privacy Policy" },
      { href: "/legal/terms", label: "Terms of Service" },
      { href: "/legal/cookies", label: "Cookie Policy" },
      { href: "/legal/acceptable-use", label: "Acceptable Use" },
      { href: "/legal/ai", label: "AI use" },
      { href: "/delete-account", label: "Delete your account" },
    ],
  },
];
