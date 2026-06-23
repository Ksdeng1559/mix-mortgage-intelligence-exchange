import { LandingNav, LandingFooter, PageStub } from '@/components/LandingLayout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reverse Mortgage Solutions — MIX',
  description: 'CHIP and reverse mortgage products for homeowners 55+ releasing equity without monthly payments.',
}

export default function ReverseMortgageSolutionsPage() {
  return (
    <>
      <LandingNav />
      <PageStub eyebrow="Specialty Vertical" title="Reverse Mortgage Solutions" summary="CHIP and reverse mortgage products for homeowners 55+ releasing equity without monthly payments." />
      <LandingFooter />
    </>
  )
}
