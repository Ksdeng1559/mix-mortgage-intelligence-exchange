'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  SIGNALS, SECONDARY_SIGNALS, PROFILE_OPTIONS, PROBLEMS, REFERRAL_SOURCES,
  SCORE_WEIGHTS, scoreOpportunity,
  type ProfileId, type SignalId, type ProblemId, type ReferralSourceId, type OpportunityResult,
} from '@/lib/opportunity-data'

const TIER_STYLE: Record<OpportunityResult['tier'], { color: string; bg: string; glow: string }> = {
  HOT:       { color: 'var(--green)',  bg: 'var(--green-bg)',  glow: 'rgba(52,211,153,.35)' },
  WARM:      { color: '#A5B4FC',        bg: 'var(--accent-soft)', glow: 'rgba(67,56,202,.35)' },
  QUALIFIED: { color: 'var(--blue)',   bg: 'var(--blue-bg)',   glow: 'rgba(96,165,250,.35)' },
  REVIEW:    { color: 'var(--amber)',  bg: 'var(--amber-bg)',  glow: 'rgba(251,191,36,.35)' },
  COLD:      { color: 'var(--fg-muted)', bg: 'rgba(255,255,255,.03)', glow: 'transparent' },
}

const TIER_DESC: Record<OpportunityResult['tier'], string> = {
  HOT: 'Prioritize. Route to specialist within 24 hours.',
  WARM: 'Strong fit. Schedule discovery call this week.',
  QUALIFIED: 'Viable. Add to nurture campaign.',
  REVIEW: 'Incomplete signal set. Gather more context.',
  COLD: 'Insufficient data. Re-classify after intake.',
}

