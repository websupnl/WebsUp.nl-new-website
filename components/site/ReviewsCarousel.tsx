'use client'

import { useState, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, useInView, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import type { TestimonialWithProject } from '@/lib/queries/testimonials'

function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

function AnimatedStars({ count = 5, delay = 0 }: { count?: number; delay?: number }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })
  const SIZE   = 68

  return (
    <div ref={ref} className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox={`0 0 ${SIZE} ${SIZE}`}>
          <defs>
            <linearGradient id={`sg-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={i < count ? '#FBBC05' : '#334155'} />
              <stop offset="100%" stopColor={i < count ? '#F59E0B' : '#334155'} />
            </linearGradient>
          </defs>
          <motion.path
            d="M34 4l8.4 17L62 23.6l-14 13.7 3.3 19.3L34 47.5 16.7 56.6 20 37.3 6 23.6l19.6-2.6L34 4z"
            fill="none"
            stroke={`url(#sg-${i})`}
            strokeWidth="4"
            strokeLinejoin="round"
            strokeLinecap="round"
            initial={{ pathLength: 0, fillOpacity: 0 }}
            animate={inView ? { pathLength: 1, fillOpacity: 1 } : {}}
            style={{ fill: i < count ? '#FBBC05' : '#334155' }}
            transition={{
              pathLength: { duration: 0.5, ease: 'easeOut', delay: delay + i * 0.08 },
              fillOpacity: { duration: 0.3, delay: delay + i * 0.08 + 0.35 },
            }}
          />
        </svg>
      ))}
    </div>
  )
}

function ReviewCard({ testimonial, index }: { testimonial: TestimonialWithProject; index: number }) {
  const cardRef            = useRef<HTMLDivElement>(null)
  const inView             = useInView(cardRef, { once: true, margin: '-40px' })
  const shouldReduceMotion = useReducedMotion()
  const rawRotateX         = useMotionValue(0)
  const rawRotateY         = useMotionValue(0)
  const rotateX            = useSpring(rawRotateX, { stiffness: 180, damping: 22, mass: 0.6 })
  const rotateY            = useSpring(rawRotateY, { stiffness: 180, damping: 22, mass: 0.6 })

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return
    const el   = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const nx   = (e.clientX - rect.left) / rect.width  - 0.5
    const ny   = (e.clientY - rect.top)  / rect.height - 0.5
    rawRotateX.set(ny * -5)
    rawRotateY.set(nx * 5)
  }

  const onMouseLeave = () => {
    rawRotateX.set(0)
    rawRotateY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className="group relative flex flex-col gap-5 rounded-2xl p-6"
      style={{
        background: 'rgba(12,10,22,0.90)',
        border: '1px solid rgba(255,255,255,0.10)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.22)',
        rotateX,
        rotateY,
        transformPerspective: 800,
        willChange: 'transform',
      }}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: shouldReduceMotion ? 0 : index * 0.08 }}
      whileHover={{
        boxShadow: '0 20px 56px rgba(0,0,0,0.40), 0 0 40px rgba(236,72,153,0.10)',
        borderColor: 'rgba(236,72,153,0.28)',
        y: shouldReduceMotion ? 0 : -3,
        transition: { type: 'spring', stiffness: 260, damping: 24, mass: 0.7 },
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Top gradient line */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl opacity-40 transition-opacity duration-500 group-hover:opacity-80"
        style={{ background: 'linear-gradient(90deg, transparent 0%, #f97316 30%, #ec4899 60%, #a78bfa 90%, transparent 100%)' }}
      />

      <AnimatedStars count={testimonial.rating ?? 5} delay={index * 0.08} />

      <p className="flex-1 text-[1rem] leading-relaxed text-white/72">
        &ldquo;{testimonial.content}&rdquo;
      </p>

      <div>
        <p className="text-[0.9375rem] font-semibold text-white/90">{testimonial.name}</p>
        <p className="mt-0.5 text-[0.875rem] text-white/52">
          {testimonial.role ?? 'Klant van WebsUp'} &middot;{' '}
          {new Date(testimonial.created_at).toLocaleDateString('nl-NL', { year: 'numeric', month: 'long' })}
        </p>
      </div>
    </motion.div>
  )
}

const VISIBLE = 3

export default function ReviewsCarousel({ testimonials }: { testimonials: TestimonialWithProject[] }) {
  const [offset, setOffset] = useState(0)
  const total   = testimonials.length
  const canPrev = offset > 0
  const canNext = offset + VISIBLE < total
  const avg     = total > 0
    ? (testimonials.reduce((sum, t) => sum + (t.rating ?? 5), 0) / total).toFixed(1)
    : '5.0'
  const visible = testimonials.slice(offset, offset + VISIBLE)

  return (
    <div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((t, i) => (
          <ReviewCard key={t.id} testimonial={t} index={i} />
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <GoogleLogo />
          <div>
            <div className="flex items-center gap-2">
              <AnimatedStars count={5} />
              <span className="text-[0.9375rem] font-semibold text-slate-900">Uitstekend</span>
            </div>
            <p className="mt-0.5 text-xs text-slate-400">
              {avg} &middot; Gebaseerd op {total} Google reviews
            </p>
          </div>
        </div>

        {(canPrev || canNext) && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOffset(Math.max(0, offset - 1))}
              disabled={!canPrev}
              aria-label="Vorige"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-orange-200 hover:text-orange-500 disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setOffset(Math.min(total - VISIBLE, offset + 1))}
              disabled={!canNext}
              aria-label="Volgende"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-orange-200 hover:text-orange-500 disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
