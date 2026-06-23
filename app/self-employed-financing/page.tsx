import { LandingNav, LandingFooter, PageStub } from '@/components/LandingLayout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Self-Employed / Business For Self — MIX',
  description: 'Alt-A Lending · Stated Income · Bank Statement Programs for incorporated owners, contractors, consultants, realtors, and entrepreneurs.',
}

export default function SelfEmployedFinancingPage() {
  return (
    <>
      <LandingNav />
      <PageStub eyebrow="Borrower Profile" title="Self-Employed / Business For Self" summary="Alt-A Lending · Stated Income · Bank Statement Programs for incorporated owners, contractors, consultants, realtors, and entrepreneurs." />
      <LandingFooter />
    </>
  )
}
