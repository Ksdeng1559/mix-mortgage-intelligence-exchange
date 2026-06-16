/**
 * One-time script to get Gmail OAuth2 refresh token.
 *
 * Usage:
 *   1. Go to console.cloud.google.com
 *   2. Create project → Enable Gmail API
 *   3. Create OAuth2 credentials (Desktop app type)
 *   4. Download credentials JSON and note CLIENT_ID + CLIENT_SECRET
 *   5. Set env vars below or pass as env:
 *        GMAIL_CLIENT_ID=... GMAIL_CLIENT_SECRET=... node scripts/get-gmail-token.mjs
 *   6. Visit the URL it prints, authorize, paste the code back
 *   7. Copy the refresh_token into .env.local → GMAIL_REFRESH_TOKEN=...
 *
 * Scope granted: https://www.googleapis.com/auth/gmail.send (send only, no read)
 */

import { createInterface } from 'readline'
import { google } from 'googleapis'

const CLIENT_ID = process.env.GMAIL_CLIENT_ID
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('Set GMAIL_CLIENT_ID and GMAIL_CLIENT_SECRET env vars first.')
  process.exit(1)
}

const SCOPES = ['https://www.googleapis.com/auth/gmail.send']
const REDIRECT = 'urn:ietf:wg:oauth:2.0:oob'

const oauth2 = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT)

const authUrl = oauth2.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
  prompt: 'consent', // force refresh_token to be returned
})

console.log('\n1. Open this URL in your browser:\n')
console.log(authUrl)
console.log('\n2. Authorize the app, then paste the code below:\n')

const rl = createInterface({ input: process.stdin, output: process.stdout })
rl.question('Authorization code: ', async (code) => {
  rl.close()
  try {
    const { tokens } = await oauth2.getToken(code.trim())
    console.log('\n✅ Success! Add these to .env.local:\n')
    console.log(`GMAIL_REFRESH_TOKEN=${tokens.refresh_token}`)
    console.log('\nThe access token expires but refresh_token is permanent (until revoked).')
  } catch (e) {
    console.error('Error exchanging code:', e.message)
    process.exit(1)
  }
})
