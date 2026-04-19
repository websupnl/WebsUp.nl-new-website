import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, Monitor, ShoppingCart, LayoutDashboard, Zap } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import WavePageHeader from '@/components/site/WavePageHeader'
import CTASection from '@/components/site/CTASection'
import { getServiceBySlug, serviceProcess, services } from '@/lib/site/services'

const iconMap = {
  Monitor,
  ShoppingCart,
  LayoutDashboard,
  Zap,
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) return {}

  return {
    title: service.title,
    description: service.heroSubtitle,
  }
}

export default async function DienstDetailPage({ params }: Props) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) notFound()

  const Icon = iconMap[service.icon]
  const relatedServices = services.filter((item) => item.slug !== service.slug)

  return (
    <div>
      <WavePageHeader
        badge="Diensten"
        title={service.heroTitle}
        subtitle={service.heroSubtitle}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-all hover:-translate-y-px hover:bg-white/90"
          >
            Plan een kennismaking
            <ArrowRight size={14} />
          </Link>
          <Link
            href="/diensten"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            <ArrowLeft size={14} />
            Alle diensten
          </Link>
        </div>

        <div className="mt-7 flex flex-wrap gap-2">
          {service.highlights.map((item) => (
            <span
              key={item}
              className="inline-flex rounded-full border border-white/12 bg-white/8 px-3 py-1 text-xs font-semibold text-white/70"
            >
              {item}
            </span>
          ))}
        </div>
      </WavePageHeader>

      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-6 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16 lg:px-8">
          <Reveal>
            <span className="overline-badge mb-4 inline-flex">Wat dit oplost</span>
            <h2 className="max-w-xl font-headline text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] text-slate-900 md:text-4xl">
              Geen losse featurelijst, maar een oplossing die in de praktijk moet kloppen.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
              {service.overviewText}
            </p>

            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-500">
              <Icon size={15} className="text-orange-500" />
              {service.shortLabel} die technisch sterk staat en logisch voelt in gebruik
            </div>
          </Reveal>

          <div className="divide-y divide-slate-200 rounded-[2rem] border border-slate-200 bg-slate-50">
            {service.outcomes.map((outcome, index) => (
              <Reveal key={outcome.title} delay={index * 60}>
                <div className="px-6 py-6 md:px-8">
                  <h3 className="font-headline text-2xl font-bold text-slate-900">{outcome.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">{outcome.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
            <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="relative min-h-[22rem] border-b border-slate-200 bg-slate-100 lg:border-b-0 lg:border-r">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06040c]/75 via-[#06040c]/15 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
                  <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur-sm">
                    Praktisch opgebouwd
                  </div>
                  <p className="mt-4 max-w-lg text-base leading-relaxed text-white/72">
                    De opzet moet niet alleen vandaag logisch voelen, maar ook ruimte houden voor de volgende stap zodra je bedrijf verder groeit.
                  </p>
                </div>
              </div>

              <div className="p-7 lg:p-8">
                <div className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">Wat je nodig hebt</div>
                <h2 className="mt-4 font-headline text-3xl font-extrabold text-slate-900 md:text-4xl">
                  Onderdelen die het geheel sterker maken.
                </h2>
                <div className="mt-6 space-y-3">
                  {service.deliverables.map((item) => (
                    <div key={item} className="border-b border-slate-200 pb-3 text-sm leading-relaxed text-slate-600 last:border-b-0 last:pb-0">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.98fr_1.02fr]">
            <Reveal className="rounded-[2rem] bg-[#06040c] p-7 text-white lg:p-10">
              <span className="overline-badge mb-4 inline-flex">Wanneer dit past</span>
              <h2 className="font-headline text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] md:text-4xl">
                Deze route is vooral sterk als je duidelijkheid en grip wilt.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/66">
                Niet ieder bedrijf heeft dezelfde stap nodig. Daarom kijken we eerst naar je vraag, je huidige situatie en wat nu het meeste effect oplevert.
              </p>
            </Reveal>

            <Reveal className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7 lg:p-10">
              <div className="space-y-5">
                {service.fit.map((item, index) => (
                  <div key={item} className="flex items-start gap-4">
                    <div
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl text-sm font-bold text-white"
                      style={{ background: 'linear-gradient(135deg,#f97316 0%,#ec4899 55%,#a78bfa 100%)' }}
                    >
                      {index + 1}
                    </div>
                    <p className="pt-1 text-base leading-relaxed text-slate-600">{item}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="mb-12 max-w-3xl">
            <span className="overline-badge mb-4 inline-flex">Traject</span>
            <h2 className="font-headline text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] text-slate-900 md:text-4xl">
              Eerst scherp krijgen wat slim is. Daarna pas bouwen.
            </h2>
          </Reveal>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_18px_50px_rgba(15,23,42,0.05)] lg:p-10">
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
      </section>

      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="mb-10 max-w-3xl">
            <span className="overline-badge mb-4 inline-flex">Andere routes</span>
            <h2 className="font-headline text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] text-slate-900 md:text-4xl">
              Vaak sluit dit aan op wat er daarna nodig is.
            </h2>
          </Reveal>

          <div className="divide-y divide-slate-200 rounded-[2rem] border border-slate-200 bg-slate-50">
            {relatedServices.map((item) => (
              <Link
                key={item.slug}
                href={`/diensten/${item.slug}`}
                className="group flex items-start justify-between gap-6 px-6 py-5 transition-colors hover:bg-white md:px-8"
              >
                <div>
                  <div className="font-headline text-2xl font-bold text-slate-900 transition-colors group-hover:text-orange-500">
                    {item.title}
                  </div>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">
                    {item.navDescription}
                  </p>
                </div>
                <ArrowRight size={16} className="mt-1 flex-shrink-0 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-orange-500" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  )
}
