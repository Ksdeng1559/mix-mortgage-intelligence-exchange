import { LandingNav, LandingFooter, PageStub } from '@/components/LandingLayout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Partner Application — MIX',
  description: 'Apply to join the Professional Alliance Network — referral tracking, lead routing, content library, and partner analytics.',
}

export default function PartnerApplicationPage() {
  return (
    <>
      <LandingNav />
      <PageStub eyebrow="Get Started" title="Partner Application" summary="Apply to join the Professional Alliance Network — referral tracking, lead routing, content library, and partner analytics." />
      <LandingFooter />
    </>
  )
}
