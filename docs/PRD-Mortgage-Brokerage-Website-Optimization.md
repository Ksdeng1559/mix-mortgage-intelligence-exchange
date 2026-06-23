# PRD: Mortgage Brokerage Website Optimization
**Version:** 1.0
**Date:** 2026-06-23
**Type:** Pillar Content — Applicable to any boutique mortgage brokerage website
**Status:** Draft

---

## 1. Overview

This document defines product requirements for a full-stack website optimization initiative targeting boutique mortgage brokerage firms. It covers four domains: **technical SEO**, **conversion rate optimization (CRO)**, **trust and content architecture**, and **accessibility compliance**.

Requirements are derived from a composite audit methodology combining Lighthouse analysis, structured content scraping, competitive benchmarking, and WCAG 2.1 evaluation.

This PRD is technology-agnostic. It applies equally to WordPress, Webflow, custom Next.js, or any CMS-backed mortgage brokerage site.

---

## 2. Problem Statement

Boutique mortgage brokerages occupy a defensible niche — personalized service, access to B-lenders and private lenders, construction and commercial expertise — but consistently lose organic search traffic and lead conversion to:

1. **Aggregators** (RateHub, WOWA, Ratehub) that dominate informational SERPs
2. **High-volume brokers** with thousands of Google reviews
3. **Bank landing pages** with large domain authority

The root cause is not positioning — it is execution. Most boutique brokerage sites share the same fixable failure patterns:

- Missing or malformed semantic HTML structure (`<h1>`, `<main>`, landmarks)
- Zero JSON-LD structured data (no rich results)
- No social proof surface beyond homepage stat counters
- Anonymous team pages with no broker faces or credentials
- No rate/product content to capture high-intent search queries
- Thin meta keyword strategy with no geo-targeting
- Image assets with missing or incorrect alt attributes
- Console errors degrading Core Web Vitals scores

These are not strategic problems. They are implementation debts that compound into measurable traffic and revenue loss.

---

## 3. Goals

### Primary Goals

| Goal | Metric | Target |
|---|---|---|
| Improve organic visibility | Google Search Console impressions | +40% in 90 days |
| Increase lead conversion rate | Form submissions / unique visitors | +25% in 60 days |
| Achieve rich result eligibility | Google rich result test pass | 100% of service pages |
| Fix Core Web Vitals | CLS, LCP, FID | All "Good" thresholds |
| Accessibility compliance | Lighthouse accessibility score | ≥ 95 desktop + mobile |

### Secondary Goals

- Establish content moat against aggregators via service-specific landing pages
- Surface broker identity to support boutique positioning
- Generate structured review intake pipeline
- Enable AI agent crawlability (Lighthouse agentic browsing score ≥ 90)

---

## 4. User Personas

### 4.1 First-Time Buyer — "Anxious Qualifier"
- **Need:** Understand if they qualify; reassurance from a real person
- **Blocker:** Generic copy, no faces, no proof of successful similar clients
- **Key page:** Homepage → Residential → Alternative Lending

### 4.2 Investor / Portfolio Builder — "Efficiency Seeker"
- **Need:** Fast signal on commercial terms, turnaround time, lender access
- **Blocker:** No rate indicators, no process timeline, no case studies
- **Key page:** Commercial → Construction Financing

### 4.3 Declined Applicant — "Second Chance Borrower"
- **Need:** Someone who works with B-lenders and private lenders; no judgment
- **Blocker:** Site doesn't explicitly speak to declined/non-qualifying borrowers
- **Key page:** Alternative Mortgage Lending → Private Mortgages

### 4.4 Renewal Shopper — "Rate Comparator"
- **Need:** Proof this broker can beat their current lender; rate context
- **Blocker:** No rate ranges, no comparison content, no differentiation statement
- **Key page:** Renewals & Transfers

---

## 5. Technical SEO Requirements

### 5.1 Semantic HTML Structure

