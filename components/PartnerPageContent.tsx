'use client'

import { useState } from 'react'

export type PartnerKey =
  | 'accountants'
  | 'lawyers'
  | 'financial-planners'
  | 'insolvency-trustees'
  | 'realtors'
  | 'developers'
  | 'immigration-consultants'

interface ValueProp {
  icon: string
  title: string
  body: string
}

interface PartnerConfig {
  eyebrow: string
  title: string
  subtitle: string
  valueProps: ValueProp[]
  clientTypes: string[]
  processNotes: string
  faq: { q: string; a: string }[]
}

const CONFIGS: Record<PartnerKey, PartnerConfig> = {
  accountants: {
    eyebrow: 'For CPAs & Tax Advisors',
    title: 'Your Incorporated Clients Need a Broker Who Reads Financial Statements',
    subtitle:
      'Dennis Eng has structured $100M+ in mortgages for incorporated business owners, self-employed borrowers, and investors. We speak NOI, DSCR, and CRA optimization — so your clients get approved where banks say no.',
    valueProps: [
      {
        icon: '📊',
        title: 'NOI, DSCR & Corporate File Fluency',
        body: 'We use business financials, bank deposits, and gross income — not just the NOA — to build applications B and private lenders can actually approve. No surprises for you or your client.',
      },
      {
        icon: '🏢',
        title: 'Holding Companies & Complex Structures',
        body: 'Dividend income, mixed salary/dividend, holding company purchase — we present the full picture to lenders who understand incorporated professionals, not just T4 earners.',
      },
      {
        icon: '🔄',
        title: 'Reciprocal Referral Network',
        body: 'We refer mortgage clients who need tax advice, corporate restructuring, or CRA guidance back to CPA partners in our network. We refer in, and we refer back.',
      },
    ],
    clientTypes: [
      'Incorporated business owners drawing dividends',
      'Self-employed with 2+ years NOA history',
      'Holding company commercial property purchases',
      'High-income professionals with complex write-offs',
      'Business owners with short incorporation history',
    ],
    processNotes:
      'Most referrals are contacted within 1 business day. We send you a brief status update after the initial consultation.',
    faq: [
      {
        q: 'Do you work with clients who minimize taxable income through write-offs?',
        a: 'Yes — this is our specialty. B lenders and private lenders can qualify clients on gross business income, bank deposits, or stated income. We identify the right approach for each file before approaching any lender.',
      },
      {
        q: 'Can a client qualify if their corporation is under 2 years old?',
        a: 'Often yes. B and private lenders can work with shorter operating history when supported by contracts, bank statements, or prior income in the same field. We assess each file individually.',
      },
      {
        q: 'Do you coordinate with the client\'s accountant during the process?',
        a: 'Absolutely — we frequently work alongside CPAs to present income in the most favorable way for the lender without misrepresenting tax filings. Clear communication between all parties is standard practice.',
      },
    ],
  },

  lawyers: {
    eyebrow: 'For Real Estate & Family Law Lawyers',
    title: 'Financing Support That Keeps Your Transactions on Track',
    subtitle:
      'Real estate closings, divorce buyouts, estate settlements — when your deal depends on financing, you need a broker who moves fast and communicates clearly. Dennis Eng has structured complex files that other brokers couldn\'t close.',
    valueProps: [
      {
        icon: '⚡',
        title: 'Fast Turnaround for Time-Sensitive Closings',
        body: 'We understand completion deadlines. Pre-approvals in 48 hours. We coordinate directly with your client and flag any financing issues before they become your problem at closing.',
      },
      {
        icon: '⚖️',
        title: 'Divorce Buyout & Equalization Specialists',
        body: 'Buyouts, equalization payments, separation-date valuations — we structure financing for clients acquiring a former family home, often with non-traditional income or recent life changes affecting qualification.',
      },
      {
        icon: '🏛️',
        title: 'Estate & Probate Property Financing',
        body: 'Estate beneficiaries acquiring property, or estates needing bridge financing while probate clears — we work within the legal timeline rather than around it.',
      },
    ],
    clientTypes: [
      'Buyers needing pre-approval before closing',
      'Divorce buyout clients (one spouse acquiring family home)',
      'Estate beneficiaries purchasing inherited property',
      'Commercial real estate transactions',
      'Clients with non-standard income requiring B or private lending',
    ],
    processNotes:
      'For time-sensitive closings, flag urgency in the notes field. We prioritize same-day contact for deals with approaching completion dates.',
    faq: [
      {
        q: 'How do you handle clients mid-divorce with income or credit complications?',
        a: 'We assess the file holistically — including support payments, rental income, and current income regardless of recent changes. B lenders give us flexibility for clients in transition.',
      },
      {
        q: 'Can you provide a financing letter quickly for a closing deadline?',
        a: 'Yes. For urgent closings, contact us directly at 778-846-5559. We issue conditional approval letters that meet standard requirements for real estate transactions.',
      },
      {
        q: 'Do you work with commercial transactions requiring bridge financing?',
        a: 'Yes. We access private lenders who can provide bridge financing for commercial closings, construction conversions, and property assemblies where conventional lenders won\'t move fast enough.',
      },
    ],
  },

  'financial-planners': {
    eyebrow: 'For Financial Planners & Wealth Advisors',
    title: 'Mortgage Strategy That Fits Inside the Bigger Financial Plan',
    subtitle:
      'Your clients with investment portfolios, HELOCs, and equity-based strategies need a mortgage partner who thinks in decades — not just the next transaction. Dennis Eng structures financing that preserves wealth and amplifies strategy.',
    valueProps: [
      {
        icon: '📈',
        title: 'Equity Optimization & HELOC Strategy',
        body: 'We structure HELOCs and refinances so clients can deploy equity into investment portfolios, down payments, or business opportunities — without disrupting their tax position or cash flow.',
      },
      {
        icon: '🏘️',
        title: 'Real Estate Investment Portfolio Financing',
        body: 'Clients building rental portfolios need a broker who thinks about borrowing capacity at properties 3, 4, and 5 before closing property 2. We structure each deal to preserve future borrowing room.',
      },
      {
        icon: '🎯',
        title: 'High Net Worth & Complex Income Profiles',
        body: 'Variable compensation, investment income, corporate dividends — we access lenders who evaluate the full net worth picture rather than a single income line on a tax return.',
      },
    ],
    clientTypes: [
      'High net worth clients with investment property ambitions',
      'Clients using HELOC to invest in non-registered portfolios',
      'Self-directed real estate investors building multi-property portfolios',
      'Business owners purchasing commercial premises',
      'Clients with variable or investment-heavy income profiles',
    ],
    processNotes:
      'For clients with complex financial plans, we recommend a 3-way call (you, client, Dennis) to align mortgage strategy with the broader financial objectives before submission.',
    faq: [
      {
        q: 'Can clients use investment income to qualify for a mortgage?',
        a: 'Yes. Dividend income, rental income, and certain investment returns can be used to qualify, depending on the lender and documentation available. We match each income type to the right lender policy.',
      },
      {
        q: 'Do you coordinate with financial planners on HELOC vs. refinance decisions?',
        a: 'Absolutely. We defer to the advisor on whether a HELOC or refinance serves the investment strategy better, then execute the mortgage structure that delivers it at the best rate available.',
      },
      {
        q: 'How do you handle clients with multiple properties and tight GDS/TDS ratios?',
        a: 'We access investor-specific lenders who evaluate rental income more favourably and don\'t cap out on multi-property files as quickly as Schedule A banks. We run the full GDS/TDS analysis before approaching any lender.',
      },
    ],
  },

  'insolvency-trustees': {
    eyebrow: 'For LITs, Credit Counsellors & Debt Advisors',
    title: 'Post-Insolvency & Credit Recovery Mortgage Solutions for Your Clients',
    subtitle:
      'Whether your client just received their discharge or is mid-proposal, Dennis Eng connects them with the right lender tier — with honest timelines, no judgment, and a clear path back to standard financing.',
    valueProps: [
      {
        icon: '📋',
        title: 'Post-Discharge Timeline Expertise',
        body: 'We know exactly when clients become eligible for each lender tier post-discharge. We brief clients on the credit rebuilding milestones they need and when to expect A lender eligibility — no false promises, no wasted applications.',
      },
      {
        icon: '🏦',
        title: 'B Lender, Private & Equity-Based Options',
        body: 'Most major banks decline post-insolvency and high-debt clients. We access specialized B lenders, private lenders, and equity lenders for clients at every stage — from active proposal through to 2+ years post-discharge.',
      },
      {
        icon: '🛤️',
        title: 'Credit Recovery Roadmap Included',
        body: 'Every credit-impaired client gets a concrete 12–24 month plan: which credit products to open, what payment history to build, and when to revisit mortgage qualification. We support the full recovery arc, not just today\'s transaction.',
      },
    ],
    clientTypes: [
      'Clients recently discharged from bankruptcy (1–2 years)',
      'Consumer proposal clients — during or post-proposal',
      'Clients with collections, judgments, or charge-offs',
      'Credit counselling clients rebuilding after debt restructuring',
      'Debt settlement clients with damaged credit history',
      'Clients with sufficient home equity seeking private lending bridge',
    ],
    processNotes:
      'Include the discharge date (or proposal start date) and insolvency type in the referral notes. This allows us to identify the right lender tier immediately and set accurate client expectations on the first call.',
    faq: [
      {
        q: 'How long after discharge can a client qualify for a mortgage?',
        a: 'With sufficient down payment (typically 10–20%) and rebuilt credit, some B lenders will consider clients as early as 1 year post-discharge. A lenders typically require 2+ years with demonstrated credit rebuilding. We assess each file individually.',
      },
      {
        q: 'What if the client is still in an active consumer proposal?',
        a: 'Private lenders can sometimes work with clients in active proposals when there is sufficient home equity. We assess each file on equity position, payment history within the proposal, and income stability.',
      },
      {
        q: 'Do you work with credit counselling agency clients (not just LIT clients)?',
        a: 'Yes. Clients who completed informal debt management plans or credit counselling programs — not just formal insolvency proceedings — often face the same lender barriers. We work with all of them.',
      },
      {
        q: 'Do you charge clients for the initial consultation?',
        a: 'No. The initial consultation is free and confidential. Broker fees may apply for B and private lender placements — disclosed upfront and in writing before any lender approach.',
      },
    ],
  },

  realtors: {
    eyebrow: 'For Residential & Commercial Real Estate Agents',
    title: 'Your Buyers Deserve a Mortgage Broker Who Gets Complex Files Done',
    subtitle:
      'Self-employed buyers, investors, commercial purchasers, and clients who\'ve been declined elsewhere — Dennis Eng closes files that other brokers can\'t. Fast pre-approvals, clear communication, and no surprises on closing day.',
    valueProps: [
      {
        icon: '⚡',
        title: '48-Hour Pre-Approval Turnaround',
        body: 'When your buyer needs to move on an offer, we move fast. Conditional pre-approvals within 48 hours for most files. We communicate proactively so you\'re never in the dark on financing status.',
      },
      {
        icon: '🧑‍💼',
        title: 'Self-Employed, Investor & Non-Traditional Buyers',
        body: 'Incorporated buyers, investors, high write-off earners — these are not edge cases for us. They\'re our core business. We close files that other brokers send back to you declined.',
      },
      {
        icon: '🏢',
        title: 'Residential & Commercial Property Financing',
        body: 'From condos to commercial units — we handle residential purchases, multi-unit investment properties (1–4 doors), and commercial real estate financing (5+ units, mixed-use, office, retail). One broker for the full spectrum.',
      },
    ],
    clientTypes: [
      'Self-employed buyers with low declared income',
      'Investors purchasing rental or multi-unit properties',
      'Commercial property buyers (office, retail, mixed-use)',
      'First-time buyers needing alternative income qualification',
      'Buyers moving from B lender to A lender on renewal',
      'Pre-sale condo buyers requiring 12–18 month completion financing',
      'Strata buyers facing special levy financing requirements',
    ],
    processNotes:
      'For offers with short subjects-to-financing periods, flag urgency and call us directly at 778-846-5559. We prioritize active transactions and copy referring agents on approval milestones.',
    faq: [
      {
        q: 'Will you keep me updated on my client\'s financing status?',
        a: 'Yes — with the client\'s consent, we copy the referring agent on key milestones: initial consultation complete, lender submission, conditional approval, and final approval. No surprises on closing.',
      },
      {
        q: 'Can you handle commercial purchases for my clients who buy commercial real estate?',
        a: 'Yes. Dennis has structured $100M+ in commercial mortgages. We handle office, retail, multi-unit residential (5+ doors), and mixed-use properties — including purchases through a corporation or holding company.',
      },
      {
        q: 'Can you handle strata properties with special levies?',
        a: 'Yes. We have specific experience with special levy financing — structuring the levy into the mortgage or as a separate facility so the transaction can close without the buyer needing to fund the levy in cash.',
      },
      {
        q: 'What\'s the minimum down payment for investor purchases?',
        a: 'For investment properties: typically 20% with A lenders, 20–25% with B lenders. We can sometimes structure using equity from an existing property to cover the down payment, reducing the cash requirement.',
      },
    ],
  },

  developers: {
    eyebrow: 'For Real Estate Developers & Builders',
    title: 'Construction Draw Mortgages & End-Buyer Qualification Support',
    subtitle:
      'Dennis Eng has structured construction mortgages and commercial deals since 2012. We support developers through every financing phase — from land acquisition and construction draws to end-buyer qualification on pre-sales.',
    valueProps: [
      {
        icon: '🏗️',
        title: 'Construction Draw Mortgage Expertise',
        body: 'We structure draw mortgages that align with your construction schedule — residential builds, multi-unit projects, and commercial construction. We know how lenders evaluate draws and stage advances.',
      },
      {
        icon: '🏢',
        title: 'Commercial & Multi-Unit Financing',
        body: 'At 5 units and above, commercial underwriting rules apply. Dennis\'s $100M+ commercial origination background means we know exactly how to present NOI, DSCR, and vacancy rates to commercial lenders.',
      },
      {
        icon: '👥',
        title: 'Pre-Sale Buyer Qualification',
        body: 'Buyers qualifying on pre-sale completions face unique challenges — income changes, rate changes, and long approval windows. We work with your buyers early so completions don\'t fall through at the last minute.',
      },
    ],
    clientTypes: [
      'Residential builders needing construction draw financing',
      'Multi-unit developers crossing the commercial threshold (5+ units)',
      'Pre-sale buyers completing on projects 12-24 months out',
      'Developers seeking bridge financing between phases',
      'Investors acquiring development-ready land',
    ],
    processNotes:
      'For pre-sale buyer referrals, provide the expected completion date in the notes. We pre-qualify buyers early and maintain contact through to completion.',
    faq: [
      {
        q: 'Do you finance residential construction for builder-owners?',
        a: 'Yes. We structure construction draw mortgages for individuals building their primary residence or investment property — with draws aligned to construction milestones. A, B, and private lender options available.',
      },
      {
        q: 'Can you help buyers qualify for pre-sales with long completion timelines?',
        a: 'Yes. We assess pre-sale buyers based on current income and provide guidance on income and credit maintenance through the completion window. We also identify lenders with favourable policies for pre-sale completions.',
      },
      {
        q: 'Do you handle commercial construction financing?',
        a: 'Yes — this is an area of specialty. We have established relationships with commercial construction lenders and understand how construction-to-permanent conversion works across residential, commercial, and mixed-use asset classes.',
      },
    ],
  },

  'immigration-consultants': {
    eyebrow: 'For RCICs, Immigration Lawyers & Settlement Services',
    title: 'Your Clients Are Building a New Life in Canada — We Help Them Into a Home',
    subtitle:
      'New permanent residents, work permit holders, and recent arrivals face real barriers with Canadian lenders — thin credit files, foreign income, short residency. Dennis Eng works with New-to-Canada mortgage programs and B lenders designed for exactly this situation.',
    valueProps: [
      {
        icon: '🍁',
        title: 'New-to-Canada Mortgage Programs',
        body: 'Major bank New-to-Canada programs allow recently landed PRs to qualify with foreign income verification and international credit bureau letters in lieu of Canadian credit history. We know the criteria and which lenders apply them most flexibly.',
      },
      {
        icon: '📄',
        title: 'Foreign Income & Non-Standard Documentation',
        body: 'Foreign employment letters, overseas bank statements, international NOAs, and non-Canadian credit reports — we know how lenders evaluate each document type and how to present a file that gets approved rather than declined on a technicality.',
      },
      {
        icon: '🛤️',
        title: 'Credit-Thin Profile Navigation',
        body: 'No Canadian credit history doesn\'t mean no options. We identify the lenders with the most flexible New-to-Canada policies and help clients establish the Canadian credit footprint needed to transition to standard rates quickly.',
      },
    ],
    clientTypes: [
      'Permanent residents (landed within 1–3 years)',
      'Work permit holders with confirmed employment in Canada',
      'International students transitioning to PR or employment',
      'Foreign nationals with Canadian income and assets',
      'Self-employed newcomers with overseas business history',
      'Clients with foreign income being used toward Canadian qualification',
    ],
    processNotes:
      'Include the client\'s immigration status and Canadian residency start date in the referral notes. This allows us to identify eligible lender programs immediately.',
    faq: [
      {
        q: 'Can a permanent resident qualify for a mortgage immediately after landing?',
        a: 'Yes — several major lenders have New-to-Canada mortgage programs that accept recent PRs with a valid PR card, foreign income verification, and reference letters from an international bank. Down payment requirements are typically 5–35% depending on income documentation.',
      },
      {
        q: 'Do clients need Canadian credit history?',
        a: 'Not always. New-to-Canada programs accept international credit bureau letters (Equifax or equivalent) from the client\'s home country as a substitute for Canadian credit history. For clients without either, we work with B lenders who evaluate the full financial picture.',
      },
      {
        q: 'Can a work permit holder qualify for a Canadian mortgage?',
        a: 'Yes, in many cases. Work permit holders with confirmed Canadian employment, a valid permit with reasonable remaining duration, and documented Canadian income can qualify under certain programs. We assess each file individually based on permit type, employer, and income documentation.',
      },
      {
        q: 'What if the client is self-employed in Canada but newcomer status?',
        a: 'This is the most complex scenario — combining newcomer status with self-employment income. We have experience structuring these files using business financials, bank deposits, and contracts for B lenders willing to work with both challenges simultaneously.',
      },
    ],
  },
}

