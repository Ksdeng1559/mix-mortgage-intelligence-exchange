'use client'
import { useState, useEffect } from 'react'

export function StickyMobileCta({ phone }: { phone: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const threshold = document.documentElement.scrollHeight * 0.30
      setVisible(window.scrollY > threshold)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const tel = `tel:${phone.replace(/\D/g, '')}`

  return (
    <>
      <div
        className={`hp-mobile-cta${visible ? ' hp-mobile-cta--visible' : ''}`}
        role="complementary"
        aria-label="Quick contact options"
      >
        <a href={tel} className="lbtn hp-mobile-cta-btn">
          📞 Call Now
        </a>
        <a href="/assessment" className="lbtn primary hp-mobile-cta-btn">
          Book a Call
        </a>
      </div>
      <style>{`
        .hp-mobile-cta {
          display: none;
          position: fixed; bottom: 0; left: 0; right: 0; z-index: 30;
          padding: 12px 16px 20px; gap: 10px;
          background: rgba(7,10,19,0.96);
          backdrop-filter: blur(20px) saturate(1.4);
          border-top: 1px solid var(--border);
          transform: translateY(100%);
          transition: transform .3s ease;
        }
        .hp-mobile-cta--visible { transform: translateY(0); }
        .hp-mobile-cta-btn {
          flex: 1; justify-content: center;
          min-height: 44px; min-width: 44px;
        }
        @media (max-width: 960px) {
          .hp-mobile-cta { display: flex; }
        }
      `}</style>
    </>
  )
}
