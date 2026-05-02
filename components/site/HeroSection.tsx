'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MessageCircle, Star, MapPin } from 'lucide-react'
import { siteConfig } from '@/config/site.config'
import { GlassCard } from '@/components/site/GlassCard'

interface HeroSectionProps {
  ctaLabel?: string
  ctaHref?: string
  secondaryCtaLabel?: string
  secondaryCtaHref?: string
}

const heroBadges = [
  { icon: MessageCircle, label: 'Direct persoonlijk contact', color: 'text-orange-400' },
  { icon: Star, label: '5-sterren reviews', color: 'text-pink-400' },
  { icon: MapPin, label: 'Heel Nederland', color: 'text-violet-300' },
]

export default function HeroSection({
  ctaLabel = 'Plan een kennismaking',
  ctaHref = siteConfig.hero.ctaHref,
  secondaryCtaLabel = 'Bekijk projecten',
  secondaryCtaHref = '/projecten',
}: HeroSectionProps) {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-[#06040c]">
      {/* Background hero wave */}
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
              'linear-gradient(110deg, rgba(6,4,12,0.92) 0%, rgba(6,4,12,0.78) 45%, rgba(6,4,12,0.55) 70%, rgba(6,4,12,0.30) 100%)',
          }}
        />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#06040c] to-transparent" />
      </div>

      <div className="relative flex flex-1 items-center px-6 pb-12 pt-28 sm:px-8 lg:px-10 lg:pb-20 lg:pt-32 xl:px-12">
        <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left — content */}
          <div className="lg:col-span-7">
            {/* Badge */}
            <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-xs font-semibold text-white/85 backdrop-blur-md">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-orange-400" />
              Direct persoonlijk contact met de bouwer
            </span>

            <h1
              className="mb-7 font-headline font-extrabold leading-[1.05] tracking-[-0.03em] text-white"
              style={{ fontSize: 'clamp(2.1rem, 4.4vw, 3.6rem)' }}
            >
              Maatwerk websites en digitale systemen die{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #f97316 0%, #ec4899 45%, #a78bfa 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                écht werken.
              </span>
            </h1>

            <p className="mb-9 max-w-[56ch] text-base leading-relaxed text-white/65 md:text-lg">
              Geen bureau, geen account manager — direct contact met degene die jouw website bouwt, denkt en oplevert.
            </p>

            <div className="mb-10 flex flex-wrap gap-3">
              <Link href={ctaHref} className="btn-brand-gradient">
                {ctaLabel}
                <ArrowRight size={14} />
              </Link>
              {secondaryCtaLabel && secondaryCtaHref && (
                <Link
                  href={secondaryCtaHref}
                  className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-colors duration-150 hover:bg-white/10 hover:border-white/22"
                >
                  {secondaryCtaLabel}
                </Link>
              )}
            </div>

            {/* Trust badges met iconen */}
            <div className="grid gap-3 sm:grid-cols-3 max-w-2xl">
              {heroBadges.map(({ icon: Icon, label, color }) => (
                <GlassCard key={label} padding="px-4 py-3" className="flex items-center gap-2.5">
                  <Icon size={16} className={`flex-shrink-0 ${color}`} />
                  <span className="text-sm text-white/85 font-medium">{label}</span>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Right — foto Daan */}
          <div className="relative lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Orange glow */}
              <div
                className="pointer-events-none absolute -inset-6 rounded-[2rem] opacity-80 blur-2xl"
                style={{
                  background: 'radial-gradient(closest-side, rgba(249,115,22,0.30), rgba(249,115,22,0) 70%)',
                }}
              />
              {/* Photo */}
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
              {/* Floating rating badge */}
              <div className="absolute -bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl border border-white/15 bg-white/10 px-5 py-3.5 backdrop-blur-xl shadow-xl shadow-black/30 sm:left-6 sm:right-auto sm:max-w-[280px]">
                <div className="flex items-center gap-1.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} size={14} className="fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-white">5.0 · 7+ tevreden klanten</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-white/8" />
    </section>
  )
}
