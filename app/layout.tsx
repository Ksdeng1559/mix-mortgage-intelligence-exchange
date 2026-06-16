import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MIX — Mortgage Intelligence Exchange',
  description: 'Relationship Asset Management & Opportunity Intelligence for Mortgage Professionals',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <footer style={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          padding: '6px 20px',
          background: 'rgba(10,12,20,0.85)',
          backdropFilter: 'blur(8px)',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16,
          fontSize: 11, color: 'rgba(100,116,139,0.8)',
          zIndex: 10,
        }}>
          <span>© 2026 KlickSmartAI</span>
          <span style={{ color: 'rgba(100,116,139,0.3)' }}>·</span>
          <a href="https://www.klicksmartai.com" target="_blank" rel="noopener noreferrer"
            style={{ color: 'rgba(99,102,241,0.7)', textDecoration: 'none' }}>
            klicksmartai.com
          </a>
          <span style={{ color: 'rgba(100,116,139,0.3)' }}>·</span>
          <a href="https://www.klick2client.com" target="_blank" rel="noopener noreferrer"
            style={{ color: 'rgba(99,102,241,0.7)', textDecoration: 'none' }}>
            klick2client.com
          </a>
        </footer>
      </body>
    </html>
  )
}
