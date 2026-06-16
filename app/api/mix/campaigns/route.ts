export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export async function GET() {
  const sb = createServiceClient()
  const { data, error } = await sb
    .from('mix_campaigns')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ campaigns: data ?? [] })
}

export async function POST(req: Request) {
  const sb = createServiceClient()
  const body = await req.json()
  const { title, subject, body_html, body_text, from_email, from_name, segment_filter, scheduled_at } = body

  if (!title || !subject) {
    return NextResponse.json({ error: 'title and subject required' }, { status: 400 })
  }

  const { data, error } = await sb
    .from('mix_campaigns')
    .insert({ title, subject, body_html, body_text, from_email, from_name, segment_filter, scheduled_at })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data, { status: 201 })
}

