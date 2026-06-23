import { LandingNav, LandingFooter, PageStub } from '@/components/LandingLayout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'High Debt Ratios — MIX',
  description: 'Debt Restructuring · Alternative Lending · Consolidation Financing for borrowers with multiple properties, business debt, or tax liabilities.',
}

export default function HighDebtRatioFinancingPage() {
  return (
    <>
      <LandingNav />
      <PageStub eyebrow="Borrower Profile" title="High Debt Ratios" summary="Debt Restructuring · Alternative Lending · Consolidation Financing for borrowers with multiple properties, business debt, or tax liabilities." />
      <LandingFooter />
    </>
  )
}
