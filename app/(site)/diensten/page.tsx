import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
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

/* Placeholder images per dienst (Unsplash) */
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

      {/* Service cards */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="mb-14">
            <span className="overline-badge mb-4 inline-flex">Wat ik bouw</span>
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-slate-900 tracking-[-0.02em] leading-[1.08] max-w-xl">
              Kies jouw dienst — of combineer ze.
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {siteConfig.services.map((service, i) => {
              const Icon = iconMap[service.icon] ?? Zap
              const slug = serviceSlug[service.title] ?? 'websites'
              const img = serviceImages[service.title]
              return (
                <Reveal key={service.title} delay={i * 60}>
                  <Link
                    href={`/diensten/${slug}`}
                    className="group flex flex-col bg-white border border-slate-100 rounded-[1.5rem] overflow-hidden hover:border-orange-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden bg-slate-100">
                      {img && (
                        <Image
                          src={img}
                          alt={service.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                      {/* Icon badge */}
                      <GradientIcon icon={Icon} size="sm" className="absolute left-4 top-4" innerClassName="bg-white/95" />
                    </div>

                    {/* Body */}
                    <div className="p-7 flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-headline text-xl font-bold text-slate-900 tracking-tight">
                          {service.title}
                        </h3>
                        <ArrowRight
                          size={16}
                          className="text-slate-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0 mt-1"
                        />
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed mb-5 flex-1">
                        {service.description}
                      </p>
                      <ul className="space-y-2">
                        {service.bullets.map((b) => (
                          <li key={b} className="flex items-center gap-2 text-sm text-slate-600">
                            <CheckCircle size={13} className="text-orange-400 flex-shrink-0" />
                            {b}
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

      {/* Tech stack sectie */}
      <section className="bg-slate-50 py-14 lg:py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Tech stack — hover voor uitleg</p>
            <div className="flex flex-wrap gap-3">
              {[
                { name: 'Next.js', tip: 'React-framework voor razendsnel laden en perfecte SEO. Gebruikt voor alle maatwerk websites en apps.' },
                { name: 'WordPress', tip: 'Het meest gebruikte CMS ter wereld. Ideaal voor sites die je zelf wil beheren.' },
                { name: 'Shopify', tip: 'Toonaangevend e-commerce platform. Klaar voor iDEAL, Mollie en internationale verkoop.' },
                { name: 'WooCommerce', tip: 'Webshop-plugin op WordPress. Flexibel en volledig aanpasbaar.' },
                { name: 'Supabase', tip: 'Open-source Firebase-alternatief. Database, authenticatie en opslag in één.' },
                { name: 'n8n', tip: 'No-code automation tool. Koppel honderden apps zonder te programmeren.' },
                { name: 'Tailwind CSS', tip: 'Utility-first CSS framework. Snelle, consistente en responsive UI\'s.' },
                { name: 'TypeScript', tip: 'Getypeerde JavaScript. Minder bugs, betere code-kwaliteit en snellere ontwikkeling.' },
                { name: 'Vercel', tip: 'Hostingplatform geoptimaliseerd voor Next.js. Wereldwijd CDN, automatische deploys.' },
                { name: 'Cloudflare', tip: 'DNS, CDN en DDoS-beveiliging. Sneller en veiliger voor elke website.' },
                { name: 'Mollie', tip: 'Nederlandse betaalprovider. iDEAL, creditcard, Klarna en meer in één integratie.' },
                { name: 'Docker', tip: 'Containerplatform voor consistente deployments. Zelfde omgeving lokaal als in productie.' },
              ].map((tech) => (
                <Tooltip key={tech.name} content={tech.tip}>
                  <span className="px-4 py-2 rounded-full text-sm font-semibold bg-white border border-slate-200 text-slate-700 cursor-default hover:border-slate-300 hover:shadow-sm transition-all">
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
