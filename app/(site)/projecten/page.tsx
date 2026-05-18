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

const projectExcerptOverrides: Record<string, string> = {
  'verkeerschool-haak':
    'Een overzichtelijke website die het lesaanbod en de pakketten helder presenteert. Gebouwd op een manier die de rijschool zelf eenvoudig kan bijhouden.',
  'rottevalle': 'Een dorpswebsite die inwoners en bezoekers informeert over nieuws, evenementen en verenigingen. Beheerbaar door vrijwilligers, fijn voor iedereen.',
  'rottevalle-com': 'Een dorpswebsite die inwoners en bezoekers informeert over nieuws, evenementen en verenigingen. Beheerbaar door vrijwilligers, fijn voor iedereen.',
  'context-care-isa':
    'Een rustige, toegankelijke website voor een specialistische zorgpraktijk. Het vertrouwen dat deze doelgroep nodig heeft, vertaald naar design en tekst.',
  'dansschool-feel-the-move':
    'Een energieke website die past bij de sfeer van de dansschool. Het lesaanbod overzichtelijk, de energie voelbaar.',
  'rondom-verlies':
    'Een warme, betekenisvolle website voor een bijzondere dienst. Rust en empathie als uitgangspunt voor elke ontwerpkeuze.',
  'azie': 'Een overzichtelijke website voor een Aziatisch afhaalrestaurant. Menu snel vindbaar, contact makkelijk, mobiel perfect.',
  'azie-drachten': 'Een overzichtelijke website voor een Aziatisch afhaalrestaurant. Menu snel vindbaar, contact makkelijk, mobiel perfect.',
  'peter-kalsbeek-coaching':
    'Een persoonlijke website voor een coachingspraktijk gericht op jeugd en gezin. Toegankelijk, warm en gericht op vertrouwen.',
  'goldcenterdrachten':
    'Een website die de belofte van eerlijk advies en kwaliteit goed vangt. Clubfitting centraal, assortiment overzichtelijk.',
  'golfcenter-drachten':
    'Een website die de belofte van eerlijk advies en kwaliteit goed vangt. Clubfitting centraal, assortiment overzichtelijk.',
  'thuisbatterijen-friesland':
    'Een lokale SEO-landingspagina gericht op zichtbaarheid en aanvragen rondom thuisbatterijen, EMS en laadpalen in Friesland.',
  'bigband-drachten':
    'Een website waar sfeer, optredens en praktische informatie samenkomen. Voor bezoekers én bandleden.',
  'camperhulp':
    'Een duidelijke website voor een servicebedrijf. Diensten direct helder, contact makkelijk, mobiel sterk.',
  'de-kapper-drachten':
    'Een frisse website die behandelingen en sfeer overzichtelijk laat zien. Vertrouwen uitstralen zonder poespas.',
  'gemar-schuttingen':
    'Een praktische website die projecten, diensten en aanvragen overzichtelijk samenbrengt.',
  'jteq':
    'Een strakke zakelijke website voor een technisch bedrijf. Dienstverlening en betrouwbaarheid helder gepresenteerd.',
  'kloppenburg-vloerreiniging':
    'Een website die diensten en werkwijze duidelijk maakt voor particuliere en zakelijke aanvragen.',
  'mce':
    'Een compacte zakelijke website met heldere structuur en professionele uitstraling.',
  'sinq':
    'Een moderne zakelijke website die professionaliteit uitstraalt en de dienstverlening in duidelijke taal presenteert.',
}

function projectCopy(slug: string, fallback: string) {
  return projectExcerptOverrides[slug] ?? fallback
}

const ACCENT_COLORS = ['#f97316', '#ec4899', '#a78bfa', '#f97316']

