export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

// Resend sends: email.sent, email.delivered, email.opened, email.clicked, email.bounced
export async function POST(req: Request) {
  const payload = await req.json()
  const { type, data } = payload

  const messageId: string | undefined = data?.email_id
  if (!messageId) return NextResponse.json({ ok: true })

  const sb = createServiceClient()
  const now = new Date().toISOString()

  const updates: Record<string, string | null> = { status: 'sent' }

  switch (type) {
    case 'email.delivered':
      updates.status = 'delivered'
      break
    case 'email.opened':
      updates.status = 'opened'
      updates.opened_at = now
      break
    case 'email.clicked':
      updates.status = 'clicked'
      updates.clicked_at = now
      break
    case 'email.bounced':
      updates.status = 'bounced'
      updates.bounced_at = now
      break
    default:
      return NextResponse.json({ ok: true })
  }

  const { data: sendRow } = await sb
    .from('mix_campaign_sends')
    .update(updates)
    .eq('resend_message_id', messageId)
    .select('campaign_id')
    .single()

  // Bump campaign aggregate counts
  if (sendRow?.campaign_id) {
    const col = type === 'email.opened' ? 'open_count'
      : type === 'email.clicked' ? 'click_count'
      : type === 'email.bounced' ? 'bounce_count'
      : null

    if (col) {
      await sb.rpc('increment_campaign_count', { campaign_id: sendRow.campaign_id, col_name: col })
    }
  }

  return NextResponse.json({ ok: true })
}

