import { Metadata } from 'next'
import Link from 'next/link'
import WavePageHeader from '@/components/site/WavePageHeader'
import { Monitor, ShoppingCart, LayoutDashboard, Zap, ArrowRight, CheckCircle, LucideIcon } from 'lucide-react'
import { siteConfig } from '@/config/site.config'
import Reveal from '@/components/ui/Reveal'
import CTASection from '@/components/site/CTASection'
import { Tooltip } from '@/components/ui/tooltip-card'
import GradientIcon from '@/components/site/GradientIcon'

export const metadata: Metadata = {
  title: 'Diensten',
  description:
    'Websites, webshops, maatwerk apps, dashboards en automatisering. Persoonlijk gebouwd door Daan.',
}

const iconMap: Record<string, LucideIcon> = { Monitor, ShoppingCart, LayoutDashboard, Zap }

const serviceSlug: Record<string, string> = {
  Websites: 'websites',
  Webshops: 'webshops',
  'Apps & dashboards': 'apps-dashboards',
  Automatisering: 'automatisering',
}

const techStack = [
  { name: 'Next.js', tip: 'React-framework voor razendsnel laden en perfecte SEO. Gebruikt voor alle maatwerk websites en apps.' },
  { name: 'WordPress', tip: 'Het meest gebruikte CMS ter wereld. Ideaal voor sites die je zelf wil beheren.' },
  { name: 'Shopify', tip: 'Toonaangevend e-commerce platform. Klaar voor iDEAL, Mollie en internationale verkoop.' },
  { name: 'WooCommerce', tip: 'Webshop-plugin op WordPress. Flexibel en volledig aanpasbaar.' },
  { name: 'Supabase', tip: 'Open-source Firebase-alternatief. Database, authenticatie en opslag in een.' },
  { name: 'n8n', tip: 'No-code automation tool. Koppel honderden apps zonder te programmeren.' },
  { name: 'Tailwind CSS', tip: 'Utility-first CSS framework. Snelle, consistente en responsive UI\'s.' },
  { name: 'TypeScript', tip: 'Getypeerde JavaScript. Minder bugs, betere code-kwaliteit en snellere ontwikkeling.' },
  { name: 'Vercel', tip: 'Hostingplatform geoptimaliseerd voor Next.js. Wereldwijd CDN, automatische deploys.' },
  { name: 'Cloudflare', tip: 'DNS, CDN en DDoS-beveiliging. Sneller en veiliger voor elke website.' },
  { name: 'Mollie', tip: 'Nederlandse betaalprovider. iDEAL, creditcard, Klarna en meer in een integratie.' },
  { name: 'Docker', tip: 'Containerplatform voor consistente deployments. Zelfde omgeving lokaal als in productie.' },
]

export default function DienstenPage() {
  return (
    <div>
      <WavePageHeader
        badge="Diensten"
        title="Digitale oplossingen"
        titleHighlight="die werken."
        subtitle="Websites, webshops, apps en automatiseringen die aansluiten op hoe jouw bedrijf werkt."
      >
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-white text-slate-900 font-semibold text-sm px-6 py-3 rounded-full hover:-translate-y-px hover:bg-white/90 transition-all duration-150 shadow-sm"
        >
          Gratis kennismaking
          <ArrowRight size={14} />
        </Link>
      </WavePageHeader>

      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="mb-12 grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <span className="overline-badge mb-4 inline-flex">Wat ik bouw</span>
              <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-slate-900 leading-[1.08] max-w-xl">
                Kies jouw dienst, of combineer ze
              </h2>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-slate-500 md:text-lg lg:justify-self-end">
              Vier routes naast elkaar. Rustig genoeg om te scannen, met dezelfde glass- en gradient-accenten als de gratis ontwerp pagina.
            </p>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {siteConfig.services.map((service, i) => {
              const Icon = iconMap[service.icon] ?? Zap
              const slug = serviceSlug[service.title] ?? 'websites'

              return (
                <Reveal key={service.title} delay={i * 60}>
                  <Link
                    href={`/diensten/${slug}`}
                    className="group liquid-glass-light flex min-h-[360px] flex-col p-6 transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div className="flex flex-1 flex-col">
                      <div className="mb-6 flex items-start justify-between gap-4">
                        <GradientIcon icon={Icon} size="md" innerClassName="bg-white/90" />
                        <ArrowRight
                          size={16}
                          className="mt-2 flex-shrink-0 text-slate-400 transition-all duration-200 group-hover:translate-x-1 group-hover:text-orange-500"
                        />
                      </div>

                      <div className="mb-4">
                        <div className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                          0{i + 1}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">
                          {service.title}
                        </h3>
                      </div>

                      <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-500">
                        {service.description}
                      </p>

                      <ul className="space-y-2 border-t border-white/70 pt-5">
                        {service.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-2 text-sm text-slate-600">
                            <CheckCircle size={13} className="mt-0.5 flex-shrink-0 text-orange-400" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-14 lg:py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Tech stack - hover voor uitleg</p>
            <div className="flex flex-wrap gap-3">
              {techStack.map((tech) => (
                <Tooltip key={tech.name} content={tech.tip}>
                  <span className="px-4 py-2 rounded-full text-sm font-semibold bg-white border border-slate-200 text-slate-700 cursor-default hover:border-orange-200 hover:text-orange-600 hover:shadow-sm transition-all">
                    {tech.name}
                  </span>
                </Tooltip>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </div>
  )
}
