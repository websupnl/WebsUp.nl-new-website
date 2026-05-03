# WebsUp.nl Homepage Redesign — Elevated Dark — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the WebsUp.nl homepage to a premium "Elevated Dark" aesthetic with grain texture, glassmorphism cards, cinematic typography, parallax hero, asymmetric project grid, and a dark marquee reviews section.

**Architecture:** Reusable `GrainOverlay` component added to `components/ui/`. Six existing section components updated in place. No new pages, no schema changes, no new routes. All dark sections use the existing `glass-panel-dark` and `marquee-track` CSS classes from globals.css.

**Tech Stack:** Next.js 15 App Router, Tailwind CSS v4, Framer Motion v12 (`motion/react`), existing `Reveal` component, existing CSS classes (`glass-panel-dark`, `marquee-track`, `overline-badge-dark`, `gradient-text`, `btn-brand-gradient`).

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `components/ui/GrainOverlay.tsx` | **Create** | Reusable noise texture overlay for dark sections |
| `components/site/HeroSection.tsx` | **Modify** | Add parallax on photo, grain overlay on photo |
| `components/site/ProblemSection.tsx` | **Modify** | Dark bg, glassmorphism cards, white text |
| `components/site/ServicesSection.tsx` | **Modify** | Bigger H2, hover gradient on cards |
| `components/site/ProjectsSection.tsx` | **Modify** | Dark bg + grain, asymmetric full-bleed image grid |
| `components/site/AboutMeSection.tsx` | **Modify** | Photo tilt, grain, client quote blockquote |
| `components/site/ReviewsSection.tsx` | **Modify** | Dark bg + grain, featured card + marquee |
| `components/site/CTASection.tsx` | **Modify** | Grain overlay, bigger H2, glass trust items |

---

## Task 1: Create GrainOverlay component

**Files:**
- Create: `components/ui/GrainOverlay.tsx`

- [ ] **Step 1: Create the file**

```tsx
// components/ui/GrainOverlay.tsx
interface GrainOverlayProps {
  opacity?: number
  className?: string
}

export default function GrainOverlay({ opacity = 0.045, className = '' }: GrainOverlayProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)'/%3E%3C%2Fsvg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '300px 300px',
        opacity,
      }}
    />
  )
}
```

- [ ] **Step 2: Verify it compiles — import it in any file temporarily and check for TS errors**

No runtime check needed — it's a static div with inline styles.

- [ ] **Step 3: Commit**

```
git add components/ui/GrainOverlay.tsx
git commit -m "feat: add GrainOverlay component for dark section texture"
```

---

## Task 2: Update HeroSection — parallax + grain on photo

**Files:**
- Modify: `components/site/HeroSection.tsx`

The hero is already `'use client'`. Add `useRef`, `useScroll`, `useTransform` from `framer-motion`. Wrap the photo container in a `motion.div` with a `y` transform driven by scroll. Add `GrainOverlay` on top of the photo.

- [ ] **Step 1: Replace HeroSection.tsx with this content**

```tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, CheckCircle, MessageCircle, Sparkles } from 'lucide-react'
import GrainOverlay from '@/components/ui/GrainOverlay'

const trustItems = ['Direct contact met Daan', 'Persoonlijke aanpak', 'Maatwerk voor groei']

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])

  return (
    <section ref={sectionRef} className="relative flex min-h-screen flex-col overflow-hidden bg-[#06040c]">
      <div className="absolute inset-0 overflow-hidden">
        <div className="hero-wave-bg absolute inset-[-8%]">
          <Image
            src="/hero-bg.png"
            alt=""
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
            quality={90}
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(110deg, rgba(6,4,12,0.94) 0%, rgba(6,4,12,0.84) 46%, rgba(6,4,12,0.60) 72%, rgba(6,4,12,0.42) 100%)',
          }}
        />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#06040c] to-transparent" />
      </div>

      <GrainOverlay opacity={0.035} />

      <div className="relative flex flex-1 items-center px-6 pb-14 pt-28 sm:px-8 lg:px-10 lg:pb-20 lg:pt-32 xl:px-12">
        <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-xs font-semibold text-white/82 backdrop-blur-md">
              <Sparkles size={13} className="text-white/70" />
              Websites, webshops en maatwerk systemen
            </span>

            <h1
              className="max-w-4xl font-headline font-extrabold leading-[1.03] tracking-[-0.035em] text-white"
              style={{ fontSize: 'clamp(2.6rem, 5.5vw, 5rem)' }}
            >
              Een website die vertrouwen wekt{' '}
              <span className="gradient-text">en klanten oplevert.</span>
            </h1>

            <p className="mt-7 max-w-[58ch] text-base leading-relaxed text-white/66 md:text-lg">
              Geen standaard template, maar een digitale oplossing die direct duidelijk maakt wat je doet, voor wie en waarom klanten voor jou moeten kiezen.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/gratis-ontwerp" className="btn-brand-gradient">
                Gratis ontwerp aanvragen
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-colors duration-150 hover:border-white/50 hover:bg-white/20"
              >
                Kennismaking plannen
              </Link>
            </div>

            <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
              {trustItems.map((item) => (
                <div key={item} className="flex min-h-14 items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 text-sm font-medium text-white/82 backdrop-blur-md">
                  <CheckCircle size={15} className="shrink-0 text-white/58" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div
                className="pointer-events-none absolute -inset-6 rounded-[2rem] opacity-80 blur-2xl"
                style={{
                  background: 'radial-gradient(closest-side, rgba(236,72,153,0.18), rgba(236,72,153,0) 70%)',
                }}
              />
              <motion.div
                className="relative overflow-hidden rounded-[1.75rem] border border-white/12 bg-white/5 shadow-2xl shadow-black/40"
                style={{ y: photoY }}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src="/Daan Koolhaas.jpg"
                    alt="Daan Koolhaas, eigenaar WebsUp.nl"
                    width={720}
                    height={900}
                    priority
                    className="h-auto w-full object-cover"
                    sizes="(max-width: 1024px) 80vw, 480px"
                  />
                  <GrainOverlay opacity={0.07} />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background: 'linear-gradient(to right, rgba(6,4,12,0.55) 0%, transparent 45%)',
                    }}
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#06040c]/86 via-[#06040c]/35 to-transparent p-6 pt-20">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <div className="font-headline text-xl font-bold text-white">Daan Koolhaas</div>
                      <div className="mt-1 text-sm text-white/68">Eigenaar WebsUp.nl</div>
                    </div>
                    <div className="hidden h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-sm sm:flex">
                      <MessageCircle size={18} />
                    </div>
                  </div>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/62">
                    Persoonlijk contact vanaf het eerste idee tot de oplevering.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-white/8" />
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```
git add components/site/HeroSection.tsx
git commit -m "feat: hero parallax on photo + grain texture overlay"
```

---

## Task 3: Update ProblemSection — dark bg + glassmorphism

**Files:**
- Modify: `components/site/ProblemSection.tsx`

Switch background from `bg-slate-50` to dark. Replace all slate text with white variants. Use `glass-panel-dark` on cards. Add `GrainOverlay`. Use `overline-badge overline-badge-dark` for eyebrow.

- [ ] **Step 1: Replace ProblemSection.tsx with this content**

```tsx
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import GrainOverlay from '@/components/ui/GrainOverlay'

const painPoints = [
  {
    problem: 'Bezoekers snappen niet direct wat je doet of aanbiedt',
    solution: 'Meteen duidelijk: wat je biedt, voor wie en waarom jij de juiste keuze bent',
  },
  {
    problem: 'Er is geen duidelijke reden om contact op te nemen',
    solution: 'Gerichte oproep tot actie op het juiste moment, zodat een bezoeker weet wat de volgende stap is',
  },
  {
    problem: 'De uitstraling wekt geen vertrouwen op bij de doelgroep',
    solution: 'Een uitstraling die aansluit bij jouw merk en het vertrouwen geeft dat bezoekers nodig hebben om te kiezen',
  },
]

