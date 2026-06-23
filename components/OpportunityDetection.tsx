import Link from 'next/link'
import { SIGNALS, PROFILE_OPTIONS } from '@/lib/opportunity-data'

export function OpportunityDetection() {
  return (
    <section id="detection" style={{ paddingTop: 24 }}>
      <div className="shell">
        <style>{`
          .odet-head{margin-bottom:48px;max-width:820px}
          .odet-head .eyebrow{font-size:11px;text-transform:uppercase;letter-spacing:.12em;color:#A78BFA;font-weight:600;margin-bottom:14px;display:flex;align-items:center;gap:10px}
          .odet-head .eyebrow::before{content:"";width:18px;height:1px;background:#818CF8}
          .odet-head h2{font-size:44px;line-height:1.05;letter-spacing:-.03em;font-weight:800;margin-bottom:14px}
          .odet-head p{font-size:16px;color:var(--fg-secondary);line-height:1.6}
          .odet-head .hl{color:#A5B4FC;font-weight:600}

          .odet-engine{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:32px}
          .odet-sig{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-xl);padding:22px;box-shadow:var(--shadow-glass);transition:all .2s;position:relative;display:flex;flex-direction:column;gap:14px;min-height:320px}
          .odet-sig:hover{background:var(--bg-card-hover);border-color:var(--border-strong);transform:translateY(-2px);box-shadow:var(--shadow-glass),var(--shadow-elevate)}
          .odet-sig .num{position:absolute;top:18px;right:20px;font-size:11px;font-weight:700;color:#A5B4FC;background:var(--accent-soft);border:1px solid var(--accent-glow);border-radius:5px;padding:2px 7px;font-variant-numeric:tabular-nums}
          .odet-sig h3{font-size:17px;font-weight:700;letter-spacing:-.01em;line-height:1.2;padding-right:32px}
          .odet-sig .lbl{font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:var(--fg-muted);font-weight:600;margin-bottom:5px}
          .odet-sig ul{list-style:none;display:flex;flex-direction:column;gap:4px}
          .odet-sig li{font-size:11px;color:var(--fg-secondary);line-height:1.45}
          .odet-sig li::before{content:"•";color:var(--accent);margin-right:5px;font-weight:700}
          .odet-sig .sols{display:flex;flex-wrap:wrap;gap:4px;margin-top:auto;padding-top:14px;border-top:1px solid var(--border)}
          .odet-sig .sol{font-size:10px;padding:3px 8px;border-radius:5px;background:var(--bg-elevated);color:#A5B4FC;border:1px solid var(--border);font-weight:500}

          .odet-score{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;background:linear-gradient(135deg,rgba(67,56,202,.12),rgba(99,102,241,.04));border:1px solid var(--accent-glow);border-radius:var(--radius-xl);padding:24px;box-shadow:var(--shadow-glass);margin-bottom:32px;position:relative;overflow:hidden}
          .odet-score::before{content:"";position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,#A78BFA,transparent)}
          .odet-score .col{display:flex;flex-direction:column;gap:8px}
          .odet-score .col-hd{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#A5B4FC;font-weight:600;display:flex;justify-content:space-between;align-items:center}
          .odet-score .col-hd .wt{background:var(--bg-elevated);border:1px solid var(--border);padding:2px 7px;border-radius:4px;font-size:10px;color:var(--fg-muted)}
          .odet-score .col-items{display:flex;flex-direction:column;gap:4px}
          .odet-score .col-items .it{font-size:12px;color:var(--fg-secondary);padding:5px 9px;background:rgba(13,17,23,.5);border-radius:6px;border:1px solid var(--border);font-weight:500}

          .odet-record{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-xl);padding:28px;box-shadow:var(--shadow-glass);position:relative;overflow:hidden}
          .odet-record::before{content:"";position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,#A78BFA,transparent)}
          .odet-record-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:14px}
          .odet-record-head .left .eyebrow{font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:var(--fg-muted);font-weight:600;margin-bottom:4px}
          .odet-record-head .left h3{font-size:22px;font-weight:700;letter-spacing:-.01em}
          .odet-record-head .pill{font-size:10px;text-transform:uppercase;letter-spacing:.1em;font-weight:700;padding:5px 12px;border-radius:999px;background:rgba(52,211,153,.08);color:var(--green);border:1px solid rgba(52,211,153,.18)}
          .odet-record .grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px}
          .odet-record .cell{background:var(--bg);border:1px solid var(--border);border-radius:10px;padding:14px}
          .odet-record .cell .lbl{font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:var(--fg-muted);font-weight:600;margin-bottom:5px}
          .odet-record .cell .val{font-size:14px;font-weight:600;color:var(--fg)}
          .odet-record .cell .val.rev{color:#A78BFA;font-variant-numeric:tabular-nums;font-size:18px}
          .odet-record .full{margin-top:14px;padding:14px;background:var(--bg);border:1px solid var(--border);border-radius:10px}
          .odet-record .full .lbl{font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:var(--fg-muted);font-weight:600;margin-bottom:8px}
          .odet-record .full ul{list-style:none;display:flex;flex-direction:column;gap:5px}
          .odet-record .full li{font-size:13px;color:var(--fg-secondary);display:flex;gap:8px;align-items:flex-start}
          .odet-record .full li::before{content:"→";color:var(--accent);font-weight:700;flex-shrink:0}
          .odet-record .cta{margin-top:20px;display:flex;gap:10px;flex-wrap:wrap;padding-top:20px;border-top:1px solid var(--border)}
          .odet-record .cta .btn{padding:10px 18px;font-size:13px}

          @media (max-width:1100px){.odet-engine{grid-template-columns:repeat(2,1fr)}.odet-score{grid-template-columns:repeat(2,1fr)}}
          @media (max-width:640px){.odet-engine{grid-template-columns:1fr}.odet-score{grid-template-columns:1fr}.odet-record .grid{grid-template-columns:1fr}.odet-head h2{font-size:32px}}
        `}</style>

        <div className="odet-head">
          <div className="eyebrow">MIX Opportunity Detection Engine</div>
          <h2>Identify the Alt-A client <span className="hl">before the bank decline.</span></h2>
          <p>The four signals below are how realtors, accountants, lawyers, financial planners, trustees, and brokers <strong>recognize a financing opportunity before it becomes a mortgage lead</strong>. MIX trains the network to detect them — then scores and routes every opportunity into the right workflow.</p>
        </div>

        {/* 4 primary signals */}
        <div className="odet-engine">
          {SIGNALS.map(s => (
            <div key={s.id} className="odet-sig">
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

        {/* 4-component scoring model */}
        <div className="odet-score">
          <div className="col">
            <div className="col-hd">Profile Score <span className="wt">/ 25</span></div>
            <div className="col-items">
              {PROFILE_OPTIONS.map(p => <span key={p.id} className="it">{p.label}</span>)}
            </div>
          </div>
          <div className="col">
            <div className="col-hd">Signal Score <span className="wt">/ 35</span></div>
            <div className="col-items">
              {['Low Declared Income', 'High Debt Ratio', 'Credit Challenges', 'Gift Funds', 'Equity Available', 'Corporate Structure', 'Special Levy', 'Divorce', 'Consumer Proposal'].map(s => <span key={s} className="it">{s}</span>)}
            </div>
          </div>
          <div className="col">
            <div className="col-hd">Problem Score <span className="wt">/ 20</span></div>
            <div className="col-items">
              {['Debt Consolidation', 'Bridge Financing', 'Equity Takeout', 'Construction Financing', 'Reverse Mortgage', 'Investment Financing'].map(s => <span key={s} className="it">{s}</span>)}
            </div>
          </div>
          <div className="col">
            <div className="col-hd">Referral Source <span className="wt">/ 20</span></div>
            <div className="col-items">
              {['Accountant', 'Lawyer', 'Financial Planner', 'Trustee', 'Realtor', 'Developer'].map(s => <span key={s} className="it">{s}</span>)}
            </div>
          </div>
        </div>

        {/* Example MIX record */}
        <div className="odet-record">
          <div className="odet-record-head">
            <div className="left">
              <div className="eyebrow">Example MIX Opportunity Record</div>
              <h3>John Smith</h3>
            </div>
            <div className="pill">● Opportunity Score 92/100</div>
          </div>

          <div className="grid">
            <div className="cell">
              <div className="lbl">Profile</div>
              <div className="val">Self-Employed</div>
            </div>
            <div className="cell">
              <div className="lbl">Signals Detected</div>
              <div className="val">Low Declared Income · Corporate Retained Earnings</div>
            </div>
            <div className="cell">
              <div className="lbl">Referral Source</div>
              <div className="val">Accountant</div>
            </div>
            <div className="cell">
              <div className="lbl">Problem</div>
              <div className="val">Purchase Financing</div>
            </div>
            <div className="cell">
              <div className="lbl">Recommended Strategy</div>
              <div className="val">Alt-A Mortgage</div>
            </div>
            <div className="cell">
              <div className="lbl">Estimated Revenue</div>
              <div className="val rev">$4,500</div>
            </div>
          </div>

          <div className="full">
            <div className="lbl">Routing</div>
            <ul>
              <li>Routed to Alt-A workflow with B-Lender fallback</li>
              <li>Bank statement program + equity takeout to be evaluated</li>
              <li>Accountant partner notified · content: "Self-Employed Alt-A Guide"</li>
              <li>Sales pipeline stage: Qualified → Application within 14 days</li>
            </ul>
          </div>

          <div className="cta">
            <Link href="/opportunity-engine" className="btn primary">Try the Opportunity Engine →</Link>
            <Link href="/assessment" className="btn">Full Borrower Assessment</Link>
            <Link href="/accountants" className="btn ghost">For Accountants</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
