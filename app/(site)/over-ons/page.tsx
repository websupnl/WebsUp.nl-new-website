export const revalidate = 3600

import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MessageCircle, Zap, Heart } from 'lucide-react'
import CTASection from '@/components/site/CTASection'
import ReviewsSection from '@/components/site/ReviewsSection'
import Reveal from '@/components/ui/Reveal'
import WavePageHeader from '@/components/site/WavePageHeader'
import { GlassCard } from '@/components/site/GlassCard'
import { getTestimonials } from '@/lib/queries/testimonials'

export const metadata: Metadata = {
  title: 'Over mij',
  description:
    'Bij WebsUp schakel je direct met degene die meedenkt, ontwerpt en bouwt. Geen tussenlagen, geen ruis, wel korte lijnen en een oplossing die past bij jouw bedrijf.',
}

const trustItems = [
  { icon: MessageCircle, label: 'Direct contact, geen tussenlagen', color: 'text-orange-400' },
  { icon: Zap, label: 'Korte lijnen, snel schakelen', color: 'text-accent-400' },
  { icon: Heart, label: 'Persoonlijk, maar wel professioneel', color: 'text-violet-300' },
]

const principlePoints = [
  'Direct contact met degene die meedenkt en bouwt',
  'Eerlijk advies over wat wel en niet nodig is',
  'Technisch sterk, van website tot koppeling',
  'Ruimte om later verder door te bouwen',
]

const collaborationSteps = [
  'We beginnen met een gesprek over je bedrijf, je vraag en waar je op vastloopt.',
  'Dan bepalen we samen de slimste stap. Soms een website, soms meer.',
  'Daarna bouwen we iets dat klopt, goed werkt en later verder kan meegroeien.',
]

export default async function OverOnsPage() {
  const testimonials = await getTestimonials()
  return (
    <div>
      {/* ── Hero (compact, in lijn met andere pagina's) ─── */}
      <WavePageHeader
        badge="Over mij"
        title="Geen bureau. Wel iemand die"
        titleHighlight="écht meedenkt en bouwt."
        subtitle="Bij WebsUp schakel je direct met mij, de persoon die meedenkt, ontwerpt en bouwt. Geen tussenlagen, geen account managers, geen ruis."
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
          {trustItems.map(({ icon: Icon, label, color }) => (
            <GlassCard key={label} padding="px-4 py-3" className="flex items-center gap-2.5">
              <Icon size={16} className={`flex-shrink-0 ${color}`} />
              <span className="text-sm text-white/85 font-medium">{label}</span>
            </GlassCard>
          ))}
        </div>
      </WavePageHeader>

      {/* ── Wie ik ben, foto naast content ──────────────── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            {/* Foto links */}
            <Reveal>
              <div className="relative">
                <div
                  className="pointer-events-none absolute -inset-4 rounded-[2rem] opacity-60 blur-2xl"
                  style={{
                    background:
                      'radial-gradient(closest-side, rgba(186,121,223,0.22), rgba(249,115,22,0.10) 60%, transparent 80%)',
                  }}
                />
                <div className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-xl shadow-slate-900/10">
                  <Image
                    src="/Daan Koolhaas.jpg"
                    alt="Daan Koolhaas, WebsUp"
                    width={720}
                    height={900}
                    className="h-auto w-full object-cover"
                    sizes="(max-width: 1024px) 80vw, 480px"
                  />
                </div>
              </div>
            </Reveal>

            {/* Content rechts */}
            <Reveal delay={80}>
              <span className="gradient-text text-[11px] font-bold uppercase tracking-[0.14em]">
                Wie er achter WebsUp zit
              </span>
              <h2 className="mt-4 font-headline text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] text-slate-900 md:text-4xl lg:text-5xl">
                Hoi, ik ben Daan
              </h2>

              <div className="mt-7 space-y-5 text-lg leading-relaxed text-slate-600">
                <p>
                  Ik ben Daan Koolhaas, webdesigner en digitaal bouwer uit Friesland. Maar ook iemand met een achtergrond die verder gaat dan pixels en code.
                </p>
                <p>
                  Naast WebsUp werk ik als werkvoorbereider bij een technisch installatiebedrijf. Dagelijks ben ik bezig met energiesystemen, EMS, thuisbatterijen en technische installaties. Dat klinkt als een vreemde combinatie, maar het maakt me een betere partner voor technische bedrijven die online professioneler willen overkomen.
                </p>
                <p>
                  Ik begrijp hoe installateurs denken. Ik begrijp wat ondernemers nodig hebben. En ik weet hoe je dat vertaalt naar een website die vertrouwen wekt bij precies de juiste doelgroep.
                </p>
                <p>
                  WebsUp is bewust persoonlijk gebleven. Je praat met degene die jouw website daadwerkelijk bouwt, niet met een salespersoon die het doorgeeft.
                </p>
              </div>

              <ul className="mt-10 space-y-3.5">
                {principlePoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-base leading-relaxed text-slate-700">
                    <ArrowRight size={18} className="mt-1 flex-shrink-0 text-accent-400" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Waarom dit anders werkt ─────────────────────── */}
      <section className="bg-slate-50 py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Reveal>
            <h2 className="font-headline text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] text-slate-900 md:text-4xl lg:text-5xl">
              Persoonlijk samenwerken, zonder het groter te maken dan het is
            </h2>
            <div className="mt-7 space-y-5 text-lg leading-relaxed text-slate-600">
              <p>
                WebsUp is geen groot bureau met accountmanagers, saleslagen of trajecten die onnodig zwaar worden opgetuigd. Het voordeel is simpel: communicatie blijft helder, keuzes blijven logisch en het werk blijft dicht op de praktijk.
              </p>
              <p>
                Juist daardoor is er ruimte om eerlijk te kijken naar wat nodig is, en wat niet. Soms is dat een complete website. Soms een slimmere structuur, een webshop of een maatwerk oplossing achter de schermen.
              </p>
              <p>
                Het doel is niet om overal een groot verhaal van te maken, maar om iets neer te zetten dat technisch klopt, prettig werkt en later nog verder kan meegroeien.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Werkwijze ───────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Reveal>
            <h2 className="font-headline text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] text-slate-900 md:text-4xl lg:text-5xl">
              Geen ruis, wel duidelijke lijnen
            </h2>
          </Reveal>

          <ol className="mt-10 space-y-8">
            {collaborationSteps.map((step, i) => (
              <Reveal key={step} delay={i * 80}>
                <li className="flex items-start gap-5">
                  <span className="font-headline brand-gradient-ring flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-lg font-bold text-accent-600">
                    {i + 1}
                  </span>
                  <p className="pt-2 text-lg leading-relaxed text-slate-700">{step}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Reviews (shared) ────────────────────────────── */}
      <ReviewsSection testimonials={testimonials} />

      {/* ── CTA ─────────────────────────────────────────── */}
      <CTASection />
    </div>
  )
}
