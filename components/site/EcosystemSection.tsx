'use client'

import { useEffect, useRef, useState } from 'react'

// ─── Icons ───────────────────────────────────────────────────────────────────

const IconWebsite = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <rect x="2" y="3" width="20" height="14" rx="2.5" />
    <path d="M8 21h8M12 17v4" />
    <path d="M6 7h1M9 7h6" strokeOpacity="0.5" />
    <path d="M6 10h12" strokeOpacity="0.3" />
    <path d="M6 13h8" strokeOpacity="0.3" />
  </svg>
)

const IconFlow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
)

const IconDashboard = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <path d="M14 14h7v7H14z" rx="1.5" strokeOpacity="0.4" />
    <path d="M17.5 17.5h.01" strokeWidth="2" strokeOpacity="0.6" />
  </svg>
)

const IconGrowth = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
)

// ─── Data ─────────────────────────────────────────────────────────────────────

const NODES = [
  {
    id: 'website',
    label: 'Website',
    subtitle: 'Converterende voorkant',
    icon: <IconWebsite />,
    support: ['Razendsnel', 'Mobielvriendelijk', 'Converterend design'],
    accent: 'rgba(249,115,22,1)',
    accentBg: 'rgba(249,115,22,0.08)',
    accentBorder: 'rgba(249,115,22,0.20)',
    delay: 0,
  },
  {
    id: 'auto',
    label: 'Automatisering',
    subtitle: 'Slimme achtergrondprocessen',
    icon: <IconFlow />,
    support: ['Minder handmatig werk', 'Meer overzicht', 'Systemen die samenwerken'],
    accent: 'rgba(236,72,153,1)',
    accentBg: 'rgba(236,72,153,0.07)',
    accentBorder: 'rgba(236,72,153,0.18)',
    delay: 200,
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    subtitle: 'Inzicht in realtime',
    icon: <IconDashboard />,
    support: ['Altijd overzicht', 'Slim rapporteren', 'Gefundeerde keuzes'],
    accent: 'rgba(139,92,246,1)',
    accentBg: 'rgba(139,92,246,0.07)',
    accentBorder: 'rgba(139,92,246,0.18)',
    delay: 400,
  },
  {
    id: 'groei',
    label: 'Groei',
    subtitle: 'Schaalbaar en toekomstbestendig',
    icon: <IconGrowth />,
    support: ['Meer leads', 'Betere conversie', 'Systemen die meegroeien'],
    accent: 'rgba(16,185,129,1)',
    accentBg: 'rgba(16,185,129,0.07)',
    accentBorder: 'rgba(16,185,129,0.18)',
    delay: 600,
  },
]

// ─── Component ────────────────────────────────────────────────────────────────

