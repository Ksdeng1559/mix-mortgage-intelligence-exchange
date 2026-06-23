import { LandingNav, LandingFooter, PageStub } from '@/components/LandingLayout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'New To Canada — MIX',
  description: 'New-to-Canada Programs · Alternative Financing · Down Payment Sourcing for skilled workers, permanent residents, and foreign professionals.',
}

export default function NewToCanadaFinancingPage() {
  return (
    <>
      <LandingNav />
      <PageStub eyebrow="Borrower Profile" title="New To Canada" summary="New-to-Canada Programs · Alternative Financing · Down Payment Sourcing for skilled workers, permanent residents, and foreign professionals." />
      <LandingFooter />
    </>
  )
}
