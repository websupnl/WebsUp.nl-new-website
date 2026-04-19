import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Monitor, ShoppingCart, LayoutDashboard, Zap } from 'lucide-react'
import WavePageHeader from '@/components/site/WavePageHeader'
import Reveal from '@/components/ui/Reveal'
import CTASection from '@/components/site/CTASection'
import { services, serviceProcess } from '@/lib/site/services'

export const metadata: Metadata = {
  title: 'Diensten',
  description:
    'Websites, webshops, dashboards en automatisering van WebsUp. Persoonlijk gebouwd, technisch sterk en gericht op wat echt werkt.',
}

const iconMap = {
  Monitor,
  ShoppingCart,
  LayoutDashboard,
  Zap,
}

export default function DienstenPage() {
  return (
    <div>
      <WavePageHeader
        badge="Diensten"
        title="Digitale oplossingen"
        titleHighlight="die logisch werken."
        subtitle="Websites, webshops, dashboards en automatiseringen die aansluiten op hoe jouw bedrijf werkt. Geen standaard pakket, maar een route die past."
      >
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-150 hover:-translate-y-px hover:bg-white/90"
        >
          Plan een kennismaking
          <ArrowRight size={14} />
        </Link>
      </WavePageHeader>

      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="max-w-3xl">
            <span className="overline-badge mb-4 inline-flex">Wat ik bouw</span>
            <h2 className="font-headline text-4xl font-extrabold leading-[1.06] tracking-[-0.02em] text-slate-900 md:text-5xl">
              Geen rij losse diensten, maar onderdelen die op elkaar kunnen aansluiten.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Soms is een sterke website genoeg. Soms zit de winst juist in een webshop, dashboard of koppeling achter de schermen.
              Het doel is niet om zoveel mogelijk te bouwen, maar om de slimste stap te zetten.
            </p>
          </Reveal>

          <div className="mt-16 space-y-16">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon]

              return (
                <Reveal key={service.slug} delay={index * 40}>
                  <article className={`grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 ${index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-500">
                        {service.shortLabel}
                      </div>
                      <h3 className="mt-3 font-headline text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
                        {service.overviewTitle}
                      </h3>
                      <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
                        {service.overviewText}
                      </p>

                      <div className="mt-6 space-y-2.5 border-l-2 border-orange-200 pl-5">
                        {service.outcomes.slice(0, 2).map((outcome) => (
                          <div key={outcome.title}>
                            <div className="text-sm font-semibold text-slate-900">{outcome.title}</div>
                            <p className="mt-1 text-sm leading-relaxed text-slate-500">{outcome.text}</p>
                          </div>
                        ))}
                      </div>

                      <Link
                        href={`/diensten/${service.slug}`}
                        className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
                      >
                        Bekijk {service.title.toLowerCase()}
                        <ArrowRight size={14} />
                      </Link>
                    </div>

                    <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50">
                      <div className="grid gap-0 md:grid-cols-[0.92fr_1.08fr]">
                        <div className="relative min-h-[18rem] border-b border-slate-200 bg-slate-100 md:border-b-0 md:border-r">
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 40vw"
                          />
                        </div>

                        <div className="p-6 md:p-8">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-orange-500 shadow-sm">
                            <Icon size={18} />
                          </div>
                          <div className="mt-5 text-sm font-semibold text-slate-900">Typische onderdelen</div>
                          <div className="mt-4 space-y-3">
                            {service.deliverables.slice(0, 4).map((item) => (
                              <div key={item} className="border-b border-slate-200 pb-3 text-sm leading-relaxed text-slate-600 last:border-b-0 last:pb-0">
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <Reveal>
              <span className="overline-badge mb-4 inline-flex">Werkwijze</span>
              <h2 className="font-headline text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] text-slate-900 md:text-4xl">
                Kort schakelen, duidelijk bouwen.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-slate-600">
                Of het nu om een website, webshop of systeem gaat: het traject moet helder zijn, zonder onnodig gedoe of vage omwegen.
              </p>
            </Reveal>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-7 md:p-10">
              <div className="space-y-5">
                {serviceProcess.map((step, index) => (
                  <Reveal key={step} delay={index * 50}>
                    <div className="flex items-start gap-4 border-b border-slate-100 pb-5 last:border-b-0 last:pb-0">
                      <div
                        className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl text-sm font-bold text-white"
                        style={{ background: 'linear-gradient(135deg,#f97316 0%,#ec4899 55%,#a78bfa 100%)' }}
                      >
                        {index + 1}
                      </div>
                      <p className="pt-1 text-base leading-relaxed text-slate-600">{step}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  )
}
