import Link from 'next/link'
import Image from 'next/image'
import { Monitor, ShoppingCart, LayoutDashboard, Zap, ArrowRight, CheckCircle, MessageCircle, LucideIcon } from 'lucide-react'
import { siteConfig } from '@/config/site.config'
import Reveal from '@/components/ui/Reveal'
import GradientIcon from '@/components/site/GradientIcon'
import { createWhatsAppHref } from '@/lib/utils'

const iconMap: Record<string, LucideIcon> = { Monitor, ShoppingCart, LayoutDashboard, Zap }

const serviceImages: Record<string, string> = {
  Websites:          'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=800&q=70',
  Webshops:          'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=70',
  'Apps & dashboards': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=70',
  Automatisering:    'https://images.unsplash.com/photo-1518432031352-d6fc5734c3d0?auto=format&fit=crop&w=800&q=70',
}

const serviceSlug: Record<string, string> = {
  Websites:          'websites',
  Webshops:          'webshops',
  'Apps & dashboards': 'apps-dashboards',
  Automatisering:    'automatisering',
}

const outcomes = [
  'Duidelijke route voor bezoekers',
  'Sterke basis voor leads en aanvragen',
  'Ruimte om later verder te bouwen',
]

export default function ServicesSection() {
  const whatsappHref = createWhatsAppHref(
    siteConfig.phone,
    'Hoi Daan, ik heb een vraag over welke digitale oplossing het best past bij mijn bedrijf.'
  )

  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal>
          <div className="max-w-3xl">
            <span className="overline-badge mb-5 inline-flex">Kies je route</span>
            <h2 className="font-headline text-4xl font-extrabold leading-[1.04] tracking-[-0.03em] text-slate-900 md:text-6xl">
              Wat wil je laten bouwen?
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-500">
              Kies de oplossing die past bij je vraag. Een website, webshop, app of automatisering kan prima op zichzelf staan.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              {outcomes.map((outcome) => (
                <div key={outcome} className="flex items-start gap-2.5 rounded-full border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                  <CheckCircle size={16} className="mt-0.5 shrink-0 text-orange-500" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="btn-brand px-7 py-3.5 text-sm"
              >
                Plan een kennismaking
              </Link>
              <Link
                href="/diensten"
                className="btn-ghost px-7 py-3.5 text-sm"
              >
                Alle diensten
              </Link>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-5 xl:grid-cols-4">
          {siteConfig.services.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Zap
            const slug = serviceSlug[service.title] ?? 'websites'
            const img = serviceImages[service.title]

            return (
              <Reveal key={service.title} delay={i * 70}>
                <Link
                  href={`/diensten/${slug}`}
                  className="group surface-card flex h-full flex-col overflow-hidden"
                >
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    {img && (
                      <Image
                        src={img}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1280px) 100vw, 25vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/65 via-slate-900/15 to-transparent" />
                    <GradientIcon icon={Icon} size="sm" className="absolute left-4 top-4" innerClassName="bg-white/95" />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col p-7">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-headline text-2xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-orange-500">
                        {service.title}
                      </h3>
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 transition-all duration-300 group-hover:border-slate-900 group-hover:bg-slate-900">
                        <ArrowRight size={17} className="text-slate-500 group-hover:text-white" />
                      </div>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-slate-500">
                      {service.description}
                    </p>

                    <div className="mt-6 grid gap-2">
                      {service.bullets.map((bullet) => (
                        <div
                          key={bullet}
                          className="flex items-start gap-2 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700"
                        >
                          <CheckCircle size={15} className="mt-0.5 shrink-0 text-orange-500" />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Link>
              </Reveal>
            )
          })}

          <Reveal delay={320} className="xl:col-span-4">
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6">
              <p className="max-w-xl text-sm leading-relaxed text-slate-500">
                Zoek je iets anders, of weet je nog niet precies welke oplossing past? Stuur mij kort een berichtje, dan denk ik met je mee.
              </p>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition-colors hover:border-orange-200 hover:text-orange-500"
              >
                <MessageCircle size={15} />
                Stuur een berichtje
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
