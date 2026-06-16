export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export async function GET() {
  const sb = createServiceClient()
  const { data, error } = await sb
    .from('contacts')
    .select('id, first_name, last_name, email, phone, role_title, contact_type, organization_name, relationship_health, tier, last_contacted_at, created_at')
    .order('tier', { ascending: true, nullsFirst: false })
    .order('last_contacted_at', { ascending: false, nullsFirst: false })
    .limit(300)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ contacts: data ?? [] })
}

