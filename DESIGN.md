# Design

Visual system for Golden Triangle Massage. Register: brand. Platform: web. Strategy: **drenched dark** — the surface *is* the color; deep warm near-black carries the identity with one metallic gold accent. No third hue.

## Color

Authored in OKLCH. Warmth comes from gold + ivory + imagery, never from a colored accent.

| Token | Value | Role |
|---|---|---|
| `--bg` | `oklch(0.16 0.008 60)` | Body background — deep near-black, subtly warm |
| `--bg-deep` | `oklch(0.12 0.006 60)` | Darker section breaks, footer |
| `--surface` | `oklch(0.21 0.012 65)` | Lifted charcoal for cards/sections |
| `--gold` | `oklch(0.78 0.11 85)` | Primary accent — logo gold. Deliberate, not everywhere |
| `--gold-bright` | `oklch(0.86 0.12 88)` | Gold hover / highlight state |
| `--gold-deep` | `oklch(0.62 0.10 80)` | Gold gradient low end, pressed states |
| `--gold-muted` | `oklch(0.78 0.05 85 / 0.22)` | Hairlines, borders, dividers |
| `--ivory` | `oklch(0.94 0.012 85)` | Primary text |
| `--ivory-dim` | `oklch(0.80 0.01 85)` | Secondary text — clears 4.5:1 on `--bg` |
| `--ink-on-gold` | `oklch(0.18 0.02 70)` | Text on gold buttons |

Contrast rules: body text ≥4.5:1, headings ≥3:1 against actual backgrounds. Gold is display/accent only — never small body text. Text over imagery sits on a dark scrim/gradient.

## Typography

Pair on a contrast axis: high-contrast serif display + humanist sans body.

- **Display / headings:** Bodoni Moda (high-contrast didone; echoes the logo's engraved-serif feel). Weights 400–600, `font-optical-sizing: auto`.
- **Body / UI:** Manrope (clean grotesque-humanist). Weights 400–600.
- **Wordmark / small caps moments:** Cinzel, used sparingly (nav wordmark, one kicker max per page) — ties to the logo's engraved capitals. Not a section-grammar eyebrow.

Scale: fluid modular, ratio ≥1.25. Display clamp max ≤ 6rem. Letter-spacing ≥ −0.02em on display. `text-wrap: balance` on h1–h3, `pretty` on prose. Body measure 65–75ch. Line-height 1.65 body (light-on-dark needs extra air), 1.1 display.

## Spacing & layout

- Spacing scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 / 192px, fluid section padding `clamp(5rem, 12vw, 10rem)`.
- Editorial, spacious, asymmetric where it earns it. No identical card grids; the 7 services are grouped/featured (1 featured + flowing list), not a 7-up grid.
- Full-bleed imagery with dark scrims; dark section breaks between content bands.
- Container: `min(1200px, 92vw)`; prose measure `65ch`.

## Components

- **Buttons:** primary = gold fill, `--ink-on-gold` text, generous padding, subtle luminance lift on hover (no layout shift). Secondary = 1px `--gold-muted` border, ivory text, gold border brightens on hover. Radius 2px — near-square reads engraved/premium.
- **Nav:** fixed, transparent over hero → solid `--bg-deep` + hairline on scroll. Gold Book Now button.
- **Hairlines:** 1px `--gold-muted` dividers; the signature graphic element (echoes the logo ring).
- **Cards/sections:** `--surface` panels with 1px gold-muted border; no shadows-as-decoration, no glassmorphism.
- **Focus:** 2px gold outline, 3px offset, on every interactive element.

## Motion

Calm, unhurried, ease-out (cubic-bezier(0.22, 1, 0.36, 1)). Hero: one orchestrated entrance (image scale-settle + headline rise + CTA fade, staggered). Scroll reveals enhance already-visible content (opacity 1 fallback without JS), 600–800ms, never uniform across all sections. Gold hover micro-interactions 200ms. Every animation has a `prefers-reduced-motion: reduce` alternative (instant/crossfade).

## Imagery

Cinematic, low-key lit, warm-gold highlights on deep black. Editorial luxury, never clinical or stocky. Delivered as WebP in `assets/`, always under a dark gradient scrim where text overlays. Alt text written in the brand voice.
