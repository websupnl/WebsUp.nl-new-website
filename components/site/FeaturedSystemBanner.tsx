'use client'

import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowRight, Check, CircleDot, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'

const features = [
  ['Website', 'Het hart van je verhaal'],
  ['Hosting en beheer', 'Veilig en up-to-date'],
  ['Formulieren', 'Geen mailbox-chaos meer'],
  ['Dashboards', 'Inzicht in wat werkt'],
]

const modules = [
  { title: 'Website', sub: 'Bezoeker wordt lead', x: 76, y: 74, anchor: [190, 114], end: [300, 238] },
  { title: 'Webshop', sub: 'Bestelling komt binnen', x: 336, y: 74, anchor: [416, 114], end: [330, 238] },
  { title: 'Slimme intake', sub: 'Informatie compleet', x: 30, y: 208, anchor: [160, 248], end: [278, 250] },
  { title: 'Calculator', sub: 'Indicatie berekend', x: 402, y: 208, anchor: [436, 248], end: [342, 250] },
  { title: 'Offerte', sub: 'Voorstel klaarzetten', x: 76, y: 342, anchor: [190, 382], end: [286, 270] },
  { title: 'Dashboard', sub: 'Alles in beeld', x: 334, y: 342, anchor: [416, 382], end: [328, 270] },
  { title: 'Klantportaal', sub: 'Status zichtbaar', x: 214, y: 404, anchor: [300, 404], end: [306, 282] },
] as const

const statusCards = [
  'Nieuwe aanvraag binnen',
  'Indicatie berekend',
  'Offerte voorbereid',
  'Klantactie aangemaakt',
]

function pathFor(module: (typeof modules)[number]) {
  const [sx, sy] = module.anchor
  const [ex, ey] = module.end
  const cx = (sx + ex) / 2
  return `M ${sx} ${sy} C ${cx} ${sy}, ${cx} ${ey}, ${ex} ${ey}`
}

function Particle({
  module,
  delay,
  reduceMotion,
}: {
  module: (typeof modules)[number]
  delay: number
  reduceMotion: boolean
}) {
  const [sx, sy] = module.anchor
  const [ex, ey] = module.end
  const midX = (sx + ex) / 2

  if (reduceMotion) {
    return <circle cx={ex} cy={ey} r="3.5" fill="#f97316" opacity="0.7" />
  }

  return (
    <motion.circle
      r="4"
      fill="url(#particleGradient)"
      filter="url(#particleGlow)"
      initial={{ cx: sx, cy: sy, opacity: 0 }}
      animate={{
        cx: [sx, midX, ex],
        cy: [sy, sy + (ey - sy) * 0.18, ey],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 3.6,
        delay,
        repeat: Infinity,
        repeatDelay: 2.2,
        ease: 'easeInOut',
      }}
    />
  )
}

