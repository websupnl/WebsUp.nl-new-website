import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MessageCircle, Zap, MessageSquare, Check } from 'lucide-react'
import { siteConfig } from '@/config/site.config'
import Reveal from '@/components/ui/Reveal'
import { GlassCard } from '@/components/site/GlassCard'
import { createWhatsAppHref } from '@/lib/utils'

interface CTASectionProps {
  heading?: string
  subheading?: string
  ctaLabel?: string
  ctaHref?: string
  secondaryLabel?: string
  secondaryHref?: string
  className?: string
}

export default function CTASection({
  heading = 'Wil je even sparren over wat slim is voor je website of digitale systeem?',
  subheading = 'Stuur gerust een bericht. Dan kijk ik vrijblijvend met je mee naar wat past bij je bedrijf, je planning en de volgende logische stap. Telefonisch, online of gewoon bij jou op locatie.',
  ctaLabel = 'Plan vrijblijvend een kennismaking',
  ctaHref = siteConfig.cta.ctaHref,
  secondaryLabel = 'WhatsApp',
  secondaryHref = createWhatsAppHref(siteConfig.phone, 'Hoi, ik wil graag even vrijblijvend sparren over mijn website of digitale systeem.'),
  className = '',
}: CTASectionProps) {
  return (
    <section className={`px-6 py-12 lg:px-8 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-[#06040c]">
            {/* Background hero wave */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="hero-wave-bg absolute inset-[-8%]">
                <Image
                  src="/hero-bg.png"
                  alt=""
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  quality={80}
                />
              </div>
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(110deg, rgba(6,4,12,0.88) 0%, rgba(6,4,12,0.75) 45%, rgba(6,4,12,0.55) 75%, rgba(6,4,12,0.40) 100%)',
                }}
              />
            </div>

            {/* Content */}
            <div className="relative z-10 grid gap-10 px-6 py-10 md:px-12 md:py-14 lg:grid-cols-5 lg:gap-12 lg:items-center">
              {/* Left — 60% */}
              <div className="lg:col-span-3">
                <span className="overline-badge overline-badge-dark mb-6">
                  Vrijblijvend kennismaken
                </span>
                <h2
                  className="mb-5 font-headline text-white"
                  style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.025em' }}
                >
                  {heading}
                </h2>
                <p className="mb-8 text-base leading-relaxed text-white/65 md:text-lg max-w-xl">
                  {subheading}
                </p>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href={ctaHref}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-slate-900 shadow-sm transition-colors duration-150 hover:bg-white/90"
                  >
                    {ctaLabel}
                    <ArrowRight size={14} />
                  </Link>
                  <a
                    href={secondaryHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-colors duration-150 hover:bg-white/10 hover:border-white/22"
                  >
                    <MessageCircle size={14} />
                    {secondaryLabel}
                  </a>
                </div>
              </div>

              {/* Right — 40% — drie GlassCards */}
              <div className="lg:col-span-2 space-y-3">
                <GlassCard padding="px-5 py-4" className="flex items-center gap-3">
                  <Zap size={18} className="text-orange-400 flex-shrink-0" />
                  <span className="text-sm text-white/85 font-medium">Binnen 1 werkdag reactietijd</span>
                </GlassCard>
                <GlassCard padding="px-5 py-4" className="flex items-center gap-3">
                  <MessageSquare size={18} className="text-orange-400 flex-shrink-0" />
                  <span className="text-sm text-white/85 font-medium">Vrijblijvend sparren — geen verplichtingen</span>
                </GlassCard>
                <GlassCard padding="px-5 py-4" className="flex items-center gap-3">
                  <Check size={18} className="text-orange-400 flex-shrink-0" />
                  <span className="text-sm text-white/85 font-medium">Eerlijk advies — altijd transparant</span>
                </GlassCard>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
