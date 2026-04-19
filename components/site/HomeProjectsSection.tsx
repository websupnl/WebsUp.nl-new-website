import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import type { PortfolioProject } from '@/lib/projects/default-projects'

interface HomeProjectsSectionProps {
  projects: PortfolioProject[]
}

export default function HomeProjectsSection({ projects }: HomeProjectsSectionProps) {
  if (projects.length === 0) return null

  const featuredProjects = projects.slice(0, 3)

  return (
    <section className="bg-slate-50 py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-start gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <Reveal>
            <span className="overline-badge mb-4 inline-flex">Projecten</span>
            <h2 className="max-w-xl font-headline text-4xl font-extrabold leading-[1.06] tracking-[-0.02em] text-slate-900 md:text-5xl">
              Werk dat niet blijft hangen in alleen een mooi ontwerp.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
              Dit zijn geen losse experimenten of demo&rsquo;s. Het zijn websites en digitale oplossingen
              die gebruikt worden in de praktijk, door echte bedrijven met echte vragen.
            </p>

            <div className="mt-8 border-l-2 border-orange-200 pl-5">
              <div className="text-sm font-semibold text-slate-900">Waar het om draait</div>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Duidelijke structuur, een sterke uitstraling en genoeg ruimte om later verder te bouwen
                wanneer een bedrijf daar klaar voor is.
              </p>
            </div>

            <Link
              href="/projecten"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
            >
              Bekijk alle projecten
              <ArrowRight size={14} />
            </Link>
          </Reveal>

          <div className="space-y-6">
            {featuredProjects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 60}>
                <article className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white">
                  <div className="grid gap-0 md:grid-cols-[0.95fr_1.05fr]">
                    <div className="relative min-h-[16rem] border-b border-slate-200 bg-slate-100 md:border-b-0 md:border-r">
                      <Image
                        src={project.image_url}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 40vw"
                      />
                    </div>

                    <div className="p-6 md:p-8">
                      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-500">
                        {project.category}
                      </div>
                      <h3 className="mt-3 font-headline text-2xl font-bold leading-tight text-slate-900">
                        {project.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600">
                        {project.excerpt}
                      </p>

                      <div className="mt-5 space-y-2.5">
                        {project.highlights.slice(0, 2).map((highlight) => (
                          <div key={highlight} className="flex items-start gap-2.5 text-sm text-slate-600">
                            <CheckCircle size={15} className="mt-0.5 flex-shrink-0 text-orange-500" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>

                      <Link
                        href={`/projecten/${project.slug}`}
                        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition-colors hover:text-orange-500"
                      >
                        Bekijk project
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
