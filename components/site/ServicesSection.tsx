'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Monitor, ShoppingCart, LayoutDashboard, Zap } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
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

const serviceIcons = [Monitor, ShoppingCart, LayoutDashboard, Zap]

export default function ServicesSection() {
  const [headerRef, headerVisible] = useFadeIn(0.12)
  const [gridRef, gridVisible] = useFadeIn(0.08)

  return (
    <section className="relative bg-[#f8f9fc] py-24 lg:py-32">
      <div className="relative mx-auto max-w-[1280px] px-7">

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

        {/* Cards */}
        <div
          ref={gridRef}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {homepageServices.map((service, i) => {
            const Icon = serviceIcons[i]
            return (
              <Link
                key={service.title}
                href={service.href}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#e8eaed] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-12px_rgba(20,22,26,.14)]"
                style={{
                  opacity: gridVisible ? 1 : 0,
                  transition: `opacity 0.45s ease ${i * 80}ms, transform 0.3s ease, box-shadow 0.3s ease`,
                }}
              >
                {/* Tag pill + icon */}
                <div className="px-5 pt-5">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#f0f0f8] px-3 py-1.5 text-[12.5px] font-semibold text-[#3b3f6b]">
                    <Icon size={13} className="shrink-0 text-orange-500" />
                    {service.title}
                  </span>
                </div>

                {/* Title + bullets */}
                <div className="px-5 pb-4 pt-4">
                  <h3 className="mb-3 text-[18px] font-bold leading-[1.25] tracking-[-0.01em] text-[#15181d]">
                    {service.description}
                  </h3>
                  <p className="text-[13px] leading-[1.55] text-[#6b7280]">
                    {service.bullets[0]} &bull; {service.bullets[1]}
                  </p>
                </div>

                {/* Image */}
                <div className="mt-auto px-4 pb-4">
                  <div className="relative overflow-hidden rounded-xl" style={{ aspectRatio: '4/3' }}>
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Bottom link */}
        <div
          className="mt-8 flex items-center justify-between border-t border-slate-200 pt-7"
          style={{
            opacity: gridVisible ? 1 : 0,
            transition: 'opacity 0.8s ease 0.4s',
          }}
        >
          <p className="text-[14px] text-slate-400">
            Niet zeker wat past? Ik denk graag mee.
          </p>
          <Link
            href="/projecten"
            className="inline-flex shrink-0 items-center gap-1.5 text-[14.5px] font-semibold text-[#15181d] transition-colors hover:text-orange-500"
          >
            Alle cases bekijken
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </section>
  )
}
