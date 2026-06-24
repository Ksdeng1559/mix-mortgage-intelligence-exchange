import type { Metadata } from 'next'
import Link from 'next/link'
import { LandingNav, LandingFooter } from '@/components/LandingLayout'
import { JsonLdScript } from '@/lib/json-ld'
import { FaqAccordion } from '@/components/hp/FaqAccordion'
import { StickyMobileCta } from '@/components/hp/StickyMobileCta'

const PAGE_DESCRIPTION =
  'Vancouver mortgage broker specializing in self-employed, B-lender, and private mortgage solutions. 48-hour pre-approval. BC · AB · ON. Book a free consultation.'

export const metadata: Metadata = {
  title: 'Alternative Mortgage Solutions Vancouver — MIX | Dennis Eng',
  description: PAGE_DESCRIPTION,
}

// ─── Contact ────────────────────────────────────────────────────────────────
const PHONE = '778-846-5559'
const EMAIL = 'mortgagesbydennis.eng@gmail.com'
const BOOKING = 'https://api.leadconnectorhq.com/widget/bookings/mortgagesbydenniseng'
const DOMAIN = 'https://mix.mortgagesbydenniseng.ca'

// ─── Content constants ───────────────────────────────────────────────────────
const HERO_STATS = [
  { value: '200+', label: 'Clients Helped' },
  { value: '48hr', label: 'Avg Pre-Approval' },
  { value: 'A / B / Private', label: 'Lender Tiers' },
  { value: '15+ Yrs', label: 'Experience' },
]

const HERO_SPECS = [
  'Self-Employed & Stated Income',
  'Incorporated Business Owners',
  'Real Estate Investors',
  'Commercial & Multi-Unit',
  'Credit Recovery Mortgages',
  'New-to-Canada Programs',
  'Construction Draw Financing',
]

const TRUST_ITEMS = [
  'DLC Clear Trust Member',
  'Licensed — BC · AB · ON',
  'A / B / Private Lender Access',
  'Transparent Fees · Free Consult',
  '48-Hour Pre-Approvals',
]

const PROBLEMS = [
  {
    title: 'Low Taxable Income',
    desc: 'Business owners write off expenses to reduce taxes — but banks qualify you on net, not gross.',
  },
  {
    title: 'Irregular Cash Flow',
    desc: 'Seasonal income, contract revenue, and dividends look unpredictable to automated underwriting.',
  },
  {
    title: 'Complex Corporate Structure',
    desc: 'Holding companies, partnerships, and trust income require lenders who understand your setup.',
  },
  {
    title: 'Short Income History',
    desc: 'Banks want 2+ years of filed T1 Generals. Newer businesses and recent incorporations get declined.',
  },
]

const SOLUTION_STEPS = [
  'Review NOAs and T1 Generals — identify stated-income eligibility',
  'Structure income documentation to reflect true borrowing capacity',
  'Select the right lender tier (A / B / Private) for your profile',
  'Submit to multiple lenders simultaneously for best terms',
  'Negotiate approval and guide you to closing',
]

const AUDIENCES = [
  {
    icon: '🧑‍💼',
    title: 'Self-Employed Proprietors',
    desc: 'Sole proprietors and freelancers with declared income that understates real earnings.',
    href: '/self-employed-financing',
  },
  {
    icon: '🏢',
    title: 'Incorporated Owners',
    desc: 'Business owners drawing salary + dividends through a corporation or holding company.',
    href: '/self-employed-financing',
  },
  {
    icon: '🏘️',
    title: 'Real Estate Investors',
    desc: 'Portfolio builders using rental income, BRRRR, or commercial property strategies.',
    href: '/investor-financing',
  },
]

const SOLUTIONS = [
  { abbr: 'SE', title: 'Self-Employed Qualification', desc: 'Stated income and alt-A programs that qualify on gross revenue, not net taxable income.', tier: 'A / B' },
  { abbr: 'IP', title: 'Investment Property', desc: 'Rental property financing using DSCR and portfolio-level qualification strategies.', tier: 'A / B' },
  { abbr: 'EQ', title: 'Equity Take-Out & HELOC', desc: 'Access your home equity for investment, renovation, or debt consolidation.', tier: 'A / B' },
  { abbr: 'CM', title: 'Commercial Mortgage', desc: 'Office, retail, industrial, mixed-use, and apartment building financing from $500K+.', tier: 'B / Private' },
  { abbr: 'RT', title: 'Renewal & Transfer', desc: 'Switch lenders at renewal to capture better rates — often with no penalty.', tier: 'A' },
  { abbr: 'PM', title: 'Private Bridge Mortgage', desc: 'Short-term equity-based financing when timing or credit doesn\'t fit traditional lenders.', tier: 'Private' },
]

const TIER_COLOR: Record<string, string> = {
  A: 'var(--green)',
  B: 'var(--amber)',
  Private: 'var(--purple)',
  'A / B': 'var(--green)',
  'B / Private': 'var(--amber)',
}

const LENDERS = [
  {
    name: 'A-Lenders',
    subtitle: 'Banks & Credit Unions',
    color: 'var(--green)',
    points: [
      'Lowest rates — Prime or better',
      'Strict income documentation',
      'T4, NOA, 2 years required',
      'Best for strong credit + T4 income',
    ],
    rateNote: null,
  },
  {
    name: 'B-Lenders',
    subtitle: 'Alternative Institutional',
    color: 'var(--amber)',
    points: [
      'Flexible income documentation',
      'Stated income programs available',
      'Credit score 580+ typically',
      'Recent BK or consumer proposal OK',
    ],
    rateNote: {
      rate: 'Prime + 1%–3% depending on LTV and credit profile',
      fee: 'Lender fees typically 1%–2% of mortgage amount',
      qualify: '580+ credit → B-lender eligible · 680+ → may qualify A-lender',
    },
  },
  {
    name: 'Private Lenders',
    subtitle: 'MICs & Individual Lenders',
    color: 'var(--purple)',
    points: [
      'Asset and equity-based qualification',
      'Any credit score considered',
      'Fastest approval — days not weeks',
      'Bridge, construction, and gap financing',
    ],
    rateNote: {
      rate: 'Typically 8%–14% depending on LTV, property, and risk',
      fee: 'Lender + broker fees typically 2%–4% combined',
      qualify: 'Equity and property value drive approval, not income or credit',
    },
  },
]

