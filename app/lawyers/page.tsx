import { LandingNav, LandingFooter } from '@/components/LandingLayout'
import PartnerPageContent from '@/components/PartnerPageContent'
import { JsonLdScript } from '@/lib/json-ld'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lawyers — Refer Real Estate & Family Law Clients | MIX Mortgage Vancouver',
  description:
    'Refer clients needing financing for real estate closings, divorce buyouts, and estate settlements. Fast pre-approvals. Dennis Eng closes complex files on time. Vancouver, BC.',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mix.mortgagesbydenniseng.ca' },
    { '@type': 'ListItem', position: 2, name: 'Partner Network', item: 'https://mix.mortgagesbydenniseng.ca/alternative-financing#partners' },
    { '@type': 'ListItem', position: 3, name: 'Lawyers', item: 'https://mix.mortgagesbydenniseng.ca/lawyers' },
  ],
}

export default function LawyersPage() {
  return (
    <>
      <LandingNav />
      <JsonLdScript data={jsonLd} />
      <PartnerPageContent partner="lawyers" />
      <LandingFooter />
    </>
  )
}
