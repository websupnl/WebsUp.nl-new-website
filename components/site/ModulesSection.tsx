'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Calculator, Zap, LayoutDashboard } from 'lucide-react'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const MODULES = [
  {
    category: 'Interactieve tools',
    Icon: Calculator,
    title: 'Een calculator die bezoekers over de streep trekt.',
    description:
      'Laat potentiële klanten zelf hun situatie doorrekenen. Zo worden bezoekers actiever betrokken en is de stap naar contact veel kleiner.',
    bullets: [
      'Op maat gemaakt voor jouw product of dienst',
      'Direct zichtbaar op homepage of landingspagina',
      'Verhoogt betrokkenheid én conversie aantoonbaar',
    ],
    image: '/Projecten/thuisbatterijen_friesland_mockup.png',
    href: '/gratis-ontwerp',
    cta: 'Vrijblijvend aanvragen',
    accent: '#f97316',
  },
  {
    category: 'Slimme popups',
    Icon: Zap,
    title: 'Bezoekers omzetten naar klanten, automatisch.',
    description:
      'Op het juiste moment een slim bericht tonen maakt het verschil. Exit-intent, scroll-triggered of tijdgebonden — gebouwd zodat het werkt zonder te irriteren.',
    bullets: [
      'Gericht tonen op basis van gedrag en intent',
      'Volledig aanpasbaar en A/B-testbaar',
      'Werkt samen met je formulier of nieuwsbrief',
    ],
    image: '/Projecten/sinq_mockup.png',
    href: '/gratis-ontwerp',
    cta: 'Meer weten',
    accent: '#ec4899',
  },
  {
    category: 'Apps & dashboards',
    Icon: LayoutDashboard,
    title: 'Een systeem dat jouw werk dagelijks lichter maakt.',
    description:
      'Maatwerk dashboards, klantportalen en bedrijfsapplicaties — gebouwd op jouw werkproces, niet andersom. Koppelbaar met alles wat je al gebruikt.',
    bullets: [
      'Inzicht in je data zonder gedoe',
      'Koppelbaar met bestaande tools en systemen',
      'Voor intern gebruik of rechtstreeks voor jouw klanten',
    ],
    image: '/Projecten/jteq_mockup.png',
    href: '/gratis-ontwerp',
    cta: 'Vrijblijvend bespreken',
    accent: '#f97316',
  },
]

function ModuleBlock({
  mod,
  index,
}: {
  mod: (typeof MODULES)[number]
  index: number
}) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const isEven = index % 2 === 0
  const Icon   = mod.Icon

  const bgColor = isEven ? '#f8f9fc' : '#ffffff'

  return (
    <div
      ref={ref}
      className="border-t border-slate-100"
      style={{ background: bgColor }}
    >
      <div className={`mx-auto max-w-7xl px-6 lg:px-8 flex flex-col py-16 lg:py-0 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} lg:items-center lg:gap-16 lg:py-20`}>

        {/* Mockup image */}
        <motion.div
          className="flex-[1.5]"
          initial={{ opacity: 0, x: isEven ? -24 : 24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="group relative overflow-hidden rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.10)]"
            style={{ border: '1px solid rgba(0,0,0,0.07)' }}
          >
            <div className="relative min-h-[22rem] lg:min-h-[34rem]">
              <Image
                src={mod.image}
                alt={mod.title}
                fill
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>
            {/* Category chip on image */}
            <div className="absolute left-5 top-5">
              <span
                className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.18em]"
                style={{
                  background: 'rgba(6,4,12,0.82)',
                  border: '1px solid rgba(255,255,255,0.14)',
                  backdropFilter: 'blur(12px)',
                  color: mod.accent,
                }}
              >
                <Icon size={11} />
                {mod.category}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Text column */}
        <motion.div
          className="flex flex-[1] flex-col justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
        >
          <h3
            className="font-headline font-extrabold leading-[1.06] tracking-[-0.03em] text-slate-900"
            style={{ fontSize: 'clamp(1.7rem, 2.4vw, 2.4rem)' }}
          >
            {mod.title}
          </h3>
          <p className="mt-5 text-[1rem] leading-relaxed text-slate-500">
            {mod.description}
          </p>

          <ul className="mt-7 space-y-3">
            {mod.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <div
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                  style={{ background: `${mod.accent}18`, border: `1px solid ${mod.accent}40` }}
                >
                  <CheckCircle
                    size={12}
                    style={{ color: mod.accent }}
                  />
                </div>
                <span className="text-[1rem] leading-relaxed text-slate-700">{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Link
              href={mod.href}
              className="group/cta inline-flex items-center gap-2.5 rounded-full bg-slate-900 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
            >
              {mod.cta}
              <ArrowRight
                size={14}
                className="transition-transform duration-200 group-hover/cta:translate-x-1"
              />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function ModulesSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const inView    = useInView(headerRef, { once: true, margin: '-60px' })

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute top-32 right-[8%] h-72 w-72 rounded-full bg-orange-400/6 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-32 left-[6%] h-64 w-64 rounded-full bg-pink-400/6 blur-[90px]" />

      {/* Section header */}
      <motion.div
        ref={headerRef}
        className="relative mx-auto max-w-7xl px-6 pb-0 pt-24 lg:px-8 lg:pt-32"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="overline-badge mb-5 inline-flex">Uitbreidingen & modules</span>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <h2
            className="max-w-2xl font-headline font-extrabold leading-[1.04] tracking-[-0.035em] text-slate-900"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 3.25rem)' }}
          >
            Meer dan een website.{' '}
            <span
              style={{
                backgroundImage: 'linear-gradient(135deg, #f97316 0%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Slimmer gebouwd.
            </span>
          </h2>
          <p className="max-w-[38ch] text-[1rem] leading-relaxed text-slate-500 lg:text-right">
            Interactieve tools, slimme conversie-elementen en maatwerk systemen die écht bijdragen aan je bedrijf.
          </p>
        </div>
      </motion.div>

      {/* Alternating blocks */}
      <div className="mt-16 lg:mt-20">
        {MODULES.map((mod, i) => (
          <ModuleBlock key={mod.category} mod={mod} index={i} />
        ))}
      </div>

      {/* Footer strip */}
      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-12 lg:px-8 lg:pb-32">
        <div className="flex flex-col gap-5 border-t border-slate-100 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-lg text-[1rem] leading-relaxed text-slate-500">
            Weet je nog niet precies welke uitbreiding bij jou past? Dan denk ik graag even mee.
          </p>
          <Link
            href="/gratis-ontwerp"
            className="btn-brand-gradient inline-flex shrink-0 items-center gap-2"
          >
            Gratis ontwerp aanvragen
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
