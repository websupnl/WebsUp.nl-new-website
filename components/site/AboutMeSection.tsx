'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { fallbackReviews, personalContactPoints } from '@/lib/homepage-content'

const featuredQuote = fallbackReviews[0]

function TypewriterChip({ text, delay }: { text: string; delay: number }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone]           = useState(false)
  const ref    = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const timer  = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!inView) return
    let i = 0
    const start = () => {
      timer.current = setTimeout(() => {
        const type = () => {
          i++
          setDisplayed(text.slice(0, i))
          if (i < text.length) timer.current = setTimeout(type, 38 + Math.random() * 18)
          else setDone(true)
        }
        type()
      }, delay)
    }
    start()
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [inView, text, delay])

  return (
    <span
      ref={ref}
      className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[1rem] font-medium text-slate-700"
      style={{
        background: done ? 'rgba(249,115,22,0.07)' : 'rgba(249,115,22,0.04)',
        border: `1px solid ${done ? 'rgba(249,115,22,0.28)' : 'rgba(249,115,22,0.14)'}`,
        transition: 'border-color 0.4s ease, background 0.4s ease',
        minWidth: '4rem',
      }}
    >
      {displayed}
      {!done && (
        <span
          className="inline-block w-[1.5px] rounded-[1px]"
          style={{
            height: '0.85em',
            background: 'linear-gradient(180deg, #f97316 0%, #ec4899 100%)',
            animation: 'blink 0.9s step-end infinite',
          }}
        />
      )}
    </span>
  )
}

export default function AboutMeSection() {
  const sectionRef  = useRef<HTMLDivElement>(null)
  const photoRef    = useRef<HTMLDivElement>(null)
  const contentInView = useInView(sectionRef, { once: true, margin: '-60px' })

  // Scroll parallax for photo
  const { scrollYProgress } = useScroll({ target: photoRef, offset: ['start end', 'end start'] })
  const photoY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="pointer-events-none absolute -top-20 right-[15%] h-72 w-72 rounded-full bg-pink-400/8 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-[5%] h-64 w-64 rounded-full bg-orange-400/8 blur-[90px]" />

      <div ref={sectionRef} className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-18">

          {/* Photo — parallax + subtle tilt */}
          <motion.div
            ref={photoRef}
            initial={{ opacity: 0, y: 24 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="relative mx-auto max-w-[28rem]"
              style={{ y: photoY }}
            >
              <div
                className="pointer-events-none absolute -inset-6 rounded-[3rem] opacity-50 blur-3xl"
                style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(249,115,22,0.16), rgba(236,72,153,0.08) 50%, transparent 72%)' }}
              />
              <div
                className="relative overflow-hidden rounded-[2rem] shadow-[0_32px_80px_rgba(0,0,0,0.14)]"
                style={{ border: '1px solid rgba(0,0,0,0.08)' }}
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <Image
                  src="/Daan Koolhaas.jpg"
                  alt="Daan Koolhaas — WebsUp.nl"
                  width={640}
                  height={800}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#06040c]/95 via-[#06040c]/55 to-transparent px-6 pb-7 pt-24">
                  <p className="text-[0.74rem] font-bold uppercase tracking-[0.18em] text-orange-300/78">WebsUp.nl</p>
                  <p className="mt-2 text-[1.35rem] font-extrabold leading-tight tracking-[-0.02em] text-white">Daan Koolhaas</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[0.94rem] font-medium text-white/68">Design</span>
                    <span className="h-[3px] w-[3px] rounded-full bg-white/25" />
                    <span className="text-[0.94rem] font-medium text-white/68">Strategie</span>
                    <span className="h-[3px] w-[3px] rounded-full bg-white/25" />
                    <span className="text-[0.94rem] font-medium text-white/68">Techniek</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
          >
            <span className="overline-badge mb-5 inline-flex">Wie zit er achter WebsUp</span>
            <h2
              className="max-w-2xl font-headline font-extrabold leading-[1.04] tracking-[-0.04em] text-slate-900"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.6rem)' }}
            >
              Geen bureau.{' '}
              <span style={{ backgroundImage: 'linear-gradient(135deg, #f97316 0%, #ec4899 50%, #a78bfa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Direct met Daan.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              Bij WebsUp werk je direct met mij. Geen accountmanager, geen lagen en geen onnodige ruis. Je legt je idee uit aan degene die ook met je meedenkt en het voor je bouwt.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-500">
              Ik denk niet alleen mee over hoe iets eruit moet zien, maar vooral over wat praktisch werkt voor jouw bedrijf. Soms is dat een website. Soms een webshop. En soms juist een maatwerk systeem.
            </p>

            {/* Typewriter chips */}
            <div className="mt-8 flex flex-wrap gap-2.5">
              {personalContactPoints.map((point, i) => (
                <TypewriterChip key={point} text={point} delay={i * 120} />
              ))}
            </div>

            {featuredQuote && (
              <motion.div
                className="relative mt-7 overflow-hidden rounded-2xl p-5"
                initial={{ opacity: 0, y: 12 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
                style={{ background: 'rgba(12,10,22,0.88)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)', boxShadow: '0 8px 32px rgba(0,0,0,0.14)' }}
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px"
                  style={{ background: 'linear-gradient(90deg, transparent, #f97316, #ec4899, transparent)', opacity: 0.4 }} />
                <div className="mb-3 h-0.5 w-8 rounded-full" style={{ background: 'linear-gradient(90deg, #f97316, #ec4899)' }} />
                <p className="text-[1rem] italic leading-relaxed text-white/80">
                  &ldquo;{featuredQuote.content}&rdquo;
                </p>
                <footer className="mt-3 text-[0.9375rem] font-semibold text-white/55">
                  {featuredQuote.name} &middot; {featuredQuote.role}
                </footer>
              </motion.div>
            )}

            <div className="mt-8">
              <Link href="/over-ons" className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800">
                Meer over Daan
                <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
      `}</style>
    </section>
  )
}
