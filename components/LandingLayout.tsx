import Link from 'next/link'

const NAV = [
  { href: '/alternative-financing#profiles', label: 'Borrower Profiles' },
  { href: '/alternative-financing#verticals', label: 'Specialty Verticals' },
  { href: '/opportunity-engine', label: 'Opportunity Engine' },
  { href: '/alternative-financing#partners', label: 'Partner Network' },
  { href: '/alternative-financing#content', label: 'Resources' },
]

const FOOTER_PROFILES = [
  ['/self-employed-financing', 'Self-Employed'],
  ['/credit-recovery-financing', 'Credit Bruised'],
  ['/new-to-canada-financing', 'New To Canada'],
  ['/high-debt-ratio-financing', 'High Debt Ratios'],
  ['/high-net-worth-financing', 'High Net Worth'],
]
const FOOTER_VERTICALS = [
  ['/special-levy-financing', 'Special Levy'],
  ['/divorce-financing', 'Divorce'],
  ['/reverse-mortgage-solutions', 'Reverse Mortgage'],
  ['/construction-financing', 'Construction'],
  ['/bridge-financing', 'Bridge'],
  ['/investor-financing', 'Investor'],
  ['/private-mortgages', 'Private'],
]
const FOOTER_PARTNERS = [
  ['/accountants', 'Accountants'],
  ['/lawyers', 'Lawyers'],
  ['/financial-planners', 'Financial Planners'],
  ['/insolvency-trustees', 'Insolvency Trustees / Credit Counsellors'],
  ['/realtors', 'Realtors'],
  ['/developers', 'Developers'],
  ['/immigration-consultants', 'Immigration Consultants'],
]

export function LandingNav() {
  return (
    <nav className="lnav" aria-label="Main navigation">
      <input type="checkbox" id="nav-tog" className="nav-tog-input" />
      <div className="lnav-inner">
        <Link href="/alternative-financing" className="lnav-logo">
          <div className="lnav-mark">M</div>
          <div className="lnav-word">
            MIX<span className="lnav-sub">·  Alternative Financing Solutions</span>
          </div>
        </Link>
        <div className="lnav-links">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href}>{n.label}</Link>
          ))}
        </div>
        <div className="lnav-spacer" />
        <Link href="/partner-application" className="lbtn">Refer a Client</Link>
        <Link href="/assessment" className="lbtn primary">Get Qualified →</Link>
        <label htmlFor="nav-tog" className="nav-ham" aria-label="Toggle navigation">☰</label>
      </div>
      <div className="nav-mobile-panel">
        {NAV.map((n) => (
          <Link key={n.href} href={n.href}>{n.label}</Link>
        ))}
        <Link href="/partner-application" className="lbtn" style={{ marginTop: 8 }}>Refer a Client</Link>
        <Link href="/assessment" className="lbtn primary">Get Qualified →</Link>
      </div>
      <style>{`
        .lnav{position:sticky;top:0;z-index:20;background:rgba(13,17,23,.82);backdrop-filter:blur(18px) saturate(1.4);border-bottom:1px solid var(--border)}
        .lnav-inner{display:flex;align-items:center;height:60px;padding:0 32px;gap:24px;max-width:1260px;margin:0 auto}
        .lnav-logo{display:flex;align-items:center;gap:10px;color:inherit;text-decoration:none}
        .lnav-mark{width:32px;height:32px;border-radius:9px;background:linear-gradient(135deg,#4338CA,#6366F1);color:#fff;display:grid;place-items:center;font-weight:800;font-size:14px;letter-spacing:-.02em;box-shadow:0 0 0 4px var(--accent-glow)}
        .lnav-word{font-weight:700;font-size:15px;letter-spacing:-.01em}
        .lnav-sub{color:var(--fg-muted);font-weight:500;margin-left:6px;font-size:12px}
        .lnav-links{display:flex;gap:2px;margin-left:24px}
        .lnav-links a{padding:7px 14px;border-radius:8px;color:var(--fg-secondary);font-size:13px;font-weight:500;transition:all .15s;text-decoration:none}
        .lnav-links a:hover{color:var(--fg);background:var(--bg-card)}
        .lnav-spacer{flex:1}
        .nav-tog-input{display:none}
        .nav-ham{display:none;cursor:pointer;font-size:20px;color:var(--fg-secondary);padding:4px 8px;border-radius:6px;line-height:1;user-select:none}
        .nav-ham:hover{color:var(--fg);background:var(--bg-card)}
        .nav-mobile-panel{display:none;flex-direction:column;gap:4px;padding:12px 20px 16px;border-bottom:1px solid var(--border);background:rgba(13,17,23,.95);max-width:100%}
        .nav-mobile-panel a{padding:10px 14px;border-radius:8px;color:var(--fg-secondary);font-size:14px;font-weight:500;transition:all .15s;text-decoration:none}
        .nav-mobile-panel a:hover{color:var(--fg);background:var(--bg-card)}
        @media (max-width:960px){
          .lnav-links{display:none}
          .lnav-inner{padding:0 20px;gap:12px}
          .nav-ham{display:grid;place-items:center}
          .nav-mobile-panel{display:none;flex-direction:column}
          .nav-tog-input:checked ~ .nav-mobile-panel{display:flex}
          .nav-tog-input:checked ~ .lnav-inner .nav-ham{color:var(--fg)}
        }
        @media (max-width:640px){.lnav-inner .lbtn:not(.primary){display:none}}
      `}</style>
    </nav>
  )
}

