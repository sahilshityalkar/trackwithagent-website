# trackwithagent.com

The company website for TrackWithAgent: AI agents that keep track for you.
It presents TrackWithAgent Finance (live at https://finance.trackwithagent.com) and TrackWithAgent Replay (coming soon), with About, Security, Contact, a changelog and full legal pages.

- **Code:** this repository (GitHub `sahilshityalkar/trackwithagent-website`)
- **Hosting:** a Vercel project of its own, separate from the Finance app
- **Domain:** trackwithagent.com, with www redirecting to it

Built with Next.js 16 (App Router, every page static), Tailwind CSS v4, MDX for legal pages, three.js for the 3D hero, and Motion for animation.

## 1. Changing text

| What you want to change | File |
|---|---|
| Company name, emails, address, dates, AI providers, regions | `site.config.ts` |
| Home page hero, steps, highlights, trust points | `content/home.ts` |
| Home page FAQ | `content/faq.ts` |
| Fictional numbers in the product mock screens | `content/demo.ts` |
| Legal pages | `app/legal/<page>/page.mdx` and `app/delete-account/page.mdx` |
| Changelog | `app/changelog/page.mdx` |

Edit, save, then push to GitHub. Vercel rebuilds and publishes in about a minute.

`site.config.ts` notes:

- `address` is `"India"` for now. When you have a registered office, put the full postal address there (with commas). The legal pages then say "of <address>" instead of "based in India".
- `legalName` is `"TrackWithAgent"`. If you register a company (for example "TrackWithAgent Technologies Private Limited"), put that here and the legal pages will name it.
- `courtsCity`: set your city (for example `"Bengaluru"`) to name it in the Terms; empty means "the courts of India".
- `ai.providersShort` and `ai.processors`: list **only** the AI providers switched on in the Finance app's production settings. DeepSeek processes data in China; remove its row if it is not enabled.
- `founder`, `city`, `foundedYear`, `social`: optional. Empty values are hidden. Never link a social profile that does not exist.

## 2. Adding real app screenshots

Until these files exist, the site shows coded mock screens, so nothing looks unfinished. To capture: open the live app in Chrome with an account that has realistic but **fake** data (never your real data). Press F12, toggle the device toolbar (Ctrl+Shift+M), choose "Responsive", set the size below, set the device pixel ratio, then press Ctrl+Shift+P and run "Capture screenshot". Save PNGs with these exact names into `public/screenshots/`.

| ID | File name | Page in Finance | Show | Size | DPR | Theme |
|---|---|---|---|---|---|---|
| S1 | `finance-dashboard-mobile-dark.png` | `/` | Dashboard, top | 390 × 844 | 3 | Dark |
| S2 | `finance-dashboard-mobile-light.png` | `/` | Same as S1 | 390 × 844 | 3 | Light |
| S3 | `finance-dashboard-desktop-dark.png` | `/` | Dashboard with sidebar | 1440 × 900 | 2 | Dark |
| S4 | `finance-quick-add-mobile-dark.png` | `/` | Tap +, type 50, pick Food | 390 × 844 | 3 | Dark |
| S5 | `finance-assistant-confirm-mobile-dark.png` | `/chat` | Send "₹50 chai today", wait for the confirm card | 390 × 844 | 3 | Dark |
| S6 | `finance-friends-mobile-dark.png` | `/friends` | Friends with balances | 390 × 844 | 3 | Dark |
| S7 | `finance-settle-up-desktop-dark.png` | `/groups/<id>` | Settle up with a friend who has a UPI ID (QR shows) | 1440 × 900 | 2 | Dark |
| S8 | `finance-budgets-mobile-dark.png` | `/budgets` | Green and amber bars | 390 × 844 | 3 | Dark |
| S9 | `finance-goals-mobile-light.png` | `/goals` | A goal partly filled | 390 × 844 | 3 | Light |
| S10 | `finance-reports-desktop-light.png` | `/reports` | Month view with comparison | 1440 × 900 | 2 | Light |
| S11 | `finance-paste-sms-mobile-dark.png` | `/` | + then paste-SMS with a sample SMS | 390 × 844 | 3 | Dark |
| S12 | `finance-transactions-mobile-light.png` | `/transactions` | Day-grouped list | 390 × 844 | 3 | Light |

Check there are no real names, emails, phone numbers or UPI IDs before saving.

## 3. Running it on your computer

```
npm install
npm run dev
```

Open http://localhost:3000.

## 4. Checks before publishing

```
npm run check          # types, lint, copy rules, build, placeholder check
npm run build && npm start -- -p 4321
npm run check:links    # in a second terminal, while the server runs
```

- `npm run lint:copy` fails on em or en dashes, a spaced hyphen used as a dash, and banned words like "seamless" or "AI-powered".
- `npm run check:launch` fails if any `[PLACEHOLDER]` text reached a page.
- `npm run make:poster` re-renders the hero poster images after changing the 3D scene (needs the server on port 4321).
- `npm run make:icons` rebuilds the favicon set from `app/icon.svg`.

## 5. Rules

- No em dashes (—) or en dashes (–) anywhere in site text.
- The site sets **no cookies**, so it has no cookie banner. If anyone adds a non-essential cookie, tracker or third-party script, a consent banner becomes mandatory and the Cookie Policy must change.
- Only Vercel Web Analytics (cookieless) is allowed. No other analytics, pixels or chat widgets.
- Never add user counts, testimonials, ratings or partner logos unless they are real.
- The legal pages are careful drafts based on what the app actually does, aligned with India's DPDP Act 2023 and the IT Act 2000. Have a lawyer review them, and again before adding paid plans or launching Replay.

## 6. Deploying

### 6.1 Vercel project

1. Sign in at https://vercel.com, click **Add New… > Project**, import `trackwithagent-website` from GitHub. Keep the default build settings; no environment variables are needed. Click **Deploy**.
2. In the project, open **Analytics** and click **Enable** (Web Analytics, cookieless).
3. Every push to `main` redeploys automatically.

### 6.2 Domain

1. In the Vercel project: **Settings > Domains**, add `trackwithagent.com` and choose the option that also adds `www.trackwithagent.com` **redirecting to** `trackwithagent.com`.
2. Vercel shows the DNS records it wants (usually an **A** record for `@` and a **CNAME** for `www`). Use exactly the values it shows.
3. In Cloudflare: **trackwithagent.com > DNS > Records**. Delete any old A, AAAA or CNAME records for `@` and `www`. **Do not touch the `finance` record.** Add the A record (`@`) and the CNAME (`www`) from Vercel, both with the cloud **grey (DNS only)**, TTL Auto.
4. Back in Vercel the domains turn green within minutes (up to an hour) and HTTPS is issued automatically. Check that https://trackwithagent.com loads and https://www.trackwithagent.com redirects to it.

Grey cloud matters: Cloudflare's proxy in front of Vercel breaks certificates and caching.

### 6.3 Email addresses

The site lists hello@, support@, privacy@, security@ and grievance@trackwithagent.com. To receive them for free: Cloudflare **Email > Email Routing > Get started**, let it add its records, create each address and forward it to your Gmail, verify, then send a test email to each one.

### 6.4 After launch

- Run PageSpeed Insights on https://trackwithagent.com and https://trackwithagent.com/products/finance.
- Add the domain in Google Search Console and submit https://trackwithagent.com/sitemap.xml.
- Check the share cards with an Open Graph preview tool and the structured data with Google's Rich Results Test.
