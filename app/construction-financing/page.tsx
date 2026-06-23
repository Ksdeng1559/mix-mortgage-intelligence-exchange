import { LandingNav, LandingFooter, PageStub } from '@/components/LandingLayout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Construction Financing — MIX',
  description: 'Progress-draw construction mortgages and draw-based lending for builders, developers, and major renovation projects.',
}

export default function ConstructionFinancingPage() {
  return (
    <>
      <LandingNav />
      <PageStub eyebrow="Specialty Vertical" title="Construction Financing" summary="Progress-draw construction mortgages and draw-based lending for builders, developers, and major renovation projects." />
      <LandingFooter />
    </>
  )
}