function SystemVisualization() {
  const shouldReduceMotion = useReducedMotion()
  const reduceMotion = Boolean(shouldReduceMotion)
  const [activeStatus, setActiveStatus] = useState(0)

  useEffect(() => {
    if (reduceMotion) return
    const id = window.setInterval(() => {
      setActiveStatus((current) => (current + 1) % statusCards.length)
    }, 2400)

    return () => window.clearInterval(id)
  }, [reduceMotion])

  return (
    <div className="relative min-h-[520px] overflow-hidden rounded-[28px] border border-white/10 bg-[#100d17] p-4 shadow-[0_28px_90px_rgba(6,4,12,0.42)] sm:p-6 lg:min-h-[560px]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:34px_34px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.16),transparent_28%),radial-gradient(circle_at_76%_35%,rgba(236,72,153,0.14),transparent_30%),radial-gradient(circle_at_52%_88%,rgba(167,139,250,0.11),transparent_28%)]" />
      <div className="absolute inset-0 rounded-[28px] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]" />

      <div className="relative mx-auto aspect-[1.08/1] w-full max-w-[620px]">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 600 500"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="lineGradient" x1="0" x2="1" y1="0" y2="1">
              <stop stopColor="#f97316" stopOpacity="0.85" />
              <stop offset="0.55" stopColor="#ec4899" stopOpacity="0.72" />
              <stop offset="1" stopColor="#a78bfa" stopOpacity="0.62" />
            </linearGradient>
            <radialGradient id="particleGradient">
              <stop stopColor="#fff7ed" />
              <stop offset="0.46" stopColor="#f97316" />
              <stop offset="1" stopColor="#ec4899" />
            </radialGradient>
            <filter id="particleGlow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {modules.map((module) => (
            <path
              key={module.title}
              d={pathFor(module)}
              stroke="url(#lineGradient)"
              strokeLinecap="round"
              strokeWidth="1.6"
              opacity="0.42"
            />
          ))}

          {modules.map((module, index) => (
            <Particle
              key={`${module.title}-particle`}
              module={module}
              delay={index * 0.34}
              reduceMotion={reduceMotion}
            />
          ))}
        </svg>

        <motion.div
          className="absolute left-1/2 top-1/2 z-20 flex h-[128px] w-[128px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[28px] border border-white/16 bg-white/[0.08] text-center shadow-[0_20px_70px_rgba(0,0,0,0.34)] backdrop-blur-xl sm:h-[150px] sm:w-[150px]"
          animate={
            reduceMotion
              ? undefined
              : {
                  scale: [1, 1.035, 1],
                  boxShadow: [
                    '0 20px 70px rgba(0,0,0,0.34)',
                    '0 22px 80px rgba(236,72,153,0.24)',
                    '0 20px 70px rgba(0,0,0,0.34)',
                  ],
                }
          }
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-slate-950 shadow-lg">
            <Sparkles size={20} strokeWidth={1.8} />
          </div>
          <div className="text-[18px] font-extrabold leading-tight text-white sm:text-[20px]">
            WebsUp Core
          </div>
          <div className="mt-1 text-[13px] font-medium text-white/60 sm:text-[14px]">
            Digitale basis
          </div>
        </motion.div>

        {modules.map((module) => (
          <motion.div
            key={module.title}
            className="absolute z-10 hidden w-[166px] rounded-[18px] border border-white/12 bg-white/[0.08] p-3.5 shadow-[0_18px_50px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:block"
            style={{ left: `${(module.x / 600) * 100}%`, top: `${(module.y / 500) * 100}%` }}
            animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
            transition={{
              duration: 5 + (module.title.length % 3),
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-[10px] bg-white/10">
                <CircleDot size={15} className="text-orange-300" />
              </span>
              <span className="text-[14px] font-bold text-white">{module.title}</span>
            </div>
            <p className="text-[12px] leading-snug text-white/58">{module.sub}</p>
          </motion.div>
        ))}

        <div className="absolute left-0 right-0 top-5 z-30 mx-auto flex w-[min(86%,360px)] justify-center sm:left-auto sm:right-4 sm:w-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={reduceMotion ? statusCards[0] : statusCards[activeStatus]}
              initial={reduceMotion ? false : { opacity: 0, y: -10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              className="flex w-full items-center gap-3 rounded-2xl border border-white/14 bg-white/92 px-4 py-3 text-slate-950 shadow-[0_18px_50px_rgba(0,0,0,0.22)]"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                <Check size={17} strokeWidth={2.4} />
              </span>
              <span className="text-[14px] font-bold">
                {reduceMotion ? statusCards[0] : statusCards[activeStatus]}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute bottom-3 left-1/2 z-30 w-[min(92%,430px)] -translate-x-1/2 rounded-[22px] border border-white/12 bg-[#06040c]/82 p-4 shadow-[0_22px_70px_rgba(0,0,0,0.34)] backdrop-blur-xl sm:bottom-6">
          <div className="mb-3 text-[12px] font-bold uppercase tracking-[0.14em] text-white/48">
            Vandaag verwerkt
          </div>
          <div className="grid grid-cols-3 gap-3 text-white">
            {[
              ['12', 'aanvragen'],
              ['4', 'offertes'],
              ['3', 'klantacties'],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl bg-white/[0.07] p-3">
                <div className="text-[22px] font-extrabold leading-none">{value}</div>
                <div className="mt-1 text-[12px] font-medium text-white/54">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-20 mt-4 grid grid-cols-2 gap-2 sm:hidden">
        {modules.slice(0, 6).map((module) => (
          <div key={module.title} className="rounded-2xl border border-white/10 bg-white/[0.07] p-3">
            <div className="text-[13px] font-bold text-white">{module.title}</div>
            <div className="mt-1 text-[12px] leading-snug text-white/54">{module.sub}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function FeaturedSystemBanner() {
  return (
    <section className="bg-white py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-16">
        <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_22px_70px_rgba(15,23,42,0.08)]">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_1fr]">
            <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-14 lg:py-16">
              <p className="mb-4 text-[12px] font-extrabold uppercase tracking-[0.22em] text-pink-500">
                Uitgelichte oplossing
              </p>
              <h2 className="max-w-[520px] text-[38px] font-extrabold leading-[0.96] tracking-[-0.02em] text-[#15181d] sm:text-[46px] lg:text-[52px]">
                Eén digitale basis voor je hele bedrijf.
              </h2>
              <p className="mt-6 max-w-[540px] text-[16px] leading-7 text-slate-600 sm:text-[17px]">
                Veel ondernemers hebben losse tools, een verouderde website en een mailbox vol exports.
                Ik breng dat samen tot één digitale basis die meegroeit met je bedrijf.
              </p>

              <div className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {features.map(([title, sub]) => (
                  <div key={title} className="flex items-start gap-3">
                    <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-pink-500" />
                    <div>
                      <div className="text-[16px] font-bold leading-tight text-[#15181d]">{title}</div>
                      <div className="mt-0.5 text-[13px] leading-tight text-slate-500">{sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/diensten"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-slate-900 px-5 text-[15px] font-bold text-white transition hover:bg-black"
                >
                  Bekijk oplossingen
                  <ArrowRight size={17} strokeWidth={2.2} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-300 bg-white px-5 text-[15px] font-bold text-slate-900 transition hover:border-slate-900"
                >
                  Plan kennismaking
                </Link>
              </div>
            </div>

            <div className="bg-[#17131d] p-4 sm:p-6 lg:p-8">
              <SystemVisualization />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
