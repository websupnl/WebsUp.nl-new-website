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
  'We beginnen met een gesprek over je bedrijf, je vraag en waar je op vastloopt.',
  'Dan bepalen we samen de slimste stap. Soms een website, soms meer.',
  'Daarna bouwen we iets dat klopt, goed werkt en later verder kan meegroeien.',
]

export default async function OverOnsPage() {
  return (
    <div>
      {/* ── Hero (compact, in lijn met andere pagina's) ─── */}
      <WavePageHeader
        badge="Over mij"
        title="Geen bureau."
        titleHighlight="Direct met Daan."
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
          {finalTrustItems.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.label}
                className="flex items-center gap-3 border-l border-white/14 bg-white/[0.025] px-5 py-4 backdrop-blur-sm transition-colors hover:border-orange-400/60 hover:bg-white/[0.045]"
              >
                <Icon size={18} className="shrink-0 text-white/62" />
                <span className="text-sm font-medium text-white/84">{item.label}</span>
              </div>
            )
          })}
        </div>
      </WavePageHeader>

      {/* ── Wie ik ben ───────────────────────────────────── */}
      <section className="bg-[#f8f9fc] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <Reveal>
              <div className="relative mx-auto max-w-[28rem]">
                <div className="pointer-events-none absolute -inset-6 rounded-[3rem] opacity-50 blur-3xl"
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
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <span className="overline-badge mb-5 inline-flex">Wie er achter WebsUp zit</span>
              <h2 className="font-headline text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] text-slate-900 md:text-4xl">
                Hoi, ik ben Daan
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-600 md:text-lg">
                <p>Ik ben Daan Koolhaas, webdesigner en digitaal bouwer uit Friesland. Maar ook iemand met een achtergrond die verder gaat dan pixels en code.</p>
                <p>Naast WebsUp werk ik als werkvoorbereider bij een technisch installatiebedrijf. Dagelijks bezig met energiesystemen, EMS, thuisbatterijen en technische installaties. Dat maakt me een betere partner voor technische bedrijven die online professioneler willen overkomen.</p>
                <p>WebsUp is bewust persoonlijk gebleven. Je praat met degene die jouw website daadwerkelijk bouwt, niet met een salespersoon die het doorgeeft.</p>
              </div>
              <ul className="mt-8 space-y-3">
                {principlePoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-base text-slate-700">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-orange-400 to-pink-400" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Werkwijze + waarom ─── wit met dark glass cards ── */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-28">
        <div className="pointer-events-none absolute top-1/4 right-[10%] h-72 w-72 rounded-full bg-violet-400/8 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 space-y-20">
          {/* Waarom anders */}
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <span className="overline-badge mb-4 inline-flex">Waarom anders</span>
              <h2 className="font-headline text-3xl font-extrabold leading-[1.06] tracking-[-0.02em] text-slate-900 md:text-4xl">
                Persoonlijk, zonder het groter te maken dan het is
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <div className="space-y-4 text-base leading-relaxed text-slate-600 md:text-lg">
                <p>WebsUp is geen groot bureau met accountmanagers, saleslagen of trajecten die onnodig zwaar worden opgetuigd. Communicatie blijft helder, keuzes blijven logisch en het werk blijft dicht op de praktijk.</p>
                <p>Juist daardoor is er ruimte om eerlijk te kijken naar wat nodig is, en wat niet. Soms een complete website. Soms een slimmere structuur, een webshop of een maatwerk oplossing.</p>
                <p>Het doel is niet om overal een groot verhaal van te maken, maar om iets neer te zetten dat technisch klopt, prettig werkt en later verder kan meegroeien.</p>
              </div>
            </Reveal>
          </div>

          {/* Werkwijze — dark glass cards op witte bg */}
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
            <Reveal className="lg:sticky lg:top-32 lg:self-start">
              <span className="overline-badge mb-4 inline-flex">Werkwijze</span>
              <h2 className="mt-2 font-headline text-3xl font-extrabold leading-[1.06] tracking-[-0.02em] text-slate-900 md:text-4xl">
                Geen ruis, wel duidelijke lijnen
              </h2>
            </Reveal>
            <ol className="space-y-4">
              {collaborationSteps.map((step, i) => (
                <Reveal key={step} delay={i * 80}>
                  <li
                    className="relative flex items-start gap-5 overflow-hidden rounded-2xl p-6"
                    style={{ background: 'rgba(12,10,22,0.90)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)', boxShadow: '0 8px 32px rgba(0,0,0,0.14)' }}
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px"
                      style={{ background: 'linear-gradient(90deg, transparent 0%, #f97316 30%, #ec4899 60%, #a78bfa 90%, transparent 100%)', opacity: 0.28 }} />
                    <span
                      className="font-headline flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-base font-bold"
                      style={{ background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.24)', color: '#f97316' }}
                    >{i + 1}</span>
                    <p className="text-base leading-relaxed text-white/60">{step}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── Reviews (shared) ────────────────────────────── */}
      <ReviewsSection />

      {/* ── CTA ─────────────────────────────────────────── */}
      <CTASection />
    </div>
  )
}
