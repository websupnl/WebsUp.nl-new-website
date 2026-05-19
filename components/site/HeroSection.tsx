'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import HeroRotatingWord from '@/components/site/HeroRotatingWord'

const WAVE_LINES = Array.from({ length: 12 }, (_, i) => ({
  d: `M ${700 + i * 10} 60 Q ${1100 + i * 4} ${300 + i * 10} ${800 + i * 6} 600`,
  strokeWidth: 0.6 + i * 0.05,
  opacity: 0.4 + i * 0.04,
}))

const AVATARS = [
  { bg: 'linear-gradient(135deg,#f97316,#ec4899)', l: 'D' },
  { bg: 'linear-gradient(135deg,#ec4899,#a78bfa)', l: 'M' },
  { bg: 'linear-gradient(135deg,#a78bfa,#f97316)', l: 'R' },
  { bg: 'linear-gradient(135deg,#f97316,#a78bfa)', l: 'J' },
]

export default function HeroSection() {
  const cardRef  = useRef<HTMLDivElement>(null)
  const orb1Ref  = useRef<HTMLDivElement>(null)
  const orb2Ref  = useRef<HTMLDivElement>(null)
  const orb3Ref  = useRef<HTMLDivElement>(null)
  const orbPos1  = useRef({ x: 30, y: 40 })
  const orbPos2  = useRef({ x: 60, y: 55 })
  const orbPos3  = useRef({ x: 45, y: 25 })
  const rafRef   = useRef<number | null>(null)
  const rawTiltX = useMotionValue(0)
  const rawTiltY = useMotionValue(0)
  const tiltX    = useSpring(rawTiltX, { stiffness: 120, damping: 22, mass: 0.6 })
  const tiltY    = useSpring(rawTiltY, { stiffness: 120, damping: 22, mass: 0.6 })

  useEffect(() => {
    const noHover = window.matchMedia('(hover: none)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (noHover || reduced) return

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    let tx1 = 30, ty1 = 40
    let tx2 = 60, ty2 = 55
    let tx3 = 45, ty3 = 25

    const tick = () => {
      orbPos1.current.x = lerp(orbPos1.current.x, tx1, 0.055)
      orbPos1.current.y = lerp(orbPos1.current.y, ty1, 0.055)
      orbPos2.current.x = lerp(orbPos2.current.x, tx2, 0.032)
      orbPos2.current.y = lerp(orbPos2.current.y, ty2, 0.032)
      orbPos3.current.x = lerp(orbPos3.current.x, tx3, 0.020)
      orbPos3.current.y = lerp(orbPos3.current.y, ty3, 0.020)

      if (orb1Ref.current) {
        orb1Ref.current.style.left = `${orbPos1.current.x}%`
        orb1Ref.current.style.top  = `${orbPos1.current.y}%`
      }
      if (orb2Ref.current) {
        orb2Ref.current.style.left = `${orbPos2.current.x}%`
        orb2Ref.current.style.top  = `${orbPos2.current.y}%`
      }
      if (orb3Ref.current) {
        orb3Ref.current.style.left = `${orbPos3.current.x}%`
        orb3Ref.current.style.top  = `${orbPos3.current.y}%`
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    const onMove = (e: MouseEvent) => {
      const card = cardRef.current
      if (!card) return
      const rect = card.getBoundingClientRect()
      const nx   = ((e.clientX - rect.left) / rect.width)  * 100
      const ny   = ((e.clientY - rect.top)  / rect.height) * 100
      tx1 = nx - 18; ty1 = ny - 12
      tx2 = nx + 12; ty2 = ny + 8
      tx3 = nx - 5;  ty3 = ny - 28
      rawTiltX.set((ny / 100 - 0.5) * -7)
      rawTiltY.set((nx / 100 - 0.5) *  7)
    }

    const onLeave = () => {
      rawTiltX.set(0)
      rawTiltY.set(0)
    }

    const card = cardRef.current
    card?.addEventListener('mousemove', onMove)
    card?.addEventListener('mouseleave', onLeave)
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      card?.removeEventListener('mousemove', onMove)
      card?.removeEventListener('mouseleave', onLeave)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [rawTiltX, rawTiltY])

  return (
    <section className="bg-white pb-0">
      <div>

        {/* ── Feature hero card ────────────────────────────────────── */}
        <div
          ref={cardRef}
          className="relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #1a1d24 0%, #232830 100%)',
            borderRadius: '0 0 48px 48px',
            minHeight: 520,
            isolation: 'isolate',
          }}
        >
          {/* Radial gradient overlays (orange top-right + purple bottom-right) */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `
                radial-gradient(60% 60% at 80% 30%, rgba(249,115,22,.18), transparent 60%),
                radial-gradient(50% 60% at 95% 80%, rgba(138,71,224,.20), transparent 60%)
              `,
            }}
          />

          {/* Wave SVG */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full opacity-50"
            viewBox="0 0 1400 600"
            preserveAspectRatio="xMaxYMid slice"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="hWave1" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%"   stopColor="#FF7A3D" stopOpacity="0" />
                <stop offset="50%"  stopColor="#F0517E" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#8A47E0" stopOpacity="0" />
              </linearGradient>
            </defs>
            {WAVE_LINES.map((w, i) => (
              <path
                key={i}
                d={w.d}
                fill="none"
                stroke="url(#hWave1)"
                strokeWidth={w.strokeWidth}
                opacity={w.opacity}
              />
            ))}
          </svg>

          {/* Ambient cursor orbs (desktop only) */}
          <div className="pointer-events-none absolute inset-0 hidden overflow-hidden motion-reduce:hidden lg:block">
            <div
              ref={orb1Ref}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: 340, height: 340,
                background: 'radial-gradient(circle, rgba(249,115,22,0.22) 0%, transparent 70%)',
                filter: 'blur(32px)',
                willChange: 'left, top',
              }}
            />
            <div
              ref={orb2Ref}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: 280, height: 280,
                background: 'radial-gradient(circle, rgba(236,72,153,0.18) 0%, transparent 70%)',
                filter: 'blur(40px)',
                willChange: 'left, top',
              }}
            />
            <div
              ref={orb3Ref}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: 220, height: 220,
                background: 'radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 70%)',
                filter: 'blur(48px)',
                willChange: 'left, top',
              }}
            />
          </div>

          {/* ── Content grid ───────────────────────────────────────── */}
          <div
            className="relative mx-auto grid w-full max-w-[1500px] items-center gap-10 px-8 pb-14 pt-36 lg:grid-cols-[1.3fr_1fr] lg:gap-16 lg:px-16 lg:pb-[60px] lg:pt-48"
            style={{ minHeight: 520 }}
          >

            {/* ── LEFT: text content ─────────────────────────────── */}
            <div className="flex flex-col">

              {/* Badge */}
              <motion.div
                className="mb-6 self-start inline-flex items-center gap-2 rounded-full px-3 py-[5px] text-[11.5px] font-semibold uppercase tracking-[.12em] text-white/90"
                style={{
                  background: 'rgba(255,255,255,.08)',
                  border: '1px solid rgba(255,255,255,.15)',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              >
                <span className="relative inline-flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                Webdesign &amp; Development
              </motion.div>

              {/* H1 */}
              <motion.h1
                className="font-headline font-extrabold leading-[1.06] tracking-[-0.035em] text-white mb-[22px]"
                style={{ fontSize: 'clamp(2rem, 4.2vw, 3.6rem)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              >
                Ik bouw voor bedrijven<br />die willen{' '}
                <HeroRotatingWord />
              </motion.h1>

              {/* Gradient accent line */}
              <motion.div
                className="focus-pulse-line mb-5 h-[3px] w-24 rounded-full bg-gradient-to-r from-orange-400 via-pink-400 to-violet-300"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
                style={{ transformOrigin: 'left center' }}
              />

              {/* Description */}
              <motion.p
                className="max-w-[52ch] text-[1.0625rem] leading-[1.76] text-white/75 mb-7"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
              >
                Ik ontwerp en bouw digitale oplossingen die er professioneel uitzien, duidelijk werken en bijdragen aan groei. Van converterende websites en webshops tot maatwerk dashboards, koppelingen en automatisering.
              </motion.p>

              {/* Buttons */}
              <motion.div
                className="mb-9 flex flex-col gap-3 sm:flex-row sm:items-center"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.40 }}
              >
                <Link
                  href="/contact"
                  className="btn-brand-gradient group w-full justify-center gap-2.5 sm:w-auto sm:justify-start"
                >
                  Gratis ontwerp aanvragen
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/projecten"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/[0.18] bg-white/[0.06] px-7 py-3.5 text-sm font-medium text-white/80 backdrop-blur-sm transition-all duration-200 hover:border-white/[0.30] hover:bg-white/[0.10] hover:text-white sm:w-auto"
                >
                  Bekijk mijn werk
                </Link>
              </motion.div>

              {/* Avatar stack + stars */}
              <motion.div
                className="flex flex-wrap items-center gap-6"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.52 }}
              >
                <div className="flex items-center">
                  {AVATARS.map((a, i) => (
                    <span
                      key={i}
                      className="inline-flex h-8 w-8 cursor-default items-center justify-center rounded-full border-2 border-[#1a1d24] text-[12px] font-bold text-white transition-transform duration-300 hover:-translate-y-1 hover:scale-110"
                      style={{ background: a.bg, marginLeft: i ? -10 : 0 }}
                    >
                      {a.l}
                    </span>
                  ))}
                  <span className="ml-2.5 text-[13.5px] font-medium text-white/85">
                    10+ tevreden klanten
                  </span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <span className="tracking-wide text-amber-400">★★★★★</span>
                  <span className="text-[13.5px] font-semibold">5.0</span>
                  <span className="text-[13px] text-white/55">Google</span>
                </div>
              </motion.div>
            </div>

            {/* ── RIGHT: photo card with 3D tilt ─────────────────── */}
            <div className="hidden lg:flex lg:flex-col">
              <motion.div
                className="relative mx-auto max-w-[26rem]"
                style={{
                  rotateX: tiltX,
                  rotateY: tiltY,
                  transformPerspective: 1000,
                  willChange: 'transform',
                }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
              >
                {/* Ambient glow */}
                <div
                  className="pointer-events-none absolute -inset-8 rounded-[3rem] opacity-70 blur-3xl"
                  style={{
                    background:
                      'radial-gradient(ellipse at 50% 30%, rgba(249,115,22,0.22), rgba(236,72,153,0.10) 50%, transparent 72%)',
                  }}
                />

                {/* Photo card */}
                <div className="group relative overflow-hidden rounded-[2rem] border border-white/[0.10] bg-white/[0.035] shadow-[0_32px_80px_rgba(0,0,0,0.52),0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur-sm transition-all duration-700 hover:-translate-y-1.5 hover:border-white/[0.16]">
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <Image
                    src="/Daan Koolhaas.jpg"
                    alt="Daan Koolhaas — WebsUp.nl"
                    width={640}
                    height={800}
                    priority
                    loading="eager"
                    className="h-auto w-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#06040c]/95 via-[#06040c]/55 to-transparent px-6 pb-7 pt-24">
                    <p className="text-[1.35rem] font-extrabold leading-tight tracking-[-0.02em] text-white">
                      Daan Koolhaas
                    </p>
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
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
