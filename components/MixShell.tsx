'use client'

import { useState } from 'react'
import { CommandTab } from './tabs/CommandTab'
import { DashboardTab } from './tabs/DashboardTab'
import { PipelineTab } from './tabs/PipelineTab'
import { SubscribersTab } from './tabs/SubscribersTab'
import { AgentsTab } from './tabs/AgentsTab'
import { RelationshipsTab } from './tabs/RelationshipsTab'
import { DocsTab } from './tabs/DocsTab'

type Tab = 'command' | 'dashboard' | 'pipeline' | 'subscribers' | 'agents' | 'relationships' | 'docs'

const TABS: { id: Tab; label: string }[] = [
  { id: 'command',       label: '⚡ Command' },
  { id: 'dashboard',     label: 'Dashboard' },
  { id: 'pipeline',      label: 'Pipeline' },
  { id: 'subscribers',   label: 'Subscribers' },
  { id: 'agents',        label: 'Agents' },
  { id: 'relationships', label: 'Relationships' },
  { id: 'docs',          label: 'Docs' },
]

export function MixShell({ initialTab = 'command' }: { initialTab?: Tab }) {
  const [activeTab, setActiveTab] = useState<Tab>(initialTab)

  return (
    <>
      <div className="ambient a" />
      <div className="ambient b" />

      <nav className="topnav">
        <div className="logo">
          <div className="mark">M</div>
          <div className="word">MIX</div>
        </div>
        <div className="tabs">
          {TABS.map(t => (
            <button
              key={t.id}
              className={activeTab === t.id ? 'active' : ''}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="topnav-spacer" />
        <button className="btn primary" onClick={() => setActiveTab('pipeline')}>+ Opportunity</button>
      </nav>

      <div className="page">
        {activeTab === 'command'       && <CommandTab />}
        {activeTab === 'dashboard'     && <DashboardTab />}
        {activeTab === 'pipeline'      && <PipelineTab />}
        {activeTab === 'subscribers'   && <SubscribersTab />}
        {activeTab === 'agents'        && <AgentsTab />}
        {activeTab === 'relationships' && <RelationshipsTab />}
        {activeTab === 'docs'          && <DocsTab />}
      </div>
    </>
  )
}
