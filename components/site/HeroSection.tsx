'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { siteConfig } from '@/config/site.config'
import { Tooltip } from '@/components/ui/tooltip-card'

interface HeroSectionProps {
  ctaLabel?: string
  ctaHref?: string
  secondaryCtaLabel?: string
  secondaryCtaHref?: string
}

const platforms = [
  { name: 'WordPress', dot: '#21759b', tip: 'Sterk voor bedrijfssites, landingspagina’s en beheerbare content-websites.' },
  { name: 'Shopify', dot: '#96bf48', tip: 'Ideaal voor webshops die snel live moeten, goed moeten verkopen en makkelijk te beheren zijn.' },
  { name: 'Webapps', dot: '#f97316', tip: 'Voor portals, calculators, klantomgevingen en andere maatwerk functionaliteiten.' },
  { name: 'Dashboards', dot: '#ec4899', tip: 'Voor realtime inzicht, klantdata, processen en interne tools op maat.' },
  { name: 'Maatwerk', dot: '#a78bfa', tip: 'Wanneer standaard tools niet meer passen en er echt iets om jouw proces heen gebouwd moet worden.' },
]

const logos = ['BP Uitgevers', 'Weso', 'Thuisbatterijen Friesland', 'Bouma Installaties', 'OtterMedia', 'Rottevalle.com']
const marquee = [...logos, ...logos]

const proofPoints = [
  'Direct contact met de bouwer',
  '5-sterren ervaringen van klanten',
  'Websites, webshops en maatwerk in een lijn',
]

export default function HeroSection({
  ctaLabel = siteConfig.hero.ctaLabel,
  ctaHref = siteConfig.hero.ctaHref,
  secondaryCtaLabel = 'Bekijk projecten',
  secondaryCtaHref = '/projecten',
}: HeroSectionProps) {
  return (
    <div>
      <section className="relative flex min-h-screen flex-col overflow-hidden bg-[#06040c]">
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
                'linear-gradient(110deg, rgba(6,4,12,0.95) 0%, rgba(6,4,12,0.85) 42%, rgba(6,4,12,0.50) 65%, rgba(6,4,12,0.18) 100%)',
            }}
          />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#06040c] to-transparent" />
        </div>

        <div className="relative mx-auto flex w-full max-w-7xl flex-1 items-center px-6 pb-20 pt-32 lg:px-8 lg:pb-28 lg:pt-44">
          <div className="liquid-glass-dark w-full max-w-[860px] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.22)] sm:p-8 lg:p-10">
            <p className="mb-6 text-sm font-medium text-white/50">
              Websites en digitale systemen voor ondernemers die serieus door willen
            </p>

            <h1
              className="mb-7 font-headline font-extrabold leading-[1.06] tracking-[-0.03em] text-white"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}
            >
              Websites die{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #f97316 0%, #ec4899 45%, #a78bfa 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                vertrouwen geven
              </span>
            </h1>

            <p className="mb-10 max-w-[56ch] text-base leading-relaxed text-white/60 md:text-lg">
              WebsUp bouwt websites, webshops, apps en automatiseringen voor MKB&apos;ers, dienstverleners en technische bedrijven. Los wanneer dat genoeg is, gekoppeld wanneer dat slimmer werkt.
            </p>

            <div className="mb-12 flex flex-wrap gap-3">
              <Link
                href={ctaHref}
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-slate-900 shadow-lg transition-all duration-150 hover:-translate-y-px hover:bg-white/90"
              >
                {ctaLabel}
                <ArrowRight size={14} />
              </Link>
              {secondaryCtaLabel && secondaryCtaHref && (
                <Link
                  href={secondaryCtaHref}
                  className="btn-glass-dark inline-flex items-center gap-2 px-6 py-3.5 text-sm"
                >
                  <span>{secondaryCtaLabel}</span>
                </Link>
              )}
            </div>

            <div className="mb-7 grid gap-2.5 text-sm text-white/65 sm:grid-cols-3">
              {proofPoints.map((point) => (
                <div key={point} className="flex items-start gap-2">
                  <CheckCircle size={15} className="mt-0.5 shrink-0 text-orange-400" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {platforms.map((platform) => (
                <Tooltip key={platform.name} content={platform.tip} containerClassName="text-white/60">
                  <span className="inline-flex cursor-default items-center gap-1.5 rounded-full border border-white/12 bg-white/8 px-2.5 py-1 text-xs font-semibold text-white/60 transition-colors hover:bg-white/12 hover:text-white/80">
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: platform.dot }} />
                    {platform.name}
                  </span>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-white/8" />
      </section>

      <div className="relative overflow-hidden border-b border-white/6 bg-[#06040c] py-5">
        <div
          className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-20"
          style={{ background: 'linear-gradient(to right, #06040c, transparent)' }}
        />
        <div
          className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-20"
          style={{ background: 'linear-gradient(to left, #06040c, transparent)' }}
        />

        <ul className="marquee-track m-0 flex w-max list-none items-center gap-0 p-0">
          <li className="flex items-center border-r border-white/6 px-10">
            <span className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.12em] text-orange-300/70">
              Vertrouwd door lokale bedrijven
            </span>
          </li>
          {marquee.map((name, i) => (
            <li
              key={`${name}-${i}`}
              className="flex items-center border-r border-white/6 px-10 last:border-r-0"
            >
              <span className="font-headline text-sm font-bold whitespace-nowrap text-white/25 transition-opacity hover:text-white/45">
                {name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
