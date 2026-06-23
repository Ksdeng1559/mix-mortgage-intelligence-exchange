import { LandingNav, LandingFooter } from '@/components/LandingLayout'
import PartnerPageContent from '@/components/PartnerPageContent'
import { JsonLdScript } from '@/lib/json-ld'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Developers & Builders — Construction Mortgage Referrals | MIX Mortgage Vancouver',
  description:
    'Refer builders and pre-sale buyers for construction draw mortgages, bridge financing, and end-buyer qualification. Dennis Eng, $100M+ commercial origination experience. Vancouver, BC.',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mix.mortgagesbydenniseng.ca' },
    { '@type': 'ListItem', position: 2, name: 'Partner Network', item: 'https://mix.mortgagesbydenniseng.ca/alternative-financing#partners' },
    { '@type': 'ListItem', position: 3, name: 'Developers', item: 'https://mix.mortgagesbydenniseng.ca/developers' },
  ],
}

export default function DevelopersPage() {
  return (
    <>
      <LandingNav />
      <JsonLdScript data={jsonLd} />
      <PartnerPageContent partner="developers" />
      <LandingFooter />
    </>
  )
}
