export const metadata = {
  title: 'Alternative Financing Solutions Centre — MIX',
  description: 'The Mortgage Intelligence Exchange Alternative Financing Solutions Centre. Borrower-profile-driven financing for self-employed, credit-bruised, new-to-Canada, high-debt-ratio, and high-net-worth borrowers.',
}

const PROFILES = [
  { n: '01', h: '/self-employed-financing', t: 'Self-Employed / Business For Self', sub: 'Incorporated owners, contractors, consultants, realtors, entrepreneurs.', sols: ['Alt-A Lending Programs', 'Stated Income Products', 'Bank Statement Programs'] },
  { n: '02', h: '/credit-recovery-financing', t: 'Credit Bruised', sub: 'Divorce, illness, job loss, consumer proposal, bankruptcy recovery.', sols: ['Alternative Lending', 'B-Lender Programs', 'Credit Rebuilding Roadmap'] },
  { n: '03', h: '/new-to-canada-financing', t: 'New To Canada', sub: 'Skilled workers, permanent residents, foreign professionals.', sols: ['New-to-Canada Programs', 'Alternative Financing', 'Down Payment Sourcing'] },
  { n: '04', h: '/high-debt-ratio-financing', t: 'High Debt Ratios', sub: 'Multiple properties, business debt, tax liabilities.', sols: ['Debt Restructuring', 'Alternative Lending', 'Consolidation Financing'] },
  { n: '05', h: '/high-net-worth-financing', t: 'Non-Traditional / High Net Worth', sub: 'Investors, retirees, corporate shareholders, complex structures.', sols: ['Asset-Based Lending', 'Reverse Mortgages', 'Private Lending'] },
]

const VERTICALS = [
  { i: 'SL', h: '/special-levy-financing', t: 'Special Levy Financing', d: 'Condo and strata owners facing unexpected special assessments from building repairs, envelope restoration, or infrastructure upgrades.', a: 'Condo & Strata Owners', r: 'Strata Lawyers, Property Managers, Realtors' },
  { i: 'DV', h: '/divorce-financing', t: 'Divorce Financing', d: 'Helping separating spouses refinance, buy out equity, or qualify for a new home during and after separation.', a: 'Separating Spouses', r: 'Family Lawyers, Mediators' },
  { i: 'RM', h: '/reverse-mortgage-solutions', t: 'Reverse Mortgage Solutions', d: 'CHIP and reverse mortgage products for homeowners 55+ releasing equity without monthly payments.', a: 'Homeowners 55+', r: 'Financial Planners, Estate Lawyers' },
  { i: 'CN', h: '/construction-financing', t: 'Construction Financing', d: 'Progress-draw construction mortgages and draw-based lending for builders, developers, and major renovation projects.', a: 'Builders & Developers', r: 'Realtors, Development Consultants' },
  { i: 'BG', h: '/bridge-financing', t: 'Bridge Financing', d: 'Short-term bridge capital to close on a new purchase before the existing property sells — clearing the moving gap.', a: 'Property Buyers & Sellers', r: 'Realtors, Wealth Advisors' },
  { i: 'IN', h: '/investor-financing', t: 'Investor Financing', d: 'Portfolio lending, rental property financing, and asset-based mortgages for active real estate investors.', a: 'Real Estate Investors', r: 'Accountants, Wealth Advisors' },
  { i: 'PM', h: '/private-mortgages', t: 'Private Mortgages', d: 'First- and second-position private capital for non-qualifying scenarios, fast closings, and complex situations.', a: 'Non-QM Borrowers', r: 'Accountants, Lawyers' },
]

const AGENTS = [
  { i: 'BC', n: 'Borrower Classification Agent', b: 'Core', d: 'Identifies the borrower profile from intake signals and routes to the matching financing workflow.' },
  { i: 'FR', n: 'Financing Recommendation Agent', b: 'Core', d: 'Suggests potential lending categories — Alt-A, B-Lender, private, specialty — based on the borrower profile.' },
  { i: 'RR', n: 'Referral Routing Agent', b: 'Core', d: 'Routes qualified leads to the appropriate workflow, partner, or specialist based on probability and revenue.' },
  { i: 'CR', n: 'Content Recommendation Agent', b: '', d: 'Surfaces the right article, video, or case study at the moment the borrower or partner needs it.' },
  { i: 'OS', n: 'Opportunity Scoring Agent', b: 'Phase 3', d: 'Scores revenue opportunities on lead source, borrower type, financing need, and conversion probability.' },
]

