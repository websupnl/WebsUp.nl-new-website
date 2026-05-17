'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Reveal from '@/components/ui/Reveal'
import GrainOverlay from '@/components/ui/GrainOverlay'
import { finalTrustItems } from '@/lib/homepage-content'

function TypewriterText({
  text,
  className,
  style,
}: {
  text: string
  className?: string
  style?: React.CSSProperties
}) {
  const ref         = useRef<HTMLSpanElement>(null)
  const inView      = useInView(ref, { once: true, margin: '-80px' })
  const [displayed, setDisplayed] = useState(0)
  const [showCursor, setShowCursor] = useState(false)
  const hasAnimated = useRef(false)

  const reducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  useEffect(() => {
    if (!inView || hasAnimated.current) return
    hasAnimated.current = true

    if (reducedMotion) {
      setDisplayed(text.length)
      return
    }

    setDisplayed(0)
    setShowCursor(true)

    let i = 0
    const TYPE_MS = 55

    const typeNext = () => {
      i += 1
      setDisplayed(i)
      if (i < text.length) {
        setTimeout(typeNext, TYPE_MS)
      } else {
        // Typing done — blink cursor a few more times, then fade out
        setTimeout(() => setShowCursor(false), 2000)
      }
    }

    setTimeout(typeNext, TYPE_MS)
  }, [inView, text, reducedMotion])

  return (
    <span ref={ref} className={className} style={style}>
      {text.slice(0, displayed)}
      <motion.span
        animate={{ opacity: showCursor ? [1, 0, 1] : 0 }}
        transition={
          showCursor
            ? { duration: 1.1, repeat: Infinity, ease: 'linear' }
            : { duration: 0.3 }
        }
        style={{ color: 'rgba(249,115,22,0.9)', marginLeft: '1px' }}
        aria-hidden
      >
        |
      </motion.span>
    </span>
  )
}

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
  heading       = 'Zullen we sparren?',
  subheading    = 'Stuur gerust een bericht. Dan kijk ik met je mee naar je idee, huidige website of proces. Vaak wordt in een gesprek al duidelijk wat de slimste volgende stap is.',
  ctaLabel      = 'Gratis ontwerp aanvragen',
  ctaHref       = '/gratis-ontwerp',
  secondaryLabel = 'Kennismaking plannen',
  secondaryHref  = '/contact',
  className      = '',
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
                  className="max-w-3xl text-balance font-headline font-extrabold leading-[1.04] tracking-[-0.03em] text-white"
                  style={{ fontSize: 'clamp(1.85rem, 3.1vw, 2.9rem)' }}
                >
                  <TypewriterText text={heading} />
                </h2>
                <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-white/75 md:text-lg">
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
                    <div key={item.label} className="flex items-center gap-3 border-l border-white/14 bg-white/[0.025] px-5 py-4 backdrop-blur-sm transition-colors hover:border-orange-400/60 hover:bg-white/[0.045]">
                      <Icon size={18} className="shrink-0 text-white/75" />
                      <span className="text-sm font-medium text-white/90">{item.label}</span>
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
