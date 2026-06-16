import { google } from 'googleapis'

// Lazy OAuth2 client — no module-level init
function getAuth() {
  const oauth2 = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
  )
  oauth2.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN })
  return oauth2
}

function fromField() {
  const email = process.env.GMAIL_FROM_EMAIL!
  const name = process.env.GMAIL_FROM_NAME ?? 'MIX'
  return { email, name, formatted: `${name} <${email}>` }
}

// RFC 2822 raw message → base64url for Gmail API
function buildRaw(to: string, subject: string, html: string, text?: string): string {
  const { formatted } = fromField()
  const boundary = `__mix_${Date.now()}__`
  const lines = [
    `From: ${formatted}`,
    `To: ${to}`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    '',
    `--${boundary}`,
  ]
  if (text) {
    lines.push('Content-Type: text/plain; charset=utf-8', '', text, '', `--${boundary}`)
  }
  lines.push('Content-Type: text/html; charset=utf-8', '', html, '', `--${boundary}--`)
  return Buffer.from(lines.join('\r\n')).toString('base64url')
}

export interface GmailSendResult {
  id: string | null | undefined
  threadId: string | null | undefined
}

export async function sendGmail(params: {
  to: string
  subject: string
  html: string
  text?: string
}): Promise<GmailSendResult> {
  const auth = getAuth()
  const gmail = google.gmail({ version: 'v1', auth })
  const raw = buildRaw(params.to, params.subject, params.html, params.text)

  const res = await gmail.users.messages.send({
    userId: 'me',
    requestBody: { raw },
  })

  return { id: res.data.id, threadId: res.data.threadId }
}

// Send to multiple recipients with rate limiting (Gmail: ~14 msg/sec max)
export async function sendGmailBatch(
  recipients: Array<{ to: string; subject: string; html: string; text?: string }>,
  delayMs = 200
): Promise<Array<GmailSendResult | { error: string }>> {
  const results: Array<GmailSendResult | { error: string }> = []
  for (const r of recipients) {
    try {
      const res = await sendGmail(r)
      results.push(res)
    } catch (e) {
      results.push({ error: String(e) })
    }
    if (delayMs > 0) await new Promise(res => setTimeout(res, delayMs))
  }
  return results
}

export function gmailConfigured(): boolean {
  return !!(
    process.env.GMAIL_CLIENT_ID &&
    process.env.GMAIL_CLIENT_SECRET &&
    process.env.GMAIL_REFRESH_TOKEN &&
    process.env.GMAIL_FROM_EMAIL
  )
}
