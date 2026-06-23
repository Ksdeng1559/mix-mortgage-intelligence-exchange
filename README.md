# MIX — Alternative Financing Solutions Centre

> Borrower-profile-driven landing surface for the **Mortgage Intelligence Exchange (MIX)** Alternative Financing Solutions platform — plus the **Opportunity Detection Engine**, the GTM intelligence layer that helps referral partners identify alt-financing deals *before* a bank decline. Built with Next.js 15 App Router, React 19, and the MIX design system.

This is the public-facing marketing surface for MIX's alt-financing funnel: 5 borrower profiles, 7 specialty verticals, 7 partner channels, 3 conversion CTAs, and a 4-signal Opportunity Detection Framework that turns partner conversations into scored, routed, revenue-estimated opportunities. All wired into a real IA that the rest of the MIX platform can build on top of.

---

## Live Deployment

The landing page is currently served from the local Next.js production build:

- **Centre:** http://localhost:8080/alternative-financing
- **Status:** Running (PID 44092, session `proc_659ebd1859f7`)

> Note: Port 3001 is occupied by stale handles on this host (wslrelay + Docker backend). The page is deployed on **port 8080** for that reason — change to any free port with `npx next start -p <port>`.

---

## Quick Start

```bash
cd "G:\AI - Coding Projects\mix-mortgage-intelligence-exchange"

# Install (first time only)
npm install

# Development (hot reload, port 3001)
npm run dev

# Production build
npm run build

# Production server (port 3001 by default)
npm run start
# or use a different port
npx next start -p 8080
```

---

## Site Architecture (23 routes)

The centre page at `/alternative-financing` is the marketing hub. It links into 22 drill-down pages — all real Next.js routes, all returning HTTP 200.

### Landing (1)

| Route | Description |
|---|---|
| `/alternative-financing` | Main hub — hero, profiles, verticals, MIX intelligence, partners, content, CTA |

### 5 Borrower Profiles

| Route | Profile |
|---|---|
| `/self-employed-financing` | Self-Employed / Business For Self — Alt-A, Stated Income, Bank Statement |
| `/credit-recovery-financing` | Credit Bruised — B-Lender, Credit Rebuilding |
| `/new-to-canada-financing` | New To Canada — N2C Programs, Alternative Financing |
| `/high-debt-ratio-financing` | High Debt Ratios — Debt Restructuring, Consolidation |
| `/high-net-worth-financing` | Non-Traditional / HNW — Asset-Based, Reverse, Private |

### 7 Specialty Verticals

| Route | Vertical |
|---|---|
| `/special-levy-financing` | Special Levy (condo / strata) |
| `/divorce-financing` | Divorce Financing |
| `/reverse-mortgage-solutions` | Reverse Mortgage (55+) |
| `/construction-financing` | Construction / Draw Schedules |
| `/bridge-financing` | Bridge Financing |
| `/investor-financing` | Investor / Portfolio |
| `/private-mortgages` | Private Mortgages (1st / 2nd position) |

### 7 Partner Channels (Professional Alliance Network)

| Route | Partner |
|---|---|
| `/accountants` | Accountants |
| `/lawyers` | Lawyers |
| `/financial-planners` | Financial Planners |
| `/insolvency-trustees` | Insolvency Trustees |
| `/realtors` | Realtors |
| `/developers` | Developers |
| `/immigration-consultants` | Immigration Consultants |

### 3 Conversion CTAs

| Route | Action |
|---|---|
| `/assessment` | Start Borrower Assessment (intake funnel) |
| `/partner-application` | Apply to Partner Network (PAN onboarding) |
| `/contact` | Talk to the MIX Team |

---

## MIX Opportunity Detection Engine

> **The GTM intelligence layer.** While the previous slides tell us *who* the Alt-A client is and *what* problems they're solving, this engine tells us **how to identify them before they become a mortgage lead** — and route them into the right financing workflow before a bank decline.

This is bigger than a landing page. The Opportunity Detection Engine encodes the underwriting mindset of a top Alt-A lender as a referral-partner training system: every conversation, discovery call, intake form, email, CRM note, or partner referral flows through four detection signals, gets scored across four dimensions, and lands as a routed, revenue-estimated opportunity.

### Purpose

Help the Professional Alliance Network — realtors, accountants, lawyers, financial planners, insolvency trustees, and mortgage brokers — identify alternative financing opportunities **before a bank decline occurs**.

### The 4 Detection Signals

#### Signal 1 — Low Declared Income

