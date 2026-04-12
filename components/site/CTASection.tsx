import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Mail, Phone } from 'lucide-react'
import { siteConfig } from '@/config/site.config'
import Reveal from '@/components/ui/Reveal'

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
  heading = siteConfig.cta.heading,
  subheading = siteConfig.cta.subheading,
  ctaLabel = siteConfig.cta.ctaLabel,
  ctaHref = siteConfig.cta.ctaHref,
  secondaryLabel = 'Stuur een mail',
  secondaryHref = `mailto:${siteConfig.email}`,
  className = '',
}: CTASectionProps) {
  return (
    <section className={`py-20 px-6 lg:px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-[#06040c] min-h-[340px] flex items-center">

            {/* Wave background — dezelfde als hero/page headers */}
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
              {/* Gradient: links open voor wave, rechts donkerder voor tekst leesbaarheid */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(110deg, rgba(6,4,12,0.88) 0%, rgba(6,4,12,0.75) 40%, rgba(6,4,12,0.40) 65%, rgba(6,4,12,0.15) 100%)',
                }}
              />
            </div>

            {/* Content — links uitgelijnd */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-10 md:px-16 py-16">
              <div className="max-w-xl w-full">
                {/* Overline */}
                <span
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[0.68rem] font-bold uppercase tracking-[0.08em] mb-6 border"
                  style={{
                    background: 'rgba(249,115,22,0.10)',
                    borderColor: 'rgba(236,72,153,0.25)',
                    color: '#f97316',
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg,#f97316,#ec4899)' }}
                  />
                  Klaar voor de volgende stap?
                </span>

                <h2
                  className="font-headline font-extrabold text-white tracking-[-0.025em] leading-[1.08] mb-5"
                  style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
                >
                  {heading}
                </h2>
                <p className="text-white/55 text-base md:text-lg leading-relaxed mb-8">
                  {subheading}
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                  <Link
                    href={ctaHref}
                    className="inline-flex items-center gap-2 bg-white text-slate-900 font-semibold text-sm px-7 py-3.5 rounded-full hover:-translate-y-px hover:bg-white/90 transition-all duration-150 shadow-lg"
                  >
                    {ctaLabel}
                    <ArrowRight size={14} />
                  </Link>
                  <a
                    href={secondaryHref}
                    className="inline-flex items-center gap-2 bg-white/10 text-white font-semibold text-sm px-6 py-3.5 rounded-full border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-150 hover:-translate-y-px"
                  >
                    <Mail size={14} />
                    {secondaryLabel}
                  </a>
                </div>

                {/* Contact mini */}
                <div className="flex flex-wrap gap-5 pt-6 border-t border-white/8">
                  <a
                    href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-1.5 text-white/35 hover:text-white/70 text-xs transition-colors"
                  >
                    <Phone size={12} />
                    {siteConfig.phone}
                  </a>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex items-center gap-1.5 text-white/35 hover:text-white/70 text-xs transition-colors"
                  >
                    <Mail size={12} />
                    {siteConfig.email}
                  </a>
                  <span className="text-white/20 text-xs">Friesland, Nederland</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
