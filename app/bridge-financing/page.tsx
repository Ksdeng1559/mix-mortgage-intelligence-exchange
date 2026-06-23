import { LandingNav, LandingFooter, PageStub } from '@/components/LandingLayout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bridge Financing — MIX',
  description: 'Short-term bridge capital to close on a new purchase before the existing property sells — clearing the moving gap.',
}

export default function BridgeFinancingPage() {
  return (
    <>
      <LandingNav />
      <PageStub eyebrow="Specialty Vertical" title="Bridge Financing" summary="Short-term bridge capital to close on a new purchase before the existing property sells — clearing the moving gap." />
      <LandingFooter />
    </>
  )
}
