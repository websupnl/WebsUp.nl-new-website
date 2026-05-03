import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import type { PortfolioProject } from '@/lib/queries/projects'

interface ProjectsSectionProps {
  projects?: PortfolioProject[]
  limit?: number
}

const preferredProjects = [
  'decorservice-haak',
  'de-poortwacht',
  'prime-animalz',
  'verkeersschool-haak',
  'rottevalle',
]

const projectCopy: Record<string, {
  title?: string
  text: string
  bullets: string[]
}> = {
  'decorservice-haak': {
    title: 'Website voor Decorservice Haak',
    text: 'Een website met een professionele uitstraling, duidelijke structuur en genoeg ruimte om diensten en vakwerk goed te presenteren.',
    bullets: [
      'Duidelijke presentatie van diensten',
      'Rustige en betrouwbare uitstraling',
      'Gericht op herkenning en contact',
    ],
  },
  'de-poortwacht': {
    title: 'Website voor De Poortwacht',
    text: 'Een overzichtelijke website waarin sfeer, locatie en informatie op een rustige manier samenkomen.',
    bullets: [
      'Sterke visuele eerste indruk',
      'Duidelijke informatie voor bezoekers',
      'Passend bij de uitstraling van het bedrijf',
    ],
  },
  'prime-animalz': {
    title: 'Webshop voor Prime AnimalZ',
    text: 'Een webshop waarbij producten, merkgevoel en gebruiksgemak duidelijker samenkomen voor bezoekers.',
    bullets: [
      'Professionele productpresentatie',
      'Duidelijke webshopstructuur',
      'Basis voor verdere groei en optimalisatie',
    ],
  },
}

function pickProjects(projects: PortfolioProject[], limit: number) {
  const preferred = preferredProjects
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is PortfolioProject => Boolean(project))

  const rest = projects.filter((project) => !preferred.some((item) => item.slug === project.slug))
  return [...preferred, ...rest].slice(0, limit)
}

export default function ProjectsSection({ projects = [], limit = 3 }: ProjectsSectionProps) {
  if (projects.length === 0) return null

  const displayed = pickProjects(projects, limit)
  if (displayed.length === 0) return null

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <span className="overline-badge mb-5 inline-flex">Maatwerk in praktijk</span>
            <h2 className="max-w-3xl font-headline text-4xl font-extrabold leading-[1.06] tracking-[-0.02em] text-slate-900 md:text-5xl">
              Werk dat vertrouwen geeft voordat iemand contact opneemt
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg lg:justify-self-end">
            Een paar voorbeelden van websites en digitale oplossingen die ik heb gebouwd. Niet als standaard template, maar passend bij de uitstraling, doelgroep en doelen van de klant.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {displayed.map((project, index) => {
            const copy = projectCopy[project.slug]
            const bullets = copy?.bullets ?? project.highlights.slice(0, 3)

            return (
              <Reveal key={project.slug} delay={index * 70}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-950/[0.03] transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-950/[0.06]">
                  <Link href={`/projecten/${project.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-slate-100">
                    <Image
                      src={project.image_url || '/hero-bg.png'}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </Link>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-slate-400">
                      {project.category || 'Website'}
                    </div>
                    <h3 className="font-headline text-2xl font-bold leading-tight text-slate-900">
                      <Link href={`/projecten/${project.slug}`}>
                        {copy?.title ?? project.title}
                      </Link>
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-500">
                      {copy?.text ?? project.excerpt}
                    </p>

                    {bullets.length > 0 && (
                      <div className="mt-5 space-y-2.5">
                        {bullets.map((highlight) => (
                          <div key={highlight} className="flex items-start gap-2 text-sm text-slate-600">
                            <CheckCircle size={15} className="mt-0.5 shrink-0 text-slate-400" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-auto border-t border-slate-100 pt-5">
                      <Link
                        href={`/projecten/${project.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition-colors hover:text-slate-600"
                      >
                        Bekijk project
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={260}>
          <div className="mt-10 flex flex-col gap-5 border-t border-slate-200 pt-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-sm leading-relaxed text-slate-500">
              Wil je weten wat er voor jouw bedrijf mogelijk is? Dan kijk ik graag met je mee.
            </p>
            <Link href="/projecten" className="btn-brand shrink-0 px-6 py-3 text-sm">
              Bekijk alle projecten
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
