export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'

export async function GET() {
  const resendConfigured = !!(
    process.env.RESEND_API_KEY &&
    !process.env.RESEND_API_KEY.includes('placeholder')
  )
  const gmailConfigured = !!(
    process.env.GMAIL_CLIENT_ID &&
    process.env.GMAIL_CLIENT_SECRET &&
    process.env.GMAIL_REFRESH_TOKEN &&
    process.env.GMAIL_FROM_EMAIL &&
    !process.env.GMAIL_CLIENT_ID.includes('placeholder')
  )

  return NextResponse.json({
    resend: {
      configured: resendConfigured,
      from: resendConfigured ? process.env.RESEND_FROM_EMAIL : null,
    },
    gmail: {
      configured: gmailConfigured,
      from: gmailConfigured ? process.env.GMAIL_FROM_EMAIL : null,
    },
  })
}
