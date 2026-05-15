'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const DIAGNOSES = [
  {
    n: '01',
    title: 'Bezoekers begrijpen niet direct wat je doet',
    body: 'Meteen duidelijk wat je aanbiedt, voor wie en waarom jij de juiste keuze bent.',
    glow: 'rgba(249,115,22,0.12)',
    border: 'rgba(249,115,22,0.22)',
  },
  {
    n: '02',
    title: 'Geen duidelijke volgende stap',
    body: 'Een sterke website stuurt bezoekers subtiel richting actie en contact.',
    glow: 'rgba(236,72,153,0.10)',
    border: 'rgba(236,72,153,0.20)',
  },
  {
    n: '03',
    title: 'De uitstraling wekt geen vertrouwen',
    body: 'Design draait niet alleen om mooi zijn, maar om vertrouwen, rust en herkenbaarheid.',
    glow: 'rgba(167,139,250,0.09)',
    border: 'rgba(167,139,250,0.20)',
  },
]

function useFadeIn(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

export default function ProblemSection() {
  const left = useFadeIn(0.15)
  const right = useFadeIn(0.12)

  return (
    <section className="relative overflow-hidden bg-[#f8f9fc] py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-slate-200" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-slate-200" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:items-start lg:gap-20">

          {/* ── LEFT ─────────────────────────────────────────────── */}
          <div
            ref={left.ref}
            className="lg:sticky lg:top-32"
            style={{
              opacity: left.visible ? 1 : 0,
              transform: left.visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            <span className="overline-badge mb-6 inline-flex">
              Herkenbaar?
            </span>

            <h2
              className="font-headline font-extrabold leading-[1.04] tracking-[-0.03em] text-slate-900"
              style={{ fontSize: 'clamp(1.7rem, 3vw, 2.8rem)' }}
            >
              Waarom veel websites
              <br />
              niet werken.
            </h2>

            <p className="mt-6 max-w-[38ch] text-[0.95rem] leading-[1.78] text-slate-600">
              Een website kan er goed uitzien en toch geen vertrouwen of actie oproepen. Dit zijn vaak de echte knelpunten.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/gratis-ontwerp" className="btn-brand-gradient gap-2.5">
                Gratis diagnose aanvragen
                <ArrowRight size={14} />
              </Link>
              <p className="text-[0.78rem] text-slate-400">
                Vrijblijvend — direct inzicht
              </p>
            </div>
          </div>

          {/* ── RIGHT ────────────────────────────────────────────── */}
          <div ref={right.ref} className="flex flex-col gap-4">
            {DIAGNOSES.map((d, i) => (
              <DiagnosisCard key={d.n} d={d} index={i} visible={right.visible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function DiagnosisCard({
  d,
  index,
  visible,
}: {
  d: (typeof DIAGNOSES)[number]
  index: number
  visible: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="group relative rounded-2xl p-6"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'rgba(12,10,22,0.90)',
        border: `1px solid ${hovered ? d.border : 'rgba(255,255,255,0.13)'}`,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: hovered
          ? `0 20px 56px rgba(0,0,0,0.40), 0 0 48px ${d.glow}`
          : `0 8px 32px rgba(0,0,0,0.25), 0 0 20px ${d.glow}`,
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
        opacity: visible ? 1 : 0,
        transitionDelay: visible ? `${index * 120}ms` : '0ms',
      }}
    >
      {/* Top glow line */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent 10%, ${d.border} 50%, transparent 90%)`,
          opacity: hovered ? 1 : 0.5,
        }}
      />

      <div className="flex items-start gap-5">
        {/* Number */}
        <span
          className="font-headline text-3xl font-extrabold leading-none tracking-[-0.04em] flex-shrink-0 transition-all duration-400"
          style={{
            backgroundImage: hovered
              ? 'linear-gradient(135deg, #f97316 0%, #ec4899 100%)'
              : 'linear-gradient(135deg, rgba(249,115,22,0.70) 0%, rgba(236,72,153,0.55) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {d.n}
        </span>

        <div className="flex-1">
          <p
            className="text-[1rem] font-semibold leading-snug tracking-[-0.01em] transition-colors duration-300"
            style={{ color: hovered ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.92)' }}
          >
            {d.title}
          </p>
          <p
            className="mt-2.5 text-[0.875rem] leading-relaxed transition-colors duration-300"
            style={{ color: hovered ? 'rgba(255,255,255,0.58)' : 'rgba(255,255,255,0.50)' }}
          >
            {d.body}
          </p>
        </div>
      </div>

      {/* Subtle analysis line on hover */}
      <div
        className="mt-4 overflow-hidden transition-all duration-500"
        style={{ maxHeight: hovered ? '24px' : '0px', opacity: hovered ? 1 : 0 }}
      >
        <div className="flex items-center gap-2">
          <div
            className="h-[1px] flex-1 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${d.border}, transparent)`,
              animation: hovered ? 'focus-pulse 2s ease-in-out infinite' : 'none',
            }}
          />
          <span className="text-[0.58rem] uppercase tracking-[0.18em]" style={{ color: 'rgba(255,255,255,0.20)' }}>
            herkenbaar
          </span>
        </div>
      </div>
    </div>
  )
}
