# AURE STUDIO — Exclusive Launch High Tea

## Project Overview
Single-page Next.js 15 invitation site for **AURE STUDIO's Exclusive Launch High Tea** on **12 July 2026**. The site promotes a luxury grooming atelier launch event in Ernakulam, Kerala.

## Tech Stack
- **Framework:** Next.js 15 (App Router, client-side SPA)
- **Language:** TypeScript
- **Animation:** framer-motion + GSAP
- **Icons:** lucide-react
- **Typography:** Cormorant Garamond (display) + Manrope (body) via next/font/google
- **Deployment:** Vercel (https://aure-invitation.vercel.app)
- **Linting:** eslint-config-next

## Key Scripts
| Command | Action |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run linter |

## Project Structure
```
app/
  globals.css         — 963 lines: design tokens, typography, animations, responsive
  layout.tsx          — Root layout, metadata, font loading
  page.tsx            — Main page (384 lines): Splash, Hero, Story, Highlights,
                        DigitalInvitation, Countdown, EventDetails, Location, SocialFooter
lib/
  siteConfig.ts       — All content & configuration (brand, event, venue, SEO, etc.)
public/
  assets/brand/       — Logos, hero image, OG images
  assets/gallery/     — 15 gallery images (gallery-01 through gallery-15)
  audio/ambient.mp3   — Background ambient audio
```

## Design Tokens (CSS custom properties)

### Colors
| Variable | Value | Usage |
|---|---|---|
| `--gold` | `#91643c` | Primary accent |
| `--gold-light` | `#c49a6e` | Light accent |
| `--ivory` | `#f4f2f2` | Background / light surface |
| `--ivory-warm` | `#f7f5f3` | Warm surface |
| `--taupe` | `#4c433b` | Body text |
| `--ink` | `#201c18` | Headings / near-black |
| `--muted` | `#897b70` | Muted text |
| `--muted-light` | `#a89a8e` | Lighter muted |
| `--line` | `rgba(170,120,75,0.22)` | Borders/divider |
| `--glass` | `rgba(244,242,242,0.76)` | Glassmorphism |

### Typography
- **Display/Heading:** Cormorant Garamond (serif)
- **Body/Sans:** Manrope (sans-serif)
- Fluid type scale via `clamp()` (see `--display-xl` through `--caption`)

### Responsive Breakpoints
| Max-width | Behavior |
|---|---|
| 860px | Grids → 1 column, reduced hero height, countdown 2×2 |
| 560px | Full-width buttons, section-gap switches to mobile |
| 390px | Hero meta stacks vertically, no dividers |

## Page Sections (top → bottom)
1. **Splash** — Full-screen overlay with logo reveal, particles, "Tap To Enter"
2. **Hero** — Parallax scroll, logo, event name, headline, date/time, CTA
3. **Story** — Brand narrative paragraph
4. **Highlights** — 3-column grid of 5 experience cards
5. **Digital Invitation** — Interactive golden seal with petal burst animation
6. **Countdown** — Live timer to 12 July 2026 4:00 PM IST
7. **Event Details** — Date, time, venue cards
8. **Location** — Embedded Google Maps + actions (Open, Directions, Share)
9. **Social Footer** — Wordmark, tagline, copyright

## Event Details
- **Date:** 12 July 2026 (Sunday)
- **Time:** 4:00 PM Onwards
- **Venue:** AURE STUDIO, First Floor, Metro Pillar 544, Stadium Road, Janatha, Palarivattom, Ernakulam, Kerala 682025
- **RSVP:** hello@aurestudio.in
