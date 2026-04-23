import Link from 'next/link'
import { Monitor, ShoppingCart, LayoutDashboard, Zap, ArrowRight, CheckCircle, LucideIcon } from 'lucide-react'
import { siteConfig } from '@/config/site.config'
import Reveal from '@/components/ui/Reveal'
import { ButtonLink, SectionLayout } from '@/components/site/design-system'

const iconMap: Record<string, LucideIcon> = { Monitor, ShoppingCart, LayoutDashboard, Zap }

const serviceSlug: Record<string, string> = {
  Websites: 'websites',
  Webshops: 'webshops',
  'Apps & dashboards': 'apps-dashboards',
  Automatisering: 'automatisering',
}

const outcomes = [
  'Duidelijke route voor bezoekers',
  'Sterke basis voor leads en aanvragen',
  'Ruimte om later verder te bouwen',
]

export default function ServicesSection() {
  return (
    <SectionLayout
      overline="Kies je route"
      title="Begin met wat nu nodig is."
      highlight="Bouw later verder"
      description="Soms is een sterke website genoeg. Soms vraagt je bedrijf om een webshop, klantportaal, dashboard of koppeling. De techniek volgt de vraag, niet andersom."
      actions={
        <>
          <ButtonLink href="/contact" variant="brand" className="px-7 py-3.5">
            Plan een kennismaking
          </ButtonLink>
          <ButtonLink href="/diensten" variant="outline" className="px-7 py-3.5">
            Alle diensten
          </ButtonLink>
        </>
      }
    >
      <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
        <Reveal>
          <div className="rounded-[var(--radius-lg)] border border-[var(--rule)] bg-[var(--surface)] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-500">
              Geen standaard pakket. Wel een aanpak die past.
            </p>
            <div className="mt-6 grid gap-3">
              {outcomes.map((outcome) => (
                <div key={outcome} className="flex items-start gap-2.5 text-sm font-medium text-slate-700">
                  <CheckCircle size={16} className="mt-0.5 shrink-0 text-orange-500" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
          {siteConfig.services.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Zap
            const slug = serviceSlug[service.title] ?? 'websites'

            return (
              <Reveal key={service.title} delay={i * 60}>
                <Link
                  href={`/diensten/${slug}`}
                  className="group grid gap-5 py-7 sm:grid-cols-[64px_1fr_auto] sm:items-start"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--brand-gradient-soft)] text-orange-600">
                    <Icon size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted-2)]">
                      {String(i + 1).padStart(2, '0')} / {service.title}
                    </div>
                    <h3 className="mt-2 text-2xl font-bold leading-tight text-slate-900 transition-colors group-hover:text-orange-500 md:text-3xl">
                      {service.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-500">
                      {service.description}
                    </p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--rule)] text-slate-400 transition-all group-hover:translate-x-1 group-hover:border-orange-200 group-hover:bg-slate-900 group-hover:text-white">
                    <ArrowRight size={16} />
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </SectionLayout>
  )
}
