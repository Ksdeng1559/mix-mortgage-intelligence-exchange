export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'
import { sendBatch, FROM } from '@/lib/resend'
import { sendGmailBatch, gmailConfigured } from '@/lib/gmail'

type Provider = 'resend' | 'gmail'

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const sb = createServiceClient()

  const body = await _req.json().catch(() => ({}))
  const provider: Provider = body.provider ?? 'resend'

  if (provider === 'gmail' && !gmailConfigured()) {
    return NextResponse.json({ error: 'Gmail not configured' }, { status: 400 })
  }

  // Load campaign
  const { data: campaign, error: campErr } = await sb
    .from('mix_campaigns')
    .select('*')
    .eq('id', id)
    .single()

  if (campErr || !campaign) return NextResponse.json({ error: 'Campaign not found' }, { status: 404 })
  if (campaign.status === 'sent') return NextResponse.json({ error: 'Campaign already sent' }, { status: 409 })

  // Resolve contacts from segment filter
  let query = sb.from('contacts').select('id, first_name, last_name, email')
  const seg = campaign.segment_filter ?? {}
  if (seg.contact_type) query = query.eq('contact_type', seg.contact_type)
  if (seg.tier) query = query.eq('tier', seg.tier)
  query = query.not('email', 'is', null).limit(500)

  const { data: contacts, error: conErr } = await query
  if (conErr) return NextResponse.json({ error: conErr.message }, { status: 500 })
  if (!contacts?.length) return NextResponse.json({ error: 'No contacts match segment' }, { status: 400 })

  const html = campaign.body_html ?? `<p>${(campaign.body_text ?? '').replace(/\n/g, '</p><p>')}</p>`
  const text = campaign.body_text ?? undefined

  let results: Array<{ id?: string | null; error?: string }> = []

  if (provider === 'gmail') {
    // Gmail API — sequential with rate-limit delay
    const gmailResults = await sendGmailBatch(
      contacts.map(c => ({
        to: `${c.first_name} ${c.last_name} <${c.email}>`,
        subject: campaign.subject,
        html,
        text,
      })),
      150 // 150ms between sends ≈ ~6/sec, well under Gmail limits
    )
    results = gmailResults.map(r =>
      'error' in r ? { error: r.error } : { id: r.id ?? null }
    )
  } else {
    // Resend batch (chunks of 100)
    const fromField = campaign.from_email
      ? `${campaign.from_name ?? 'MIX'} <${campaign.from_email}>`
      : FROM()

    const batchEmails = contacts.map(c => ({
      from: fromField,
      to: `${c.first_name} ${c.last_name} <${c.email}>`,
      subject: campaign.subject,
      html,
      text,
      tags: [
        { name: 'campaign_id', value: id },
        { name: 'contact_id', value: c.id },
      ],
    }))

    const CHUNK = 100
    for (let i = 0; i < batchEmails.length; i += CHUNK) {
      try {
        const res = await sendBatch(batchEmails.slice(i, i + CHUNK))
        if (res.data?.data) results.push(...res.data.data)
      } catch (e) {
        results.push({ error: String(e) })
      }
    }
  }

  // Insert send records
  const sendRows = contacts.map((c, i) => ({
    campaign_id: id,
    contact_id: c.id,
    resend_message_id: results[i]?.error ? null : (results[i]?.id ?? null),
    status: results[i]?.error ? 'queued' as const : 'sent' as const,
  }))

  await sb.from('mix_campaign_sends').insert(sendRows)

  const sentCount = sendRows.filter(r => r.status === 'sent').length
  const errorCount = sendRows.filter(r => r.status === 'queued').length

  await sb.from('mix_campaigns').update({
    status: 'sent',
    sent_count: sentCount,
    sent_at: new Date().toISOString(),
  }).eq('id', id)

  return NextResponse.json({ sent: sentCount, errors: errorCount, total: contacts.length, provider })
}