export function OpportunityScorer() {
  const [profile, setProfile] = useState<ProfileId | null>(null)
  const [primarySignals, setPrimarySignals] = useState<SignalId[]>([])
  const [secondarySignals, setSecondarySignals] = useState<SignalId[]>([])
  const [problems, setProblems] = useState<ProblemId[]>([])
  const [referrer, setReferrer] = useState<ReferralSourceId | null>(null)
  const [leadName, setLeadName] = useState('John Smith')

  const result = useMemo(() => scoreOpportunity({
    profile, primarySignals, secondarySignals, problems, referrer,
  }), [profile, primarySignals, secondarySignals, problems, referrer])

  const tierStyle = TIER_STYLE[result.tier]

  const toggle = <T,>(arr: T[], v: T, setter: (next: T[]) => void) => {
    setter(arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v])
  }

  const reset = () => {
    setProfile(null); setPrimarySignals([]); setSecondarySignals([])
    setProblems([]); setReferrer(null); setLeadName('John Smith')
  }

  const loadExample = () => {
    setLeadName('John Smith')
    setProfile('self_employed')
    setPrimarySignals(['low_declared_income', 'down_payment_gift'])
    setSecondarySignals(['corporate_structure'])
    setProblems(['purchase_financing'])
    setReferrer('accountant')
  }

  const fmt = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

  return (
    <div className="osc">
      {/* Left: input form */}
      <div className="osc-form">
        <div className="osc-row">
          <label>
            <span className="osc-lbl">Lead Name</span>
            <input
              type="text"
              value={leadName}
              onChange={(e) => setLeadName(e.target.value)}
              placeholder="e.g. John Smith"
              className="osc-input"
            />
          </label>
        </div>

        <div className="osc-row">
          <div className="osc-lbl">Borrower Profile</div>
          <div className="osc-chips">
            {PROFILE_OPTIONS.map(p => (
              <button
                key={p.id}
                type="button"
                onClick={() => setProfile(profile === p.id ? null : p.id)}
                className={`osc-chip${profile === p.id ? ' on' : ''}`}
              >{p.label}</button>
            ))}
          </div>
        </div>

        <div className="osc-row">
          <div className="osc-lbl">Primary Signals <span className="osc-meta">{primarySignals.length}/4</span></div>
          {SIGNALS.map(s => (
            <div key={s.id} className={`osc-sig${primarySignals.includes(s.id) ? ' on' : ''}`}>
              <label className="osc-sig-head">
                <input
                  type="checkbox"
                  checked={primarySignals.includes(s.id)}
                  onChange={() => toggle(primarySignals, s.id, setPrimarySignals)}
                />
                <span className="osc-sig-num">{s.num}</span>
                <span className="osc-sig-title">{s.title}</span>
              </label>
              {primarySignals.includes(s.id) && (
                <div className="osc-sig-body">
                  <div className="osc-sig-sub">Common statements</div>
                  <ul>{s.statements.map(st => <li key={st}>"{st}"</li>)}</ul>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="osc-row">
          <div className="osc-lbl">Secondary Context <span className="osc-meta">{secondarySignals.length}/5</span></div>
          <div className="osc-chips">
            {SECONDARY_SIGNALS.map(s => (
              <button
                key={s.id}
                type="button"
                onClick={() => toggle(secondarySignals, s.id, setSecondarySignals)}
                className={`osc-chip sm${secondarySignals.includes(s.id) ? ' on' : ''}`}
              >{s.label}</button>
            ))}
          </div>
        </div>

        <div className="osc-row">
          <div className="osc-lbl">Financing Problem <span className="osc-meta">{problems.length}/3 scored</span></div>
          <div className="osc-chips">
            {PROBLEMS.map(p => (
              <button
                key={p.id}
                type="button"
                onClick={() => toggle(problems, p.id, setProblems)}
                className={`osc-chip sm${problems.includes(p.id) ? ' on' : ''}`}
              >{p.label}</button>
            ))}
          </div>
        </div>

        <div className="osc-row">
          <div className="osc-lbl">Referral Source</div>
          <select
            value={referrer ?? ''}
            onChange={(e) => setReferrer((e.target.value || null) as ReferralSourceId | null)}
            className="osc-input"
          >
            <option value="">— Select source —</option>
            {REFERRAL_SOURCES.map(r => <option key={r.id} value={r.id}>{r.label}</option>)}
          </select>
        </div>

        <div className="osc-actions">
          <button type="button" onClick={loadExample} className="osc-btn ghost">Load Example (John Smith)</button>
          <button type="button" onClick={reset} className="osc-btn ghost">Reset</button>
        </div>
      </div>

      {/* Right: live result */}
      <aside className="osc-result" style={{ borderColor: tierStyle.glow }}>
        <div className="osc-result-head">
          <div>
            <div className="osc-result-eyebrow">MIX Opportunity Record</div>
            <div className="osc-result-name">{leadName || 'Unnamed Lead'}</div>
          </div>
          <div className="osc-score-ring">
            <svg viewBox="0 0 100 100" width="86" height="86">
              <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="6" />
              <circle
                cx="50" cy="50" r="44" fill="none"
                stroke={tierStyle.color} strokeWidth="6"
                strokeDasharray={`${(result.score / 100) * 276.46} 276.46`}
                strokeLinecap="round" transform="rotate(-90 50 50)"
                style={{ transition: 'stroke-dasharray 0.4s ease' }}
              />
              <text x="50" y="50" textAnchor="middle" dominantBaseline="central" fill="var(--fg)" fontSize="22" fontWeight="800" style={{ fontVariantNumeric: 'tabular-nums' }}>
                {result.score}
              </text>
              <text x="50" y="68" textAnchor="middle" fill="var(--fg-muted)" fontSize="8" letterSpacing="0.1em" fontWeight="600">/ 100</text>
            </svg>
          </div>
        </div>

        <div className="osc-tier" style={{ color: tierStyle.color, background: tierStyle.bg, borderColor: tierStyle.glow }}>
          <span className="osc-tier-dot" style={{ background: tierStyle.color, boxShadow: `0 0 10px ${tierStyle.color}` }} />
          <span className="osc-tier-label">{result.tier}</span>
          <span className="osc-tier-desc">{TIER_DESC[result.tier]}</span>
        </div>

        <div className="osc-grid">
          <div className="osc-cell">
            <div className="osc-cell-lbl">Profile</div>
            <div className="osc-cell-val">{result.profile ? PROFILE_OPTIONS.find(p => p.id === result.profile)!.label : '—'}</div>
          </div>
          <div className="osc-cell">
            <div className="osc-cell-lbl">Strategy</div>
            <div className="osc-cell-val">{result.strategy}</div>
          </div>
          <div className="osc-cell">
            <div className="osc-cell-lbl">Est. Revenue</div>
            <div className="osc-cell-val rev">{fmt(result.estimatedRevenue)}</div>
          </div>
          <div className="osc-cell">
            <div className="osc-cell-lbl">Referrer</div>
            <div className="osc-cell-val">{result.referrerPath ? <Link href={result.referrerPath}>{REFERRAL_SOURCES.find(r => r.id === referrer)?.label}</Link> : (referrer ? REFERRAL_SOURCES.find(r => r.id === referrer)?.label : '—')}</div>
          </div>
        </div>

        {result.recommendedSolutions.length > 0 && (
          <div className="osc-section">
            <div className="osc-section-lbl">Recommended Solutions</div>
            <div className="osc-tags">
              {result.recommendedSolutions.map(s => <span key={s} className="osc-tag">{s}</span>)}
            </div>
          </div>
        )}

        {result.recommendedVerticals.length > 0 && (
          <div className="osc-section">
            <div className="osc-section-lbl">Route To</div>
            <div className="osc-tags">
              {result.recommendedVerticals.map(v => (
                <Link key={v} href={v} className="osc-tag link">
                  {v.replace(/^\//, '').replace(/-/g, ' ')} →
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="osc-section">
          <div className="osc-section-lbl">Score Breakdown</div>
          <div className="osc-bars">
            {result.breakdown.map(b => (
              <div key={b.label} className="osc-bar">
                <div className="osc-bar-head">
                  <span>{b.label}</span>
                  <span className="osc-bar-num">{b.points} <span style={{ color: 'var(--fg-muted)' }}>/ {b.max}</span></span>
                </div>
                <div className="osc-bar-track">
                  <div className="osc-bar-fill" style={{ width: `${(b.points / b.max) * 100}%`, background: tierStyle.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="osc-cta">
          <Link href="/assessment" className="osc-btn primary">Start Full Assessment</Link>
          <Link href="/contact" className="osc-btn">Save to CRM</Link>
        </div>
      </aside>

      <style>{`
        .osc{display:grid;grid-template-columns:1.1fr 1fr;gap:24px;align-items:start}
        .osc-form{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-xl);padding:24px;box-shadow:var(--shadow-glass);display:flex;flex-direction:column;gap:18px}
        .osc-row{display:flex;flex-direction:column;gap:8px}
        .osc-lbl{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:var(--fg-muted);font-weight:600;display:flex;justify-content:space-between;align-items:center}
        .osc-meta{font-weight:500;color:var(--fg-secondary)}
        .osc-input{background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-size:13px;color:var(--fg);font-family:inherit;outline:none;transition:border-color .15s}
        .osc-input:focus{border-color:var(--accent)}
        .osc-chips{display:flex;flex-wrap:wrap;gap:6px}
        .osc-chip{padding:6px 11px;font-size:12px;font-weight:500;border-radius:8px;background:var(--bg);border:1px solid var(--border);color:var(--fg-secondary);cursor:pointer;font-family:inherit;transition:all .12s}
        .osc-chip:hover{border-color:var(--border-strong);color:var(--fg)}
        .osc-chip.on{background:var(--accent-soft);color:#A5B4FC;border-color:var(--accent-glow)}
        .osc-chip.sm{padding:5px 10px;font-size:11px}
        .osc-sig{background:var(--bg);border:1px solid var(--border);border-radius:10px;padding:11px 13px;transition:all .12s}
        .osc-sig.on{border-color:var(--accent-glow);background:var(--bg-card-hover)}
        .osc-sig-head{display:flex;align-items:center;gap:9px;cursor:pointer;font-size:13px;font-weight:500;color:var(--fg)}
        .osc-sig-head input{accent-color:var(--accent);width:14px;height:14px}
        .osc-sig-num{font-size:10px;font-weight:700;color:#A5B4FC;background:var(--accent-soft);border:1px solid var(--accent-glow);border-radius:5px;padding:2px 6px;font-variant-numeric:tabular-nums}
        .osc-sig-title{font-weight:600}
        .osc-sig-body{margin-top:10px;padding-top:10px;border-top:1px solid var(--border)}
        .osc-sig-sub{font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:var(--fg-muted);font-weight:600;margin-bottom:6px}
        .osc-sig-body ul{list-style:none;display:flex;flex-direction:column;gap:4px}
        .osc-sig-body li{font-size:11px;color:var(--fg-secondary);font-style:italic;line-height:1.4}
        .osc-actions{display:flex;gap:8px;padding-top:6px;border-top:1px solid var(--border)}
        .osc-btn{padding:8px 14px;font-size:12px;font-weight:500;border-radius:8px;cursor:pointer;background:transparent;color:var(--fg-secondary);border:1px solid var(--border-strong);font-family:inherit;transition:all .12s;display:inline-flex;align-items:center;justify-content:center;gap:6px}
        .osc-btn:hover{background:var(--bg-card);color:var(--fg)}
        .osc-btn.primary{background:var(--accent);color:#fff;border-color:transparent;box-shadow:0 0 0 3px var(--accent-glow)}
        .osc-btn.primary:hover{background:var(--accent-hover)}
        .osc-btn.ghost{flex:1}

        .osc-result{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-xl);padding:24px;box-shadow:var(--shadow-glass);position:sticky;top:80px;display:flex;flex-direction:column;gap:18px;transition:border-color .2s}
        .osc-result-head{display:flex;justify-content:space-between;align-items:flex-start;gap:14px}
        .osc-result-eyebrow{font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:var(--fg-muted);font-weight:600;margin-bottom:4px}
        .osc-result-name{font-size:20px;font-weight:700;letter-spacing:-.01em;color:var(--fg)}
        .osc-score-ring{flex-shrink:0}
        .osc-tier{display:flex;align-items:center;gap:9px;padding:10px 14px;border-radius:10px;border:1px solid;font-size:12px;font-weight:500}
        .osc-tier-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0}
        .osc-tier-label{font-size:11px;text-transform:uppercase;letter-spacing:.1em;font-weight:700}
        .osc-tier-desc{color:var(--fg-secondary);font-weight:400}
        .osc-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
        .osc-cell{background:var(--bg);border:1px solid var(--border);border-radius:9px;padding:10px 12px}
        .osc-cell-lbl{font-size:9px;text-transform:uppercase;letter-spacing:.08em;color:var(--fg-muted);font-weight:600;margin-bottom:3px}
        .osc-cell-val{font-size:13px;font-weight:600;color:var(--fg);line-height:1.2}
        .osc-cell-val.rev{color:#A78BFA;font-variant-numeric:tabular-nums}
        .osc-cell-val a{color:var(--accent);text-decoration:none}
        .osc-cell-val a:hover{text-decoration:underline}
        .osc-section{display:flex;flex-direction:column;gap:6px}
        .osc-section-lbl{font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:var(--fg-muted);font-weight:600}
        .osc-tags{display:flex;flex-wrap:wrap;gap:5px}
        .osc-tag{font-size:11px;padding:4px 9px;border-radius:6px;background:var(--accent-soft);color:#A5B4FC;border:1px solid var(--accent-glow);font-weight:500}
        .osc-tag.link{text-decoration:none;cursor:pointer;transition:all .12s}
        .osc-tag.link:hover{background:rgba(99,102,241,.18);transform:translateY(-1px)}
        .osc-bars{display:flex;flex-direction:column;gap:9px}
        .osc-bar-head{display:flex;justify-content:space-between;font-size:11px;color:var(--fg-secondary);font-weight:500;margin-bottom:4px}
        .osc-bar-num{color:var(--fg);font-variant-numeric:tabular-nums;font-weight:600}
        .osc-bar-track{height:5px;background:rgba(255,255,255,.04);border-radius:3px;overflow:hidden}
        .osc-bar-fill{height:100%;border-radius:3px;transition:width .4s ease}
        .osc-cta{display:flex;gap:8px;padding-top:6px;border-top:1px solid var(--border)}
        .osc-cta .osc-btn{flex:1;padding:10px 14px;font-size:12px}

        @media (max-width:1100px){.osc{grid-template-columns:1fr}.osc-result{position:static}}
        @media (max-width:640px){.osc-grid{grid-template-columns:1fr}}
      `}</style>
    </div>
  )
}
