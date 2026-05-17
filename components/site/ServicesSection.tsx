'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { homepageServices } from '@/lib/homepage-content'

function useFadeIn(threshold = 0.15) {
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
  return [ref, visible] as const
}

export default function ServicesSection() {
  const [headerRef, headerVisible] = useFadeIn(0.12)
  const [gridRef, gridVisible] = useFadeIn(0.08)

  return (
    <section className="relative overflow-hidden bg-[#f8f9fc] py-24 lg:py-32">
      {/* Subtle ambient blobs on light bg */}
      <div className="pointer-events-none absolute -top-20 left-[10%] h-72 w-72 rounded-full bg-orange-400/10 blur-[90px]" />
      <div className="pointer-events-none absolute -bottom-20 right-[10%] h-72 w-72 rounded-full bg-violet-400/10 blur-[90px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div
          ref={headerRef}
          className="mb-14 flex flex-col lg:flex-row lg:items-end lg:justify-between"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <div>
            <span className="overline-badge mb-5 inline-flex">Wat ik bouw</span>
            <h2
              className="max-w-2xl font-headline font-extrabold leading-[1.04] tracking-[-0.03em] text-slate-900"
              style={{ fontSize: 'clamp(2rem, 3.4vw, 3.1rem)' }}
            >
              Vier routes naar beter digitaal werk.
            </h2>
          </div>
          <p className="mt-4 max-w-[40ch] text-[1rem] leading-relaxed text-slate-500 lg:mt-0 lg:text-right">
            Van een zichtbare eerste indruk tot systemen die je dagelijkse werk simpeler maken.
          </p>
        </div>

        {/* Cards — dark glass op lichte achtergrond */}
        <div ref={gridRef} className="grid gap-4 lg:grid-cols-2">
          {homepageServices.map((service, i) => {
            const Icon = service.icon
            return (
              <ServiceCard
                key={service.title}
                service={service}
                Icon={Icon}
                index={i}
                visible={gridVisible}
              />
            )
          })}
        </div>

        {/* Bottom strip */}
        <div
          className="mt-10 flex flex-col gap-5 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between"
          style={{
            opacity: gridVisible ? 1 : 0,
            transition: 'opacity 0.8s ease 0.5s',
          }}
        >
          <p className="max-w-lg text-[1rem] leading-relaxed text-slate-500">
            Weet je nog niet precies wat je nodig hebt? Vaak begint het gewoon met een gesprek.
          </p>
          <Link href="/contact" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800">
            Vrijblijvend sparren
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}

function ServiceCard({
  service, Icon, index, visible,
}: {
  service: (typeof homepageServices)[number]
  Icon: React.ComponentType<{ size?: number }>
  index: number
  visible: boolean
}) {
  const [hovered, setHovered]       = useState(false)
  const cardRef                     = useRef<HTMLAnchorElement>(null)
  const shouldReduceMotion          = useReducedMotion()
  const rawX                        = useMotionValue(0)
  const rawY                        = useMotionValue(0)
  const spotX                       = useMotionValue(50)
  const spotY                       = useMotionValue(50)
  const x                           = useSpring(rawX, { stiffness: 170, damping: 22, mass: 0.7 })
  const y                           = useSpring(rawY, { stiffness: 170, damping: 22, mass: 0.7 })
  const spotlight                   = useMotionTemplate`radial-gradient(280px circle at ${spotX}% ${spotY}%, rgba(249,115,22,0.10) 0%, transparent 70%)`

  const onMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (shouldReduceMotion) return
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const nx   = ((e.clientX - rect.left) / rect.width)  * 100
    const ny   = ((e.clientY - rect.top)  / rect.height) * 100
    spotX.set(nx)
    spotY.set(ny)
    // Magnetic: pull max 6px toward cursor
    const mx = (e.clientX - rect.left - rect.width  / 2) / rect.width  * 6
    const my = (e.clientY - rect.top  - rect.height / 2) / rect.height * 6
    rawX.set(mx)
    rawY.set(my - 4)
  }

  const onMouseEnter = () => {
    setHovered(true)
    if (!shouldReduceMotion) rawY.set(-4)
  }

  const onMouseLeave = () => {
    setHovered(false)
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <Link
      ref={cardRef}
      href={service.href}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      className="group block rounded-2xl"
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.45s ease',
        transitionDelay: visible ? `${index * 70}ms` : '0ms',
      }}
    >
      <motion.div
        className="relative grid min-h-[22rem] overflow-hidden rounded-2xl md:grid-cols-[0.9fr_1.1fr]"
        style={{
          x,
          y,
          background: 'rgba(12,10,22,0.90)',
          border: `1px solid ${hovered ? 'rgba(249,115,22,0.22)' : 'rgba(255,255,255,0.10)'}`,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: hovered
            ? '0 24px 60px rgba(0,0,0,0.28), 0 0 40px rgba(249,115,22,0.08)'
            : '0 8px 32px rgba(0,0,0,0.14)',
          transition: hovered
            ? 'border-color 0.3s, box-shadow 0.3s, opacity 0.6s'
            : 'border-color 0.45s cubic-bezier(0.16,1,0.3,1), box-shadow 0.45s cubic-bezier(0.16,1,0.3,1)',
          willChange: 'transform',
        }}
      >
      {/* Cursor spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background: spotlight,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />
      {/* Top gradient line */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #f97316 30%, #ec4899 60%, #a78bfa 90%, transparent 100%)',
          opacity: hovered ? 0.8 : 0.30,
          transition: 'opacity 0.45s ease',
          position: 'absolute',
        }}
      />

      {/* Image side */}
      <div className="relative min-h-56 overflow-hidden md:min-h-full">
        <Image
          src={service.image}
          alt=""
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 45vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(6,4,12,0.80) 0%, rgba(6,4,12,0.30) 100%)' }}
        />
        <div
          className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300"
          style={{
            background: hovered ? 'rgba(249,115,22,0.18)' : 'rgba(255,255,255,0.08)',
            border: `1px solid ${hovered ? 'rgba(249,115,22,0.32)' : 'rgba(255,255,255,0.12)'}`,
          }}
        >
          <Icon size={17} />
        </div>
        <div className="absolute bottom-5 left-5 font-headline text-4xl font-extrabold tracking-[-0.04em] text-white/16">
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>

      {/* Content side */}
      <div className="relative flex flex-col justify-between p-7 md:p-8">
        <div
          className="pointer-events-none absolute inset-0 rounded-r-2xl transition-opacity duration-500"
          style={{
            background: 'radial-gradient(ellipse at 90% 10%, rgba(249,115,22,0.10) 0%, transparent 65%)',
            opacity: hovered ? 1 : 0.4,
          }}
        />
        <div className="relative">
          <h3
            className="font-headline text-[1.4rem] font-bold leading-tight tracking-[-0.02em] transition-colors duration-300"
            style={{ color: hovered ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.88)' }}
          >
            {service.title}
          </h3>
          <p
            className="mt-3 text-[1rem] leading-relaxed transition-colors duration-300"
            style={{ color: hovered ? 'rgba(255,255,255,0.58)' : 'rgba(255,255,255,0.42)' }}
          >
            {service.description}
          </p>
        </div>
        <span
          className="relative mt-8 inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-300"
          style={{ color: hovered ? '#f97316' : 'rgba(255,255,255,0.40)' }}
        >
          {service.cta}
          <ArrowRight
            size={13}
            style={{ transform: hovered ? 'translateX(4px)' : 'translateX(0)', transition: 'transform 0.3s ease' }}
          />
        </span>
      </div>
      </motion.div>
    </Link>
  )
}
