import { NextRequest, NextResponse } from 'next/server'

const NOTIFY_EMAIL = process.env.REFERRAL_NOTIFY_EMAIL ?? 'mortgagesbydennis.eng@gmail.com'
const RESEND_API_KEY = process.env.RESEND_API_KEY

interface ReferralBody {
  partnerType: string
  partnerFirst: string
  partnerLast: string
  partnerEmail: string
  partnerPhone?: string
  partnerCompany: string
  clientFirst: string
  clientLast: string
  clientPhone: string
  clientEmail?: string
  situation: string
  notes?: string
  hp?: string
}

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function buildEmailHtml(data: ReferralBody): string {
  return `
<h2>New Partner Referral — MIX</h2>
<hr/>
<h3>Partner</h3>
<table>
  <tr><td><strong>Name</strong></td><td>${esc(data.partnerFirst)} ${esc(data.partnerLast)}</td></tr>
  <tr><td><strong>Company</strong></td><td>${esc(data.partnerCompany)}</td></tr>
  <tr><td><strong>Email</strong></td><td>${esc(data.partnerEmail)}</td></tr>
  <tr><td><strong>Phone</strong></td><td>${esc(data.partnerPhone || '—')}</td></tr>
  <tr><td><strong>Partner type</strong></td><td>${esc(data.partnerType)}</td></tr>
</table>
<h3>Client</h3>
<table>
  <tr><td><strong>Name</strong></td><td>${esc(data.clientFirst)} ${esc(data.clientLast)}</td></tr>
  <tr><td><strong>Phone</strong></td><td>${esc(data.clientPhone)}</td></tr>
  <tr><td><strong>Email</strong></td><td>${esc(data.clientEmail || '—')}</td></tr>
  <tr><td><strong>Situation</strong></td><td>${esc(data.situation)}</td></tr>
</table>
<h3>Notes</h3>
<p>${esc(data.notes || 'None provided.')}</p>
<hr/>
<p style="font-size:12px;color:#666">Submitted via MIX partner referral form</p>
  `.trim()
}

async function sendViaResend(data: ReferralBody): Promise<boolean> {
  if (!RESEND_API_KEY) return false
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'MIX Referrals <referrals@klicksmartai.com>',
        to: [NOTIFY_EMAIL],
        reply_to: EMAIL_RE.test(data.partnerEmail) ? data.partnerEmail : NOTIFY_EMAIL,
        subject: `New referral from ${data.partnerFirst} ${data.partnerLast} (${data.partnerCompany}) — ${data.clientFirst} ${data.clientLast}`,
        html: buildEmailHtml(data),
      }),
    })
    return res.ok
  } catch {
    return false
  }
}

export async function POST(req: NextRequest) {
  let body: ReferralBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // Honeypot check — return 200 to fool bots
  if (body.hp) {
    return NextResponse.json({ ok: true })
  }

  // Basic required field validation
  const required: (keyof ReferralBody)[] = [
    'partnerFirst', 'partnerLast', 'partnerEmail', 'partnerCompany',
    'clientFirst', 'clientLast', 'clientPhone', 'situation',
  ]
  for (const field of required) {
    if (!body[field]?.toString().trim()) {
      return NextResponse.json({ error: `Missing field: ${field}` }, { status: 422 })
    }
  }

  const emailSent = await sendViaResend(body)

  // Log without PII — email/phone stay out of server logs
  console.log('[MIX referral]', {
    partnerType: body.partnerType,
    partnerCompany: body.partnerCompany,
    situation: body.situation,
    emailSent,
  })

  return NextResponse.json({ ok: true, emailSent })
}
