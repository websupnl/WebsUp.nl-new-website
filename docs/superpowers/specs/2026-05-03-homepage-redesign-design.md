# WebsUp.nl Homepage Redesign — Elevated Dark

**Date:** 2026-05-03
**Status:** Approved
**Aesthetic direction:** Elevated Dark — premium studio feel, grain texture, glassmorphism, cinematic typography, parallax

---

## Design System Changes

### Typography
- Section headlines: `clamp(3rem, 6.5vw, 5.5rem)` — extreme size contrast vs body
- Eyebrow labels: `0.6875rem` uppercase tracking-widest — unchanged
- No new fonts; Plus Jakarta Sans with tighter tracking at large sizes (`tracking-[-0.03em]` to `tracking-[-0.04em]`)

### Grain Texture
- SVG `feTurbulence` filter injected as a fixed pseudo-element overlay on dark sections
- Opacity: `0.045` — visible but not distracting
- Implemented as a reusable `GrainOverlay` component (a single `<div>` with `pointer-events-none absolute inset-0`)
- SVG data URI: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'>...<feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></svg>")`

### Glassmorphism Cards (dark sections)
- `bg-white/[0.05] backdrop-blur-md border border-white/10 rounded-2xl`
- Hover: `border-white/20 bg-white/[0.08]`
- No shadow on dark — border does the work

### Light Section Cards
- Unchanged: `border border-slate-200 bg-white rounded-2xl shadow-sm`

### Animations (Framer Motion v12)
- Entrance: `y: 40 → 0`, `opacity: 0 → 1`, `duration: 0.65`, `ease: [0.25, 0.1, 0.25, 1]`
- Stagger children: `0.1s`, `delayChildren: 0.05s`
- Hero parallax: `useScroll + useTransform`, photo moves at `0.15x` scroll speed (subtle)
- Hover spring: `type: "spring", stiffness: 300, damping: 25`
- All wrapped in `MotionConfig reducedMotion="user"` (already in layout)

### Section Transitions
- Dark → light: curved SVG wave clip-path (`clipPath: "ellipse(120% 100% at 50% 0%)"`) on the light section top
- Light → dark: reversed wave

---

## Section Specifications

### 1. HeroSection — Cinematic Photo

**Layout:** Full-screen (`min-h-screen`), dark `#06040c`, 12-col grid

**Left side (col-span-7):**
- Eyebrow badge: unchanged
- H1: `clamp(2.8rem, 5.5vw, 5rem)`, line-height 1.03, tracking -0.03em
- Copy: "Een website die vertrouwen wekt en klanten oplevert."
- Gradient on "vertrouwen wekt" (orange→pink)
- Subtext: unchanged
- CTAs: unchanged
- Trust badges: unchanged

**Right side (col-span-5):**
- Daan's photo: `position: absolute, inset-0, object-cover`
- On top: grain overlay div (opacity 0.08 — slightly heavier on photo)
- Gradient vignette: left (`from-[#06040c] to-transparent`) + bottom fade
- Photo caption card at bottom: unchanged
- **Parallax:** wrap photo container in `motion.div` with `y` driven by `useScroll + useTransform([0, 1], [0, -80])`

**Bottom transition:**
- SVG wave `<div>` positioned absolute bottom-0, fills into next section

**Files to modify:** `components/site/HeroSection.tsx`

---

### 2. ProblemSection — Dark Glassmorphism

**Change from current:** Currently `bg-slate-50` (light) — switch to `bg-[#06040c]` dark

**Layout:**
- Header: same split grid
- H2: increase to `clamp(2.5rem, 5vw, 4rem)`
- Eyebrow "Herkenbaar?": white/64 text

**Cards:** 3-col grid, glassmorphism
- Background: `bg-white/[0.05] backdrop-blur-md border border-white/10`
- "Vaak zo" label: `text-white/40`
- Problem text: `text-white/60`
- Arrow divider: animated SVG draw effect on scroll entry
- "Hoe het anders kan" label: `text-white`
- Solution text: `text-white/85 font-medium`

**CTA block:** border-top in `border-white/10`, button unchanged

**Files to modify:** `components/site/ProblemSection.tsx`

---

### 3. ServicesSection — Editorial Light

