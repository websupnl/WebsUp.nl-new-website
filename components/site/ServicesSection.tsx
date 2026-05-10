import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import { homepageServices } from '@/lib/homepage-content'

export default function ServicesSection() {
  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <span className="overline-badge mb-5 inline-flex">Wat ik bouw</span>
            <h2
              className="max-w-3xl font-headline font-extrabold leading-[1.04] tracking-[-0.03em] text-slate-900"
              style={{ fontSize: 'clamp(2rem, 3.4vw, 3.1rem)' }}
            >
              Vier routes naar beter digitaal werk.
            </h2>
          </div>
          <p className="text-base leading-relaxed text-slate-600 md:text-lg lg:max-w-[44ch] lg:justify-self-end lg:text-right">
            Van een zichtbare eerste indruk tot systemen die je dagelijkse werk simpeler maken.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {homepageServices.map((service, i) => {
            const Icon = service.icon
            return (
              <Reveal key={service.title} delay={i * 70}>
                <Link
                  href={service.href}
                  data-cursor="active"
                  className="group grid min-h-[22rem] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-950/[0.04] transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-slate-950/[0.08] md:grid-cols-[0.9fr_1.1fr]"
                >
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
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(6,4,12,0.74) 0%, rgba(6,4,12,0.24) 100%)',
                      }}
                    />
                    <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/12 text-white backdrop-blur-md">
                      <Icon size={18} />
                    </div>
                    <div className="absolute bottom-5 left-5 font-headline text-4xl font-extrabold tracking-[-0.04em] text-white/24">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                  </div>

                  <div className="flex flex-col justify-between p-7 md:p-8">
                    <div>
                      <h3 className="font-headline text-3xl font-bold leading-tight tracking-[-0.03em] text-slate-900">
                        {service.title}
                      </h3>
                      <p className="mt-4 text-sm leading-relaxed text-slate-600">
                        {service.description}
                      </p>
                    </div>
                    <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 transition-all duration-150 group-hover:gap-2.5 group-hover:text-orange-600">
                      {service.cta}
                      <ArrowRight size={13} className="transition-transform duration-150 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={280}>
          <div className="mt-10 flex flex-col gap-5 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-lg text-sm leading-relaxed text-slate-500">
              Weet je nog niet precies wat je nodig hebt? Vaak begint het gewoon met een gesprek.
            </p>
            <Link href="/contact" className="btn-brand-gradient shrink-0 px-6 py-3 text-sm">
              Ik spar graag mee
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