export default function EcosystemSection() {
  const [active, setActive]   = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); obs.disconnect() } },
      { threshold: 0.25 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#f8f9fc] py-24 lg:py-32">
      {/* Top divider */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-slate-200" />
      {/* Bottom divider */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-slate-200" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* Section label */}
        <div
          className="mb-16 flex flex-col items-center text-center transition-all duration-700"
          style={{ opacity: active ? 1 : 0, transform: active ? 'translateY(0)' : 'translateY(16px)', transitionDelay: '0ms' }}
        >
          <span className="overline-badge mb-4">
            Hoe het werkt
          </span>
          <h2
            className="font-headline font-extrabold leading-[1.06] tracking-[-0.03em] text-slate-900"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.6rem)' }}
          >
            Jouw digitale ecosysteem
          </h2>
          <p className="mt-4 max-w-[44ch] text-[1rem] leading-relaxed text-slate-600">
            Van eerste indruk tot schaalbare groei — systemen die samenwerken en versterken.
          </p>
        </div>

        {/* Nodes + connectors */}
        <div className="relative">

          {/* ── Desktop layout ─────────────────────────────── */}
          <div className="hidden lg:block">

            {/* Connector track */}
            <div className="absolute left-[12.5%] right-[12.5%] top-[52px] h-px">
              <div className="absolute inset-0 bg-slate-200" />
              <div
                className="absolute inset-y-[-1px]"
                style={{
                  width: '28%',
                  background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.5) 20%, rgba(236,72,153,0.4) 50%, rgba(139,92,246,0.3) 80%, transparent)',
                  animation: active ? 'ecosys-pulse 3.6s cubic-bezier(0.4,0,0.6,1) infinite' : 'none',
                  filter: 'blur(0.5px)',
                }}
              />
            </div>

            {/* Nodes grid */}
            <div className="grid grid-cols-4 gap-6">
              {NODES.map((node, i) => (
                <EcosystemNode
                  key={node.id}
                  node={node}
                  index={i}
                  active={active}
                  hovered={hovered}
                  onHover={setHovered}
                />
              ))}
            </div>
          </div>

          {/* ── Mobile layout ──────────────────────────────── */}
          <div className="flex flex-col gap-0 lg:hidden">
            {NODES.map((node, i) => (
              <div key={node.id} className="flex flex-col items-center">
                <EcosystemNode
                  node={node}
                  index={i}
                  active={active}
                  hovered={hovered}
                  onHover={setHovered}
                  mobile
                />
                {i < NODES.length - 1 && (
                  <div className="relative my-2 flex h-10 w-px flex-col items-center justify-center overflow-visible">
                    <div className="h-full w-px bg-slate-200" />
                    <div
                      className="absolute w-px"
                      style={{
                        top: '-10%',
                        height: '22%',
                        background: 'linear-gradient(180deg, transparent, rgba(249,115,22,0.5), transparent)',
                        animation: active ? `ecosys-pulse-v 3.6s cubic-bezier(0.4,0,0.6,1) ${i * 0.9}s infinite` : 'none',
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Node card ────────────────────────────────────────────────────────────────

interface NodeProps {
  node: (typeof NODES)[number]
  index: number
  active: boolean
  hovered: string | null
  onHover: (id: string | null) => void
  mobile?: boolean
}

function EcosystemNode({ node, index, active, hovered, onHover, mobile }: NodeProps) {
  const isHovered = hovered === node.id

  return (
    <div
      className="flex flex-col items-center"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.7s ease ${node.delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${node.delay}ms`,
      }}
    >
      {/* Card */}
      <button
        type="button"
        onMouseEnter={() => onHover(node.id)}
        onMouseLeave={() => onHover(null)}
        className={`group relative w-full max-w-[200px] cursor-default rounded-2xl p-5 text-left transition-all duration-500 ${
          mobile ? 'max-w-[280px]' : ''
        }`}
        style={{
          background: isHovered ? '#ffffff' : '#ffffff',
          border: `1px solid ${isHovered ? node.accentBorder : 'rgba(15,23,42,0.10)'}`,
          boxShadow: isHovered
            ? `0 12px 40px rgba(0,0,0,0.10), 0 0 0 1px ${node.accentBorder}`
            : '0 2px 12px rgba(0,0,0,0.06)',
          transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        }}
      >
        {/* Top accent line */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[2px] rounded-t-2xl transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent 10%, ${node.accent} 50%, transparent 90%)`,
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Icon */}
        <div
          className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-500"
          style={{
            background: isHovered ? node.accentBg : 'rgba(15,23,42,0.04)',
            border: `1px solid ${isHovered ? node.accentBorder : 'rgba(15,23,42,0.08)'}`,
            color: isHovered ? node.accent : 'rgba(15,23,42,0.38)',
          }}
        >
          {node.icon}
        </div>

        {/* Label */}
        <p
          className="font-headline text-[1rem] font-bold leading-tight tracking-[-0.02em] transition-all duration-300"
          style={{ color: isHovered ? 'rgba(15,23,42,0.95)' : 'rgba(15,23,42,0.85)' }}
        >
          {node.label}
        </p>

        {/* Subtitle */}
        <p
          className="mt-1 text-[0.68rem] leading-snug transition-all duration-300"
          style={{ color: isHovered ? 'rgba(15,23,42,0.80)' : 'rgba(15,23,42,0.62)' }}
        >
          {node.subtitle}
        </p>

        {/* Support text */}
        <div
          className="mt-3 space-y-1 overflow-hidden transition-all duration-400"
          style={{
            maxHeight: isHovered ? '80px' : '0px',
            opacity: isHovered ? 1 : 0,
          }}
        >
          {node.support.map((s) => (
            <p key={s} className="flex items-center gap-1.5 text-[0.65rem]" style={{ color: 'rgba(15,23,42,0.62)' }}>
              <span className="h-[3px] w-[3px] flex-shrink-0 rounded-full bg-gradient-to-r from-orange-400 to-pink-400" />
              {s}
            </p>
          ))}
        </div>
      </button>

      {/* Index label below card */}
      <div
        className="mt-3 text-[0.6rem] font-bold uppercase tracking-[0.2em] transition-all duration-300"
        style={{ color: isHovered ? 'rgba(15,23,42,0.52)' : 'rgba(15,23,42,0.36)' }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>
    </div>
  )
}