const SITUATIONS = [
  'Self-employed / Low declared income',
  'Incorporated owner / Dividend income',
  'Investment property purchase',
  'BRRRR strategy / Refinance',
  'Credit recovery (post-insolvency)',
  'Construction financing',
  'Bridge / Short-term financing',
  'Divorce buyout',
  'New to Canada',
  'High debt ratio',
  'Commercial / Multi-unit (5+ doors)',
  'Reverse mortgage',
  'Other — described in notes',
]

interface FormState {
  partnerFirst: string
  partnerLast: string
  partnerEmail: string
  partnerPhone: string
  partnerCompany: string
  clientFirst: string
  clientLast: string
  clientPhone: string
  clientEmail: string
  situation: string
  notes: string
  consent: boolean
  hp: string // honeypot
}

const EMPTY: FormState = {
  partnerFirst: '',
  partnerLast: '',
  partnerEmail: '',
  partnerPhone: '',
  partnerCompany: '',
  clientFirst: '',
  clientLast: '',
  clientPhone: '',
  clientEmail: '',
  situation: '',
  notes: '',
  consent: false,
  hp: '',
}

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function PartnerPageContent({ partner }: { partner: PartnerKey }) {
  const cfg = CONFIGS[partner]
  const [form, setForm] = useState<FormState>(EMPTY)
  const [status, setStatus] = useState<Status>('idle')
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormState, string>>>({})

  function set(field: keyof FormState, value: string | boolean) {
    setForm((f) => ({ ...f, [field]: value }))
    setFieldErrors((e) => ({ ...e, [field]: undefined }))
  }

  function validate(): boolean {
    const errs: Partial<Record<keyof FormState, string>> = {}
    if (!form.partnerFirst.trim()) errs.partnerFirst = 'Required'
    if (!form.partnerLast.trim()) errs.partnerLast = 'Required'
    if (!form.partnerEmail.trim()) errs.partnerEmail = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.partnerEmail)) errs.partnerEmail = 'Invalid email'
    if (!form.partnerCompany.trim()) errs.partnerCompany = 'Required'
    if (!form.clientFirst.trim()) errs.clientFirst = 'Required'
    if (!form.clientLast.trim()) errs.clientLast = 'Required'
    if (!form.clientPhone.trim()) errs.clientPhone = 'Required'
    if (!form.situation) errs.situation = 'Required'
    if (!form.consent) errs.consent = 'You must agree before submitting'
    setFieldErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (form.hp) return // honeypot triggered — silently succeed
    if (!validate()) return
    setStatus('sending')
    try {
      const res = await fetch('/api/mix/referrals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, partnerType: partner }),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <main className="pp-root">
      {/* ── Hero ── */}
      <section className="pp-hero">
        <div className="pp-container">
          <span className="pp-pill">{cfg.eyebrow}</span>
          <h1 className="pp-title">{cfg.title}</h1>
          <p className="pp-subtitle">{cfg.subtitle}</p>
          <a href="#referral-form" className="lbtn primary pp-hero-cta">Refer a Client →</a>
        </div>
      </section>

      {/* ── Value Props ── */}
      <section className="pp-section pp-values" aria-labelledby="vp-heading">
        <div className="pp-container">
          <h2 id="vp-heading" className="pp-sh">Why Your Clients Come to Us</h2>
          <div className="pp-vp-grid">
            {cfg.valueProps.map((vp) => (
              <div key={vp.title} className="pp-vp-card">
                <span className="pp-vp-icon" aria-hidden="true">{vp.icon}</span>
                <h3 className="pp-vp-title">{vp.title}</h3>
                <p className="pp-vp-body">{vp.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Client Types ── */}
      <section className="pp-section pp-clients" aria-labelledby="ct-heading">
        <div className="pp-container pp-two-col">
          <div>
            <h2 id="ct-heading" className="pp-sh">Clients We Serve Best</h2>
            <p className="pp-body-text">
              These are the borrower situations we handle every day. If your client fits one of
              these profiles, we can almost certainly help — and we&apos;ll tell you quickly if we can&apos;t.
            </p>
            <ul className="pp-client-list" aria-label="Client types we work with">
              {cfg.clientTypes.map((ct) => (
                <li key={ct}>
                  <span className="pp-check" aria-hidden="true">✓</span>
                  {ct}
                </li>
              ))}
            </ul>
          </div>
          <div className="pp-process-card" aria-label="Referral process">
            <h3 className="pp-process-title">How Referrals Work</h3>
            <ol className="pp-process-steps">
              <li>
                <span className="pp-step-num" aria-hidden="true">1</span>
                <div>
                  <strong>Submit the referral form below</strong>
                  <span>Takes 2 minutes. Include the client&apos;s situation and best contact time.</span>
                </div>
              </li>
              <li>
                <span className="pp-step-num" aria-hidden="true">2</span>
                <div>
                  <strong>Dennis contacts the client within 1 business day</strong>
                  <span>Free 30-minute consultation. Confidential. No obligation.</span>
                </div>
              </li>
              <li>
                <span className="pp-step-num" aria-hidden="true">3</span>
                <div>
                  <strong>You receive a status update</strong>
                  <span>{cfg.processNotes}</span>
                </div>
              </li>
              <li>
                <span className="pp-step-num" aria-hidden="true">4</span>
                <div>
                  <strong>We handle everything through to funding</strong>
                  <span>Lender negotiations, paperwork, coordination — all managed by Dennis&apos;s office.</span>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* ── Referral Form ── */}
      <section className="pp-section pp-form-section" id="referral-form" aria-labelledby="form-heading">
        <div className="pp-container">
          <div className="pp-form-wrap">
            <div className="pp-form-header">
              <h2 id="form-heading" className="pp-sh">Submit a Referral</h2>
              <p className="pp-body-text">
                All referrals are handled with full confidentiality. Client information is used
                only to facilitate the consultation and mortgage process.
              </p>
            </div>

            {status === 'sent' ? (
              <div className="pp-success" role="alert">
                <span className="pp-success-icon" aria-hidden="true">✓</span>
                <div>
                  <strong>Referral received.</strong>
                  <p>Dennis will contact {form.clientFirst} {form.clientLast} within 1 business day.
                  A confirmation has been sent to {form.partnerEmail}.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="pp-form" aria-label="Client referral form">
                {/* Honeypot — hidden from real users */}
                <input
                  type="text"
                  name="website"
                  value={form.hp}
                  onChange={(e) => set('hp', e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}
                />

                <fieldset className="pp-fieldset">
                  <legend className="pp-legend">Your Information</legend>
                  <div className="pp-row">
                    <div className="pp-field">
                      <label htmlFor="partnerFirst">First name <span aria-hidden="true">*</span></label>
                      <input
                        id="partnerFirst"
                        type="text"
                        value={form.partnerFirst}
                        onChange={(e) => set('partnerFirst', e.target.value)}
                        autoComplete="given-name"
                        required
                        aria-required="true"
                        aria-describedby={fieldErrors.partnerFirst ? 'err-partnerFirst' : undefined}
                        aria-invalid={!!fieldErrors.partnerFirst}
                      />
                      {fieldErrors.partnerFirst && (
                        <span id="err-partnerFirst" className="pp-err" role="alert">{fieldErrors.partnerFirst}</span>
                      )}
                    </div>
                    <div className="pp-field">
                      <label htmlFor="partnerLast">Last name <span aria-hidden="true">*</span></label>
                      <input
                        id="partnerLast"
                        type="text"
                        value={form.partnerLast}
                        onChange={(e) => set('partnerLast', e.target.value)}
                        autoComplete="family-name"
                        required
                        aria-required="true"
                        aria-invalid={!!fieldErrors.partnerLast}
                      />
                      {fieldErrors.partnerLast && (
                        <span className="pp-err" role="alert">{fieldErrors.partnerLast}</span>
                      )}
                    </div>
                  </div>
                  <div className="pp-row">
                    <div className="pp-field">
                      <label htmlFor="partnerCompany">Firm / Company <span aria-hidden="true">*</span></label>
                      <input
                        id="partnerCompany"
                        type="text"
                        value={form.partnerCompany}
                        onChange={(e) => set('partnerCompany', e.target.value)}
                        autoComplete="organization"
                        required
                        aria-required="true"
                        aria-invalid={!!fieldErrors.partnerCompany}
                      />
                      {fieldErrors.partnerCompany && (
                        <span className="pp-err" role="alert">{fieldErrors.partnerCompany}</span>
                      )}
                    </div>
                    <div className="pp-field">
                      <label htmlFor="partnerPhone">Your phone</label>
                      <input
                        id="partnerPhone"
                        type="tel"
                        value={form.partnerPhone}
                        onChange={(e) => set('partnerPhone', e.target.value)}
                        autoComplete="tel"
                      />
                    </div>
                  </div>
                  <div className="pp-field">
                    <label htmlFor="partnerEmail">Your email <span aria-hidden="true">*</span></label>
                    <input
                      id="partnerEmail"
                      type="email"
                      value={form.partnerEmail}
                      onChange={(e) => set('partnerEmail', e.target.value)}
                      autoComplete="email"
                      required
                      aria-required="true"
                      aria-invalid={!!fieldErrors.partnerEmail}
                    />
                    {fieldErrors.partnerEmail && (
                      <span className="pp-err" role="alert">{fieldErrors.partnerEmail}</span>
                    )}
                  </div>
                </fieldset>

                <fieldset className="pp-fieldset">
                  <legend className="pp-legend">Client Information</legend>
                  <div className="pp-row">
                    <div className="pp-field">
                      <label htmlFor="clientFirst">Client first name <span aria-hidden="true">*</span></label>
                      <input
                        id="clientFirst"
                        type="text"
                        value={form.clientFirst}
                        onChange={(e) => set('clientFirst', e.target.value)}
                        required
                        aria-required="true"
                        aria-invalid={!!fieldErrors.clientFirst}
                      />
                      {fieldErrors.clientFirst && (
                        <span className="pp-err" role="alert">{fieldErrors.clientFirst}</span>
                      )}
                    </div>
                    <div className="pp-field">
                      <label htmlFor="clientLast">Client last name <span aria-hidden="true">*</span></label>
                      <input
                        id="clientLast"
                        type="text"
                        value={form.clientLast}
                        onChange={(e) => set('clientLast', e.target.value)}
                        required
                        aria-required="true"
                        aria-invalid={!!fieldErrors.clientLast}
                      />
                      {fieldErrors.clientLast && (
                        <span className="pp-err" role="alert">{fieldErrors.clientLast}</span>
                      )}
                    </div>
                  </div>
                  <div className="pp-row">
                    <div className="pp-field">
                      <label htmlFor="clientPhone">Client phone <span aria-hidden="true">*</span></label>
                      <input
                        id="clientPhone"
                        type="tel"
                        value={form.clientPhone}
                        onChange={(e) => set('clientPhone', e.target.value)}
                        required
                        aria-required="true"
                        aria-invalid={!!fieldErrors.clientPhone}
                      />
                      {fieldErrors.clientPhone && (
                        <span className="pp-err" role="alert">{fieldErrors.clientPhone}</span>
                      )}
                    </div>
                    <div className="pp-field">
                      <label htmlFor="clientEmail">Client email</label>
                      <input
                        id="clientEmail"
                        type="email"
                        value={form.clientEmail}
                        onChange={(e) => set('clientEmail', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="pp-field">
                    <label htmlFor="situation">Client situation <span aria-hidden="true">*</span></label>
                    <select
                      id="situation"
                      value={form.situation}
                      onChange={(e) => set('situation', e.target.value)}
                      required
                      aria-required="true"
                      aria-invalid={!!fieldErrors.situation}
                    >
                      <option value="">Select situation…</option>
                      {SITUATIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {fieldErrors.situation && (
                      <span className="pp-err" role="alert">{fieldErrors.situation}</span>
                    )}
                  </div>
                  <div className="pp-field">
                    <label htmlFor="notes">Notes / urgency</label>
                    <textarea
                      id="notes"
                      value={form.notes}
                      onChange={(e) => set('notes', e.target.value)}
                      rows={4}
                      placeholder="Completion deadline, specific concerns, best time to call client…"
                    />
                  </div>
                </fieldset>

                <div className="pp-field pp-consent">
                  <div className="pp-checkbox-row">
                    <input
                      id="consent"
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => set('consent', e.target.checked)}
                      required
                      aria-required="true"
                      aria-invalid={!!fieldErrors.consent}
                    />
                    <label htmlFor="consent">
                      I confirm this client has consented to being contacted by Mortgages by Dennis Eng
                      (DLC Clear Trust Mortgages) regarding their mortgage inquiry.
                    </label>
                  </div>
                  {fieldErrors.consent && (
                    <span className="pp-err" role="alert">{fieldErrors.consent}</span>
                  )}
                </div>

                {status === 'error' && (
                  <div className="pp-form-error" role="alert">
                    Submission failed. Call us directly at{' '}
                    <a href="tel:7788465559">778-846-5559</a> or email{' '}
                    <a href="mailto:mortgagesbydennis.eng@gmail.com">mortgagesbydennis.eng@gmail.com</a>.
                  </div>
                )}

                <button
                  type="submit"
                  className="lbtn primary pp-submit"
                  disabled={status === 'sending'}
                  aria-busy={status === 'sending'}
                >
                  {status === 'sending' ? 'Submitting…' : 'Submit Referral'}
                </button>
                <p className="pp-form-note">
                  Referrals are reviewed within 1 business day. Client contact is confidential.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="pp-section pp-faq" aria-labelledby="faq-heading">
        <div className="pp-container pp-faq-inner">
          <h2 id="faq-heading" className="pp-sh">Partner Questions</h2>
          <div className="pp-faq-grid">
            {cfg.faq.map((item, i) => (
              <details key={i} className="pp-faq-item">
                <summary className="pp-faq-q">{item.q}</summary>
                <p className="pp-faq-a">{item.a}</p>
              </details>
            ))}
          </div>
          <div className="pp-faq-cta">
            <p>Questions not covered here?</p>
            <a href="tel:7788465559" className="lbtn">Call 778-846-5559</a>
            <a href="mailto:mortgagesbydennis.eng@gmail.com" className="lbtn">Email Dennis</a>
          </div>
        </div>
      </section>

      <style>{`
        .pp-root { background: var(--bg-deep); }

        /* Layout */
        .pp-container { max-width: 1100px; margin: 0 auto; padding: 0 32px; }
        .pp-section { padding: 80px 0; border-top: 1px solid var(--border); }
        .pp-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
        .pp-sh { font-size: 22px; font-weight: 700; letter-spacing: -.02em; margin-bottom: 16px; }
        .pp-body-text { font-size: 14px; color: var(--fg-secondary); line-height: 1.65; margin-bottom: 24px; }

        /* Hero */
        .pp-hero { padding: 96px 0 72px; background: linear-gradient(160deg, #0D1117 0%, #131820 100%); }
        .pp-pill {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 11px; font-weight: 500; padding: 5px 12px; border-radius: 999px;
          background: var(--accent-soft); color: #A5B4FC;
          border: 1px solid rgba(67,56,202,.25);
          text-transform: uppercase; letter-spacing: .08em; margin-bottom: 20px;
        }
        .pp-title { font-size: clamp(28px, 4vw, 48px); font-weight: 800; letter-spacing: -.03em; line-height: 1.1; margin-bottom: 18px; max-width: 820px; }
        .pp-subtitle { font-size: 16px; color: var(--fg-secondary); line-height: 1.65; margin-bottom: 32px; max-width: 680px; }
        .pp-hero-cta { font-size: 15px; padding: 12px 28px; }

        /* Value props */
        .pp-values { background: var(--bg); }
        .pp-vp-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 8px; }
        .pp-vp-card {
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: var(--radius-lg); padding: 28px 24px;
          transition: border-color .15s, transform .15s;
        }
        .pp-vp-card:hover { border-color: var(--accent); transform: translateY(-2px); }
        .pp-vp-icon { font-size: 28px; display: block; margin-bottom: 14px; }
        .pp-vp-title { font-size: 14px; font-weight: 700; margin-bottom: 8px; }
        .pp-vp-body { font-size: 13px; color: var(--fg-secondary); line-height: 1.6; }

        /* Clients */
        .pp-clients { background: var(--bg-deep); }
        .pp-client-list { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .pp-client-list li { display: flex; align-items: flex-start; gap: 10px; font-size: 13px; color: var(--fg-secondary); line-height: 1.5; }
        .pp-check { color: var(--green); font-weight: 700; flex-shrink: 0; margin-top: 2px; }

        /* Process card */
        .pp-process-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-xl); padding: 32px; }
        .pp-process-title { font-size: 15px; font-weight: 700; margin-bottom: 24px; }
        .pp-process-steps { list-style: none; display: flex; flex-direction: column; gap: 20px; }
        .pp-process-steps li { display: flex; align-items: flex-start; gap: 14px; }
        .pp-step-num {
          min-width: 28px; height: 28px; border-radius: 50%;
          background: var(--accent); color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 700; flex-shrink: 0;
        }
        .pp-process-steps strong { display: block; font-size: 13px; margin-bottom: 3px; }
        .pp-process-steps span { font-size: 12px; color: var(--fg-secondary); line-height: 1.5; }

        /* Form */
        .pp-form-section { background: var(--bg); }
        .pp-form-wrap { max-width: 720px; margin: 0 auto; }
        .pp-form-header { margin-bottom: 32px; }
        .pp-form { display: flex; flex-direction: column; gap: 0; }
        .pp-fieldset {
          border: 1px solid var(--border); border-radius: var(--radius-lg);
          padding: 24px; margin-bottom: 20px;
        }
        .pp-legend { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: .06em; color: var(--fg-muted); padding: 0 8px; }
        .pp-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .pp-field { display: flex; flex-direction: column; gap: 6px; margin-top: 16px; }
        .pp-fieldset > .pp-field:first-of-type { margin-top: 0; }
        .pp-field label { font-size: 12px; font-weight: 500; color: var(--fg-secondary); }
        .pp-field label span { color: var(--red); }
        .pp-field input,
        .pp-field select,
        .pp-field textarea {
          background: var(--bg-elevated); border: 1px solid var(--border-strong);
          border-radius: var(--radius); padding: 10px 12px;
          color: var(--fg); font-family: var(--font); font-size: 13px;
          transition: border-color .15s, box-shadow .15s;
          width: 100%;
        }
        .pp-field input:focus,
        .pp-field select:focus,
        .pp-field textarea:focus {
          outline: none; border-color: var(--accent);
          box-shadow: 0 0 0 3px var(--accent-glow);
        }
        .pp-field input[aria-invalid="true"],
        .pp-field select[aria-invalid="true"] { border-color: var(--red); }
        .pp-field input[aria-invalid="true"]:focus { box-shadow: 0 0 0 3px rgba(248,113,113,.15); }
        .pp-field textarea { resize: vertical; min-height: 96px; }
        .pp-field select { appearance: none; cursor: pointer; }
        .pp-field select option { background: var(--bg-elevated); }
        .pp-err { font-size: 11px; color: var(--red); }

        /* Consent */
        .pp-consent { margin-bottom: 20px; }
        .pp-checkbox-row { display: flex; align-items: flex-start; gap: 10px; }
        .pp-checkbox-row input[type="checkbox"] {
          width: 16px; height: 16px; min-width: 16px;
          accent-color: var(--accent); cursor: pointer; margin-top: 2px;
          background: var(--bg-elevated); border: 1px solid var(--border-strong);
        }
        .pp-checkbox-row label { font-size: 12px; color: var(--fg-secondary); line-height: 1.55; cursor: pointer; }

        /* Submit */
        .pp-submit { width: 100%; justify-content: center; font-size: 15px; padding: 14px; margin-top: 4px; }
        .pp-submit:disabled { opacity: .6; cursor: not-allowed; }
        .pp-form-note { font-size: 11px; color: var(--fg-muted); text-align: center; margin-top: 12px; }
        .pp-form-error {
          background: var(--red-bg); border: 1px solid rgba(248,113,113,.2);
          border-radius: var(--radius); padding: 12px 16px;
          font-size: 13px; color: var(--red); margin-bottom: 12px;
        }
        .pp-form-error a { color: var(--red); text-decoration: underline; }

        /* Success */
        .pp-success {
          display: flex; gap: 16px; align-items: flex-start;
          background: var(--green-bg); border: 1px solid rgba(52,211,153,.2);
          border-radius: var(--radius-lg); padding: 24px;
        }
        .pp-success-icon {
          width: 36px; height: 36px; min-width: 36px;
          background: var(--green); color: var(--bg-deep);
          border-radius: 50%; display: flex; align-items: center;
          justify-content: center; font-size: 16px; font-weight: 800;
        }
        .pp-success strong { display: block; margin-bottom: 6px; font-size: 14px; }
        .pp-success p { font-size: 13px; color: var(--fg-secondary); line-height: 1.6; }

        /* FAQ */
        .pp-faq { background: var(--bg-deep); }
        .pp-faq-inner .pp-sh { text-align: center; }
        .pp-faq-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 32px; }
        .pp-faq-item {
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: var(--radius-lg); overflow: hidden;
          transition: border-color .15s;
        }
        .pp-faq-item[open] { border-color: var(--border-strong); }
        .pp-faq-q {
          padding: 18px 20px; font-size: 13px; font-weight: 600;
          cursor: pointer; list-style: none; display: flex;
          justify-content: space-between; align-items: center; gap: 12px;
          user-select: none;
        }
        .pp-faq-q::-webkit-details-marker { display: none; }
        .pp-faq-q::after { content: '+'; color: var(--fg-muted); font-size: 18px; flex-shrink: 0; }
        .pp-faq-item[open] .pp-faq-q::after { content: '−'; }
        .pp-faq-a { padding: 0 20px 18px; font-size: 13px; color: var(--fg-secondary); line-height: 1.65; }
        .pp-faq-cta { display: flex; align-items: center; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .pp-faq-cta p { font-size: 13px; color: var(--fg-secondary); }

        /* Buttons (extends globals .lbtn) */
        .lbtn { display: inline-flex; align-items: center; gap: 6px; padding: 9px 20px; border-radius: var(--radius); font-size: 13px; font-weight: 500; text-decoration: none; border: 1px solid var(--border-strong); color: var(--fg-secondary); background: var(--bg-card); transition: all .15s; cursor: pointer; }
        .lbtn:hover { color: var(--fg); background: var(--bg-card-hover); border-color: var(--border-strong); }
        .lbtn.primary { background: var(--accent); color: #fff; border-color: transparent; }
        .lbtn.primary:hover { background: var(--accent-hover); }

        /* Responsive */
        @media (max-width: 960px) {
          .pp-vp-grid { grid-template-columns: 1fr 1fr; }
          .pp-two-col { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .pp-section { padding: 56px 0; }
          .pp-hero { padding: 64px 0 48px; }
          .pp-container { padding: 0 20px; }
          .pp-vp-grid { grid-template-columns: 1fr; }
          .pp-faq-grid { grid-template-columns: 1fr; }
          .pp-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  )
}
