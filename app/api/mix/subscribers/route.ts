export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export async function GET() {
  const sb = createServiceClient()
  const { data, error } = await sb
    .from('contacts')
    .select('id, first_name, last_name, email, phone, role_title, contact_type, organization_name, relationship_health, tier, last_contacted_at, created_at')
    .order('last_contacted_at', { ascending: false, nullsFirst: false })
    .limit(200)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ contacts: data ?? [] })
}

export async function POST(req: Request) {
  const sb = createServiceClient()
  const body = await req.json()
  const { data, error } = await sb
    .from('contacts')
    .insert({ ...body, workspace_id: 'bae7da21-e87d-4f2d-a666-2c0150888ec7' })
    .select('id, first_name, last_name, email, phone, role_title, contact_type, organization_name, relationship_health, tier, last_contacted_at, created_at')
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data, { status: 201 })
}

export async function PATCH(req: Request) {
  const sb = createServiceClient()
  const { id, ...fields } = await req.json()
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
  const { data, error } = await sb
    .from('contacts')
    .update({ ...fields, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('id, first_name, last_name, email, phone, role_title, contact_type, organization_name, relationship_health, tier, last_contacted_at, created_at')
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data)
}

