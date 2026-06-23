import { LandingNav, LandingFooter, PageStub } from '@/components/LandingLayout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Credit Bruised — MIX',
  description: 'Alternative Lending · B-Lender Programs · Credit Rebuilding Roadmaps for borrowers recovering from divorce, illness, job loss, consumer proposal, or bankruptcy.',
}

export default function CreditRecoveryFinancingPage() {
  return (
    <>
      <LandingNav />
      <PageStub eyebrow="Borrower Profile" title="Credit Bruised" summary="Alternative Lending · B-Lender Programs · Credit Rebuilding Roadmaps for borrowers recovering from divorce, illness, job loss, consumer proposal, or bankruptcy." />
      <LandingFooter />
    </>
  )
}
