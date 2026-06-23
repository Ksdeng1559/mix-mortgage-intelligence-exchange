import { LandingNav, LandingFooter } from '@/components/LandingLayout'
import PartnerPageContent from '@/components/PartnerPageContent'
import { JsonLdScript } from '@/lib/json-ld'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Insolvency Trustees & Credit Counsellors — Credit Recovery Mortgage Referrals | MIX',
  description:
    'Refer discharged bankruptcy, consumer proposal, and debt counselling clients for credit recovery mortgage solutions. B-lender, private lender, and equity-based options. Dennis Eng, Vancouver BC.',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mix.mortgagesbydenniseng.ca' },
    { '@type': 'ListItem', position: 2, name: 'Partner Network', item: 'https://mix.mortgagesbydenniseng.ca/alternative-financing#partners' },
    { '@type': 'ListItem', position: 3, name: 'Insolvency Trustees', item: 'https://mix.mortgagesbydenniseng.ca/insolvency-trustees' },
  ],
}

export default function InsolvencyTrusteesPage() {
  return (
    <>
      <LandingNav />
      <JsonLdScript data={jsonLd} />
      <PartnerPageContent partner="insolvency-trustees" />
      <LandingFooter />
    </>
  )
}
