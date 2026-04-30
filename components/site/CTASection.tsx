import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Mail, MessageCircle, Phone } from 'lucide-react'
import { siteConfig } from '@/config/site.config'
import Reveal from '@/components/ui/Reveal'
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
  subheading = 'Stuur gerust een bericht. Dan kijk ik vrijblijvend met je mee naar wat past bij je bedrijf, je planning en de volgende logische stap.',
  ctaLabel = 'Plan vrijblijvend een kennismaking',
  ctaHref = siteConfig.cta.ctaHref,
  secondaryLabel = 'Stuur een bericht via WhatsApp',
  secondaryHref = createWhatsAppHref(siteConfig.phone, 'Hoi Daan, ik wil graag even vrijblijvend sparren over mijn website of digitale systeem.'),
  className = '',
}: CTASectionProps) {
  return (
    <section className={`px-6 py-12 lg:px-8 ${className}`}>
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

            <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-8 md:px-10 md:py-10">
              <div className="max-w-2xl p-6 sm:p-8">
                <span className="overline-badge overline-badge-dark mb-6">
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
                    className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-slate-900 shadow-sm transition-colors duration-150 hover:bg-white/90"
                  >
                    {ctaLabel}
                    <ArrowRight size={14} />
                  </Link>
                  <a
                    href={secondaryHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-black/25 px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-black/35 hover:border-white/22"
                  >
                    <MessageCircle size={14} />
                    <span>{secondaryLabel}</span>
                  </a>
                </div>

                <div className="flex flex-wrap gap-5 border-t border-white/8 pt-6">
                  <a
                    href={createWhatsAppHref(siteConfig.phone, 'Hoi Daan, ik heb een vraag over mijn website of digitale systeem.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-white/35 transition-colors hover:text-white/70"
                  >
                    <MessageCircle size={12} />
                    WhatsApp
                  </a>
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
                  <span className="text-xs text-white/20">Telefonisch, online, via WhatsApp of bij jou op locatie.</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
