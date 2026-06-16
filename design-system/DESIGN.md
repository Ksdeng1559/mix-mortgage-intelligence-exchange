# MIX — Mortgage Intelligence Exchange
## Design System v1.0

Generated via design-brief (Open Design / I-Lang protocol)
Brief: `palette=monochrome_dark | accent=indigo | typography=inter | display=same_as_body | layout=dashboard_grid | mood=professional_minimal | density=balanced | exclude=animations,gradients`

---

## 1. Visual Theme & Atmosphere

- **Mood:** Professional minimal — clean, confident, restrained. No decoration for its own sake.
- **Feel:** A precision instrument for financial professionals. Dark, calm, focused. Every element earns its place.
- **References:** Linear (command-palette minimalism), Stripe Dashboard (data-forward trust), Vercel (dark precision)
- **Anti-patterns to avoid:** Playful design, AI purple/pink gradients, glassmorphism, emoji-as-icons, decorative stats

---

## 2. Color Palette & Roles

| Role | Hex | CSS Variable | Usage |
|---|---|---|---|
| Background (deep) | `#070A13` | `--bg-deep` | Page base |
| Background | `#0D1117` | `--bg` | Top nav, main surfaces |
| Surface / Card | `#131820` | `--bg-card` | Cards, panels, tables |
| Surface hover | `#161C26` | `--bg-card-hover` | Row hover, card hover |
| Elevated | `#1A2030` | `--bg-elevated` | Modals, dropdowns |
| Text primary | `#EDEDEF` | `--fg` | Headings, body, labels |
| Text secondary | `#8A8F98` | `--fg-secondary` | Descriptions, metadata |
| Text muted | `#5C6168` | `--fg-muted` | Timestamps, placeholders |
| Accent | `#4338CA` | `--accent` | Primary buttons, active states, links |
| Accent hover | `#4F46E5` | `--accent-hover` | Button hover |
| Accent glow | `rgba(67,56,202,0.2)` | `--accent-glow` | Button glow rings, focus |
| Accent soft | `rgba(67,56,202,0.12)` | `--accent-soft` | Active nav backgrounds |
| Border | `rgba(255,255,255,0.06)` | `--border` | Card borders, dividers |
| Border strong | `rgba(255,255,255,0.10)` | `--border-strong` | Button borders, input borders |
| Green | `#34D399` | `--green` | Positive indicators, active status |
| Green bg | `rgba(52,211,153,0.07)` | `--green-bg` | Status pill backgrounds |
| Amber | `#FBBF24` | `--amber` | Warning, review status |
| Amber bg | `rgba(251,191,36,0.07)` | `--amber-bg` | Warning pill backgrounds |
| Red | `#F87171` | `--red` | Destructive, overdue |
| Red bg | `rgba(248,113,113,0.07)` | `--red-bg` | Error pill backgrounds |
| Purple | `#A78BFA` | `--purple` | Secondary accent, review |
| Purple bg | `rgba(167,139,250,0.07)` | `--purple-bg` | Review pill backgrounds |
| Blue | `#60A5FA` | `--blue` | Info, early-stage status |

---

## 3. Typography Rules

- **Display / Headings:** Inter, weight 700-800, letter-spacing -0.02em
  - H1: 26px, weight 700
  - H2: 16px, weight 600
  - H3: 14px, weight 600
- **Body:** Inter, weight 400, 14px/1.6
  - Small body: 12-13px for feeds, metadata
  - Micro: 10-11px for labels, badges, timestamps (uppercase, letter-spacing 0.05-0.07em)
- **Mono (utility):** Inter tabular-nums for scores, values, counts
- **Google Fonts import:**
  ```css
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
  ```
- **Font stack:** `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

---

## 4. Component Stylings

| Component | Rules |
|---|---|
| **Buttons — Primary** | Accent bg (#4338CA), white text, border-radius 10px, padding 7px 15px, accent-glow box-shadow (0 0 0 4px). Hover: #4F46E5 |
| **Buttons — Secondary** | Transparent bg, border 1px var(--border-strong), secondary text. Hover: surface bg |
| **Cards / Panels** | Surface bg (#131820), border 1px var(--border), border-radius 14-18px, inset glass highlight (1px rgba white 0.04 at top) |
| **Card hover** | Background shifts to #161C26, border strengthens, elevate shadow (0 4px 20px rgba(0,0,0,0.3)), translateY(-1px) |
| **Tables** | Surface bg wrapper, 14px border-radius. Header: uppercase 10px, muted color, letter-spacing 0.06em. Rows: 1px border-bottom, hover bg |
| **Status Pills** | 11px, 500 weight, 3px 10px padding, 6px radius, dot indicator (5px circle). Colors: green/amber/red/purple/blue/muted |
| **KPI Cards** | 18px padding, 10px label (uppercase, muted), 30-34px value (800 weight, tight tracking), gradient accent option for primary metric |
| **Navigation** | Top nav: sticky, backdrop-blur 18px, 85% opacity bg. Active tab: accent-soft bg + accent-glow border ring |
| **Inputs** | Transparent bg, bottom border, accent focus ring |

---

## 5. Layout Principles

- **Max width:** 1260px content area, centered
- **Grid:** Bento grid for dashboard (4-column, 180px auto-rows, 14px gap). Single column for detail pages.
- **Section spacing:** 24px between major sections, 14px between sub-sections
- **Content padding:** 28px 32px for page, 20-22px for cards
- **Navigation:** Sticky top nav (56px), optional sidebar for deeper IA
- **Responsive breakpoints:**
  - `max-width: 960px` — Collapse to 2-column grids, hide sidebar, reduce padding
  - `max-width: 640px` — Single column, 12-16px page padding

---

## 6. Depth & Elevation

- **Cards:** Subtle inner glass highlight (`box-shadow: 0 1px 0 rgba(255,255,255,0.04) inset`), 1px border
- **Card hover:** Elevate shadow (`0 4px 20px rgba(0,0,0,0.3)`) + translateY(-1px)
- **Primary buttons:** Accent glow ring (`box-shadow: 0 0 0 4px var(--accent-glow)`)
- **Top nav:** backdrop-blur(18px) saturate(1.4), rgba bg at 85% opacity
- **Focus rings:** `0 0 0 3px rgba(67,56,202,0.35)` on all interactive elements
- **No box-shadows** on static surfaces beyond the glass inset
- **Ambient blobs:** Optional decorative radial gradients (opacity 0.04-0.06), fixed position, pointer-events none

---

## 7. Layout Models

### Dashboard (Bento Grid)
```
Grid: 4 columns, auto-rows 180px, gap 14px
Cards span: 1×1, 2×1, 2×2, 4×1 (full width)
Card types: KPI value, sparkline chart, funnel bars, mini bar chart,
            deadline list, activity feed, agent fleet grid
