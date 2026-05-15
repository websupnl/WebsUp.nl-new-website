'use client'

import { CheckCircle2, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const COMPARISONS = [
  {
    feature: 'Persoonlijke begeleiding',
    templates: false,
    websup: true,
    impact: 'Direct contact, minder miscommunicatie',
  },
  {
    feature: 'Op maat gebouwd',
    templates: false,
    websup: true,
    impact: 'Geen "bloat", puur wat je nodig hebt',
  },
  {
    feature: 'Converteren is prioriteit',
    templates: false,
    websup: true,
    impact: 'Niet alleen mooi, maar resultaatgericht',
  },
  {
    feature: 'Integraties & automatie',
    templates: false,
    websup: true,
    impact: 'Systemen die samenwerken, minder handwerk',
  },
  {
    feature: 'Langdurige support',
    templates: false,
    websup: true,
    impact: 'Na lancering niet alleen, optimalisatie & groei',
  },
  {
    feature: 'SEO-klaar',
    templates: true,
    websup: true,
    impact: 'Maar bij mij: geoptimaliseerd voor jouw niche',
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

export default function ComparisonSection() {
  const header = useFadeIn(0.12)

  return (
    <section
      className="relative overflow-hidden py-24 lg:py-32"
      style={{
        backgroundColor: '#06040c',
        backgroundImage: 'url("/hero-bg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'rgba(6,4,12,0.82)' }}
      />

      {/* Ambient brand blobs */}
      <div className="pointer-events-none absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-violet-600/20 blur-[100px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/3 h-80 w-80 rounded-full bg-pink-600/15 blur-[100px]" />

      <div className="relative mx-auto max-w-5xl px-6 lg:px-8">

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
          <span
            className="overline-badge mb-4"
            style={{
              background: 'rgba(167,139,250,0.12)',
              color: 'rgba(167,139,250,0.90)',
              border: '1px solid rgba(167,139,250,0.28)',
              backdropFilter: 'none',
              boxShadow: 'none',
            }}
          >De verschillen</span>
          <h2
            className="font-headline font-extrabold leading-[1.06] tracking-[-0.03em] text-white"
            style={{ fontSize: 'clamp(1.7rem, 3vw, 2.8rem)' }}
          >
            Template sites vs. maatwerk
          </h2>
          <p className="mt-5 max-w-[52ch] text-[0.95rem] leading-relaxed text-white/60">
            Het verschil zit in resultaten, groei en hoe jouw bedrijf zich ontwikkelt.
          </p>
        </div>

        {/* ── App mockup window ───────────────────────────── */}
        <div
          className="overflow-hidden rounded-2xl"
          style={{
            opacity: header.visible ? 1 : 0,
            transform: header.visible ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.9s ease 0.1s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s',
            background: 'rgba(10,8,20,0.72)',
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            border: '1px solid rgba(255,255,255,0.09)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.28), 0 0 0 0.5px rgba(255,255,255,0.04) inset, 0 1px 0 rgba(255,255,255,0.08) inset',
          }}
        >
          {/* Window chrome bar */}
          <div
            className="flex items-center gap-3 px-5 py-3.5"
            style={{
              background: 'rgba(255,255,255,0.04)',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            {/* Traffic light dots */}
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <span className="h-3 w-3 rounded-full bg-green-500/80" />

            {/* Fake URL bar */}
            <div
              className="mx-3 flex flex-1 items-center gap-2 rounded-md px-3 py-1.5"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <span className="h-2 w-2 rounded-full bg-green-400/60 flex-shrink-0" />
              <span className="text-[0.65rem] text-white/35 font-mono tracking-wide">websup.nl/vergelijking</span>
            </div>
          </div>

          {/* Column headers */}
          <div
            className="grid grid-cols-3 border-b"
            style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)' }}
          >
            <div className="px-6 py-4 lg:px-8" />
            <div className="px-6 py-4 lg:px-8" style={{ borderRight: '1px solid rgba(255,255,255,0.07)' }}>
              <p className="text-[0.78rem] font-semibold uppercase tracking-widest text-white/35">Template builder</p>
            </div>
            <div className="px-6 py-4 lg:px-8">
              <p
                className="text-[0.78rem] font-semibold uppercase tracking-widest"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #f97316 0%, #ec4899 50%, #a78bfa 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                WebsUp maatwerk
              </p>
            </div>
          </div>

          {/* Rows */}
          <div style={{ background: 'transparent' }}>
            {COMPARISONS.map((comp, idx) => (
              <div
                key={idx}
                className="grid grid-cols-3 transition-colors duration-200"
                style={{
                  borderBottom: idx < COMPARISONS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  opacity: header.visible ? 1 : 0,
                  transform: header.visible ? 'translateY(0)' : 'translateY(8px)',
                  transition: `opacity 0.5s ease ${100 + idx * 60}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${100 + idx * 60}ms`,
                }}
              >
                {/* Feature */}
                <div className="px-6 py-4 lg:px-8">
                  <p className="text-[0.9rem] font-medium text-white/90">{comp.feature}</p>
                  <p className="mt-0.5 text-[0.75rem] text-white/40">{comp.impact}</p>
                </div>

                {/* Template */}
                <div
                  className="flex items-center justify-center px-6 py-4 lg:px-8"
                  style={{ borderRight: '1px solid rgba(255,255,255,0.05)' }}
                >
                  {comp.templates ? (
                    <CheckCircle2 size={18} className="text-white/30" />
                  ) : (
                    <X size={18} strokeWidth={2} className="text-white/18" />
                  )}
                </div>

                {/* WebsUp — brand highlight */}
                <div
                  className="flex items-center justify-center px-6 py-4 lg:px-8"
                  style={{
                    background: comp.websup ? 'rgba(167,139,250,0.06)' : 'transparent',
                    borderLeft: comp.websup ? '1px solid rgba(236,72,153,0.18)' : '1px solid transparent',
                  }}
                >
                  {comp.websup ? (
                    <CheckCircle2 size={18} style={{ color: '#a78bfa' }} />
                  ) : (
                    <X size={18} strokeWidth={2} className="text-white/20" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Window status bar */}
          <div
            className="flex items-center justify-between px-6 py-2.5"
            style={{ background: 'rgba(255,255,255,0.03)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <span className="text-[0.6rem] font-mono text-white/22">vergelijking.tsx</span>
            <div className="flex items-center gap-3">
              <span className="text-[0.6rem] text-white/22 font-mono">6 items</span>
              <span
                className="text-[0.6rem] font-semibold"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #f97316 0%, #ec4899 50%, #a78bfa 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                WebsUp ✓
              </span>
            </div>
          </div>
        </div>

        {/* Pro tip */}
        <div
          className="mt-8 rounded-xl px-6 py-4"
          style={{
            border: '1px solid rgba(167,139,250,0.22)',
            background: 'rgba(167,139,250,0.08)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            opacity: header.visible ? 1 : 0,
            transition: 'opacity 0.8s ease 0.5s',
          }}
        >
          <p className="text-center text-[0.875rem] text-white/75">
            <span
              className="font-semibold"
              style={{
                backgroundImage: 'linear-gradient(135deg, #ec4899, #a78bfa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >Pro tip:</span> De meeste bedrijven die ik help zagen 30–50% meer leads/conversies na 3 maanden. Niet omdat het mooier is — maar omdat alles om jouw groei draait.
          </p>
        </div>
      </div>
    </section>
  )
}
