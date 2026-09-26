# Golden Triangle Massage — Website Build Brief

## Context

Golden Triangle Massage is a **team-based premium massage therapy practice** in downtown Pittsburgh, PA (320 Fort Duquesne Blvd — the heart of the "Golden Triangle," the nickname for downtown where the three rivers meet). The name, the gold-on-black logo (skyline in a triangle cradled by hands), and the address all reinforce one idea: **Pittsburgh's elevated, downtown massage destination.**

There is no code yet — this is a from-scratch build. The site's job is to make a premium first impression and drive visitors to **book a session**. Booking will be wired to a real system later; for now we design the flow with a placeholder CTA.

This document is the shared brief for a three-tool workflow. Each tool owns a lane:

| Tool | Owns |
|---|---|
| **UI UX Pro Max** | Overall visual style, font pairing, layout system, component styling, page structure |
| **impeccable** (this skill) | Spacing & rhythm, accessibility (contrast/focus/reduced-motion/semantics), smooth purposeful animation, responsive behavior |
| **Higgsfield AI** | High-quality luxury imagery (hero, service, ambiance, team-placeholder visuals) |

Work in the sequence in the **Workflow** section below so lanes don't collide.

---

## Product context (the strategic anchor — every screen must reinforce this)

- **Register:** brand (marketing site — the design *is* the product). **Platform:** web (responsive).
- **Users:** Pittsburgh professionals, downtown residents, and visitors seeking a genuinely upscale massage experience — people who value skill *and* atmosphere and will pay for it. Primary action: **book an appointment online.**
- **Positioning:** *The premier downtown-Pittsburgh massage destination* — a team of skilled therapists delivering a luxurious, restorative experience in the Golden Triangle.
- **Emotional target:** indulgence & quiet luxury first; trust/credibility close behind. A visitor should feel this is a *treat worth booking*, delivered by professionals.
- **Services (7):** Swedish · Deep Tissue · Aromatherapy · Sports · Reflexology · Hot & Cold Stone · Cupping Therapy.
- **Design principles:**
  1. *Understated luxury* — restraint reads as expensive; never loud or cluttered.
  2. *The city is the story* — lean on the Golden Triangle / Pittsburgh identity as differentiator.
  3. *Confidence through calm* — generous negative space, unhurried pacing.
  4. *Every element earns booking trust* — imagery, copy, and proof all point at the CTA.
- **Anti-references:** discount/chain massage aesthetics (Massage Envy), busy Groupon-style layouts, the sage-green/cream spa look of `references/ref1.webp` (that file is a **layout/spacing reference only — NOT a color or style reference**), and generic AI-SaaS templates.

*(Note: this will also be written up as `PRODUCT.md` at the project root during init so every future impeccable command reads from it.)*

---

## Visual system guardrails (hard constraints for UI UX Pro Max)

These are non-negotiable so the three lanes stay coherent. UI UX Pro Max chooses everything else (exact fonts, component treatments, layout patterns) within them.

