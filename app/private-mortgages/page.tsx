import { LandingNav, LandingFooter, PageStub } from '@/components/LandingLayout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Private Mortgages — MIX',
  description: 'First- and second-position private capital for non-qualifying scenarios, fast closings, and complex situations.',
}

export default function PrivateMortgagesPage() {
  return (
    <>
      <LandingNav />
      <PageStub eyebrow="Specialty Vertical" title="Private Mortgages" summary="First- and second-position private capital for non-qualifying scenarios, fast closings, and complex situations." />
      <LandingFooter />
    </>
  )
}
