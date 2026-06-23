import { LandingNav, LandingFooter } from '@/components/LandingLayout'
import PartnerPageContent from '@/components/PartnerPageContent'
import { JsonLdScript } from '@/lib/json-ld'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Accountants & CPAs — Refer Incorporated Clients | MIX Mortgage Vancouver',
  description:
    'Refer incorporated business owners and self-employed clients for mortgage financing. Dennis Eng structures files using NOI, DSCR, and corporate financials — not just NOA. Vancouver, BC.',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mix.mortgagesbydenniseng.ca' },
    { '@type': 'ListItem', position: 2, name: 'Partner Network', item: 'https://mix.mortgagesbydenniseng.ca/alternative-financing#partners' },
    { '@type': 'ListItem', position: 3, name: 'Accountants', item: 'https://mix.mortgagesbydenniseng.ca/accountants' },
  ],
}

export default function AccountantsPage() {
  return (
    <>
      <LandingNav />
      <JsonLdScript data={jsonLd} />
      <PartnerPageContent partner="accountants" />
      <LandingFooter />
    </>
  )
}
