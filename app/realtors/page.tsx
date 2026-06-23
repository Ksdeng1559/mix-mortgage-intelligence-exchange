import { LandingNav, LandingFooter } from '@/components/LandingLayout'
import PartnerPageContent from '@/components/PartnerPageContent'
import { JsonLdScript } from '@/lib/json-ld'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Realtors — Refer Self-Employed & Investor Buyers | MIX Mortgage Vancouver',
  description:
    'Refer buyers with complex income, investment properties, or special levy situations. 48-hour pre-approvals. Dennis Eng closes files other brokers can\'t. Vancouver, BC.',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mix.mortgagesbydenniseng.ca' },
    { '@type': 'ListItem', position: 2, name: 'Partner Network', item: 'https://mix.mortgagesbydenniseng.ca/alternative-financing#partners' },
    { '@type': 'ListItem', position: 3, name: 'Realtors', item: 'https://mix.mortgagesbydenniseng.ca/realtors' },
  ],
}

export default function RealtorsPage() {
  return (
    <>
      <LandingNav />
      <JsonLdScript data={jsonLd} />
      <PartnerPageContent partner="realtors" />
      <LandingFooter />
    </>
  )
}
