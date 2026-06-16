export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export async function GET() {
  const sb = createServiceClient()
  const { data, error } = await sb
    .from('mix_agent_runs')
    .select('*')
    .order('started_at', { ascending: false })
    .limit(50)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ agent_runs: data ?? [] })
}

export async function POST(req: Request) {
  const sb = createServiceClient()
  const { agent_name } = await req.json()

  const { data, error } = await sb
    .from('mix_agent_runs')
    .insert({ agent_name, status: 'running', signals_detected: 0, opportunities_created: 0, started_at: new Date().toISOString() })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data, { status: 201 })
}

