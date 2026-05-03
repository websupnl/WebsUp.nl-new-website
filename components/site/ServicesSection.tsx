import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import { homepageServices } from '@/lib/homepage-content'

export default function ServicesSection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <span className="overline-badge mb-5 inline-flex">Wat ik bouw</span>
            <h2 className="max-w-2xl font-headline text-4xl font-extrabold leading-[1.06] tracking-[-0.02em] text-slate-900 md:text-5xl">
              Wat wil je laten bouwen?
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg lg:justify-self-end">
            Van een professionele website tot een slim dashboard of maatwerk systeem. Ik help je met digitale oplossingen die duidelijk zijn, goed werken en passen bij jouw bedrijf.
          </p>
        </Reveal>

        <Reveal delay={70} className="mt-8 flex flex-wrap gap-2">
          <span className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
            Populaire keuzes
          </span>
          <Link
            href="/diensten"
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900"
          >
            Alle diensten
          </Link>
        </Reveal>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {homepageServices.map((service, index) => {
            const Icon = service.icon

            return (
              <Reveal key={service.title} delay={index * 60}>
                <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm shadow-slate-950/[0.03] transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-950/[0.06]">
                  <div className="flex items-start justify-between gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-900">
                      <Icon size={20} />
                    </div>
                    <Link
                      href={service.href}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-900 hover:text-slate-900"
                    >
                      {service.cta}
                      <ArrowRight size={13} />
                    </Link>
                  </div>

                  <h3 className="mt-6 font-headline text-2xl font-bold leading-tight text-slate-900">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-500">
                    {service.description}
                  </p>

                  <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600">
                        <CheckCircle size={15} className="mt-0.5 shrink-0 text-slate-400" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={280}>
          <div className="mt-10 flex flex-col gap-5 border-t border-slate-200 pt-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-sm leading-relaxed text-slate-500">
              Weet je nog niet precies wat je nodig hebt? Geen probleem. Vaak begint het met een idee, frustratie of proces dat slimmer kan.
            </p>
            <Link href="/contact" className="btn-brand shrink-0 px-6 py-3 text-sm">
              Ik spar graag mee
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
