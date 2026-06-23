import { LandingNav, LandingFooter, PageStub } from '@/components/LandingLayout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact MIX — MIX',
  description: 'Talk to the MIX team about partnerships, integration, or your specific borrower scenario.',
}

export default function ContactPage() {
  return (
    <>
      <LandingNav />
      <PageStub eyebrow="Get Started" title="Contact MIX" summary="Talk to the MIX team about partnerships, integration, or your specific borrower scenario." />
      <LandingFooter />
    </>
  )
}