**Priority: P0 — Blocks all downstream SEO work**

| Requirement | Specification |
|---|---|
| Every page must have exactly one `<h1>` | H1 = primary keyword phrase for that page |
| H1 must appear above the fold | Not hidden in hero image text or CSS pseudo-elements |
| Heading hierarchy must be sequential | H1 → H2 → H3, no skipped levels |
| `<main>` landmark required on every page | Screen readers and crawlers depend on this |
| Navigation in `<nav>` with `aria-label` | Distinguish primary nav from footer nav |
| Footer in `<footer>` | Required for landmark completeness |

**Acceptance Criteria:**
- `document.querySelectorAll('h1').length === 1` on every page
- Lighthouse landmark audit passes (score 1.0)
- No heading level skips detected by axe-core

### 5.2 Meta Tag Requirements

| Tag | Requirement | Example |
|---|---|---|
| `<title>` | Primary keyword + Brand, ≤ 60 chars | "Mortgage Broker Toronto — [Brand]" |
| `meta description` | 140–160 chars, includes geo + service + CTA | "Toronto mortgage broker specializing in alternative and private lending. Get pre-approved in 48 hrs." |
| `meta keywords` | Include: city, service type, lender type | "mortgage broker Toronto, B-lender mortgage, private mortgage Ontario" |
| `canonical` | Self-referencing on all pages | Prevent duplicate content from URL params |
| `og:title`, `og:description`, `og:image` | Required for all shareable pages | Minimum 1200×630px OG image |
| `hreflang` | Only if multi-language support exists | n/a for English-only sites |

### 5.3 JSON-LD Structured Data

**Priority: P0 — Required for rich result eligibility**

#### 5.3.1 Organization Schema (Homepage)

```json
{
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "name": "[Brand Name]",
  "url": "https://[domain]",
  "logo": "https://[domain]/assets/logo.svg",
  "description": "[Meta description text]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Street]",
    "addressLocality": "[City]",
    "addressRegion": "[Province]",
    "postalCode": "[Postal Code]",
    "addressCountry": "CA"
  },
  "telephone": "[Phone]",
  "email": "[Email]",
  "openingHoursSpecification": [...],
  "sameAs": ["[LinkedIn URL]", "[Google Business URL]"]
}
```

#### 5.3.2 LocalBusiness Schema (Homepage + Contact page)

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "[Brand]",
  "priceRange": "$$",
  "areaServed": {
    "@type": "City",
    "name": "[City]"
  },
  "hasMap": "https://maps.google.com/?q=[encoded address]"
}
```

#### 5.3.3 FAQPage Schema (All service pages with FAQ sections)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Question text exactly as displayed]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Answer text exactly as displayed]"
      }
    }
  ]
}
```

#### 5.3.4 BreadcrumbList Schema (All interior pages)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://[domain]"},
    {"@type": "ListItem", "position": 2, "name": "[Section]", "item": "https://[domain]/[section]"},
    {"@type": "ListItem", "position": 3, "name": "[Page]", "item": "https://[domain]/[section]/[page]"}
  ]
}
```

#### 5.3.5 Person Schema (Broker profile pages)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "[Broker Full Name]",
  "jobTitle": "Mortgage Broker",
  "worksFor": {"@type": "Organization", "name": "[Brand]"},
  "telephone": "[Direct line]",
  "email": "[Email]",
  "image": "https://[domain]/team/[broker].jpg"
}
```

