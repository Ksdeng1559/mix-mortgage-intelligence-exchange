// Unipile API — docs: https://developer.unipile.com/reference
// Auth: X-API-KEY header
// Base URL from env: UNIPILE_BASE_URL (e.g. https://api1.unipile.com:13465)

function getBase() { return process.env.UNIPILE_BASE_URL ?? 'https://api1.unipile.com:13465' }
function getKey() { return process.env.UNIPILE_API_KEY ?? '' }
function getAccountId() { return process.env.UNIPILE_ACCOUNT_ID ?? '' }

async function req<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${getBase()}/api/v1${path}`, {
    ...options,
    headers: {
      'X-API-KEY': getKey(),
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Unipile ${res.status}: ${text}`)
  }
  return res.json() as Promise<T>
}

export function unipileConfigured(): boolean {
  const key = process.env.UNIPILE_API_KEY
  return !!key && key !== 'placeholder_add_your_key'
}

export interface UnipileAccount {
  id: string
  name: string
  type: string
  sources?: Array<{ status: string }>
}

// GET /api/v1/accounts
export async function listAccounts(): Promise<UnipileAccount[]> {
  const data = await req<{ items: UnipileAccount[] }>('/accounts')
  return data.items ?? []
}

// POST /api/v1/emails — send via connected email account (Gmail/Outlook in Unipile)
export async function sendUnipileEmail(params: {
  account_id?: string
  to: Array<{ identifier: string; display_name?: string }>
  subject: string
  body: string
  cc?: Array<{ identifier: string; display_name?: string }>
}): Promise<{ tracking_id?: string; provider_id?: string }> {
  return req('/emails', {
    method: 'POST',
    body: JSON.stringify({
      account_id: params.account_id ?? getAccountId(),
      to: params.to,
      subject: params.subject,
      body: params.body,
      ...(params.cc ? { cc: params.cc } : {}),
    }),
  })
}

// POST /api/v1/chats/{chat_id}/messages — send in existing chat (LinkedIn, WhatsApp, etc.)
export async function sendChatMessage(params: {
  chat_id: string
  text: string
  account_id?: string
}): Promise<{ object: string; message_id: string | null }> {
  return req(`/chats/${params.chat_id}/messages`, {
    method: 'POST',
    body: JSON.stringify({
      text: params.text,
      ...(params.account_id ? { account_id: params.account_id } : {}),
    }),
  })
}

// GET /api/v1/chats — list chats for an account
export async function listChats(params?: {
  account_id?: string
  limit?: number
}): Promise<{ items: UnipileChat[] }> {
  const qs = new URLSearchParams()
  if (params?.account_id ?? getAccountId()) qs.set('account_id', params?.account_id ?? getAccountId())
  if (params?.limit) qs.set('limit', String(params.limit))
  return req<{ items: UnipileChat[] }>(`/chats?${qs}`)
}

export interface UnipileChat {
  id: string
  account_id: string
  provider_id: string
  name: string | null
  type: string
  unread_count: number
  last_message_at: string | null
  attendees: Array<{ identifier: string; name?: string }>
}
