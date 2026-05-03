'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle, MessageCircle, Sparkles } from 'lucide-react'

const trustItems = ['Direct contact met Daan', 'Persoonlijke aanpak', 'Maatwerk voor groei']

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-[#06040c]">
      <div className="absolute inset-0 overflow-hidden">
        <div className="hero-wave-bg absolute inset-[-8%]">
          <Image
            src="/hero-bg.png"
            alt=""
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
            quality={90}
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(110deg, rgba(6,4,12,0.94) 0%, rgba(6,4,12,0.84) 46%, rgba(6,4,12,0.60) 72%, rgba(6,4,12,0.42) 100%)',
          }}
        />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#06040c] to-transparent" />
      </div>

      <div className="relative flex flex-1 items-center px-6 pb-14 pt-28 sm:px-8 lg:px-10 lg:pb-20 lg:pt-32 xl:px-12">
        <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-xs font-semibold text-white/82 backdrop-blur-md">
              <Sparkles size={13} className="text-white/70" />
              Websites, webshops en maatwerk systemen
            </span>

            <h1
              className="max-w-4xl font-headline font-extrabold leading-[1.04] tracking-[-0.03em] text-white"
              style={{ fontSize: 'clamp(2.35rem, 5vw, 4.35rem)' }}
            >
              Websites en digitale systemen die{' '}
              <span className="gradient-text">echt voor je werken.</span>
            </h1>

            <p className="mt-7 max-w-[58ch] text-base leading-relaxed text-white/66 md:text-lg">
              Geen standaard website of los systeem, maar een digitale oplossing die past bij jouw bedrijf. Van een sterke website tot een slim dashboard, webshop of maatwerk app.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/gratis-ontwerp" className="btn-brand-gradient">
                Gratis ontwerp aanvragen
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-colors duration-150 hover:border-white/50 hover:bg-white/20"
              >
                Kennismaking plannen
              </Link>
            </div>

            <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
              {trustItems.map((item) => (
                <div key={item} className="flex min-h-14 items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 text-sm font-medium text-white/82 backdrop-blur-md">
                  <CheckCircle size={15} className="shrink-0 text-white/58" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div
                className="pointer-events-none absolute -inset-6 rounded-[2rem] opacity-80 blur-2xl"
                style={{
                  background: 'radial-gradient(closest-side, rgba(236,72,153,0.18), rgba(236,72,153,0) 70%)',
                }}
              />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/12 bg-white/5 shadow-2xl shadow-black/40">
                <Image
                  src="/Daan Koolhaas.jpg"
                  alt="Daan Koolhaas, eigenaar WebsUp.nl"
                  width={720}
                  height={900}
                  priority
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 1024px) 80vw, 480px"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#06040c]/86 via-[#06040c]/35 to-transparent p-6 pt-20">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <div className="font-headline text-xl font-bold text-white">Daan Koolhaas</div>
                      <div className="mt-1 text-sm text-white/68">Eigenaar WebsUp.nl</div>
                    </div>
                    <div className="hidden h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-sm sm:flex">
                      <MessageCircle size={18} />
                    </div>
                  </div>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/62">
                    Persoonlijk contact vanaf het eerste idee tot de oplevering.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-white/8" />
    </section>
  )
}
