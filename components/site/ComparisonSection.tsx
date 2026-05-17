'use client'

import { CheckCircle2, X } from 'lucide-react'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const COMPARISONS = [
  { feature: 'Eén aanspreekpunt',        templates: false, websup: true,  impact: 'Korte lijnen, sneller schakelen, minder gedoe' },
  { feature: 'Past bij jouw bedrijf',    templates: false, websup: true,  impact: 'Geen standaard blokken, wel precies wat nodig is' },
  { feature: 'Gebouwd voor aanvragen',   templates: false, websup: true,  impact: 'Structuur, tekst en flow sturen op conversie' },
  { feature: 'Koppelingen met je tools', templates: false, websup: true,  impact: 'Minder handwerk, meer overzicht in je proces' },
  { feature: 'Meegroeien na livegang',   templates: false, websup: true,  impact: 'Doorontwikkelen zodra je bedrijf daarom vraagt' },
  { feature: 'Basis SEO op orde',        templates: true,  websup: true,  impact: 'Bij maatwerk scherper afgestemd op jouw markt' },
]

function WebsUpCheck({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 16,
        delay,
      }}
    >
      <motion.div
        animate={{ boxShadow: ['0 0 0px rgba(52,211,153,0)', '0 0 16px rgba(52,211,153,0.32)', '0 0 0px rgba(52,211,153,0)'] }}
        transition={{ duration: 0.8, delay: delay + 0.15, ease: 'easeOut' }}
        className="rounded-full"
      >
        <CheckCircle2 size={18} style={{ color: 'rgba(52,211,153,0.82)' }} />
      </motion.div>
    </motion.div>
  )
}

function TemplateCell({ value, delay }: { value: boolean; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay }}
      className="flex items-center justify-center"
    >
      {value
        ? <CheckCircle2 size={18} style={{ color: 'rgba(52,211,153,0.46)' }} />
        : <X size={18} strokeWidth={2} style={{ color: 'rgba(248,113,113,0.52)' }} />
      }
    </motion.div>
  )
}

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
          <span className="overline-badge mb-4">De verschillen</span>
          <h2
            className="font-headline font-extrabold leading-[1.06] tracking-[-0.03em] text-slate-900"
            style={{ fontSize: 'clamp(1.7rem, 3vw, 2.8rem)' }}
          >
            Template sites vs. maatwerk
          </h2>
          <p className="mt-5 max-w-[52ch] text-[0.95rem] leading-relaxed text-slate-500">
            Het verschil zit in resultaten, groei en hoe jouw bedrijf zich ontwikkelt.
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
              <p className="text-[0.9rem] font-semibold uppercase tracking-[0.12em] text-white/65">Standaard template</p>
            </div>
            <div className="px-6 py-4 lg:px-8">
              <p className="text-[0.9rem] font-semibold uppercase tracking-[0.12em]" style={{ backgroundImage: 'linear-gradient(135deg, #f97316 0%, #ec4899 50%, #a78bfa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Maatwerk voor groei
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
                {/* Feature */}
                <div className="px-6 py-4 lg:px-8">
                  <p className="text-[1rem] font-medium text-white/92">{comp.feature}</p>
                  <p className="mt-1 text-[0.88rem] leading-relaxed text-white/64">{comp.impact}</p>
                </div>

                {/* Template */}
                <div className="flex items-center justify-center px-6 py-4 lg:px-8" style={{ borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                  <TemplateCell value={comp.templates} delay={0.3 + idx * 0.07} />
                </div>

                {/* WebsUp */}
                <div
                  className={`flex items-center justify-center px-6 py-4 lg:px-8 ${comp.websup ? 'brand-gradient-wash' : ''}`}
                  style={{
                    borderLeft: comp.websup ? '1px solid rgba(236,72,153,0.18)' : '1px solid transparent',
                  }}
                >
                  {comp.websup
                    ? <WebsUpCheck delay={0.32 + idx * 0.07} />
                    : <TemplateCell value={false} delay={0.3 + idx * 0.07} />
                  }
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
          <p className="text-center text-[0.875rem] text-slate-700">
            <span className="font-semibold" style={{ backgroundImage: 'linear-gradient(135deg, #ec4899, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Pro tip:</span>{' '}
            De meeste bedrijven die ik help zagen 30–50% meer leads/conversies na 3 maanden. Niet omdat het mooier is — maar omdat alles om jouw groei draait.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
