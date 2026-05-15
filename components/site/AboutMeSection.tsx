'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { fallbackReviews, personalContactPoints } from '@/lib/homepage-content'

const featuredQuote = fallbackReviews[0]

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
  return { ref, visible }
}

export default function AboutMeSection() {
  const section = useFadeIn(0.1)

  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-32">
      {/* Subtle ambient on white */}
      <div className="pointer-events-none absolute -top-20 right-[15%] h-72 w-72 rounded-full bg-pink-400/8 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-[5%] h-64 w-64 rounded-full bg-orange-400/8 blur-[90px]" />

      <div ref={section.ref} className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-18">

          {/* Photo — dark glass card op witte bg */}
          <div
            style={{
              opacity: section.visible ? 1 : 0,
              transform: section.visible ? 'translateY(0) rotate(-1.5deg)' : 'translateY(24px) rotate(-1.5deg)',
              transition: 'opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)',
            }}
            className="hover:[transform:rotate(0deg)!important] transition-[transform] duration-500"
          >
            <div className="relative mx-auto max-w-[28rem]">
              {/* Glow achter kaart */}
              <div
                className="pointer-events-none absolute -inset-6 rounded-[3rem] opacity-50 blur-3xl"
                style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(249,115,22,0.16), rgba(236,72,153,0.08) 50%, transparent 72%)' }}
              />
              {/* Dark glass card */}
              <div
                className="relative overflow-hidden rounded-[2rem] shadow-[0_32px_80px_rgba(0,0,0,0.18)]"
                style={{ border: '1px solid rgba(12,10,22,0.12)', background: 'rgba(12,10,22,0.88)', backdropFilter: 'blur(8px)' }}
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <Image
                  src="/Daan Koolhaas.jpg"
                  alt="Daan Koolhaas — WebsUp.nl"
                  width={640}
                  height={800}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#06040c]/95 via-[#06040c]/55 to-transparent px-6 pb-7 pt-24">
                  <p className="text-[0.6rem] font-bold uppercase tracking-[0.22em] text-orange-300/65">WebsUp.nl</p>
                  <p className="mt-2 text-[1.35rem] font-extrabold leading-tight tracking-[-0.02em] text-white">Daan Koolhaas</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[0.78rem] text-white/45">Design</span>
                    <span className="h-[3px] w-[3px] rounded-full bg-white/25" />
                    <span className="text-[0.78rem] text-white/45">Strategie</span>
                    <span className="h-[3px] w-[3px] rounded-full bg-white/25" />
                    <span className="text-[0.78rem] text-white/45">Techniek</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div
            style={{
              opacity: section.visible ? 1 : 0,
              transform: section.visible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.9s ease 0.12s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.12s',
            }}
          >
            <span className="overline-badge mb-5 inline-flex">Wie zit er achter WebsUp</span>
            <h2
              className="max-w-2xl font-headline font-extrabold leading-[1.04] tracking-[-0.04em] text-slate-900"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.6rem)' }}
            >
              Geen bureau.{' '}
              <span
                style={{
                  backgroundImage: 'linear-gradient(135deg, #f97316 0%, #ec4899 50%, #a78bfa 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Direct met Daan.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              Bij WebsUp werk je direct met mij. Geen accountmanager, geen lagen en geen onnodige ruis. Je legt je idee uit aan degene die ook met je meedenkt en het voor je bouwt.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-500">
              Ik denk niet alleen mee over hoe iets eruit moet zien, maar vooral over wat praktisch werkt voor jouw bedrijf. Soms is dat een website. Soms een webshop. En soms juist een maatwerk systeem.
            </p>

            {/* Dark glass chips op witte bg */}
            <div className="mt-8 flex flex-wrap gap-2.5">
              {personalContactPoints.map((point) => (
                <span
                  key={point}
                  className="rounded-full px-4 py-2 text-sm font-medium text-white/80"
                  style={{
                    background: 'rgba(12,10,22,0.88)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  {point}
                </span>
              ))}
            </div>

            {/* Dark glass quote card op witte bg */}
            {featuredQuote && (
              <div
                className="relative mt-7 overflow-hidden rounded-2xl p-5"
                style={{
                  background: 'rgba(12,10,22,0.88)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.14)',
                }}
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px"
                  style={{ background: 'linear-gradient(90deg, transparent, #f97316, #ec4899, transparent)', opacity: 0.4 }} />
                <div className="mb-3 h-0.5 w-8 rounded-full" style={{ background: 'linear-gradient(90deg, #f97316, #ec4899)' }} />
                <p className="text-[0.875rem] italic leading-relaxed text-white/55">
                  &ldquo;{featuredQuote.content}&rdquo;
                </p>
                <footer className="mt-3 text-xs font-semibold text-white/28">
                  {featuredQuote.name} &middot; {featuredQuote.role}
                </footer>
              </div>
            )}

            <div className="mt-8">
              <Link
                href="/over-ons"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
              >
                Meer over Daan
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
