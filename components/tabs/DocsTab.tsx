'use client'

type DocEntry = {
  title: string
  path: string
  category: string
  desc: string
  emoji: string
}

const DOCS: DocEntry[] = [
  // Core docs
  { title: 'README', path: 'README.md', category: 'Core', desc: 'Product mission, agent workforce, database strategy, 90-day backlog', emoji: '📖' },
  { title: 'MIX Implementation Plan', path: 'docs/MIX-IMPLEMENTATION-PLAN.md', category: 'Core', desc: 'Phase-by-phase build plan, milestones, and technical decisions', emoji: '🗺️' },
  { title: 'RIOS Architecture', path: 'docs/RIOS-ARCHITECTURE.md', category: 'Core', desc: 'System architecture, Supabase schema, service boundaries', emoji: '🏗️' },
  { title: 'Interpretable Context Graph', path: 'docs/INTERPRETABLE-CONTEXT-GRAPH.md', category: 'Core', desc: 'ICM — 12-element execution contract for all agent actions', emoji: '🧠' },
  { title: 'Subscriber Onboarding & Opportunity Intelligence', path: 'docs/SUBSCRIBER-ONBOARDING-OPPORTUNITY-INTELLIGENCE.md', category: 'Core', desc: 'Onboarding flow, opportunity scoring, subscriber lifecycle', emoji: '🎯' },
  { title: 'Contributing', path: 'CONTRIBUTING.md', category: 'Core', desc: 'Development workflow, branching, coding standards', emoji: '🤝' },
  { title: 'Design System', path: 'design-system/DESIGN.md', category: 'Core', desc: 'Dark glass CSS system, color tokens, component patterns', emoji: '🎨' },
  // Agent docs
  { title: 'Lead Discovery Agent', path: 'agents/lead-discovery-agent.md', category: 'Agents', desc: 'Web + LinkedIn surface mining, prospect qualification signals', emoji: '🔍' },
  { title: 'WhyNow Engine™', path: 'agents/whynow-engine.md', category: 'Agents', desc: 'Market trigger detection — rate drops, renewals, life events', emoji: '⚡' },
  { title: 'Scoring Agent', path: 'agents/scoring-agent.md', category: 'Agents', desc: 'Composite MIX score: Credit · Intent · Capacity · Market', emoji: '📈' },
  { title: 'Underwriting Agent', path: 'agents/underwriting-agent.md', category: 'Agents', desc: 'Risk and capacity assessment, lender matching criteria', emoji: '📋' },
  { title: 'Qualification Agent', path: 'agents/qualification-agent.md', category: 'Agents', desc: 'Lead-to-opportunity gate, ICM qualification framework', emoji: '✅' },
  { title: 'Matching Agent', path: 'agents/matching-agent.md', category: 'Agents', desc: 'Borrower-to-lender matching, program eligibility', emoji: '🔗' },
  { title: 'Referral Intelligence Agent', path: 'agents/referral-intelligence-agent.md', category: 'Agents', desc: 'Network analysis, warm intro identification, referral tracking', emoji: '🤝' },
  { title: 'Revenue Agent', path: 'agents/revenue-agent.md', category: 'Agents', desc: 'Commission forecasting, deal value modeling, MTD/YTD tracking', emoji: '💰' },
  { title: 'Database Enrichment Agent', path: 'agents/database-enrichment-agent.md', category: 'Agents', desc: 'CRM hygiene, web research, contact data enrichment', emoji: '🔄' },
  { title: 'Database Reactivation Agent', path: 'agents/database-reactivation-agent.md', category: 'Agents', desc: 'Dormant lead re-engagement, lapsed relationship recovery', emoji: '🔔' },
  { title: 'Cross-Sell Agent', path: 'agents/cross-sell-agent.md', category: 'Agents', desc: 'Existing client opportunity surfacing, life event triggers', emoji: '↗️' },
  { title: 'Agent Fleet Overview', path: 'agents/README.md', category: 'Agents', desc: 'All agents, priority order, dependencies, deployment guide', emoji: '🚀' },
  // Context
  { title: 'Context Reference', path: 'context/README.md', category: 'Context', desc: 'BC mortgage market context, lending rules, rate data', emoji: '📊' },
  { title: 'Implementation Plan (Hermes)', path: '.hermes/plans/2026-06-13_RIOS-Legacy-MIX-MVP-Implementation-Plan.md', category: 'Context', desc: 'Legacy RIOS → MIX migration planning document', emoji: '📝' },
]

const CATEGORIES = ['Core', 'Agents', 'Context']

export function DocsTab() {
  return (
    <div>
      <div className="page-hd">
        <div>
          <h1>Docs</h1>
          <div className="meta">{DOCS.length} documents · agent specs, architecture, context</div>
        </div>
      </div>

      {CATEGORIES.map(cat => {
        const docs = DOCS.filter(d => d.category === cat)
        return (
          <div key={cat} style={{ marginBottom: 32 }}>
            <div className="sec-hd" style={{ marginBottom: 12 }}>
              <h2>{cat}</h2>
              <span style={{ color: 'var(--fg-muted)', fontSize: 12 }}>{docs.length} docs</span>
            </div>
            <div className="tbl-wrap">
              <table>
                <tbody>
                  {docs.map(d => (
                    <tr key={d.path}>
                      <td style={{ width: 28, fontSize: 16 }}>{d.emoji}</td>
                      <td style={{ fontWeight: 500, width: 240 }}>{d.title}</td>
                      <td style={{ color: 'var(--fg-secondary)', fontSize: 12 }}>{d.desc}</td>
                      <td style={{ color: 'var(--fg-muted)', fontSize: 10, fontFamily: 'monospace', width: 280 }}>{d.path}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      })}
    </div>
  )
}
