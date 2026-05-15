'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import HeroRotatingWord from '@/components/site/HeroRotatingWord'

const TRUST = ['Direct contact met Daan', 'Geen verplichting', 'Praktisch advies']

export default function HeroSection() {
  return (
    <section
      className="relative flex min-h-screen flex-col overflow-hidden"
      style={{
        backgroundColor: '#06040c',
        backgroundImage: 'url("/hero-bg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* ── Overlays ─────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0">
        {/* Directional overlay: links donker voor tekst, rechts open voor wave + foto */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(110deg, rgba(6,4,12,0.97) 0%, rgba(6,4,12,0.88) 38%, rgba(6,4,12,0.55) 68%, rgba(6,4,12,0.32) 100%)',
          }}
        />
        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#06040c] to-transparent" />
      </div>

      {/* Watermark */}
      <div className="pointer-events-none absolute bottom-7 right-8 hidden items-center gap-3 text-[0.6rem] font-bold uppercase tracking-[0.22em] text-white/18 lg:flex">
        <span className="h-px w-10 bg-gradient-to-r from-transparent via-white/24 to-transparent" />
        WebsUp
      </div>

      {/* Bottom hairline */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/[0.07]" />

      {/* ── Content grid ───────────────────────────────────────── */}
      <div className="relative mt-auto w-full">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 pb-12 pt-28 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-14 lg:px-8 lg:pb-16 lg:pt-36">

          {/* ── LEFT ─────────────────────────────────────────── */}
          <div className="flex flex-col">

            {/* Badge */}
            <span className="overline-badge overline-badge-dark mb-6 self-start">
              Webdesign &amp; Development
            </span>

            {/* Headline */}
            <h1
              className="font-headline font-extrabold leading-[1.06] tracking-[-0.035em] text-white"
              style={{ fontSize: 'clamp(2rem, 4.2vw, 3.6rem)' }}
            >
              Ik bouw voor bedrijven
              <br />
              die willen{' '}
              <HeroRotatingWord />
            </h1>

            {/* Separator */}
            <div className="focus-pulse-line mt-6 h-[3px] w-24 rounded-full bg-gradient-to-r from-orange-400 via-pink-400 to-violet-300" />

            {/* Body */}
            <p className="mt-5 max-w-[52ch] text-[1.0625rem] leading-[1.76] text-white/75">
              Ik ontwerp en bouw digitale oplossingen die niet alleen goed ogen, maar ook bijdragen aan de groei van jouw bedrijf. Van converterende websites en webshops tot maatwerk dashboards en automatisering.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="btn-brand-gradient group w-full justify-center gap-2.5 sm:w-auto sm:justify-start"
              >
                Gratis ontwerp aanvragen
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/projecten"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/[0.18] bg-white/[0.06] px-7 py-3.5 text-sm font-medium text-white/80 backdrop-blur-sm transition-all duration-200 hover:border-white/[0.30] hover:bg-white/[0.10] hover:text-white sm:w-auto"
              >
                Bekijk projecten
              </Link>
            </div>

            {/* Trust pills */}
            <div className="mt-8 flex flex-wrap gap-x-3 gap-y-2.5">
              {TRUST.map((label) => (
                <div
                  key={label}
                  className="group inline-flex items-center gap-2.5 rounded-full px-3.5 py-2 text-[0.75rem] font-medium transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(249,115,22,0.12) 0%, rgba(236,72,153,0.08) 100%)',
                    border: '1px solid rgba(249,115,22,0.20)',
                    backdropFilter: 'blur(8px) saturate(140%)',
                    WebkitBackdropFilter: 'blur(8px) saturate(140%)',
                    color: 'rgba(255,255,255,0.82)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(249,115,22,0.20) 0%, rgba(236,72,153,0.14) 100%)'
                    e.currentTarget.style.borderColor = 'rgba(249,115,22,0.32)'
                    e.currentTarget.style.color = 'rgba(255,255,255,0.95)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(249,115,22,0.12) 0%, rgba(236,72,153,0.08) 100%)'
                    e.currentTarget.style.borderColor = 'rgba(249,115,22,0.20)'
                    e.currentTarget.style.color = 'rgba(255,255,255,0.82)'
                  }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-orange-400 to-pink-400 group-hover:scale-125 transition-transform duration-300" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: photo card ─────────────────────────────── */}
          <div className="hidden lg:block">
            <div className="relative mx-auto max-w-[26rem]">

              {/* Ambient glow */}
              <div
                className="pointer-events-none absolute -inset-8 rounded-[3rem] opacity-70 blur-3xl"
                style={{
                  background:
                    'radial-gradient(ellipse at 50% 30%, rgba(249,115,22,0.22), rgba(236,72,153,0.10) 50%, transparent 72%)',
                }}
              />

              {/* Card */}
              <div className="group relative overflow-hidden rounded-[2rem] border border-white/[0.10] bg-white/[0.035] shadow-[0_32px_80px_rgba(0,0,0,0.52),0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur-sm transition-all duration-700 hover:-translate-y-1.5 hover:border-white/[0.16]">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                <Image
                  src="/Daan Koolhaas.jpg"
                  alt="Daan Koolhaas — WebsUp.nl"
                  width={640}
                  height={800}
                  priority
                  className="h-auto w-full object-cover"
                />

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#06040c]/95 via-[#06040c]/55 to-transparent px-6 pb-7 pt-24">
                  <p className="text-[0.6rem] font-bold uppercase tracking-[0.22em] text-orange-300/65">
                    WebsUp.nl
                  </p>
                  <p className="mt-2 text-[1.35rem] font-extrabold leading-tight tracking-[-0.02em] text-white">
                    Daan Koolhaas
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[0.78rem] text-white/45">Design</span>
                    <span className="h-[3px] w-[3px] rounded-full bg-white/25" />
                    <span className="text-[0.78rem] text-white/45">Strategie</span>
                    <span className="h-[3px] w-[3px] rounded-full bg-white/25" />
                    <span className="text-[0.78rem] text-white/45">Techniek</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
