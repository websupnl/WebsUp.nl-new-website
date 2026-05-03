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

// Per project copy overrides, vervangen de generieke excerpts uit de DB.
// Match op slug; valt terug op de DB-excerpt als er geen override is.
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

export default async function ProjectenPage() {
  const projects = await getProjects()
  const featuredSource = projects.filter((project) => project.featured)
  const featured = (featuredSource.length > 0 ? featuredSource : projects.slice(0, 4)).slice(0, 4)
  const featuredSlugs = new Set(featured.map((project) => project.slug))
  const rest = projects.filter((project) => !featuredSlugs.has(project.slug))

  const stats = [
    { value: `${projects.length}+`, label: 'Projecten opgeleverd' },
    { value: 'Heel Nederland', label: 'Werkgebied' },
    { value: 'Persoonlijk', label: 'Direct contact' },
    { value: 'Mobiel sterk', label: 'Klaar voor dagelijks gebruik' },
  ]

  return (
    <div>
      <WavePageHeader
        badge="Projecten"
        title="Werk dat"
        titleHighlight="voor zichzelf spreekt."
        subtitle="Van lokale ondernemers tot technische bedrijven en zorgpraktijken. Elk project begint met een goed gesprek en eindigt met iets dat echt werkt."
      >
        <Link href="/contact" className="btn-brand-gradient">
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
              <span className="gradient-text text-[11px] font-bold uppercase tracking-[0.14em]">
                Uitgelichte projecten
              </span>
              <h2 className="mt-3 font-headline max-w-2xl text-4xl md:text-5xl font-extrabold text-slate-900 leading-[1.08] tracking-[-0.02em]">
                Werk dat past bij de praktijk
              </h2>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-slate-500 md:text-lg lg:justify-self-end">
              Echt werk dat dagelijks gebruikt wordt. Geen demo&apos;s, geen geleende screenshots, wel projecten waar mensen mee verder kunnen.
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
                  </Link>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 inline-flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-slate-400">
                      <span className="h-2 w-2 rounded-full bg-orange-500" />
                      {project.category}
                    </div>
                    <h3 className="text-xl font-bold leading-tight text-slate-900 transition-colors group-hover:text-orange-500">
                      <Link href={`/projecten/${project.slug}`}>{project.title}</Link>
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-500">
                      {projectCopy(project.slug, project.excerpt)}
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
                      <div className="mb-4 inline-flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-slate-400">
                        <span className="h-2 w-2 rounded-full bg-orange-500" />
                        {project.category}
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">
                        {project.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-5">{projectCopy(project.slug, project.excerpt)}</p>
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