export default function ProblemSection() {
  return (
    <section className="relative overflow-hidden bg-[#06040c] py-16 lg:py-24">
      <GrainOverlay opacity={0.04} />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <span className="overline-badge overline-badge-dark mb-5 inline-flex">Herkenbaar?</span>
            <h2
              className="max-w-2xl font-headline font-extrabold leading-[1.06] tracking-[-0.03em] text-white"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
            >
              Een nette website levert niet automatisch klanten op
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-white/56 md:text-lg lg:justify-self-end">
            Veel bedrijven hebben een website die er goed uitziet, maar te weinig bezoekers omzet in klanten of contact. Dat komt bijna altijd door dezelfde drie dingen.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {painPoints.map((point, index) => (
            <Reveal key={point.problem} delay={index * 70}>
              <div className="glass-panel-dark flex h-full flex-col rounded-2xl p-7 transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.08]">
                <div className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white/38">
                  Vaak zo
                </div>
                <p className="text-sm leading-relaxed text-white/58">{point.problem}</p>
                <div className="my-5 flex items-center gap-3">
                  <div className="h-px flex-1 bg-white/12" />
                  <ArrowRight size={13} className="shrink-0 text-white/30" />
                  <div className="h-px flex-1 bg-white/12" />
                </div>
                <div className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white/80">
                  Hoe het anders kan
                </div>
                <p className="text-sm font-medium leading-relaxed text-white/86">{point.solution}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={240}>
          <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-white/10 pt-8">
            <Link href="/gratis-ontwerp" className="btn-brand-gradient">
              Gratis ontwerp aanvragen
              <ArrowRight size={14} />
            </Link>
            <p className="text-sm text-white/42">
              Zo zie je direct wat anders kan, zonder verplichting.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```
git add components/site/ProblemSection.tsx
git commit -m "feat: problem section dark glassmorphism treatment"
```

---

## Task 4: Update ServicesSection — bigger H2 + hover gradient

**Files:**
- Modify: `components/site/ServicesSection.tsx`

Two targeted changes: (1) increase H2 to clamp size, (2) add subtle orange-pink tint on card hover.

- [ ] **Step 1: Update the H2 in ServicesSection.tsx**

Find this line:
```tsx
            <h2 className="max-w-2xl font-headline text-4xl font-extrabold leading-[1.06] tracking-[-0.02em] text-slate-900 md:text-5xl">
              Wat wil je laten bouwen?
            </h2>
```

Replace with:
```tsx
            <h2
              className="max-w-2xl font-headline font-extrabold leading-[1.06] tracking-[-0.03em] text-slate-900"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
            >
              Wat wil je laten bouwen?
            </h2>
```

- [ ] **Step 2: Update the service card article element**

Find:
```tsx
                <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm shadow-slate-950/[0.03] transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-950/[0.06]">
```

Replace with:
```tsx
                <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm shadow-slate-950/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-orange-200/60 hover:shadow-lg hover:shadow-slate-950/[0.06] hover:bg-gradient-to-br hover:from-orange-50/40 hover:to-pink-50/30">
```

- [ ] **Step 3: Commit**

```
git add components/site/ServicesSection.tsx
git commit -m "feat: services section bigger headline + hover gradient"
```

---

## Task 5: Redesign ProjectsSection — dark full-bleed asymmetric grid

**Files:**
- Modify: `components/site/ProjectsSection.tsx`

Complete visual redesign. Keep all data logic (`pickProjects`, `projectCopy`, `preferredProjects`) and props interface (`ProjectsSectionProps`) unchanged. Only change the JSX rendering.

- [ ] **Step 1: Replace ProjectsSection.tsx with this content**

```tsx
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import GrainOverlay from '@/components/ui/GrainOverlay'
import type { PortfolioProject } from '@/lib/queries/projects'

interface ProjectsSectionProps {
  projects?: PortfolioProject[]
  limit?: number
}

const preferredProjects = [
  'decorservice-haak',
  'de-poortwacht',
  'prime-animalz',
  'verkeersschool-haak',
  'rottevalle',
]

const projectCopy: Record<string, {
  title?: string
  text: string
  bullets: string[]
}> = {
  'decorservice-haak': {
    title: 'Decorservice Haak',
    text: 'Een website met een professionele uitstraling, duidelijke structuur en genoeg ruimte om diensten en vakwerk goed te presenteren.',
    bullets: [
      'Duidelijke presentatie van diensten',
      'Rustige en betrouwbare uitstraling',
      'Gericht op herkenning en contact',
    ],
  },
  'de-poortwacht': {
    title: 'De Poortwacht',
    text: 'Een overzichtelijke website waarin sfeer, locatie en informatie op een rustige manier samenkomen.',
    bullets: [
      'Sterke visuele eerste indruk',
      'Duidelijke informatie voor bezoekers',
      'Passend bij de uitstraling van het bedrijf',
    ],
  },
  'prime-animalz': {
    title: 'Prime AnimalZ',
    text: 'Een webshop waarbij producten, merkgevoel en gebruiksgemak duidelijker samenkomen voor bezoekers.',
    bullets: [
      'Professionele productpresentatie',
      'Duidelijke webshopstructuur',
      'Basis voor verdere groei en optimalisatie',
    ],
  },
}

function pickProjects(projects: PortfolioProject[], limit: number) {
  const preferred = preferredProjects
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is PortfolioProject => Boolean(project))
  const rest = projects.filter((project) => !preferred.some((item) => item.slug === project.slug))
  return [...preferred, ...rest].slice(0, limit)
}

interface ProjectSlotProps {
  project: PortfolioProject
  className?: string
  imageSize?: string
}

function ProjectSlot({ project, className = '', imageSize = '(max-width: 1024px) 100vw, 50vw' }: ProjectSlotProps) {
  const copy = projectCopy[project.slug]
  return (
    <Link
      href={`/projecten/${project.slug}`}
      className={`group relative block overflow-hidden rounded-2xl bg-slate-900 ${className}`}
    >
      <Image
        src={project.image_url || '/hero-bg.png'}
        alt={copy?.title ?? project.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        sizes={imageSize}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
      <div className="absolute inset-x-0 bottom-0 translate-y-1 p-6 transition-transform duration-300 group-hover:translate-y-0">
        <div className="mb-2 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-white/50">
          {project.category || 'Website'}
        </div>
        <h3 className="font-headline text-xl font-bold text-white">
          {copy?.title ?? project.title}
        </h3>
        <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-white/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Bekijk project <ArrowRight size={13} />
        </div>
      </div>
    </Link>
  )
}

export default function ProjectsSection({ projects = [], limit = 3 }: ProjectsSectionProps) {
  if (projects.length === 0) return null
  const displayed = pickProjects(projects, limit)
  if (displayed.length === 0) return null

  const [featured, ...rest] = displayed

  return (
    <section className="relative overflow-hidden bg-[#06040c] py-16 lg:py-24">
      <GrainOverlay opacity={0.04} />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <span className="overline-badge overline-badge-dark mb-5 inline-flex">Maatwerk in praktijk</span>
            <h2
              className="max-w-3xl font-headline font-extrabold leading-[1.06] tracking-[-0.03em] text-white"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
            >
              Werk dat vertrouwen geeft voordat iemand contact opneemt
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-white/52 md:text-lg lg:justify-self-end">
            Geen templates. Elk project gebouwd rond de uitstraling, doelgroep en doelen van de klant.
          </p>
        </Reveal>

        <div className="mt-10">
          {displayed.length === 1 && (
            <Reveal>
              <ProjectSlot project={featured} className="h-80 lg:h-[480px]" imageSize="(max-width: 1024px) 100vw, 1200px" />
            </Reveal>
          )}

          {displayed.length === 2 && (
            <div className="grid gap-3 lg:grid-cols-2">
              {displayed.map((p, i) => (
                <Reveal key={p.slug} delay={i * 60}>
                  <ProjectSlot project={p} className="h-72 lg:h-[420px]" />
                </Reveal>
              ))}
            </div>
          )}

          {displayed.length >= 3 && (
            <div className="grid gap-3 lg:grid-cols-5 lg:grid-rows-2">
              <Reveal className="lg:col-span-3 lg:row-span-2">
                <ProjectSlot
                  project={featured}
                  className="h-64 lg:h-full lg:min-h-[540px]"
                  imageSize="(max-width: 1024px) 100vw, 60vw"
                />
              </Reveal>
              {rest.slice(0, 2).map((p, i) => (
                <Reveal key={p.slug} delay={(i + 1) * 70} className="lg:col-span-2">
                  <ProjectSlot
                    project={p}
                    className="h-64 lg:h-full"
                    imageSize="(max-width: 1024px) 100vw, 40vw"
                  />
                </Reveal>
              ))}
            </div>
          )}
        </div>

        <Reveal delay={280}>
          <div className="mt-8 flex flex-col gap-5 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-sm leading-relaxed text-white/42">
              Wil je weten wat er voor jouw bedrijf mogelijk is? Dan kijk ik graag met je mee.
            </p>
            <Link
              href="/projecten"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/20 bg-white/8 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/14"
            >
              Bekijk alle projecten
              <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```
git add components/site/ProjectsSection.tsx
git commit -m "feat: projects section dark full-bleed asymmetric grid"
```

---

## Task 6: Update AboutMeSection — photo tilt + grain + client quote

**Files:**
- Modify: `components/site/AboutMeSection.tsx`

Add `GrainOverlay` inside the photo wrapper. Add CSS tilt effect (`-rotate-1` → `rotate-0` on hover) using Tailwind. Add blockquote with first fallback review below the contact points.

- [ ] **Step 1: Replace AboutMeSection.tsx with this content**

```tsx
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import GrainOverlay from '@/components/ui/GrainOverlay'
import { personalContactPoints, fallbackReviews } from '@/lib/homepage-content'

const featuredQuote = fallbackReviews[0]

export default function AboutMeSection() {
  return (
    <section className="bg-slate-50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-18">
          <Reveal>
            <div className="[transform:rotate(-1.5deg)] transition-transform duration-500 ease-out hover:[transform:rotate(0deg)]">
              <div className="relative overflow-hidden rounded-[1.75rem] bg-slate-200 shadow-2xl shadow-slate-950/[0.14]">
                <Image
                  src="/Daan Koolhaas.jpg"
                  alt="Daan Koolhaas, eigenaar van WebsUp.nl"
                  width={720}
                  height={900}
                  className="h-[34rem] w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <GrainOverlay opacity={0.055} />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/82 via-slate-950/34 to-transparent p-6 pt-24 text-white">
                  <div className="font-headline text-xl font-bold">Daan Koolhaas</div>
                  <div className="mt-1 text-sm text-white/68">Eigenaar van WebsUp.nl</div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <span className="overline-badge mb-5 inline-flex">Wie zit er achter WebsUp</span>
            <h2
              className="max-w-2xl font-headline font-extrabold leading-[1.08] tracking-[-0.03em] text-slate-900"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.75rem)' }}
            >
              Geen bureau. Iemand die meedenkt en bouwt.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              Bij WebsUp werk je direct met mij. Geen accountmanager, geen lagen en geen onnodige ruis. Je legt je idee uit aan degene die ook met je meedenkt en het voor je bouwt.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-500">
              Ik denk niet alleen mee over hoe iets eruit moet zien, maar vooral over wat praktisch werkt voor jouw bedrijf. Soms is dat een website. Soms een webshop. En soms juist een maatwerk systeem dat veel werk uit handen neemt.
            </p>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/[0.03]">
              <div className="font-headline text-2xl font-bold text-slate-900">
                Je werkt direct met mij.
              </div>
              <div className="mt-5 grid gap-3">
                {personalContactPoints.map((point) => (
                  <div key={point} className="flex items-start gap-3 text-sm text-slate-600">
                    <CheckCircle size={16} className="mt-0.5 shrink-0 text-slate-400" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {featuredQuote && (
              <blockquote className="mt-6 border-l-2 border-orange-400 pl-5">
                <p className="text-sm italic leading-relaxed text-slate-500">
                  &ldquo;{featuredQuote.content}&rdquo;
                </p>
                <footer className="mt-3 text-xs font-semibold text-slate-400">
                  {featuredQuote.name} &middot; {featuredQuote.role}
                </footer>
              </blockquote>
            )}

            <div className="mt-8">
              <Link
                href="/over-ons"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
              >
                Meer over Daan
                <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```
git add components/site/AboutMeSection.tsx
git commit -m "feat: about section photo tilt + grain + client quote"
```

---

## Task 7: Redesign ReviewsSection — dark + marquee

**Files:**
- Modify: `components/site/ReviewsSection.tsx`

Switch to dark background with grain. Keep featured review card (convert to `glass-panel-dark`). Replace the 3-col static grid with a CSS marquee using the existing `marquee-track` class from globals.css. Stars changed to orange on dark bg.

- [ ] **Step 1: Replace ReviewsSection.tsx with this content**

```tsx
import Link from 'next/link'
import { ArrowRight, Quote, Star } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import GrainOverlay from '@/components/ui/GrainOverlay'
import type { TestimonialWithProject } from '@/lib/queries/testimonials'
import { fallbackReviews } from '@/lib/homepage-content'

interface ReviewsSectionProps {
  testimonials: TestimonialWithProject[]
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < count ? 'fill-orange-400 text-orange-400' : 'fill-white/14 text-white/14'}
        />
      ))}
    </div>
  )
}

export default function ReviewsSection({ testimonials }: ReviewsSectionProps) {
  const source = testimonials.length > 0
    ? testimonials.map((item) => ({
        content: item.content,
        name: item.name,
        role: item.role || item.project?.title || 'Klant van WebsUp',
        rating: item.rating ?? 5,
      }))
    : fallbackReviews.map((item) => ({ ...item, rating: 5 }))

  const featured =
    source.find((item) => !/achterstallige|geen afbeeldingen|probleem|bug|fout/i.test(item.content)) ??
    source[0]
  const rest = source.filter((item) => item !== featured)
  const marqueeItems = rest.length > 0 ? rest : source

  return (
    <section className="relative overflow-hidden bg-[#06040c] py-16 lg:py-24">
      <GrainOverlay opacity={0.04} />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mb-10 max-w-3xl">
          <span className="overline-badge overline-badge-dark mb-5 inline-flex">Ervaringen</span>
          <h2
            className="font-headline font-extrabold leading-[1.06] tracking-[-0.03em] text-white"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
          >
            Wat klanten over WebsUp zeggen
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/52 md:text-lg">
            Geen glad verhaal van mij, maar ervaringen van klanten die met WebsUp hebben gewerkt.
          </p>
        </Reveal>

        {featured && (
          <Reveal delay={80}>
            <article className="glass-panel-dark mb-5 rounded-[1.75rem] p-7 md:p-10">
              <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
                <div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white">
                    <Quote size={22} />
                  </div>
                  <div className="mt-6">
                    <Stars count={featured.rating} />
                    <div className="mt-4 font-semibold text-white">{featured.name}</div>
                    <div className="mt-1 text-sm text-white/42">{featured.role}</div>
                  </div>
                </div>
                <p className="font-headline text-2xl font-bold leading-relaxed text-white md:text-3xl">
                  &ldquo;{featured.content}&rdquo;
                </p>
              </div>
            </article>
          </Reveal>
        )}

        {marqueeItems.length > 0 && (
          <Reveal delay={140}>
            <div className="overflow-hidden">
              <div className="marquee-track flex gap-4" style={{ width: 'max-content' }}>
                {[...marqueeItems, ...marqueeItems].map((review, index) => (
                  <article
                    key={`${review.name}-${index}`}
                    className="glass-panel-dark w-[280px] shrink-0 rounded-2xl p-6"
                  >
                    <Stars count={review.rating} />
                    <p className="mt-4 text-sm leading-relaxed text-white/62">
                      &ldquo;{review.content}&rdquo;
                    </p>
                    <div className="mt-5 border-t border-white/10 pt-4">
                      <div className="text-sm font-semibold text-white/84">{review.name}</div>
                      <div className="mt-0.5 text-xs text-white/38">{review.role}</div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        <Reveal delay={200}>
          <div className="mt-8">
            <Link
              href="/projecten"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/14"
            >
              Bekijk meer ervaringen
              <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```
git add components/site/ReviewsSection.tsx
git commit -m "feat: reviews section dark bg + glassmorphism + marquee"
```

---

## Task 8: Update CTASection — grain + bigger H2 + glass trust items

**Files:**
- Modify: `components/site/CTASection.tsx`

Add `GrainOverlay` inside the dark card. Increase H2 size. Convert trust items to glass treatment.

- [ ] **Step 1: Add GrainOverlay import at top of CTASection.tsx**

Add after the existing imports:
```tsx
import GrainOverlay from '@/components/ui/GrainOverlay'
```

- [ ] **Step 2: Add GrainOverlay inside the dark rounded card**

Find:
```tsx
            <div className="absolute inset-0 overflow-hidden">
```

Add `<GrainOverlay opacity={0.04} />` immediately after the closing `</div>` of that block, before `<div className="relative z-10 ...">`:

```tsx
            <div className="absolute inset-0 overflow-hidden">
              <div className="hero-wave-bg absolute inset-[-8%]">
                <Image
                  src="/hero-bg.png"
                  alt=""
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  quality={82}
                />
              </div>
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(110deg, rgba(6,4,12,0.90) 0%, rgba(6,4,12,0.82) 48%, rgba(6,4,12,0.58) 100%)',
                }}
              />
            </div>
            <GrainOverlay opacity={0.04} />
```

- [ ] **Step 3: Increase H2 size**

Find:
```tsx
                <h2 className="max-w-3xl font-headline text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] text-white md:text-5xl">
```

Replace with:
```tsx
                <h2
                  className="max-w-3xl font-headline font-extrabold leading-[1.08] tracking-[-0.03em] text-white"
                  style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)' }}
                >
```

- [ ] **Step 4: Commit**

```
git add components/site/CTASection.tsx
git commit -m "feat: CTA section grain texture + bigger headline"
```

---

## Task 9: Final check + combined commit

- [ ] **Step 1: Verify all imports are correct**

Check each modified file imports `GrainOverlay` from `@/components/ui/GrainOverlay` where used (Hero, Problem, Projects, About, Reviews, CTA).

- [ ] **Step 2: Start dev server and visually verify**

```
npm run dev
```

Open `http://localhost:3000` and scroll through:
- Hero: photo has grain + parallax on scroll
- Problem: dark bg, glass cards
- Services: card hover tint
- Projects: dark bg, asymmetric grid, hover overlay
- About: photo tilts on hover, blockquote visible
- Reviews: dark bg, featured card, scrolling marquee
- CTA: dark with grain

- [ ] **Step 3: Final commit with all remaining staged changes**

```
git add -A
git commit -m "feat: WebsUp homepage Elevated Dark redesign complete"
```