| | |
|---|---|
| **Typical Profile** | Business For Self · Incorporated Owner · Commission Salesperson · Contractor · Professional Corporation · Real Estate Investor |
| **Common Statements** | "I only show $40,000 income." · "My accountant writes everything off." · "The company earns good money." · "I take dividends." · "I leave money in the corporation." |
| **Borrower Profile** | Self-Employed |
| **Potential Solutions** | Alt-A · Stated Income · Bank Statement Program · Equity Lending |
| **Referral Sources** | Accountants · Bookkeepers · Tax Advisors · Business Coaches · Corporate Lawyers |

#### Signal 2 — High TDS / GDS

| | |
|---|---|
| **Common Statements** | "I make good money but don't qualify." · "I have too many debts." · "I own several properties." · "The bank says my ratios are too high." |
| **Borrower Profile** | High Debt Ratio |
| **Potential Solutions** | Debt Consolidation · Alt-A Lending · Equity Takeout · Refinance |
| **Referral Sources** | Financial Planners · Accountants · Realtors · Mortgage Brokers |

#### Signal 3 — Credit Challenges

| | |
|---|---|
| **Common Statements** | "I went through a divorce." · "My business failed." · "I had a consumer proposal." · "My credit dropped." |
| **Borrower Profile** | Credit Bruised |
| **Potential Solutions** | Alternative Lending · B-Lender · Credit Recovery Roadmap · Equity-Based Financing |
| **Referral Sources** | Insolvency Trustees · Family Lawyers · Credit Counsellors · Accountants |

#### Signal 4 — Down Payment & Gift Issues

| | |
|---|---|
| **Common Statements** | "My parents are helping." · "I have a gift." · "I can put down 20%." · "I have equity elsewhere." |
| **Borrower Profile** | Equity-Based Borrower |
| **Potential Solutions** | Alt-A Lending · Purchase Financing · Equity Takeout · Gift Programs |
| **Referral Sources** | Realtors · Parents · Financial Planners · Lawyers |

### MIX Opportunity Scoring Model

Every lead entering MIX is scored across four dimensions. Final score = weighted sum; revenue estimate is derived from score × problem-size table.

**Profile Score** — who is the borrower?
- Self-Employed · Credit Bruised · New To Canada · High Debt Ratio · High Net Worth

**Signal Score** — what did they say / what's the situation?
- Low Declared Income · High Debt Ratio · Credit Challenges · Gift Funds · Equity Available · Corporate Structure · Special Levy · Divorce · Consumer Proposal

**Problem Score** — what financing problem are they trying to solve?
- Debt Consolidation · Bridge Financing · Equity Takeout · Construction Financing · Reverse Mortgage · Investment Financing

**Referral Source Score** — who's bringing them in?
- Accountant · Lawyer · Financial Planner · Trustee · Realtor · Developer

### Example MIX Record

```yaml
lead: John Smith
profile: Self-Employed
signals:
  - Low Declared Income
  - Corporate Retained Earnings
problem: Purchase Financing
referral_source: Accountant
recommended_strategy: Alt-A Mortgage
opportunity_score: 92 / 100
estimated_revenue: $4,500
```

### Module Spec: Alternative Financing Opportunity Intelligence

| | |
|---|---|
| **Purpose** | Detect financing opportunities before the client is declined. |
| **Inputs** | Referral conversations · Discovery calls · Intake forms · Email analysis · CRM notes · Partner referrals |
| **Outputs** | Borrower classification · Financing problem classification · Lending strategy recommendation · Referral source attribution · Revenue opportunity score |

### Why This Matters

The Opportunity Detection Engine converts the rest of MIX from a marketing site into a **GTM intelligence system**. It:

1. **Trains partners to listen for the right signals** — the 4 signal tables become a partner training deck
2. **Standardizes opportunity intake** — every lead is scored the same way regardless of source
3. **Quantifies the pipeline** — score → revenue estimate means partners and brokers can prioritize
4. **Routes before decline** — by the time a borrower reaches a bank, MIX has already matched them to an alt-lending strategy
5. **Closes the loop on partner attribution** — referral source score tells MIX which partner channels are producing the most revenue

This is the underwriting brain of a top Alt-A lender, deployed as a referral-partner playbook, and it's the engine that makes the rest of the site (the 5 profiles, 7 verticals, 7 partner channels) actually convert.

---

## File Structure

