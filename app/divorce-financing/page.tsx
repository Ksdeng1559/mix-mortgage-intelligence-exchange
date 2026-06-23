import { LandingNav, LandingFooter, PageStub } from '@/components/LandingLayout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Divorce Financing — MIX',
  description: 'Helping separating spouses refinance, buy out equity, or qualify for a new home during and after separation.',
}

export default function DivorceFinancingPage() {
  return (
    <>
      <LandingNav />
      <PageStub eyebrow="Specialty Vertical" title="Divorce Financing" summary="Helping separating spouses refinance, buy out equity, or qualify for a new home during and after separation." />
      <LandingFooter />
    </>
  )
}
