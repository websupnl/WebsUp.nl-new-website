export const revalidate = 3600

import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'
import CTASection from '@/components/site/CTASection'
import ReviewsSection from '@/components/site/ReviewsSection'
import Reveal from '@/components/ui/Reveal'
import WavePageHeader from '@/components/site/WavePageHeader'
import { finalTrustItems } from '@/lib/homepage-content'

export const metadata: Metadata = {
  title: 'Over mij',
  description:
    'Bij WebsUp schakel je direct met degene die meedenkt, ontwerpt en bouwt. Geen tussenlagen, geen ruis, wel korte lijnen en een oplossing die past bij jouw bedrijf.',
}

const principlePoints = [
  'Direct contact met degene die meedenkt en bouwt',
  'Eerlijk advies over wat wel en niet nodig is',
  'Technisch sterk, van website tot koppeling',
  'Ruimte om later verder door te bouwen',
]

const collaborationSteps = [
  { title: 'Kennismaking', text: 'We beginnen met een gesprek over je bedrijf, je vraag en waar je op vastloopt. Vrijblijvend, geen verkooppraat.' },
  { title: 'Slimste stap bepalen', text: 'Dan bepalen we samen de logische volgende stap. Soms een website, soms iets meer.' },
  { title: 'Bouwen en verfijnen', text: 'Ik bouw iteratief. Je ziet tussentijdse resultaten en geeft feedback voordat alles vastligt.' },
  { title: 'Live en doorgroeien', text: 'Na lancering ben ik beschikbaar voor updates, optimalisaties en nieuwe uitbreidingen.' },
]

const STEP_ACCENTS = ['#f97316', '#ec4899', '#a78bfa', '#f97316']

const TECH_STACK = [
  { name: 'Next.js', cat: 'Frontend', color: '#000000' },
  { name: 'React', cat: 'Frontend', color: '#61DAFB' },
  { name: 'Tailwind CSS', cat: 'Styling', color: '#38BDF8' },
  { name: 'TypeScript', cat: 'Language', color: '#3178C6' },
  { name: 'Supabase', cat: 'Backend / DB', color: '#3ECF8E' },
  { name: 'n8n', cat: 'Automatisering', color: '#EA4B71' },
  { name: 'Shopify', cat: 'E-commerce', color: '#96BF48' },
  { name: 'WooCommerce', cat: 'E-commerce', color: '#7F54B3' },
]

