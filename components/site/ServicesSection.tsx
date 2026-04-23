import Link from 'next/link'
import Image from 'next/image'
import { Monitor, ShoppingCart, LayoutDashboard, Zap, ArrowRight, CheckCircle, LucideIcon } from 'lucide-react'
import { siteConfig } from '@/config/site.config'
import Reveal from '@/components/ui/Reveal'
import GradientIcon from '@/components/site/GradientIcon'

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
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-16 lg:gap-24 items-start">
          <Reveal>
            <span className="overline-badge mb-5 inline-flex">Kies je route</span>
            <h2 className="font-headline text-4xl font-extrabold leading-[1.04] tracking-[-0.03em] text-slate-900 md:text-6xl">
              Begin met wat nu nodig is
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-500 max-w-xl">
              Soms is een sterke website genoeg. Soms vraagt je bedrijf om een webshop, klantportaal, dashboard of koppeling. De techniek volgt de vraag, niet andersom.
            </p>
            
            <div className="mt-9 grid gap-3">
              {outcomes.map((outcome) => (
                <div key={outcome} className="flex items-start gap-2.5 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
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
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-6">
            {siteConfig.services.map((service, i) => {
              const Icon = iconMap[service.icon] ?? Zap
              const slug = serviceSlug[service.title] ?? 'websites'
              const img = serviceImages[service.title]
              
              return (
                <Reveal key={service.title} delay={i * 80}>
                  <Link
                    href={`/diensten/${slug}`}
                    className="group surface-card flex h-full flex-col overflow-hidden"
                  >
                  {/* Image Header */}
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    {img && (
                      <Image
                        src={img}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent" />

                    {/* Floating Icon */}
                    <GradientIcon icon={Icon} size="sm" className="absolute left-4 top-4" innerClassName="bg-white/95" />
                  </div>

                  {/* Content */}
                  <div className="p-7 flex-1 flex flex-col">
                    <h3 className="font-headline text-xl font-bold text-slate-900 group-hover:text-orange-500 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-slate-500 text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <div className="mt-auto pt-5 border-t border-slate-50 flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-orange-500 transition-colors">Details</span>
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-slate-900 transition-all duration-300 group-hover:translate-x-1">
                          <ArrowRight size={14} className="text-slate-400 group-hover:text-white" />
                      </div>
                    </div>
                  </div>
                  </Link>                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
