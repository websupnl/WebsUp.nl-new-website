export const revalidate = 3600

import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle, ExternalLink } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import CTASection from '@/components/site/CTASection'
import WavePageHeader from '@/components/site/WavePageHeader'
import { LinkPreview } from '@/components/ui/link-preview'
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
          <Reveal className="mb-12 grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <span className="overline-badge mb-4 inline-flex">Uitgelichte projecten</span>
              <h2 className="font-headline max-w-2xl text-4xl md:text-5xl font-extrabold text-slate-900 leading-[1.08]">
                Werk dat past bij de praktijk
            </h2>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-slate-500 md:text-lg lg:justify-self-end">
              Dezelfde strakke kaartstijl als op de homepage, maar met meer ruimte om projecten naast elkaar te vergelijken.
            </p>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featured.map((project, index) => (
              <Reveal key={project.slug} delay={index * 50}>
                <article className="group feature-card flex h-full flex-col overflow-hidden">
                  <Link href={`/projecten/${project.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06040c]/35 via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full border border-white/45 bg-white/90 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-slate-700 backdrop-blur-sm">
                      {project.category}
                    </span>
                  </Link>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-bold leading-tight text-slate-900 transition-colors group-hover:text-orange-500">
                      <Link href={`/projecten/${project.slug}`}>{project.title}</Link>
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-500">
                      {project.excerpt}
                    </p>

                    <div className="mt-5 space-y-2.5">
                      {project.highlights.slice(0, 2).map((highlight) => (
                        <div key={highlight} className="flex items-start gap-2.5 text-sm text-slate-600">
                          <CheckCircle size={16} className="mt-0.5 text-orange-500 flex-shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto flex flex-wrap items-center gap-4 border-t border-slate-100 pt-5">
                      <Link
                        href={`/projecten/${project.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition-colors hover:text-orange-500"
                      >
                        Bekijk project <ArrowRight size={14} />
                      </Link>
                      {project.website_url && (
                        <LinkPreview
                          url={project.website_url}
                          isStatic
                          imageSrc={project.image_url}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-slate-900"
                        >
                          Bekijk site <ExternalLink size={14} />
                        </LinkPreview>
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
                  <article className="feature-card h-full overflow-hidden">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-56 object-cover"
                      loading="lazy"
                    />
                    <div className="p-7">
                      <span className="overline-badge mb-4 inline-flex">{project.category}</span>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">
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
                          <LinkPreview
                            url={project.website_url}
                            isStatic
                            imageSrc={project.image_url}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
                          >
                            Bekijk site <ExternalLink size={14} />
                          </LinkPreview>
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