**Change from current:** Minimal — this section already works. Elevate with:
- H2 size: increase to `clamp(2.5rem, 5vw, 4rem)`
- Card hover: add `background: linear-gradient(135deg, rgba(249,115,22,0.04), rgba(236,72,153,0.04))` on hover
- Icon container: add subtle gradient background on hover matching card gradient

**Files to modify:** `components/site/ServicesSection.tsx`

---

### 4. ProjectsSection — Dark Full-Bleed Grid

**Change from current:** Major redesign. Currently white with standard cards.

**Background:** `bg-[#06040c]` dark + grain overlay

**Layout:** Asymmetric grid
- Row 1: 1 featured project (full-width or 60%) + 1 smaller (40%)
- Row 2: remaining projects fill equally
- Each slot: `aspect-video` or fixed height `h-72`/`h-96`

**Image treatment:**
- No cards/borders — images fill their slot with `object-cover`
- `rounded-2xl` on each slot
- Hover: `scale(1.03)` on image (overflow hidden on wrapper), + overlay div fades in (`bg-black/50`) with project title + link

**Text:**
- Title overlay: bottom-left, white, `font-headline font-bold text-xl`
- Category tag: small pill top-left

**Section header:** white text, same eyebrow pattern

**Files to modify:** `components/site/ProjectsSection.tsx`

---

### 5. AboutMeSection — Floating Card

**Change from current:** Background stays `bg-slate-50`. Elevate with:

**Photo treatment:**
- Add grain overlay (lighter: opacity 0.06)
- Add subtle drop shadow: `shadow-2xl shadow-slate-950/20`
- Wrap in a `motion.div` with subtle rotation: `rotate(-1deg)` static, `rotate(0deg)` on hover (spring)

**Text side:**
- Badge: "Wie zit er achter WebsUp" (already updated)
- H2: "Geen bureau. Iemand die meedenkt en bouwt." (already updated)
- Add: one featured client quote in a `blockquote` styled card below the contact points
  - Italic, `text-slate-600`, left border accent `border-l-2 border-orange-400`

**Files to modify:** `components/site/AboutMeSection.tsx`

---

### 6. ReviewsSection — Dark Marquee

**Change from current:** Major redesign. Currently static grid.

**Background:** `bg-[#06040c]` dark + grain

**Layout:**
- Top: large featured review (first/best testimonial) in a glassmorphism card, full width
- Below: auto-scrolling horizontal marquee of remaining reviews
  - CSS `@keyframes marquee` (translate-x loop)
  - Pause on hover (`animation-play-state: paused`)
  - Duplicate items for seamless loop
  - Each card: glassmorphism, `min-w-[280px]`

**Files to modify:** `components/site/ReviewsSection.tsx`

---

### 7. CTASection — Cinematic Close

**Change from current:** Minimal — already strong. Elevate with:
- H2 size: `clamp(2.5rem, 5vw, 4.5rem)`
- Add grain overlay
- Trust items: glass treatment

**Files to modify:** `components/site/CTASection.tsx` — minor

---

## New Components

| Component | Purpose |
|-----------|---------|
| `components/ui/GrainOverlay.tsx` | Reusable grain texture div |
| `components/ui/MarqueeTrack.tsx` | Horizontal auto-scroll marquee wrapper |

---

## Files Changed Summary

| File | Change type |
|------|------------|
| `components/site/HeroSection.tsx` | Parallax + grain on photo |
| `components/site/ProblemSection.tsx` | Dark bg + glassmorphism cards |
| `components/site/ServicesSection.tsx` | Typography + card hover gradient |
| `components/site/ProjectsSection.tsx` | Full redesign: dark, asymmetric, full-bleed images |
| `components/site/AboutMeSection.tsx` | Photo grain + tilt + quote |
| `components/site/ReviewsSection.tsx` | Dark + marquee |
| `components/site/CTASection.tsx` | Minor: size + grain |
| `components/ui/GrainOverlay.tsx` | New |
| `components/ui/MarqueeTrack.tsx` | New |

---

## Out of Scope

- Navbar and Footer: no changes
- Inner pages: only homepage
- New data models: no Supabase schema changes
- New fonts: use existing Plus Jakarta Sans
