'use client'

import { useEffect, useRef, useState } from 'react'

const GRAD_ID = 'brand-icon-grad'

const GradientIcon = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <defs>
      <linearGradient id={GRAD_ID} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="50%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#a78bfa" />
      </linearGradient>
    </defs>
    {children}
  </svg>
)

const GUARANTEES = [
  {
    icon: (
      <GradientIcon>
        <path stroke={`url(#${GRAD_ID})`} d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle stroke={`url(#${GRAD_ID})`} cx="12" cy="7" r="4" />
      </GradientIcon>
    ),
    title: 'Persoonlijk contact',
    desc: 'Geen chatbots of formulieren. Je spreekt direct met mij, en ik bouw samen met jou.',
    glow: 'rgba(249,115,22,0.12)',
    border: 'rgba(249,115,22,0.24)',
    iconColor: '#f97316',
    innerGlow: 'radial-gradient(ellipse at 10% 0%, rgba(249,115,22,0.22) 0%, transparent 65%)',
  },
  {
    icon: (
      <GradientIcon>
        <path stroke={`url(#${GRAD_ID})`} d="M12 2L2 7l10 5 10-5-10-5z" />
        <path stroke={`url(#${GRAD_ID})`} d="M2 17l10 5 10-5" />
        <path stroke={`url(#${GRAD_ID})`} d="M2 12l10 5 10-5" />
      </GradientIcon>
    ),
    title: 'Maatwerk altijd',
    desc: 'Geen templates, geen kant-en-klaar. Alles is speciaal voor jouw bedrijf ontworpen.',
    glow: 'rgba(236,72,153,0.10)',
    border: 'rgba(236,72,153,0.22)',
    iconColor: '#ec4899',
    innerGlow: 'radial-gradient(ellipse at 90% 0%, rgba(236,72,153,0.20) 0%, transparent 65%)',
  },
  {
    icon: (
      <GradientIcon>
        <polyline stroke={`url(#${GRAD_ID})`} points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline stroke={`url(#${GRAD_ID})`} points="16 7 22 7 22 13" />
      </GradientIcon>
    ),
    title: 'Resultaatgericht',
    desc: 'Niet alleen mooi design — het draait om groei, conversie en jouw doelen.',
    glow: 'rgba(167,139,250,0.10)',
    border: 'rgba(167,139,250,0.22)',
    iconColor: '#a78bfa',
    innerGlow: 'radial-gradient(ellipse at 10% 100%, rgba(167,139,250,0.22) 0%, transparent 65%)',
  },
  {
    icon: (
      <GradientIcon>
        <path stroke={`url(#${GRAD_ID})`} d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle stroke={`url(#${GRAD_ID})`} cx="9" cy="7" r="4" />
        <path stroke={`url(#${GRAD_ID})`} d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path stroke={`url(#${GRAD_ID})`} d="M16 3.13a4 4 0 0 1 0 7.75" />
      </GradientIcon>
    ),
    title: 'Langdurige relatie',
    desc: 'Na lancering ben je niet alleen. Ik help met optimalisatie, updates en groei.',
    glow: 'rgba(249,115,22,0.09)',
    border: 'rgba(249,115,22,0.20)',
    iconColor: '#f97316',
    innerGlow: 'radial-gradient(ellipse at 90% 100%, rgba(249,115,22,0.20) 0%, rgba(236,72,153,0.10) 40%, transparent 65%)',
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

export default function GuarantiesSection() {
  const header = useFadeIn(0.15)
  const cards = useFadeIn(0.12)

  return (
    <section className="relative overflow-hidden bg-[#f8f9fc] py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-slate-200" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-slate-200" />

      {/* Gradient color drops */}
      <div className="pointer-events-none absolute -top-20 left-[10%] h-72 w-72 rounded-full bg-orange-400/10 blur-[100px]" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-pink-400/8 blur-[110px]" />
      <div className="pointer-events-none absolute -bottom-20 right-[10%] h-72 w-72 rounded-full bg-violet-400/10 blur-[100px]" />

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
          <span className="overline-badge mb-4">Mijn belofte</span>
          <h2
            className="font-headline font-extrabold leading-[1.06] tracking-[-0.03em] text-slate-900"
            style={{ fontSize: 'clamp(1.7rem, 3vw, 2.8rem)' }}
          >
            Dit krijg je altijd van mij.
          </h2>
          <p className="mt-5 max-w-[48ch] text-[1rem] leading-relaxed text-slate-500">
            Geen standaardwerk, geen tussentijdse verdwijning, geen lege beloftes.
          </p>
        </div>

        {/* Cards */}
        <div ref={cards.ref} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {GUARANTEES.map((g, i) => (
            <GuaranteeCard key={i} g={g} index={i} visible={cards.visible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function GuaranteeCard({
  g, index, visible,
}: {
  g: (typeof GUARANTEES)[number]
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
        border: `1px solid ${hovered ? g.border : 'rgba(255,255,255,0.10)'}`,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: hovered
          ? `0 20px 56px rgba(0,0,0,0.40), 0 0 48px ${g.glow}`
          : `0 8px 32px rgba(0,0,0,0.22), 0 0 20px ${g.glow}`,
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.45s cubic-bezier(0.16,1,0.3,1)',
        opacity: visible ? 1 : 0,
        transitionDelay: visible ? `${index * 100}ms` : '0ms',
      }}
    >
      {/* Inner ambient glow — hero-stijl radial */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500"
        style={{
          background: g.innerGlow,
          opacity: hovered ? 1 : 0.6,
        }}
      />

      {/* Top gradient line */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl transition-opacity duration-500"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #f97316 30%, #ec4899 60%, #a78bfa 90%, transparent 100%)',
          opacity: hovered ? 0.9 : 0.35,
        }}
      />

      {/* Icon */}
      <div
        className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-400"
        style={{
          background: hovered ? g.glow : 'rgba(255,255,255,0.04)',
          border: `1px solid ${hovered ? g.border : 'rgba(255,255,255,0.08)'}`,
        }}
      >
        {g.icon}
      </div>

      {/* Title */}
      <p
        className="text-[1rem] font-semibold leading-snug tracking-[-0.01em] transition-colors duration-300"
        style={{ color: hovered ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.88)' }}
      >
        {g.title}
      </p>

      {/* Desc */}
      <p
        className="mt-2.5 text-[1rem] leading-relaxed transition-colors duration-300"
        style={{ color: hovered ? 'rgba(255,255,255,0.58)' : 'rgba(255,255,255,0.45)' }}
      >
        {g.desc}
      </p>
    </div>
  )
}
