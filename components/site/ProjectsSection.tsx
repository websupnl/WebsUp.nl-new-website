import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle, ExternalLink } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import { defaultProjects, type PortfolioProject } from '@/lib/projects/default-projects'
import { ButtonLink, SectionLayout, SiteCard } from '@/components/site/design-system'

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
    <SectionLayout
      tone="surface"
      overline="Bewijs uit de praktijk"
      title={title}
      description={subtitle}
      actions={showViewAll ? (
        <ButtonLink href="/projecten" variant="dark">
          Bekijk alle projecten
          <ArrowRight size={14} />
        </ButtonLink>
      ) : undefined}
    >
        <div className="grid gap-5 lg:grid-cols-3">
          {displayed.map((project, index) => (
            <Reveal key={project.slug} delay={index * 70}>
              <SiteCard as="article" className="group flex h-full flex-col overflow-hidden">
                <Link href={`/projecten/${project.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={project.image_url || '/hero-bg.png'}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06040c]/35 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/45 bg-white/90 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-slate-700 backdrop-blur-sm">
                    {project.category}
                  </span>
                </Link>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-2xl font-bold leading-tight text-slate-900 transition-colors group-hover:text-orange-500">
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
                </div>
              </SiteCard>
            </Reveal>
          ))}
        </div>
    </SectionLayout>
  )
}
