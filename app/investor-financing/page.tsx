import { LandingNav, LandingFooter, PageStub } from '@/components/LandingLayout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Investor Financing — MIX',
  description: 'Portfolio lending, rental property financing, and asset-based mortgages for active real estate investors.',
}

export default function InvestorFinancingPage() {
  return (
    <>
      <LandingNav />
      <PageStub eyebrow="Specialty Vertical" title="Investor Financing" summary="Portfolio lending, rental property financing, and asset-based mortgages for active real estate investors." />
      <LandingFooter />
    </>
  )
}
