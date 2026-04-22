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
  heading = 'Wil je weten wat slim is voor jouw website of digitale systeem?',
  subheading = 'Plan een gratis kennismaking. Geen verkooppraatje, maar een concreet gesprek over je bedrijf, je huidige situatie en wat de beste volgende stap is.',
  ctaLabel = 'Plan een kennismaking',
  ctaHref = siteConfig.cta.ctaHref,
  secondaryLabel = 'Stuur een mail',
  secondaryHref = `mailto:${siteConfig.email}`,
  className = '',
}: CTASectionProps) {
  return (
    <section className={`px-6 py-20 lg:px-8 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="relative flex min-h-[340px] items-center overflow-hidden rounded-[2rem] bg-[#06040c]">
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
                    'linear-gradient(110deg, rgba(6,4,12,0.88) 0%, rgba(6,4,12,0.75) 40%, rgba(6,4,12,0.4) 65%, rgba(6,4,12,0.15) 100%)',
                }}
              />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-7xl px-10 py-16 md:px-16">
              <div className="max-w-xl">
                <span
                  className="mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.08em]"
                  style={{
                    background: 'rgba(249,115,22,0.10)',
                    borderColor: 'rgba(236,72,153,0.25)',
                    color: '#f97316',
                  }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: 'linear-gradient(135deg,#f97316,#ec4899)' }}
                  />
                  Klaar voor de volgende stap?
                </span>

                <h2
                  className="mb-5 font-headline text-white"
                  style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.025em' }}
                >
                  {heading}
                </h2>
                <p className="mb-3 text-base leading-relaxed text-white/55 md:text-lg">{subheading}</p>
                <p className="mb-8 text-sm text-white/40">Telefonisch, online of gewoon bij jou op locatie.</p>

                <div className="mb-8 flex flex-wrap gap-3">
                  <Link
                    href={ctaHref}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-slate-900 shadow-lg transition-all duration-150 hover:-translate-y-px hover:bg-white/90"
                  >
                    {ctaLabel}
                    <ArrowRight size={14} />
                  </Link>
                  <a
                    href={secondaryHref}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-150 hover:-translate-y-px hover:border-white/30 hover:bg-white/15"
                  >
                    <Mail size={14} />
                    {secondaryLabel}
                  </a>
                </div>

                <div className="flex flex-wrap gap-5 border-t border-white/8 pt-6">
                  <a
                    href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-1.5 text-xs text-white/35 transition-colors hover:text-white/70"
                  >
                    <Phone size={12} />
                    {siteConfig.phone}
                  </a>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex items-center gap-1.5 text-xs text-white/35 transition-colors hover:text-white/70"
                  >
                    <Mail size={12} />
                    {siteConfig.email}
                  </a>
                  <span className="text-xs text-white/20">Friesland, Nederland</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