const PARTNERS = [
  { a: 'AC', h: '/accountants', t: 'Accountants', m: 'Income structuring · Corporate filings' },
  { a: 'LW', h: '/lawyers', t: 'Lawyers', m: 'Divorce · Estate · Strata' },
  { a: 'FP', h: '/financial-planners', t: 'Financial Planners', m: 'Retirement · Equity release' },
  { a: 'IT', h: '/insolvency-trustees', t: 'Insolvency Trustees', m: 'Proposal · Bankruptcy' },
  { a: 'RT', h: '/realtors', t: 'Realtors', m: 'Buyer qualification · Special levies' },
  { a: 'DV', h: '/developers', t: 'Developers', m: 'Construction · Project finance' },
  { a: 'IC', h: '/immigration-consultants', t: 'Immigration Consultants', m: 'New-to-Canada programs' },
]

const FEED = [
  { who: 'S. Chen · Vancouver', meta: 'Self-employed · 18% probability', tag: 'NEW' },
  { who: 'M. Patel · Surrey', meta: 'New-to-Canada · Stated income', tag: 'SCORED', cls: 'pur' },
  { who: 'R. Tremblay · Burnaby', meta: 'Credit recovery · B-Lender', tag: 'REVIEW', cls: 'amb' },
  { who: 'L. Wong · Richmond', meta: 'Investor portfolio · 4 properties', tag: 'QUALIFIED' },
  { who: 'A. Bekova · Coquitlam', meta: 'Reverse mortgage · Age 67', tag: 'FUNDED' },
]

const CONTENT = [
  { tag: 'FEATURED GUIDE', time: '12 min read', t: "The Self-Employed Borrower's Complete Guide to Alt-A Mortgage Qualification in BC", d: 'How incorporated business owners, contractors, and consultants can qualify using bank statements, stated income, and retained earnings — and when each program makes sense.', foot: 'Borrower Profile · Self-Employed', feat: true },
  { tag: 'CASE STUDY', time: '8 min', t: '$1.4M construction draw schedule: how a Burnaby developer closed in 47 days', foot: 'Vertical · Construction' },
  { tag: 'VIDEO', time: '14 min', t: "Reverse mortgages in 2026: who qualifies, who doesn't, and the family conversation", foot: 'Vertical · Reverse Mortgage' },
  { tag: 'PARTNER BRIEF', time: '6 min', t: "For accountants: when to refer a client before the year-end tax scramble", foot: 'Partner · Accountants' },
  { tag: 'CHECKLIST', time: '2 min', t: 'New-to-Canada mortgage readiness checklist: 12 documents lenders will ask for', foot: 'Profile · New to Canada' },
]

const METRICS = [
  { l: 'Qualified Leads / Month', v: '50+', s: 'Target — Phase 1', a: true },
  { l: 'Application Conversion', v: '20%', s: 'From qualified lead', a: false },
  { l: 'Approval Rate', v: '10%', s: 'From application', a: false },
  { l: 'Active Referral Partners', v: '25', s: '5 new per quarter', a: true },
  { l: 'Annual Alt Mortgage Volume', v: '$10M+', s: 'Phase 3 target', a: true },
]

import { LandingNav, LandingFooter } from '@/components/LandingLayout'
import { OpportunityDetection } from '@/components/OpportunityDetection'
import Link from 'next/link'

