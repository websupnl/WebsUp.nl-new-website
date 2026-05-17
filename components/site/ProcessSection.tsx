'use client'

import { useEffect, useRef, useState } from 'react'
import { siteConfig } from '@/config/site.config'

interface ProcessSectionProps {
  data?: typeof siteConfig.process
}

function useFadeIn(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

const STEP_ACCENTS = [
  {
    glow: 'rgba(249,115,22,0.12)',
    border: 'rgba(249,115,22,0.30)',
    innerGlow: 'radial-gradient(ellipse at 10% 0%, rgba(249,115,22,0.20) 0%, transparent 65%)',
  },
  {
    glow: 'rgba(236,72,153,0.10)',
    border: 'rgba(236,72,153,0.28)',
    innerGlow: 'radial-gradient(ellipse at 90% 0%, rgba(236,72,153,0.20) 0%, transparent 65%)',
  },
  {
    glow: 'rgba(167,139,250,0.10)',
    border: 'rgba(167,139,250,0.26)',
    innerGlow: 'radial-gradient(ellipse at 10% 100%, rgba(167,139,250,0.22) 0%, transparent 65%)',
  },
  {
    glow: 'rgba(249,115,22,0.09)',
    border: 'rgba(249,115,22,0.24)',
    innerGlow: 'radial-gradient(ellipse at 90% 100%, rgba(249,115,22,0.18) 0%, rgba(236,72,153,0.10) 40%, transparent 65%)',
  },
]

function StepCard({
  step,
  index,
  visible,
}: {
  step: { number: string | number; title: string; description: string }
  index: number
  visible: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const accent = STEP_ACCENTS[index % STEP_ACCENTS.length]

  return (
    <div
      className="group relative flex flex-col items-center text-center rounded-2xl p-6 pt-8"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'rgba(12,10,22,0.90)',
        border: `1px solid ${hovered ? accent.border : 'rgba(255,255,255,0.10)'}`,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: hovered
          ? `0 20px 56px rgba(0,0,0,0.40), 0 0 48px ${accent.glow}`
          : `0 8px 32px rgba(0,0,0,0.22), 0 0 20px ${accent.glow}`,
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.45s cubic-bezier(0.16,1,0.3,1)',
        opacity: visible ? 1 : 0,
        transitionDelay: visible ? `${index * 110}ms` : '0ms',
      }}
    >
      {/* Inner ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500"
        style={{
          background: accent.innerGlow,
          opacity: hovered ? 1 : 0.6,
        }}
      />

      {/* Top gradient line */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl transition-opacity duration-500"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, #f97316 30%, #ec4899 60%, #a78bfa 90%, transparent 100%)',
          opacity: hovered ? 0.9 : 0.35,
        }}
      />

      {/* Step number — brand gradient text */}
      <div className="relative mb-5">
        <span
          className="block text-5xl font-extrabold leading-none tracking-tight select-none"
          style={{
            background: 'linear-gradient(135deg, #f97316 0%, #ec4899 50%, #a78bfa 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {String(step.number).padStart(2, '0')}
        </span>
      </div>

      {/* Title */}
      <p
        className="text-[1rem] font-semibold leading-snug tracking-[-0.01em] transition-colors duration-300 mb-2.5"
        style={{ color: hovered ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.88)' }}
      >
        {step.title}
      </p>

      {/* Description */}
      <p
        className="text-[0.9375rem] leading-relaxed transition-colors duration-300"
        style={{ color: hovered ? 'rgba(255,255,255,0.58)' : 'rgba(255,255,255,0.45)' }}
      >
        {step.description}
      </p>
    </div>
  )
}

export default function ProcessSection({ data = siteConfig.process }: ProcessSectionProps) {
  const header = useFadeIn(0.15)
  const cards = useFadeIn(0.12)

  return (
    <section className="relative overflow-hidden bg-[#f8f9fc] py-24 lg:py-32">
      {/* Section borders */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-slate-200" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-slate-200" />

      {/* Gradient blur orbs */}
      <div className="pointer-events-none absolute -top-20 left-[8%] h-72 w-72 rounded-full bg-orange-400/20 blur-[90px]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-400/15 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-20 right-[8%] h-72 w-72 rounded-full bg-violet-400/20 blur-[90px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div
          ref={header.ref}
          className="mb-14 flex flex-col items-center text-center"
          style={{
            opacity: header.visible ? 1 : 0,
            transform: header.visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <span className="overline-badge mb-4">Werkwijze</span>
          <h2
            className="font-headline font-extrabold leading-[1.06] tracking-[-0.03em] text-slate-900"
            style={{ fontSize: 'clamp(1.7rem, 3vw, 2.8rem)' }}
          >
            {data.heading}
          </h2>
          <p className="mt-5 max-w-[48ch] text-[1rem] leading-relaxed text-slate-500">
            {data.subheading}
          </p>
        </div>

        {/* Step cards grid */}
        <div
          ref={cards.ref}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        >
          {data.steps.map((step, index) => (
            <StepCard key={step.number} step={step} index={index} visible={cards.visible} />
          ))}
        </div>
      </div>
    </section>
  )
}
