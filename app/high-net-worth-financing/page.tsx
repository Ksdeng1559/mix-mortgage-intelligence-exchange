import { LandingNav, LandingFooter, PageStub } from '@/components/LandingLayout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Non-Traditional / High Net Worth — MIX',
  description: 'Asset-Based Lending · Reverse Mortgages · Private Lending for investors, retirees, and corporate shareholders with complex structures.',
}

export default function HighNetWorthFinancingPage() {
  return (
    <>
      <LandingNav />
      <PageStub eyebrow="Borrower Profile" title="Non-Traditional / High Net Worth" summary="Asset-Based Lending · Reverse Mortgages · Private Lending for investors, retirees, and corporate shareholders with complex structures." />
      <LandingFooter />
    </>
  )
}