**Validation requirement:** All schema must pass [Google Rich Results Test](https://search.google.com/test/rich-results) with zero errors before deployment.

### 5.4 Image Optimization

| Requirement | Specification |
|---|---|
| All `<img>` must have non-empty `alt` text | Describe content; never leave blank |
| Logo alt text must match brand name exactly | Common error: alt from previous template/designer |
| Decorative images use `alt=""` and `role="presentation"` | Never leave blank unintentionally |
| File naming uses full words, correct spelling | `residential-mortgage.webp` not `residential-mortage.png` |
| All images converted to WebP | 30–50% smaller than PNG/JPEG at equivalent quality |
| Lazy loading on all below-fold images | `loading="lazy"` attribute |
| Hero image has `loading="eager"` and explicit `width`/`height` | Prevent CLS from image reflow |
| Maximum hero image file size: 150KB | Compress without visible quality loss |

**Acceptance Criteria:**
- Zero `<img>` tags with missing or empty `alt` on non-decorative images
- Logo alt text verified against brand name programmatically
- Lighthouse image audit passes

### 5.5 Core Web Vitals Targets

| Metric | Current (estimated) | Target | Method |
|---|---|---|---|
| LCP (Largest Contentful Paint) | Unknown | < 2.5s | Compress hero image, preload font |
| CLS (Cumulative Layout Shift) | 0.22 (poor) | < 0.1 | Add explicit width/height on all images; eliminate font flash |
| FID / INP (Interaction to Next Paint) | Unknown | < 200ms | Defer non-critical JS; remove blocking scripts |

**CLS Fix Protocol:**
1. Add `width` and `height` attributes to every `<img>` tag
2. Preload the hero image via `<link rel="preload" as="image">`
3. Add `font-display: swap` to all `@font-face` declarations
4. Identify and remove or defer layout-shifting third-party scripts
5. Verify fix with Chrome DevTools Performance tab (CLS column)

### 5.6 Console Error Remediation

**Priority: P0 — Console errors directly degrade CWV and user experience**

- Audit `console.error` and `console.warn` output on page load
- Categorize: missing resource (404), JS runtime error, CORS violation, deprecation warning
- Resolve all errors before go-live; document any intentionally suppressed warnings with reason

---

## 6. Accessibility Requirements

### 6.1 WCAG 2.1 AA Compliance

All pages must achieve WCAG 2.1 Level AA compliance. The following are the most common failures on financial services sites:

| Criterion | Requirement | How to Fix |
|---|---|---|
| 1.1.1 Non-text Content | All images have descriptive alt text | See Section 5.4 |
| 1.3.1 Info and Relationships | Semantic HTML structure (`<main>`, `<nav>`, `<header>`) | See Section 5.1 |
| 1.4.3 Contrast Minimum | Text contrast ratio ≥ 4.5:1 (normal), 3:1 (large) | Audit with axe DevTools |
| 2.4.4 Link Purpose | All links have descriptive text | Replace "Learn More", "Click Here" with descriptive anchor text |
| 2.4.6 Headings and Labels | Headings describe page structure | See Section 5.1 |
| 2.5.5 Target Size | Interactive elements ≥ 44×44px | Fix small nav links and mobile CTAs |
| 4.1.2 Name, Role, Value | All form inputs have associated `<label>` | Audit all forms; add `for`/`id` pairs |

### 6.2 Keyboard Navigation

- All interactive elements reachable via `Tab` key
- Visible focus indicator on all focusable elements (`:focus-visible` CSS)
- No keyboard traps (modal dialogs must be escapable)
- Skip navigation link as first focusable element on every page

### 6.3 Screen Reader Compatibility

- Test with NVDA (Windows) + Chrome and VoiceOver (Mac/iOS) + Safari
- All form error messages announced via `aria-live="polite"`
- Dynamic content updates announced via appropriate ARIA live regions
- Accordion/FAQ elements use `<button>` with `aria-expanded` state

### 6.4 Mobile Touch Targets

- Minimum touch target size: 44×44px (Apple HIG) / 48×48px (Material)
- Minimum spacing between adjacent targets: 8px
- Audit with Lighthouse `target-size` check

---

## 7. Conversion Rate Optimization Requirements

### 7.1 CTA Hierarchy

**Primary CTA** (one per page, above fold):
- Label: "Book a Free Consultation" or "Get Pre-Approved"
- Style: High-contrast filled button
- Placement: Hero section, sticky mobile header

**Secondary CTA** (repeated at logical scroll points):
- Label: "Enquire About [Service Name]" (contextual)
- Style: Outlined button or text link
- Placement: End of each service section

**Tertiary CTA** (footer, low-intent):
- Phone number as `tel:` link
- Email as `mailto:` link

### 7.2 Sticky / Persistent CTAs

**Mobile:**
- Sticky bottom bar with: phone icon + "Call Now" | calendar icon + "Book a Call"
- Appears after 30% scroll depth
- Dismiss behavior: none (persistent)

**Desktop:**
- Sticky header must retain primary CTA button at all scroll depths
- Optional: floating "Book a Call" button (bottom-right, 60px from edge)

### 7.3 Contact Form Requirements

| Field | Required | Notes |
|---|---|---|
| First name | Yes | Split first/last (not full name) |
| Last name | Yes | |
| Email | Yes | Validate format client-side |
| Phone | Yes | Auto-format as user types |
| Service interest | Yes | Multi-select checkboxes (up to 3) |
| Message | No | Optional; lower friction |
| Consent checkbox | Yes | "I agree to be contacted by [Brand]" |

**Form UX requirements:**
- Inline validation (not on-submit only)
- Error messages at field level, not page top
- Success state: confirmation message with expected response time ("We'll be in touch within 1 business day")
- Form accessible at `/contact` and embedded on all service pages
- No CAPTCHA on primary lead forms (use honeypot instead)

### 7.4 Social Proof Requirements

**Testimonials:**
- Minimum 6 client testimonials displayed on homepage
- Each testimonial must include: full name (or first name + last initial), city, service used, photo (preferred)
- Carousel or grid layout; not hidden behind "click to expand"
- Schema: `Review` or `AggregateRating` markup if 3+ reviews present

**Review Integration:**
- Embed live Google Business Profile rating widget in footer or homepage
- Display star count + review count (e.g., "4.9 ★ from 127 Google reviews")
- Link to Google review page

**Stats / Social Proof Numbers:**
- Stat callouts (properties financed, clients served, years operating) kept current
- Displayed with context: "As of [Year]" or "Since [Year]"
- Do not display awards without naming them (e.g., "Top 10 Mortgage Brokers — [Organization] 2024")

### 7.5 Team / Broker Profile Requirements

Each licensed broker must have a dedicated profile page or section containing:

| Element | Required |
|---|---|
| Professional headshot (min 400×400px) | Yes |
| Full name | Yes |
| Broker license number | Yes |
| Years of experience | Yes |
| Specializations (e.g., construction, commercial) | Yes |
| Languages spoken | Yes |
| Direct phone / email | Yes |
| Short bio (150–250 words) | Yes |
| Link to book a call with this specific broker | Yes |

**Why:** Boutique positioning is meaningless without faces. Visitors convert on trust in specific people, not brands.

### 7.6 Pricing / Rate Transparency

Mortgage brokers cannot publish guaranteed rates, but must provide orientation:

| Content | Acceptable | Not acceptable |
|---|---|---|
| Rate range context | "Prime + 1.5% to Prime + 3.5% for B-lender" | Specific guaranteed rate for any product |
| Fee disclosure | "Broker fees apply for private mortgages; none for bank-placed deals" | Hidden fees revealed at closing |
| Process timeline | "48-hour pre-approval, 5–10 business days to close" | No timeline information |
| Qualification guidance | "Clients with 600+ credit score may qualify for..." | |

Add a **Rate & Process FAQ** section to the homepage and each service page. Address the questions visitors ask before they call:
- "Do you charge fees?"
- "How fast can I get approved?"
- "I was declined by my bank — can you help?"
- "What's the minimum down payment for [product type]?"

---

## 8. Content Architecture Requirements

### 8.1 Page-Level Keyword Strategy

Each service page targets one primary keyword phrase:

| Page | Primary Keyword | Supporting Keywords |
|---|---|---|
| Homepage | `mortgage broker [city]` | boutique mortgage broker, private lender access |
| Residential | `residential mortgage [city]` | first-time buyer mortgage, home purchase loan |
| Alternative Lending | `alternative mortgage lender [city]` | B-lender mortgage, non-qualifying mortgage |
| Second Mortgages | `second mortgage [city]` | home equity second mortgage, debt consolidation mortgage |
| Renewals & Transfers | `mortgage renewal [city]` | switch mortgage lender, better mortgage rate renewal |
| Construction Financing | `construction mortgage [city]` | new build mortgage, draw mortgage |
| Home Equity Loans | `home equity loan [city]` | HELOC alternative, equity takeout mortgage |
| Private Mortgages | `private mortgage [city]` | private lender mortgage, fast mortgage approval |
| Commercial Financing | `commercial mortgage [city]` | investment property mortgage, commercial real estate loan |
| CMHC | `CMHC insured mortgage [city]` | MLI Select, affordable housing mortgage |

### 8.2 Content Minimum Word Count

| Page Type | Minimum Words |
|---|---|
| Homepage | 800 |
| Service page (primary) | 1,200 |
| Service page (secondary) | 800 |
| Blog / resource article | 1,500 |
| FAQ page | 600 |
| Team bio | 250 |

### 8.3 Blog / Resource Content Cadence

Publish minimum **2 articles per month** targeting long-tail keywords aggregators don't rank for:

**High-priority article topics:**
- "What is a B-lender mortgage and who qualifies?"
- "How to get a mortgage after being declined by a bank"
- "Private mortgage vs. B-lender: which is right for you?"
- "Construction mortgage draw schedule explained"
- "How many times can you refinance your mortgage in Canada?"
- "CMHC MLI Select: eligibility and benefits"
- "What credit score do you need for a mortgage in [City]?"

Each article must include:
- Target keyword in title, first H2, and meta description
- Internal link to the relevant service page
- CTA embedded mid-article and at end
- FAQ section (3–5 questions) with FAQPage schema

### 8.4 Internal Linking Architecture

```
Homepage
├── /residential
│   ├── /residential/alternative-mortgage-lending  ←→  /residential/private-mortgages
│   ├── /residential/second-mortgages              ←→  /residential/home-equity-loans
│   ├── /residential/renewals-transfers
│   └── /residential/construction-financing        ←→  /constructions/construction-financing
├── /commercial
│   ├── /commercial/commercial-financing
│   └── /commercial/private-mortgages              ←→  /residential/private-mortgages
├── /constructions
│   ├── /constructions/construction-financing
│   └── /constructions/private-mortgages
├── /cmhc
├── /resources (blog index)
│   └── /resources/[article-slug]
├── /about-us
│   └── /team/[broker-slug]
└── /contact
```

**Rules:**
- Every service page links to 2+ related service pages (cross-sell)
- Every blog article links to 1+ service pages (convert)
- Homepage links to all top-level service categories
- Orphan pages (no inbound internal links) are not permitted

---

## 9. Technical Infrastructure Requirements

### 9.1 Site Speed

| Requirement | Specification |
|---|---|
| Time to First Byte (TTFB) | < 600ms |
| First Contentful Paint (FCP) | < 1.8s |
| LCP | < 2.5s |
| Total Blocking Time (TBT) | < 200ms |
| CDN | Required for all static assets |
| Image hosting | Serve from CDN, not origin |
| Font loading | `font-display: swap`; preload primary font |
| Third-party scripts | Defer all non-critical (chat, analytics, social pixels) |

### 9.2 Mobile-First Requirements

- Viewport meta tag: `<meta name="viewport" content="width=device-width, initial-scale=1">`
- All layouts tested at: 375px, 390px, 414px, 768px, 1024px, 1440px
- No horizontal scroll at any breakpoint
- Phone number displayed as tappable `tel:` link on mobile
- Forms do not trigger zoom on iOS (`font-size ≥ 16px` on all inputs)

### 9.3 Security & Trust Signals

| Requirement | Implementation |
|---|---|
| HTTPS enforced | Redirect all HTTP → HTTPS; HSTS header |
| SSL certificate valid | Auto-renewal configured; alert on expiry |
| Privacy policy linked in footer | Link in every form's consent text |
| Cookie consent banner | PIPEDA-compliant (Canadian sites) |
| Regulatory license displayed | License number in footer on every page |
| Network membership logo | Display brokerage network badge (e.g., Mortgage Architects) |

### 9.4 robots.txt and sitemap.xml

**robots.txt minimum:**
```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /login/
Disallow: /thank-you/

Sitemap: https://[domain]/sitemap.xml
```

**sitemap.xml requirements:**
- Auto-generated (not manual)
- All public pages included
- `<lastmod>` dates accurate
- `<priority>` and `<changefreq>` set per page type
- Submitted to Google Search Console and Bing Webmaster Tools

### 9.5 Analytics & Tracking

| Tool | Requirement |
|---|---|
| Google Analytics 4 | Installed on all pages; form submission events tracked |
| Google Search Console | Property verified; sitemap submitted |
| Google Tag Manager | All tracking via GTM (not hardcoded) |
| Conversion events | Form submit, phone click, email click, CTA click |
| Goal funnel | Homepage → Service page → Contact form → Thank you |

---

## 10. Acceptance Criteria

### 10.1 Technical SEO Checklist

- [ ] Every page has exactly one `<h1>`
- [ ] `<main>` landmark present on every page
- [ ] All `<img>` have descriptive `alt` attributes
- [ ] Logo alt text matches brand name
- [ ] Zero `<a>` tags with text "learn more", "click here", "read more" (without context)
- [ ] JSON-LD `FinancialService` schema on homepage passes Rich Results Test
- [ ] JSON-LD `FAQPage` schema on all FAQ-containing pages
- [ ] JSON-LD `BreadcrumbList` on all interior pages
- [ ] JSON-LD `Person` schema on all broker profile pages
- [ ] `robots.txt` valid and sitemap linked
- [ ] `sitemap.xml` submitted to Google Search Console
- [ ] All pages return 200 status (no broken internal links)
- [ ] No console errors on page load (production build)

### 10.2 Core Web Vitals Checklist

- [ ] CLS < 0.1 (all pages, desktop and mobile)
- [ ] LCP < 2.5s (homepage, all primary service pages)
- [ ] FID/INP < 200ms
- [ ] All images have explicit `width` and `height` attributes
- [ ] Hero image ≤ 150KB, served as WebP
- [ ] No render-blocking scripts in `<head>`

### 10.3 Accessibility Checklist

- [ ] Lighthouse accessibility ≥ 95 (desktop)
- [ ] Lighthouse accessibility ≥ 95 (mobile)
- [ ] axe-core: zero critical violations
- [ ] All form inputs have associated `<label>` elements
- [ ] All touch targets ≥ 44×44px
- [ ] Focus visible on all interactive elements
- [ ] NVDA + Chrome: all content navigable and readable
- [ ] No keyboard traps

### 10.4 Conversion Checklist

- [ ] Primary CTA visible above fold on all pages
- [ ] Sticky mobile CTA bar present after 30% scroll
- [ ] Minimum 6 testimonials with names and service context on homepage
- [ ] Live Google review count embedded in footer or homepage
- [ ] All broker profiles have headshot, license number, specializations
- [ ] Contact form: inline validation + honeypot + accessible labels
- [ ] Form success state shows expected response time
- [ ] Phone number is `tel:` link on mobile
- [ ] Rate/process FAQ section on homepage and all service pages

### 10.5 Content Checklist

- [ ] Each service page targets unique primary keyword (no cannibalization)
- [ ] Homepage: ≥ 800 words of indexable body copy
- [ ] Each primary service page: ≥ 1,200 words
- [ ] No orphan pages (every page has ≥ 1 inbound internal link)
- [ ] Blog: ≥ 2 published articles at launch, cadence plan in place
- [ ] Meta descriptions ≤ 160 chars with geo + service + CTA

---

## 11. Out of Scope

This PRD does not cover:

- CRM or lead management system integration
- Mortgage calculator tool development
- Rate feed / lender API integration
- Application portal or document upload functionality
- Paid advertising (Google Ads, Meta Ads)
- Email marketing automation
- Third-party review platform integration beyond embedding existing reviews
- Multi-language / French-language optimization

These are valid follow-on workstreams but require separate PRDs.

---

## 12. Dependencies

| Dependency | Owner | Blocker For |
|---|---|---|
| Broker headshots (professional photography) | Brokerage | Team profiles, Person schema |
| Google Business Profile claimed and verified | Brokerage | Review embed, LocalBusiness schema |
| Broker license numbers confirmed | Compliance | Person schema, footer |
| Google Search Console access | Brokerage | Sitemap submission, baseline data |
| GA4 property access | Brokerage / Marketing | Conversion tracking setup |
| Testimonials collected and consented | Brokerage | Social proof requirements |

---

## 13. Priority Matrix

| Item | Impact | Effort | Priority |
|---|---|---|---|
| Add `<h1>` to all pages | High | Low | P0 |
| Fix console errors | High | Low | P0 |
| Add `<main>` landmark | High | Low | P0 |
| Fix image alt texts | High | Low | P0 |
| Add `FinancialService` JSON-LD | High | Low | P0 |
| Add `FAQPage` JSON-LD | High | Low | P0 |
| Fix CLS (image dimensions) | High | Medium | P0 |
| Add broker team profiles | High | Medium | P1 |
| Add testimonials section | High | Medium | P1 |
| Add `LocalBusiness` JSON-LD | High | Low | P1 |
| Add `BreadcrumbList` JSON-LD | Medium | Low | P1 |
| Sticky mobile CTA bar | High | Medium | P1 |
| Fix link anchor text (descriptive) | Medium | Medium | P1 |
| Rate/process FAQ per service page | High | High | P1 |
| Image WebP conversion | Medium | Medium | P2 |
| Blog content (2/month cadence) | High | High | P2 |
| Google Review embed | Medium | Low | P2 |
| Meta keyword geo-targeting | Low | Low | P2 |
| `Person` schema for brokers | Medium | Low | P2 |
| Sitemap generation + submission | Medium | Low | P2 |

---

## 14. Glossary

| Term | Definition |
|---|---|
| B-lender | Canadian term for alternative institutional lenders (credit unions, trust companies) that accept lower credit scores than Schedule A banks |
| Private lender | Individual or MIC (Mortgage Investment Corporation) lending outside regulated institution framework; higher rates, faster approval |
| CLS | Cumulative Layout Shift — Core Web Vital measuring visual stability |
| LCP | Largest Contentful Paint — Core Web Vital measuring perceived load speed |
| INP | Interaction to Next Paint — Core Web Vital measuring responsiveness |
| JSON-LD | JavaScript Object Notation for Linked Data — preferred format for Google structured data |
| Rich result | Enhanced Google SERP listing enabled by structured data (FAQ dropdowns, star ratings, etc.) |
| PIPEDA | Personal Information Protection and Electronic Documents Act — Canadian federal privacy law |
| MIC | Mortgage Investment Corporation — pool of private investors lending through mortgage portfolios |
| CMHC MLI Select | Canada Mortgage and Housing Corporation's multi-unit mortgage loan insurance product for affordable housing |

---

*This document is pillar content. Reproduce, adapt, and version-control per project. Review quarterly against Google algorithm updates and Canadian mortgage regulatory changes.*
