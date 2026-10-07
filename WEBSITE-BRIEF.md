# TrackWithAgent website: build brief

## Prompt for the coding agent (owner: paste this into a new session in this folder)

```text
Read WEBSITE-BRIEF.md in this folder from top to bottom before you write any code. It is your
complete spec for the TrackWithAgent company website. Build the site exactly to it, milestone by
milestone (section 9.3), running the checks for each milestone and committing after each one.
Do not ask me anything the brief already answers; where it gives a default, use it. Never invent
product features, user numbers, testimonials or claims beyond section 4. Keep every [PLACEHOLDER]
visible and in one file, site.config.ts, so I can fill them in later. When you finish, give me the
report described in section 13.
```

---

**Reader:** you are an AI coding agent starting in an empty folder. This brief is your full context. You have no access to the Finance app's code, and you do not need it: every product fact you need is written here. Build exactly what is described. Where the brief says **[OWNER TO CONFIRM]**, ship the default text given and leave the marker out of the page; the owner reviews those points before launch (they are collected in section 0).

**Owner:** a non-coder. Explain anything they must do in plain steps (section 12). Commit after each milestone with a clear message.

---

## 0. Owner inputs needed (fill these in `site.config.ts` before launch)

Every value below lives in one file, `site.config.ts` (section 9.2). Until filled, the placeholder text shows in the legal pages, and `npm run check:launch` fails, so nothing half-done ships by accident.

| # | Input | Used on | Example / default |
|---|---|---|---|
| 1 | `[LEGAL ENTITY NAME]` | Footer, Privacy, Terms, Grievance, JSON-LD | "TrackWithAgent Technologies Private Limited" or your name as a sole proprietor |
| 2 | `[REGISTERED ADDRESS]` | Privacy, Terms, Contact, Grievance | Full postal address in India |
| 3 | `[CITY FOR COURTS]` | Terms (jurisdiction) | e.g. Bengaluru |
| 4 | `[CONTACT EMAIL]` | Footer, Contact, all legal pages | hello@trackwithagent.com |
| 5 | `[SUPPORT EMAIL]` | Contact, FAQ, Delete account | support@trackwithagent.com (can be the same as 4) |
| 6 | `[PRIVACY EMAIL]` | Privacy, Delete account | privacy@trackwithagent.com |
| 7 | `[SECURITY EMAIL]` | Security page, `security.txt` | security@trackwithagent.com |
| 8 | `[GRIEVANCE OFFICER NAME]` and `[GRIEVANCE OFFICER EMAIL]` | Privacy, Terms, Contact | Can be the founder. Required by Indian law. |
| 9 | `[EFFECTIVE DATE]` | Every legal page | The day you publish, e.g. 15 October 2026 |
| 10 | `[FOUNDER NAME]`, `[FOUNDER ROLE]`, `[FOUNDED YEAR]`, `[CITY]` | About page, JSON-LD | Optional photo at `public/team/founder.jpg` |
| 11 | Social links (X, LinkedIn, GitHub, Instagram) | Footer, JSON-LD `sameAs` | Leave empty to hide an icon. Never link to a profile that does not exist. |
| 12 | Replay copy (`replay.tagline`, `replay.description`) | Home card, Replay page | Defaults are written and shippable (section 6.4) |
| 13 | 12 screenshots of the Finance app | Finance page, Home | Exact list in section 6.3.6. The site ships with coded mock screens until they arrive. |
| 14 | A real inbox for the emails above | Contact | Free option: Cloudflare Email Routing (section 12.5) |
| 15 | Roadmap statuses (`content/roadmap.ts`) | Home teaser, `/roadmap` | Defaults in section 6.10. Flip an item between "Planned" and "In progress", or delete it. No dates unless you are sure. |
| 16 | Real testimonials, later (`content/testimonials.ts`) | Home | Ships empty, so the section stays hidden. Add only real quotes from real users, with their written permission. |

**Facts to confirm** (defaults already written into the copy; change them in the content files if wrong):

