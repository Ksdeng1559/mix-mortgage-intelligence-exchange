import { LandingNav, LandingFooter, PageStub } from '@/components/LandingLayout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Borrower Assessment — MIX',
  description: 'Multi-step intake questionnaire — classify your profile, get matched to financing programs, and connect with a MIX mortgage professional.',
}

export default function AssessmentPage() {
  return (
    <>
      <LandingNav />
      <PageStub eyebrow="Get Started" title="Borrower Assessment" summary="Multi-step intake questionnaire — classify your profile, get matched to financing programs, and connect with a MIX mortgage professional." />
      <LandingFooter />
    </>
  )
}
