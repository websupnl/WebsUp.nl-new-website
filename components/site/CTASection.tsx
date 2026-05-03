import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import GrainOverlay from '@/components/ui/GrainOverlay'
import { finalTrustItems } from '@/lib/homepage-content'

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
  subheading = 'Stuur gerust een bericht. Dan kijk ik met je mee naar je idee, huidige website of proces. Vaak wordt in een gesprek al duidelijk wat de slimste volgende stap is.',
  ctaLabel = 'Gratis ontwerp aanvragen',
  ctaHref = '/gratis-ontwerp',
  secondaryLabel = 'Kennismaking plannen',
  secondaryHref = '/contact',
  className = '',
}: CTASectionProps) {
  return (
    <section className={`bg-white px-6 py-12 lg:px-8 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-[#06040c]">
            <div className="absolute inset-0 overflow-hidden">
              <div className="hero-wave-bg absolute inset-[-8%]">
                <Image
                  src="/hero-bg.png"
                  alt=""
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  quality={82}
                />
              </div>
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(110deg, rgba(6,4,12,0.90) 0%, rgba(6,4,12,0.82) 48%, rgba(6,4,12,0.58) 100%)',
                }}
              />
            </div>
            <GrainOverlay opacity={0.04} />

            <div className="relative z-10 grid gap-10 px-6 py-10 md:px-12 md:py-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <span className="overline-badge overline-badge-dark mb-6">
                  Vrijblijvend kennismaken
                </span>
                <h2
                  className="max-w-3xl font-headline font-extrabold leading-[1.08] tracking-[-0.03em] text-white"
                  style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)' }}
                >
                  {heading}
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/64 md:text-lg">
                  {subheading}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href={ctaHref} className="btn-brand-gradient">
                    {ctaLabel}
                    <ArrowRight size={14} />
                  </Link>
                  <Link
                    href={secondaryHref}
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/8 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/14"
                  >
                    {secondaryLabel}
                  </Link>
                </div>
              </div>

              <div className="grid gap-3">
                {finalTrustItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.045] px-5 py-4 backdrop-blur-sm">
                      <Icon size={18} className="shrink-0 text-white/62" />
                      <span className="text-sm font-medium text-white/84">{item.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
