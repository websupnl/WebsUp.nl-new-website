'use client'

import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'
import { cn } from '@/lib/utils'

export type AnimatedTestimonial = {
  quote: string
  name: string
  designation: string
  rating?: number
}

export function AnimatedTestimonials({
  testimonials,
  autoplay = false,
  className,
}: {
  testimonials: AnimatedTestimonial[]
  autoplay?: boolean
  className?: string
}) {
  const [active, setActive] = useState(0)

  const safeTestimonials = useMemo(
    () => testimonials.filter((testimonial) => testimonial.quote && testimonial.name),
    [testimonials]
  )

  const handleNext = () => {
    setActive((prev) => (prev + 1) % safeTestimonials.length)
  }

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + safeTestimonials.length) % safeTestimonials.length)
  }

  useEffect(() => {
    if (!autoplay || safeTestimonials.length <= 1) return

    const interval = window.setInterval(() => {
      setActive((prev) => (prev + 1) % safeTestimonials.length)
    }, 5500)

    return () => window.clearInterval(interval)
  }, [autoplay, safeTestimonials.length])

  if (safeTestimonials.length === 0) return null

  const activeTestimonial = safeTestimonials[active]
  const rotationForIndex = (index: number) => ((index % 5) - 2) * 3

  return (
    <div className={cn('mx-auto w-full max-w-7xl px-6 lg:px-8', className)}>
      <div className="mx-auto max-w-3xl">
        <div className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-orange-500/10 via-pink-500/10 to-transparent blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.10)]">
            <div className="relative min-h-[32rem] overflow-hidden">
              <AnimatePresence mode="popLayout">
                {safeTestimonials.map((testimonial, index) => {
                  const isActive = index === active
                  const initials = testimonial.name
                    .split(' ')
                    .map((part) => part.charAt(0))
                    .join('')
                    .slice(0, 2)
                    .toUpperCase()

                  return (
                    <motion.div
                      key={`${testimonial.name}-${index}`}
                      initial={{
                        opacity: 0,
                        scale: 0.94,
                        rotate: rotationForIndex(index),
                        y: 24,
                      }}
                      animate={{
                        opacity: isActive ? 1 : 0.52,
                        scale: isActive ? 1 : 0.93,
                        rotate: isActive ? 0 : rotationForIndex(index),
                        y: isActive ? 0 : index > active ? 18 : -18,
                        zIndex: isActive ? 30 : safeTestimonials.length - index,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.94,
                        rotate: rotationForIndex(index) * -1,
                        y: -24,
                      }}
                      transition={{
                        duration: 0.45,
                        ease: 'easeInOut',
                      }}
                      className="absolute inset-0 origin-bottom"
                    >
                      <div className="relative flex h-full w-full flex-col overflow-hidden">
                        <div className="relative flex-1 overflow-hidden bg-[linear-gradient(135deg,#f97316_0%,#ec4899_52%,#06040c_100%)]">
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.24),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.18),transparent_30%)]" />
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#06040c]/80" />

                          <div className="relative flex h-full flex-col p-6 sm:p-8">
                            <div className="flex items-start justify-between gap-4">
                              <div className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                                Echte feedback
                              </div>
                              <div className="flex h-20 w-20 items-center justify-center rounded-[1.75rem] border border-white/20 bg-white/10 text-2xl font-extrabold tracking-[-0.04em] text-white backdrop-blur-md">
                                {initials}
                              </div>
                            </div>

                            <div className="mt-auto">
                              <div className="flex items-center gap-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    size={14}
                                    className={cn(
                                      'fill-current',
                                      i < (testimonial.rating ?? 5) ? 'text-orange-400' : 'text-white/25'
                                    )}
                                  />
                                ))}
                              </div>
                              <div className="mt-4 text-sm font-semibold text-white/95">{testimonial.name}</div>
                              <div className="text-sm text-white/65">{testimonial.designation}</div>
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-slate-100 bg-white p-6 sm:p-8">
                          <motion.div
                            key={`${activeTestimonial.name}-${active}`}
                            initial={{ y: 18, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -18, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                          >
                            <motion.p className="text-lg leading-relaxed text-slate-600">
                              {testimonial.quote.split(' ').map((word, wordIndex) => (
                                <motion.span
                                  key={`${word}-${wordIndex}`}
                                  initial={{ filter: 'blur(8px)', opacity: 0, y: 5 }}
                                  animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                                  transition={{
                                    duration: 0.18,
                                    ease: 'easeInOut',
                                    delay: 0.015 * wordIndex,
                                  }}
                                  className="inline-block"
                                >
                                  {word}&nbsp;
                                </motion.span>
                              ))}
                            </motion.p>
                          </motion.div>

                          <div className="mt-8 flex items-center gap-3">
                            <button
                              onClick={handlePrev}
                              className="group flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-all duration-200 hover:-translate-y-px hover:border-orange-200 hover:text-orange-500"
                              aria-label="Vorige testimonial"
                            >
                              <ChevronLeft size={18} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
                            </button>
                            <button
                              onClick={handleNext}
                              className="group flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-white transition-all duration-200 hover:-translate-y-px hover:bg-slate-800"
                              aria-label="Volgende testimonial"
                            >
                              <ChevronRight size={18} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                            </button>
                            <div className="ml-2 text-sm text-slate-400">
                              {String(active + 1).padStart(2, '0')} / {String(safeTestimonials.length).padStart(2, '0')}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
