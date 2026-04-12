import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ExternalLink, CheckCircle } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import CTASection from '@/components/site/CTASection'
import WavePageHeader from '@/components/site/WavePageHeader'
import ConnectBanner from '@/components/site/ConnectBanner'

export const metadata: Metadata = {
  title: 'Projecten',
  description: 'Bekijk de projecten die WebsUp gebouwd heeft — websites, webshops, apps en dashboards.',
}

const projects = [
  {
    id: 'bp-uitgevers',
    title: 'BP Uitgevers',
    category: 'Website & CMS',
    description:
      'Volledig maatwerk website met CMS, nieuwsbeheer, publicatiemodule en admin dashboard. Gebouwd op Next.js + Supabase — volledig beheerbaar zonder developer.',
    tags: ['Next.js', 'Supabase', 'TypeScript', 'Admin CMS'],
    result: 'Live — volledig beheerbaar CMS',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=900&q=70',
    accent: '#f97316',
    featured: true,
  },
  {
    id: 'weso-narrowcasting',
    title: 'Weso NarrowCasting',
    category: 'SaaS Platform',
    description:
      'SaaS-platform voor digital signage. Schermen, playlists en content centraal beheren via een modern dashboard. Multi-tenant architectuur.',
    tags: ['Next.js', 'SaaS', 'Real-time', 'Dashboard'],
    result: 'Volledig functioneel multi-tenant platform',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=70',
    accent: '#a78bfa',
    featured: true,
  },
  {
    id: 'thuisbatterijen',
    title: 'Thuisbatterijen Friesland',
    category: 'SEO Landingspagina',
    description:
      'Lokale SEO-landingspagina voor thuisbatterijen, EMS en laadpalen. Gebouwd op React + Vite + Cloudflare Pages. Geoptimaliseerd voor lokaal zoekverkeer.',
    tags: ['React', 'Vite', 'SEO', 'Cloudflare'],
    result: 'Lokale leads via organisch zoekverkeer',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&q=70',
    accent: '#10b981',
    featured: false,
  },
  {
    id: 'webshop-klant',
    title: 'Maatwerk Webshop',
    category: 'Webshop',
    description:
      'WooCommerce webshop met maatwerk thema, Mollie betaalintegratie en geautomatiseerde orderverwerking. Conversiegericht design.',
    tags: ['WordPress', 'WooCommerce', 'Mollie', 'Maatwerk'],
    result: '+34% conversie na redesign',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=70',
    accent: '#ec4899',
    featured: false,
  },
]

const stats = [
  { value: '94+', label: 'Klanten geholpen' },
  { value: '5★', label: 'Gemiddelde review' },
  { value: '100%', label: 'Maatwerk' },
  { value: '<24u', label: 'Reactietijd' },
]

export default function ProjectenPage() {
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <div>
      <WavePageHeader
        badge="Portfolio"
        title="Projecten die"
        titleHighlight="voor zich spreken."
        subtitle="Van lokale MKB tot maatwerk SaaS-platform. Elk project persoonlijk gebouwd en begeleid."
      >
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-white text-slate-900 font-semibold text-sm px-6 py-3 rounded-full hover:-translate-y-px hover:bg-white/90 transition-all shadow-sm"
        >
          Jouw project bespreken <ArrowRight size={14} />
        </Link>
      </WavePageHeader>

      {/* Stats balk */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100">
            {stats.map((s) => (
              <div key={s.label} className="py-7 px-6 text-center">
                <div
                  className="font-headline font-extrabold text-2xl mb-1"
                  style={{
                    background: 'linear-gradient(135deg,#f97316 0%,#ec4899 50%,#a78bfa 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {s.value}
                </div>
                <div className="text-xs text-slate-400 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured projects */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="mb-14">
            <span className="overline-badge mb-4 inline-flex">Uitgelichte projecten</span>
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-slate-900 tracking-[-0.02em] leading-[1.08]">
              Recent werk.
            </h2>
          </Reveal>

          <div className="space-y-6">
            {featured.map((project, i) => (
              <Reveal key={project.id} delay={i * 60}>
                <div className={`group grid lg:grid-cols-2 gap-0 rounded-[1.75rem] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                  {/* Image */}
                  <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[360px] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute top-5 left-5">
                      <span className="px-3 py-1 rounded-full text-xs font-bold text-white border border-white/30 bg-black/30 backdrop-blur-sm">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Text */}
                  <div className="flex flex-col justify-center p-10 lg:p-14 bg-white">
                    <div
                      className="w-8 h-1 rounded-full mb-6"
                      style={{ background: `linear-gradient(90deg,${project.accent},#ec4899)` }}
                    />
                    <h3 className="font-headline text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed mb-6 text-base">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2.5 py-1 bg-slate-50 text-slate-600 rounded-full border border-slate-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-emerald-600">
                      <CheckCircle size={15} />
                      {project.result}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* More projects grid */}
      {rest.length > 0 && (
        <section className="bg-slate-50 py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <Reveal className="mb-10">
              <h2 className="font-headline text-2xl font-bold text-slate-900">Meer projecten</h2>
            </Reveal>
            <div className="grid md:grid-cols-2 gap-5">
              {rest.map((project, i) => (
                <Reveal key={project.id} delay={i * 60}>
                  <div className="group bg-white rounded-[1.5rem] overflow-hidden border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="px-2.5 py-1 rounded-full text-[0.65rem] font-bold text-white border border-white/30 bg-black/25 backdrop-blur-sm">
                          {project.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-7">
                      <div
                        className="w-6 h-1 rounded-full mb-4"
                        style={{ background: `linear-gradient(90deg,${project.accent},#ec4899)` }}
                      />
                      <h3 className="font-headline text-xl font-bold text-slate-900 mb-2">{project.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tags.map((tag) => (
                          <span key={tag} className="text-xs px-2.5 py-1 bg-slate-50 text-slate-500 rounded-full border border-slate-100">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                        <CheckCircle size={12} />
                        {project.result}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        heading="Jouw project is het volgende."
        subheading="Vertel me waar je mee bezig bent. Ik denk mee en adviseer eerlijk — ook als iets anders beter past."
      />
    </div>
  )
}
