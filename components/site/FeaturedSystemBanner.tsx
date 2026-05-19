'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, Globe, ShoppingBag, BarChart3, Zap } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

const DURATION = 5000

const modules = [
  {
    icon: Globe,
    label: 'Website',
    sub: 'Het hart van je verhaal',
    image: '/Projecten/verkeerschoolhaak_mockup.png',
    alt: 'Website mockup – verkeerschoolhaak.nl',
  },
  {
    icon: ShoppingBag,
    label: 'Webshop',
    sub: 'Bestelling komt binnen',
    image: '/Projecten/goldcenterdrachten_mockup.png',
    alt: 'Webshop mockup – goldcenterdrachten.nl',
  },
  {
    icon: BarChart3,
    label: 'Dashboards',
    sub: 'Inzicht in wat werkt',
    image: '/Projecten/sinq_mockup.png',
    alt: 'Dashboard mockup – sinq',
  },
  {
    icon: Zap,
    label: 'Automatisering',
    sub: 'Koppelingen die werken',
    image: '/Projecten/jteq_mockup.png',
    alt: 'Automatisering mockup – jteq',
  },
]

export default function FeaturedSystemBanner() {
  const [active, setActive] = useState(0)
  const [progressKey, setProgressKey] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setActive((i) => {
        const next = (i + 1) % modules.length
        setProgressKey((k) => k + 1)
        return next
      })
    }, DURATION)
  }, [])

  useEffect(() => {
    startTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [startTimer])

  const goTo = (index: number) => {
    setActive(index)
    setProgressKey((k) => k + 1)
    startTimer()
  }

  return (
    <section className="bg-white py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-16">
        <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_22px_70px_rgba(15,23,42,0.08)]">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_1fr]">

            {/* ── LEFT: originele stijl, module-buttons ipv statische lijst ── */}
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

              {/* Module buttons */}
              <div className="mt-8 flex flex-col gap-2">
                {modules.map((mod, i) => {
                  const Icon = mod.icon
                  const isActive = active === i
                  return (
                    <button
                      key={mod.label}
                      onClick={() => goTo(i)}
                      className="group relative w-full overflow-hidden rounded-xl border text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/50"
                      style={{
                        background: isActive ? 'rgba(249,115,22,0.04)' : 'white',
                        borderColor: isActive ? 'rgba(249,115,22,0.22)' : 'rgb(226,232,240)',
                      }}
                    >
                      {/* Left gradient accent bar */}
                      <div
                        className="absolute inset-y-0 left-0 w-[3px] rounded-r-full transition-all duration-300"
                        style={{
                          background: 'linear-gradient(180deg, #f97316 0%, #ec4899 50%, #a78bfa 100%)',
                          opacity: isActive ? 1 : 0,
                          transform: isActive ? 'scaleY(1)' : 'scaleY(0.3)',
                        }}
                      />

                      <div className="flex items-center gap-3 px-4 py-3">
                        {/* Icon */}
                        <div
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-300"
                          style={isActive ? {
                            background: 'linear-gradient(135deg, #f97316, #ec4899)',
                            boxShadow: '0 4px 14px rgba(249,115,22,0.28)',
                          } : {
                            background: 'rgb(241,245,249)',
                          }}
                        >
                          <Icon
                            size={15}
                            strokeWidth={2}
                            className={`transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}`}
                          />
                        </div>

                        {/* Label + sub */}
                        <div className="min-w-0 flex-1">
                          <span className={`block text-[14px] font-bold leading-tight transition-colors duration-300 ${isActive ? 'text-[#15181d]' : 'text-slate-500 group-hover:text-slate-700'}`}>
                            {mod.label}
                          </span>
                          <span className={`block text-[12px] leading-tight transition-colors duration-300 ${isActive ? 'text-orange-500' : 'text-slate-400'}`}>
                            {mod.sub}
                          </span>
                        </div>

                        {/* Arrow */}
                        <ArrowRight
                          size={14}
                          className={`shrink-0 transition-all duration-200 ${isActive ? 'translate-x-0 text-orange-400 opacity-100' : '-translate-x-1 text-slate-300 opacity-0 group-hover:translate-x-0 group-hover:opacity-60'}`}
                        />
                      </div>

                      {/* Progress bar */}
                      {isActive && (
                        <div className="h-[2px] w-full overflow-hidden bg-orange-50">
                          <motion.div
                            key={progressKey}
                            className="h-full"
                            style={{ background: 'linear-gradient(90deg, #f97316, #ec4899, #a78bfa)' }}
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ duration: DURATION / 1000, ease: 'linear' }}
                          />
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>

              {/* CTAs — origineel */}
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

            {/* ── RIGHT: animated mockup images ── */}
            <div className="relative bg-[#17131d] p-4 sm:p-6 lg:p-8">
              {/* Ambient glow */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: 'radial-gradient(ellipse at 65% 25%, rgba(249,115,22,0.13), rgba(236,72,153,0.08) 50%, transparent 68%)',
                }}
              />

              <div className="relative flex h-full min-h-[400px] items-center">
                <div className="relative w-full overflow-hidden rounded-[20px] border border-white/[0.08] shadow-[0_32px_80px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.04)_inset]">
                  {/* Top sheen */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />

                  {/* Crossfade image */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, scale: 1.03, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.97, y: -8 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Image
                        src={modules[active].image}
                        alt={modules[active].alt}
                        width={900}
                        height={600}
                        className="w-full"
                        style={{ display: 'block' }}
                        priority={active === 0}
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Bottom overlay with label + dot nav */}
                  <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#17131d]/90 via-[#17131d]/40 to-transparent px-4 pb-4 pt-12">
                    <div className="flex items-center justify-between gap-3">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`lbl-${active}`}
                          className="inline-flex items-center gap-2 rounded-full border border-white/[0.14] bg-[#17131d]/70 px-3.5 py-1.5 backdrop-blur-md"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.25 }}
                        >
                          <span
                            className="h-[6px] w-[6px] rounded-full"
                            style={{ background: 'linear-gradient(135deg, #f97316, #ec4899)' }}
                          />
                          <span className="text-[12px] font-semibold text-white">{modules[active].label}</span>
                          <span className="text-[11px] text-white/40">— {modules[active].sub}</span>
                        </motion.div>
                      </AnimatePresence>

                      {/* Dot navigation */}
                      <div className="flex items-center gap-1.5">
                        {modules.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => goTo(i)}
                            aria-label={`Ga naar ${modules[i].label}`}
                            className="rounded-full transition-all duration-300 focus-visible:outline-none"
                            style={{
                              height: 5,
                              width: active === i ? 18 : 5,
                              background: active === i
                                ? 'linear-gradient(90deg, #f97316, #ec4899)'
                                : 'rgba(255,255,255,0.25)',
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