**Color — "Black & gold, minimal" strategy (drenched-dark, one metallic accent):**
- The surface *is* the color: deep near-black is the dominant background. This is a **committed dark** identity, not dark-because-cool — it matches the luxury retail/jewelry convention the brand already lives in.
- Palette roles (author in **OKLCH**; these are targets, UI UX Pro Max refines):
  - `--bg` deep near-black, subtly warm (not pure #000): ~`oklch(0.16 0.008 60)`
  - `--surface` slightly lifted charcoal for sections/cards: ~`oklch(0.22 0.01 60)`
  - `--gold` primary accent (the logo gold): ~`oklch(0.78 0.11 85)` — used deliberately, not everywhere
  - `--gold-muted` for borders/hairlines/dividers: gold at low chroma or ~12–20% opacity
  - `--ivory` primary text on dark & warm off-white: ~`oklch(0.94 0.012 85)`
  - `--ivory-dim` secondary text: ~`oklch(0.80 0.01 85)` (must still clear 4.5:1 on `--bg`)
- **No third hue.** Warmth comes from the gold + ivory + imagery, not from a colored accent. This is the restrained, most-premium direction the user chose.
- **Contrast is impeccable's veto:** body text ≥4.5:1, large/heading ≥3:1 against actual background. Gold-on-black passes for large display and accents; gold is NOT a body-text color at small sizes. Ivory carries body copy.

**Typography (UI UX Pro Max selects the exact families):**
- Pair on a contrast axis: an **elegant high-contrast serif** for display/headings (echoing the logo's engraved-serif feel) + a **clean humanist/grotesque sans** for body & UI. Do not pair two similar sans.
- Display heading `clamp()` max ≤ 6rem; letter-spacing ≥ −0.04em; `text-wrap: balance` on h1–h3.
- Body measure capped 65–75ch.

**Layout / structure (UI UX Pro Max owns; `ref1.webp` informs spacing rhythm only):**
- Editorial, spacious, asymmetric where it earns it. Avoid identical card grids and the tiny-uppercase-eyebrow-on-every-section reflex.
- Full-bleed imagery and dark section breaks to let visuals breathe.

---

## Pages & structure

**1. Landing page (single long scroll)**
- Sticky/transparent-to-solid top nav: logo, nav links (Services, About, Contact), gold **Book Now** button.
- **Hero:** full-bleed luxury visual (dim, cinematic) + display headline tying to Pittsburgh/Golden Triangle, subhead, primary **Book Your Session** CTA + secondary **Explore Services**.
- **Services overview:** the 7 services, elegantly presented (not a flat 7-up card grid — group/feature them), each linking to the services detail page.
- **About / the practice:** short narrative on the team + downtown location; links to About page.
- **Why Golden Triangle:** 3–4 differentiators (skilled team, downtown convenience, premium experience) — no hero-metric template.
- **Testimonials / proof:** placeholder quotes (real ones dropped in later).
- **Booking CTA band:** strong closing call to book (placeholder link).
- **Footer:** address (320 Fort Duquesne Blvd, Pittsburgh, PA), phone placeholder, hours placeholder, social placeholders, logo.

**2. Services detail page**
- Each of the 7 services: name, description, benefits, duration/pricing placeholders, book CTA. Consistent, scannable, restrained.

**3. About / Team page (placeholder-friendly)**
- Practice story + intro; **team roster as graceful placeholders** (team not yet finalized) — designed so real bios/photos drop in without redesign. Empty-state must look intentional, never broken.

**4. Contact / Location page**
- Address **320 Fort Duquesne Blvd, Pittsburgh, PA**, embedded map, **hours placeholder**, **phone placeholder**, parking/downtown note, contact form or booking CTA.

Booking everywhere = a clearly-styled placeholder CTA/link, ready to point at the real scheduler later.

---

## Higgsfield AI — visual asset shot list

Direction for every image: **cinematic, low-key lit, warm-gold highlights on deep-black backgrounds; discreet, elegant, editorial — luxury spa, never clinical or stocky.** Deliver in modern web format (WebP/AVIF), 2× density, with a darker/dimmable treatment so ivory text stays legible over them.

- **Hero (1–2):** atmospheric premium massage/spa moment; room to overlay headline; downtown-Pittsburgh mood if possible.
- **Service vignettes (up to 7):** one evocative image per service (hot stones, cupping, aromatherapy oils, etc.) — consistent grade.
- **Ambiance/detail (2–3):** candles, warm towels, gold-detailed interior, hands — texture shots for section breaks.
- **About/location (1–2):** warm interior + a tasteful downtown-Pittsburgh/skyline nod that ties to the logo.
- **Team placeholders (as needed):** elegant silhouette/abstract portraits that read as intentional until real photos arrive.

---

## Workflow / handoff sequence

1. **impeccable → init:** write `PRODUCT.md` (+ optional starter `DESIGN.md`) capturing the above, so all tools share one source of truth.
2. **UI UX Pro Max:** using this brief + the guardrails, produce the visual system (font pairing, final palette tokens, component styles) and build page structure/markup for the 4 pages. Choose the stack (recommendation: a simple static setup — plain HTML/CSS/JS or Astro — since this is an image-forward marketing site; confirm with the user).
3. **Higgsfield AI:** produce the shot list above; drop assets into an `assets/`/`public/` folder referenced by the markup.
4. **impeccable — final passes** once structure + images exist:
   - **Spacing & rhythm:** audit vertical rhythm, section pacing, alignment, responsive spacing scale.
   - **Accessibility:** verify contrast on real backgrounds/over images, focus-visible states, semantic landmarks, alt text, reduced-motion alternatives, keyboard nav, form labels.
   - **Animation:** add purposeful motion — hero entrance, scroll reveals (enhancing already-visible content, ease-out curves, staggered where it fits, never uniform-reflex), gold hover micro-interactions, smooth scroll — each with a `prefers-reduced-motion` fallback.
   - **Responsive:** test hero copy and headings at every breakpoint (no overflow), mobile nav, image art-direction.

---

## Critical files (to be created)

- `PRODUCT.md` — strategic source of truth (impeccable writes on init).
- Page files for landing / services / about / contact (structure by UI UX Pro Max; stack TBD).
- Global stylesheet / design tokens (OKLCH color roles, type scale, spacing scale).
- `assets/` (or `public/`) — Higgsfield imagery.

## Verification

- **Visual:** load each of the 4 pages; confirm black-gold-ivory identity is coherent, no sage/cream leakage, no generic-template feel.
- **Accessibility:** run a contrast check on body & heading text over actual backgrounds and over hero images (≥4.5:1 / ≥3:1); tab through every page for visible focus; toggle OS reduced-motion and confirm animations degrade gracefully; validate landmarks/alt/form labels.
- **Responsive:** view at ~375px, 768px, 1280px, 1600px — headings don't overflow, images art-direct sensibly, nav collapses cleanly.
- **Motion:** confirm reveals fire on load (content visible even if JS/animation fails), curves are ease-out (no bounce), and nothing janks on scroll.
- **CTAs:** every Book placeholder is present, styled, and obviously the primary action on each page.

---

*Feed this file to UI UX Pro Max as the design brief. It owns style/fonts/layout within the guardrails above; impeccable finishes spacing/a11y/motion; Higgsfield supplies the imagery.*
