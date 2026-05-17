'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const COMPARISONS = [
  {
    feature:  'Doel van de website',
    standard: 'Alleen online zichtbaar zijn',
    websup:   'Meer vertrouwen, aanvragen en groei',
  },
  {
    feature:  'Structuur',
    standard: "Pagina's vullen met tekst",
    websup:   'Een logische flow richting contact of verkoop',
  },
  {
    feature:  'Design',
    standard: 'Mooi uiterlijk',
    websup:   'Ontwerp dat past bij je merk en doelgroep',
  },
  {
    feature:  'Conversie',
    standard: 'Een knop naar contact',
    websup:   "Gerichte CTA's en secties die bezoekers meenemen",
  },
  {
    feature:  'Techniek',
    standard: 'Website staat online',
    websup:   'Snel, schaalbaar en makkelijk uit te breiden',
  },
  {
    feature:  'Maatwerk',
    standard: 'Beperkt tot standaard functies',
    websup:   'Tools, formulieren, dashboards en koppelingen',
  },
  {
    feature:  'Na oplevering',
    standard: 'Website is klaar',
    websup:   'Actieve partner die meedenkt, verbetert en doorontwikkelt',
  },
]

export default function ComparisonSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView   = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="pointer-events-none absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-violet-400/8 blur-[90px]" />
      <div className="pointer-events-none absolute -bottom-16 right-1/4 h-72 w-72 rounded-full bg-pink-400/8 blur-[80px]" />

      <div ref={sectionRef} className="relative mx-auto max-w-5xl px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="mb-14 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 22 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="overline-badge mb-4">De WebsUp aanpak</span>
          <h2
            className="font-headline font-extrabold leading-[1.06] tracking-[-0.03em] text-slate-900"
            style={{ fontSize: 'clamp(1.7rem, 3vw, 2.8rem)' }}
          >
            Van online visitekaartje naar digitale oplossing
          </h2>
          <p className="mt-5 max-w-[56ch] text-[1rem] leading-relaxed text-slate-500">
            Een website moet meer doen dan er goed uitzien. Hij moet je verhaal duidelijk maken, vertrouwen opbouwen en bezoekers helpen de juiste stap te zetten. Daarom kijk ik niet alleen naar design, maar ook naar strategie, conversie, techniek en de processen achter je bedrijf.
          </p>
        </motion.div>

        {/* App mockup window */}
        <motion.div
          className="liquid-glass-dark rounded-2xl"
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          {/* Window chrome */}
          <div className="liquid-glass-bar relative z-10 flex items-center gap-3 border-b px-5 py-3.5">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <span className="h-3 w-3 rounded-full bg-green-500/80" />
            <div className="liquid-glass-field mx-3 flex flex-1 items-center gap-2 rounded-md px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-green-400/60 flex-shrink-0" />
              <span className="text-[0.82rem] text-white/52 font-medium tracking-wide">Welke aanpak past bij jouw groei?</span>
            </div>
          </div>

          {/* Column headers */}
          <div className="relative z-10 grid grid-cols-3 border-b" style={{ background: 'rgba(255,255,255,0.035)', borderColor: 'rgba(255,255,255,0.10)' }}>
            <div className="px-6 py-4 lg:px-8" />
            <div className="px-6 py-4 lg:px-8" style={{ borderRight: '1px solid rgba(255,255,255,0.08)' }}>
              <p className="text-[0.9rem] font-semibold uppercase tracking-[0.12em] text-white/65">Standaard aanpak</p>
            </div>
            <div className="px-6 py-4 lg:px-8">
              <p className="text-[0.9rem] font-semibold uppercase tracking-[0.12em]" style={{ backgroundImage: 'linear-gradient(135deg, #f97316 0%, #ec4899 50%, #a78bfa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                WebsUp aanpak
              </p>
            </div>
          </div>

          {/* Rows — staggered reveal */}
          <div className="relative z-10">
            {COMPARISONS.map((comp, idx) => (
              <motion.div
                key={idx}
                className="grid grid-cols-3"
                initial={{ opacity: 0, x: -16 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.25 + idx * 0.07 }}
                style={{ borderBottom: idx < COMPARISONS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}
              >
                {/* Feature label */}
                <div className="px-6 py-4 lg:px-8">
                  <p className="text-[0.9375rem] font-semibold text-white/80">{comp.feature}</p>
                </div>

                {/* Standaard aanpak */}
                <div className="px-5 py-4 lg:px-7" style={{ borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                  <p className="text-[0.9375rem] leading-snug text-white/42">{comp.standard}</p>
                </div>

                {/* WebsUp aanpak */}
                <div
                  className="brand-gradient-wash px-5 py-4 lg:px-7"
                  style={{ borderLeft: '1px solid rgba(236,72,153,0.14)' }}
                >
                  <p className="text-[0.9375rem] font-medium leading-snug text-white/88">{comp.websup}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>

        {/* Pro tip */}
        <motion.div
          className="mt-8 rounded-xl px-6 py-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{ border: '1px solid rgba(167,139,250,0.22)', background: 'rgba(167,139,250,0.06)' }}
        >
          <p className="text-center text-[1rem] text-slate-700">
            <span className="font-semibold" style={{ backgroundImage: 'linear-gradient(135deg, #ec4899, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Geen verrassingen:</span>{' '}
            Je krijgt altijd een duidelijk voorstel voordat we iets bouwen. Samen bepalen we wat logisch is voor jouw bedrijf en jouw budget.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
