import { useState, useEffect } from 'react';
import {
  LayoutDashboard, Inbox, Users, Target, ScrollText, Sparkles,
  CheckCircle2, XCircle, Clock, Loader2, AlertCircle, Building2,
  ArrowRight, Send, RotateCcw, FileText, Database, Trash2, Pencil, Search, Save, MessageSquare
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Storage keys -- each entity collection lives under its own key (personal,
// not shared). Kept separate because each is read/written independently.
// ---------------------------------------------------------------------------
const KEYS = {
  contacts: 'rios:contacts',
  organizations: 'rios:organizations',
  episodes: 'rios:episodes',
  opportunities: 'rios:opportunities',
  candidates: 'rios:candidates',
  proposals: 'rios:proposals',
  audit: 'rios:audit',
  askHistory: 'rios:askHistory',
};

const uid = () => Math.random().toString(36).slice(2, 10);
const now = () => new Date().toISOString();
const daysAgo = (n) => new Date(Date.now() - n * 24 * 60 * 60 * 1000).toISOString();
const fmtTime = (iso) => new Date(iso).toLocaleString(undefined, {
  month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
});

async function loadList(key) {
  try {
    const res = await window.storage.get(key);
    return res ? JSON.parse(res.value) : [];
  } catch {
    return [];
  }
}
async function saveList(key, value) {
  try {
    await window.storage.set(key, JSON.stringify(value));
  } catch (e) {
    console.error('storage save failed', key, e);
  }
}

// ---------------------------------------------------------------------------
// Claude API helper. Always returns plain text (the model is instructed to
// respond with JSON only); parseJSON below strips any stray fencing.
// ---------------------------------------------------------------------------
async function callClaude(system, user) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1000,
      system,
      messages: [{ role: 'user', content: user }],
    }),
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  const data = await res.json();
  const block = (data.content || []).find((b) => b.type === 'text');
  return block ? block.text : '';
}

function parseJSON(text) {
  const cleaned = text.replace(/```json|```/g, '').trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    return null;
  }
}

// Same as callClaude, but enables the web_search tool and returns the LAST
// text block (the final summary that follows any search steps).
async function callClaudeWithSearch(system, user) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1000,
      system,
      messages: [{ role: 'user', content: user }],
      tools: [{ type: 'web_search_20250305', name: 'web_search' }],
    }),
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  const data = await res.json();
  const textBlocks = (data.content || []).filter((b) => b.type === 'text').map((b) => b.text);
  return textBlocks[textBlocks.length - 1] || '';
}

function mixTotal(mix) {
  if (!mix) return 0;
  const c = mix.credit || 0, i = mix.intent || 0, cap = mix.capacity || 0, m = mix.market || 0;
  return Math.round(c * 0.25 + i * 0.30 + cap * 0.25 + m * 0.20);
}

// ---------------------------------------------------------------------------
// Prompts
// ---------------------------------------------------------------------------
const EXTRACTION_SYSTEM = `You are the RIOS intake extraction engine for a personal relationship-intelligence system used by a business developer in mortgage / financial-services relationship management.

Given existing records (contacts and organizations already known to the system) and a new piece of conversation text or notes, extract up to 3 of the MOST IMPORTANT structured candidates for human review. Do not flood the queue -- only surface things worth a human's attention.

For each candidate decide:
- type: "contact" | "organization" | "opportunity"
- operation: "create" (new record) or "update" (matches an existing record -- you MUST set target_id to that record's id)

Respond with ONLY a raw JSON array, no markdown fences, no preamble. Each element:
{
  "type": "contact" | "organization" | "opportunity",
  "operation": "create" | "update",
  "target_id": "<existing id, or null for create>",
  "confidence": 0.0-1.0,
  "reasoning": "one short sentence",
  "payload": { ...fields below... }
}

Contact payload: { "name": str, "role": str, "organization": str, "notes": str, "tags": [str] }
Organization payload: { "name": str, "type": str, "notes": str }
Opportunity payload: {
  "title": str, "description": str, "contact_name": str, "opportunity_type": str,
  "mix": { "credit": 0-100, "intent": 0-100, "capacity": 0-100, "market": 0-100 },
  "evidence": [str, str]
}

If nothing meaningful can be extracted, respond with [].`;

const PROPOSAL_SYSTEM = `You are the RIOS activation proposal engine (Interpretable Context Methodology). Given a business opportunity and its evidence, recommend ONE concrete next action and draft a short outreach message the human could send (they will review and edit before sending -- you are not sending anything).

Respond with ONLY raw JSON, no markdown fences:
{
  "recommended_action": "one short sentence describing the next step",
  "draft_message": "a short, natural draft outreach message (2-4 sentences)",
  "confidence": 0.0-1.0,
  "reasoning": "one or two sentences citing the evidence that supports this"
}`;

const ENRICHMENT_SYSTEM = `You are the RIOS enrichment engine. Search the web for current, factual information about the given organization and produce a concise enrichment summary useful for a relationship-intelligence record in financial / mortgage services (e.g. what they do, size or scale signals, recent news, anything relevant to assessing them as a business relationship).

After searching, respond with ONLY raw JSON, no markdown fences, no preamble:
{
  "summary": "2-3 sentence overview based on what you found",
  "key_facts": ["short fact 1", "short fact 2", "short fact 3"],
  "sources": ["domain1.com", "domain2.com"]
}

If you cannot find reliable information, set "summary" to a brief note saying so and use empty arrays for the rest. Keep everything concise -- this must fit in a small UI card.`;

const ASK_SYSTEM = `You are RIOS Memory -- the recall interface for a personal relationship-intelligence system. You answer questions using ONLY the workspace records provided in each message (contacts, organizations, opportunities, episodes, enrichments).

Hard rules:
1. STRICTLY GROUNDED: Only state facts present in the provided records. If the records don't contain the answer, say plainly that you don't have that information -- never guess or fill gaps with general knowledge.
2. CITE YOUR SOURCES: When you state a fact, note where it came from in brackets, e.g. [contact: Maria Chen], [episode, Jun 3], [opportunity: Pinnacle renewal], [enrichment: Northgate Capital].
3. BE CONCISE: 2-6 sentences for most answers. Use a short list only when listing multiple records.
4. BE USEFUL: If relevant, mention related records the user didn't ask about (e.g. an open opportunity tied to the person they asked about), and surface staleness (e.g. "last episode mentioning them was 45 days ago").
5. Plain text only -- no markdown headers or bold.`;

// ---------------------------------------------------------------------------
// Small shared UI bits
// ---------------------------------------------------------------------------
function Badge({ children, color }) {
  const colors = {
    slate: 'bg-slate-800 text-slate-300 border-slate-700',
    emerald: 'bg-emerald-950 text-emerald-400 border-emerald-800',
    amber: 'bg-amber-950 text-amber-400 border-amber-800',
    rose: 'bg-rose-950 text-rose-400 border-rose-800',
    blue: 'bg-blue-950 text-blue-400 border-blue-800',
  };
  return (
    <span className={`text-[10px] uppercase tracking-wide px-2 py-0.5 rounded border ${colors[color] || colors.slate}`}>
      {children}
    </span>
  );
}

