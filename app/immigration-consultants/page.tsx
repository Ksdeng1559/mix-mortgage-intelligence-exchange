import { LandingNav, LandingFooter } from '@/components/LandingLayout'
import PartnerPageContent from '@/components/PartnerPageContent'
import { JsonLdScript } from '@/lib/json-ld'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Immigration Consultants — New-to-Canada Mortgage Referrals | MIX Mortgage Vancouver',
  description:
    'Refer PR holders, work permit clients, and newcomers for New-to-Canada mortgage programs. Foreign income, thin credit profiles, and non-standard documentation handled. Dennis Eng, Vancouver BC.',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mix.mortgagesbydenniseng.ca' },
    { '@type': 'ListItem', position: 2, name: 'Partner Network', item: 'https://mix.mortgagesbydenniseng.ca/alternative-financing#partners' },
    { '@type': 'ListItem', position: 3, name: 'Immigration Consultants', item: 'https://mix.mortgagesbydenniseng.ca/immigration-consultants' },
  ],
}

export default function ImmigrationConsultantsPage() {
  return (
    <>
      <LandingNav />
      <JsonLdScript data={jsonLd} />
      <PartnerPageContent partner="immigration-consultants" />
      <LandingFooter />
    </>
  )
}
