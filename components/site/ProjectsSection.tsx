import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle, ExternalLink } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import { LinkPreview } from '@/components/ui/link-preview'
import { defaultProjects, type PortfolioProject } from '@/lib/projects/default-projects'

interface ProjectsSectionProps {
  projects?: PortfolioProject[]
  title?: string
  subtitle?: string
  showViewAll?: boolean
  limit?: number
}

export default function ProjectsSection({
  projects = defaultProjects,
  title = 'Werk dat vertrouwen geeft voordat iemand contact opneemt',
  subtitle = 'Een paar voorbeelden van websites die duidelijk uitleggen, snel werken en passen bij de praktijk van de klant.',
  showViewAll = true,
  limit,
}: ProjectsSectionProps) {
  const source = projects.length > 0 ? projects : defaultProjects
  const featured = source.filter((project) => project.featured)
  const displayed = (featured.length > 0 ? featured : source).slice(0, limit ?? 3)

  if (displayed.length === 0) return null

  return (
    <section className="bg-slate-50 py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mb-8 grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <span className="overline-badge mb-4 inline-flex">Bewijs uit de praktijk</span>
            <h2 className="max-w-2xl font-headline text-4xl font-extrabold leading-[1.06] text-slate-900 md:text-5xl">
              {title}
            </h2>
          </div>
          <div className="lg:justify-self-end">
            <p className="max-w-xl text-base leading-relaxed text-slate-500 md:text-lg">
              {subtitle}
            </p>
            {showViewAll && (
              <Link
                href="/projecten"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
              >
                Bekijk alle projecten
                <ArrowRight size={14} />
              </Link>
            )}
          </div>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-3">
          {displayed.map((project, index) => (
            <Reveal key={project.slug} delay={index * 70}>
              <article className="group surface-card flex h-full flex-col overflow-hidden">
                <Link href={`/projecten/${project.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={project.image_url || '/hero-bg.png'}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06040c]/35 via-transparent to-transparent" />
                </Link>

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 inline-flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-slate-400">
                    <span className="h-2 w-2 rounded-full bg-orange-500" />
                    {project.category}
                  </div>
                  <h3 className="font-headline text-2xl font-bold leading-tight text-slate-900 transition-colors group-hover:text-orange-500">
                    <Link href={`/projecten/${project.slug}`}>{project.title}</Link>
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-500">
                    {project.excerpt}
                  </p>

                  <div className="mt-5 space-y-2.5">
                    {project.highlights.slice(0, 2).map((highlight) => (
                      <div key={highlight} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle size={15} className="mt-0.5 shrink-0 text-orange-500" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-wrap items-center gap-4 border-t border-slate-100 pt-5">
                    <Link
                      href={`/projecten/${project.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition-colors hover:text-orange-500"
                    >
                      Bekijk case
                      <ArrowRight size={14} />
                    </Link>
                    {project.website_url && (
                      <LinkPreview
                        url={project.website_url}
                        isStatic
                        imageSrc={project.image_url || '/hero-bg.png'}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-slate-900"
                      >
                        Bekijk site
                        <ExternalLink size={14} />
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
  )
}