function MixBar({ mix }) {
  if (!mix) return null;
  const segs = [
    { key: 'credit', label: 'Credit', val: mix.credit || 0, color: 'bg-blue-500' },
    { key: 'intent', label: 'Intent', val: mix.intent || 0, color: 'bg-emerald-500' },
    { key: 'capacity', label: 'Capacity', val: mix.capacity || 0, color: 'bg-amber-500' },
    { key: 'market', label: 'Market', val: mix.market || 0, color: 'bg-purple-500' },
  ];
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>MIX Score</span>
        <span className="text-slate-200 font-medium">{mix.total ?? mixTotal(mix)}</span>
      </div>
      <div className="flex h-2 rounded overflow-hidden bg-slate-800">
        {segs.map((s) => (
          <div key={s.key} className={s.color} style={{ width: `${s.val / 4}%` }} title={`${s.label}: ${s.val}`} />
        ))}
      </div>
      <div className="flex gap-3 text-[10px] text-slate-500">
        {segs.map((s) => (
          <span key={s.key}>{s.label} {s.val}</span>
        ))}
      </div>
    </div>
  );
}

function EmptyState({ icon: Icon, text }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 text-slate-500">
      <Icon className="w-8 h-8 mb-2 opacity-40" />
      <p className="text-sm">{text}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tabs
// ---------------------------------------------------------------------------
function DashboardTab({ contacts, organizations, opportunities, candidates, audit }) {
  const pending = candidates.filter((c) => c.status === 'pending').length;
  const active = opportunities.filter((o) => o.status !== 'completed').length;
  const stats = [
    { label: 'Contacts', value: contacts.length, color: 'text-blue-400' },
    { label: 'Organizations', value: organizations.length, color: 'text-purple-400' },
    { label: 'Active Opportunities', value: active, color: 'text-emerald-400' },
    { label: 'Pending Review', value: pending, color: 'text-amber-400' },
  ];
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-slate-900 border border-slate-800 rounded-lg p-4">
            <div className={`text-2xl font-semibold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-slate-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
      <div>
        <h3 className="text-sm font-medium text-slate-300 mb-2">Recent Activity</h3>
        {audit.length === 0 ? (
          <EmptyState icon={ScrollText} text="No activity yet. Process an intake to get started." />
        ) : (
          <div className="space-y-2">
            {audit.slice(0, 6).map((a) => (
              <div key={a.id} className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-sm">
                <div className="flex items-center justify-between mb-1">
                  <Badge color="slate">{a.action}</Badge>
                  <span className="text-[10px] text-slate-500">{fmtTime(a.timestamp)}</span>
                </div>
                <p className="text-slate-300">{a.summary}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function IntakeTab({ value, onChange, onProcess, loading }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-400">
        Paste notes, a conversation summary, or a transcript. Claude will extract contacts, organizations,
        and opportunities and send them to the review queue -- nothing is written to your records until you approve.
      </p>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. Had coffee with Maria Chen from Northgate Capital. She mentioned their fund is closing a $2M strata-financing deal next quarter and asked if I knew any reliable brokers..."
        className="w-full h-40 bg-slate-900 border border-slate-800 rounded-lg p-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-700 resize-none"
      />
      <button
        onClick={onProcess}
        disabled={loading || !value.trim()}
        className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
        {loading ? 'Processing...' : 'Process with AI'}
      </button>
    </div>
  );
}

function CandidateCard({ candidate, onApprove, onReject, onDefer }) {
  const typeColor = { contact: 'blue', organization: 'purple', opportunity: 'emerald' }[candidate.type] || 'slate';
  const p = candidate.payload || {};
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Badge color={typeColor}>{candidate.type}</Badge>
        <Badge color="slate">{candidate.operation}</Badge>
        <span className="text-[10px] text-slate-500 ml-auto">
          confidence {Math.round((candidate.confidence || 0) * 100)}%
        </span>
      </div>

      {candidate.type === 'opportunity' ? (
        <div className="space-y-2">
          <div className="text-sm font-medium text-slate-200">{p.title}</div>
          <p className="text-xs text-slate-400">{p.description}</p>
          <div className="text-xs text-slate-500">Contact: {p.contact_name || '—'} · {p.opportunity_type}</div>
          {p.mix && <MixBar mix={p.mix} />}
          {p.evidence?.length > 0 && (
            <ul className="text-xs text-slate-500 list-disc list-inside space-y-0.5">
              {p.evidence.map((e, i) => <li key={i}>{e}</li>)}
            </ul>
          )}
        </div>
      ) : (
        <div className="space-y-1">
          <div className="text-sm font-medium text-slate-200">{p.name}</div>
          {candidate.type === 'contact' && (
            <div className="text-xs text-slate-400">{p.role}{p.organization ? ` · ${p.organization}` : ''}</div>
          )}
          {candidate.type === 'organization' && <div className="text-xs text-slate-400">{p.type}</div>}
          {p.notes && <p className="text-xs text-slate-500">{p.notes}</p>}
          {p.tags?.length > 0 && (
            <div className="flex gap-1 flex-wrap pt-1">
              {p.tags.map((t, i) => <Badge key={i} color="slate">{t}</Badge>)}
            </div>
          )}
        </div>
      )}

      <p className="text-xs text-slate-500 italic">"{candidate.reasoning}"</p>

      <div className="flex gap-2 pt-1">
        <button onClick={onApprove} className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-950 hover:bg-emerald-900 text-emerald-400 border border-emerald-800 text-xs font-medium py-2 rounded-lg transition-colors">
          <CheckCircle2 className="w-3.5 h-3.5" /> Approve
        </button>
        <button onClick={onDefer} className="flex-1 flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-medium py-2 rounded-lg transition-colors">
          <Clock className="w-3.5 h-3.5" /> Defer
        </button>
        <button onClick={onReject} className="flex-1 flex items-center justify-center gap-1.5 bg-rose-950 hover:bg-rose-900 text-rose-400 border border-rose-800 text-xs font-medium py-2 rounded-lg transition-colors">
          <XCircle className="w-3.5 h-3.5" /> Reject
        </button>
      </div>
    </div>
  );
}

function ReviewTab({ candidates, onApprove, onReject, onDefer, onReconsider }) {
  const pending = candidates.filter((c) => c.status === 'pending');
  const deferred = candidates.filter((c) => c.status === 'deferred');

  if (pending.length === 0 && deferred.length === 0) {
    return <EmptyState icon={Inbox} text="Review queue is empty. Process an intake to generate candidates." />;
  }

  return (
    <div className="space-y-6">
      {pending.length > 0 && (
        <div className="space-y-3">
          {pending.map((c) => (
            <CandidateCard
              key={c.id}
              candidate={c}
              onApprove={() => onApprove(c)}
              onReject={() => onReject(c)}
              onDefer={() => onDefer(c)}
            />
          ))}
        </div>
      )}
      {deferred.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-slate-400 mb-2">Deferred</h3>
          <div className="space-y-2">
            {deferred.map((c) => (
              <div key={c.id} className="bg-slate-900 border border-slate-800 rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Badge color="amber">{c.type}</Badge>
                  <span>{c.payload?.title || c.payload?.name}</span>
                </div>
                <button onClick={() => onReconsider(c)} className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                  <RotateCcw className="w-3 h-3" /> Reconsider
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function OrganizationCard({ org, onSave, onEnrich, enriching }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(null);

  function startEdit() {
    setDraft({ name: org.name, type: org.type || '', notes: org.notes || '' });
    setEditing(true);
  }
  function save() {
    onSave({ ...org, name: draft.name.trim() || org.name, type: draft.type, notes: draft.notes });
    setEditing(false);
  }

  if (editing) {
    return (
      <div className="bg-slate-900 border border-emerald-800 rounded-lg p-3 space-y-2">
        <input
          value={draft.name}
          onChange={(e) => setDraft({ ...draft, name: e.target.value })}
          placeholder="Organization name"
          className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-700"
        />
        <input
          value={draft.type}
          onChange={(e) => setDraft({ ...draft, type: e.target.value })}
          placeholder="Type (e.g. Investment Fund)"
          className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-emerald-700"
        />
        <textarea
          value={draft.notes}
          onChange={(e) => setDraft({ ...draft, notes: e.target.value })}
          placeholder="Notes"
          className="w-full h-16 bg-slate-800 border border-slate-700 rounded px-2 py-1.5 text-xs text-slate-300 placeholder-slate-600 focus:outline-none resize-none"
        />
        <div className="flex gap-2">
          <button onClick={save} className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-950 hover:bg-emerald-900 text-emerald-400 border border-emerald-800 text-xs font-medium py-1.5 rounded-lg transition-colors">
            <Save className="w-3.5 h-3.5" /> Save
          </button>
          <button onClick={() => setEditing(false)} className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium py-1.5 rounded-lg transition-colors">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 space-y-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-slate-200">{org.name}</span>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Badge color="purple">{org.type || 'org'}</Badge>
          <button onClick={startEdit} title="Edit" className="text-slate-500 hover:text-emerald-400 transition-colors">
            <Pencil className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      {org.notes && <p className="text-xs text-slate-500">{org.notes}</p>}

      {org.enrichment ? (
        <div className="bg-slate-950 border border-blue-900/40 rounded-lg p-2.5 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wide text-slate-500">Web enrichment · {fmtTime(org.enrichment.fetched_at)}</span>
            <button onClick={onEnrich} disabled={enriching} className="text-[10px] text-blue-400 hover:text-blue-300 disabled:opacity-50 flex items-center gap-1">
              {enriching ? <Loader2 className="w-3 h-3 animate-spin" /> : <RotateCcw className="w-3 h-3" />} Refresh
            </button>
          </div>
          <p className="text-xs text-slate-400">{org.enrichment.summary}</p>
          {org.enrichment.key_facts?.length > 0 && (
            <ul className="text-xs text-slate-500 list-disc list-inside space-y-0.5">
              {org.enrichment.key_facts.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          )}
          {org.enrichment.sources?.length > 0 && (
            <div className="flex gap-1 flex-wrap pt-0.5">
              {org.enrichment.sources.map((s, i) => <Badge key={i} color="slate">{s}</Badge>)}
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={onEnrich}
          disabled={enriching}
          className="w-full flex items-center justify-center gap-1.5 bg-blue-950 hover:bg-blue-900 disabled:opacity-50 text-blue-400 border border-blue-800 text-xs font-medium py-1.5 rounded-lg transition-colors"
        >
          {enriching ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
          {enriching ? 'Searching...' : 'Enrich via Web Search'}
        </button>
      )}
    </div>
  );
}

function ContactCard({ contact, onSave }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(null);

  function startEdit() {
    setDraft({
      name: contact.name,
      role: contact.role || '',
      organization: contact.organization || '',
      notes: contact.notes || '',
      tags: (contact.tags || []).join(', '),
    });
    setEditing(true);
  }
  function save() {
    onSave({
      ...contact,
      name: draft.name.trim() || contact.name,
      role: draft.role,
      organization: draft.organization,
      notes: draft.notes,
      tags: draft.tags.split(',').map((t) => t.trim()).filter(Boolean),
    });
    setEditing(false);
  }

  if (editing) {
    return (
      <div className="bg-slate-900 border border-emerald-800 rounded-lg p-3 space-y-2">
        <input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="Name"
          className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-700" />
        <div className="flex gap-2">
          <input value={draft.role} onChange={(e) => setDraft({ ...draft, role: e.target.value })} placeholder="Role"
            className="flex-1 bg-slate-800 border border-slate-700 rounded px-2 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-emerald-700" />
          <input value={draft.organization} onChange={(e) => setDraft({ ...draft, organization: e.target.value })} placeholder="Organization"
            className="flex-1 bg-slate-800 border border-slate-700 rounded px-2 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-emerald-700" />
        </div>
        <textarea value={draft.notes} onChange={(e) => setDraft({ ...draft, notes: e.target.value })} placeholder="Notes"
          className="w-full h-16 bg-slate-800 border border-slate-700 rounded px-2 py-1.5 text-xs text-slate-300 placeholder-slate-600 focus:outline-none resize-none" />
        <input value={draft.tags} onChange={(e) => setDraft({ ...draft, tags: e.target.value })} placeholder="Tags (comma separated)"
          className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1.5 text-xs text-slate-300 placeholder-slate-600 focus:outline-none" />
        <div className="flex gap-2">
          <button onClick={save} className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-950 hover:bg-emerald-900 text-emerald-400 border border-emerald-800 text-xs font-medium py-1.5 rounded-lg transition-colors">
            <Save className="w-3.5 h-3.5" /> Save
          </button>
          <button onClick={() => setEditing(false)} className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium py-1.5 rounded-lg transition-colors">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-slate-200">{contact.name}</span>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Badge color="blue">{contact.role || 'contact'}</Badge>
          <button onClick={startEdit} title="Edit" className="text-slate-500 hover:text-emerald-400 transition-colors">
            <Pencil className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      {contact.organization && <div className="text-xs text-slate-500 mt-0.5">{contact.organization}</div>}
      {contact.notes && <p className="text-xs text-slate-500 mt-1">{contact.notes}</p>}
      {contact.tags?.length > 0 && (
        <div className="flex gap-1 flex-wrap mt-2">
          {contact.tags.map((t, i) => <Badge key={i} color="slate">{t}</Badge>)}
        </div>
      )}
    </div>
  );
}

function ContactsTab({ contacts, organizations, onSaveOrg, onSaveContact, onEnrichOrg, enrichingOrgId }) {
  if (contacts.length === 0 && organizations.length === 0) {
    return <EmptyState icon={Users} text="No contacts or organizations yet. Approved candidates from the review queue will appear here." />;
  }
  return (
    <div className="space-y-6">
      {organizations.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-slate-300 mb-2 flex items-center gap-1.5">
            <Building2 className="w-4 h-4" /> Organizations ({organizations.length})
          </h3>
          <div className="space-y-2">
            {organizations.map((o) => (
              <OrganizationCard
                key={o.id}
                org={o}
                onSave={onSaveOrg}
                onEnrich={() => onEnrichOrg(o)}
                enriching={enrichingOrgId === o.id}
              />
            ))}
          </div>
        </div>
      )}
      {contacts.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-slate-300 mb-2 flex items-center gap-1.5">
            <Users className="w-4 h-4" /> Contacts ({contacts.length})
          </h3>
          <div className="space-y-2">
            {contacts.map((c) => (
              <ContactCard key={c.id} contact={c} onSave={onSaveContact} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function OutcomeForm({ onSubmit }) {
  const [type, setType] = useState('meeting_booked');
  const [notes, setNotes] = useState('');
  return (
    <div className="space-y-2 pt-2 border-t border-slate-800">
      <div className="text-xs text-slate-400">Record outcome</div>
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-slate-200 focus:outline-none"
      >
        <option value="meeting_booked">Meeting booked</option>
        <option value="application_started">Application started</option>
        <option value="declined">Declined / not interested</option>
        <option value="no_response">No response</option>
        <option value="referral_made">Referral made</option>
      </select>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Optional notes..."
        className="w-full h-16 bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none resize-none"
      />
      <button
        onClick={() => onSubmit(type, notes)}
        className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium py-2 rounded-lg transition-colors"
      >
        Save Outcome
      </button>
    </div>
  );
}

function OpportunityCard({ opp, proposal, onGenerateProposal, onApproveProposal, onRejectProposal, onRecordOutcome, generating }) {
  const statusColor = {
    identified: 'slate', activated: 'amber', completed: 'emerald', dormant: 'slate',
  }[opp.status] || 'slate';

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-sm font-medium text-slate-200">{opp.title}</div>
          <div className="text-xs text-slate-500 mt-0.5">{opp.contact_name} · {opp.opportunity_type}</div>
        </div>
        <Badge color={statusColor}>{opp.status}</Badge>
      </div>
      {opp.description && <p className="text-xs text-slate-400">{opp.description}</p>}
      <MixBar mix={opp.mix} />
      {opp.evidence?.length > 0 && (
        <ul className="text-xs text-slate-500 list-disc list-inside space-y-0.5">
          {opp.evidence.map((e, i) => <li key={i}>{e}</li>)}
        </ul>
      )}

      {/* Activation proposal flow */}
      {opp.status === 'identified' && !proposal && (
        <button
          onClick={onGenerateProposal}
          disabled={generating}
          className="w-full flex items-center justify-center gap-2 bg-blue-950 hover:bg-blue-900 disabled:opacity-50 text-blue-400 border border-blue-800 text-xs font-medium py-2 rounded-lg transition-colors"
        >
          {generating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
          {generating ? 'Generating...' : 'Generate Activation Proposal'}
        </button>
      )}

      {proposal && proposal.status === 'pending' && (
        <div className="space-y-2 bg-slate-950 border border-blue-900/40 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <Badge color="blue">proposal</Badge>
            <span className="text-[10px] text-slate-500">confidence {Math.round((proposal.confidence || 0) * 100)}%</span>
          </div>
          <div className="text-xs font-medium text-slate-200">{proposal.recommended_action}</div>
          <div className="text-xs text-slate-400 bg-slate-900 rounded p-2 border border-slate-800">{proposal.draft_message}</div>
          <p className="text-xs text-slate-500 italic">"{proposal.reasoning}"</p>
          <div className="flex gap-2">
            <button onClick={onApproveProposal} className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-950 hover:bg-emerald-900 text-emerald-400 border border-emerald-800 text-xs font-medium py-2 rounded-lg transition-colors">
              <Send className="w-3.5 h-3.5" /> Approve &amp; Activate
            </button>
            <button onClick={onRejectProposal} className="flex-1 flex items-center justify-center gap-1.5 bg-rose-950 hover:bg-rose-900 text-rose-400 border border-rose-800 text-xs font-medium py-2 rounded-lg transition-colors">
              <XCircle className="w-3.5 h-3.5" /> Reject
            </button>
          </div>
        </div>
      )}

      {opp.status === 'activated' && (
        <>
          {opp.activation_message && (
            <div className="text-xs text-slate-400 bg-slate-950 border border-slate-800 rounded p-2">
              <span className="text-slate-500">Sent (simulated): </span>{opp.activation_message}
            </div>
          )}
          <OutcomeForm onSubmit={(type, notes) => onRecordOutcome(opp, type, notes)} />
        </>
      )}

      {opp.status === 'completed' && opp.outcome && (
        <div className="text-xs bg-emerald-950/40 border border-emerald-900 rounded p-2 text-emerald-300">
          Outcome: {opp.outcome.type.replace('_', ' ')}{opp.outcome.notes ? ` — ${opp.outcome.notes}` : ''}
        </div>
      )}
    </div>
  );
}

function OpportunitiesTab({ opportunities, proposals, onGenerateProposal, onApproveProposal, onRejectProposal, onRecordOutcome, generatingId }) {
  if (opportunities.length === 0) {
    return <EmptyState icon={Target} text="No opportunities yet. Approve an extracted opportunity from the review queue to see it here." />;
  }
  const sorted = [...opportunities].sort((a, b) => mixTotal(b.mix) - mixTotal(a.mix));
  return (
    <div className="space-y-3">
      {sorted.map((opp) => {
        const proposal = proposals.find((p) => p.opportunity_id === opp.id && p.status === 'pending');
        return (
          <OpportunityCard
            key={opp.id}
            opp={opp}
            proposal={proposal}
            generating={generatingId === opp.id}
            onGenerateProposal={() => onGenerateProposal(opp)}
            onApproveProposal={() => onApproveProposal(proposal)}
            onRejectProposal={() => onRejectProposal(proposal)}
            onRecordOutcome={onRecordOutcome}
          />
        );
      })}
    </div>
  );
}

const STARTER_QUESTIONS = [
  'What do I know about Maria Chen?',
  'Which opportunities should I prioritize?',
  "Who haven't I been in touch with lately?",
  'Summarize everything related to Pinnacle Builders.',
];

function AskTab({ messages, input, onInputChange, onSend, onClear, asking, hasRecords }) {
  if (!hasRecords) {
    return <EmptyState icon={MessageSquare} text="No records to query yet. Load demo data or process an intake first, then come back and ask RIOS what it knows." />;
  }
  return (
    <div className="flex flex-col h-full space-y-3">
      {messages.length === 0 ? (
        <div className="space-y-2">
          <p className="text-sm text-slate-400">
            Ask anything about your contacts, organizations, opportunities, or past conversations.
            Answers come only from your stored records -- RIOS will say so when it doesn't know.
          </p>
          <div className="space-y-1.5">
            {STARTER_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => onSend(q)}
                disabled={asking}
                className="w-full text-left text-xs text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg px-3 py-2 transition-colors disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`rounded-lg p-3 text-sm ${
                m.role === 'user'
                  ? 'bg-emerald-950/40 border border-emerald-900/50 text-slate-200 ml-6'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 mr-6'
              }`}
            >
              <div className="text-[10px] uppercase tracking-wide text-slate-500 mb-1">
                {m.role === 'user' ? 'You' : 'RIOS Memory'}
              </div>
              <p className="whitespace-pre-wrap">{m.text}</p>
            </div>
          ))}
          {asking && (
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 mr-6 flex items-center gap-2 text-sm text-slate-500">
              <Loader2 className="w-4 h-4 animate-spin" /> Searching memory...
            </div>
          )}
          <button onClick={onClear} className="text-[10px] text-slate-500 hover:text-slate-300 flex items-center gap-1">
            <Trash2 className="w-3 h-3" /> Clear conversation
          </button>
        </div>
      )}

      <div className="flex gap-2 pt-1">
        <input
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && input.trim() && !asking) onSend(input); }}
          placeholder="Ask RIOS..."
          className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-700"
        />
        <button
          onClick={() => onSend(input)}
          disabled={asking || !input.trim()}
          className="flex items-center justify-center bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 text-white px-4 rounded-lg transition-colors"
        >
          {asking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

function AuditTab({ audit }) {
  if (audit.length === 0) {
    return <EmptyState icon={ScrollText} text="No audit events yet." />;
  }
  return (
    <div className="space-y-2">
      {audit.map((a) => (
        <div key={a.id} className="bg-slate-900 border border-slate-800 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Badge color="slate">{a.action}</Badge>
              <span className="text-xs text-slate-500">{a.entity_type}</span>
            </div>
            <span className="text-[10px] text-slate-500">{fmtTime(a.timestamp)}</span>
          </div>
          <p className="text-sm text-slate-300">{a.summary}</p>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main app
// ---------------------------------------------------------------------------
const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'ask', label: 'Ask', icon: MessageSquare },
  { id: 'intake', label: 'Intake', icon: FileText },
  { id: 'review', label: 'Review', icon: Inbox },
  { id: 'contacts', label: 'Contacts', icon: Users },
  { id: 'opportunities', label: 'Opportunities', icon: Target },
  { id: 'audit', label: 'Audit', icon: ScrollText },
];

export default function App() {
  const [tab, setTab] = useState('dashboard');
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatingId, setGeneratingId] = useState(null);
  const [enrichingOrgId, setEnrichingOrgId] = useState(null);
  const [confirmClear, setConfirmClear] = useState(false);

  const [contacts, setContacts] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [audit, setAudit] = useState([]);
  const [intakeText, setIntakeText] = useState('');
  const [askMessages, setAskMessages] = useState([]);
  const [askInput, setAskInput] = useState('');
  const [asking, setAsking] = useState(false);

  useEffect(() => {
    (async () => {
      const [c, o, e, op, cd, pr, au, ah] = await Promise.all([
        loadList(KEYS.contacts), loadList(KEYS.organizations), loadList(KEYS.episodes),
        loadList(KEYS.opportunities), loadList(KEYS.candidates), loadList(KEYS.proposals), loadList(KEYS.audit),
        loadList(KEYS.askHistory),
      ]);
      setContacts(c); setOrganizations(o); setEpisodes(e); setOpportunities(op);
      setCandidates(cd); setProposals(pr); setAudit(au); setAskMessages(ah);
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!confirmClear) return;
    const t = setTimeout(() => setConfirmClear(false), 3000);
    return () => clearTimeout(t);
  }, [confirmClear]);

  function pushAudit(action, entityType, entityId, summary) {
    const entry = { id: uid(), timestamp: now(), action, entity_type: entityType, entity_id: entityId, summary };
    setAudit((prev) => {
      const next = [entry, ...prev];
      saveList(KEYS.audit, next);
      return next;
    });
  }

  // --- Demo data ---------------------------------------------------------
  async function loadDemoData() {
    setLoading(true);
    setError('');

    const organizationsData = [
      { id: 'org-northgate', name: 'Northgate Capital', type: 'Investment Fund', notes: 'Mid-market real estate debt fund, ~$80M AUM, active in BC.', created_at: daysAgo(60) },
      { id: 'org-cascade', name: 'Cascade Strata Management', type: 'Property Management', notes: 'Manages 40+ strata corporations across the Lower Mainland.', created_at: daysAgo(120) },
      { id: 'org-pinnacle', name: 'Pinnacle Builders Group', type: 'Construction', notes: 'Mid-size residential builder, currently running 3 active projects.', created_at: daysAgo(200) },
    ];

    const contactsData = [
      { id: 'c-maria', name: 'Maria Chen', role: 'Investment Director', organization: 'Northgate Capital', notes: "Met at the CMBA conference. Actively looking for broker relationships to source strata-financing deals.", tags: ['investor', 'strata-financing', 'warm'], created_at: daysAgo(45) },
      { id: 'c-david', name: 'David Okafor', role: 'Operations Manager', organization: 'Cascade Strata Management', notes: 'Long-standing referral source — typically sends 2-3 condo refinance leads per quarter.', tags: ['referral-partner', 'recurring'], created_at: daysAgo(110) },
      { id: 'c-janet', name: 'Janet Wu', role: 'CFO', organization: 'Pinnacle Builders Group', notes: 'Construction loan renewal due in Q3. Has worked with us on two prior deals.', tags: ['construction', 'repeat-client'], created_at: daysAgo(190) },
      { id: 'c-tom', name: 'Tom Reyes', role: 'Independent Referral Partner', organization: '', notes: "Former colleague. Hasn't sent a referral in 8 months — worth reconnecting.", tags: ['dormant', 'reactivation'], created_at: daysAgo(240) },
    ];

    const opp1Mix = { credit: 80, intent: 85, capacity: 90, market: 75 };
    const opp2Mix = { credit: 90, intent: 95, capacity: 70, market: 60 };
    const opp3Mix = { credit: 70, intent: 75, capacity: 65, market: 80 };
    const opp4Mix = { credit: 50, intent: 30, capacity: 40, market: 55 };

    const opportunitiesData = [
      {
        id: 'o-northgate', title: 'Northgate Capital — $2M Strata Financing Facility',
        description: 'Northgate is closing a $2M strata-financing facility next quarter and is actively looking for broker relationships to source deals into it.',
        contact_name: 'Maria Chen', opportunity_type: 'strata-financing',
        mix: { ...opp1Mix, total: mixTotal(opp1Mix) },
        evidence: ['Fund has committed capital and an active mandate', 'Direct ask for broker relationships', 'Strong overlap with existing strata client book'],
        status: 'identified', created_at: daysAgo(12),
      },
      {
        id: 'o-pinnacle-renewal', title: 'Pinnacle Builders — Construction Loan Renewal',
        description: 'Construction loan renewal for the active residential project, due Q3. Janet confirmed intent to renew with the same broker.',
        contact_name: 'Janet Wu', opportunity_type: 'construction-renewal',
        mix: { ...opp2Mix, total: mixTotal(opp2Mix) },
        evidence: ['Existing relationship — two prior successful deals', 'Confirmed renewal timeline from CFO'],
        status: 'activated', created_at: daysAgo(20), activated_at: daysAgo(3),
        activation_message: "Hi Janet — following up on the Pinnacle construction loan renewal. Happy to get the paperwork moving whenever works for you, just let me know your preferred timeline and I'll send the updated docs over.",
      },
      {
        id: 'o-cascade-refi', title: 'Cascade Strata — Condo Refinance Pipeline',
        description: 'David flagged three condo owners in his managed portfolio who are considering refinancing this quarter.',
        contact_name: 'David Okafor', opportunity_type: 'referral-pipeline',
        mix: { ...opp3Mix, total: mixTotal(opp3Mix) },
        evidence: ['Recurring referral source', 'Three named leads provided directly'],
        status: 'completed', created_at: daysAgo(35),
        outcome: { type: 'meeting_booked', notes: 'Met with 2 of 3 leads — one application started, one still deciding.', recorded_at: daysAgo(8) },
      },
      {
        id: 'o-tom-reactivation', title: 'Tom Reyes — Relationship Reactivation',
        description: "Tom hasn't sent a referral in 8 months. Reconnecting could reopen a previously productive channel before he forgets us entirely.",
        contact_name: 'Tom Reyes', opportunity_type: 'reactivation',
        mix: { ...opp4Mix, total: mixTotal(opp4Mix) },
        evidence: ['No contact in 8 months — reactivation window closing', 'Previously sent 5+ referrals over 2 years'],
        status: 'dormant', created_at: daysAgo(5),
      },
    ];

    const candidatesData = [
      {
        id: 'cand-alex', type: 'contact', operation: 'create', target_id: null, confidence: 0.88,
        reasoning: 'New contact introduced this week as a warm referral from an existing relationship.',
        payload: { name: 'Alex Petrov', role: 'Managing Partner', organization: 'Northgate Capital', notes: "Maria Chen's business partner — also evaluating strata deals. Introduced via email earlier this week.", tags: ['investor', 'new'] },
        status: 'pending', source_episode_id: 'ep-latest', created_at: daysAgo(1),
      },
      {
        id: 'cand-pinnacle-2', type: 'opportunity', operation: 'create', target_id: null, confidence: 0.68,
        reasoning: 'Mentioned in passing during the renewal call — no firm commitment yet, but worth tracking.',
        payload: {
          title: 'Pinnacle Builders — Second Project Financing (Q4)',
          description: 'Janet mentioned a second residential project breaking ground in Q4 that will likely need separate financing.',
          contact_name: 'Janet Wu', opportunity_type: 'construction-financing',
          mix: { credit: 85, intent: 55, capacity: 65, market: 60 },
          evidence: ['Mentioned in passing during renewal discussion', 'No firm commitment yet'],
        },
        status: 'pending', source_episode_id: 'ep-latest', created_at: daysAgo(1),
      },
      {
        id: 'cand-david-update', type: 'contact', operation: 'update', target_id: 'c-david', confidence: 0.74,
        reasoning: 'David mentioned a title change in the latest conversation.',
        payload: { name: 'David Okafor', role: 'Senior Operations Manager', organization: 'Cascade Strata Management', notes: 'Promoted to senior ops manager — now oversees the full strata portfolio, not just downtown buildings.', tags: ['referral-partner', 'recurring', 'promoted'] },
        status: 'deferred', source_episode_id: 'ep-latest', created_at: daysAgo(2),
      },
    ];

    const proposalsData = [
      {
        id: 'prop-pinnacle', opportunity_id: 'o-pinnacle-renewal', opportunity_title: 'Pinnacle Builders — Construction Loan Renewal',
        recommended_action: 'Send renewal confirmation and request updated project financials to keep the file moving.',
        draft_message: "Hi Janet — following up on the Pinnacle construction loan renewal. Happy to get the paperwork moving whenever works for you, just let me know your preferred timeline and I'll send the updated docs over.",
        confidence: 0.91,
        reasoning: 'Confirmed renewal intent and an existing relationship make this a low-risk, high-priority action.',
        status: 'approved', created_at: daysAgo(3),
      },
    ];

    const episodesData = [
      { id: 'ep-1', text: 'Met Maria Chen from Northgate Capital at the CMBA conference. Their fund is closing a $2M strata-financing facility next quarter and she asked about broker relationships.', created_at: daysAgo(45), candidate_count: 2 },
      { id: 'ep-2', text: 'Call with Janet Wu at Pinnacle — confirmed the construction loan renewal is on track for Q3, she wants to use us again.', created_at: daysAgo(20), candidate_count: 1 },
      { id: 'ep-3', text: 'David from Cascade Strata flagged three condo owners considering refinancing this quarter.', created_at: daysAgo(35), candidate_count: 1 },
      { id: 'ep-latest', text: 'Quick call with Janet — renewal moving forward, also mentioned a second project starting Q4. Maria introduced her partner Alex Petrov by email. David got promoted to senior ops manager.', created_at: daysAgo(1), candidate_count: 3 },
    ];

    const auditData = [
      { id: uid(), timestamp: daysAgo(1), action: 'intake', entity_type: 'episode', entity_id: 'ep-latest', summary: 'Processed intake — 3 candidate(s) sent to review queue' },
      { id: uid(), timestamp: daysAgo(3), action: 'approve', entity_type: 'proposal', entity_id: 'prop-pinnacle', summary: 'Approved activation for "Pinnacle Builders — Construction Loan Renewal" — dispatch to Hermes simulated (no live RecallSync connection)' },
      { id: uid(), timestamp: daysAgo(3), action: 'propose', entity_type: 'opportunity', entity_id: 'o-pinnacle-renewal', summary: 'Generated activation proposal for Pinnacle Builders — Construction Loan Renewal' },
      { id: uid(), timestamp: daysAgo(5), action: 'create', entity_type: 'opportunity', entity_id: 'o-tom-reactivation', summary: 'Identified opportunity: Tom Reyes — Relationship Reactivation' },
      { id: uid(), timestamp: daysAgo(8), action: 'outcome', entity_type: 'opportunity', entity_id: 'o-cascade-refi', summary: 'Outcome recorded for "Cascade Strata — Condo Refinance Pipeline": meeting booked' },
      { id: uid(), timestamp: daysAgo(12), action: 'create', entity_type: 'opportunity', entity_id: 'o-northgate', summary: 'Identified opportunity: Northgate Capital — $2M Strata Financing Facility' },
      { id: uid(), timestamp: daysAgo(20), action: 'create', entity_type: 'opportunity', entity_id: 'o-pinnacle-renewal', summary: 'Identified opportunity: Pinnacle Builders — Construction Loan Renewal' },
      { id: uid(), timestamp: daysAgo(35), action: 'create', entity_type: 'opportunity', entity_id: 'o-cascade-refi', summary: 'Identified opportunity: Cascade Strata — Condo Refinance Pipeline' },
      { id: uid(), timestamp: daysAgo(45), action: 'create', entity_type: 'contact', entity_id: 'c-maria', summary: 'Created contact: Maria Chen' },
    ];

    await Promise.all([
      saveList(KEYS.contacts, contactsData),
      saveList(KEYS.organizations, organizationsData),
      saveList(KEYS.episodes, episodesData),
      saveList(KEYS.opportunities, opportunitiesData),
      saveList(KEYS.candidates, candidatesData),
      saveList(KEYS.proposals, proposalsData),
      saveList(KEYS.audit, auditData),
    ]);

    setContacts(contactsData);
    setOrganizations(organizationsData);
    setEpisodes(episodesData);
    setOpportunities(opportunitiesData);
    setCandidates(candidatesData);
    setProposals(proposalsData);
    setAudit(auditData);
    setLoading(false);
  }

  async function clearAllData() {
    setLoading(true);
    await Promise.all([
      saveList(KEYS.contacts, []),
      saveList(KEYS.organizations, []),
      saveList(KEYS.episodes, []),
      saveList(KEYS.opportunities, []),
      saveList(KEYS.candidates, []),
      saveList(KEYS.proposals, []),
      saveList(KEYS.audit, []),
    ]);
    setContacts([]); setOrganizations([]); setEpisodes([]); setOpportunities([]);
    setCandidates([]); setProposals([]); setAudit([]);
    setConfirmClear(false);
    setLoading(false);
  }

  // --- Ask RIOS (memory recall) ------------------------------------------------
  // Builds a compact snapshot of all canonical records and sends it with the
  // question. Multi-turn: prior Q&A pairs are included so follow-ups work.
  // History is capped to keep token use bounded at personal scale.
  async function askRios(question) {
    const q = (question || '').trim();
    if (!q || asking) return;
    setAsking(true);
    setError('');
    setAskInput('');

    const userMsg = { id: uid(), role: 'user', text: q, at: now() };
    const baseHistory = [...askMessages, userMsg];
    setAskMessages(baseHistory);

    try {
      const workspace = {
        today: now(),
        contacts,
        organizations: organizations.map((o) => ({
          ...o,
          enrichment: o.enrichment ? { summary: o.enrichment.summary, key_facts: o.enrichment.key_facts } : undefined,
        })),
        opportunities,
        episodes: episodes.map((e) => ({ date: e.created_at, text: e.text })),
      };

      // Prior turns (excluding the just-added question), capped at last 8 messages.
      const prior = askMessages.slice(-8).map((m) => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.text,
      }));

      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          system: ASK_SYSTEM,
          messages: [
            ...prior,
            { role: 'user', content: `WORKSPACE RECORDS:\n${JSON.stringify(workspace)}\n\nQUESTION: ${q}` },
          ],
        }),
      });
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();
      const block = (data.content || []).find((b) => b.type === 'text');
      const answer = block ? block.text : 'No answer returned.';

      const aiMsg = { id: uid(), role: 'assistant', text: answer, at: now() };
      const next = [...baseHistory, aiMsg].slice(-30); // cap stored history
      setAskMessages(next);
      saveList(KEYS.askHistory, next);
    } catch (e) {
      setError(e.message || 'Query failed.');
      // Keep the user's question visible so they can retry by resending.
    } finally {
      setAsking(false);
    }
  }

  function clearAskHistory() {
    setAskMessages([]);
    saveList(KEYS.askHistory, []);
  }

  // --- Manual edits & enrichment ---------------------------------------------
  function saveOrganization(updatedOrg) {
    setOrganizations((prev) => {
      const next = prev.map((o) => (o.id === updatedOrg.id ? updatedOrg : o));
      saveList(KEYS.organizations, next);
      return next;
    });
    pushAudit('update', 'organization', updatedOrg.id, `Edited organization: ${updatedOrg.name}`);
  }

  function saveContact(updatedContact) {
    setContacts((prev) => {
      const next = prev.map((c) => (c.id === updatedContact.id ? updatedContact : c));
      saveList(KEYS.contacts, next);
      return next;
    });
    pushAudit('update', 'contact', updatedContact.id, `Edited contact: ${updatedContact.name}`);
  }

  async function enrichOrganization(org) {
    setEnrichingOrgId(org.id);
    setError('');
    try {
      const user = `Organization name: ${org.name}\nKnown context: ${org.notes || 'none'}`;
      const text = await callClaudeWithSearch(ENRICHMENT_SYSTEM, user);
      const parsed = parseJSON(text);
      if (!parsed) throw new Error('Could not parse enrichment response.');
      const updated = { ...org, enrichment: { ...parsed, fetched_at: now() } };
      setOrganizations((prev) => {
        const next = prev.map((o) => (o.id === org.id ? updated : o));
        saveList(KEYS.organizations, next);
        return next;
      });
      pushAudit('enrich', 'organization', org.id, `Enriched "${org.name}" via web search`);
    } catch (e) {
      setError(e.message || 'Enrichment failed.');
    } finally {
      setEnrichingOrgId(null);
    }
  }

  // --- Intake -> extraction --------------------------------------------------
  async function processIntake() {
    if (!intakeText.trim()) return;
    setLoading(true);
    setError('');
    try {
      const existing = [
        ...contacts.map((c) => ({ id: c.id, type: 'contact', name: c.name })),
        ...organizations.map((o) => ({ id: o.id, type: 'organization', name: o.name })),
      ];
      const user = `Existing records:\n${JSON.stringify(existing)}\n\nNew conversation/notes:\n${intakeText}`;
      const text = await callClaude(EXTRACTION_SYSTEM, user);
      const parsed = parseJSON(text);
      if (!Array.isArray(parsed)) throw new Error('Could not parse AI response.');

      const ts = now();
      const episode = { id: uid(), text: intakeText, created_at: ts, candidate_count: parsed.length };
      setEpisodes((prev) => {
        const next = [episode, ...prev];
        saveList(KEYS.episodes, next);
        return next;
      });

      const newCandidates = parsed.map((p) => ({ id: uid(), ...p, status: 'pending', source_episode_id: episode.id, created_at: ts }));
      setCandidates((prev) => {
        const next = [...newCandidates, ...prev];
        saveList(KEYS.candidates, next);
        return next;
      });

      pushAudit('intake', 'episode', episode.id, `Processed intake — ${parsed.length} candidate(s) sent to review queue`);
      setIntakeText('');
      setTab('review');
    } catch (e) {
      setError(e.message || 'Extraction failed.');
    } finally {
      setLoading(false);
    }
  }

  // --- Candidate actions -------------------------------------------------------
  function approveCandidate(candidate) {
    const ts = now();
    const p = candidate.payload || {};

    if (candidate.type === 'contact') {
      if (candidate.operation === 'update' && candidate.target_id) {
        setContacts((prev) => {
          const next = prev.map((c) => (c.id === candidate.target_id ? { ...c, ...p, updated_at: ts } : c));
          saveList(KEYS.contacts, next);
          return next;
        });
        pushAudit('update', 'contact', candidate.target_id, `Updated contact: ${p.name}`);
      } else {
        const rec = { id: uid(), name: p.name, role: p.role, organization: p.organization, notes: p.notes, tags: p.tags || [], created_at: ts };
        setContacts((prev) => {
          const next = [...prev, rec];
          saveList(KEYS.contacts, next);
          return next;
        });
        pushAudit('create', 'contact', rec.id, `Created contact: ${rec.name}`);
      }
    } else if (candidate.type === 'organization') {
      if (candidate.operation === 'update' && candidate.target_id) {
        setOrganizations((prev) => {
          const next = prev.map((o) => (o.id === candidate.target_id ? { ...o, ...p, updated_at: ts } : o));
          saveList(KEYS.organizations, next);
          return next;
        });
        pushAudit('update', 'organization', candidate.target_id, `Updated organization: ${p.name}`);
      } else {
        const rec = { id: uid(), name: p.name, type: p.type, notes: p.notes, created_at: ts };
        setOrganizations((prev) => {
          const next = [...prev, rec];
          saveList(KEYS.organizations, next);
          return next;
        });
        pushAudit('create', 'organization', rec.id, `Created organization: ${rec.name}`);
      }
    } else if (candidate.type === 'opportunity') {
      const mix = { ...(p.mix || {}) };
      mix.total = mixTotal(mix);
      const rec = {
        id: uid(), title: p.title, description: p.description, contact_name: p.contact_name,
        opportunity_type: p.opportunity_type, mix, evidence: p.evidence || [],
        status: 'identified', created_at: ts,
      };
      setOpportunities((prev) => {
        const next = [...prev, rec];
        saveList(KEYS.opportunities, next);
        return next;
      });
      pushAudit('create', 'opportunity', rec.id, `Identified opportunity: ${rec.title}`);
    }

    setCandidates((prev) => {
      const next = prev.filter((c) => c.id !== candidate.id);
      saveList(KEYS.candidates, next);
      return next;
    });
    pushAudit('approve', 'candidate', candidate.id, `Approved ${candidate.operation} ${candidate.type}`);
  }

  function rejectCandidate(candidate) {
    setCandidates((prev) => {
      const next = prev.filter((c) => c.id !== candidate.id);
      saveList(KEYS.candidates, next);
      return next;
    });
    pushAudit('reject', 'candidate', candidate.id, `Rejected ${candidate.operation} ${candidate.type} — no canonical change`);
  }

  function deferCandidate(candidate) {
    setCandidates((prev) => {
      const next = prev.map((c) => (c.id === candidate.id ? { ...c, status: 'deferred' } : c));
      saveList(KEYS.candidates, next);
      return next;
    });
    pushAudit('defer', 'candidate', candidate.id, `Deferred ${candidate.operation} ${candidate.type}`);
  }

  function reconsiderCandidate(candidate) {
    setCandidates((prev) => {
      const next = prev.map((c) => (c.id === candidate.id ? { ...c, status: 'pending' } : c));
      saveList(KEYS.candidates, next);
      return next;
    });
  }

  // --- Opportunity activation ---------------------------------------------------
  async function generateProposal(opp) {
    setGeneratingId(opp.id);
    setError('');
    try {
      const contact = contacts.find((c) => c.name === opp.contact_name);
      const user = `Opportunity:\n${JSON.stringify(opp)}\n\nContact context:\n${JSON.stringify(contact || {})}`;
      const text = await callClaude(PROPOSAL_SYSTEM, user);
      const parsed = parseJSON(text);
      if (!parsed) throw new Error('Could not parse AI response.');

      const proposal = { id: uid(), opportunity_id: opp.id, opportunity_title: opp.title, ...parsed, status: 'pending', created_at: now() };
      setProposals((prev) => {
        const next = [proposal, ...prev];
        saveList(KEYS.proposals, next);
        return next;
      });
      pushAudit('propose', 'opportunity', opp.id, `Generated activation proposal for ${opp.title}`);
    } catch (e) {
      setError(e.message || 'Proposal generation failed.');
    } finally {
      setGeneratingId(null);
    }
  }

  function approveProposal(proposal) {
    if (!proposal) return;
    setProposals((prev) => {
      const next = prev.map((p) => (p.id === proposal.id ? { ...p, status: 'approved' } : p));
      saveList(KEYS.proposals, next);
      return next;
    });
    setOpportunities((prev) => {
      const next = prev.map((o) => (o.id === proposal.opportunity_id ? { ...o, status: 'activated', activated_at: now(), activation_message: proposal.draft_message } : o));
      saveList(KEYS.opportunities, next);
      return next;
    });
    pushAudit('approve', 'proposal', proposal.id, `Approved activation for "${proposal.opportunity_title}" — dispatch to Hermes simulated (no live RecallSync connection)`);
  }

  function rejectProposal(proposal) {
    if (!proposal) return;
    setProposals((prev) => {
      const next = prev.map((p) => (p.id === proposal.id ? { ...p, status: 'rejected' } : p));
      saveList(KEYS.proposals, next);
      return next;
    });
    pushAudit('reject', 'proposal', proposal.id, `Rejected activation proposal for "${proposal.opportunity_title}"`);
  }

  function recordOutcome(opp, type, notes) {
    setOpportunities((prev) => {
      const next = prev.map((o) => (o.id === opp.id ? { ...o, status: 'completed', outcome: { type, notes, recorded_at: now() } } : o));
      saveList(KEYS.opportunities, next);
      return next;
    });
    pushAudit('outcome', 'opportunity', opp.id, `Outcome recorded for "${opp.title}": ${type.replace('_', ' ')}`);
  }

  const pendingCount = candidates.filter((c) => c.status === 'pending').length;

  if (!loaded) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-emerald-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col font-sans">
      <header className="border-b border-slate-800 px-4 py-4 flex items-start justify-between gap-2">
        <div>
          <h1 className="text-lg font-semibold text-slate-100">RIOS Lite</h1>
          <p className="text-xs text-slate-500">Personal relationship & opportunity intelligence — governed loop demo</p>
        </div>
        <div className="flex flex-col gap-1.5 flex-shrink-0">
          <button
            onClick={loadDemoData}
            disabled={loading}
            className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 border border-emerald-900 bg-emerald-950/50 rounded-lg px-2.5 py-1.5 disabled:opacity-50 transition-colors"
          >
            <Database className="w-3.5 h-3.5" /> Demo Data
          </button>
          {confirmClear ? (
            <button
              onClick={clearAllData}
              disabled={loading}
              className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 border border-rose-900 bg-rose-950/50 rounded-lg px-2.5 py-1.5 disabled:opacity-50 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Confirm?
            </button>
          ) : (
            <button
              onClick={() => setConfirmClear(true)}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 border border-slate-800 rounded-lg px-2.5 py-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear
            </button>
          )}
        </div>
      </header>

      <nav className="border-b border-slate-800 px-2 flex overflow-x-auto">
        {TABS.map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
                active ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {t.label}
              {t.id === 'review' && pendingCount > 0 && (
                <span className="bg-amber-500 text-slate-950 text-[10px] font-bold rounded-full px-1.5 leading-4">{pendingCount}</span>
              )}
            </button>
          );
        })}
      </nav>

      <main className="flex-1 p-4 max-w-2xl mx-auto w-full">
        {error && (
          <div className="flex items-start gap-2 bg-rose-950/50 border border-rose-900 rounded-lg p-3 text-sm text-rose-300 mb-4">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
        {tab === 'dashboard' && (
          <DashboardTab contacts={contacts} organizations={organizations} opportunities={opportunities} candidates={candidates} audit={audit} />
        )}
        {tab === 'ask' && (
          <AskTab
            messages={askMessages}
            input={askInput}
            onInputChange={setAskInput}
            onSend={askRios}
            onClear={clearAskHistory}
            asking={asking}
            hasRecords={contacts.length > 0 || organizations.length > 0 || opportunities.length > 0 || episodes.length > 0}
          />
        )}
        {tab === 'intake' && (
          <IntakeTab value={intakeText} onChange={setIntakeText} onProcess={processIntake} loading={loading} />
        )}
        {tab === 'review' && (
          <ReviewTab
            candidates={candidates}
            onApprove={approveCandidate}
            onReject={rejectCandidate}
            onDefer={deferCandidate}
            onReconsider={reconsiderCandidate}
          />
        )}
        {tab === 'contacts' && (
          <ContactsTab
            contacts={contacts}
            organizations={organizations}
            onSaveOrg={saveOrganization}
            onSaveContact={saveContact}
            onEnrichOrg={enrichOrganization}
            enrichingOrgId={enrichingOrgId}
          />
        )}
        {tab === 'opportunities' && (
          <OpportunitiesTab
            opportunities={opportunities}
            proposals={proposals}
            onGenerateProposal={generateProposal}
            onApproveProposal={approveProposal}
            onRejectProposal={rejectProposal}
            onRecordOutcome={recordOutcome}
            generatingId={generatingId}
          />
        )}
        {tab === 'audit' && <AuditTab audit={audit} />}
      </main>
    </div>
  );
}
