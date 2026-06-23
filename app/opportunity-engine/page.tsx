import type { Metadata } from 'next'
import { LandingNav, LandingFooter } from '@/components/LandingLayout'
import { OpportunityScorer } from '@/components/OpportunityScorer'
import { SIGNALS, PROFILE_OPTIONS } from '@/lib/opportunity-data'

export const metadata: Metadata = {
  title: 'Opportunity Engine — MIX',
  description: 'Interactive MIX Opportunity Detection Engine. Score alt-financing opportunities across borrower profile, signals, financing problem, and referral source.',
}

const INPUTS = ['Referral conversations', 'Discovery calls', 'Intake forms', 'Email analysis', 'CRM notes', 'Partner referrals']
const OUTPUTS = [
  ['Borrower classification', 'Self-Employed / Credit Bruised / N2C / HDA / HNW'],
  ['Financing problem classification', 'Debt consolidation, bridge, equity, construction, reverse, investment'],
  ['Lending strategy recommendation', 'Alt-A · B-Lender · Private · Specialty'],
  ['Referral source attribution', 'Accountant · Lawyer · Planner · Trustee · Realtor · Developer'],
  ['Revenue opportunity score', '0–100 with HOT / WARM / QUALIFIED / REVIEW / COLD tiers'],
]

export default function OpportunityEnginePage() {
  return (
    <>
      <LandingNav />
      <style>{`
        .oep-hero{padding:64px 0 32px;max-width:1260px;margin:0 auto;padding-left:32px;padding-right:32px}
        .oep-hero .pill{display:inline-flex;align-items:center;gap:7px;font-size:11px;font-weight:500;padding:5px 12px;border-radius:999px;background:var(--accent-soft);color:#A5B4FC;border:1px solid rgba(67,56,202,.25);text-transform:uppercase;letter-spacing:.08em;margin-bottom:18px}
        .oep-hero h1{font-size:52px;line-height:1.05;letter-spacing:-.035em;font-weight:800;margin-bottom:18px}
        .oep-hero h1 .grad{background:linear-gradient(135deg,#A78BFA 0%,#6366F1 50%,#4338CA 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .oep-hero p{font-size:17px;color:var(--fg-secondary);max-width:780px;line-height:1.55}
        .oep-section{padding:48px 0;max-width:1260px;margin:0 auto;padding-left:32px;padding-right:32px}
        .oep-section .eyebrow{font-size:11px;text-transform:uppercase;letter-spacing:.12em;color:#A78BFA;font-weight:600;margin-bottom:12px;display:flex;align-items:center;gap:10px}
        .oep-section .eyebrow::before{content:"";width:18px;height:1px;background:#818CF8}
        .oep-section h2{font-size:34px;line-height:1.1;letter-spacing:-.025em;font-weight:800;margin-bottom:14px}
        .oep-section p.lede{font-size:15px;color:var(--fg-secondary);line-height:1.6;max-width:780px;margin-bottom:32px}

        .oep-signals{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
        .oep-sig{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-xl);padding:22px;box-shadow:var(--shadow-glass);position:relative;display:flex;flex-direction:column;gap:12px;min-height:280px}
        .oep-sig .num{position:absolute;top:18px;right:20px;font-size:11px;font-weight:700;color:#A5B4FC;background:var(--accent-soft);border:1px solid var(--accent-glow);border-radius:5px;padding:2px 7px;font-variant-numeric:tabular-nums}
        .oep-sig h3{font-size:16px;font-weight:700;letter-spacing:-.01em;line-height:1.2;padding-right:32px}
        .oep-sig .lbl{font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:var(--fg-muted);font-weight:600;margin-bottom:4px}
        .oep-sig ul{list-style:none;display:flex;flex-direction:column;gap:4px}
        .oep-sig li{font-size:11px;color:var(--fg-secondary);line-height:1.45}
        .oep-sig li::before{content:"•";color:var(--accent);margin-right:5px;font-weight:700}
        .oep-sig .sols{display:flex;flex-wrap:wrap;gap:4px;margin-top:auto;padding-top:12px;border-top:1px solid var(--border)}
        .oep-sig .sol{font-size:10px;padding:3px 8px;border-radius:5px;background:var(--bg-elevated);color:#A5B4FC;border:1px solid var(--border);font-weight:500}

        .oep-io{display:grid;grid-template-columns:1fr 1fr;gap:18px}
        .oep-pane{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-xl);padding:24px;box-shadow:var(--shadow-glass)}
        .oep-pane h3{font-size:13px;text-transform:uppercase;letter-spacing:.08em;color:var(--fg-muted);font-weight:600;margin-bottom:14px}
        .oep-pane ul{list-style:none;display:flex;flex-direction:column;gap:9px}
        .oep-pane li{font-size:13px;color:var(--fg-secondary);display:flex;gap:9px;align-items:flex-start;line-height:1.4}
        .oep-pane li::before{content:"→";color:var(--accent);font-weight:700;flex-shrink:0;margin-top:1px}
        .oep-pane .out-title{font-size:14px;font-weight:600;color:var(--fg);margin-bottom:3px;display:block}
        .oep-pane .out-sub{font-size:11px;color:var(--fg-muted)}

        .oep-profiles{display:grid;grid-template-columns:repeat(5,1fr);gap:14px}
        .oep-prof{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-xl);padding:18px;box-shadow:var(--shadow-glass);text-align:center;display:flex;flex-direction:column;align-items:center;gap:8px}
        .oep-prof .pts{font-size:22px;font-weight:800;letter-spacing:-.02em;font-variant-numeric:tabular-nums;color:#A78BFA}
        .oep-prof .lbl{font-size:12px;font-weight:600;color:var(--fg)}
        .oep-prof .sub{font-size:10px;color:var(--fg-muted)}

        .oep-cta{margin-top:32px;padding:32px;background:linear-gradient(135deg,rgba(67,56,202,.18),rgba(99,102,241,.06));border:1px solid var(--accent-glow);border-radius:18px;display:flex;justify-content:space-between;align-items:center;gap:24px;flex-wrap:wrap}
        .oep-cta h3{font-size:22px;font-weight:800;letter-spacing:-.01em;margin-bottom:6px}
        .oep-cta p{font-size:13px;color:var(--fg-secondary);max-width:520px;line-height:1.5}
        .oep-cta .btns{display:flex;gap:10px;flex-wrap:wrap}
        .oep-cta .btn{padding:11px 18px;font-size:13px}

        .oep-cta .btn{display:inline-flex;align-items:center;gap:7px;padding:8px 16px;font-size:13px;font-weight:500;border-radius:10px;cursor:pointer;border:1px solid var(--border-strong);background:transparent;color:var(--fg-secondary);font-family:inherit;transition:all .15s}
        .oep-cta .btn:hover{background:var(--bg-card);color:var(--fg)}
        .oep-cta .btn.primary{background:var(--accent);color:#fff;border-color:transparent;box-shadow:0 0 0 4px var(--accent-glow)}
        .oep-cta .btn.primary:hover{background:var(--accent-hover)}

        @media (max-width:1100px){.oep-signals{grid-template-columns:repeat(2,1fr)}.oep-profiles{grid-template-columns:repeat(3,1fr)}}
        @media (max-width:960px){.oep-io{grid-template-columns:1fr}.oep-hero h1{font-size:38px}}
        @media (max-width:640px){.oep-signals{grid-template-columns:1fr}.oep-profiles{grid-template-columns:1fr 1fr}.oep-section h2{font-size:26px}.oep-hero h1{font-size:32px}}
      `}</style>

      <header className="oep-hero">
        <span className="pill">MIX Opportunity Detection Engine</span>
        <h1>Score every Alt-A opportunity <span className="grad">before the bank decline.</span></h1>
        <p>The interactive tool below runs the same scoring model MIX uses in production. Pick a borrower profile, check the signals your partner has already detected, and see the live opportunity score, tier, recommended strategy, and routing — in real time.</p>
      </header>

      <section className="oep-section">
        <div className="eyebrow">Live Scoring Tool</div>
        <h2>Score a lead in under 60 seconds.</h2>
        <p className="lede">Use the form to classify a lead. The result panel updates instantly. Load the John Smith example to see a high-conviction self-employed alt-financing case, or build your own.</p>
        <OpportunityScorer />
      </section>

      <section className="oep-section">
        <div className="eyebrow">The 4 Primary Signals</div>
        <h2>How referral partners detect opportunities.</h2>
        <p className="lede">Realtors, accountants, lawyers, financial planners, trustees, and brokers are trained to listen for these four statements. When a borrower says one of them, a MIX opportunity is born.</p>
        <div className="oep-signals">
          {SIGNALS.map(s => (
            <div key={s.id} className="oep-sig">
              <span className="num">{s.num}</span>
              <h3>{s.title}</h3>
              <div>
                <div className="lbl">Common statements</div>
                <ul>{s.statements.slice(0, 3).map(st => <li key={st}>"{st}"</li>)}</ul>
              </div>
              <div className="sols">
                {s.solutions.map(sol => <span key={sol} className="sol">{sol}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="oep-section">
        <div className="eyebrow">Inputs &amp; Outputs</div>
        <h2>What flows in. What comes out.</h2>
        <p className="lede">MIX reads from every channel where a borrower signals a financing problem, then produces a fully classified, scored, and routed opportunity record.</p>
        <div className="oep-io">
          <div className="oep-pane">
            <h3>Inputs</h3>
            <ul>
              {INPUTS.map(i => <li key={i}>{i}</li>)}
            </ul>
          </div>
          <div className="oep-pane">
            <h3>Outputs</h3>
            <ul>
              {OUTPUTS.map(([t, s]) => (
                <li key={t}><div><span className="out-title">{t}</span><span className="out-sub">{s}</span></div></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="oep-section">
        <div className="eyebrow">Profile Score · / 25</div>
        <h2>Five borrower profiles, weighted equally.</h2>
        <p className="lede">Each profile maps to a primary specialty vertical, a default strategy, and an estimated revenue band. The profile component is worth 25 points of the 100-point total opportunity score.</p>
        <div className="oep-profiles">
          {PROFILE_OPTIONS.map(p => (
            <div key={p.id} className="oep-prof">
              <div className="pts">25</div>
              <div className="lbl">{p.label}</div>
              <div className="sub">profile score</div>
            </div>
          ))}
        </div>
      </section>

      <section className="oep-section">
        <div className="oep-cta">
          <div>
            <h3>This is bigger than a landing page.</h3>
            <p>The Opportunity Detection Engine is the underwriting mindset of a top Alt-A lender translated into a GTM intelligence system. Wire it into your referral partner workflows and train the network to detect opportunities before the bank decline.</p>
          </div>
          <div className="btns">
            <a href="/assessment" className="btn primary">Start Full Assessment →</a>
            <a href="/partner-application" className="btn">Partner Network</a>
            <a href="/contact" className="btn">Talk to MIX</a>
          </div>
        </div>
      </section>

      <LandingFooter />
    </>
  )
}
