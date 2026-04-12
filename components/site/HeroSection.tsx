'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { siteConfig } from '@/config/site.config'
import { Tooltip } from '@/components/ui/tooltip-card'

interface HeroSectionProps {
  ctaLabel?: string
  ctaHref?: string
  secondaryCtaLabel?: string
  secondaryCtaHref?: string
}

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let n = 0
    const step = () => {
      n = Math.min(n + Math.ceil(target / 60), target)
      setVal(n)
      if (n < target) requestAnimationFrame(step)
    }
    const t = setTimeout(() => requestAnimationFrame(step), 600)
    return () => clearTimeout(t)
  }, [target])
  return <>{val}{suffix}</>
}

const platforms = [
  { name: 'WordPress',  dot: '#21759b', tip: 'Open-source CMS. Snel op te zetten en eenvoudig te beheren. Ideaal voor bedrijfssites, blogs en portals.' },
  { name: 'Shopify',    dot: '#96bf48', tip: 'Het toonaangevende e-commerce platform. Veilig, schaalbaar en klaar voor iDEAL en Mollie.' },
  { name: 'Next.js',    dot: '#ffffff', tip: 'React-framework van Vercel. Razendsnel, SEO-vriendelijk en schaalbaar van startup tot enterprise.' },
  { name: 'Maatwerk',   dot: '#a78bfa', tip: 'Geen template, maar code gebouwd specifiek voor jouw proces. Maximale flexibiliteit en schaalbaarheid.' },
]

const logos = ['BP Uitgevers','Weso','Thuisbatterijen Friesland','Bouma Installaties','OtterMedia','Rottevalle.com']
const marquee = [...logos, ...logos]

export default function HeroSection({
  ctaLabel = siteConfig.hero.ctaLabel,
  ctaHref = siteConfig.hero.ctaHref,
  secondaryCtaLabel = siteConfig.hero.secondaryCtaLabel,
  secondaryCtaHref = siteConfig.hero.secondaryCtaHref,
}: HeroSectionProps) {
  return (
    <div>
      {/* ═══ HERO ═══════════════════════════════════════════════ */}
      <section className="relative bg-[#06040c] overflow-hidden min-h-screen flex flex-col">

        {/* Wave background — geanimeerd, Stripe-stijl */}
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
          {/* Gradient overlay: links donker voor tekstleesbaarheid, rechts open voor wave */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(110deg, rgba(6,4,12,0.95) 0%, rgba(6,4,12,0.85) 42%, rgba(6,4,12,0.50) 65%, rgba(6,4,12,0.18) 100%)',
            }}
          />
          {/* Vignette bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#06040c] to-transparent pointer-events-none" />
        </div>

        {/* Content */}
        <div className="relative flex-1 flex items-center max-w-7xl mx-auto w-full px-6 lg:px-8 pt-32 pb-20 lg:pt-44 lg:pb-28">
          <div className="max-w-[820px] w-full">

            {/* Eyebrow */}
            <p className="text-sm text-white/50 mb-6 font-medium tabular-nums">
              Klanten geholpen door WebsUp:{' '}
              <span className="font-bold text-white/80">
                <Counter target={94} suffix="+" />
              </span>
            </p>

            {/* H1 */}
            <h1
              className="font-headline font-extrabold text-white tracking-[-0.03em] leading-[1.06] mb-7"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}
            >
              Eén aanspreekpunt.{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #f97316 0%, #ec4899 45%, #a78bfa 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Alles digitaal geregeld.
              </span>
            </h1>

            <p className="text-base md:text-lg text-white/60 leading-relaxed mb-10 max-w-[46ch]">
              Ik ben Daan — ik bouw websites, webshops, apps en automatiseringen
              die als één geheel werken. Persoonlijk contact, eerlijk advies,
              direct met de persoon die bouwt.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-12">
              <Link
                href={ctaHref}
                className="inline-flex items-center gap-2 bg-white text-slate-900 font-semibold text-sm px-7 py-3.5 rounded-full hover:-translate-y-px hover:bg-white/90 transition-all duration-150 shadow-lg"
              >
                {ctaLabel}
                <ArrowRight size={14} />
              </Link>
              {secondaryCtaLabel && secondaryCtaHref && (
                <Link
                  href={secondaryCtaHref}
                  className="inline-flex items-center gap-2 bg-white/10 text-white font-semibold text-sm px-6 py-3.5 rounded-full border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-150 hover:-translate-y-px backdrop-blur-sm"
                >
                  {secondaryCtaLabel}
                </Link>
              )}
            </div>

            {/* Platform badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-white/35 font-medium mr-1">Werkend met:</span>
              {platforms.map((p) => (
                <Tooltip key={p.name} content={p.tip} containerClassName="text-white/60">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/8 border border-white/12 text-white/60 cursor-default hover:bg-white/12 hover:text-white/80 transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: p.dot }} />
                    {p.name}
                  </span>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom hairline */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/8 pointer-events-none" />
      </section>

      {/* ═══ LOGO STRIP ══════════════════════════════════════════ */}
      <div className="bg-[#06040c] border-b border-white/6 py-5 overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
             style={{ background: 'linear-gradient(to right, #06040c, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
             style={{ background: 'linear-gradient(to left, #06040c, transparent)' }} />

        <ul className="flex items-center gap-0 w-max marquee-track list-none m-0 p-0">
          {marquee.map((name, i) => (
            <li key={`${name}-${i}`}
                className="flex items-center px-10 border-r border-white/6 last:border-r-0">
              <span className="font-headline font-bold text-sm text-white/25 whitespace-nowrap hover:text-white/45 transition-opacity cursor-default">
                {name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
