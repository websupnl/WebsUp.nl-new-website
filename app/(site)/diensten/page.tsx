import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import WavePageHeader from '@/components/site/WavePageHeader'
import { Monitor, ShoppingCart, LayoutDashboard, Zap, ArrowRight, CheckCircle, LucideIcon } from 'lucide-react'
import { siteConfig } from '@/config/site.config'
import Reveal from '@/components/ui/Reveal'
import CTASection from '@/components/site/CTASection'
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

const serviceImages: Record<string, string> = {
  Websites: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=800&q=70',
  Webshops: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=70',
  'Apps & dashboards': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=70',
  Automatisering: 'https://images.unsplash.com/photo-1518432031352-d6fc5734c3d0?auto=format&fit=crop&w=800&q=70',
}

const techStack = [
  { name: 'Next.js', category: 'Frontend', tip: 'React-framework voor razendsnel laden en perfecte SEO. Gebruikt voor alle maatwerk websites en apps.' },
  { name: 'WordPress', category: 'CMS', tip: 'Het meest gebruikte CMS ter wereld. Ideaal voor sites die je zelf wil beheren.' },
  { name: 'Shopify', category: 'E-commerce', tip: 'Toonaangevend e-commerce platform. Klaar voor iDEAL, Mollie en internationale verkoop.' },
  { name: 'WooCommerce', category: 'E-commerce', tip: 'Webshop-plugin op WordPress. Flexibel en volledig aanpasbaar.' },
  { name: 'Supabase', category: 'Database', tip: 'Open-source Firebase-alternatief. Database, authenticatie en opslag in een.' },
  { name: 'n8n', category: 'Automatisering', tip: 'No-code automation tool. Koppel honderden apps zonder te programmeren.' },
  { name: 'Tailwind CSS', category: 'Frontend', tip: "Utility-first CSS framework. Snelle, consistente en responsive UI's." },
  { name: 'TypeScript', category: 'Frontend', tip: 'Getypeerde JavaScript. Minder bugs, betere code-kwaliteit en snellere ontwikkeling.' },
  { name: 'Vercel', category: 'Hosting', tip: 'Hostingplatform geoptimaliseerd voor Next.js. Wereldwijd CDN, automatische deploys.' },
  { name: 'Cloudflare', category: 'Hosting', tip: 'DNS, CDN en DDoS-beveiliging. Sneller en veiliger voor elke website.' },
  { name: 'Mollie', category: 'Betalen', tip: 'Nederlandse betaalprovider. iDEAL, creditcard, Klarna en meer in een integratie.' },
  { name: 'Docker', category: 'Infra', tip: 'Containerplatform voor consistente deployments. Zelfde omgeving lokaal als in productie.' },
]

const categoryColors: Record<string, string> = {
  Frontend: 'bg-orange-50 text-orange-600 border-orange-100',
  CMS: 'bg-pink-50 text-pink-600 border-pink-100',
  'E-commerce': 'bg-violet-50 text-violet-600 border-violet-100',
  Database: 'bg-blue-50 text-blue-600 border-blue-100',
  Automatisering: 'bg-amber-50 text-amber-600 border-amber-100',
  Hosting: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  Betalen: 'bg-teal-50 text-teal-600 border-teal-100',
  Infra: 'bg-slate-50 text-slate-600 border-slate-200',
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

      {/* Service cards — zelfde stijl als homepage */}
      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="mb-8 grid gap-8 lg:grid-cols-2 lg:items-start">
            <div>
              <span className="overline-badge mb-4 inline-flex">Wat ik bouw</span>
              <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-slate-900 leading-[1.08]">
                Kies jouw dienst, of combineer ze
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-slate-500">
                Vier heldere richtingen voor bedrijven die professioneel zichtbaar willen zijn, online willen verkopen of slimmer willen werken.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 lg:justify-end lg:pt-10">
              <Link href="/contact" className="btn-brand px-7 py-3.5 text-sm">
                Plan een kennismaking
              </Link>
              <Link href="/gratis-ontwerp" className="btn-ghost px-7 py-3.5 text-sm">
                Gratis ontwerp
              </Link>
            </div>
          </Reveal>

          <div className="grid gap-5 xl:grid-cols-4">
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

                    <div className="flex min-w-0 flex-1 flex-col p-6">
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
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="bg-white py-12 lg:py-16 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="mb-8 grid gap-8 lg:grid-cols-2 lg:items-end">
            <div>
              <span className="overline-badge mb-4 inline-flex">Tech stack</span>
              <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-slate-900 leading-[1.08] tracking-[-0.02em]">
                Tools die passen bij het doel
              </h2>
            </div>
            <p className="text-base leading-relaxed text-slate-500 lg:text-lg">
              De techniek is nooit het doel op zich. Wel belangrijk is dat de keuze past bij hoe jij werkt, wat je zelf wilt beheren en waar je later nog naartoe wilt kunnen groeien.
            </p>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {techStack.map((tech, i) => (
              <Reveal key={tech.name} delay={i * 35}>
                <div className="group flex flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.04)] transition-shadow hover:shadow-[0_4px_20px_rgba(15,23,42,0.08)]">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="font-semibold text-slate-900">{tech.name}</span>
                    <span className={`rounded-full border px-2 py-0.5 text-[0.65rem] font-semibold ${categoryColors[tech.category] ?? 'bg-slate-50 text-slate-500 border-slate-100'}`}>
                      {tech.category}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-400">{tech.tip}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  )
}
