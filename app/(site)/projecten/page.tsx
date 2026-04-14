export const revalidate = 3600

import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle, ExternalLink } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import CTASection from '@/components/site/CTASection'
import WavePageHeader from '@/components/site/WavePageHeader'
import { getProjects } from '@/lib/queries/projects'

export const metadata: Metadata = {
  title: 'Projecten',
  description: 'Bekijk projecten van WebsUp: websites, webshops, portalen en maatwerkoplossingen die praktisch werken.',
}

export default async function ProjectenPage() {
  const projects = await getProjects()
  const featuredSource = projects.filter((project) => project.featured)
  const featured = (featuredSource.length > 0 ? featuredSource : projects.slice(0, 4)).slice(0, 4)
  const featuredSlugs = new Set(featured.map((project) => project.slug))
  const rest = projects.filter((project) => !featuredSlugs.has(project.slug))

  const stats = [
    { value: `${projects.length}+`, label: 'Projecten' },
    { value: 'Maatwerk', label: 'Geen standaard pakket' },
    { value: 'Korte lijnen', label: 'Direct schakelen' },
    { value: 'Mobiel sterk', label: 'Gebouwd voor dagelijks gebruik' },
  ]

  return (
    <div>
      <WavePageHeader
        badge="Portfolio"
        title="Projecten die"
        titleHighlight="laten zien hoe het werkt."
        subtitle="Van websites en webshops tot portalen en praktische maatwerkoplossingen. Geen losse demo's, maar werk dat echt gebruikt wordt."
      >
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-white text-slate-900 font-semibold text-sm px-6 py-3 rounded-full hover:-translate-y-px hover:bg-white/90 transition-all shadow-sm"
        >
          Project bespreken <ArrowRight size={14} />
        </Link>
      </WavePageHeader>

      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100">
            {stats.map((stat) => (
              <div key={stat.label} className="py-7 px-6 text-center">
                <div className="font-headline font-extrabold text-xl md:text-2xl text-slate-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="mb-14">
            <span className="overline-badge mb-4 inline-flex">Uitgelichte projecten</span>
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-slate-900 tracking-[-0.02em] leading-[1.08]">
              Werk dat past bij de praktijk.
            </h2>
          </Reveal>

          <div className="space-y-16">
            {featured.map((project, index) => (
              <Reveal key={project.slug} delay={index * 50}>
                <article className={`grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center ${index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                  <div className="relative">
                    <div className="absolute -inset-4 rounded-[2rem] bg-slate-100/70 blur-2xl" />
                    <div className="relative rounded-[1.75rem] overflow-hidden border border-slate-200 bg-slate-50">
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full aspect-[16/10] object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <div>
                    <span className="overline-badge mb-4 inline-flex">{project.category}</span>
                    <h3 className="font-headline text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                      {project.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed text-base md:text-lg mb-6">
                      {project.excerpt}
                    </p>

                    <div className="space-y-2.5 mb-8">
                      {project.highlights.slice(0, 3).map((highlight) => (
                        <div key={highlight} className="flex items-start gap-2.5 text-sm text-slate-600">
                          <CheckCircle size={16} className="mt-0.5 text-orange-500 flex-shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={`/projecten/${project.slug}`}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors"
                      >
                        Bekijk project <ArrowRight size={14} />
                      </Link>
                      {project.website_url && (
                        <a
                          href={project.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
                        >
                          Bekijk website <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {rest.length > 0 && (
        <section className="bg-slate-50 py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <Reveal className="mb-10">
              <h2 className="font-headline text-2xl md:text-3xl font-bold text-slate-900">
                Meer projecten
              </h2>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-6">
              {rest.map((project, index) => (
                <Reveal key={project.slug} delay={index * 40}>
                  <article className="h-full rounded-[1.5rem] border border-slate-200 bg-white overflow-hidden">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-56 object-cover"
                      loading="lazy"
                    />
                    <div className="p-7">
                      <span className="overline-badge mb-4 inline-flex">{project.category}</span>
                      <h3 className="font-headline text-2xl font-bold text-slate-900 mb-3">
                        {project.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-5">{project.excerpt}</p>
                      <div className="space-y-2 mb-6">
                        {project.highlights.slice(0, 2).map((highlight) => (
                          <div key={highlight} className="flex items-start gap-2 text-sm text-slate-600">
                            <CheckCircle size={15} className="mt-0.5 text-orange-500 flex-shrink-0" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <Link
                          href={`/projecten/${project.slug}`}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-orange-500 transition-colors"
                        >
                          Bekijk project <ArrowRight size={14} />
                        </Link>
                        {project.website_url && (
                          <a
                            href={project.website_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
                          >
                            Live website <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </div>
  )
}