1. **[OWNER TO CONFIRM] Price.** Copy says Finance is free during early access. If you plan paid plans soon, say so.
2. **[OWNER TO CONFIRM] AI providers enabled in production.** The app supports Anthropic (Claude), OpenAI, xAI (Grok) and DeepSeek. The legal pages must list only the ones you actually turn on in Vercel. DeepSeek processes data in China; if you enable it, keep its line in the Privacy Policy, otherwise delete it.
3. **[OWNER TO CONFIRM] Hosting regions.** Neon database region (the deploy guide suggested AWS Asia Pacific, Singapore) and Vercel function region. Verified on 7 October 2026: the live Finance app runs its server functions in Singapore (Vercel region sin1), next to the database. Vercel's edge network still serves pages from many countries.
4. **[OWNER TO CONFIRM] Backup window** of your Neon plan (how long deleted data can survive in point-in-time history) and Vercel log retention on your plan.
5. **[OWNER TO CONFIRM] Minimum age.** Copy says 18 and over (simplest under India's DPDP Act, which needs verifiable parental consent for anyone younger).
6. **[OWNER TO CONFIRM] Public demo login.** If `demo@demo.com / demo1234` exists on the live Finance site, the Finance page can offer "Try the demo". If not, leave that button out (default: left out).
7. **[OWNER TO CONFIRM] App name inside the Finance app.** The app's code still shows "Expense Tracker" on the login page and home-screen icon (one constant, `APP_NAME` in `lib/brand.ts` of the Finance repo). The website calls the product "TrackWithAgent Finance". Rename it in the app so visitors see the same name on both.
8. **[OWNER TO CONFIRM] Password resets.** The app has no reset email. The owner (an `ADMIN_EMAILS` account) can reset a user's password from Settings. The Contact page tells people to email support from their account email. Confirm you will handle these by hand.
9. **[OWNER TO CONFIRM] Saying the app is built by an AI agent team.** True, and a strong point for an AI-credits application. The About page says it. Remove the paragraph if you prefer not to.
10. **[OWNER TO CONFIRM] Vercel plan.** Vercel's free Hobby plan is for non-commercial use. A company website (and the Finance app) may need the Pro plan, or Vercel's startup credits. Check before you apply for credits elsewhere.
11. **[OWNER TO CONFIRM] Group data after deletion.** When a user's account is purged, shared expenses they paid and payments they recorded disappear from their groups, which changes the other members' group balances. The Delete Account page says this plainly. Confirm you are happy with that behaviour.
12. **[OWNER TO CONFIRM] Roadmap.** Section 6.10 lists what is planned. "Faster dashboard on phones" is marked "In progress" because it is the next task in the app's backlog; everything else is "Planned". Remove anything you do not intend to build. Forgot-password emails and email verification need an email-sending service, which the app does not have today.
13. **No social proof yet.** You expect about 2,000 real users soon, but the site must not mention user numbers, ratings, press or testimonials until they are real. The site uses honest trust signals instead (section 6.2.5) and has an empty testimonials slot for later.

> **Legal note for the owner (do not put this on the site):** the Privacy Policy, Terms, Cookie Policy, Acceptable Use Policy and AI disclosure in this brief are drafts written from what the app actually does. They are aligned with India's Digital Personal Data Protection Act 2023, the DPDP Rules 2025, the IT Act 2000 and its rules, and GDPR-style rights for international users, but they are not legal advice. Have a lawyer review them before you rely on them, and again before you add paid plans or launch Replay.

---

## 1. Goal, audience, success criteria

### 1.1 Goal

Build **trackwithagent.com**, the company website for TrackWithAgent, a company that makes AI agents which keep track of things for people. It must look like an established product company: premium, calm, fast, with a 3D animated landing page and every page a real company has (products, about, contact, security, legal).

The immediate use: the owner will submit this site with applications for AI startup credits. A reviewer will open it, click around for two minutes, and decide whether this is a real company with a real product. Every link must work, every page must be finished, and every claim must be true.

### 1.2 Audience (in priority order)

1. **Credit-program reviewers** (Anthropic, OpenAI, AWS, Google, Microsoft, Vercel and others). They look for: a live product, clear explanation, real company details, privacy and terms, contact.
2. **Young working people in India** who will sign up for Finance. They pay with UPI, share flats and trips with friends, mix Hindi and English, and live on their phones.
3. **Future partners, investors and hires.**

### 1.3 Success criteria

- A first-time visitor understands within 5 seconds: TrackWithAgent makes AI agents, Finance is live, here is how to start.
- Every page passes the definition of done below.
- Lighthouse (mobile, production URL): Performance ≥ 90 on Home, ≥ 95 on every other page; Accessibility 100; Best Practices 100; SEO 100.
- No broken links, no placeholder text, no lorem ipsum, no "coming soon" except the Replay product itself.
- No em dash or en dash anywhere in site copy (section 3.6).

### 1.4 Definition of done

- [ ] Every route in the site map (section 5) exists, renders statically, and has unique metadata, canonical URL and an Open Graph image.
- [ ] `/products/finance` shows every row of the feature inventory (section 4.2), and no feature outside it is described anywhere except `/roadmap`.
- [ ] `/roadmap` and the Home teaser render from `content/roadmap.ts` with no dates.
- [ ] No social proof of any kind; the testimonials slot exists and is hidden while empty.
- [ ] Home has the 3D hero, with a static fallback for reduced motion, low-power devices and no-WebGL browsers.
- [ ] All copy matches this brief or improves it without breaking the copy rules; `npm run lint:copy` passes.
- [ ] `npm run check:links` reports zero broken internal or external links.
- [ ] `npm run check:launch` passes (no `[PLACEHOLDER]` left), or the owner has explicitly chosen to launch with section 0 still open and you have told them which ones remain.
- [ ] Works at 375px, 390px, 768px, 1024px, 1440px and 1920px with no horizontal scroll.
- [ ] Light and dark themes both look designed; theme toggle works and respects the system setting.
- [ ] `prefers-reduced-motion: reduce` gives a fully static site (no smooth scroll, no 3D animation, no parallax).
- [ ] Keyboard only: every interactive element reachable, visible focus ring, skip link works, menu traps focus and closes on Escape.
- [ ] axe (via Playwright) reports zero violations on every route in both themes.
- [ ] `sitemap.xml`, `robots.txt`, favicon set, web manifest, JSON-LD and `/.well-known/security.txt` all present and valid.
- [ ] No cookies are set by the site (check in DevTools > Application > Cookies). No cookie banner.
- [ ] `npm run build` succeeds with every route marked Static (○) in the build output.
- [ ] README explains how to run, edit copy, add screenshots, and deploy, in plain language.
- [ ] Deployed on Vercel at https://trackwithagent.com with https://www.trackwithagent.com redirecting to it.

---

## 2. Tech stack (exact choices)

| Area | Choice | Why |
|---|---|---|
| Framework | **Next.js, latest stable** (16.x at the time of writing; run `npm view next version`), App Router, TypeScript strict | Static generation, metadata API, `next/og` image generation, first-class on Vercel. |
| Read the docs first | After `npm install`, read the guides in `node_modules/next/dist/docs/` for: App Router layouts, metadata and `generateMetadata`, `opengraph-image`, `sitemap`, `robots`, `manifest`, `not-found`, MDX, fonts, images, redirects, headers. | Next.js changes fast. Your training data is likely out of date (for example, Next 16 renamed `middleware.ts` to `proxy.ts`, and route `params` are async). Follow the installed version's docs and heed every deprecation notice. You should not need a proxy file at all. |
| Styling | **Tailwind CSS v4** (CSS-first config with `@theme` in `app/globals.css`, no `tailwind.config.js`) | Same as the Finance app, so tokens match. |
| Content | **MDX** via `@next/mdx` for legal pages and the changelog | The owner can edit plain text later. Values like the company name come from `site.config.ts`, imported into MDX. |
| 3D | **three**, **@react-three/fiber** (v9, React 19 compatible), **@react-three/drei** (v10) | Declarative 3D in React, with helpers (`Float`, `MeshTransmissionMaterial`, `Environment` presets, `PerformanceMonitor`, `AdaptiveDpr`, `Instances`). |
| Motion | **Motion** (`motion` package, import from `motion/react`) | Same library and presets as the Finance app (section 3.5). Handles enter animations, layout, springs, and scroll-linked values with `useScroll`/`useTransform`. Do **not** also add GSAP: one motion library only. |
| Smooth scroll | **Lenis** (`lenis`, use `lenis/react` `ReactLenis` at the root) | Premium inertial scroll. Disabled under reduced motion and on touch devices (native scroll is better there). |
| Icons | `lucide-react` | Clean, consistent, tree-shaken. |
| Theme | `next-themes` (`attribute="class"`, `defaultTheme="system"`, `enableSystem`) | Dark-first design with a light mode; stores the choice in `localStorage`, not a cookie. |
| Analytics | `@vercel/analytics` (Vercel Web Analytics) | Cookieless, so no consent banner is needed. Nothing else: no Google Analytics, no pixels, no chat widgets, no third-party scripts. |
| Forms | None with a backend. Waitlist and contact use `mailto:` links (section 6.4). | No paid service, no database, nothing to break. |
| Testing | Playwright (+ `@axe-core/playwright`) for smoke, screenshots and accessibility; `linkinator` for links | All free, run locally. |
| Hosting | **Vercel** (separate project from the Finance app), domain on Cloudflare DNS (DNS only) | Section 12. |

**Rendering rule:** every page is statically generated at build time. No `cookies()`, `headers()`, `searchParams` or `no-store` fetches in pages. Open Graph images are generated at build time with `next/og`. Confirm in the `next build` output that every route is Static. Do not use `output: "export"` (Vercel serves the static build directly and keeps image optimisation and Analytics working).

**Do not use:** a CMS, a database, auth, a UI component kit that brings its own look, stock photos of people, AI-generated photos of people, carousels that auto-advance, popups, or a chat widget.

---

## 3. Brand

### 3.1 Name and voice

- Company: **TrackWithAgent** (one word, capital T, W, A). Domain: trackwithagent.com.
- Products: **TrackWithAgent Finance** (live, https://finance.trackwithagent.com) and **TrackWithAgent Replay** (coming soon, replay.trackwithagent.com). In running text after the first mention: "Finance" and "Replay".
- Voice: plain, confident, specific, a little warm. Talks like a smart friend who builds software, never like a bank or a hype deck. Uses ₹ amounts and Indian examples ("₹50 chai", "Flat 4B", "Goa trip").
- Company one-liner: **"AI agents that keep track for you."**

### 3.2 Logo direction

The Finance app's icon is a rounded square filled with a violet to magenta to saffron "sunset" gradient, holding a white ₹ glyph. The company logo is its parent: same tile, same gradient, a different glyph.

- **Company mark:** a rounded square (corner radius 31% of the side) with the brand gradient at 135°, holding a white rising "track" line: three straight segments that end in a solid dot (the agent) with a thin ring around it. Stroke weight about 7% of the side, round caps and joins.
- **Wordmark:** "TrackWithAgent" in Bricolage Grotesque 700, tight tracking (-0.02em). In the header the word sits to the right of a 28px mark. No gradient on the wordmark text (contrast); the mark carries the colour.
- **Product marks:** Finance uses its existing app icon (₹ glyph, SVG below). Replay gets the same tile with a white "replay" glyph: a circular arrow with a small play triangle inside, drawn in the same stroke weight. Render Replay's tile at 60% saturation with a "Coming soon" chip so it reads as not yet live.

Starting SVG for the company mark (refine the glyph geometry by eye; keep the tile and gradient exactly):

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#6a30de"/>
      <stop offset="0.55" stop-color="#c0008a"/>
      <stop offset="1" stop-color="#c64100"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="160" fill="url(#g)"/>
  <g fill="none" stroke="#fff" stroke-width="36" stroke-linecap="round" stroke-linejoin="round">
    <path d="M124 356 L212 268 L284 316 L360 204"/>
    <circle cx="372" cy="186" r="52" stroke-width="16" opacity="0.55"/>
  </g>
  <circle cx="372" cy="186" r="30" fill="#fff"/>
</svg>
```

Finance app icon, verbatim from the app (save as `public/products/finance.svg`):

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6a30de"/><stop offset="0.55" stop-color="#c0008a"/><stop offset="1" stop-color="#c64100"/></linearGradient></defs><rect width="512" height="512" rx="160" fill="url(#g)"/><g transform="translate(256 256) scale(0.8) translate(0 3)" fill="none" stroke="#fff" stroke-width="36" stroke-linecap="butt" stroke-linejoin="miter"><path d="M-80 -132H80 M-80 -72H80 M-20 -132C36 -132 62 -104 62 -70C62 -34 34 -8 -20 -8H-76 M-58 -8L62 132"/></g></svg>
```

### 3.3 Colour tokens (from the Finance app's design system; use these exact values)

Define them as CSS variables in `app/globals.css`, expose them through Tailwind v4's `@theme inline`, and never use raw Tailwind palette colours or hex values in components (the SVG logo files are the only exception).

| Token | Dark (default) | Light | Use |
|---|---|---|---|
| `--background` | `oklch(0.135 0.012 286)` (≈ `#08080d`) | `oklch(0.985 0.004 286)` (≈ `#fafafd`) | Page canvas, also `theme-color` meta |
| `--foreground` | `oklch(0.97 0.005 286)` | `oklch(0.18 0.02 286)` | Body text |
| `--surface-1` | `oklch(0.18 0.014 286)` | `oklch(1 0 0)` | Cards |
| `--surface-2` | `oklch(0.22 0.016 286)` | `oklch(1 0 0)` | Raised cards, menus |
| `--surface-3` | `oklch(0.25 0.016 286)` | `oklch(0.955 0.008 286)` | Inputs, chips, code |
| `--muted-foreground` | `oklch(0.72 0.015 286)` | `oklch(0.50 0.02 286)` | Secondary text |
| `--primary` | `oklch(0.70 0.18 285)` | `oklch(0.52 0.23 285)` | Links, focus, primary accents (indigo violet) |
| `--primary-foreground` | `oklch(0.16 0.03 285)` | `oklch(0.99 0 0)` | Text on primary |
| `--primary-soft` | `oklch(0.30 0.08 285)` | `oklch(0.95 0.035 285)` | Chip and badge backgrounds |
| `--accent` | `oklch(0.72 0.19 350)` | `oklch(0.62 0.23 350)` | Pink highlight, sparingly |
| `--success` | `oklch(0.76 0.16 158)` | `oklch(0.56 0.15 158)` | "Live" chip dot |
| `--warning` | `oklch(0.80 0.15 75)` | `oklch(0.68 0.16 65)` | "Coming soon" chip |
| `--border` | `oklch(1 0 0 / 9%)` | `oklch(0.91 0.008 286)` | Hairlines |
| `--ring` | `oklch(0.70 0.18 285 / 60%)` | `oklch(0.52 0.23 285 / 55%)` | Focus ring |

Gradients (same as the app):

| Token | Value | Use |
|---|---|---|
| `--gradient-brand` | `linear-gradient(135deg, oklch(0.55 0.24 290) 0%, oklch(0.62 0.24 345) 55%, oklch(0.76 0.17 55) 100%)` | Logo tile, 3D materials, decorative glows. Never behind text. |
| `--gradient-brand-strong` | `linear-gradient(135deg, oklch(0.50 0.24 290) 0%, oklch(0.53 0.24 345) 55%, oklch(0.56 0.18 40) 100%)` | The primary CTA button only. White text on it is at least 5:1 everywhere. |
| `--gradient-hero` | Dark: `linear-gradient(145deg, oklch(0.32 0.14 288), oklch(0.22 0.08 300))`. Light: `linear-gradient(145deg, oklch(0.45 0.20 288), oklch(0.36 0.17 300))` | Final CTA band, product hero panels. Text on it is always white. |
| `--gradient-glow` | `radial-gradient(60% 50% at 80% 0%, oklch(0.65 0.22 345 / 35%), transparent 70%)` | Soft magenta glow layered over hero panels and the page top |
| `--shadow-brand` | `0 10px 30px -8px oklch(0.55 0.24 300 / 0.55)` | Primary CTA button shadow |

Elevation: `--elev-1: 0 1px 2px oklch(0.2 0.02 286 / 0.04), 0 2px 8px oklch(0.2 0.02 286 / 0.04)`, `--elev-2: 0 8px 24px -6px oklch(0.2 0.02 286 / 0.12)`, `--elev-3: 0 24px 64px -12px oklch(0.2 0.02 286 / 0.25)`. In dark mode, cards get depth from surface steps and a 1px `--border` ring, not heavy shadows.

The signature is the sunset gradient. Use it on: the logo, the primary button, the 3D scene, and one glow per section at most. Everything else is calm neutrals with indigo accents. That restraint is what makes it look expensive.

### 3.4 Typography (Google Fonts via `next/font/google`, self-hosted at build)

| Role | Font | Weights | Notes |
|---|---|---|---|
| Display | **Bricolage Grotesque** | 600, 700, 800 | Headlines, numbers in hero tiles, wordmark |
| Body | **Geist** | 400, 500, 600 | Everything else |
| Mono | **Geist Mono** | 400 | Small labels like `finance.trackwithagent.com`, version numbers |
| Hindi | **Noto Sans Devanagari** | 400, 600, `preload: false` | Only for the Hindi example tiles ("चाय ₹50"). Append to the body and display stacks. |

Scale (mobile → ≥1024px): Display XL 44/48 → 72/76 (Home H1 only, weight 800, tracking -0.03em); Display 34/40 → 48/54 (page H1); Title 24/30 → 32/38 (section H2); Subtitle 18/26 → 20/28; Body 16/26; Small 14/22; Overline 12/16 uppercase, tracking 0.08em, weight 600. Max line length 68ch for paragraphs. All ₹ amounts use `font-variant-numeric: tabular-nums`. Indian number grouping: ₹1,25,000 (lakh grouping), never ₹125,000.

### 3.5 Motion principles

Every animation has a job: **orient** (where am I), **give feedback** (my click worked) or **show the product working**. Nothing moves just to decorate.

Use these presets (copied from the Finance app, put them in `lib/motion.ts`):

```ts
export const spring = {
  snappy: { type: "spring", stiffness: 520, damping: 34, mass: 0.8 }, // buttons, toggles, menu
  smooth: { type: "spring", stiffness: 300, damping: 30 },            // panels, layout
  bouncy: { type: "spring", stiffness: 420, damping: 18 },            // small celebratory moments
  gentle: { type: "spring", stiffness: 180, damping: 24 },            // progress bars, counters
} as const;
export const duration = { fast: 0.12, base: 0.2, slow: 0.32, reveal: 0.6 } as const;
export const ease = { out: [0.16, 1, 0.3, 1], in: [0.7, 0, 0.84, 0], inOut: [0.65, 0, 0.35, 1] } as const;
export const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };
```

Rules:
- Section content reveals once with `fadeUp` (16px, 0.6s, `ease.out`), children staggered 60ms, max 6 staggered items. Use `whileInView` with `once: true` and `amount: 0.3`.
- Buttons: `whileTap={{ scale: 0.97 }}`, hover lifts the primary button 1px and brightens its shadow.
- Scroll-linked effects: only in the hero (camera and orb) and the "How it works" product demo. Nowhere else.
- No text that types itself out letter by letter, no bouncing arrows, no marquees.
- Wrap the app in `<MotionConfig reducedMotion="user">`. Under reduced motion: no transforms, opacity fades of 150ms or less only, Lenis off, 3D replaced by the static poster.
- Avoid the "hidden until JS" trap: the server HTML must be readable with JS off. Put entrance styles behind a class that reduced-motion and no-JS both override (`motion-reduce:transform-none! motion-reduce:opacity-100!`, plus a `<noscript>` style that forces `opacity:1`).

### 3.6 Copy rules (strict; enforced by `npm run lint:copy`)

1. **No em dashes (—) and no en dashes (–) anywhere in site copy**, including legal pages, metadata, alt text and OG images. Use a full stop, comma, colon or parentheses. Write ranges as "6 to 8", not "6–8". Do not fake a dash with a spaced hyphen (" - ") either.
2. Banned words and phrases (case-insensitive): seamless, seamlessly, unlock, elevate, empower, revolutionize, revolutionise, supercharge, leverage, harness, game-changer, game changing, cutting-edge, state-of-the-art, next-generation, delve, effortless, effortlessly, robust, journey (except a literal trip), "in today's fast-paced world", "look no further", "whether you're", "say goodbye to", "take it to the next level", "all-in-one", "best-in-class", "world-class", "magic", "magical", "AI-powered" (say what the AI does instead), "lorem", "ipsum", "TODO".
3. No rule-of-three padding: do not list three adjectives or three parallel clauses for rhythm. If there are two real things, list two.
4. Specific beats general: "Log a spend by saying ₹50 chai" beats "Track expenses easily".
5. Sentence case for all headings and buttons ("Get started", not "Get Started").
6. Money: ₹ symbol, Indian grouping, no decimals unless needed. Payments are "UPI", never "Paytm/GPay" as a requirement.
7. Never claim: bank connection, automatic SMS reading, a native iOS or Android app, notifications or emails from the app, investment tracking, multi-currency, a Hindi app interface, certifications (ISO, SOC 2), user counts, ratings, testimonials, press logos or partner logos. None of these exist.
8. Exclamation marks: at most one on the whole site.

`lint:copy` scans `content/**`, `app/**/*.{tsx,mdx}`, `components/**` and `site.config.ts` for rule 1 and 2 and fails with file and line. Apply it to string literals and MDX text, not code comments.

---

## 4. Product facts (the only source of truth for claims)

These are verified from the Finance app's code at release v1.0. Use only these. Do not invent features.

### 4.1 TrackWithAgent Finance at a glance

- Personal finance tracker for India (₹ INR), web app at https://finance.trackwithagent.com. Sign up at `/signup`, log in at `/login`. Sign-up needs a name, email and a password of at least 6 characters.
- Works in any modern browser on phone or desktop, and can be installed to the home screen (installable web app). There is no App Store or Play Store app.
- Built with Next.js, hosted on Vercel, data in a Postgres database on Neon.
- Released as v1.0 on 30 September 2026.
- Price: free (early access). **[OWNER TO CONFIRM]**

### 4.2 Complete feature inventory (every feature in Finance v1.0, each checked against the app's code)

This table is the master list. Put it in `content/features.ts` (id, group, title, benefit, placements) and render the Finance page from it, so **every row appears on `/products/finance`**, grouped under the section letters below (section 6.3.2). Rows marked "Home" also appear on the Home page. Write the titles and benefits on the site exactly as here or tighter; do not add features that are not in this table.

| ID | Feature | One-line user benefit (site copy) | Where on the site |
|---|---|---|---|
| **A** | **Logging money** | | Finance §A |
| A1 | Expenses and income | Log what you spent or earned with date, description, amount (₹), category and account, and edit or delete it any time. | Finance §A |
| A2 | Quick add from any screen | Tap "+" anywhere for an amount keypad and a category grid. A spend takes a few seconds, and it remembers the account you used last. | Finance §A, Home highlights |
| A3 | Say-it quick add | Type or say one sentence like "₹120 uber yesterday" and the form fills itself for you to check and save. | Finance §A, Home how it works |
| A4 | Paste a bank or UPI SMS | Paste a debit SMS and the entry fills itself. It is read on your device, and OTPs and promotions are ignored. | Finance §A, Home highlights |
| A5 | Transfers between your accounts | Move money from bank to cash or wallet (an ATM withdrawal, a wallet top-up) without counting it as spending. Both balances stay right. | Finance §A |
| A6 | Recurring entries | Add rent, EMI, Netflix or salary once and it posts itself on its day every month. Pause or resume any time. | Finance §A, Home highlights |
| A7 | Transactions by day | See entries grouped by day with daily totals, like your old sheet. Filter by month, category, account or type, and search by description. | Finance §A |
| **B** | **Accounts and categories** | | Finance §B |
| B1 | Accounts with live balances | Track bank accounts, cash, wallets, and money you lent or owe. Balances update from your entries, and you can archive old accounts. | Finance §B |
| B2 | Total across accounts | See what all your accounts add up to on one card. | Finance §B |
| B3 | Ready-made categories | Start with 15 expense and 2 income categories made for Indian spending. | Finance §B |
| B4 | Your own categories | Add categories with your own emoji and colour. | Finance §B |
| **C** | **The AI assistant** | | Finance §C |
| C1 | Ask about your money | "How much did I spend on travel in August?" gets an answer from your real numbers, never a guess. | Finance §C, Home hero and highlights |
| C2 | Ask it to do things | Add an expense, income or transfer, delete an entry, set a budget, add money to a goal, or split a bill in a group, in one sentence. | Finance §C, Home highlights |
| C3 | Who owes whom, budgets and bills on request | Ask "Who owes me?", "How is my food budget?" or "What bills are due this week?". | Finance §C |
| C4 | Confirm before saving | Every change shows up as a card you can edit. Nothing is saved until you tap Confirm. | Finance §C, Home how it works and trust |
| C5 | Sensible defaults | Leave out the account or date and it uses your default account and today, shown on the card so you can change them. | Finance §C |
| C6 | On every page | Open the assistant from any screen, not just a chat page. | Finance §C |
| C7 | Voice input | Tap the mic and speak in English or Hindi. Works in Chrome, Edge and Safari. | Finance §C, Home hero |
| C8 | Read replies aloud | Turn on spoken replies and the assistant reads its answers out. | Finance §C |
| C9 | Hindi and Hinglish | Write or say it your way: "chai pe 50 kharcha", "salary aayi 50000", or in Hindi script. | Finance §C, Home how it works |
| C10 | Works without AI for simple entries | If the AI service is down, simple entries still work through a built-in parser, with the same confirm card. | Finance §C, Home FAQ |
| **D** | **Friends and splitting** | | Finance §D |
| D1 | Groups | Make a group for your flat or a trip and add shared expenses. | Finance §D, Home highlights |
| D2 | Equal or custom splits | Split evenly, or set each person's share yourself. Shares always add up to the total. | Finance §D |
| D3 | Your share lands in your own tracker | Each member's share is added to their personal spending automatically, so budgets and reports include it. | Finance §D |
| D4 | Friends view | One net balance per friend across all your groups: "Rohan owes you ₹450", "You owe Priya ₹1,200". | Finance §D, Home highlights |
| D5 | Clear group balances | Every row says "you lent" or "you borrowed", and settle-up suggestions like "Priya pays you ₹470" that cut down how many payments the group needs. | Finance §D |
| D6 | Settle up by UPI | One tap opens your own UPI app with the exact amount, or shows a QR code on a laptop. You tap "Mark as paid" when done. Money never passes through us. | Finance §D, Home highlights and trust |
| D7 | Your UPI ID for friends | Add your UPI ID once so friends can pay you. Only people in your groups can see it. | Finance §D |
| D8 | Payment reminders | Send a polite nudge with a pay link through your own WhatsApp or share sheet. | Finance §D |
| D9 | Invite links | Share a link and friends join the group in one tap, even before they sign up. Links last 7 days and you can revoke them. | Finance §D |
| **E** | **Planning** | | Finance §E |
| E1 | Monthly budgets | Set a limit per category and watch green, amber and red progress, with how much you can spend per day for the rest of the month. | Finance §E, Home highlights |
| E2 | Safe to spend today | One number for what you can spend today and stay on track, after bills that are due. | Finance §E, Home highlights |
| E3 | Upcoming bills | See recurring payments that are due soon, before they arrive. | Finance §E |
| E4 | Savings goals | Set a target and a date ("₹25,000 Goa trip by December") and add money as you save, from any account. | Finance §E |
| **F** | **Seeing where it went** | | Finance §F |
| F1 | Dashboard | This month's spending, income and net at a glance, compared with last month, plus balances, budgets and recent entries. | Finance §F |
| F2 | Charts | A category breakdown and a 6-month trend, readable in light and dark mode. | Finance §F |
| F3 | Monthly reports | Any month by category, compared with the month before. | Finance §F |
| F4 | Year view | Twelve-month trends and yearly totals per category. | Finance §F |
| F5 | Monthly insights | Short notes like "Food up 32% vs last month", worked out from your data without AI. | Finance §F |
| **G** | **Habit and feel** | | Finance §G |
| G1 | Logging streak | A flame that grows for each day you log, with milestones at 7, 30 and 100 days. | Finance §G |
| G2 | Celebrations | Confetti and a small vibration when you hit a real milestone. | Finance §G |
| G3 | First-run setup | New accounts get balances and a few budgets set up in about a minute, instead of an empty app. | Finance §G |
| G4 | Light and dark mode | Both designed with care, or follow your phone's setting. | Finance §G |
| G5 | Install on your phone | Add it to your home screen and it opens like an app, full screen, with tab navigation on phones and a sidebar on computers. | Finance §G, Home FAQ |
| G6 | Accessible | Works with a keyboard and screen readers, and respects "reduce motion". | Finance §G |
| **H** | **Your account and data** | | Finance §H |
| H1 | Private accounts | Sign up with your email. Only you see your entries; group members see only what is in the group. | Finance §H, Home trust |
| H2 | No bank login | We never ask for bank passwords, card numbers or your UPI PIN. | Finance §H, Home trust, Security |
| H3 | Profile and password | Change your name and password in Settings. A new password signs out your older sessions. | Finance §H |
| H4 | Delete with a 30-day window | Delete your account from Settings. You are signed out everywhere, you can change your mind for 30 days, then everything is erased. | Finance §H, Home trust, Delete account |
| H5 | Password help | Forgot your password? Email support from your account email and we will reset it after checking it is you. | Finance §H, Contact |
| H6 | Import from CSV | Bring your old Google Sheet or bank history in from a CSV file. | Finance §H, Home highlights |
| H7 | Export to CSV | Download all your transactions as a CSV file whenever you want. | Finance §H, Home highlights, Security |

**Internal-only features (do not show on the site):** the health-check endpoint, the AI provider fallback order and cooldowns, the owner's admin password reset screen, the daily cleanup job, test suites. The public demo account appears only if section 0 item 6 is confirmed.

**Fair-use limits** (show in small text in Finance §C and on `/legal/ai`): 6 assistant messages a minute and 100 a day per person; quick-add sentence fills 4 a minute and 40 a day.

### 4.3 Not in the product (never imply these, except as planned items on `/roadmap`)

Bank account linking or Account Aggregator sync; automatic SMS reading; native apps; push, SMS or email notifications; password-reset emails; receipt photos or OCR; multi-currency; investments, stocks, credit score or loans; app lock; a full Hindi interface (the assistant understands and replies in Hindi, the screens are English); payments or wallets; any paid plan.

### 4.4 Data practices (the legal pages are built on these)

| Topic | Fact |
|---|---|
| Account data | Name, email, password stored only as a bcrypt hash (cost 10). Optional UPI ID. Account creation time. Whether onboarding is done. Deletion request time, if any. |
| Finance data | Accounts (name, type, opening balance, archived), transactions (type, amount, description, date, category, account, receiving account for transfers), categories (name, type, colour, emoji), budgets, recurring rules, savings goals, groups, group members, shared expenses, splits, settlements, invite links (only a SHA-256 hash of the link token is stored, with expiry and revocation). |
| Who sees what | Each user sees only their own data. Members of a group see that group's shared expenses, splits, settlements, each other's names and balances, and the UPI ID of members who added one. |
| Session cookie | One cookie on finance.trackwithagent.com: `token`, a signed JWT (HS256) holding the user id and a session version. `HttpOnly`, `Secure`, `SameSite=Lax`, path `/`, expires after 30 days. Strictly necessary. Changing the password or requesting deletion invalidates it. |
| Browser storage (Finance) | `localStorage`: theme choice (`theme`, from next-themes), last-used account for quick add, voice language, "read replies aloud" setting, and which milestone celebrations already played. All are preferences on your device and never sent to the server. |
| Website (trackwithagent.com) | Sets no cookies and no local storage except the theme choice. Vercel Web Analytics counts page views without cookies. |
| AI processing | When the assistant is used, the server sends the request to the first available configured AI provider, in this order: Anthropic (Claude), OpenAI, xAI (Grok), DeepSeek. If one fails it tries the next. **[OWNER TO CONFIRM which are enabled]** |
| What the AI receives | Your first name; today's date; the names of your categories, accounts (with type), savings goals and groups; your default account; up to the last 12 messages of the current conversation; and the results of lookups the assistant runs to answer you, which can include transactions (date, amount, description, category, account), monthly totals, account balances, budget status, upcoming recurring bills, goal progress, group member names, and what each friend owes you or you owe them. |
| What the AI never receives | Your email address, password, UPI ID, session cookie, or other users' data beyond the names and balances in groups you share. |
| AI conversations | Not saved in the app's database. They live in your open browser tab and are gone when you leave the page. |
| Voice | Speech recognition is done by your browser's speech service (for example, Chrome sends audio to Google), not by TrackWithAgent. Only the resulting text reaches us, and only when you send it. Read-aloud uses your device's built-in voice. |
| Pasted SMS | Parsed entirely in your browser. Only the entry you choose to save is sent to the server. |
| Rate limits and abuse protection | Login: at most 10 failed attempts per email in 15 minutes. Assistant: 6 per minute, 100 per day per user. Quick-add fill: 4 per minute, 40 per day. Invite links: creation, preview and join attempts are limited per user and per IP address. Counters are kept in server memory only. |
| IP addresses | Processed in memory for invite-link rate limits; recorded in hosting request logs by Vercel. Not stored in the app database. |
| Hosting | Vercel (app servers and logs), Neon (Postgres database). Cloudflare provides DNS only (it does not proxy or see traffic). **[OWNER TO CONFIRM regions]** |
| Email | The app sends no email. |
| Deletion | Settings > Delete account, confirm by typing your email. You are signed out on every device at once. The account is kept for 30 days; logging in during that time cancels the deletion. After 30 days, a daily job (03:30 UTC, which is 09:00 IST) permanently deletes the user and everything they own. Login and signup also purge expired accounts as a backstop. The shared demo account cannot be deleted. |
| Deletion and groups | Your group memberships, the shared expenses you paid, your splits and the settlements to or from you are deleted, so other members' group balances can change. Entries already copied into other members' personal trackers stay with them. **[OWNER TO CONFIRM]** |
| Backups | Neon keeps point-in-time history for **[BACKUP WINDOW]**. Deleted data can exist in that history until it expires. **[OWNER TO CONFIRM]** |
| Password reset | No reset email. The operator can set a temporary password after verifying the request comes from the account's email address. **[OWNER TO CONFIRM]** |
| Security measures | HTTPS everywhere; bcrypt password hashing; HttpOnly session cookie; session versioning; per-user data isolation checked on every request; input validation on every API; constant-time secret checks for the cleanup job; CSV export guarded against spreadsheet formula injection; the AI cannot write without explicit confirmation, and client-sent notes are marked unverified before the AI sees them. |
| Payments | None. Settle-up hands off to the user's own UPI app. No card, bank or UPI PIN data is ever collected. |

---

## 5. Site map

| Route | Page | In nav | In footer |
|---|---|---|---|
| `/` | Home | Logo | |
| `/products` | Products overview | Products menu | Products |
| `/products/finance` | TrackWithAgent Finance | Products menu | Products |
| `/products/replay` | TrackWithAgent Replay (coming soon + waitlist) | Products menu | Products |
| `/about` | About | Yes | Company |
| `/security` | Security | Yes | Company |
| `/contact` | Contact | Yes | Company |
| `/changelog` | What's new | | Company |
| `/roadmap` | Roadmap (coming next) | | Company |
| `/legal` | Legal index | | Legal |
| `/legal/privacy` | Privacy Policy | | Legal |
| `/legal/terms` | Terms of Service | | Legal |
| `/legal/cookies` | Cookie Policy | | Legal |
| `/legal/acceptable-use` | Acceptable Use Policy | | Legal |
| `/legal/ai` | AI use disclosure | | Legal |
| `/delete-account` | Delete your account and data | | Legal |
| `not-found` | 404 | | |
| `/.well-known/security.txt` | Security contact file | | |

Redirects in `next.config.ts` (permanent, 308):
- `/privacy` → `/legal/privacy`, `/terms` → `/legal/terms`, `/cookies` → `/legal/cookies`, `/data-deletion` and `/legal/data-deletion` → `/delete-account`
- `/finance` → `/products/finance`, `/replay` → `/products/replay`
- `/login` → `https://finance.trackwithagent.com/login`, `/signup` → `https://finance.trackwithagent.com/signup`, `/app` → `https://finance.trackwithagent.com`

The `www` to apex redirect is done in Vercel's domain settings (section 12), not in code.

---

## 6. Page specs with draft copy

Copy below is final draft quality. Keep it unless you can make it shorter and more specific without breaking section 3.6. `{site.x}` means a value from `site.config.ts`.

### 6.0 Shared CTAs and links

| Label | Target |
|---|---|
| Get started (primary) | `https://finance.trackwithagent.com/signup` |
| Log in | `https://finance.trackwithagent.com/login` |
| Open Finance | `https://finance.trackwithagent.com` |
| Join the Replay waitlist | `mailto:{site.contactEmail}?subject=Replay%20waitlist&body=Please%20add%20me%20to%20the%20Replay%20waitlist.` |

External product links open in the same tab (they are our own product) and carry UTM-free clean URLs.

### 6.1 Global elements

**Header** (sticky, 64px, transparent over the hero then `--background` at 80% with `backdrop-filter: blur(12px)` and a bottom hairline after 24px of scroll):
- Left: company mark (28px) + "TrackWithAgent" wordmark, links to `/`.
- Centre (≥1024px): "Products" (disclosure menu: Finance with "Live" chip and one line "Money tracking you can talk to", Replay with "Coming soon" chip and `{site.replay.tagline}`, and "All products" link), "Security", "About", "Contact".
- Right: theme toggle (sun/moon, `aria-label="Switch to light theme"`/dark), "Log in" (ghost), "Get started" (primary, brand-strong gradient).
- Below 1024px: mark + wordmark, "Get started" (small), and a menu button that opens a full-height sheet with all nav links, the theme toggle and "Log in". Focus is trapped in the sheet, Escape closes it, body scroll locks.
- A "Skip to content" link is the first focusable element.

**Footer** (four columns ≥1024px, two on tablet, one on mobile):
- Brand column: mark + wordmark, the line "AI agents that keep track for you.", and "Made in India" with the `{site.city}` if set.
- **Products:** Finance, Replay, All products, Log in to Finance.
- **Company:** About, Security, What's new, Roadmap, Contact.
- **Legal:** Privacy Policy, Terms of Service, Cookie Policy, Acceptable Use, AI use, Delete your account.
- Bottom row: `© {currentYear} {site.legalName}. All rights reserved.` on the left; social icons on the right, rendered only for links present in `site.config.ts`. The year comes from the build date.

**Cookie notice:** none. The site sets no cookies and uses cookieless analytics. Do not add a banner. If anyone later adds a non-essential cookie or tracker, a consent banner becomes mandatory; note this in the README.

**Theme:** follow the system setting (`defaultTheme="system"`), but design dark first. No flash of the wrong theme (next-themes script). `theme-color` meta for both schemes with the `--background` values.

### 6.2 Home (`/`)

Title: "TrackWithAgent: AI agents that keep track for you". Description: "TrackWithAgent builds AI agents for everyday records. Our first, TrackWithAgent Finance, logs a spend from one sentence, splits bills with friends and settles up through your own UPI app."

#### 6.2.1 Hero (100svh minimum, 3D)

Copy (left column on desktop, above the scene on mobile):
- Overline chip: a green dot + "Finance is live"
- H1: **"AI agents that keep track for you."**
- Subhead: "Tell an agent what happened, in a sentence or out loud. It does the bookkeeping and asks before it saves anything. Our first agent runs your money."
- Buttons: "Get started" (primary) and "See how it works" (secondary, smooth-scrolls to `#how-it-works`).
- Under the buttons, small muted text: "Free during early access. No bank login needed." **[OWNER TO CONFIRM price]**

**3D scene concept: "The agent and its ledger."** Concrete spec:
- **The agent:** a sphere (radius 1, 64 segments) in the centre-right of the canvas, made with drei `MeshTransmissionMaterial` (thickness 0.6, roughness 0.15, chromatic aberration 0.04, ior 1.3), lit from behind by three coloured point lights in the brand colours (violet `#6a30de`, magenta `#c0008a`, saffron `#c64100`) so it glows with the sunset gradient. Inside it, a small bright core (emissive sphere, radius 0.25) that pulses softly (scale 1 to 1.06 over 3s, sine). It drifts with drei `<Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>`.
- **The ledger ring:** a thin flat torus (radius 2.2, tube 0.01) tilted 70° around the agent, in `--primary` at 40% opacity, with 24 tiny instanced beads spaced along it (drei `<Instances>`), rotating slowly (0.05 rad/s).
- **Tracked items:** 7 floating rounded cards (`RoundedBox` 1.2 × 0.5 × 0.04, radius 0.08) in a loose cloud on the left, each with text drawn with drei `<Text>` (load Geist and Noto Sans Devanagari `.woff` files from `/public/fonts/` so it works offline and under CSP). Card labels, exactly: "चाय ₹50", "Uber ₹120", "Rent ₹18,000", "Swiggy ₹340", "Goa trip ₹25,000", "Priya owes you ₹450", "Salary ₹62,000". Card material: `--surface-2` colour with 85% opacity and a 1px brand-gradient edge (an emissive edge plane is fine).
- **The behaviour (the story):** every 2.5 seconds, one card detaches from the cloud and flies along a curved path (`CatmullRomCurve3`, 1.4s, `ease.out`) into the agent. When it touches the agent, the core flashes brighter for 200ms and a bead on the ledger ring lights up in the accent colour. Then the card reappears at the back of the cloud with a 300ms fade. This loops forever and shows "agents track things for you" without words.
- **Pointer:** the whole scene tilts toward the pointer (max 6° on each axis, `spring.gentle` damping). On touch devices, no tilt.
- **Scroll:** as the hero scrolls out, the camera dollies back 1.5 units and the scene fades to 0 opacity by the time the hero is 70% off-screen (Motion `useScroll` on the hero section driving a value read inside `useFrame`).
- **Theme:** in light mode, the background is transparent over `--background`, card colours switch to white surfaces with darker text, and light intensity drops 30% so the sphere does not blow out.
- **Camera and canvas:** `PerspectiveCamera` fov 35 at z 7; `<Canvas dpr={[1, 1.75]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>`; drei `<Environment preset="city" />` at low intensity for reflections (bundled preset; if it fetches from a CDN in your drei version, use a local `.hdr` under 300KB in `/public/hdr/` instead); `<AdaptiveDpr pixelated={false} />` and `<PerformanceMonitor onDecline={() => setLowPower(true)} />`.
- **Accessibility:** the canvas wrapper is `aria-hidden="true"`; the H1 and subhead carry the meaning. A visually hidden sentence describes nothing: the scene is decorative.

**Loading and fallbacks (required):**
1. The server HTML renders a **static poster** in the canvas slot: `public/hero/poster-dark.avif` and `poster-light.avif` (1600 × 1200, under 120KB each), shown with `next/image` and `priority`. Make the poster by rendering the finished scene once with Playwright at a nice frame (a card mid-flight) and saving it. The poster is the LCP element, so the hero is fast even before three.js loads.
2. The 3D scene is a client component loaded with `next/dynamic` and `ssr: false`, started only after the page is idle (`requestIdleCallback`, 2s timeout fallback). It cross-fades over the poster (400ms) once the first frame renders.
3. **Do not load 3D at all** (keep the poster) when any of these is true: `prefers-reduced-motion: reduce`; `navigator.connection?.saveData`; WebGL2 unavailable; `navigator.hardwareConcurrency <= 4` combined with `navigator.deviceMemory <= 4` (when present); viewport narrower than 640px **and** a coarse pointer (phones get the poster plus a light CSS-only animation: the poster gently floats 6px up and down over 6s). Add `?3d=1` to force-load for testing.
4. Pause rendering when the hero is off-screen: an `IntersectionObserver` sets the canvas `frameloop` to `"never"` when not visible and back to `"always"` when visible; also pause on `document.visibilitychange` to hidden.
5. If `PerformanceMonitor` reports decline twice, swap back to the poster.
6. No layout shift: the canvas slot has a fixed aspect ratio (4:3 on desktop, 1:1 on mobile) reserved in CSS before anything loads.
7. JS budget: the 3D chunk (three + fiber + drei parts used) must stay under 300KB gzipped and must not be in the initial bundle. Import only the drei components you use.

#### 6.2.2 Product cards (`#products`)

- H2: "Our agents"
- Intro: "Each agent does one job well and lives on its own address. Start with Finance today."
- **Card 1, Finance** (Live chip, green): Finance app icon; title "TrackWithAgent Finance"; text: "Track spending, split bills with friends and settle up through your own UPI app. Talk to it in English, Hindi or Hinglish."; mono line `finance.trackwithagent.com`; buttons "Get started" and "Learn more" (`/products/finance`).
- **Card 2, Replay** (Coming soon chip, amber): Replay tile; title "TrackWithAgent Replay"; text `{site.replay.tagline}` (default: "Our next agent. We are building it now."); mono line `replay.trackwithagent.com`; button "Join the waitlist" (`/products/replay`).
- Cards are equal height, `--surface-1` with a 1px border, a soft brand glow appears behind the card on hover (opacity 0 to 0.6, 200ms). The whole card is not a link; the buttons are (clear targets for keyboard and screen readers).

#### 6.2.3 How it works (`#how-it-works`)

- H2: "How an agent works"
- Intro: "Here is Finance logging a cup of chai."
- Layout: left column has the three steps; right column a **coded product demo** (HTML/CSS, not video) of a phone frame showing the assistant. As the user scrolls through the section (sticky on desktop ≥1024px, normal flow on mobile), the demo advances step by step. Under reduced motion, show all three states stacked as static cards.
- Steps:
  1. **"Say what happened."** "Type or say “₹50 chai today”. Hindi and Hinglish work too, like “chai pe 50 kharcha”." Demo: a chat bubble appears with that text; a small mic icon pulses once.
  2. **"Check the card."** "The agent fills in the amount, category, account and date. Nothing is saved until you tap Confirm, and you can change any field first." Demo: a confirm card slides up: "Expense · ₹50 · Food · Cash · Today", with "Confirm" and "Edit" buttons.
  3. **"See it everywhere."** "Your budget, balance and monthly report update at once." Demo: the Confirm button presses, a check appears, and a budget bar animates from 62% to 64% with "₹2,300 left of ₹8,000".
- Note: curly quotes are fine; dashes are not.

#### 6.2.4 Finance highlights

- H2: "Finance, built for how India pays"
- Six feature tiles in a bento grid (2 large, 4 small on desktop; single column on mobile). Each tile: a lucide icon, a title, one or two sentences, and a small coded visual where noted.
  1. (large) **"Talk to your money"**: "Ask “How much did I spend on travel in August?” or say “Split ₹1,200 dinner in Flat 4B”. The assistant answers from your real numbers and asks before it changes anything." Visual: a short chat exchange.
  2. (large) **"Settle up by UPI"**: "See who owes whom across every group. One tap opens your own UPI app with the exact amount, or shows a QR code on a laptop. Money never passes through us." Visual: "Rohan owes you ₹450" row with a "Pay by UPI" button and a QR tile.
  3. **"Paste a bank SMS"**: "Copy the debit SMS from your bank and paste it. The entry fills itself. Your inbox stays private."
  4. **"Budgets that tell you today's number"**: "Set a monthly limit per category and see what you can safely spend today."
  5. **"Rent and EMIs on autopilot"**: "Recurring entries post themselves on their day, and upcoming bills show up before they are due."
  6. **"Your data, your exit"**: "Import your old Google Sheet from CSV, export everything any time, and delete your account whenever you want."
- Link under the grid: "See everything Finance does" → `/products/finance`.

#### 6.2.5 Trust and security

- H2: "Careful with your money and your data"
- These are the site's trust signals. They replace social proof, which the company does not have yet. Six points in a 3 × 2 grid on desktop, one column on mobile:
  - **"No bank login, ever."** "We never ask for bank passwords, card numbers or your UPI PIN. You type or paste what you spent."
  - **"Money never passes through us."** "Settle up opens your own UPI app with the amount filled in. The payment happens there, between you and your friend."
  - **"Nothing saved without your tap."** "The AI proposes. You confirm. It cannot change your records on its own."
  - **"Private by default."** "Only you see your entries. Friends see only what you share in a group."
  - **"Leave whenever you like."** "Export your transactions as CSV. Delete your account in Settings, with 30 days to change your mind."
  - **"Built in India, for India."** "Rupees with lakh grouping, UPI, and an assistant that understands Hindi and Hinglish."
- Links: "How we protect your data" → `/security`, "How we use AI" → `/legal/ai`.

#### 6.2.5a Coming next (roadmap teaser)

- H2: "What we are building next"
- Intro: "Finance gets better every week. Here is what is on the way."
- The first four items from `content/roadmap.ts` (section 6.10) as compact rows: status chip ("In progress" in `--primary-soft`, "Planned" in `--surface-3`), title, one-line benefit. No dates.
- Link: "See the full roadmap" → `/roadmap`.

#### 6.2.5b Testimonials slot (empty at launch)

- Rendered from `content/testimonials.ts`, which ships as an empty array with this comment at the top: `// Real quotes from real users only, with their written permission. Leave empty until you have them. The section is hidden while this is empty.`
- Type: `{ quote: string; name: string; context: string /* e.g. "Flatmate, Bengaluru" */; permissionDate: string }[]`.
- When the array is empty, render nothing at all (no heading, no placeholder card, no "Testimonials coming soon"). When it has items: H2 "What people say", up to three quote cards with name and context, no star ratings, no photos unless the person sent one.
- Never invent quotes, names, user counts ("Trusted by 2,000 users"), ratings, download numbers, press mentions or company logos, even as examples in the shipped code.

#### 6.2.6 FAQ

Accessible accordion (`<details>`/`<summary>` styled, or a button with `aria-expanded`). Also output FAQPage JSON-LD for these exact questions.

1. **Is Finance free?** "Yes. Finance is free while we are in early access. If we add paid features later, we will tell you well in advance." **[OWNER TO CONFIRM]**
2. **Do I need to connect my bank?** "No. Finance never asks for bank logins and never reads your SMS inbox. You add entries by typing, speaking, pasting a bank SMS or importing a CSV."
3. **Can the AI change my data by itself?** "No. Every add, change or delete the assistant suggests appears as a card you can edit, and nothing is saved until you tap Confirm."
4. **Which languages does it understand?** "The assistant understands English, Hindi and Hinglish, typed or spoken. The app's screens are in English."
5. **Is there a mobile app?** "Finance runs in your phone's browser and you can add it to your home screen, where it opens like an app. There is no App Store or Play Store app yet."
6. **How does settling up work?** "When a friend has added their UPI ID, Settle up opens your own UPI app with the exact amount (or shows a QR code on a laptop). You pay in your UPI app, then tap Mark as paid. We never handle the money."
7. **Who can see my data?** "Only you. If you join a group, its members see that group's shared expenses, your name, your balance with them and your UPI ID if you added one."
8. **What happens if the AI service is down?** "Simple entries like “₹120 uber yesterday” still work through a built-in parser that runs without any AI service. Questions about your spending need the AI and will work again once it is back."
9. **Can I bring my Google Sheet?** "Yes. Export it as CSV and import it in Finance. You can export your transactions back to CSV any time."
10. **How do I delete my account?** "Go to Settings, choose Delete account and type your email to confirm. You have 30 days to change your mind by logging in. After that, your data is permanently deleted." Link: `/delete-account`.

#### 6.2.7 Final CTA band

- Full-width panel with `--gradient-glow` over `--gradient-hero`, white text, rounded 32px, inside the page container.
- H2: "Start with one sentence."
- Text: "Sign up in under a minute and log your first spend by typing “₹50 chai”."
- Buttons: "Get started" (white button with `--hero-ink` text: `oklch(0.36 0.17 300)`) and "Log in" (outline white).

### 6.3 Products

#### 6.3.1 `/products` (overview)

- H1: "Products"
- Intro: "TrackWithAgent builds focused AI agents. Each one does a single job, lives on its own subdomain and shares one simple rule: the agent proposes, you decide."
- The two product cards from 6.2.2, larger, plus a short line under them: "Have an idea for an agent we should build? Tell us at {site.contactEmail}."

#### 6.3.2 `/products/finance`

Title: "TrackWithAgent Finance: track every rupee, split with friends, settle by UPI". Description: "A personal finance tracker for India with an AI assistant you can talk to in English, Hindi or Hinglish. Free during early access."

**Hero:** two columns. Left: Finance icon, overline "TrackWithAgent Finance", H1 **"Track every rupee. Split with friends. Settle by UPI."** (this is the app's own tagline; three short sentences are the product's real three jobs, so this is the one allowed triplet), subhead "Log a spend in seconds by typing or saying it. Finance keeps your budgets, balances and group accounts up to date, and asks before it saves anything.", buttons "Get started" and "Log in". Right: phone frame with screenshot S1 (dashboard, dark) overlapping a desktop frame with S3, both tilting slightly with the pointer (max 4°, desktop only).

**Section index:** a sticky row of pill links under the hero (horizontally scrollable on mobile, with fade edges) jumping to sections A to H.

**Feature sections.** The page must show **every row of the feature inventory (section 4.2)**, rendered from `content/features.ts`, in the eight groups below. Each section has an H2, a one-sentence intro, a screenshot or coded visual, and a grid of feature items (lucide icon, the feature name as an H3, the one-line benefit). A test fails the build if any inventory ID is missing from the page (section 9.4).

| § | `id` | H2 | Intro | Rows | Visual |
|---|---|---|---|---|---|
| A | `logging` | "Add money in seconds" | "Tap, type, say it or paste it. Most entries take a few seconds." | A1 to A7 | S4 and S11; S12 |
| B | `accounts` | "Every account, one picture" | "Bank, cash, wallets and money you lent, with balances that keep themselves up to date." | B1 to B4 | Coded accounts card with the demo values |
| C | `assistant` | "An assistant that knows your numbers" | "Ask a question or ask for a change. It answers from your data and asks before it saves." | C1 to C10 | S5, plus example prompt chips: "How much did I spend on travel in August?", "Add ₹500 to my Goa trip goal", "What bills are due this week?", "Who owes me?", "kal uber 120", "<span lang="hi">चाय 50</span>". Fair-use limits in small text. Link to `/legal/ai`. |
| D | `friends` | "Split with friends, settle by UPI" | "Flats, trips and dinners, with one clear balance per friend." | D1 to D9 | S6 and S7 |
| E | `planning` | "Plan the month" | "Budgets, bills and goals that tell you what you can spend today." | E1 to E4 | S8 and S9 |
| F | `insights` | "See where it went" | "Your month at a glance, and every month before it." | F1 to F5 | S1 and S10 |
| G | `feel` | "Made to open every day" | "Small touches that make logging a habit, on any screen size." | G1 to G6 | S2 (light) beside S1 (dark) |
| H | `your-data` | "Your data stays yours" | "No bank login, private by default, and easy to take with you or delete." | H1 to H7 | Coded "Delete account" timeline mini-card. Links to `/security` and `/delete-account`. |

After section H, a "Coming next" strip with the first four items of the roadmap (6.10) and a link "See the full roadmap" → `/roadmap`.

**Spec table** (two columns, `<table>` with caption "Finance at a glance"):

| | |
|---|---|
| Works on | Any modern browser on phone, tablet or computer. Installable to the home screen. |
| Languages | Screens in English. Assistant understands English, Hindi and Hinglish. |
| Voice input | Chrome, Edge and Safari. Not available in Firefox. |
| Currency | Indian rupee (₹) with lakh grouping |
| Payments | Hands off to your own UPI app. Finance never moves or holds money. |
| Price | Free during early access **[OWNER TO CONFIRM]** |
| Your data | Export transactions as CSV any time. Delete your account from Settings. |
| Current version | v1.0, released 30 September 2026 |

Then: CTA band as 6.2.7, with H2 "Try it with your next chai."

If **[OWNER TO CONFIRM item 6]** is yes, add a muted line under the CTA: "Want to look around first? Log in with demo@demo.com and password demo1234. Everyone shares this demo account, so please do not add real data." Default: leave it out.

#### 6.3.3 Device frames and screenshots

Build a `DeviceFrame` component with two variants: `phone` (390 × 844 viewport, 44px corner radius, thin bezel drawn in CSS, no notch artwork that copies a real phone brand) and `browser` (a minimal window bar with three neutral dots and a URL pill reading `finance.trackwithagent.com`). Images go through `next/image` with explicit `width`/`height`, `sizes`, and `alt` text describing what the screen shows (for example "Finance dashboard showing ₹18,240 spent this month, budgets and a category chart").

**Until real screenshots exist, never show a grey box.** If a screenshot file is missing at build time, `DeviceFrame` renders a coded mock of that screen instead: real-looking HTML using the brand tokens and the demo values below. The page must look finished either way.

Demo values for mocks (all fictional, consistent across the site): user "Aarav"; this month spent ₹18,240, income ₹62,000; budgets Food ₹5,700 of ₹8,000, Travel ₹2,100 of ₹3,000; accounts SBI ₹48,310, Cash ₹1,250, Paytm wallet ₹640; friends Rohan owes you ₹450, You owe Priya ₹1,200; group "Flat 4B"; goal "Goa trip" ₹14,500 of ₹25,000; streak 12 days.

#### 6.3.4 Screenshot list for the owner (put this table in the README too)

How to capture: open the live app in Chrome, log in with a showcase account that has realistic but fake data (or the demo account, see item 6 in section 0; **never use your real data**). Open DevTools (F12), toggle the device toolbar (Ctrl+Shift+M), choose "Dimensions: Responsive", set the size below, set DPR in the device toolbar menu ("Add device pixel ratio"), then open the DevTools command menu (Ctrl+Shift+P) and run "Capture screenshot". Switch theme with the app's theme toggle. Save PNGs with these exact names into `public/screenshots/`; the site picks them up on the next deploy.

| ID | File name | URL on finance.trackwithagent.com | State to show | Viewport | DPR | Theme |
|---|---|---|---|---|---|---|
| S1 | `finance-dashboard-mobile-dark.png` | `/` | Dashboard scrolled to top | 390 × 844 | 3 | Dark |
| S2 | `finance-dashboard-mobile-light.png` | `/` | Same as S1 | 390 × 844 | 3 | Light |
| S3 | `finance-dashboard-desktop-dark.png` | `/` | Dashboard with sidebar | 1440 × 900 | 2 | Dark |
| S4 | `finance-quick-add-mobile-dark.png` | `/` | Tap "+", type 50, pick Food | 390 × 844 | 3 | Dark |
| S5 | `finance-assistant-confirm-mobile-dark.png` | `/chat` | Send "₹50 chai today" and wait for the confirm card | 390 × 844 | 3 | Dark |
| S6 | `finance-friends-mobile-dark.png` | `/friends` | Friends list with balances | 390 × 844 | 3 | Dark |
| S7 | `finance-settle-up-desktop-dark.png` | `/groups/<a group id>` | Open Settle up for a friend with a UPI ID so the QR shows | 1440 × 900 | 2 | Dark |
| S8 | `finance-budgets-mobile-dark.png` | `/budgets` | Budgets with green and amber bars | 390 × 844 | 3 | Dark |
| S9 | `finance-goals-mobile-light.png` | `/goals` | A goal partly filled | 390 × 844 | 3 | Light |
| S10 | `finance-reports-desktop-light.png` | `/reports` | Month view with comparison | 1440 × 900 | 2 | Light |
| S11 | `finance-paste-sms-mobile-dark.png` | `/` | "+" then the paste-SMS panel with a sample bank SMS filled in | 390 × 844 | 3 | Dark |
| S12 | `finance-transactions-mobile-light.png` | `/transactions` | Day-grouped list | 390 × 844 | 3 | Light |

Before saving: make sure no real names, emails, phone numbers or UPI IDs appear (use fictional ones like `aarav@okbank`).

#### 6.3.5 `/products/replay` (coming soon)

Title: "TrackWithAgent Replay: coming soon". `robots`: index, follow (it is a real page). Description: `{site.replay.description}`.

- Replay tile (desaturated) with a slow 3D-free CSS shimmer across the "Coming soon" chip (off under reduced motion).
- Overline: "Coming soon"
- H1: "TrackWithAgent Replay"
- Text, from `site.config.ts` with these shippable defaults:
  - `replay.tagline`: "Our next agent. We are building it now."
  - `replay.description`: "Replay is the second agent from TrackWithAgent. It follows the same rule as Finance: the agent does the tracking, and you approve what it saves. Join the waitlist and we will write to you once, when it is ready to try."
- Waitlist block: H2 "Join the waitlist", one line "We will email you once when Replay opens. No newsletter.", and a primary button "Join the waitlist" that opens the `mailto:` from 6.0. Under it, muted: "Prefer to write? Email {site.contactEmail} with the subject Replay waitlist."
- Optional (only if `site.replay.waitlistFormUrl` is set, for example a free Google Form): the button links there instead and opens in a new tab with `rel="noopener"`.
- Below: "While you wait, Finance is live." with the Finance card.
- Do not guess what Replay does. Do not show fake screenshots of it.

### 6.4 `/about`

Title: "About TrackWithAgent". 

- H1: "We build agents that do the tracking."
- Section "Why we started": "Most of us keep track of life in a spreadsheet, a notes app, or not at all. Finance started as a Google Sheet for one person's spending, then for a flat of friends splitting rent and groceries. The sheet was slow on a phone and could not answer a simple question like “how much did I spend on food last month?”. So we built an app you can just tell, and that asks before it writes anything down."
- Section "What we believe" (a short list, not a manifesto):
  - "Logging should take seconds, not forms."
  - "An agent proposes and a person decides. Our agents never change your records without your tap."
  - "Built for India first: rupees, UPI, Hindi and Hinglish."
  - "Your data is yours to export and delete."
- Section "How we build" **[OWNER TO CONFIRM item 9]**: "Finance is designed, built and tested by a team of AI agents, a product manager, designer, engineers, QA and a security reviewer, working under one human owner who sets the direction and approves every release. We use the same idea in our products: agents do the work, people stay in charge."
- Section "Company": founder card if `site.founder.name` is set (photo optional, otherwise initials avatar on the brand gradient): name, role, one sentence bio from `site.founder.bio`. Then a facts list: "Founded {site.foundedYear}", "Based in {site.city}, India", "Legal entity: {site.legalName}". Hide any line whose value is empty.
- CTA: "Say hello" → `/contact`.

### 6.5 `/contact`

Title: "Contact TrackWithAgent".

- H1: "Get in touch"
- Intro: "We read every message. Most replies go out within two working days."
- Contact cards (each a `mailto:` link, copy-to-clipboard button beside it with a "Copied" toast that is announced via `aria-live`):
  - **General and partnerships:** `{site.contactEmail}`
  - **Help with Finance:** `{site.supportEmail}`. Help text: "Forgot your password? Write from the email address on your account and we will reset it after checking it is you." **[OWNER TO CONFIRM item 8]**
  - **Privacy and data requests:** `{site.privacyEmail}`
  - **Security reports:** `{site.securityEmail}` (link to `/security#report`)
  - **Grievance Officer:** `{site.grievance.name}`, `{site.grievance.email}` (link to `/legal/privacy#grievance`)
- Postal address block: `{site.legalName}`, `{site.address}`.
- No contact form (no backend). Do not add one.

### 6.6 `/security`

Title: "Security at TrackWithAgent".

- H1: "How we keep your data safe"
- Intro: "Finance holds personal money records, so we treat them carefully. Here is what we do today, in plain words."
- Sections with short paragraphs:
  - **"We never touch your money."** "Finance has no access to your bank. We never ask for bank logins, card numbers or your UPI PIN. Settling up opens your own UPI app; the payment happens there, not with us."
  - **"Passwords and sessions."** "Passwords are stored only as bcrypt hashes, so we cannot read them. Your session lives in a secure, HttpOnly cookie that scripts cannot read and that expires after 30 days. Changing your password ends your older sessions. After 10 wrong passwords for one email within 15 minutes, login pauses for that email."
  - **"Your data is walled off."** "Every request checks who you are and returns only your own records, or the shared records of groups you belong to."
  - **"Encrypted in transit."** "Every page and API call uses HTTPS." Add: "Data at rest is stored with our database provider, Neon, which encrypts stored data." **[OWNER TO CONFIRM against Neon's current documentation]**
  - **"The AI cannot act alone."** "The assistant can read your records to answer you, but every change goes through a confirm card that only you can approve. We also limit how many requests each person can make, to protect the service from abuse." Link `/legal/ai`.
  - **"Invite links."** "Group invite links use long random tokens. We store only a fingerprint (hash) of each token, links expire, and the person who made one can revoke it."
  - **"Deletion that actually deletes."** "When you delete your account, you are signed out everywhere. After a 30-day grace period, your account and everything in it are permanently erased." Link `/delete-account`.
  - **"Where your data lives."** "The app runs on Vercel and stores data in a Postgres database on Neon. Cloudflare provides our DNS only." **[OWNER TO CONFIRM regions, then add them here]**
- Section `#report` **"Report a security issue"**: "Found a vulnerability? Email {site.securityEmail} with steps to reproduce. Please give us reasonable time to fix it before sharing it publicly, and do not access other people's data, run denial-of-service tests or use automated scanners against production. We will acknowledge your report within 3 working days and keep you updated. We do not run a paid bug bounty yet, but we will thank you publicly if you would like."
- Note at the bottom: "We are a young company and do not hold security certifications yet. We will update this page as our practices grow." (Honest, and reviewers respect it.)

### 6.7 `/changelog` (What's new)

MDX, newest first, each entry with a date, version chip and short bullets.

- **[LAUNCH DATE] · Website launched.** "trackwithagent.com is live with this changelog, our security page and full legal pages."
- **30 September 2026 · Finance v1.0**
  - "A new look across the whole app, with smooth motion and a designed dark mode."
  - "Quick add from any screen, and say-it quick add: one sentence fills the form."
  - "The assistant now lives on every page, understands Hindi and Hinglish, takes voice input and can read replies aloud."
  - "Friends view with one balance per friend, UPI settle-up with a pay link or QR code, WhatsApp reminders and group invite links."
  - "Safe to spend today, upcoming bills, monthly insights, a logging streak and milestone celebrations."
  - "Paste a bank or UPI SMS to fill an entry."
  - "First-run setup for new accounts."
  - "Account deletion now has a 30-day window to change your mind."

### 6.8 `/legal` (index)

H1 "Legal". A list of cards linking to each legal page with a one-line summary and the effective date. Text above: "These documents apply to trackwithagent.com and to TrackWithAgent Finance. Questions: {site.privacyEmail}."

### 6.9 Legal page template

All legal pages use one layout: H1, "Effective {site.effectiveDate}" and "Last updated {site.effectiveDate}" under it, a sticky table of contents on desktop (≥1024px) with anchor links, numbered H2s with `id`s, comfortable 68ch measure, and a "Questions? Contact {site.privacyEmail}" box at the end. Print stylesheet: hide header, footer and TOC.

Draft text follows. Keep the meaning; you may fix grammar. Placeholders in square brackets map to `site.config.ts`.

---

#### 6.9.1 Privacy Policy (`/legal/privacy`)

**Privacy Policy**

**1. Who we are**
This policy explains how [LEGAL ENTITY NAME] ("TrackWithAgent", "we", "us"), of [REGISTERED ADDRESS], collects and uses personal data when you visit trackwithagent.com (the "Website") or use TrackWithAgent Finance at finance.trackwithagent.com ("Finance"). Under India's Digital Personal Data Protection Act, 2023 (the "DPDP Act"), we are the Data Fiduciary for this data. For people in the European Economic Area, the United Kingdom and similar places, we are the data controller.

TrackWithAgent Replay has not launched. This policy will be updated before it does.

**2. The short version**
- We collect what you give us to run Finance: your account details and the money records you enter.
- We do not sell your data, show ads or use your data to train AI models.
- We never ask for bank logins, card numbers or your UPI PIN, and we never move money.
- When you use the AI assistant, the parts of your data needed to answer you are sent to an AI provider for that request.
- You can export your transactions and delete your account at any time.

**3. Data we collect**

*3.1 When you create a Finance account:* your name, email address and password. We store the password only as a one-way bcrypt hash; we cannot read it.

*3.2 Money records you enter:* accounts (name, type and opening balance), transactions (type, amount, description, date, category and account), categories, budgets, recurring entries, savings goals, groups, shared expenses and how they are split, and settlements between group members.

*3.3 Optional details:* your UPI ID, if you add one so friends can pay you.

*3.4 Things you send us to process:* messages you type or speak to the assistant, CSV files you import, and sentences you use to fill the quick-add form.

*3.5 Technical data:* a session cookie (see our Cookie Policy), and your IP address and browser details, which our hosting provider records in request logs and which we use briefly in memory to limit abuse of invite links.

*3.6 On the Website:* we use Vercel Web Analytics, which counts page views without cookies and without identifying you. The Website sets no cookies.

*3.7 What we do not collect:* bank login details, card numbers, UPI PINs, the contents of your SMS inbox, your contacts or your location. When you paste a bank SMS into Finance, it is read on your device and only the entry you choose to save is sent to us. Voice input is converted to text by your browser's speech service (for example, Chrome uses Google's); we receive only the text, and only when you send it.

**4. Why we use your data**

| Purpose | Data | Basis under the DPDP Act | Basis under GDPR |
|---|---|---|---|
| Create and secure your account | Account data, technical data | Your consent when you sign up | Performance of a contract |
| Run Finance: store records, calculate balances, budgets, reports and insights | Money records | Your consent | Performance of a contract |
| Let group members split and settle | Name, shared group records, UPI ID if added | Your consent | Performance of a contract |
| Answer and act on assistant requests | See section 5 | Your consent, given when you use the assistant | Performance of a contract |
| Prevent abuse and keep the service secure | Technical data, login attempts | Legitimate uses permitted by law | Legitimate interests |
| Understand Website traffic in aggregate | Cookieless analytics | Not personal data in identifiable form | Legitimate interests |
| Meet legal obligations | As required | Compliance with law | Legal obligation |

You can withdraw consent at any time by deleting your account (section 9). Withdrawal does not affect processing already done.

**5. How the AI assistant uses your data**
When you use the assistant or the "say it" quick-add field, our server sends your request to an AI provider so it can understand you and propose an answer or an entry. We currently use: [AI PROVIDERS ENABLED, e.g. Anthropic PBC (USA) / OpenAI (USA) / xAI (USA) / DeepSeek (China)]. If one is unavailable we try the next.

For each request we send: your first name, today's date, the names of your categories, accounts, savings goals and groups, your default account, up to your last 12 messages in the current conversation, and the results of lookups the assistant runs to answer you (for example, matching transactions, monthly totals, balances, budget status, upcoming bills, goal progress, and names and balances in groups you belong to).

We never send your email address, password, UPI ID or session cookie. We do not store assistant conversations in our database. AI providers process the request under their own API terms; [OWNER TO CONFIRM: each listed provider's current API data retention and no-training terms, e.g. "they do not use API data to train their models and keep it for up to 30 days for abuse monitoring"]. The assistant never changes your records on its own: every proposed change waits for you to confirm it. More detail: our AI use disclosure at /legal/ai.

**6. Who can see your data**
- **You.** Your personal records are visible only to you.
- **Members of your groups.** They see your name, the group's shared expenses and settlements, your balance with them, and your UPI ID if you added one.
- **Our service providers (Data Processors),** only to run the service:

| Provider | What they do | Location |
|---|---|---|
| Vercel Inc. | Hosts the Website and Finance, keeps request logs, provides cookieless analytics | Singapore for the Finance app's servers (Vercel company: USA; pages served from a global network) |
| Neon (Databricks, Inc.) | Hosts the Finance database | [OWNER TO CONFIRM, e.g. Singapore] |
| [AI PROVIDERS ENABLED] | Process assistant requests | [e.g. USA; China for DeepSeek] |
| Cloudflare, Inc. | DNS only (does not receive page content or your data) | Global |

- **Authorities,** when Indian law or a valid legal order requires it.
- **A successor,** if we merge or are acquired, under this policy's protections, with notice to you.

We do not sell or rent personal data, and we do not share it for advertising.

**7. Transfers outside India**
Our providers process data outside India, including in the countries listed above. We transfer data only to countries not restricted by the Government of India under section 16 of the DPDP Act, and rely on our providers' contractual safeguards (such as Standard Contractual Clauses for data from the EEA and UK).

**8. How long we keep data**
- Account and money records: for as long as your account exists.
- After you ask to delete your account: 30 days, so you can change your mind, then permanent deletion (section 9).
- Database recovery history kept by our database provider: up to [BACKUP WINDOW], after which deleted data cannot be restored.
- Hosting request logs: up to [LOG RETENTION] under our hosting provider's settings.
- Rate-limit counters: in server memory only, cleared within a day.
- Emails you send us: as long as needed to deal with your request, and then up to 3 years for our records, unless law requires longer.

**9. Deleting your account**
In Finance, go to Settings, choose Delete account and type your email to confirm. You are signed out on every device straight away. If you log in within 30 days, the deletion is cancelled. After 30 days we permanently delete your account and all your records. Full steps and what happens to group data: trackwithagent.com/delete-account. If you cannot log in, email [PRIVACY EMAIL] from your account's email address.

**10. Your rights**
Under the DPDP Act you have the right to:
- get a summary of the personal data we process about you and the processing we do, and the identities of anyone we have shared it with;
- have inaccurate or incomplete data corrected, completed or updated;
- have your data erased, unless the law requires us to keep it;
- withdraw your consent at any time;
- have your grievance addressed by us (section 12) before approaching the Data Protection Board of India;
- nominate another person to exercise these rights if you die or cannot act yourself.

If GDPR or a similar law applies to you, you also have the right to access and receive a copy of your data in a portable format, to restrict or object to processing, and to complain to your local data protection authority.

Most of this you can do yourself in Finance: edit or delete records, change your name or UPI ID, export transactions as CSV, and delete your account. For anything else, email [PRIVACY EMAIL]. We may ask you to confirm your identity, and we will respond within 30 days, or sooner where the law requires.

You also have duties under the DPDP Act, such as not giving false information or impersonating someone.

**11. Security**
We use HTTPS for all traffic, store passwords only as bcrypt hashes, keep sessions in secure HttpOnly cookies, check on every request that you can see only your own data, and limit login attempts and AI usage. No system is perfectly secure. If a personal data breach affects you, we will inform you and the Data Protection Board of India as the law requires. More: trackwithagent.com/security.

**12. Grievance Officer** (`id="grievance"`)
Under the DPDP Act and the Information Technology Act, 2000 and its rules, you can contact our Grievance Officer about how we handle your data or anything on our services:

[GRIEVANCE OFFICER NAME]
[LEGAL ENTITY NAME], [REGISTERED ADDRESS]
Email: [GRIEVANCE OFFICER EMAIL]

We acknowledge complaints within 24 hours and aim to resolve them within 15 days. If you are not satisfied, you may complain to the Data Protection Board of India.

**13. Children**
Our services are for people aged 18 and over. We do not knowingly collect data from children. If you believe a child has created an account, email [PRIVACY EMAIL] and we will delete it. [OWNER TO CONFIRM age]

**14. Changes to this policy**
If we make a significant change, we will update the date above and tell Finance users in the app or by email before it takes effect.

**15. Contact**
[PRIVACY EMAIL] · [LEGAL ENTITY NAME], [REGISTERED ADDRESS]

---

#### 6.9.2 Terms of Service (`/legal/terms`)

**Terms of Service**

**1. Agreement**
These terms are an agreement between you and [LEGAL ENTITY NAME] ("TrackWithAgent", "we"), [REGISTERED ADDRESS], and cover trackwithagent.com and TrackWithAgent Finance (together, the "Services"). By creating an account or using the Services, you agree to these terms, our Privacy Policy and our Acceptable Use Policy. If you do not agree, do not use the Services.

**2. Who can use the Services**
You must be at least 18 years old and able to enter a binding contract under Indian law. You are responsible for the accuracy of the information you give us.

**3. Your account**
Keep your password private and tell us at [SUPPORT EMAIL] if you think someone else has used your account. You are responsible for activity under your account. One person per account.

**4. What Finance does, and what it does not**
Finance helps you record and understand your own spending and income, and keep track of shared costs with friends. It is a record-keeping tool.
- **Not financial advice.** Nothing in the Services, including anything the AI assistant says, is financial, investment, tax or legal advice. Check important numbers yourself.
- **We do not handle money.** Finance does not connect to your bank, hold funds or make payments. Settle up opens your own UPI app with an amount filled in; the payment is between you, your bank and your UPI app, under their terms. Marking a payment as paid in Finance is only a record. We are not responsible for payments you make or receive.
- **Balances are what you enter.** Balances, budgets and reports are calculated from the records you and your group members enter. They will be wrong if the records are wrong.

**5. The AI assistant**
The assistant uses third-party AI models to understand your messages. It can make mistakes: it may misread an amount, pick the wrong category or give an incorrect answer. Every change it proposes is shown to you first and is saved only if you confirm it, so please check each card before you tap Confirm. Use is subject to fair-use limits (currently 6 messages a minute and 100 a day). See /legal/ai.

**6. Groups and shared content**
When you add expenses to a group, other members can see them. Only add people who agreed to be in the group, and only add accurate entries. You are responsible for what you share. If someone's entries in a group are wrong, sort it out with them; we do not arbitrate debts between users.

**7. Your content**
You own the records you enter. You give us a limited licence to store, process and display them only to provide the Services to you and the members of groups you share with. You can export your transactions and delete your account at any time.

**8. Acceptable use**
You must follow our Acceptable Use Policy (/legal/acceptable-use). We may suspend or close accounts that break it.

**9. Price**
The Services are currently free during early access. If we introduce paid features, we will tell you at least 30 days in advance, and you will not be charged unless you choose a paid plan. [OWNER TO CONFIRM]

**10. Changes and availability**
We are improving the Services all the time and may add, change or remove features. We aim to keep them available but do not promise uninterrupted service; maintenance, outages at our providers, or AI services being unavailable can affect them. We will give reasonable notice before shutting down a product, so you can export your data.

**11. Ending these terms**
You can stop using the Services and delete your account at any time (/delete-account). We may suspend or close your account if you seriously or repeatedly break these terms, if the law requires it, or to protect other users, and we will tell you why unless the law prevents us.

**12. Our intellectual property**
The Services, the TrackWithAgent name and logos, and our software and designs belong to us or our licensors. These terms do not give you any right to use them except to use the Services.

**13. Disclaimers**
The Services are provided "as is" and "as available". To the extent the law allows, we disclaim all warranties not stated in these terms, including fitness for a particular purpose. Nothing in these terms limits rights you have under the Consumer Protection Act, 2019 or other laws that cannot be excluded.

**14. Limitation of liability**
To the extent the law allows, we are not liable for indirect or consequential losses, lost profits or lost data, or for payments made between users. Our total liability for any claim related to the Services is limited to the greater of the amount you paid us in the 12 months before the claim and ₹1,000. [OWNER TO CONFIRM with lawyer]

**15. Indemnity**
If you break these terms or the law and someone makes a claim against us because of it, you agree to cover our reasonable losses and costs from that claim.

**16. Governing law and disputes**
These terms are governed by the laws of India. Before going to court, please contact us so we can try to fix the problem. The courts at [CITY FOR COURTS] have exclusive jurisdiction, subject to any right you have to bring a consumer complaint where you live.

**17. Grievances**
Contact our Grievance Officer: [GRIEVANCE OFFICER NAME], [GRIEVANCE OFFICER EMAIL]. We acknowledge within 24 hours and aim to resolve within 15 days.

**18. Changes to these terms**
We may update these terms. For significant changes we will notify Finance users in the app or by email at least 15 days before they take effect. Continuing to use the Services after that means you accept the new terms.

**19. General**
If part of these terms is found unenforceable, the rest still applies. Not enforcing a term is not a waiver. You may not transfer these terms; we may transfer them to a successor with notice to you.

**20. Contact**
[CONTACT EMAIL] · [LEGAL ENTITY NAME], [REGISTERED ADDRESS]

---

#### 6.9.3 Cookie Policy (`/legal/cookies`)

**Cookie Policy**

**1. The short version**
trackwithagent.com sets no cookies. TrackWithAgent Finance sets one cookie, which is needed to keep you logged in. We use no advertising, tracking or analytics cookies anywhere, so we do not show a cookie banner.

**2. trackwithagent.com**
- No cookies.
- Your light or dark theme choice is saved in your browser's local storage (`theme`). It never leaves your device.
- Vercel Web Analytics counts page views without cookies and without identifying you.

**3. TrackWithAgent Finance (finance.trackwithagent.com)**

| Name | Type | Purpose | Lasts | Can you refuse it? |
|---|---|---|---|---|
| `token` | Cookie, strictly necessary | Keeps you logged in. A signed token holding your account ID and session version. HttpOnly (scripts cannot read it), Secure, SameSite=Lax. | 30 days, or until you log out, change your password or delete your account | No, you cannot log in without it |
| `theme` | Local storage | Remembers light, dark or system theme | Until you clear it | Yes, clear site data; the app falls back to your system theme |
| Quick-add account | Local storage | Remembers the account you last used in quick add, per user | Until you clear it | Yes |
| Voice language | Local storage | Remembers English or Hindi for voice input, per user | Until you clear it | Yes |
| Read replies aloud | Local storage | Remembers whether the assistant speaks its replies, per user | Until you clear it | Yes |
| Celebrations | Local storage | Remembers which milestone celebrations already played, so they do not repeat | Until you clear it | Yes |

Local storage items stay on your device and are not sent to our servers.

**4. Managing cookies**
You can delete cookies and site data in your browser settings at any time. Deleting the `token` cookie logs you out.

**5. Changes**
If we ever add a cookie that is not strictly necessary, we will ask for your consent first and update this page.

**6. Contact**
[PRIVACY EMAIL]

---

#### 6.9.4 Acceptable Use Policy (`/legal/acceptable-use`)

**Acceptable Use Policy**

These rules keep TrackWithAgent safe and fair for everyone. They are part of our Terms of Service.

**You may not:**
1. Use the Services for anything illegal, including money laundering, fraud, tax evasion or tracking proceeds of crime.
2. Add people to groups without their agreement, record false debts to pressure or harass anyone, or use payment reminders to abuse or threaten people.
3. Upload or enter content that is unlawful, hateful, sexually explicit, threatening, or that infringes someone else's rights, including in descriptions, group names and goal names.
4. Enter other people's sensitive personal data (such as bank account numbers, card numbers or ID numbers) into descriptions or notes.
5. Access or try to access another person's account or data, or share your login with others.
6. Probe, scan or test the security of the Services except as described on our Security page, or interfere with them (for example, overloading them, bypassing rate limits, or using bots or scrapers).
7. Try to make the AI assistant produce harmful content, reveal its instructions, or act outside its purpose, or use it for anything unrelated to managing your own money at a scale that strains the service.
8. Use the shared demo account, if offered, to store real personal data or to post offensive content.
9. Copy, resell or build a competing service from our software, designs or content, or reverse engineer the Services except where the law allows.
10. Pretend to be TrackWithAgent or another person.

**What we do if rules are broken**
Depending on how serious it is, we may remove content, limit features, suspend or close the account, and report illegal activity to the authorities. Report abuse to [CONTACT EMAIL] or our Grievance Officer at [GRIEVANCE OFFICER EMAIL].

---

#### 6.9.5 AI use disclosure (`/legal/ai`)

Title: "How we use AI". This page is written for users, so keep it friendly.

**How we use AI**

**What the assistant does**
TrackWithAgent Finance includes an AI assistant. You can ask it about your money ("How much did I spend on food in August?") or ask it to add things ("₹50 chai today", "Split ₹1,200 dinner in Flat 4B", "Add ₹500 to my Goa trip goal"). It also powers the "say it" field in quick add, which turns one sentence into a filled form.

**You stay in control**
The assistant can read your records to answer you. It can never change them by itself. Every add, change or delete it suggests appears as a card that you can edit, and nothing is saved until you tap Confirm. If you ignore or cancel the card, nothing happens.

**Which AI services we use**
We send requests to: [AI PROVIDERS ENABLED, e.g. Anthropic (Claude), OpenAI, xAI (Grok), DeepSeek]. If the first is unavailable, we try the next. You do not choose or pay for the model.

**What we send, and what we do not**
To answer you, we send your first name, today's date, the names of your categories, accounts, goals and groups, up to the last 12 messages of your conversation, and the results of lookups the assistant makes for your question (such as matching transactions, totals, balances, budgets, upcoming bills, and names and balances in your groups). We never send your email address, password, UPI ID or login cookie. We do not store your assistant conversations; they disappear when you leave the page.

**Training**
We do not train AI models on your data. [OWNER TO CONFIRM per provider: "Our AI providers' API terms say they do not use API data to train their models."]

**Without AI**
If no AI service is available, Finance still understands simple entries in English, Hinglish and Hindi script using a small built-in parser that runs on our server without any AI provider. It shows the same confirm card. Questions about your spending need the AI and will work again once it is back.

**Voice**
The mic button uses your browser's own speech recognition (Chrome, Edge and Safari; not Firefox). Your browser's provider converts your voice to text (for example, Google for Chrome). We receive only the text, and only when you tap Send. "Read replies aloud" uses your device's built-in voice.

**Limits**
To keep the service fair and protect it from abuse: 6 assistant messages a minute and 100 a day per person, and 4 quick-add fills a minute and 40 a day.

**Mistakes happen**
AI can misunderstand. It may choose the wrong category, misread a date, or answer a question incorrectly. Check each confirm card before saving, and treat answers as help, not financial advice. If the assistant says something wrong or inappropriate, tell us at [SUPPORT EMAIL].

**No automated decisions about you**
We do not use AI to make decisions that have legal or similarly significant effects on you, such as credit or eligibility decisions.

---

#### 6.9.6 Delete your account (`/delete-account`)

Title: "Delete your TrackWithAgent account and data". This page must be reachable without logging in (it is also the URL to give app stores later).

- H1: "Delete your account and data"
- Intro: "You can delete your TrackWithAgent Finance account at any time. Here is exactly how, and what happens next."
- **Steps** (numbered, with small coded illustrations of each screen):
  1. "Log in at finance.trackwithagent.com." (link)
  2. "Open Settings."
  3. "Choose Delete account."
  4. "Type your email address to confirm, then confirm."
- **What happens next** (timeline component, three points):
  - **Right away:** "You are signed out on every device and nobody can log in to the account."
  - **For 30 days:** "Your data is kept in case you change your mind. Log in again within 30 days and the deletion is cancelled, with everything as you left it."
  - **After 30 days:** "Your account and all its data are permanently deleted by our daily clean-up. This cannot be undone."
- **What is deleted:** "Your name, email and password hash, UPI ID, accounts, transactions, categories, budgets, recurring entries, savings goals, group memberships, shared expenses you paid, your splits, settlements to or from you, and invite links you created."
- **What other people keep** **[OWNER TO CONFIRM item 11]**: "Groups you were in stay for the other members. Shared expenses you paid and payments involving you are removed from those groups, so their group balances may change. Entries that were already added to other members' own trackers stay with them. Consider settling up and telling your group before you go."
- **Before you delete:** "Download your transactions from Finance as a CSV file if you want a copy. Settle any open balances with friends."
- **Backups:** "Our database provider keeps a short recovery history of up to [BACKUP WINDOW]. Deleted data disappears from it when that window passes."
- **Cannot log in?** "Email [PRIVACY EMAIL] from the email address on the account and ask us to delete it. We will confirm it is you and process the request within 30 days, following the same timeline."
- **The demo account** (only if item 6 is yes): "The shared demo account cannot be deleted."
- **Website visitors:** "trackwithagent.com does not store personal data about you, so there is nothing to delete for the website."

---

### 6.10 `/roadmap` (Coming next)

Title: "Roadmap: what is coming to TrackWithAgent". Description: "What we are building next for TrackWithAgent Finance and Replay, in plain words. No dates until we are sure."

- H1: "What we are building next"
- Intro: "This is our honest list. Items move from Planned to In progress to shipped, and shipped items move to What's new. We do not give dates until we are sure."
- Two groups, "In progress" first, then "Planned". Each item: title (H3), one or two sentences of user benefit, product chip (Finance or Replay). No dates, no percentages, no vote counts.
- Footer of the page: "Want something that is not here? Email {site.contactEmail}." and a link to `/changelog`.
- Data lives in `content/roadmap.ts`: `{ id, title, benefit, product: "Finance" | "Replay", status: "in-progress" | "planned" }[]`, so the owner can move items by changing one word.

Default items (from the app's open backlog, its v1.1 candidates, and the owner's real-user readiness list; all **[OWNER TO CONFIRM item 12]**):

| Status | Product | Title | Benefit (site copy) |
|---|---|---|---|
| In progress | Finance | Faster dashboard on phones | "The home screen will open noticeably faster on mid-range phones and slow connections." |
| Planned | Finance | Reset your password by email | "Forgot your password? You will get a secure reset link by email instead of writing to us." |
| Planned | Finance | Email verification | "We will confirm your email address when you sign up, so your account and its recovery stay in your hands." |
| Planned | Finance | Stronger protection for sign-up and login | "Better limits and bot checks keep fake accounts and password guessing out, so the service stays fast and safe for real users." |
| Planned | Finance | "Today" in India time, everywhere | "Late-night entries will always land on the right day and month, based on India time." |
| Planned | Finance | Automatic backups | "Regular, tested backups of the database, so your records survive even a bad day at our providers." |
| Planned | Finance | Exact to the paisa | "Amounts will be stored as exact paise, so long-running totals never drift by a fraction of a rupee." |
| Planned | Finance | App lock | "Lock the app with a PIN or your phone's fingerprint, so a borrowed phone does not open your money." |
| Planned | Finance | Search everything | "Find any entry, friend, goal or page from one search box." |
| Planned | Finance | Spending calendar | "See your spending as a calendar, to spot heavy days at a glance." |
| Planned | Replay | Replay early access | "The second TrackWithAgent agent. Join the waitlist to try it first." Link to `/products/replay`. |

Copy note: the roadmap is the only place that talks about features that do not exist yet. Everywhere else, only section 4.2 features may be described.

### 6.11 404 (`app/not-found.tsx`)

- Small 2D illustration: the company mark's track line ending in an empty ring instead of the dot (CSS/SVG, animates the line drawing once; static under reduced motion).
- H1: "This page went off track."
- Text: "The link may be old or mistyped."
- Buttons: "Go home" (primary) and "Open Finance" (secondary). Links below: Products, Contact.
- Status 404, `robots: noindex`.

---

## 7. Performance and accessibility requirements

### 7.1 Performance

| Metric (mobile, production) | Target |
|---|---|
| Lighthouse Performance, Home | ≥ 90 |
| Lighthouse Performance, all other pages | ≥ 95 |
| Largest Contentful Paint | < 2.0 s (Home poster or H1 is the LCP) |
| Cumulative Layout Shift | < 0.02 |
| Interaction to Next Paint | < 200 ms |
| Total Blocking Time | < 150 ms |
| Initial JS on Home (excluding the lazy 3D chunk) | < 120 KB gzipped |
| 3D chunk | < 300 KB gzipped, loaded after idle, never on pages other than Home |

Rules:
- Fonts through `next/font` with `display: swap` and size-adjusted fallbacks (no layout shift). Preload only Geist 400 and Bricolage 800.
- Images through `next/image`, AVIF/WebP, explicit dimensions, `sizes` set, `priority` only on the hero poster.
- No client component unless it needs interactivity. Header menu, theme toggle, FAQ, copy buttons, motion wrappers and the 3D scene are the client islands.
- Lenis and Motion load on every page but must stay small; use `LazyMotion` with `domAnimation` and the `m` component where possible.
- Every animation uses `transform` and `opacity` only.
- The 3D render loop must not run when the hero is not visible or the tab is hidden (section 6.2.1).

### 7.2 Accessibility (WCAG 2.2 AA)

- Semantic landmarks: one `header`, `nav` (labelled "Main" and "Footer"), `main id="main"`, `footer`. One `h1` per page, headings in order.
- Contrast: body text ≥ 4.5:1, large text ≥ 3:1, in both themes. Muted text tokens above already meet this on their backgrounds; verify with axe. White on `--gradient-brand-strong` is ≥ 5:1; never put text on `--gradient-brand`.
- Keyboard: every interactive element reachable in a logical order with a visible 2px `--ring` focus outline offset 2px; products menu opens with Enter/Space and arrows, closes on Escape and returns focus; mobile sheet traps focus.
- Targets at least 44 × 44px on touch.
- Motion: everything in section 3.5 respects `prefers-reduced-motion`. Nothing flashes more than 3 times a second.
- The 3D canvas is `aria-hidden`; device frames have meaningful `alt`; decorative images have `alt=""`.
- Links that open a mail app say so to screen readers (`aria-label="Email hello@trackwithagent.com"`).
- `lang="en-IN"` on `<html>`; Hindi words wrapped in `<span lang="hi">`.
- Forms: none, except the theme toggle and menu buttons, which need accessible names and states.

---

## 8. SEO

- **Metadata per page** via the Metadata API: unique `title` (template `"%s | TrackWithAgent"`, Home uses its full title), `description` (140 to 160 characters, copy rules apply), `alternates.canonical` (absolute `https://trackwithagent.com/...`, no trailing slash), `openGraph` (type, url, title, description, siteName "TrackWithAgent", locale `en_IN`), `twitter` (`summary_large_image`, `site: {site.social.x}` only if set). Set `metadataBase` to `https://trackwithagent.com`.
- **Open Graph images**, generated at build with `next/og` (`opengraph-image.tsx` per route group, 1200 × 630): dark background `#08080d`, a large soft brand-gradient glow in the top right, the company mark at top left, the page title in Bricolage Grotesque 800 at 64px, a one-line subtitle in Geist at 28px, and `trackwithagent.com` at the bottom in Geist Mono. Finance's image uses the Finance icon and the line "Track every rupee. Split with friends. Settle by UPI." Bundle the font files locally for `next/og`. Reuse the same image for Twitter.
- **Favicon set** using Next's file conventions: `app/icon.svg` (company mark), `app/favicon.ico` (32 × 32 and 16 × 16), `app/apple-icon.png` (180 × 180, full-bleed tile without transparency), plus `public/icon-192.png`, `public/icon-512.png` and `public/icon-maskable-512.png` (glyph inside the central 80% safe zone) referenced from `app/manifest.ts` (name "TrackWithAgent", short name "TrackWithAgent", `theme_color` and `background_color` `#08080d`, `display: "browser"`; the site is not a PWA).
- **`app/sitemap.ts`**: every indexable route with `lastModified` from the build date and the legal pages' effective date. Exclude the 404.
- **`app/robots.ts`**: allow all, `sitemap: https://trackwithagent.com/sitemap.xml`, `host: https://trackwithagent.com`.
- **JSON-LD** (a small `<JsonLd>` server component that renders `<script type="application/ld+json">`):
  - Every page: `Organization` with `name` "TrackWithAgent", `legalName` {site.legalName}, `url`, `logo` (`/icon-512.png`), `email` {site.contactEmail}, `foundingDate` if set, `address` as `PostalAddress` if set, `sameAs` with the social links that exist, and `contactPoint` (`contactType: "customer support"`, email {site.supportEmail}, `areaServed: "IN"`, `availableLanguage: ["en", "hi"]`). Plus `WebSite` with `name` and `url`.
  - `/products/finance` and Home: `SoftwareApplication` with `name` "TrackWithAgent Finance", `applicationCategory` "FinanceApplication", `operatingSystem` "Web", `url` "https://finance.trackwithagent.com", `offers` `{ "@type": "Offer", "price": "0", "priceCurrency": "INR" }` **[OWNER TO CONFIRM price]**, `softwareVersion` "1.0", `inLanguage` "en-IN", `publisher` the Organization. **Never** add `aggregateRating` or reviews.
  - Home: `FAQPage` with the FAQ in 6.2.6.
  - Validate with Google's Rich Results Test after deploy.
- **`public/.well-known/security.txt`** (RFC 9116): `Contact: mailto:{securityEmail}`, `Expires:` one year after build, `Preferred-Languages: en, hi`, `Canonical: https://trackwithagent.com/.well-known/security.txt`, `Policy: https://trackwithagent.com/security#report`. Generate it from `site.config.ts` with a route handler marked static, or write it at build time.
- **Security headers** in `next.config.ts` for all routes: `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` (only add `preload` after the owner confirms every subdomain is HTTPS-only, which it is on Vercel), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()`, `X-Frame-Options: DENY`, and a `Content-Security-Policy` of `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; worker-src 'self' blob:; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'`. Adjust only if something breaks (check the console for CSP errors on every page, including the 3D hero); a nonce-based CSP is not used because it would make pages dynamic.

---

## 9. Project structure, build order, QA

### 9.1 Structure

```
trackwithagent-website/
  app/
    layout.tsx                 # fonts, ThemeProvider, MotionConfig, Lenis, Header, Footer, Analytics, JSON-LD Organization
    globals.css                # tokens (section 3.3), @theme inline, base styles, utilities
    page.tsx                   # Home
    not-found.tsx
    opengraph-image.tsx        # default OG
    icon.svg  favicon.ico  apple-icon.png
    manifest.ts  robots.ts  sitemap.ts
    products/page.tsx
    products/finance/page.tsx  products/finance/opengraph-image.tsx
    products/replay/page.tsx   products/replay/opengraph-image.tsx
    about/page.tsx  contact/page.tsx  security/page.tsx
    changelog/page.mdx
    roadmap/page.tsx
    delete-account/page.mdx
    legal/page.tsx
    legal/privacy/page.mdx  legal/terms/page.mdx  legal/cookies/page.mdx
    legal/acceptable-use/page.mdx  legal/ai/page.mdx
    legal/layout.tsx           # legal template with TOC
  components/
    site-header.tsx  site-footer.tsx  mobile-nav.tsx  theme-toggle.tsx
    logo.tsx  product-card.tsx  device-frame.tsx  mock-screens/*.tsx
    section.tsx  reveal.tsx  faq.tsx  cta-band.tsx  copy-button.tsx  json-ld.tsx  legal-toc.tsx
    hero/hero.tsx              # server: copy + poster + slot
    hero/hero-scene-loader.tsx # client: capability checks, idle load, visibility pause
    hero/hero-scene.tsx        # client: R3F scene (dynamic import only)
    how-it-works-demo.tsx
  lib/
    motion.ts  device.ts (low-power checks)  format.ts (formatINR with lakh grouping)
  content/
    features.ts     # the full inventory from section 4.2 (single source for the Finance page and Home)
    roadmap.ts      # section 6.10, statuses the owner edits
    testimonials.ts # empty array at launch (section 6.2.5b)
    faq.ts
  public/
    products/finance.svg  products/replay.svg
    hero/poster-dark.avif  hero/poster-light.avif
    screenshots/           # owner drops PNGs here (section 6.3.4)
    fonts/                 # woff files for drei Text and next/og
    icon-192.png  icon-512.png  icon-maskable-512.png
    .well-known/security.txt (or generated)
  scripts/
    lint-copy.ts           # section 3.6
    check-launch.ts        # fails on [PLACEHOLDER] in built HTML
    make-poster.ts         # Playwright: renders the hero and saves posters
  e2e/
    smoke.spec.ts  a11y.spec.ts  screenshots.spec.ts
  site.config.ts           # every owner value (section 9.2)
  mdx-components.tsx
  next.config.ts           # redirects, headers, MDX
  README.md
```

### 9.2 `site.config.ts`

```ts
export const site = {
  name: "TrackWithAgent",
  url: "https://trackwithagent.com",
  tagline: "AI agents that keep track for you.",
  legalName: "[LEGAL ENTITY NAME]",
  address: "[REGISTERED ADDRESS]",
  courtsCity: "[CITY FOR COURTS]",
  city: "",                 // e.g. "Bengaluru"; empty hides it
  foundedYear: "",          // e.g. "2026"; empty hides it
  contactEmail: "[CONTACT EMAIL]",
  supportEmail: "[SUPPORT EMAIL]",
  privacyEmail: "[PRIVACY EMAIL]",
  securityEmail: "[SECURITY EMAIL]",
  grievance: { name: "[GRIEVANCE OFFICER NAME]", email: "[GRIEVANCE OFFICER EMAIL]" },
  effectiveDate: "[EFFECTIVE DATE]",
  launchDate: "[LAUNCH DATE]",
  founder: { name: "", role: "", bio: "", photo: "" },  // empty name hides the card
  social: { x: "", linkedin: "", github: "", instagram: "" }, // empty hides the icon
  ai: {
    providersShort: "[AI PROVIDERS ENABLED]",            // e.g. "Anthropic (Claude) and OpenAI"
    processors: [] as { name: string; role: string; location: string }[],
  },
  hosting: { vercelRegion: "[VERCEL REGION]", neonRegion: "[NEON REGION]", backupWindow: "[BACKUP WINDOW]", logRetention: "[LOG RETENTION]" },
  finance: {
    url: "https://finance.trackwithagent.com",
    signup: "https://finance.trackwithagent.com/signup",
    login: "https://finance.trackwithagent.com/login",
    version: "1.0",
    releaseDate: "30 September 2026",
    priceNote: "Free during early access",
    demoLogin: false,         // true shows the demo credentials line
  },
  replay: {
    url: "https://replay.trackwithagent.com",
    tagline: "Our next agent. We are building it now.",
    description: "Replay is the second agent from TrackWithAgent. It follows the same rule as Finance: the agent does the tracking, and you approve what it saves. Join the waitlist and we will write to you once, when it is ready to try.",
    waitlistFormUrl: "",      // optional free form link; empty uses mailto
  },
} as const;
```

The site uses `[CONTACT EMAIL]`-style values as visible text until filled, so the owner can see where each one appears. `check-launch.ts` greps the built `.next/server/app/**/*.html` for `/\[[A-Z][A-Z0-9 ,.'()/:-]{2,}\]/` and fails listing each page and placeholder.

Never link a placeholder: if an email value still starts with `[`, render it as plain text, not a `mailto:`.

### 9.3 Build order (commit after each milestone)

| # | Milestone | Done when |
|---|---|---|
| M0 | Scaffold: `create-next-app` (TypeScript, App Router, Tailwind, ESLint, no `src/`), read the installed Next docs listed in section 2, add dependencies, `site.config.ts`, MDX setup | `npm run dev` shows a blank page with fonts loaded; `npm run build` passes |
| M1 | Design foundation: tokens, fonts, theme toggle, `lib/motion.ts`, `Section`, buttons, chips, cards, header, mobile nav, footer, skip link, 404 | All global elements work at 375px and 1440px in both themes, keyboard only |
| M2 | Home without 3D: all sections and copy, the hero poster slot (temporary static gradient art), FAQ, how-it-works demo, CTA band | Home reads complete with JS disabled |
| M3 | 3D hero: scene, loader with capability checks, visibility pause, pointer tilt, scroll fade, theme adaptation; then `make-poster.ts` to produce the real posters | Smooth on a mid laptop, poster on reduced motion and mobile, no CLS, 3D chunk not in initial JS |
| M4 | Products: overview, Finance page rendered from `content/features.ts` with all eight sections, device frames and mock screens, Replay page with waitlist, `/roadmap` and the Home roadmap teaser | Every inventory ID is on the Finance page; mock screens look finished; adding a PNG to `public/screenshots/` swaps it in |
| M5 | About, Contact, Security, Changelog, Legal index | All copy in place, copy buttons work |
| M6 | Legal pages (privacy, terms, cookies, acceptable use, AI, delete account) with the legal template and TOC | All anchors work; print view is clean |
| M7 | SEO: metadata everywhere, OG images, icons, manifest, sitemap, robots, JSON-LD, security.txt, redirects, security headers | Validators pass; `curl -I` shows the headers |
| M8 | Quality pass: `lint:copy`, link check, axe, Lighthouse, responsive and theme sweep, reduced-motion sweep (section 9.4) | Every check in 9.4 passes |
| M9 | README for the owner, deploy (section 12), post-deploy checks | Live at trackwithagent.com |

### 9.4 QA steps

Add these npm scripts: `lint`, `typecheck`, `lint:copy`, `check:links` (`next build && next start -p 4321` in the background, then `linkinator http://localhost:4321 --recurse --skip "^mailto:"` and also check external product URLs return 200), `check:launch`, `test:e2e`, and `check` (typecheck, lint, lint:copy, build, check:links, test:e2e in order, stopping at the first failure).

Manual and automated checklist:
- [ ] `npm run check` passes.
- [ ] `smoke.spec.ts` asserts that every feature ID in `content/features.ts` renders on `/products/finance` (each feature item carries `data-feature-id`), and that the testimonials section is absent while `content/testimonials.ts` is empty.
- [ ] Search the built HTML for social-proof claims: "trusted by", "users" next to a number, "rating", "reviews", "as seen": none.
- [ ] Every link in header, footer, body and legal TOCs works; external links (`finance.trackwithagent.com`, `/login`, `/signup`) return 200. `replay.trackwithagent.com` is shown as text only, never linked, until it is live.
- [ ] All redirects in section 5 land on the right page.
- [ ] Playwright `screenshots.spec.ts` captures every route at 375 × 812 and 1440 × 900 in light and dark (`colorScheme` option) into `e2e/__screens__/`. Review them all: no overflow, no clipped text, no overlapping elements, nothing unstyled.
- [ ] Playwright with `reducedMotion: "reduce"`: no canvas element on Home, Lenis inactive, all content visible without scrolling animations.
- [ ] `a11y.spec.ts` runs axe on every route in both themes: zero violations.
- [ ] Keyboard pass by hand on Home, Finance and Privacy: tab through everything, open and close the products menu and mobile sheet, use the FAQ.
- [ ] Throttled check (Chrome DevTools, "Slow 4G" and 4x CPU): Home shows H1 and poster fast, no layout jump when 3D arrives.
- [ ] Hero pauses: scroll past it and confirm in the Performance panel that no frames render; switch tabs and back.
- [ ] Lighthouse mobile on each route of a production build (`next start`) meets section 7.1; re-run on the live URL after deploy with PageSpeed Insights.
- [ ] DevTools > Application: no cookies on any page.
- [ ] No console errors or CSP violations on any page.
- [ ] Search the built output for "—", "–", "lorem", "TODO", "undefined", "NaN", "[object Object]": none.
- [ ] Rich Results Test and an Open Graph preview (for example, opengraph.xyz) look right for Home and Finance.

---

## 10. README for the owner (write this file)

Plain language, short sections:
1. What this is and where it lives (GitHub repo, Vercel project, domain).
2. How to change text: which file holds which page (`site.config.ts` for names and emails, `content/*.ts` for Home and FAQ, `app/legal/*/page.mdx` for legal), and that changes go live when pushed to GitHub.
3. How to add screenshots (the table from 6.3.4).
4. How to run it locally (`npm install`, `npm run dev`, open http://localhost:3000).
5. Before launch: run `npm run check:launch` and fill what it lists.
6. Rules: no em dashes, no new cookies or trackers without adding a consent banner, and legal text must be reviewed by a lawyer.
7. Deploy steps (section 12, copied).

---

## 11. Things to avoid

- Fake social proof of any kind: user counts (even the expected ~2,000 users), testimonials, star ratings, "as seen in", partner logos, "trusted by", "join thousands of". Use the honest trust signals in 6.2.5 and the empty testimonials slot in 6.2.5b instead.
- Claiming features from section 4.3.
- Linking to anything that does not exist yet (Replay subdomain, social profiles, app stores, a blog, careers page, status page).
- A pricing page (there is no pricing).
- Stock photos, AI-generated people, generic "AI brain" or circuit imagery, robot illustrations.
- Copying the look, names or logos of other companies.
- Autoplaying sound or video. Video files at all (the demos are coded).
- Any third-party script except Vercel Analytics.

---

## 12. Deployment (step by step for the owner)

The Finance app is already a separate Vercel project on `finance.trackwithagent.com`. **Do not change its DNS record.** This website is a new, separate project.

### 12.1 Put the code on GitHub
1. Sign in at https://github.com. Click **New repository**. Name it `trackwithagent-website`, choose **Private**, do not add a README (the project has one). Click **Create repository**.
2. In the project folder, the coding agent runs:
   ```
   git init
   git add .
   git commit -m "TrackWithAgent website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/trackwithagent-website.git
   git push -u origin main
   ```

### 12.2 Create the Vercel project
1. Sign in at https://vercel.com with GitHub. Click **Add New... > Project**.
2. Find `trackwithagent-website` and click **Import**. Vercel detects Next.js. Leave the build settings as they are. No environment variables are needed.
3. Click **Deploy**. Wait for "Congratulations". Open the `...vercel.app` address it gives you and check the site.
4. In the project, open **Analytics** and click **Enable** (Web Analytics, cookieless).

### 12.3 Add the domain in Vercel
1. In the project, go to **Settings > Domains**.
2. Type `trackwithagent.com` and click **Add**. When asked, choose the recommended option: add `www.trackwithagent.com` too and **redirect www to trackwithagent.com**. (If it does not ask: add `www.trackwithagent.com` separately, click **Edit** on it, set **Redirect to** `trackwithagent.com` with status **308 Permanent Redirect**, and save.)
3. Both domains will show "Invalid Configuration" with the DNS records Vercel wants. Keep this page open. Typically:
   - For `trackwithagent.com`: an **A** record, name `@`, value an IP address such as `76.76.21.21` (Vercel may show a different, newer IP: use exactly what it shows).
   - For `www.trackwithagent.com`: a **CNAME** record, name `www`, value such as `cname.vercel-dns.com` or a project-specific `...vercel-dns-0xx.com` (use exactly what it shows).

### 12.4 Add the records in Cloudflare
1. Sign in at https://dash.cloudflare.com, click **trackwithagent.com**, then **DNS > Records**.
2. Look for existing records named `trackwithagent.com` (shown as `@`) or `www` of type A, AAAA or CNAME. If any exist (for example from a parking page), delete them first. **Do not touch the `finance` record.**
3. Click **Add record**: Type **A**, Name `@`, IPv4 address = the IP from Vercel, **Proxy status: switch the orange cloud OFF so it is grey ("DNS only")**, TTL Auto. Save.
4. Click **Add record**: Type **CNAME**, Name `www`, Target = the value from Vercel, **Proxy status: DNS only (grey cloud)**, TTL Auto. Save.
5. If you see a **CAA** record in the list, add one more: Type CAA, Name `@`, Tag "Only allow specific hostnames", CA domain `letsencrypt.org`. (If there are no CAA records, skip this.)
6. Go back to Vercel's Domains page. Within a few minutes both domains turn green ("Valid Configuration") and Vercel issues the HTTPS certificate automatically. It can take up to an hour.
7. Check: open https://trackwithagent.com (the site loads with a padlock) and https://www.trackwithagent.com (it jumps to trackwithagent.com).

Why grey cloud: Vercel must see visitors directly to issue certificates and serve the site fast. An orange cloud (Cloudflare proxy) in front of Vercel causes certificate and caching problems.

**Optional: ask Cloudflare's AI assistant to do it.** In the Cloudflare dashboard, open the AI assistant and paste (fill in the two values from Vercel first):

> In the DNS records for trackwithagent.com: first delete any existing A, AAAA or CNAME records for the root (@) and for www, but do not change or delete the finance record or any MX or TXT records. Then add an A record for @ pointing to [IP FROM VERCEL] and a CNAME record for www pointing to [CNAME FROM VERCEL]. Set both to DNS only (grey cloud, not proxied) with TTL Auto. Show me the final list of records before and after the change.

Check its result against step 3 and 4 above before you leave the page.

### 12.5 Optional: free email addresses on your domain
To receive mail at hello@, support@, privacy@ and security@trackwithagent.com without paying: in Cloudflare open **Email > Email Routing**, click **Get started**, let it add its records (it adds MX and TXT records; this does not affect the website), then create a custom address for each name and forward it to your personal Gmail. Verify the Gmail address when Cloudflare emails you. Send a test email to each address.

### 12.6 After launch
- Run PageSpeed Insights on https://trackwithagent.com and https://trackwithagent.com/products/finance (mobile). Targets in section 7.1.
- Submit `https://trackwithagent.com/sitemap.xml` in Google Search Console (add the domain property using the TXT record it gives you, added in Cloudflare as DNS only).
- Every time you push to the `main` branch on GitHub, Vercel redeploys automatically.

---

## 13. Final report the agent gives the owner

When finished, reply to the owner with: the live URL (or the `.vercel.app` URL if DNS is pending), the list of placeholders still unfilled (from `check:launch`), the screenshots still using mock screens, Lighthouse scores per page, and anything in this brief you could not do and why.
