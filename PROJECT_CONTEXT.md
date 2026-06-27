# AURE STUDIO — Exclusive Launch High Tea

## Project Overview
Single-page Next.js 15 invitation site for **AURE STUDIO's Exclusive Launch High Tea** on **12 July 2026**. The site promotes a luxury grooming atelier launch event in Ernakulam, Kerala.

## Tech Stack
- **Framework:** Next.js 15 (App Router, client-side SPA)
- **Language:** TypeScript
- **Animation:** framer-motion (GSAP removed)
- **Icons:** lucide-react
- **Typography:** Helvetica Neue via `next/font/local` (all weights 100–900, roman + italic)
- **Deployment:** Vercel (https://aure-invitation.vercel.app)
- **Linting:** eslint-config-next

## Key Scripts
| Command | Action |
|---|---|
| `npm run dev` | Start dev server (port 3001) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run linter |

## Project Structure
```
app/
  globals.css         — ~1760 lines: tokens, layout, buttons, cards, overlay, logo glow, 8 breakpoints
  layout.tsx          — Root layout, metadata, OG, font loading
  page.tsx            — Main page (649 lines): 8 sections + overlay
  fonts/              — 16 Helvetica Neue weights (local)
lib/
  siteConfig.ts       — All content & configuration (brand, event, venue, SEO)
public/
  assets/brand/       — 5 files: logo-master, wordmark, mark, hero, OG image
  audio/ambient.mp3   — Background ambient audio
```

## Design Theme
Full dark luxury transformation — all sections use the ExperiencePrism design language:

- **Background:** Layered dark charcoal/graphite gradients (#1f1b17 → #14110e → #0f0d0b) with warm gold radial ambience
- **Cards:** Dark glass-morphism (rgba(244,242,242,0.03) background, gold borders, inner highlights, backdrop blur)
- **Buttons:** Dark glass surface with gold borders and gold-light text, gold glow on hover
- **Typography:** Warm ivory/light text on dark backgrounds (rgba(244,242,242,0.72))
- **Lighting:** Ambient gold radial glows via ::before pseudo-elements on sections
- **Section transitions:** Seamless gradient/lighting continuity — no horizontal dividers

## Design Tokens (CSS custom properties in `:root`)

### Colors
| Variable | Value | Usage |
|---|---|---|
| `--gold` / `--gold-rgb` | `#91643c` / `145,100,60` | Primary accent |
| `--gold-light` / `--gold-light-rgb` | `#c49a6e` / `196,154,110` | Light accent / button text |
| `--ivory` / `--ivory-rgb` | `#f4f2f2` / `244,242,242` | Heading text on dark / glass surface |
| `--ivory-warm` | `#f7f5f3` | Warm surface variant (now unused) |
| `--taupe` / `--taupe-rgb` | `#4c433b` / `76,67,59` | Body text on light (now unused) |
| `--ink` / `--ink-rgb` | `#201c18` / `32,28,24` | Headings / near-black (now unused) |
| `--muted` | `#6c5d53` | Muted text (now unused) |
| `--muted-light` | `#78685c` | Lighter muted text (now unused) |
| `--line` | `rgba(145,100,60,0.22)` | Borders/divider |

### Glass & Surface
| Token | Value |
|---|---|
| `--glass-strong` | `rgba(244,242,242,0.92)` |
| `--glass-medium` | `rgba(244,242,242,0.72)` |
| `--glass-light` | `rgba(244,242,242,0.38)` |
| `--glass-ultra-light` | `rgba(244,242,242,0.1)` |
| `--glass-border` | `rgba(145,100,60,0.18)` |
| `--glass-hover` | `rgba(244,242,242,0.96)` |

### Shadows
| Token | Value |
|---|---|
| `--shadow-sm` | `0 1.4rem 4rem rgba(76,67,59,0.08)` |
| `--shadow-md` | `0 0.5rem 1.5rem rgba(76,67,59,0.18)` |
| `--shadow-lg` | `0 1.2rem 3rem rgba(76,67,59,0.28)` |
| `--shadow-xl`–`--shadow-3xl` | Deeper black shadows for overlay/hero |
| `--shadow-inner` | `inset 0 1px 0 rgba(244,242,242,0.12)` |
| `--shadow-glow` / `--shadow-mark` | Gold glow / hero mark drop |
| `--shadow-card-hover` | Hover state for cards |

### Typography
- **All fonts:** Helvetica Neue (local) — variable via `--font-helvetica`
- Fluid type scale via `clamp()` — `--display-xl` through `--caption`
- Leading tokens: `--leading-tight` (1.08) to `--leading-relaxed` (1.65)
- Tracking tokens: `--tracking-tight` (-0.015em) to `--tracking-widest` (0.15em)

### Spacing (8pt/4pt scale)
`--space-1` (0.25rem) through `--space-48` (12rem)
- `--section-gap`: `--space-32` (8rem), mobile: `--space-16` (4rem)
- `--container-max`: 1120px (scales to 1440px at 1920px+)
- `--container-padding`: `--space-4` (1rem), shrinks to 0.5rem at 360px

### Transitions
| Token | Value |
|---|---|
| `--ease-spring` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| `--ease-luxury` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `--duration-fast`–`--duration-3xl` | 200ms–1000ms |

### Logo Presentation
| Token | Value |
|---|---|
| `--logo-glow-soft` | `0 0 1.4rem rgba(226,189,134,0.18)` |
| `--logo-glow` | `0 0 2.4rem rgba(226,189,134,0.28)` |
| `--logo-glow-strong` | `0 0 3.6rem rgba(226,189,134,0.38)` |
| `--logo-shadow` | `0 1.5rem 3rem rgba(0,0,0,0.5)` |
| `--logo-shadow-soft` | `0 1rem 2rem rgba(0,0,0,0.3)` |
| `--logo-glass-bg` | `rgba(244,242,242,0.02)` |
| `--logo-glass-border` | `rgba(170,120,75,0.08)` |

## Responsive Breakpoints
| Width | Key Changes |
|---|---|
| **≥1920px** | Container 1440px, display-xl 6.5rem, hero padding ++, grid gap ++ |
| **≥1600px** | Container 1320px, 4-col masonry-like grid, larger cards |
| **≥1280px** | Container 1200px, section-gap 10rem, hero 100svh |
| **1024px** | Section-gap 6rem, prism/countdown padding narrows |
| **860px** | Grids → 2 col, hero 94svh, prism → 1 col |
| **820px** | Hero display-l, iPad Air tuning |
| **768px** | Hero 92svh, iPad Mini tuning, prism full-width |
| **560px** | Section-gap 4rem, all grids → 1 col, full-width buttons, particles disabled |
| **430px** | Countdown shrinks, prism compact, map shorter |
| **390px** | Hero meta stacks vertically |
| **360px** | Container-padding 0.5rem, hero 85svh, tightest spacing |

## Page Sections (top → bottom)
1. **Splash** — Full-screen fixed overlay, logo reveal (clip-path + gold bloom halo + luxury shimmer sweep), gold particles, "Tap To Enter"
2. **Hero** — 96svh, parallax scroll, logo with gold breathing glow + ambient bloom, event name, headline, date/time meta, CTA
3. **Story** — Brand narrative with kicker heading
4. **Highlights** — 3-col grid → 1-col, 5 dark glass cards with hover lift + gold border glow
5. **ExperiencePrism** — Dark section, 6 interactive cards (2-col grid), overlay dialog per card with particles
6. **CountdownSection** — Dark gradient band, 4-box live countdown timer
7. **EventDetails** — 3-col detail grid (Date/Time/Venue) with icons on dark glass
8. **Location** — Google Maps embed in dark glass frame + 3-button action row (Open, Directions, Share)
9. **SocialFooter** — Wordmark in glass container with muted gold glow, tagline, copyright

## Accessibility
- Skip link (`position: fixed`, `z-index: 1000`, first focusable element)
- `MotionConfig reducedMotion="user"` wrapping entire app
- Reduced-motion CSS override (`prefers-reduced-motion: reduce`)
- Manual toggle: pause button (`.reduce-motion` class)
- `:focus-visible` gold outline on all interactive elements
- `aria-label` on all sections, buttons, icons
- `aria-live="polite"` on countdown
- `role="dialog"`, `aria-modal="true"` on splash and prism overlay
- Overlay focus management (auto-focus close button, return focus to card)
- Keyboard navigation (Enter/Space to open overlay, Escape to close)
- WCAG AA contrast on muted text colors
- `font-variant-numeric: oldstyle-nums` on body

## Animation System (framer-motion)
- **Shared constants:** `springEase`, `luxuryEase`, `fadeUp`, `cardReveal`
- **Stagger children:** Hero (0.14s), Location (0.08s), SocialFooter (0.1s)
- **WhileInView:** All sections use `viewport={{ once: true }}` with `-60px` to `-100px` margin
- **Prism cards:** `fadeSlideUp` stagger (0.09s delay per card)
- **Ambient glow:** 6s loop, `luxuryEase`, opacity/scale keyframes (respects `useReducedMotion`)
- **Splash exit:** `scale: 0.96` + `luxuryEase` (no GPU-heavy blur)
- **Card hover:** `whileHover={{ y: -6 }}` with `springEase`
- **All easings:** `luxuryEase` or `springEase` — no generic `"easeInOut"` remaining
- **Logo glow:** CSS `glowBreathing` keyframe (opacity 0.45↔0.85, scale 1↔1.06, 5-6s loop) on Hero and Splash
- **Logo shimmer:** CSS `sweepShimmer` keyframe with skew(-4deg) + luxuryEase on Splash (3.4s loop)

## Event Details
- **Date:** 12 July 2026 (Sunday)
- **Time:** 4:00 PM Onwards
- **Venue:** AURE STUDIO, First Floor, Metro Pillar 544, Stadium Road, Janatha, Palarivattom, Ernakulam, Kerala 682025
- **RSVP:** hello@aurestudio.in

## Bundle (production)
| Metric | Value |
|---|---|
| Page JS | 57.7 kB |
| Shared First Load JS | 102 kB |
| Static pages | 2 (`/`, `/_not-found`) |
| Build time | ~22s (Vercel) |
