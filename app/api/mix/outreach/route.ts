export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'
import { sendEmail, FROM } from '@/lib/resend'

export async function GET(req: Request) {
  const sb = createServiceClient()
  const { searchParams } = new URL(req.url)
  const direction = searchParams.get('direction') ?? 'outbound'
  const contact_id = searchParams.get('contact_id')

  let query = sb
    .from('mix_outreach_messages')
    .select('*, contacts(first_name, last_name, email, organization_name)')
    .eq('direction', direction)
    .order('sent_at', { ascending: false })
    .limit(100)

  if (contact_id) query = query.eq('contact_id', contact_id)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ messages: data ?? [] })
}

export async function POST(req: Request) {
  const sb = createServiceClient()
  const body = await req.json()
  const { contact_id, channel, body: msgBody, subject } = body

  if (!channel || !msgBody) {
    return NextResponse.json({ error: 'channel and body required' }, { status: 400 })
  }

  // Get contact details
  let contact: { email: string | null; first_name: string; last_name: string } | null = null
  if (contact_id) {
    const { data: c } = await sb
      .from('contacts')
      .select('email, first_name, last_name')
      .eq('id', contact_id)
      .single()
    contact = c
  }

  let providerMsgId: string | null = null

  if (channel === 'email') {
    // Send via Resend
    const resendConfigured = process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.startsWith('re_placeholder')
    if (!resendConfigured) {
      return NextResponse.json({ error: 'Resend not configured. Add RESEND_API_KEY to .env.local' }, { status: 400 })
    }
    if (!contact?.email) {
      return NextResponse.json({ error: 'Contact email required' }, { status: 400 })
    }

    const toName = contact ? `${contact.first_name} ${contact.last_name}` : undefined
    const emailSubject = subject || 'Message from Dennis Deng | MIX'
    const html = `<p>${msgBody.replace(/\n/g, '</p><p>')}</p>`

    try {
      const result = await sendEmail({ to: contact.email, toName, subject: emailSubject, html, text: msgBody })
      providerMsgId = result.data?.id ?? null
    } catch (e) {
      return NextResponse.json({ error: `Resend error: ${String(e)}` }, { status: 502 })
    }
  } else if (channel === 'gmail' || channel === 'outlook') {
    // Send email via Unipile connected account
    const { unipileConfigured, sendUnipileEmail } = await import('@/lib/unipile')
    if (!unipileConfigured()) {
      return NextResponse.json({ error: 'Unipile not configured — add UNIPILE_API_KEY, UNIPILE_BASE_URL, UNIPILE_ACCOUNT_ID' }, { status: 400 })
    }
    if (!contact?.email) {
      return NextResponse.json({ error: 'Contact email required' }, { status: 400 })
    }
    try {
      const result = await sendUnipileEmail({
        to: [{ identifier: contact.email, display_name: contact ? `${contact.first_name} ${contact.last_name}` : undefined }],
        subject: subject || 'Message from Dennis Deng | MIX',
        body: msgBody,
      })
      providerMsgId = result.provider_id ?? result.tracking_id ?? null
    } catch (e) {
      return NextResponse.json({ error: `Unipile error: ${String(e)}` }, { status: 502 })
    }
  } else {
    // LinkedIn / WhatsApp — requires existing chat_id, log as queued for now
    // To send: look up chat via GET /api/v1/chats?account_id=... then POST /api/v1/chats/{id}/messages
  }

  const { data, error } = await sb
    .from('mix_outreach_messages')
    .insert({
      contact_id: contact_id ?? null,
      channel,
      subject: subject ?? null,
      provider_msg_id: providerMsgId,
      direction: 'outbound',
      body: msgBody,
      status: providerMsgId ? 'sent' : 'queued',
      sent_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
