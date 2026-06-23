import { LandingNav, LandingFooter } from '@/components/LandingLayout'
import PartnerPageContent from '@/components/PartnerPageContent'
import { JsonLdScript } from '@/lib/json-ld'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Financial Planners — Refer Investment & Equity Clients | MIX Mortgage Vancouver',
  description:
    'Refer clients with HELOCs, investment properties, and equity-based strategies. Dennis Eng structures mortgage financing that fits inside the broader financial plan. Vancouver, BC.',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mix.mortgagesbydenniseng.ca' },
    { '@type': 'ListItem', position: 2, name: 'Partner Network', item: 'https://mix.mortgagesbydenniseng.ca/alternative-financing#partners' },
    { '@type': 'ListItem', position: 3, name: 'Financial Planners', item: 'https://mix.mortgagesbydenniseng.ca/financial-planners' },
  ],
}

export default function FinancialPlannersPage() {
  return (
    <>
      <LandingNav />
      <JsonLdScript data={jsonLd} />
      <PartnerPageContent partner="financial-planners" />
      <LandingFooter />
    </>
  )
}
