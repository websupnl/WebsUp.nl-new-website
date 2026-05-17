'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Plus } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from '@/components/ui/Reveal'
import { homepageFaq } from '@/lib/homepage-content'

interface FAQSectionProps {
  limit?: number
  showPageLink?: boolean
  sectionClassName?: string
  hideHeading?: boolean
}

const glassItem =
  'group relative rounded-2xl overflow-hidden transition-colors duration-200'

const glassItemStyle: React.CSSProperties = {
  background: 'rgba(12,10,22,0.90)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.10)',
}

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={glassItem} style={glassItemStyle}>
      {/* Brand gradient top-border — only visible when open */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="top-border"
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
              background: 'linear-gradient(90deg, #f97316, #ec4899, #a78bfa)',
            }}
            initial={{ opacity: 0, scaleX: 0.6 }}
            animate={{ opacity: 1, scaleX: 1 }}
            exit={{ opacity: 0, scaleX: 0.6 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full cursor-pointer items-start justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-headline text-base font-bold leading-tight md:text-lg" style={{ color: 'rgba(255,255,255,0.88)' }}>
          {question}
        </span>
        <Plus
          size={18}
          className="mt-1 shrink-0 transition-transform duration-200"
          style={{
            color: 'rgba(255,255,255,0.45)',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ opacity: 0, height: 0, y: -4 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -4 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <p
              className="px-6 pb-5 pt-0 text-base leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.62)' }}
            >
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQSection({
  limit,
  showPageLink = false,
  sectionClassName = 'bg-white py-16 lg:py-24',
  hideHeading = false,
}: FAQSectionProps) {
  const items = typeof limit === 'number' ? homepageFaq.slice(0, limit) : homepageFaq

  if (hideHeading) {
    return (
      <section className={sectionClassName}>
        <div className="mx-auto max-w-3xl space-y-3 px-6 lg:px-8">
          {items.map((item, index) => (
            <Reveal key={item.question} delay={index * 30}>
              <AccordionItem question={item.question} answer={item.answer} />
            </Reveal>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className={sectionClassName}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <span className="overline-badge mb-5 inline-flex">FAQ</span>
            <h2 className="max-w-xl font-headline text-4xl font-extrabold leading-[1.08] tracking-[-0.02em] text-slate-900 md:text-4xl">
              Veelgestelde vragen
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-500 md:text-lg">
              Twijfel je nog of WebsUp bij je past? Hieronder beantwoord ik alvast een paar vragen die vaak terugkomen.
            </p>

            {/* "Staat jouw vraag er niet tussen?" — dark glass card */}
            <div
              className="mt-8 rounded-2xl overflow-hidden p-6"
              style={{
                background: 'rgba(12,10,22,0.90)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.10)',
              }}
            >
              <div className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.88)' }}>
                Staat jouw vraag er niet tussen?
              </div>
              <p className="mt-2 text-[1rem] leading-relaxed" style={{ color: 'rgba(255,255,255,0.62)' }}>
                Stuur hem gerust door. Vaak is kort sparren sneller dan blijven zoeken.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100"
                >
                  Stel je vraag
                  <ArrowRight size={14} />
                </Link>
                {showPageLink && (
                  <Link
                    href="/veelgestelde-vragen"
                    className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors"
                    style={{
                      border: '1px solid rgba(255,255,255,0.18)',
                      color: 'rgba(255,255,255,0.80)',
                    }}
                  >
                    Alle vragen
                  </Link>
                )}
              </div>
            </div>
          </Reveal>

          <div className="space-y-3">
            {items.map((item, index) => (
              <Reveal key={item.question} delay={index * 45}>
                <AccordionItem question={item.question} answer={item.answer} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