export default async function ProjectenPage() {
  const projects = await getProjects()
  const featuredSource = projects.filter((project) => project.featured)
  const featured = (featuredSource.length > 0 ? featuredSource : projects.slice(0, 4)).slice(0, 4)
  const featuredSlugs = new Set(featured.map((project) => project.slug))
  const rest = projects.filter((project) => !featuredSlugs.has(project.slug))

  const stats = [
    { value: `${projects.length}+`, label: 'Projecten opgeleverd' },
    { value: 'Heel NL', label: 'Werkgebied' },
    { value: '5.0 ⭐', label: 'Google rating' },
    { value: 'Persoonlijk', label: 'Direct contact' },
  ]

  return (
    <div>
      <WavePageHeader
        badge="Projecten"
        title="Werk dat"
        titleHighlight="voor zichzelf spreekt."
        subtitle="Van lokale ondernemers tot technische bedrijven. Elk project gebouwd op wat jouw bedrijf nodig heeft — niet op een standaard template."
        heightClass="min-h-[56vh]"
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="btn-brand-gradient">
            Project bespreken <ArrowRight size={14} />
          </Link>
          <Link
            href="/gratis-ontwerp"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:border-white/50 hover:bg-white/20"
          >
            Gratis ontwerp aanvragen
          </Link>
        </div>
      </WavePageHeader>

      {/* Stats */}
      <div className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 divide-x divide-slate-100 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="px-6 py-7 text-center">
                <div className="font-headline text-2xl font-extrabold tracking-[-0.03em] text-slate-900 md:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs font-medium text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured projects */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="mb-12 grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <span className="overline-badge mb-4 inline-flex">Uitgelichte projecten</span>
              <h2
                className="font-headline font-extrabold leading-[1.06] tracking-[-0.035em] text-slate-900"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
              >
                Werk dat past bij de praktijk.
              </h2>
            </div>
            <p className="max-w-xl text-[1.0625rem] leading-relaxed text-slate-500 lg:justify-self-end">
              Geen demo&apos;s, geen geleende screenshots — echte projecten die dagelijks gebruikt worden.
            </p>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featured.map((project, index) => (
              <Reveal key={project.slug} delay={index * 55}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-200 hover:shadow-lg">
                  <Link
                    href={`/projecten/${project.slug}`}
                    className="relative block aspect-[16/10] overflow-hidden bg-slate-100"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06040c]/30 via-transparent to-transparent" />
                    {/* Gradient line on top on hover */}
                    <div
                      className="pointer-events-none absolute inset-x-0 top-0 h-0.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ background: `linear-gradient(90deg, transparent, ${ACCENT_COLORS[index % 4]}, transparent)` }}
                    />
                  </Link>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 inline-flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-slate-400">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: ACCENT_COLORS[index % 4] }}
                      />
                      {project.category}
                    </div>

                    <h3 className="font-headline text-lg font-bold leading-tight text-slate-900 transition-colors group-hover:text-orange-500">
                      <Link href={`/projecten/${project.slug}`}>{project.title}</Link>
                    </h3>

                    <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-slate-500">
                      {projectCopy(project.slug, project.excerpt)}
                    </p>

                    <div className="mt-4 space-y-2">
                      {project.highlights.slice(0, 2).map((highlight) => (
                        <div key={highlight} className="flex items-start gap-2.5 text-[0.875rem] text-slate-600">
                          <CheckCircle size={14} className="mt-0.5 shrink-0 text-orange-500" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-slate-100 pt-4">
                      <Link
                        href={`/projecten/${project.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 transition-colors hover:text-orange-500"
                      >
                        Bekijk project <ArrowRight size={13} />
                      </Link>
                      {project.website_url && (
                        <LinkPreview
                          url={project.website_url}
                          isStatic
                          imageSrc={project.image_url}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400 transition-colors hover:text-slate-700"
                        >
                          Live site <ExternalLink size={13} />
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

      {/* Meer projecten */}
      {rest.length > 0 && (
        <section className="bg-[#f8f9fc] py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Reveal className="mb-10">
              <span className="overline-badge mb-4 inline-flex">Meer werk</span>
              <h2
                className="font-headline font-extrabold leading-[1.06] tracking-[-0.035em] text-slate-900"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}
              >
                Meer projecten
              </h2>
            </Reveal>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((project, index) => (
                <Reveal key={project.slug} delay={index * 40}>
                  <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                    <Link href={`/projecten/${project.slug}`} className="block">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    </Link>
                    <div className="p-6">
                      <div className="mb-3 inline-flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-slate-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                        {project.category}
                      </div>
                      <h3 className="font-headline text-lg font-bold text-slate-900 transition-colors group-hover:text-orange-500">
                        {project.title}
                      </h3>
                      <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-slate-500">
                        {projectCopy(project.slug, project.excerpt)}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-3">
                        <Link
                          href={`/projecten/${project.slug}`}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-800 transition-colors hover:text-orange-500"
                        >
                          Bekijk project <ArrowRight size={13} />
                        </Link>
                        {project.website_url && (
                          <LinkPreview
                            url={project.website_url}
                            isStatic
                            imageSrc={project.image_url}
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400 transition-colors hover:text-slate-700"
                          >
                            Live site <ExternalLink size={13} />
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