export default async function OverOnsPage() {
  return (
    <div>
      <WavePageHeader
        badge="Over mij"
        title="Geen bureau."
        titleHighlight="Direct met Daan."
        subtitle="Bij WebsUp schakel je direct met mij, de persoon die meedenkt, ontwerpt en bouwt. Geen tussenlagen, geen account managers, geen ruis."
        heightClass="min-h-[56vh]"
      >
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/contact" className="btn-brand-gradient">
            Plan een kennismaking
            <ArrowRight size={14} />
          </Link>
          <Link
            href="/projecten"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:border-white/50 hover:bg-white/20"
          >
            Bekijk projecten
          </Link>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {finalTrustItems.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.label}
                className="flex items-center gap-3 border-l border-white/14 bg-white/[0.025] px-5 py-4 backdrop-blur-sm transition-colors hover:border-orange-400/60 hover:bg-white/[0.045]"
              >
                <Icon size={18} className="shrink-0 text-white/62" />
                <span className="text-[1rem] font-medium text-white/84">{item.label}</span>
              </div>
            )
          })}
        </div>
      </WavePageHeader>

      {/* Stats strip */}
      <div className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 divide-x divide-slate-100 md:grid-cols-4">
            {[
              { value: '20+', label: 'Projecten opgeleverd' },
              { value: '5.0 ⭐', label: 'Google rating' },
              { value: 'Friesland', label: 'Gebaseerd in' },
              { value: '< 1 dag', label: 'Gemiddelde reactietijd' },
            ].map((stat) => (
              <div key={stat.label} className="px-6 py-7 text-center">
                <div className="font-headline text-2xl font-extrabold tracking-[-0.03em] text-slate-900 md:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs font-medium text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wie ik ben */}
      <section className="bg-[#f8f9fc] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <Reveal>
              <div className="relative mx-auto max-w-[28rem]">
                <div
                  className="pointer-events-none absolute -inset-6 rounded-[3rem] opacity-50 blur-3xl"
                  style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(249,115,22,0.18), rgba(236,72,153,0.10) 50%, transparent 72%)' }}
                />
                <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-900/10">
                  <Image
                    src="/Daan Koolhaas.jpg"
                    alt="Daan Koolhaas, WebsUp"
                    width={720}
                    height={900}
                    className="h-auto w-full object-cover"
                    sizes="(max-width: 1024px) 80vw, 480px"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent px-6 pb-7 pt-24">
                    <p className="text-[0.6rem] font-bold uppercase tracking-[0.22em] text-orange-300/65">WebsUp.nl</p>
                    <p className="mt-1.5 text-lg font-extrabold leading-tight tracking-[-0.02em] text-white">Daan Koolhaas</p>
                    <p className="mt-0.5 text-sm text-white/50">Webdesigner & digitaal bouwer</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <span className="overline-badge mb-5 inline-flex">Wie er achter WebsUp zit</span>
              <h2
                className="font-headline font-extrabold leading-[1.06] tracking-[-0.02em] text-slate-900"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)' }}
              >
                Hoi, ik ben Daan
              </h2>
              <div className="mt-6 space-y-4 text-[1.0625rem] leading-relaxed text-slate-600">
                <p>Ik ben Daan Koolhaas, webdesigner en digitaal bouwer uit Friesland. Maar ook iemand met een achtergrond die verder gaat dan pixels en code.</p>
                <p>Naast WebsUp werk ik als werkvoorbereider bij een technisch installatiebedrijf. Dagelijks bezig met energiesystemen, EMS, thuisbatterijen en technische installaties. Dat maakt me een betere partner voor technische bedrijven die online professioneler willen overkomen.</p>
                <p>WebsUp is bewust persoonlijk gebleven. Je praat met degene die jouw website daadwerkelijk bouwt, niet met een salespersoon die het doorgeeft.</p>
              </div>
              <ul className="mt-8 space-y-3">
                {principlePoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-base text-slate-700">
                    <CheckCircle size={16} className="mt-0.5 shrink-0 text-orange-500" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-brand-gradient">
                  Plan een kennismaking <ArrowRight size={14} />
                </Link>
                <Link
                  href="/projecten"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-orange-300 hover:text-orange-600"
                >
                  Bekijk projecten
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Waarom anders + werkwijze */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-28">
        <div className="pointer-events-none absolute top-1/4 right-[10%] h-72 w-72 rounded-full bg-violet-400/8 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl space-y-20 px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <span className="overline-badge mb-4 inline-flex">Waarom anders</span>
              <h2
                className="font-headline font-extrabold leading-[1.06] tracking-[-0.02em] text-slate-900"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}
              >
                Persoonlijk, zonder het groter te maken dan het is
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <div className="space-y-4 text-[1.0625rem] leading-relaxed text-slate-600">
                <p>WebsUp is geen groot bureau met accountmanagers, saleslagen of trajecten die onnodig zwaar worden opgetuigd. Communicatie blijft helder, keuzes blijven logisch en het werk blijft dicht op de praktijk.</p>
                <p>Juist daardoor is er ruimte om eerlijk te kijken naar wat nodig is, en wat niet. Soms een complete website. Soms een slimmere structuur, een webshop of een maatwerk oplossing.</p>
                <p>Het doel is niet om overal een groot verhaal van te maken, maar om iets neer te zetten dat technisch klopt, prettig werkt en later verder kan meegroeien.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Werkwijze — dark section */}
      <section className="relative overflow-hidden bg-[#06040c] py-20 lg:py-28">
        <div className="pointer-events-none absolute -top-20 left-[8%] h-72 w-72 rounded-full bg-orange-500/8 blur-[100px]" />
        <div className="pointer-events-none absolute bottom-0 right-[6%] h-64 w-64 rounded-full bg-violet-500/8 blur-[90px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="mb-14">
            <span className="overline-badge overline-badge-dark mb-4 inline-flex">Werkwijze</span>
            <h2
              className="max-w-2xl font-headline font-extrabold leading-[1.06] tracking-[-0.035em] text-white"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}
            >
              Geen ruis, wel duidelijke lijnen.
            </h2>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {collaborationSteps.map((step, i) => (
              <Reveal key={step.title} delay={i * 70}>
                <div
                  className="relative overflow-hidden rounded-2xl p-6"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(16px)',
                  }}
                >
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-30"
                    style={{ background: `linear-gradient(90deg, transparent, ${STEP_ACCENTS[i]}, transparent)` }}
                  />
                  <div
                    className="mb-4 font-headline text-3xl font-extrabold leading-none tracking-[-0.04em] opacity-30"
                    style={{ color: STEP_ACCENTS[i] }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="mb-3 font-headline text-[1.0625rem] font-bold leading-tight text-white/90">
                    {step.title}
                  </h3>
                  <p className="text-[0.9375rem] leading-relaxed text-white/50">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="bg-[#f8f9fc] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="mb-10">
            <span className="overline-badge mb-4 inline-flex">Tools & technologie</span>
            <h2
              className="font-headline font-extrabold leading-[1.06] tracking-[-0.035em] text-slate-900"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}
            >
              Wat ik gebruik om te bouwen.
            </h2>
            <p className="mt-4 max-w-[52ch] text-[1.0625rem] leading-relaxed text-slate-500">
              Bewust gekozen voor snelheid, stabiliteit en schaalbaarheid. Geen modieuze frameworks die volgend jaar al verouderd zijn.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {TECH_STACK.map((tech, i) => (
              <Reveal key={tech.name} delay={i * 40}>
                <div className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-headline text-xs font-black text-white"
                    style={{ background: tech.color }}
                  >
                    {tech.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-headline text-[0.9375rem] font-bold text-slate-900">{tech.name}</p>
                    <p className="text-[0.75rem] text-slate-400">{tech.cat}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ReviewsSection />
      <CTASection />
    </div>
  )
}
