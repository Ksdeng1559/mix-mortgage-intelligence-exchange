'use client'
import { useState } from 'react'

export type FaqItem = { q: string; a: string }

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <>
      <div className="hp-faq-grid">
        {items.map((item, i) => (
          <div key={i} className="hp-faq-item">
            <button
              className="hp-faq-btn"
              aria-expanded={open === i}
              aria-controls={`faq-panel-${i}`}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span>{item.q}</span>
              <span className="hp-faq-icon" aria-hidden="true">{open === i ? '−' : '+'}</span>
            </button>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-label={item.q}
              className="hp-faq-panel"
              hidden={open !== i}
            >
              <p>{item.a}</p>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .hp-faq-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .hp-faq-item {
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: var(--radius); overflow: hidden;
          transition: border-color .15s;
        }
        .hp-faq-item:has(.hp-faq-btn[aria-expanded="true"]) { border-color: var(--accent-glow); }
        .hp-faq-btn {
          display: flex; justify-content: space-between; align-items: center; gap: 12px;
          width: 100%; padding: 18px 20px; background: none; border: none; cursor: pointer;
          color: var(--fg); font-size: 14px; font-weight: 500; text-align: left;
          min-height: 44px; font-family: var(--font); transition: background .15s;
        }
        .hp-faq-btn:hover { background: var(--bg-card-hover); }
        .hp-faq-btn:focus-visible { outline: 2px solid var(--accent); outline-offset: -2px; border-radius: var(--radius); }
        .hp-faq-btn[aria-expanded="true"] { color: #818CF8; border-bottom: 1px solid var(--border); }
        .hp-faq-icon { flex-shrink: 0; font-size: 18px; color: var(--fg-muted); line-height: 1; }
        .hp-faq-panel { padding: 16px 20px; }
        .hp-faq-panel p { font-size: 13px; color: var(--fg-secondary); line-height: 1.65; margin: 0; }
        @media (max-width: 640px) { .hp-faq-grid { grid-template-columns: 1fr; } }
      `}</style>
    </>
  )
}
