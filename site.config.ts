// Every value the owner fills in before launch lives here.
// Values in [SQUARE BRACKETS] show as visible text on the site until filled,
// and `npm run check:launch` fails while any remain.

export const site = {
  name: "TrackWithAgent",
  url: "https://trackwithagent.com",
  tagline: "AI agents that keep track for you.",
  legalName: "[LEGAL ENTITY NAME]",
  address: "[REGISTERED ADDRESS]",
  courtsCity: "[CITY FOR COURTS]",
  city: "", // e.g. "Bengaluru"; empty hides it
  foundedYear: "", // e.g. "2026"; empty hides it
  contactEmail: "[CONTACT EMAIL]",
  supportEmail: "[SUPPORT EMAIL]",
  privacyEmail: "[PRIVACY EMAIL]",
  securityEmail: "[SECURITY EMAIL]",
  grievance: { name: "[GRIEVANCE OFFICER NAME]", email: "[GRIEVANCE OFFICER EMAIL]" },
  effectiveDate: "[EFFECTIVE DATE]",
  launchDate: "[LAUNCH DATE]",
  minimumAge: 18,
  founder: { name: "", role: "", bio: "", photo: "" }, // empty name hides the card; photo e.g. "/team/founder.jpg"
  social: { x: "", linkedin: "", github: "", instagram: "" }, // full profile URLs; empty hides the icon
  ai: {
    providersShort: "[AI PROVIDERS ENABLED]", // e.g. "Anthropic (Claude) and OpenAI"
    // One row per provider you turn on, e.g. { name: "Anthropic PBC", role: "Processes assistant requests", location: "USA" }
    processors: [] as { name: string; role: string; location: string }[],
    retentionNote:
      "[AI PROVIDER RETENTION TERMS]", // e.g. "Our providers' API terms say they do not use API data to train their models and keep it for up to 30 days for abuse monitoring."
  },
  hosting: {
    vercelRegion: "[VERCEL REGION]",
    neonRegion: "[NEON REGION]",
    backupWindow: "[BACKUP WINDOW]",
    logRetention: "[LOG RETENTION]",
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
} as const;

/** True while a value is still an unfilled [PLACEHOLDER]. */
export function isPlaceholder(value: string) {
  return value.trim().startsWith("[");
}

/** True when a value is filled in (not empty and not a placeholder). */
export function isSet(value: string) {
  return value.trim() !== "" && !isPlaceholder(value);
}

export const waitlistMailto = `mailto:${site.contactEmail}?subject=Replay%20waitlist&body=Please%20add%20me%20to%20the%20Replay%20waitlist.`;
