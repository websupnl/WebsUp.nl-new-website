export const revalidate = 3600

import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
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
  const featured = (featuredSource.length > 0 ? featuredSource : projects.slice(0, 3)).slice(0, 3)
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
        subtitle="Van websites en webshops tot portalen en praktische maatwerkoplossingen. Geen losse demo’s, maar werk dat echt gebruikt wordt."
      >
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-all hover:-translate-y-px hover:bg-white/90"
        >
          Project bespreken
          <ArrowRight size={14} />
        </Link>
      </WavePageHeader>

      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 divide-x divide-slate-100 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="px-6 py-7 text-center">
                <div className="font-headline text-xl font-extrabold text-slate-900 md:text-2xl">{stat.value}</div>
                <div className="mt-1 text-xs font-medium text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="mb-14 max-w-3xl">
            <span className="overline-badge mb-4 inline-flex">Uitgelichte projecten</span>
            <h2 className="font-headline text-4xl font-extrabold leading-[1.08] tracking-[-0.02em] text-slate-900 md:text-5xl">
              Werk dat past bij de praktijk.
            </h2>
          </Reveal>

          <div className="space-y-16">
            {featured.map((project, index) => (
              <Reveal key={project.slug} delay={index * 50}>
                <article className={`grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 ${index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                  <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100">
                    <Image
                      src={project.image_url}
                      alt={project.title}
                      width={1400}
                      height={900}
                      className="h-auto w-full object-cover"
                      sizes="(max-width: 1024px) 100vw, 55vw"
                    />
                  </div>

                  <div>
                    <span className="overline-badge mb-4 inline-flex">{project.category}</span>
                    <h3 className="font-headline text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                      {project.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">{project.excerpt}</p>

                    <div className="mt-6 space-y-2.5">
                      {project.highlights.slice(0, 3).map((highlight) => (
                        <div key={highlight} className="flex items-start gap-2.5 text-sm text-slate-600">
                          <CheckCircle size={16} className="mt-0.5 flex-shrink-0 text-orange-500" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <Link
                        href={`/projecten/${project.slug}`}
                        className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
                      >
                        Bekijk project
                        <ArrowRight size={14} />
                      </Link>
                      {project.website_url && (
                        <a
                          href={project.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                        >
                          Bekijk website
                          <ExternalLink size={14} />
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
        <section className="bg-slate-50 py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Reveal className="mb-10 max-w-3xl">
              <span className="overline-badge mb-4 inline-flex">Meer werk</span>
              <h2 className="font-headline text-3xl font-extrabold text-slate-900 md:text-4xl">
                Meer projecten, dezelfde lijn.
              </h2>
            </Reveal>

            <div className="divide-y divide-slate-200 rounded-[2rem] border border-slate-200 bg-white">
              {rest.map((project) => (
                <Reveal key={project.slug}>
                  <article className="grid gap-6 px-6 py-6 md:grid-cols-[12rem_1fr_auto] md:items-center md:px-8">
                    <div className="relative overflow-hidden rounded-[1.25rem] border border-slate-200 bg-slate-100">
                      <Image
                        src={project.image_url}
                        alt={project.title}
                        width={480}
                        height={320}
                        className="aspect-[4/3] h-auto w-full object-cover"
                        sizes="192px"
                      />
                    </div>

                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-500">{project.category}</div>
                      <h3 className="mt-2 font-headline text-2xl font-bold text-slate-900">{project.title}</h3>
                      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">{project.excerpt}</p>
                    </div>

                    <div className="flex flex-col gap-3 md:items-end">
                      <Link
                        href={`/projecten/${project.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition-colors hover:text-orange-500"
                      >
                        Bekijk project
                        <ArrowRight size={14} />
                      </Link>
                      {project.website_url && (
                        <a
                          href={project.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-slate-900"
                        >
                          Live website
                          <ExternalLink size={14} />
                        </a>
                      )}
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