const COMMERCIAL_SCENARIOS = [
  'Office buildings & professional suites',
  'Retail plazas & strip malls',
  'Mixed-use residential + commercial',
  'Apartment buildings (5+ units)',
  'Industrial & warehouse properties',
  'Land acquisition & construction',
]

const COMMERCIAL_CREDS = [
  'DSCR and NOI analysis',
  'Corporate structure and entity lending',
  'Multi-unit residential (5–100+ units)',
  'Pre-sale and strata financing',
  'Construction draws and phased funding',
  '$100M+ commercial origination experience',
]

const INVESTOR_STRATEGIES = [
  {
    icon: '🏠',
    title: 'Rental Property Purchase',
    desc: 'Qualify using subject property rental income to offset the mortgage payment and improve your debt ratios.',
  },
  {
    icon: '🔄',
    title: 'BRRRR Strategy',
    desc: 'Buy, Renovate, Rent, Refinance, Repeat — structured financing to pull equity and recycle capital.',
  },
  {
    icon: '🏗️',
    title: 'Multi-Unit 5+ Doors',
    desc: 'Commercial lending rules apply at 5+ units. We navigate CMHC MLI Select and conventional commercial options.',
  },
  {
    icon: '📊',
    title: 'Portfolio Lending',
    desc: 'When individual property qualification maxes out, portfolio-level lenders look at your full asset picture.',
  },
]

const PROGRESSION_STEPS = [
  { num: '01', label: 'Primary Residence' },
  { num: '02', label: 'First Rental' },
  { num: '03', label: '2–4 Doors' },
  { num: '04', label: 'Multi-Unit 5+' },
  { num: '05', label: 'Portfolio / HoldCo' },
]

const PROCESS_STEPS = [
  {
    num: '1',
    title: 'Discovery Call',
    desc: 'Free 30-minute consultation. We learn your situation, goals, and current financial position.',
    badge: null,
  },
  {
    num: '2',
    title: 'File Packaging',
    desc: 'We structure your income documentation and select the right lender profile for your scenario.',
    badge: '48-hr pre-approval',
  },
  {
    num: '3',
    title: 'Lender Submission',
    desc: 'Your file goes to the right lenders — often multiple simultaneously — to maximize options.',
    badge: null,
  },
  {
    num: '4',
    title: 'Approval & Closing',
    desc: 'We negotiate terms, coordinate with your lawyer, and guide you through to funding.',
    badge: null,
  },
]

const TESTIMONIALS = [
  {
    quote: 'My bank turned me down twice. Dennis got me approved through a B-lender in under 72 hours. The whole process was explained clearly every step of the way.',
    name: 'M. Chen',
    city: 'Vancouver, BC',
    service: 'Self-Employed · Purchased Oct 2024',
  },
  {
    quote: 'I\'ve been incorporating for 3 years and every bank said my income didn\'t qualify. Dennis knew exactly how to present my file and we closed in 3 weeks.',
    name: 'R. Patel',
    city: 'Burnaby, BC',
    service: 'Incorporated Owner · Refinanced Sep 2024',
  },
  {
    quote: 'Dennis helped me add my second rental property using the existing equity in my first. The BRRRR strategy he outlined made it work on the numbers.',
    name: 'T. Nguyen',
    city: 'Richmond, BC',
    service: 'Investor · Purchase Aug 2024',
  },
  {
    quote: 'After a consumer proposal discharge I thought homeownership was years away. Dennis showed me a clear path and we closed 18 months after discharge.',
    name: 'S. Park',
    city: 'Surrey, BC',
    service: 'Credit Recovery · Purchased Jul 2024',
  },
  {
    quote: 'The commercial financing on my 8-unit apartment was complex — mixed zoning, deferred maintenance reserve. Dennis navigated it without drama.',
    name: 'A. Williams',
    city: 'North Vancouver, BC',
    service: 'Commercial · Apartment Building Jun 2024',
  },
  {
    quote: 'Arrived in Canada on a work permit 14 months ago. Dennis found a New-to-Canada program that accepted my foreign income history. Couldn\'t believe it worked.',
    name: 'L. Singh',
    city: 'Coquitlam, BC',
    service: 'New-to-Canada · Purchased May 2024',
  },
]

const FAQ_ITEMS = [
  {
    q: 'Do you charge broker fees?',
    a: 'For A-lender and most B-lender mortgages, the lender pays the broker — you pay nothing. For private mortgages, lender and broker fees typically apply (1%–4% combined). We disclose all fees upfront before you commit to anything.',
  },
  {
    q: 'How quickly can I get pre-approved?',
    a: 'Most files receive a pre-approval decision within 48 hours of submitting complete documents. Complex commercial or multi-unit files may take 3–5 business days. Full commitment to closing typically runs 5–10 business days depending on the lender.',
  },
  {
    q: 'I was declined by my bank — can you still help?',
    a: 'Yes. Bank declines are often the starting point. B-lenders and private lenders have different criteria — flexible income documentation, lower credit score thresholds, and equity-based qualification. We review every declined file before concluding it can\'t be done.',
  },
  {
    q: 'What credit score do I need?',
    a: 'A-lenders typically require 680+. B-lenders generally work with 580–679, and some accept lower. Private lenders focus on equity and property value more than credit score. Recent bankruptcies and consumer proposals are considered on a case-by-case basis.',
  },
  {
    q: 'What documents do I need as self-employed?',
    a: 'Typically: 2 years of T1 Generals and NOAs, 6 months of bank statements, and a business license or articles of incorporation. For stated income programs, the NOA is often sufficient. We tell you exactly what\'s needed after your discovery call — no guessing.',
  },
  {
    q: 'What\'s the difference between a B-lender and a private lender?',
    a: 'B-lenders are regulated institutional lenders (trust companies, credit unions) that follow OSFI guidelines but have more flexible income rules. Private lenders are individual investors or MICs operating outside the regulated system — higher rates, faster decisions, asset-focused approval.',
  },
  {
    q: 'Can I refinance an investment property?',
    a: 'Yes. Investment property refinances — equity take-outs, rate switches, and debt consolidation — are a common scenario. Qualification uses rental income offsets and may involve B-lender or private programs depending on your portfolio size and credit profile.',
  },
  {
    q: 'Do you handle commercial mortgages?',
    a: 'Yes. We finance office, retail, industrial, mixed-use, and apartment buildings (5+ units). Commercial files use DSCR (Debt Service Coverage Ratio) and NOI analysis rather than personal income qualification. Minimum deal size is typically $500K.',
  },
]

