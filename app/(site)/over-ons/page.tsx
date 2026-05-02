export const revalidate = 3600

import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MessageCircle, Zap, Heart } from 'lucide-react'
import CTASection from '@/components/site/CTASection'
import ReviewsSection from '@/components/site/ReviewsSection'
import Reveal from '@/components/ui/Reveal'
import { GlassCard } from '@/components/site/GlassCard'
import { getTestimonials } from '@/lib/queries/testimonials'

export const metadata: Metadata = {
  title: 'Over mij',
  description:
    'Bij WebsUp schakel je direct met degene die meedenkt, ontwerpt en bouwt. Geen tussenlagen, geen ruis, wel korte lijnen en een oplossing die past bij jouw bedrijf.',
}

const trustItems = [
  { icon: MessageCircle, label: 'Direct contact — geen tussenlagen', color: 'text-orange-400' },
  { icon: Zap, label: 'Korte lijnen — snel schakelen', color: 'text-pink-400' },
  { icon: Heart, label: 'Persoonlijk — maar wel professioneel', color: 'text-violet-300' },
]

const principlePoints = [
  'Direct contact met degene die meedenkt en bouwt',
  'Eerlijk advies over wat wel en niet nodig is',
  'Technisch sterk — van website tot koppeling',
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
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#06040c]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="hero-wave-bg absolute inset-[-8%]">
            <Image
              src="/hero-bg.png"
              alt=""
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
              quality={85}
            />
          </div>
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(110deg, rgba(6,4,12,0.94) 0%, rgba(6,4,12,0.78) 45%, rgba(6,4,12,0.50) 75%, rgba(6,4,12,0.30) 100%)',
            }}
          />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#06040c] to-transparent" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pt-32 pb-16 lg:grid-cols-12 lg:items-center lg:gap-14 lg:px-8 lg:pt-36 lg:pb-20">
          {/* Left — copy */}
          <div className="lg:col-span-7">
            <span className="overline-badge overline-badge-dark mb-5">Over mij</span>
            <h1
              className="mb-6 font-headline font-extrabold leading-[1.06] tracking-[-0.03em] text-white"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)' }}
            >
              Geen bureau. Wel iemand die{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #f97316 0%, #ec4899 45%, #a78bfa 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                écht meedenkt en bouwt.
              </span>
            </h1>
            <p className="max-w-[55ch] text-base leading-relaxed text-white/65 md:text-lg">
              Bij WebsUp schakel je direct met mij — de persoon die meedenkt, ontwerpt en bouwt. Geen tussenlagen, geen account managers, geen ruis.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-brand-gradient">
                Plan een kennismaking
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/projecten"
                className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-colors duration-150 hover:border-white/22 hover:bg-white/10"
              >
                Bekijk projecten
              </Link>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {trustItems.map(({ icon: Icon, label, color }) => (
                <GlassCard key={label} padding="px-4 py-3" className="flex items-center gap-2.5">
                  <Icon size={16} className={`flex-shrink-0 ${color}`} />
                  <span className="text-sm text-white/85 font-medium">{label}</span>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Right — foto */}
          <div className="relative lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div
                className="pointer-events-none absolute -inset-6 rounded-[2rem] opacity-70 blur-2xl"
                style={{
                  background: 'radial-gradient(closest-side, rgba(249,115,22,0.28), rgba(249,115,22,0) 70%)',
                }}
              />
              <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/40">
                <Image
                  src="/Daan Koolhaas.jpg"
                  alt="Daan Koolhaas — WebsUp"
                  width={720}
                  height={900}
                  priority
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 1024px) 80vw, 480px"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-white/8" />
      </section>

      {/* ── Wie ik ben ──────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Reveal>
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-orange-500">
              Wie er achter WebsUp zit
            </span>
            <h2 className="mt-4 font-headline text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] text-slate-900 md:text-4xl lg:text-5xl">
              Hoi, ik ben Daan
            </h2>

            <div className="mt-7 space-y-5 text-lg leading-relaxed text-slate-600">
              <p>
                Ik ben Daan Koolhaas — webdesigner en digitaal bouwer uit Friesland. Maar ook iemand met een achtergrond die verder gaat dan pixels en code.
              </p>
              <p>
                Naast WebsUp werk ik als werkvoorbereider bij een technisch installatiebedrijf. Dagelijks ben ik bezig met energiesystemen, EMS, thuisbatterijen en technische installaties. Dat klinkt als een vreemde combinatie, maar het maakt me een betere partner voor technische bedrijven die online professioneler willen overkomen.
              </p>
              <p>
                Ik begrijp hoe installateurs denken. Ik begrijp wat ondernemers nodig hebben. En ik weet hoe je dat vertaalt naar een website die vertrouwen wekt bij precies de juiste doelgroep.
              </p>
              <p>
                WebsUp is bewust persoonlijk gebleven. Je praat met degene die jouw website daadwerkelijk bouwt — niet met een sales persoon die het doorgeeft.
              </p>
            </div>

            <ul className="mt-10 space-y-3.5">
              {principlePoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-base leading-relaxed text-slate-700">
                  <ArrowRight size={18} className="mt-1 flex-shrink-0 text-orange-500" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── Waarom dit anders werkt ─────────────────────────── */}
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

      {/* ── Werkwijze ───────────────────────────────────────── */}
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
                  <span className="font-headline flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-orange-500 text-lg font-bold text-orange-500">
                    {i + 1}
                  </span>
                  <p className="pt-2 text-lg leading-relaxed text-slate-700">{step}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Reviews (shared) ────────────────────────────────── */}
      <ReviewsSection testimonials={testimonials} />

      {/* ── CTA ─────────────────────────────────────────────── */}
      <CTASection />
    </div>
  )
}