```

### Pipeline / List Views
```
Full-width table in surface card wrapper
8-10 columns max on desktop, collapse to 5-6 on tablet
Sortable headers, row hover, status pills, score highlighting
```

### Detail / Profile
```
Single column, max-width 900px
Card sections stacked vertically
Agent cards in 3-column grid
```

---

## 8. Do's and Don'ts

**DO:**
- Use the declared color tokens exclusively — no ad-hoc hex values
- Maintain consistent 14px gap / 20-22px card padding rhythm
- Ensure all text meets WCAG AA contrast (4.5:1 minimum)
- Use `:focus-visible` with the declared focus ring on all interactive elements
- Use tabular-nums for all numeric data (scores, values, counts)
- Use semantic status colors (green=positive, amber=warning, red=critical)
- Apply `prefers-reduced-motion` — disable animations, transitions, and transform on hover
- Show empty states with helpful messaging (never blank screens)
- Use skeleton screens or spinners for loading states

**DON'T:**
- Invent colors outside the palette
- Add decorative shadows beyond the glass inset
- Use more than 2 typefaces (Inter is the only font family; mono is a utility face for code)
- Use emojis as structural icons (use SVG: Lucide, Heroicons, Phosphor)
- Apply gradients or glassmorphism effects beyond the ambient blobs
- Use animations or transitions that exceed 200ms
- Add parallax or scroll-triggered effects
- Use stock photography or decorative illustrations

---

## 9. Agent Prompt Guide

When implementing MIX UI from this DESIGN.md:

- Do NOT invent colors outside the declared palette — every color must come from Section 2
- Do NOT add box-shadows beyond the glass inset and hover elevate in Section 6
- Accent color (#4338CA) appears maximum 3 times per viewport: primary button, active nav state, and one KPI value
- All interactive elements need `:focus-visible` outline using the focus ring token
- Status colors (green, amber, red, purple, blue) are reserved for pills, indicators, scores — never use as background fills
- Cards always get the glass inset (`box-shadow: 0 1px 0 rgba(255,255,255,0.04) inset`)
- Numbers always use `font-variant-numeric: tabular-nums` for alignment
- Hover states are 150-200ms transitions — never instant, never >200ms
- The Bento grid is the default dashboard layout; use 4-column CSS Grid with 180px auto-rows
- Responsive: collapse to 2 columns at 960px, single column at 640px
- No animations or gradients (per `exclude` constraint)
- Touch targets minimum 44px for interactive elements

---

## Dimensions Resolved

```
Brief: palette=monochrome_dark | accent=indigo_custom | typography=inter
       display=same_as_body | layout=dashboard_grid | mood=professional_minimal
       density=balanced | exclude=animations,gradients

Dimensions resolved from defaults:
- display: set to "same_as_body" (rule: mood=professional_minimal → same_as_body)
- density: set to "balanced" (rule: static fallback, no density preference given)
- exclude: set to "animations,gradients" (user-specified)

Customizations noted:
- accent: "indigo" (#4338CA) is a custom extension — not in the closed accent vocabulary.
  Nearest preset: "electric_blue" (#3B82F6). Indigo was chosen for a more premium,
  less generic feel appropriate to financial services.
- palette: extended "monochrome_dark" with navy undertones (#070A13 vs pure #09090B)
  for financial/trust association.
- layout: extended with "dashboard_grid" (Bento variant) for data-dense KPIs.
```

---

## 10. Responsive Behavior

| Breakpoint | Layout |
|---|---|
| **Desktop (>960px)** | Full Bento grid (4 cols), top nav visible, 1260px max-width, 28px/32px page padding |
| **Tablet (640-960px)** | 2-column Bento, collapsed tables (hide secondary columns), 20px/16px padding |
| **Mobile (<640px)** | Single column, all cards full-width, top nav scrolls horizontally, 16px/12px padding |
| **Images** | Fluid, max-width 100%, maintain aspect ratio |
| **Tables** | Horizontal scroll wrapper on mobile, sticky left column optional |

---

*Generated via design-brief (I-Lang protocol) — Open Design / nexu-io*
*Last updated: June 2026*