```
app/
├── alternative-financing/
│   └── page.tsx              ← Main landing page (373 lines, server component)
├── self-employed-financing/  ← Borrower profile stub
│   └── page.tsx
├── credit-recovery-financing/page.tsx
├── new-to-canada-financing/page.tsx
├── high-debt-ratio-financing/page.tsx
├── high-net-worth-financing/page.tsx
├── special-levy-financing/page.tsx
├── divorce-financing/page.tsx
├── reverse-mortgage-solutions/page.tsx
├── construction-financing/page.tsx
├── bridge-financing/page.tsx
├── investor-financing/page.tsx
├── private-mortgages/page.tsx
├── accountants/page.tsx
├── lawyers/page.tsx
├── financial-planners/page.tsx
├── insolvency-trustees/page.tsx
├── realtors/page.tsx
├── developers/page.tsx
├── immigration-consultants/page.tsx
├── assessment/page.tsx
├── partner-application/page.tsx
├── contact/page.tsx
├── layout.tsx                ← Root layout (HTML shell, footer)
├── globals.css               ← Design tokens (CSS custom properties)
├── page.tsx                  ← Root redirect → /dashboard
└── dashboard/                ← Existing MIX operations dashboard (unchanged)

components/
└── LandingLayout.tsx         ← Shared <LandingNav />, <LandingFooter />, <PageStub />

lib/                          ← (Phase 2) Opportunity Detection Engine code
├── signals/                  ← The 4 detection signal tables (data)
├── scoring/                  ← Profile / Signal / Problem / Referral scoring logic
└── routing/                  ← Signal → strategy → workflow routing rules

design-system/
├── DESIGN.md                 ← Authoritative design token spec
└── brief-preview.html        ← Visual swatches / type specimens
```

---

## Design System

The page uses the MIX design system defined in [`design-system/DESIGN.md`](./design-system/DESIGN.md):

- **Theme:** Monochrome dark (professional minimal)
- **Background:** `#070A13` (deep) / `#0D1117` (surface) / `#131820` (card)
- **Accent:** `#4338CA` (indigo) — primary buttons, active states, links
- **Text:** `#EDEDEF` (primary) / `#8A8F98` (secondary) / `#5C6168` (muted)
- **Status:** Green `#34D399` / Amber `#FBBF24` / Red `#F87171` / Purple `#A78BFA`
- **Typography:** Inter (Google Fonts), weight 300–800, `-0.02em` letter-spacing on headings
- **Layout:** Bento grid, 4-column, 180px auto-rows, 14px gap
- **Max content width:** 1260px, page padding 28px 32px
- **Breakpoints:** 1100px (3-col), 960px (2-col, hide nav), 640px (1-col, mobile)

All colors, spacing, and typography reference CSS custom properties in `app/globals.css`. No hardcoded hex values in component code.

---

## Components

### Shared (`components/LandingLayout.tsx`)

- **`<LandingNav />`** — Sticky top nav with logo, 5 anchor links, and 2 CTAs (Refer a Client / Get Qualified)
- **`<LandingFooter />`** — 4-column footer with brand, 3 link sections (Profiles / Verticals / Partners), and legal line
- **`<PageStub />`** — Stub layout for all 22 drill-down pages. Accepts `eyebrow`, `title`, `summary` props. Shows "Coming Soon — Phase 2" status with amber pulse dot.

### Landing page structure (`app/alternative-financing/page.tsx`)

7 sections, top to bottom:

1. **Hero** — H1 with indigo gradient, lede, 3 CTAs, 4 KPI stats, live opportunity feed card (5 mock borrowers)
2. **5 Borrower Profiles** — Single-row card grid with numbered chips, descriptions, and financing solutions
3. **7 Specialty Verticals** — 3-column grid with icon, description, audience, and referral sources
4. **MIX Intelligence** — 5 AI agents (BC, FR, RR, CR, OS) on the left, live intake classifier mock on the right, 5 KPI metric cards below
5. **Professional Alliance Network** — 7 partner cards in a single row
6. **Content Library** — Featured 2-row guide + 4 supporting cards (case study, video, partner brief, checklist)
7. **CTA Strip** — "Two Doors, One Engine" purple gradient panel with 3 action buttons

All data is hardcoded in `page.tsx` as const arrays. No CMS, no database calls.

---

## Build & Deployment

### Build

```bash
npm run build
```

Output (from latest build):