// ─── JSON-LD ─────────────────────────────────────────────────────────────────
const jsonLdFinancialService = {
  '@context': 'https://schema.org',
  '@type': 'FinancialService',
  '@id': `${DOMAIN}/#organization`,
  name: 'MIX Mortgage Intelligence Exchange',
  url: DOMAIN,
  description: PAGE_DESCRIPTION,
  areaServed: [
    { '@type': 'State', name: 'British Columbia' },
    { '@type': 'State', name: 'Alberta' },
    { '@type': 'State', name: 'Ontario' },
  ],
  serviceType: ['Mortgage Brokerage', 'Alternative Lending', 'Commercial Mortgage', 'Private Mortgage'],
  // TODO: add telephone, address, logo once confirmed with Dennis
}

const jsonLdPerson = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${DOMAIN}/#dennis`,
  name: 'Dennis Eng', // TODO: confirm full legal name
  jobTitle: 'Licensed Mortgage Broker',
  email: EMAIL,
  // TODO: telephone, image (headshot URL), hasCredential (license number), knowsLanguage, sameAs (LinkedIn)
  worksFor: { '@type': 'Organization', '@id': `${DOMAIN}/#organization` },
  url: DOMAIN,
}

const jsonLdFaqPage = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
}

const jsonLdBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: DOMAIN },
  ],
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      {/* PRD §6.2 — skip link is first focusable element */}
      <a href="#main-content" className="hp-skip">Skip to main content</a>

      <JsonLdScript data={jsonLdFinancialService} />
      <JsonLdScript data={jsonLdPerson} />
      <JsonLdScript data={jsonLdFaqPage} />
      <JsonLdScript data={jsonLdBreadcrumb} />

      <LandingNav />
      {/* PRD §7.2 — sticky mobile CTA bar, outside <main> */}
      <StickyMobileCta phone={PHONE} />

      <main id="main-content">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="hp-hero" aria-labelledby="hp-h1">
          <div className="hp-shell">
            <div className="hp-hero-grid">
              <div className="hp-hero-left">
                <span className="hp-eyebrow">Alternative Mortgage Solutions · Vancouver BC</span>
                <h1 id="hp-h1" className="hp-h1">
                  The Bank Said No.<br />We Say Let&apos;s Find a Way.
                </h1>
                <p className="hp-lede">
                  Vancouver&apos;s alternative mortgage specialist — self-employed, credit-bruised,
                  investor, and commercial borrowers. A-lenders, B-lenders, and private lenders
                  through one trusted broker.
                </p>
                <div className="hp-ctas">
                  <Link href="/assessment" className="lbtn primary">Get Pre-Qualified →</Link>
                  <a href={`tel:${PHONE.replace(/\D/g, '')}`} className="lbtn">📞 {PHONE}</a>
                </div>
                <div className="hp-stats" role="list" aria-label="Key stats">
                  {HERO_STATS.map((s, i) => (
                    <div key={i} className="hp-stat" role="listitem">
                      <div className="hp-stat-val">{s.value}</div>
                      <div className="hp-stat-lbl">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <aside className="hp-hero-card" aria-label="Specializations">
                <div className="hp-card-eye">What We Handle</div>
                <ul className="hp-spec-list" aria-label="Mortgage specializations">
                  {HERO_SPECS.map((spec, i) => (
                    <li key={i}>{spec}</li>
                  ))}
                </ul>
                <a
                  href={BOOKING}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lbtn primary"
                  style={{ width: '100%', justifyContent: 'center', marginTop: 20 }}
                >
                  Get My Free Assessment
                </a>
              </aside>
            </div>
          </div>
        </section>

        {/* ── Trust bar ────────────────────────────────────────────────────── */}
        <div className="hp-trust" role="list" aria-label="Trust signals">
          <div className="hp-trust-inner">
            {TRUST_ITEMS.map((item, i) => (
              <div key={i} className="hp-trust-item" role="listitem">
                <span className="hp-trust-dot" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* ── Problem ──────────────────────────────────────────────────────── */}
        <section id="problem" className="hp-section" aria-labelledby="hp-problem-h2">
          <div className="hp-shell">
            <div className="hp-problem-grid">
              <div>
                <h2 id="hp-problem-h2" className="hp-h2">
                  Why Banks Turn Down Self-Employed Borrowers — And What We Do Instead
                </h2>
                <ul className="hp-problems" aria-label="Common bank rejection reasons">
                  {PROBLEMS.map((p, i) => (
                    <li key={i} className="hp-problem-item">
                      <strong>{p.title}</strong>
                      <span>{p.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="hp-solution-box" aria-label="Our file packaging process">
                <div className="hp-sol-eye">We Package Your File the Right Way</div>
                <ol className="hp-sol-steps" aria-label="5-step file process">
                  {SOLUTION_STEPS.map((step, i) => (
                    <li key={i} className="hp-sol-step">
                      <span className="hp-sol-num" aria-hidden="true">{i + 1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* ── Audiences ────────────────────────────────────────────────────── */}
        <section id="audiences" className="hp-section" aria-labelledby="hp-aud-h2">
          <div className="hp-shell">
            <div className="hp-sec-hd">
              <span className="hp-eyebrow-sm">Who We Help</span>
              <h2 id="hp-aud-h2" className="hp-h2">Built for Non-Traditional Borrowers</h2>
            </div>
            <div className="hp-audience-grid">
              {AUDIENCES.map((a, i) => (
                <Link key={i} href={a.href} className="hp-audience-card">
                  <span className="hp-aud-icon" aria-hidden="true">{a.icon}</span>
                  <h3 className="hp-aud-title">{a.title}</h3>
                  <p className="hp-aud-desc">{a.desc}</p>
                  <span className="hp-aud-arrow" aria-hidden="true">→ See Solutions</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Solutions ────────────────────────────────────────────────────── */}
        <section id="solutions" className="hp-section hp-section--alt" aria-labelledby="hp-sol-h2">
          <div className="hp-shell">
            <div className="hp-sec-hd">
              <span className="hp-eyebrow-sm">Financing Solutions</span>
              <h2 id="hp-sol-h2" className="hp-h2">Mortgage Solutions Built Around Your Reality</h2>
            </div>
            <div className="hp-solutions-grid">
              {SOLUTIONS.map((s, i) => (
                <div key={i} className="hp-solution-card">
                  <div className="hp-sol-abbr" aria-hidden="true">{s.abbr}</div>
                  <h3 className="hp-sol-title">{s.title}</h3>
                  <p className="hp-sol-desc">{s.desc}</p>
                  <span
                    className="hp-tier-pill"
                    style={{ color: TIER_COLOR[s.tier] ?? 'var(--fg-muted)', borderColor: TIER_COLOR[s.tier] ?? 'var(--border)' }}
                  >
                    {s.tier} Lender
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Lenders ──────────────────────────────────────────────────────── */}
        <section id="lenders" className="hp-section" aria-labelledby="hp-lend-h2">
          <div className="hp-shell">
            <div className="hp-sec-hd">
              <span className="hp-eyebrow-sm">Our Lender Network</span>
              <h2 id="hp-lend-h2" className="hp-h2">One Broker. Three Lender Tiers. Maximum Options.</h2>
            </div>
            <div className="hp-lender-grid">
              {LENDERS.map((l, i) => (
                <div key={i} className="hp-lender-card" style={{ borderTopColor: l.color }}>
                  <div className="hp-lender-name" style={{ color: l.color }}>{l.name}</div>
                  <div className="hp-lender-sub">{l.subtitle}</div>
                  <ul className="hp-lender-points" aria-label={`${l.name} features`}>
                    {l.points.map((pt, j) => (
                      <li key={j}>{pt}</li>
                    ))}
                  </ul>
                  {l.rateNote && (
                    <div className="hp-rate-note" aria-label="Rate and fee context">
                      <div className="hp-rate-note-row"><span className="hp-rn-label">Rates</span><span>{l.rateNote.rate}</span></div>
                      <div className="hp-rate-note-row"><span className="hp-rn-label">Fees</span><span>{l.rateNote.fee}</span></div>
                      <div className="hp-rate-note-row"><span className="hp-rn-label">Qualify</span><span>{l.rateNote.qualify}</span></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Commercial ───────────────────────────────────────────────────── */}
        <section id="commercial" className="hp-section hp-section--alt" aria-labelledby="hp-comm-h2">
          <div className="hp-shell">
            <div className="hp-commercial-grid">
              <div>
                <span className="hp-eyebrow-sm">Commercial Expertise</span>
                <h2 id="hp-comm-h2" className="hp-h2">We Speak the Language of Commercial Lenders</h2>
                <p className="hp-body-text">
                  Commercial mortgage underwriting runs on DSCR, NOI, cap rates, and entity structure —
                  not personal income. With $100M+ in commercial origination experience, we translate
                  your property&apos;s financials into what lenders need to say yes.
                </p>
                <ul className="hp-comm-creds" aria-label="Commercial expertise areas">
                  {COMMERCIAL_CREDS.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
              <aside className="hp-callout-card" aria-label="Commercial financing scenarios">
                <div className="hp-callout-eye">Scenarios We Finance</div>
                <ul className="hp-comm-scenarios" aria-label="Commercial property types">
                  {COMMERCIAL_SCENARIOS.map((s, i) => (
                    <li key={i}>
                      <span className="hp-check" aria-hidden="true">✓</span>
                      {s}
                    </li>
                  ))}
                </ul>
                <a
                  href={BOOKING}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lbtn primary"
                  style={{ width: '100%', justifyContent: 'center', marginTop: 20 }}
                >
                  Discuss Your Commercial Scenario
                </a>
              </aside>
            </div>
          </div>
        </section>

        {/* ── Investor ─────────────────────────────────────────────────────── */}
        <section id="investor" className="hp-section" aria-labelledby="hp-inv-h2">
          <div className="hp-shell">
            <div className="hp-sec-hd">
              <span className="hp-eyebrow-sm">Investor Financing</span>
              <h2 id="hp-inv-h2" className="hp-h2">From First Rental to Full Portfolio</h2>
            </div>
            <div className="hp-investor-grid">
              {INVESTOR_STRATEGIES.map((s, i) => (
                <div key={i} className="hp-investor-card">
                  <span className="hp-inv-icon" aria-hidden="true">{s.icon}</span>
                  <h3 className="hp-inv-title">{s.title}</h3>
                  <p className="hp-inv-desc">{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="hp-progression" aria-label="Investor progression path">
              <div className="hp-prog-label">Investor Progression</div>
              <ol className="hp-prog-steps">
                {PROGRESSION_STEPS.map((s, i) => (
                  <li key={i} className="hp-prog-step">
                    <div className="hp-prog-num" aria-hidden="true">{s.num}</div>
                    <div className="hp-prog-lbl">{s.label}</div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ── About Dennis ─────────────────────────────────────────────────── */}
        <section id="about" className="hp-section hp-section--alt" aria-labelledby="hp-about-h2">
          <div className="hp-shell">
            <div className="hp-about-grid">
              <div>
                <span className="hp-eyebrow-sm">Your Mortgage Broker</span>
                <h2 id="hp-about-h2" className="hp-h2">A Mortgage Broker Who Gets It Done</h2>
                {/* TODO: Replace placeholder with next/image once headshot is available */}
                <div className="hp-bio-card">
                  <div className="hp-headshot-placeholder" role="img" aria-label="Dennis Eng, Mortgage Broker">DE</div>
                  <div>
                    <div className="hp-bio-name">Dennis Eng</div>
                    <div className="hp-bio-title">Licensed Mortgage Broker · DLC Clear Trust</div>
                    {/* TODO: Insert license number — MBRXXXXXXXXX */}
                    <div className="hp-bio-license">License #: <em>Contact us for details</em></div>
                  </div>
                </div>
                <p className="hp-body-text">
                  With 15+ years in mortgage financing and $100M+ in commercial origination,
                  Dennis specializes in the files that banks turn down first. Self-employed clients,
                  incorporated owners, investors, and credit-recovery borrowers — Dennis has seen it
                  and structured it.
                </p>
                <p className="hp-body-text">
                  Licensed in BC, Alberta, and Ontario. Fluent in English.
                  {/* TODO: add additional languages */}
                </p>
                <a
                  href={BOOKING}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lbtn primary"
                  style={{ marginTop: 16 }}
                >
                  Book a Call with Dennis
                </a>
              </div>
              <div>
                <h3 className="hp-reasons-h3">Why Clients Choose Dennis</h3>
                <ul className="hp-reasons" aria-label="Reasons to work with Dennis">
                  {[
                    { title: 'Self-Employed From the Start', body: 'He understands business owner finances because he navigates them himself.' },
                    { title: 'Three Lender Tiers', body: 'Access to A-lenders, B-lenders, and private lenders through one relationship.' },
                    { title: 'Negotiates on Your Behalf', body: 'You\'re not submitting applications yourself — Dennis advocates for your file.' },
                    { title: 'Long-Term Strategy', body: 'Every deal is structured with your next refinance or purchase in mind.' },
                    { title: 'Trusted Partner Network', body: 'Accountants, lawyers, realtors, and financial planners refer their clients here.' },
                  ].map((r, i) => (
                    <li key={i} className="hp-reason-item">
                      <strong>{r.title}</strong>
                      <span>{r.body}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Process ──────────────────────────────────────────────────────── */}
        <section id="process" className="hp-section" aria-labelledby="hp-proc-h2">
          <div className="hp-shell">
            <div className="hp-sec-hd">
              <span className="hp-eyebrow-sm">How It Works</span>
              <h2 id="hp-proc-h2" className="hp-h2">From Application to Approval — Here&apos;s the Process</h2>
            </div>
            <ol className="hp-process-grid" aria-label="Mortgage process steps">
              {PROCESS_STEPS.map((s, i) => (
                <li key={i} className="hp-process-step">
                  <div className="hp-step-num" aria-hidden="true">{s.num}</div>
                  <h3 className="hp-step-title">{s.title}</h3>
                  <p className="hp-step-desc">{s.desc}</p>
                  {s.badge && <span className="hp-step-badge">{s.badge}</span>}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Testimonials ─────────────────────────────────────────────────── */}
        <section id="testimonials" className="hp-section hp-section--alt" aria-labelledby="hp-test-h2">
          <div className="hp-shell">
            <div className="hp-sec-hd">
              <span className="hp-eyebrow-sm">Client Stories</span>
              <h2 id="hp-test-h2" className="hp-h2">What Our Clients Say</h2>
              {/* TODO: Replace static count with live Google review embed */}
              <div className="hp-review-badge" aria-label="Google rating">
                ★★★★★ <strong>4.9</strong> on Google
                {/* TODO: add "(N reviews)" once Google Business verified */}
              </div>
            </div>
            <div className="hp-testimonial-grid" aria-label="Client testimonials">
              {TESTIMONIALS.map((t, i) => (
                <figure key={i} className="hp-testimonial-card">
                  <blockquote className="hp-test-quote">&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption className="hp-test-cap">
                    <strong>{t.name}</strong> · {t.city}
                    <span className="hp-test-service">{t.service}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section id="faq" className="hp-section" aria-labelledby="hp-faq-h2">
          <div className="hp-shell">
            <div className="hp-sec-hd">
              <span className="hp-eyebrow-sm">FAQ</span>
              <h2 id="hp-faq-h2" className="hp-h2">Questions We Hear Every Day</h2>
            </div>
            <FaqAccordion items={FAQ_ITEMS} />
          </div>
        </section>

        {/* ── Final CTA ────────────────────────────────────────────────────── */}
        <section id="contact" className="hp-cta-strip" aria-labelledby="hp-cta-h2">
          <div className="hp-shell">
            <span className="hp-eyebrow-sm">Free · Confidential · No Obligation</span>
            <h2 id="hp-cta-h2" className="hp-cta-h2">Ready to Stop Hearing No?</h2>
            <p className="hp-cta-body">
              Book a free 30-minute consultation. We&apos;ll review your situation, tell you what lender
              tier fits, and outline a clear path forward — whether you&apos;re ready to move in 30 days
              or 6 months.
            </p>
            <div className="hp-ctas">
              <a
                href={BOOKING}
                target="_blank"
                rel="noopener noreferrer"
                className="lbtn primary"
              >
                Book My Free Consultation
              </a>
              <a href={`tel:${PHONE.replace(/\D/g, '')}`} className="lbtn">📞 {PHONE}</a>
            </div>
            <p className="hp-cta-contact">
              Or email: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </p>
          </div>
        </section>

      </main>

      <LandingFooter />

      <style>{`
        /* ── Global helpers ── */
        .hp-skip {
          position: absolute; left: -9999px; top: 4px; z-index: 200;
          padding: 8px 16px; background: var(--accent); color: #fff;
          border-radius: var(--radius); font-size: 13px; font-weight: 600;
          text-decoration: none;
        }
        .hp-skip:focus { left: 16px; }
        .hp-shell { max-width: 1260px; margin: 0 auto; padding: 0 32px; }
        .hp-section { padding: 96px 0; }
        .hp-section--alt { background: rgba(255,255,255,0.015); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .hp-sec-hd { margin-bottom: 48px; }
        .hp-h2 { font-size: clamp(1.75rem, 3.5vw, 2.5rem); font-weight: 800; letter-spacing: -.03em; line-height: 1.1; margin: 0 0 12px; }
        .hp-eyebrow { display: inline-flex; align-items: center; font-size: 11px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: #818CF8; margin-bottom: 20px; }
        .hp-eyebrow-sm { display: block; font-size: 11px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: #818CF8; margin-bottom: 12px; }
        .hp-body-text { font-size: 15px; color: var(--fg-secondary); line-height: 1.65; margin: 0 0 16px; }

        /* ── Hero ── */
        .hp-hero {
          padding: 96px 0 80px;
          background: linear-gradient(135deg, var(--bg-deep), var(--bg) 60%, rgba(20,18,60,0.9));
          position: relative; overflow: hidden;
        }
        .hp-hero::before {
          content: ''; position: absolute; top: -180px; right: -180px;
          width: 560px; height: 560px; border-radius: 50%;
          background: radial-gradient(circle, rgba(67,56,202,0.18) 0%, transparent 70%);
          pointer-events: none;
        }
        .hp-hero-grid { display: grid; grid-template-columns: 1fr 380px; gap: 64px; align-items: center; position: relative; }
        .hp-h1 { font-size: clamp(2.4rem, 4.5vw, 3.6rem); font-weight: 800; letter-spacing: -.04em; line-height: 1.1; margin: 0 0 20px; }
        .hp-lede { font-size: 17px; color: var(--fg-secondary); line-height: 1.6; margin: 0 0 32px; max-width: 540px; }
        .hp-ctas { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 40px; }
        .hp-stats { display: flex; gap: 32px; flex-wrap: wrap; }
        .hp-stat-val { font-size: 22px; font-weight: 800; color: var(--fg); letter-spacing: -.02em; }
        .hp-stat-lbl { font-size: 11px; color: var(--fg-muted); text-transform: uppercase; letter-spacing: .06em; margin-top: 2px; }
        .hp-hero-card {
          background: var(--bg-card); border: 1px solid var(--border-strong);
          border-radius: var(--radius-xl); padding: 28px; display: flex; flex-direction: column;
          box-shadow: var(--shadow-elevate);
        }
        .hp-card-eye { font-size: 10px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: #818CF8; margin-bottom: 16px; }
        .hp-spec-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
        .hp-spec-list li { font-size: 13px; color: var(--fg-secondary); padding-left: 18px; position: relative; }
        .hp-spec-list li::before { content: '→'; position: absolute; left: 0; color: var(--accent); font-weight: 700; }

        /* ── Trust bar ── */
        .hp-trust { background: var(--bg-card); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 16px 0; }
        .hp-trust-inner { max-width: 1260px; margin: 0 auto; padding: 0 32px; display: flex; gap: 32px; flex-wrap: wrap; justify-content: center; }
        .hp-trust-item { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--fg-secondary); font-weight: 500; white-space: nowrap; }
        .hp-trust-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); flex-shrink: 0; }

        /* ── Problem section ── */
        .hp-problem-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
        .hp-problems { list-style: none; padding: 0; margin: 24px 0 0; display: flex; flex-direction: column; gap: 20px; }
        .hp-problem-item { display: flex; flex-direction: column; gap: 4px; padding-left: 20px; position: relative; }
        .hp-problem-item::before { content: ''; position: absolute; left: 0; top: 8px; width: 8px; height: 8px; border-radius: 50%; background: var(--red); opacity: .7; }
        .hp-problem-item strong { font-size: 14px; font-weight: 600; color: var(--fg); }
        .hp-problem-item span { font-size: 13px; color: var(--fg-secondary); line-height: 1.5; }
        .hp-solution-box { background: var(--bg-card); border: 1px solid var(--border); border-left: 3px solid var(--accent); border-radius: var(--radius-lg); padding: 28px; }
        .hp-sol-eye { font-size: 12px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: #818CF8; margin-bottom: 20px; }
        .hp-sol-steps { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 14px; counter-reset: sol-step; }
        .hp-sol-step { display: flex; align-items: flex-start; gap: 12px; font-size: 13px; color: var(--fg-secondary); line-height: 1.5; }
        .hp-sol-num { flex-shrink: 0; width: 22px; height: 22px; border-radius: 50%; background: var(--accent-soft); color: #818CF8; font-size: 11px; font-weight: 700; display: grid; place-items: center; }

        /* ── Audiences ── */
        .hp-audience-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .hp-audience-card {
          display: flex; flex-direction: column; gap: 10px;
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: var(--radius-xl); padding: 28px;
          text-decoration: none; color: inherit; transition: all .2s;
        }
        .hp-audience-card:hover { border-color: var(--accent-glow); transform: translateY(-3px); box-shadow: var(--shadow-elevate); }
        .hp-audience-card:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
        .hp-aud-icon { font-size: 28px; }
        .hp-aud-title { font-size: 16px; font-weight: 700; color: var(--fg); margin: 0; }
        .hp-aud-desc { font-size: 13px; color: var(--fg-secondary); line-height: 1.55; margin: 0; flex: 1; }
        .hp-aud-arrow { font-size: 12px; color: var(--accent); font-weight: 600; margin-top: 4px; }

        /* ── Solutions grid ── */
        .hp-solutions-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .hp-solution-card {
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: var(--radius-lg); padding: 24px;
          display: flex; flex-direction: column; gap: 8px;
          transition: border-color .2s, transform .2s;
        }
        .hp-solution-card:hover { border-color: var(--border-strong); transform: translateY(-2px); }
        .hp-sol-abbr { width: 36px; height: 36px; border-radius: 8px; background: var(--accent-soft); color: #818CF8; font-size: 12px; font-weight: 800; display: grid; place-items: center; letter-spacing: .04em; }
        .hp-sol-title { font-size: 14px; font-weight: 700; color: var(--fg); margin: 4px 0 0; }
        .hp-sol-desc { font-size: 12px; color: var(--fg-secondary); line-height: 1.55; margin: 0; flex: 1; }
        .hp-tier-pill { font-size: 10px; font-weight: 600; letter-spacing: .05em; padding: 3px 8px; border-radius: 999px; border: 1px solid; background: transparent; width: fit-content; margin-top: 4px; }

        /* ── Lenders ── */
        .hp-lender-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .hp-lender-card {
          background: var(--bg-card); border: 1px solid var(--border);
          border-top: 3px solid; border-radius: var(--radius-xl); padding: 28px;
          display: flex; flex-direction: column; gap: 6px;
        }
        .hp-lender-name { font-size: 18px; font-weight: 800; letter-spacing: -.02em; }
        .hp-lender-sub { font-size: 12px; color: var(--fg-muted); margin-bottom: 12px; }
        .hp-lender-points { list-style: none; padding: 0; margin: 0 0 0; display: flex; flex-direction: column; gap: 8px; }
        .hp-lender-points li { font-size: 13px; color: var(--fg-secondary); padding-left: 16px; position: relative; }
        .hp-lender-points li::before { content: '✓'; position: absolute; left: 0; color: var(--fg-muted); font-size: 11px; }
        .hp-rate-note { margin-top: 20px; padding: 14px 16px; background: rgba(255,255,255,0.03); border: 1px solid var(--border); border-radius: var(--radius); display: flex; flex-direction: column; gap: 8px; }
        .hp-rate-note-row { display: flex; gap: 8px; font-size: 12px; color: var(--fg-secondary); line-height: 1.4; }
        .hp-rn-label { flex-shrink: 0; font-size: 10px; font-weight: 700; letter-spacing: .05em; text-transform: uppercase; color: var(--fg-muted); padding-top: 2px; width: 48px; }

        /* ── Commercial ── */
        .hp-commercial-grid { display: grid; grid-template-columns: 1fr 440px; gap: 60px; align-items: start; }
        .hp-comm-creds { list-style: none; padding: 0; margin: 20px 0 0; display: flex; flex-direction: column; gap: 10px; }
        .hp-comm-creds li { font-size: 14px; color: var(--fg-secondary); padding-left: 20px; position: relative; }
        .hp-comm-creds li::before { content: '→'; position: absolute; left: 0; color: var(--accent); font-weight: 700; }
        .hp-callout-card {
          position: sticky; top: 80px;
          background: var(--bg-card); border: 1px solid var(--border-strong);
          border-radius: var(--radius-xl); padding: 28px;
        }
        .hp-callout-eye { font-size: 10px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: #818CF8; margin-bottom: 16px; }
        .hp-comm-scenarios { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
        .hp-comm-scenarios li { display: flex; align-items: center; gap: 10px; font-size: 13px; color: var(--fg-secondary); }
        .hp-check { width: 18px; height: 18px; border-radius: 50%; background: rgba(52,211,153,0.12); color: var(--green); font-size: 10px; display: grid; place-items: center; flex-shrink: 0; }

        /* ── Investor ── */
        .hp-investor-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 40px; }
        .hp-investor-card {
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: var(--radius-lg); padding: 24px;
          display: flex; flex-direction: column; gap: 8px;
          transition: border-color .2s, transform .2s;
        }
        .hp-investor-card:hover { border-color: var(--border-strong); transform: translateY(-2px); }
        .hp-inv-icon { font-size: 24px; }
        .hp-inv-title { font-size: 15px; font-weight: 700; color: var(--fg); margin: 0; }
        .hp-inv-desc { font-size: 13px; color: var(--fg-secondary); line-height: 1.55; margin: 0; }
        .hp-progression { background: rgba(67,56,202,0.06); border: 1px solid var(--accent-glow); border-radius: var(--radius-xl); padding: 32px 40px; }
        .hp-prog-label { font-size: 10px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: #818CF8; margin-bottom: 24px; }
        .hp-prog-steps { list-style: none; padding: 0; margin: 0; display: flex; gap: 0; position: relative; }
        .hp-prog-steps::before { content: ''; position: absolute; top: 22px; left: 6%; right: 6%; height: 1px; background: var(--accent-glow); }
        .hp-prog-step { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 10px; position: relative; }
        .hp-prog-num { width: 44px; height: 44px; border-radius: 50%; background: var(--bg-card); border: 2px solid var(--accent); color: #818CF8; font-size: 12px; font-weight: 800; display: grid; place-items: center; z-index: 1; }
        .hp-prog-lbl { font-size: 11px; color: var(--fg-secondary); text-align: center; line-height: 1.3; }

        /* ── About ── */
        .hp-about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
        .hp-bio-card { display: flex; align-items: center; gap: 16px; margin-bottom: 20px; }
        .hp-headshot-placeholder {
          width: 64px; height: 64px; border-radius: 50%; background: var(--accent-soft);
          border: 2px solid var(--accent-glow); color: #818CF8; font-size: 18px; font-weight: 800;
          display: grid; place-items: center; flex-shrink: 0;
        }
        .hp-bio-name { font-size: 17px; font-weight: 700; color: var(--fg); }
        .hp-bio-title { font-size: 12px; color: var(--fg-secondary); margin-top: 2px; }
        .hp-bio-license { font-size: 11px; color: var(--fg-muted); margin-top: 4px; }
        .hp-reasons-h3 { font-size: 16px; font-weight: 700; color: var(--fg); margin: 0 0 20px; }
        .hp-reasons { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 16px; }
        .hp-reason-item { display: flex; flex-direction: column; gap: 3px; padding-left: 20px; position: relative; }
        .hp-reason-item::before { content: ''; position: absolute; left: 0; top: 8px; width: 8px; height: 8px; border-radius: 50%; background: var(--accent); }
        .hp-reason-item strong { font-size: 14px; font-weight: 600; color: var(--fg); }
        .hp-reason-item span { font-size: 13px; color: var(--fg-secondary); line-height: 1.5; }

        /* ── Process ── */
        .hp-process-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; position: relative; list-style: none; padding: 0; margin: 0; counter-reset: none; }
        .hp-process-grid::before { content: ''; position: absolute; top: 28px; left: 12%; right: 12%; height: 1px; background: var(--border-strong); }
        .hp-process-step { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 28px 20px; display: flex; flex-direction: column; gap: 8px; position: relative; }
        .hp-step-num { width: 56px; height: 56px; border-radius: 50%; background: var(--bg); border: 2px solid var(--accent-glow); color: #818CF8; font-size: 18px; font-weight: 800; display: grid; place-items: center; margin-bottom: 4px; z-index: 1; }
        .hp-step-title { font-size: 15px; font-weight: 700; color: var(--fg); margin: 0; }
        .hp-step-desc { font-size: 13px; color: var(--fg-secondary); line-height: 1.55; margin: 0; flex: 1; }
        .hp-step-badge { display: inline-flex; font-size: 10px; font-weight: 700; letter-spacing: .05em; padding: 3px 8px; border-radius: 999px; background: rgba(67,56,202,0.15); color: #818CF8; border: 1px solid var(--accent-glow); width: fit-content; margin-top: 4px; }

        /* ── Testimonials ── */
        .hp-testimonial-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .hp-testimonial-card {
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: var(--radius-lg); padding: 24px;
          display: flex; flex-direction: column; gap: 16px; margin: 0;
        }
        .hp-test-quote { font-size: 13px; color: var(--fg-secondary); line-height: 1.65; margin: 0; font-style: normal; flex: 1; }
        .hp-test-cap { font-size: 12px; display: flex; flex-direction: column; gap: 2px; }
        .hp-test-cap strong { color: var(--fg); }
        .hp-test-service { font-size: 11px; color: var(--fg-muted); margin-top: 2px; }
        .hp-review-badge { font-size: 14px; color: var(--amber); font-weight: 600; margin-top: 8px; }
        .hp-review-badge strong { font-size: 16px; }

        /* ── CTA strip ── */
        .hp-cta-strip {
          padding: 96px 0;
          background: linear-gradient(135deg, var(--bg-deep), #0D0C2A 50%, var(--bg-deep));
          border-top: 1px solid var(--border); text-align: center;
        }
        .hp-cta-h2 { font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; letter-spacing: -.035em; line-height: 1.1; margin: 12px 0 16px; }
        .hp-cta-body { font-size: 16px; color: var(--fg-secondary); line-height: 1.6; max-width: 540px; margin: 0 auto 32px; }
        .hp-cta-contact { margin-top: 20px; font-size: 13px; color: var(--fg-muted); }
        .hp-cta-contact a { color: var(--fg-secondary); text-decoration: underline; }
        .hp-cta-contact a:hover { color: var(--fg); }
        .hp-cta-strip .hp-ctas { justify-content: center; }

        /* ── Responsive ── */
        @media (max-width: 1100px) {
          .hp-solutions-grid { grid-template-columns: repeat(2, 1fr); }
          .hp-investor-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 960px) {
          .hp-hero-grid { grid-template-columns: 1fr; }
          .hp-hero-card { display: none; }
          .hp-about-grid { grid-template-columns: 1fr; gap: 40px; }
          .hp-commercial-grid { grid-template-columns: 1fr; }
          .hp-callout-card { position: static; }
          .hp-lender-grid { grid-template-columns: 1fr; }
          .hp-process-grid { grid-template-columns: 1fr 1fr; }
          .hp-process-grid::before { display: none; }
          .hp-testimonial-grid { grid-template-columns: repeat(2, 1fr); }
          .hp-section { padding: 64px 0; }
          .hp-hero { padding: 72px 0 60px; }
        }
        @media (max-width: 640px) {
          .hp-shell { padding: 0 16px; }
          .hp-audience-grid { grid-template-columns: 1fr; }
          .hp-solutions-grid { grid-template-columns: 1fr; }
          .hp-investor-grid { grid-template-columns: 1fr; }
          .hp-problem-grid { grid-template-columns: 1fr; }
          .hp-process-grid { grid-template-columns: 1fr; }
          .hp-testimonial-grid { grid-template-columns: 1fr; }
          .hp-prog-steps { flex-direction: column; align-items: center; gap: 16px; }
          .hp-prog-steps::before { display: none; }
          .hp-trust-inner { gap: 16px; }
          .hp-stats { gap: 20px; }
          .hp-ctas { flex-direction: column; }
          .hp-ctas .lbtn { justify-content: center; }
          .hp-cta-strip .hp-ctas { flex-direction: column; align-items: center; }
          .hp-section { padding: 56px 0; }
        }
      `}</style>
    </>
  )
}
