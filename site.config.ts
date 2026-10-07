// Every company fact the site shows lives here. Change a value and it updates
// everywhere: footer, contact page, legal pages and structured data.
// A value in [SQUARE BRACKETS] shows as visible text until filled, and
// `npm run check:launch` fails while any remain.

export const site = {
  name: "TrackWithAgent",
  url: "https://trackwithagent.com",
  tagline: "AI agents that keep track for you.",
  legalName: "TrackWithAgent",
  address: "India", // full registered postal address once available
  courtsCity: "", // e.g. "Bengaluru"; empty means "the courts of India"
  city: "", // e.g. "Bengaluru"; empty hides it
  foundedYear: "", // e.g. "2026"; empty hides it
  contactEmail: "hello@trackwithagent.com",
  supportEmail: "support@trackwithagent.com",
  privacyEmail: "privacy@trackwithagent.com",
  securityEmail: "security@trackwithagent.com",
  grievance: { name: "Grievance Officer, TrackWithAgent", email: "grievance@trackwithagent.com" },
  effectiveDate: "7 October 2026",
  launchDate: "7 October 2026",
  minimumAge: 18,
  founder: { name: "", role: "", bio: "", photo: "" }, // empty name hides the card; photo e.g. "/team/founder.jpg"
  social: { x: "", linkedin: "", github: "", instagram: "" }, // full profile URLs; empty hides the icon
  ai: {
    // List only the providers switched on in production, in fallback order.
    providersShort: "Anthropic (Claude), OpenAI, xAI (Grok) and DeepSeek",
    // One row per provider you turn on, e.g. { name: "Anthropic PBC", role: "Processes assistant requests", location: "USA" }
    processors: [
      { name: "Anthropic PBC", role: "Processes assistant requests (Claude)", location: "USA" },
      { name: "OpenAI, L.L.C.", role: "Processes assistant requests if Claude is unavailable", location: "USA" },
      { name: "X.AI LLC", role: "Processes assistant requests if the providers above are unavailable", location: "USA" },
      { name: "DeepSeek", role: "Processes assistant requests if all providers above are unavailable", location: "China" },
    ] as { name: string; role: string; location: string }[],
    retentionNote:
      "Each provider keeps request data only as its API terms allow, and we choose API terms that do not permit training on your data where the provider offers them.",
  },
  hosting: {
    vercelRegion: "USA",
    neonRegion: "Singapore",
    backupWindow: "30 days",
    logRetention: "30 days",
  },
  finance: {
    url: "https://finance.trackwithagent.com",
    signup: "https://finance.trackwithagent.com/signup",
    login: "https://finance.trackwithagent.com/login",
    host: "finance.trackwithagent.com",
    version: "1.0",
    releaseDate: "30 September 2026",
    releaseDateISO: "2026-09-30",
    priceNote: "Free during early access",
    demoLogin: false, // true shows the demo credentials line
  },
  replay: {
    url: "https://replay.trackwithagent.com",
    host: "replay.trackwithagent.com",
    tagline: "Our next agent. We are building it now.",
    description:
      "Replay is the second agent from TrackWithAgent. It follows the same rule as Finance: the agent does the tracking, and you approve what it saves. Join the waitlist and we will write to you once, when it is ready to try.",
    waitlistFormUrl: "", // optional free form link; empty uses mailto
  },
};

/** True while a value is still an unfilled [PLACEHOLDER]. */
export function isPlaceholder(value: string) {
  return value.trim().startsWith("[");
}

/** True when a value is filled in (not empty and not a placeholder). */
export function isSet(value: string) {
  return value.trim() !== "" && !isPlaceholder(value);
}

export const waitlistMailto = `mailto:${site.contactEmail}?subject=Replay%20waitlist&body=Please%20add%20me%20to%20the%20Replay%20waitlist.`;
