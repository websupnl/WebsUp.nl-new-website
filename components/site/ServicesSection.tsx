import Link from 'next/link'
import Image from 'next/image'
import { Monitor, ShoppingCart, LayoutDashboard, Zap, ArrowRight, CheckCircle, LucideIcon } from 'lucide-react'
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

export default function ServicesSection() {
  const whatsappHref = createWhatsAppHref(
    siteConfig.phone,
    'Hoi Daan, ik heb een vraag over welke digitale oplossing het best past bij mijn bedrijf.'
  )

  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal className="mb-12 grid gap-8 lg:grid-cols-2 lg:items-start">
          <div>
            <span className="overline-badge mb-5 inline-flex">Kies je route</span>
            <h2 className="font-headline text-4xl font-extrabold leading-[1.04] tracking-[-0.03em] text-slate-900 md:text-5xl">
              Wat wil je laten bouwen?
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-500">
              Kies de oplossing die past bij je vraag. Een website, webshop, app of automatisering kan prima op zichzelf staan.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 lg:justify-end lg:pt-10">
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

                    <ul className="mt-5 space-y-2">
                      {service.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600">
                          <CheckCircle size={14} className="mt-0.5 shrink-0 text-orange-500" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              </Reveal>
            )
          })}

          <Reveal delay={320} className="xl:col-span-4">
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6">
              <p className="max-w-xl text-sm leading-relaxed text-slate-500">
                Ik ben Daan, de man achter WebsUp. Zoek je iets anders, of weet je nog niet precies welke oplossing past? Stuur mij een berichtje, dan denk ik met je mee.
              </p>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.857L.057 23.882a.75.75 0 0 0 .914.964l6.29-1.65A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.725 9.725 0 0 1-4.964-1.362l-.357-.21-3.706.972.988-3.61-.232-.373A9.713 9.713 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                </svg>
                Stuur een berichtje
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
