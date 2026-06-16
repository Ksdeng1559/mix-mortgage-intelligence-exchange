export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

// Expects multipart/form-data with a 'file' field (CSV)
// CSV columns: first_name, last_name, email, phone, role_title, contact_type, organization_name, tier
export async function POST(req: Request) {
  const sb = createServiceClient()

  const form = await req.formData()
  const file = form.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })

  const text = await file.text()
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean)
  if (lines.length < 2) return NextResponse.json({ error: 'CSV must have header + at least 1 row' }, { status: 400 })

  const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/[^a-z_]/g, ''))

  const VALID_TYPES = ['client', 'prospect', 'referral_partner', 'advisor', 'lender', 'other']
  const VALID_TIERS = ['A', 'B', 'C', 'D']

  const rows = lines.slice(1).map(line => {
    // Handle quoted fields
    const values: string[] = []
    let cur = ''
    let inQuote = false
    for (const ch of line) {
      if (ch === '"') { inQuote = !inQuote; continue }
      if (ch === ',' && !inQuote) { values.push(cur.trim()); cur = ''; continue }
      cur += ch
    }
    values.push(cur.trim())

    const row: Record<string, string | null> = {}
    headers.forEach((h, i) => { row[h] = values[i] || null })

    return {
      first_name: row.first_name ?? row.firstname ?? 'Unknown',
      last_name: row.last_name ?? row.lastname ?? '',
      email: row.email?.toLowerCase() || null,
      phone: row.phone || null,
      role_title: row.role_title ?? row.role ?? row.title ?? null,
      contact_type: VALID_TYPES.includes(row.contact_type ?? '') ? row.contact_type : 'prospect',
      organization_name: row.organization_name ?? row.organization ?? row.company ?? null,
      tier: VALID_TIERS.includes(row.tier ?? '') ? row.tier : null,
    }
  }).filter(r => r.first_name !== 'Unknown' || r.email)

  if (!rows.length) return NextResponse.json({ error: 'No valid rows found' }, { status: 400 })

  // Upsert on email to avoid duplicates
  const { data, error } = await sb
    .from('contacts')
    .upsert(rows, { onConflict: 'email', ignoreDuplicates: false })
    .select('id')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ imported: data?.length ?? rows.length, total_rows: rows.length })
}
