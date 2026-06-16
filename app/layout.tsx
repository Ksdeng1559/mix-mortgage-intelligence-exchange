import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MIX — Mortgage Intelligence Exchange',
  description: 'Relationship Asset Management & Opportunity Intelligence for Mortgage Professionals',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