export default function AlternativeFinancingPage() {
  return (
    <>
      <LandingNav />
      <style>{`
        body{background-image:radial-gradient(1200px 600px at 75% -10%,rgba(67,56,202,.18),transparent 60%),radial-gradient(900px 500px at 0% 30%,rgba(99,102,241,.08),transparent 60%);background-attachment:fixed}
        .shell{max-width:1260px;margin:0 auto;padding:0 32px}
        .pill{display:inline-flex;align-items:center;gap:7px;font-size:11px;font-weight:500;padding:5px 12px;border-radius:999px;background:var(--accent-soft);color:#A5B4FC;border:1px solid rgba(67,56,202,.25);text-transform:uppercase;letter-spacing:.08em}
        .pill::before{content:"";width:5px;height:5px;border-radius:50%;background:#818CF8;box-shadow:0 0 8px #818CF8}
        .hero{padding:96px 0 72px;position:relative}
        .hero-grid{display:grid;grid-template-columns:1.25fr .75fr;gap:48px;align-items:center}
        .hero h1{font-size:64px;line-height:1.02;letter-spacing:-.035em;font-weight:800;margin:20px 0 22px}
        .hero h1 .grad{background:linear-gradient(135deg,#A78BFA 0%,#6366F1 50%,#4338CA 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .hero p.lede{font-size:18px;color:var(--fg-secondary);max-width:620px;line-height:1.55}
        .hero-ctas{display:flex;gap:12px;margin-top:32px;flex-wrap:wrap}
        .hero-stats{display:flex;gap:32px;margin-top:48px;flex-wrap:wrap}
        .hero-stat .num{font-size:28px;font-weight:800;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
        .hero-stat .num.acc{color:#A78BFA}
        .hero-stat .lbl{font-size:11px;color:var(--fg-muted);text-transform:uppercase;letter-spacing:.07em;margin-top:2px}
        .hero-card{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-xl);padding:22px;box-shadow:var(--shadow-elevate);position:relative;overflow:hidden}
        .hero-card::before{content:"";position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(167,139,250,.5),transparent)}
        .hero-card .label{font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:var(--fg-muted);font-weight:600;margin-bottom:14px;display:flex;justify-content:space-between;align-items:center}
        .hero-card .label .live{display:inline-flex;align-items:center;gap:6px;font-size:10px;color:var(--green);text-transform:none;letter-spacing:0}
        .hero-card .label .live::before{content:"";width:5px;height:5px;border-radius:50%;background:var(--green);box-shadow:0 0 8px var(--green);animation:pulse 2s infinite}
        @keyframes pulse{0%{box-shadow:0 0 0 0 rgba(52,211,153,.5)}70%{box-shadow:0 0 0 8px rgba(52,211,153,0)}100%{box-shadow:0 0 0 0 rgba(52,211,153,0)}}
        .hero-card .row{display:flex;align-items:center;justify-content:space-between;padding:11px 0;border-bottom:1px solid var(--border);font-size:13px}
        .hero-card .row:last-child{border-bottom:none}
        .hero-card .row .meta{color:var(--fg-muted);font-size:11px}
        .hero-card .row .val{font-weight:600;color:var(--fg);font-variant-numeric:tabular-nums}
        .hero-card .row .tag{font-size:10px;padding:2px 8px;border-radius:5px;font-weight:600;background:var(--green-bg);color:var(--green);text-transform:uppercase;letter-spacing:.06em}
        .hero-card .row .tag.pur{background:var(--purple-bg);color:var(--purple)}
        .hero-card .row .tag.amb{background:var(--amber-bg);color:var(--amber)}
        section{padding:88px 0;position:relative}
        .sec-hd{margin-bottom:48px;max-width:760px}
        .sec-hd .eyebrow{font-size:11px;text-transform:uppercase;letter-spacing:.12em;color:#A78BFA;font-weight:600;margin-bottom:14px;display:flex;align-items:center;gap:10px}
        .sec-hd .eyebrow::before{content:"";width:18px;height:1px;background:#818CF8}
        .sec-hd h2{font-size:44px;line-height:1.05;letter-spacing:-.03em;font-weight:800;margin-bottom:14px}
        .sec-hd p{font-size:16px;color:var(--fg-secondary);line-height:1.6}
        .profiles{display:grid;grid-template-columns:repeat(5,1fr);gap:14px}
        .profile{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-xl);padding:24px 22px;box-shadow:var(--shadow-glass);position:relative;transition:all .2s;display:flex;flex-direction:column;min-height:380px;color:inherit}
        .profile:hover{background:var(--bg-card-hover);border-color:var(--border-strong);box-shadow:var(--shadow-glass),var(--shadow-elevate);transform:translateY(-2px)}
        .profile .num{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,var(--accent-soft),rgba(167,139,250,.18));border:1px solid var(--accent-glow);color:#A5B4FC;font-weight:700;font-size:13px;display:grid;place-items:center;margin-bottom:18px;font-variant-numeric:tabular-nums}
        .profile h3{font-size:18px;font-weight:700;letter-spacing:-.01em;margin-bottom:6px;line-height:1.2}
        .profile .sub{font-size:12px;color:var(--fg-muted);margin-bottom:18px}
        .profile .tag{font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:#A5B4FC;font-weight:600;margin-bottom:10px}
        .profile ul{list-style:none;display:flex;flex-direction:column;gap:6px;margin-top:auto}
        .profile li{font-size:12px;color:var(--fg-secondary);display:flex;gap:8px;align-items:flex-start;line-height:1.45}
        .profile li::before{content:"→";color:var(--accent);font-weight:700;flex-shrink:0}
        .profile .arrow{position:absolute;top:22px;right:22px;font-size:14px;color:var(--fg-muted);transition:all .2s}
        .profile:hover .arrow{color:var(--accent);transform:translateX(3px)}
        .verticals{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
        .vertical{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-xl);padding:24px;box-shadow:var(--shadow-glass);transition:all .2s;position:relative;display:flex;flex-direction:column;gap:18px;min-height:240px;color:inherit}
        .vertical:hover{background:var(--bg-card-hover);border-color:var(--border-strong);transform:translateY(-2px);box-shadow:var(--shadow-glass),var(--shadow-elevate)}
        .vertical .icon{width:42px;height:42px;border-radius:11px;display:grid;place-items:center;background:var(--accent-soft);border:1px solid var(--accent-glow);color:#A5B4FC;font-size:20px;font-weight:700}
        .vertical h3{font-size:18px;font-weight:700;letter-spacing:-.01em}
        .vertical p{font-size:13px;color:var(--fg-secondary);line-height:1.55}
        .vertical .meta{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:auto;padding-top:14px;border-top:1px solid var(--border)}
        .vertical .meta .col .lbl{font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:var(--fg-muted);font-weight:600;margin-bottom:4px}
        .vertical .meta .col .val{font-size:12px;color:var(--fg);font-weight:500;line-height:1.4}
        .split{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start}
        .ai-panel{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-xl);padding:28px;box-shadow:var(--shadow-glass)}
        .ai-panel::before{content:"";display:block;height:1px;margin:-28px -28px 22px;background:linear-gradient(90deg,transparent,var(--accent-glow),transparent)}
        .agent{display:flex;gap:14px;padding:16px 0;border-bottom:1px solid var(--border)}
        .agent:last-child{border-bottom:none}
        .agent .ico{width:36px;height:36px;border-radius:9px;flex-shrink:0;background:var(--bg-elevated);border:1px solid var(--border-strong);display:grid;place-items:center;color:#A5B4FC;font-weight:700;font-size:14px;font-family:ui-monospace,SFMono-Regular,monospace}
        .agent .body{flex:1}
        .agent .body .nm{font-size:13px;font-weight:600;color:var(--fg);margin-bottom:3px;display:flex;align-items:center;gap:8px}
        .agent .body .nm .badge{font-size:9px;text-transform:uppercase;letter-spacing:.08em;background:var(--accent-soft);color:#A5B4FC;padding:2px 7px;border-radius:4px;font-weight:600}
        .agent .body .ds{font-size:12px;color:var(--fg-secondary);line-height:1.5}
        .intake{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-xl);padding:24px;box-shadow:var(--shadow-glass)}
        .intake .step{display:flex;align-items:center;gap:10px;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:var(--fg-muted);font-weight:600;margin-bottom:18px}
        .intake .step .num{width:20px;height:20px;border-radius:50%;background:var(--accent);color:#fff;display:grid;place-items:center;font-size:10px;font-weight:700}
        .intake h4{font-size:14px;font-weight:600;margin-bottom:16px}
        .intake .q{display:flex;align-items:center;justify-content:space-between;padding:11px 14px;background:var(--bg);border:1px solid var(--border);border-radius:10px;margin-bottom:8px;font-size:13px}
        .intake .q .opts{display:flex;gap:6px;flex-wrap:wrap}
        .intake .q .chip{font-size:11px;padding:4px 10px;border-radius:6px;background:var(--bg-card);border:1px solid var(--border);color:var(--fg-secondary)}
        .intake .q .chip.on{background:var(--accent-soft);color:#A5B4FC;border-color:var(--accent-glow)}
        .intake .result{margin-top:18px;padding:16px;border-radius:12px;background:linear-gradient(135deg,rgba(67,56,202,.16),rgba(99,102,241,.08));border:1px solid var(--accent-glow)}
        .intake .result .lbl{font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:#A5B4FC;font-weight:700;margin-bottom:6px}
        .intake .result .val{font-size:16px;font-weight:700;color:var(--fg);margin-bottom:4px}
        .intake .result .next{font-size:12px;color:var(--fg-secondary)}
        .pan{display:grid;grid-template-columns:repeat(7,1fr);gap:14px}
        .partner{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-xl);padding:24px 18px;box-shadow:var(--shadow-glass);transition:all .2s;text-align:center;display:flex;flex-direction:column;align-items:center;gap:12px;color:inherit}
        .partner:hover{background:var(--bg-card-hover);border-color:var(--border-strong);transform:translateY(-2px);box-shadow:var(--shadow-glass),var(--shadow-elevate)}
        .partner .av{width:48px;height:48px;border-radius:12px;background:linear-gradient(135deg,var(--accent-soft),rgba(167,139,250,.18));border:1px solid var(--accent-glow);color:#A5B4FC;display:grid;place-items:center;font-weight:700;font-size:14px;letter-spacing:-.01em}
        .partner h4{font-size:14px;font-weight:600;line-height:1.2}
        .partner .meta{font-size:11px;color:var(--fg-muted)}
        .content-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:14px}
        .content-card{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-xl);padding:24px;box-shadow:var(--shadow-glass);transition:all .2s;display:flex;flex-direction:column;gap:14px;position:relative;overflow:hidden;color:inherit}
        .content-card:hover{background:var(--bg-card-hover);border-color:var(--border-strong);transform:translateY(-2px);box-shadow:var(--shadow-glass),var(--shadow-elevate)}
        .content-card.featured{grid-row:span 2;background:linear-gradient(135deg,rgba(67,56,202,.10),rgba(99,102,241,.04));border-color:rgba(67,56,202,.25)}
        .content-card.featured::before{content:"";position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,#A78BFA,transparent)}
        .content-card .tag{font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:#A5B4FC;font-weight:600;display:flex;align-items:center;gap:8px}
        .content-card .tag .time{margin-left:auto;color:var(--fg-muted);font-weight:500}
        .content-card h4{font-size:18px;font-weight:700;letter-spacing:-.01em;line-height:1.25}
        .content-card.featured h4{font-size:22px}
        .content-card p{font-size:13px;color:var(--fg-secondary);line-height:1.55}
        .content-card .footer{margin-top:auto;display:flex;align-items:center;justify-content:space-between;font-size:11px;color:var(--fg-muted)}
        .content-card .footer .arrow{color:var(--accent);font-weight:600}
        .metrics{display:grid;grid-template-columns:repeat(5,1fr);gap:14px;margin-top:48px}
        .metric{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-xl);padding:22px;box-shadow:var(--shadow-glass)}
        .metric .lbl{font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:var(--fg-muted);font-weight:600;margin-bottom:10px}
        .metric .val{font-size:32px;font-weight:800;letter-spacing:-.03em;font-variant-numeric:tabular-nums;line-height:1}
        .metric .val.acc{background:linear-gradient(135deg,#A78BFA,#6366F1);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .metric .sub{font-size:11px;color:var(--fg-muted);margin-top:6px}
        .cta-strip{background:linear-gradient(135deg,rgba(67,56,202,.22),rgba(99,102,241,.10));border:1px solid var(--accent-glow);border-radius:24px;padding:48px;display:grid;grid-template-columns:1.5fr 1fr;gap:32px;align-items:center;position:relative;overflow:hidden}
        .cta-strip::before{content:"";position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,#A78BFA,transparent)}
        .cta-strip h3{font-size:32px;font-weight:800;letter-spacing:-.02em;line-height:1.1;margin-bottom:14px}
        .cta-strip p{font-size:15px;color:var(--fg-secondary);line-height:1.55;max-width:540px}
        .cta-strip .actions{display:flex;flex-direction:column;gap:12px}
        .cta-strip .actions .lbtn{padding:12px 20px;justify-content:center;font-size:14px}
        .content-card{cursor:default}
        @media (max-width:1100px){.profiles{grid-template-columns:repeat(3,1fr)}.pan{grid-template-columns:repeat(4,1fr)}.metrics{grid-template-columns:repeat(3,1fr)}}
        @media (max-width:960px){.shell{padding:0 20px}.hero{padding:64px 0 48px}.hero-grid{grid-template-columns:1fr;gap:32px}.hero h1{font-size:46px}.profiles{grid-template-columns:repeat(2,1fr)}.verticals{grid-template-columns:repeat(2,1fr)}.split{grid-template-columns:1fr;gap:32px}.content-grid{grid-template-columns:1fr 1fr}.content-card.featured{grid-column:span 2;grid-row:auto}.cta-strip{grid-template-columns:1fr;padding:32px}.pan{grid-template-columns:repeat(3,1fr)}}
        @media (max-width:640px){.hero h1{font-size:36px}.profiles{grid-template-columns:1fr}.verticals{grid-template-columns:1fr}.pan{grid-template-columns:repeat(2,1fr)}.content-grid{grid-template-columns:1fr}.content-card.featured{grid-column:auto}.metrics{grid-template-columns:1fr 1fr}section{padding:56px 0}.sec-hd h2{font-size:32px}.cta-strip h3{font-size:24px}}
      `}</style>

      <header className="hero">
        <div className="shell">
          <div className="hero-grid">
            <div>
              <span className="pill">Alternative Financing Solutions Centre</span>
              <h1>Financing built around <span className="grad">your borrower&apos;s reality</span> — not the bank&apos;s checklist.</h1>
              <p className="lede">The Mortgage Intelligence Exchange (MIX) connects consumers, realtors, accountants, lawyers, financial planners, trustees, immigration consultants, and developers around non-traditional financing opportunities. Five borrower profiles. Seven specialty verticals. One intelligent referral engine.</p>
              <div className="hero-ctas">
                <Link href="#profiles" className="lbtn primary">Explore Borrower Profiles</Link>
                <Link href="#partners" className="lbtn">Join the Partner Network</Link>
                <Link href="#ai" className="lbtn">See MIX Intelligence →</Link>
              </div>
              <div className="hero-stats">
                <div className="hero-stat"><div className="num acc">50+</div><div className="lbl">Qualified Leads / Month</div></div>
                <div className="hero-stat"><div className="num">25</div><div className="lbl">Active Referral Partners</div></div>
                <div className="hero-stat"><div className="num">$10M+</div><div className="lbl">Annual Alt Mortgage Volume</div></div>
                <div className="hero-stat"><div className="num">20%</div><div className="lbl">Application Conversion</div></div>
              </div>
            </div>
            <aside className="hero-card">
              <div className="label"><span>Live Opportunity Feed</span><span className="live">Live</span></div>
              {FEED.map((r, i) => (
                <div key={i} className="row">
                  <div>
                    <div>{r.who}</div>
                    <div className="meta">{r.meta}</div>
                  </div>
                  <div className={`tag${r.cls ? ' ' + r.cls : ''}`}>{r.tag}</div>
                </div>
              ))}
            </aside>
          </div>
        </div>
      </header>

      <section id="profiles">
        <div className="shell">
          <div className="sec-hd">
            <div className="eyebrow">Five Borrower Profiles</div>
            <h2>The borrower&apos;s situation comes first. The product follows.</h2>
            <p>Every qualifying conversation starts with one of five borrower profiles. MIX classifies, scores, and routes the opportunity to the financing category most likely to fund — across Alt-A, B-Lenders, private, and specialty programs.</p>
          </div>
          <div className="profiles">
            {PROFILES.map((p) => (
              <Link key={p.n} href={p.h} className="profile">
                <div className="num">{p.n}</div>
                <span className="arrow">→</span>
                <h3>{p.t}</h3>
                <p className="sub">{p.sub}</p>
                <div className="tag">Financing Solutions</div>
                <ul>{p.sols.map((s) => <li key={s}>{s}</li>)}</ul>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="verticals" style={{ paddingTop: 24 }}>
        <div className="shell">
          <div className="sec-hd">
            <div className="eyebrow">Seven Specialty Verticals</div>
            <h2>Beyond standard mortgages — purpose-built financing lines.</h2>
            <p>Each vertical is a dedicated referral channel with its own partner profile, lead capture, content library, and analytics dashboard — wired into the Professional Alliance Network.</p>
          </div>
          <div className="verticals">
            {VERTICALS.map((v) => (
              <Link key={v.i} href={v.h} className="vertical">
                <div className="icon">{v.i}</div>
                <h3>{v.t}</h3>
                <p>{v.d}</p>
                <div className="meta">
                  <div className="col"><div className="lbl">Audience</div><div className="val">{v.a}</div></div>
                  <div className="col"><div className="lbl">Referral Sources</div><div className="val">{v.r}</div></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <OpportunityDetection />

      <section id="ai">
        <div className="shell">
          <div className="sec-hd">
            <div className="eyebrow">MIX Intelligence Layer</div>
            <h2>Five agents, one qualification engine.</h2>
            <p>From intake to funding, MIX Intelligence classifies the borrower, recommends financing categories, routes the lead to the right workflow, surfaces educational content, and scores the revenue opportunity in real time.</p>
          </div>
          <div className="split">
            <div className="ai-panel">
              {AGENTS.map((a) => (
                <div key={a.i} className="agent">
                  <div className="ico">{a.i}</div>
                  <div className="body">
                    <div className="nm">{a.n}{a.b && <span className="badge">{a.b}</span>}</div>
                    <div className="ds">{a.d}</div>
                  </div>
                </div>
              ))}
            </div>
            <aside className="intake">
              <div className="step"><span className="num">1</span> Borrower Intake</div>
              <h4>Tell us about the borrower — get an instant profile.</h4>
              <div className="q">Employment type <div className="opts"><span className="chip on">Self-employed</span><span className="chip">Salaried</span></div></div>
              <div className="q">Time in Canada <div className="opts"><span className="chip on">2 years</span><span className="chip">5+</span></div></div>
              <div className="q">Credit event <div className="opts"><span className="chip">None</span><span className="chip on">Consumer proposal</span></div></div>
              <div className="q">Properties owned <div className="opts"><span className="chip">1</span><span className="chip on">3+</span></div></div>
              <div className="result">
                <div className="lbl">MIX Classification</div>
                <div className="val">Credit Bruised + Investor</div>
                <div className="next">→ Routed to B-Lender Programs · Score 78 · Revenue est. $4,200</div>
              </div>
            </aside>
          </div>
          <div className="metrics">
            {METRICS.map((m) => (
              <div key={m.l} className="metric">
                <div className="lbl">{m.l}</div>
                <div className={`val${m.a ? ' acc' : ''}`}>{m.v}</div>
                <div className="sub">{m.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="partners">
        <div className="shell">
          <div className="sec-hd">
            <div className="eyebrow">Professional Alliance Network (PAN)</div>
            <h2>Every vertical ships with a complete partner channel.</h2>
            <p>Every specialty includes a partner profile, referral page, educational hub, lead capture, tracking dashboard, content library, and referral analytics — ready for accountants, lawyers, financial planners, trustees, realtors, and developers to plug into.</p>
          </div>
          <div className="pan">
            {PARTNERS.map((p) => (
              <Link key={p.a} href={p.h} className="partner">
                <div className="av">{p.a}</div>
                <h4>{p.t}</h4>
                <div className="meta">{p.m}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="content">
        <div className="shell">
          <div className="sec-hd">
            <div className="eyebrow">Content Library &amp; GTM Engine</div>
            <h2>Educational authority that compounds into referrals.</h2>
            <p>Articles, guides, videos, case studies, FAQs, and checklists — published through educational, referral, partner, retargeting, newsletter, and webinar campaigns. Every asset is a referral magnet, tagged to a borrower profile and partner vertical.</p>
          </div>
          <div className="content-grid">
            {CONTENT.map((c, i) => (
              <article key={i} className={`content-card${c.feat ? ' featured' : ''}`}>
                <div className="tag">{c.tag}<span className="time">{c.time}</span></div>
                <h4>{c.t}</h4>
                {c.d && <p>{c.d}</p>}
                <div className="footer"><span>{c.foot}</span>{c.feat && <span className="arrow">Featured guide</span>}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="cta" style={{ paddingTop: 24 }}>
        <div className="shell">
          <div className="cta-strip">
            <div>
              <span className="pill" style={{ marginBottom: 18, display: 'inline-flex' }}>Two Doors, One Engine</span>
              <h3>Whether you have a borrower or you&apos;re a professional — there&apos;s a place for you in the network.</h3>
              <p>Consumers get matched to financing in minutes. Referral partners get a tracked deal, educational content, and a clear path from introduction to funded transaction. Both paths run on the same MIX Intelligence engine.</p>
            </div>
            <div className="actions">
              <Link href="/assessment" className="lbtn primary">Start Borrower Assessment →</Link>
              <Link href="/partner-application" className="lbtn">Apply to Partner Network</Link>
              <Link href="/contact" className="lbtn">Talk to the MIX Team</Link>
            </div>
          </div>
        </div>
      </section>

      <LandingFooter />
    </>
  )
}