export function LandingFooter() {
  return (
    <footer className="lfoot">
      <div className="lfoot-inner">
        <div className="lfoot-grid">
          <div className="lfoot-brand">
            <Link href="/alternative-financing" className="lnav-logo" style={{ marginBottom: 8 }}>
              <div className="lnav-mark">M</div>
              <div className="lnav-word">MIX <span className="lnav-sub">Mortgage Intelligence Exchange</span></div>
            </Link>
            <p>The Alternative Financing Solutions Centre — connecting borrowers, professionals, and financing solutions through the MIX ecosystem.</p>
          </div>
          <div>
            <h5>Borrower Profiles</h5>
            <ul>{FOOTER_PROFILES.map(([h, l]) => <li key={h}><Link href={h}>{l}</Link></li>)}</ul>
          </div>
          <div>
            <h5>Specialty Verticals</h5>
            <ul>{FOOTER_VERTICALS.map(([h, l]) => <li key={h}><Link href={h}>{l}</Link></li>)}</ul>
          </div>
          <div>
            <h5>Partner Network</h5>
            <ul>{FOOTER_PARTNERS.map(([h, l]) => <li key={h}><Link href={h}>{l}</Link></li>)}</ul>
          </div>
        </div>
        <div className="lfoot-legal">
          <div>© 2026 Mortgage Intelligence Exchange (MIX). BC, Canada.</div>
          <div>Alternative Financing Solutions Centre v1.0</div>
        </div>
      </div>
      <style>{`
        .lfoot{padding:56px 0 32px;border-top:1px solid var(--border);margin-top:32px}
        .lfoot-inner{max-width:1260px;margin:0 auto;padding:0 32px}
        .lfoot-grid{display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:32px;margin-bottom:32px}
        .lfoot h5{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:var(--fg-muted);font-weight:600;margin-bottom:14px;font-family:var(--font)}
        .lfoot ul{list-style:none;display:flex;flex-direction:column;gap:8px}
        .lfoot a{color:var(--fg-secondary);font-size:13px;transition:color .15s}
        .lfoot a:hover{color:var(--fg)}
        .lfoot-brand p{font-size:13px;color:var(--fg-secondary);margin-top:12px;max-width:280px;line-height:1.55}
        .lfoot-legal{border-top:1px solid var(--border);padding-top:24px;display:flex;justify-content:space-between;align-items:center;font-size:11px;color:var(--fg-muted)}
        @media (max-width:960px){.lfoot-grid{grid-template-columns:1fr 1fr}}
        @media (max-width:640px){.lfoot-grid{grid-template-columns:1fr}.lfoot-legal{flex-direction:column;gap:8px;text-align:center}}
      `}</style>
    </footer>
  )
}

export function PageStub({ eyebrow, title, summary }: { eyebrow: string; title: string; summary: string }) {
  return (
    <main className="lpage">
      <div className="lpage-inner">
        <span className="lpill">{eyebrow}</span>
        <h1>{title}</h1>
        <p className="llede">{summary}</p>
        <div className="lstatus">
          <div className="lstatus-dot" />
          <span>Coming soon — full intake, partner routing, and content library wiring in Phase 2.</span>
        </div>
        <div className="lcta">
          <Link href="/assessment" className="lbtn primary">Start Assessment</Link>
          <Link href="/alternative-financing" className="lbtn">← Back to Centre</Link>
        </div>
      </div>
      <style>{`
        .lpage{min-height:calc(100vh - 60px);padding:96px 0 72px}
        .lpage-inner{max-width:820px;margin:0 auto;padding:0 32px}
        .lpill{display:inline-flex;align-items:center;gap:7px;font-size:11px;font-weight:500;padding:5px 12px;border-radius:999px;background:var(--accent-soft);color:#A5B4FC;border:1px solid rgba(67,56,202,.25);text-transform:uppercase;letter-spacing:.08em;margin-bottom:24px}
        .lpage h1{font-size:56px;line-height:1.05;letter-spacing:-.035em;font-weight:800;margin-bottom:22px}
        .llede{font-size:18px;color:var(--fg-secondary);line-height:1.55;margin-bottom:32px}
        .lstatus{display:flex;align-items:center;gap:12px;padding:16px 20px;background:var(--bg-card);border:1px solid var(--border);border-radius:12px;margin-bottom:32px;font-size:13px;color:var(--fg-secondary)}
        .lstatus-dot{width:8px;height:8px;border-radius:50%;background:var(--amber);box-shadow:0 0 8px var(--amber)}
        .lcta{display:flex;gap:12px;flex-wrap:wrap}
        @media (max-width:640px){.lpage h1{font-size:36px}}
      `}</style>
    </main>
  )
}