```
Route (app)                                 Size  First Load JS
┌ ○ /                                      176 B         101 kB
├ ○ /accountants                           239 B         105 kB
├ ○ /alternative-financing                 175 B         105 kB
├ ○ /assessment                            239 B         105 kB
├ ○ /bridge-financing                      239 B         105 kB
├ ○ /construction-financing                239 B         105 kB
├ ○ /contact                               239 B         105 kB
├ ○ /credit-recovery-financing             239 B         105 kB
├ ○ /developers                            239 B         105 kB
├ ○ /divorce-financing                     239 B         105 kB
├ ○ /financial-planners                    239 B         105 kB
├ ○ /high-debt-ratio-financing             239 B         105 kB
├ ○ /high-net-worth-financing              239 B         105 kB
├ ○ /immigration-consultants               239 B         105 kB
├ ○ /insolvency-trustees                   239 B         105 kB
├ ○ /investor-financing                    239 B         105 kB
├ ○ /lawyers                               239 B         105 kB
├ ○ /new-to-canada-financing               239 B         105 kB
├ ○ /partner-application                   239 B         105 kB
├ ○ /private-mortgages                     239 B         105 kB
├ ○ /realtors                              239 B         105 kB
├ ○ /reverse-mortgage-solutions            239 B         105 kB
├ ○ /self-employed-financing               239 B         105 kB
└ ○ /special-levy-financing                239 B         105 kB

○  (Static)   prerendered as static content
```

All 23 landing routes are static (○) — no server runtime required, instant first paint.

### Deploy

```bash
npx next start -p 8080
```

Visit `http://localhost:8080/alternative-financing`.

### Smoke test

```bash
for path in /alternative-financing /self-employed-financing /accountants /assessment; do
  curl -s -o /dev/null -w "%{http_code}  $path\n" "http://localhost:8080$path"
done
```

Expected: all return `200`.

---

## Tech Stack

- **Framework:** Next.js 15.3.3 (App Router, RSC, standalone output)
- **UI:** React 19, TypeScript 5
- **Styling:** CSS Modules + CSS custom properties (no Tailwind, no styled-components)
- **Fonts:** Inter (Google Fonts, self-hosted via `next/font`-compatible CDN link)
- **Backend:** None on this surface — all data is static. The rest of MIX uses Supabase + Resend + Google APIs (see root `package.json`).
- **Deployment target:** Local `next start` for now. Production target: standalone Docker container (see root `Dockerfile` and `docker-compose.yml`).

---

## Roadmap

### Phase 1 (Current — MVP)
- [x] All 23 routes return HTTP 200
- [x] Centre page is fully built (hero, profiles, verticals, AI, partners, content, CTA)
- [x] Shared nav + footer wired to all 22 drill-down pages
- [x] Design system tokens applied (no hardcoded hex)
- [x] Build compiles with zero errors
- [x] **Opportunity Detection Engine spec** — 4 signals, 4-dimension scoring model, example record, module inputs/outputs (documented in README)
- [ ] Fill in 22 stub pages with real content

### Phase 2 (Partner Portal + Opportunity Engine v1)
- [ ] **Opportunity Detection intake form** — partner submission → 4-signal → 4-dimension score → revenue estimate (the `Opportunity Scoring Agent` from the PRD)
- [ ] **Signal Library UI** — internal tool to browse the 4 signal tables, common statements, and routing rules
- [ ] Borrower Assessment multi-step form (`/assessment`) — feeds into the same scoring engine
- [ ] Partner Application form (`/partner-application`) — onboarding for the PAN
- [ ] Contact form with Resend integration (`/contact`)
- [ ] Real-time partner referral dashboard — pipeline value, conversion, attribution

### Phase 3 (MIX Intelligence Layer)
- [ ] Borrower Classification Agent API (NLP on partner notes / emails)
- [ ] Financing Recommendation Agent API (signal → strategy mapping)
- [ ] Referral Routing Agent API (auto-routing to broker or specialist)
- [ ] Content Recommendation Agent API (signal-tagged content surfacing)
- [ ] Opportunity Scoring Agent v2 (predictive — trained on closed-deal outcomes)
- [ ] Automated referral campaign orchestration (signal-triggered outreach)

---

## Contributing

When adding a new vertical or partner:

1. Create `app/<route>/page.tsx` using the `<PageStub />` pattern
2. Add the link to `FOOTER_VERTICALS` / `FOOTER_PARTNERS` in `components/LandingLayout.tsx`
3. If it needs hero presence on the centre page, add a card to the relevant const array in `app/alternative-financing/page.tsx`
4. Run `npm run build` to confirm zero errors
5. Run the smoke test loop to confirm HTTP 200

When extending the **Opportunity Detection Engine** (Phase 2+):

1. New signal? Add a row to the matching signal table in `lib/signals/` and update the README's signal section
2. New borrower profile? Add a key to `lib/scoring/profileScorer.ts` and a card to the centre page
3. New referral source? Add a key to `lib/scoring/referralScorer.ts` and a PAN card
4. New routing rule? Add it to `lib/routing/strategies.ts` and document the signal→strategy mapping
5. Every change to scoring weights must update the example MIX record so the math is reproducible

---

## License

© 2026 Mortgage Intelligence Exchange (MIX). BC, Canada.

Internal project — not for public distribution.
