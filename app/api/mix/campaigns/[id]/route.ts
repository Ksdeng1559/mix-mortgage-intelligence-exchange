export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const sb = createServiceClient()

  const [campaignRes, sendsRes] = await Promise.all([
    sb.from('mix_campaigns').select('*').eq('id', id).single(),
    sb.from('mix_campaign_sends').select('status, opened_at, clicked_at, replied_at, bounced_at, created_at').eq('campaign_id', id),
  ])

  if (campaignRes.error) return NextResponse.json({ error: campaignRes.error.message }, { status: 404 })

  const sends = sendsRes.data ?? []
  const stats = {
    total: sends.length,
    sent: sends.filter(s => s.status !== 'queued').length,
    opened: sends.filter(s => s.opened_at).length,
    clicked: sends.filter(s => s.clicked_at).length,
    replied: sends.filter(s => s.replied_at).length,
    bounced: sends.filter(s => s.bounced_at).length,
  }

  return NextResponse.json({ campaign: campaignRes.data, stats })
}

export async function PATCH(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const sb = createServiceClient()
  const body = await _req.json()

  const { data, error } = await sb
    .from('mix_campaigns')
    .update(body)
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data)
}
