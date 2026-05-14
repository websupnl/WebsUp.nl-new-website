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
    color: 'rgba(249,115,22,0.15)',
    glow: 'rgba(249,115,22,0.22)',
    delay: 0,
  },
  {
    id: 'auto',
    label: 'Automatisering',
    subtitle: 'Slimme achtergrondprocessen',
    icon: <IconFlow />,
    support: ['Minder handmatig werk', 'Meer overzicht', 'Systemen die samenwerken'],
    color: 'rgba(236,72,153,0.13)',
    glow: 'rgba(236,72,153,0.20)',
    delay: 200,
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    subtitle: 'Inzicht in realtime',
    icon: <IconDashboard />,
    support: ['Altijd overzicht', 'Slim rapporteren', 'Gefundeerde keuzes'],
    color: 'rgba(167,139,250,0.12)',
    glow: 'rgba(167,139,250,0.18)',
    delay: 400,
  },
  {
    id: 'groei',
    label: 'Groei',
    subtitle: 'Schaalbaar en toekomstbestendig',
    icon: <IconGrowth />,
    support: ['Meer leads', 'Betere conversie', 'Systemen die meegroeien'],
    color: 'rgba(52,211,153,0.11)',
    glow: 'rgba(52,211,153,0.18)',
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
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#06040c] py-24 lg:py-32"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        {/* Soft grid */}
        <div
          className="absolute inset-0 opacity-[0.028]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* Ambient orbs */}
        <div className="absolute left-[15%] top-[20%] h-80 w-80 rounded-full bg-orange-500/[0.06] blur-[100px]" />
        <div className="absolute right-[20%] bottom-[10%] h-72 w-72 rounded-full bg-violet-500/[0.06] blur-[100px]" />
        {/* Top divider glow */}
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(249,115,22,0.18) 30%, rgba(236,72,153,0.14) 60%, transparent 100%)' }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* Section label */}
        <div
          className="mb-16 flex flex-col items-center text-center transition-all duration-700"
          style={{ opacity: active ? 1 : 0, transform: active ? 'translateY(0)' : 'translateY(16px)', transitionDelay: '0ms' }}
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-white/38">
            <span className="h-[3px] w-[3px] rounded-full bg-gradient-to-r from-orange-400 to-pink-400" />
            Hoe het werkt
          </span>
          <h2
            className="font-headline font-extrabold leading-[1.06] tracking-[-0.03em] text-white"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.6rem)' }}
          >
            Jouw digitale ecosysteem
          </h2>
          <p className="mt-4 max-w-[44ch] text-[0.9rem] leading-relaxed text-white/38">
            Van eerste indruk tot schaalbare groei — systemen die samenwerken en versterken.
          </p>
        </div>

        {/* Nodes + connectors */}
        <div className="relative">

          {/* ── Desktop layout ─────────────────────────────── */}
          <div className="hidden lg:block">

            {/* Connector track */}
            <div className="absolute left-[12.5%] right-[12.5%] top-[52px] h-px">
              {/* Base line */}
              <div className="absolute inset-0" style={{ background: 'rgba(255,255,255,0.06)' }} />

              {/* Animated pulse — travels left to right */}
              <div
                className="absolute inset-y-[-1px]"
                style={{
                  width: '28%',
                  background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.7) 20%, rgba(236,72,153,0.55) 50%, rgba(167,139,250,0.4) 80%, transparent)',
                  animation: active ? 'ecosys-pulse 3.6s cubic-bezier(0.4,0,0.6,1) infinite' : 'none',
                  filter: 'blur(0.5px)',
                }}
              />
              {/* Glow layer */}
              <div
                className="absolute inset-y-[-3px]"
                style={{
                  width: '22%',
                  background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.25) 30%, rgba(236,72,153,0.18) 60%, transparent)',
                  animation: active ? 'ecosys-pulse 3.6s cubic-bezier(0.4,0,0.6,1) infinite' : 'none',
                  filter: 'blur(4px)',
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
                    <div className="h-full w-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
                    <div
                      className="absolute w-px"
                      style={{
                        top: '-10%',
                        height: '22%',
                        background: 'linear-gradient(180deg, transparent, rgba(249,115,22,0.7), transparent)',
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
  const anyHovered = hovered !== null

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
          background: isHovered
            ? `rgba(12,10,22,0.92)`
            : 'rgba(10,8,20,0.65)',
          border: `1px solid ${isHovered ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.07)'}`,
          backdropFilter: 'blur(24px) saturate(160%)',
          WebkitBackdropFilter: 'blur(24px) saturate(160%)',
          boxShadow: isHovered
            ? `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${node.glow}`
            : '0 8px 32px rgba(0,0,0,0.3)',
          transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        }}
      >
        {/* Top ambient glow */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent 10%, ${node.glow} 50%, transparent 90%)`,
            opacity: isHovered ? 1 : 0.4,
          }}
        />

        {/* Icon */}
        <div
          className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-500"
          style={{
            background: isHovered ? node.color : 'rgba(255,255,255,0.04)',
            border: `1px solid ${isHovered ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.07)'}`,
            color: isHovered ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.38)',
          }}
        >
          {node.icon}
        </div>

        {/* Label */}
        <p
          className="font-headline text-[1rem] font-bold leading-tight tracking-[-0.02em] transition-all duration-300"
          style={{ color: isHovered ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.65)' }}
        >
          {node.label}
        </p>

        {/* Subtitle */}
        <p
          className="mt-1 text-[0.68rem] leading-snug transition-all duration-300"
          style={{ color: isHovered ? 'rgba(255,255,255,0.40)' : 'rgba(255,255,255,0.22)' }}
        >
          {node.subtitle}
        </p>

        {/* Support text — fades in on hover */}
        <div
          className="mt-3 space-y-1 overflow-hidden transition-all duration-400"
          style={{
            maxHeight: isHovered ? '80px' : '0px',
            opacity: isHovered ? 1 : 0,
          }}
        >
          {node.support.map((s) => (
            <p key={s} className="flex items-center gap-1.5 text-[0.65rem] text-white/42">
              <span className="h-[3px] w-[3px] flex-shrink-0 rounded-full bg-gradient-to-r from-orange-400 to-pink-400" />
              {s}
            </p>
          ))}
        </div>
      </button>

      {/* Index label below card */}
      <div
        className="mt-3 text-[0.6rem] font-bold uppercase tracking-[0.2em] transition-all duration-300"
        style={{ color: isHovered ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.12)' }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>
    </div>
  )
}
