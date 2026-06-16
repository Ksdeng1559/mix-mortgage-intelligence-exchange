import { Resend } from 'resend'

// Lazy — avoid module-level instantiation so Docker build succeeds without env vars
function getClient() {
  return new Resend(process.env.RESEND_API_KEY)
}

export const FROM_EMAIL = () => process.env.RESEND_FROM_EMAIL ?? 'noreply@example.com'
export const FROM_NAME = () => process.env.RESEND_FROM_NAME ?? 'MIX'
export const FROM = () => `${FROM_NAME()} <${FROM_EMAIL()}>`

export interface SendEmailParams {
  to: string
  toName?: string
  subject: string
  html: string
  text?: string
  tags?: Array<{ name: string; value: string }>
}

export async function sendEmail(p: SendEmailParams) {
  return getClient().emails.send({
    from: FROM(),
    to: p.toName ? `${p.toName} <${p.to}>` : p.to,
    subject: p.subject,
    html: p.html,
    text: p.text,
    tags: p.tags,
  })
}

export async function sendBatch(emails: Array<{
  from: string
  to: string
  subject: string
  html: string
  text?: string
  tags?: Array<{ name: string; value: string }>
}>) {
  return getClient().batch.send(emails)
}
