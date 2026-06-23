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

function buildEmailHtml(data: ReferralBody): string {
  return `
<h2>New Partner Referral — MIX</h2>
<hr/>
<h3>Partner</h3>
<table>
  <tr><td><strong>Name</strong></td><td>${data.partnerFirst} ${data.partnerLast}</td></tr>
  <tr><td><strong>Company</strong></td><td>${data.partnerCompany}</td></tr>
  <tr><td><strong>Email</strong></td><td>${data.partnerEmail}</td></tr>
  <tr><td><strong>Phone</strong></td><td>${data.partnerPhone || '—'}</td></tr>
  <tr><td><strong>Partner type</strong></td><td>${data.partnerType}</td></tr>
</table>
<h3>Client</h3>
<table>
  <tr><td><strong>Name</strong></td><td>${data.clientFirst} ${data.clientLast}</td></tr>
  <tr><td><strong>Phone</strong></td><td>${data.clientPhone}</td></tr>
  <tr><td><strong>Email</strong></td><td>${data.clientEmail || '—'}</td></tr>
  <tr><td><strong>Situation</strong></td><td>${data.situation}</td></tr>
</table>
<h3>Notes</h3>
<p>${data.notes || 'None provided.'}</p>
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
        reply_to: data.partnerEmail,
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

  // Log regardless — useful if Resend isn't configured yet
  console.log('[MIX referral]', {
    partnerType: body.partnerType,
    partner: `${body.partnerFirst} ${body.partnerLast} <${body.partnerEmail}>`,
    client: `${body.clientFirst} ${body.clientLast} ${body.clientPhone}`,
    situation: body.situation,
    emailSent,
  })

  return NextResponse.json({ ok: true, emailSent })
}
