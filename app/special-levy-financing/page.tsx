import { LandingNav, LandingFooter, PageStub } from '@/components/LandingLayout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Special Levy Financing — MIX',
  description: 'Condo and strata owners facing unexpected special assessments from building repairs, envelope restoration, or infrastructure upgrades.',
}

export default function SpecialLevyFinancingPage() {
  return (
    <>
      <LandingNav />
      <PageStub eyebrow="Specialty Vertical" title="Special Levy Financing" summary="Condo and strata owners facing unexpected special assessments from building repairs, envelope restoration, or infrastructure upgrades." />
      <LandingFooter />
    </>
  )
}
