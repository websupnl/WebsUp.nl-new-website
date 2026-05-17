'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Layers, PenTool, Target } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import HeroRotatingWord from '@/components/site/HeroRotatingWord'

const TRUST = [
  {
    icon: Target,
    value: 'Strategie',
    title: 'Strategie voor je begint',
    text: 'We kijken eerst naar je doel, doelgroep en wat je website of systeem moet opleveren.',
  },
  {
    icon: PenTool,
    value: 'Ontwerp',
    title: 'Ontwerp dat vertrouwen wekt',
    text: 'Geen standaard uitstraling, maar een duidelijke online basis die past bij je bedrijf.',
  },
  {
    icon: Layers,
    value: 'Techniek',
    title: 'Techniek die meegroeit',
    text: 'Van website tot maatwerk functie, koppeling of dashboard wanneer je bedrijf daarom vraagt.',
  },
]

export default function HeroSection() {
  const heroRef     = useRef<HTMLElement>(null)
  const orb1Ref     = useRef<HTMLDivElement>(null)
  const orb2Ref     = useRef<HTMLDivElement>(null)
  const orb3Ref     = useRef<HTMLDivElement>(null)
  const orbPos1     = useRef({ x: 30, y: 40 })
  const orbPos2     = useRef({ x: 60, y: 55 })
  const orbPos3     = useRef({ x: 45, y: 25 })
  const rafRef      = useRef<number | null>(null)

  // Spring-based tilt for photo card
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
      const hero = heroRef.current
      if (!hero) return
      const rect = hero.getBoundingClientRect()
      const nx   = ((e.clientX - rect.left) / rect.width)  * 100
      const ny   = ((e.clientY - rect.top)  / rect.height) * 100

      tx1 = nx - 18; ty1 = ny - 12
      tx2 = nx + 12; ty2 = ny + 8
      tx3 = nx - 5;  ty3 = ny - 28

      // Photo tilt (max ±7deg)
      rawTiltX.set((ny / 100 - 0.5) * -7)
      rawTiltY.set((nx / 100 - 0.5) *  7)
    }

    const onLeave = () => {
      rawTiltX.set(0)
      rawTiltY.set(0)
    }

    const hero = heroRef.current
    hero?.addEventListener('mousemove', onMove)
    hero?.addEventListener('mouseleave', onLeave)
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      hero?.removeEventListener('mousemove', onMove)
      hero?.removeEventListener('mouseleave', onLeave)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [rawTiltX, rawTiltY])

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen flex-col overflow-hidden"
      style={{
        backgroundColor: '#06040c',
        backgroundImage: 'url("/hero-bg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* ── Static overlays ──────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(110deg, rgba(6,4,12,0.97) 0%, rgba(6,4,12,0.88) 38%, rgba(6,4,12,0.55) 68%, rgba(6,4,12,0.32) 100%)',
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#06040c] to-transparent" />
      </div>

      {/* ── Ambient cursor orbs (desktop only) ───────────────────── */}
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

      {/* Watermark */}
      <div className="pointer-events-none absolute bottom-7 right-8 hidden items-center gap-3 text-[0.6rem] font-bold uppercase tracking-[0.22em] text-white/18 lg:flex">
        <span className="h-px w-10 bg-gradient-to-r from-transparent via-white/24 to-transparent" />
        WebsUp
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/[0.07]" />

      {/* ── Content grid ─────────────────────────────────────────── */}
      <div className="relative flex flex-1 flex-col justify-center w-full">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 pb-12 pt-32 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-14 lg:px-8 lg:pb-16 lg:pt-40">

          {/* ── LEFT ─────────────────────────────────────────────── */}
          <div className="flex flex-col">
            <motion.span
              className="overline-badge overline-badge-dark mb-6 self-start"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              Webdesign &amp; Development
            </motion.span>

            <motion.h1
              className="font-headline font-extrabold leading-[1.06] tracking-[-0.035em] text-white"
              style={{ fontSize: 'clamp(2rem, 4.2vw, 3.6rem)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              Ik bouw voor bedrijven
              <br />
              die willen{' '}
              <HeroRotatingWord />
            </motion.h1>

            <motion.div
              className="focus-pulse-line mt-6 h-[3px] w-24 rounded-full bg-gradient-to-r from-orange-400 via-pink-400 to-violet-300"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              style={{ transformOrigin: 'left center' }}
            />

            <motion.p
              className="mt-5 max-w-[52ch] text-[1.0625rem] leading-[1.76] text-white/75"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            >
              Ik ontwerp en bouw digitale oplossingen die er professioneel uitzien, duidelijk werken en bijdragen aan groei. Van converterende websites en webshops tot maatwerk dashboards, koppelingen en automatisering.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
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

            {/* Trust cards */}
            <div className="mt-9 grid max-w-4xl gap-3.5 sm:grid-cols-3">
              {TRUST.map((item, i) => (
                <motion.div
                  key={item.title}
                  className="group relative min-h-[10rem] overflow-hidden rounded-2xl p-5"
                  style={{
                    background: 'rgba(255,255,255,0.055)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(18px) saturate(150%)',
                    WebkitBackdropFilter: 'blur(18px) saturate(150%)',
                    boxShadow: '0 14px 42px rgba(0,0,0,0.18), 0 1px 0 rgba(255,255,255,0.08) inset',
                  }}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.55 + i * 0.07 }}
                >
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-70"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.45), rgba(236,72,153,0.34), transparent)' }}
                  />
                  <div className="flex items-center justify-between gap-3">
                    <span className="gradient-text font-headline text-[1.42rem] font-extrabold leading-none tracking-[-0.02em]">
                      {item.value}
                    </span>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/[0.12] bg-white/[0.07] text-orange-200/90">
                      <item.icon size={17} />
                    </span>
                  </div>
                  <p className="mt-4 text-[1rem] font-semibold leading-tight text-white/90">
                    {item.title}
                  </p>
                  <p className="mt-2 text-[1rem] leading-relaxed text-white/62">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: photo card with 3D tilt ───────────────────── */}
          <div className="hidden lg:flex lg:flex-col lg:gap-3">
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
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            >
              {/* Ambient glow — reacts to tilt slightly */}
              <div
                className="pointer-events-none absolute -inset-8 rounded-[3rem] opacity-70 blur-3xl"
                style={{
                  background:
                    'radial-gradient(ellipse at 50% 30%, rgba(249,115,22,0.22), rgba(236,72,153,0.10) 50%, transparent 72%)',
                }}
              />

              {/* Card */}
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
    </section>
  )
}
