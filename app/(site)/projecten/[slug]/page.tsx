export const revalidate = 3600

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle, ExternalLink, Star } from 'lucide-react'
import CTASection from '@/components/site/CTASection'
import Reveal from '@/components/ui/Reveal'
import WavePageHeader from '@/components/site/WavePageHeader'
import { LinkPreview } from '@/components/ui/link-preview'
import { getAllProjectSlugs, getProjectBySlug } from '@/lib/queries/projects'
import { getTestimonialByProjectId } from '@/lib/queries/testimonials'

interface Props {
  params: Promise<{ slug: string }>
}

function looksLikeHtml(value: string) {
  return /<[a-z][\s\S]*>/i.test(value)
}

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) return {}

  return {
    title: project.title,
    description: project.excerpt,
    openGraph: {
      title: project.title,
      description: project.excerpt,
      images: project.image_url ? [project.image_url] : [],
    },
  }
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0] ?? '')
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) notFound()

  const testimonial = project.id ? await getTestimonialByProjectId(project.id) : null

  const plainParagraphs = project.content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)

  return (
    <div>
      <WavePageHeader
        badge={project.category}
        title={project.title}
        subtitle={project.excerpt}
        heightClass="min-h-[52vh]"
      >
        <div className="flex flex-wrap items-center gap-3">
          {project.website_url && (
            <LinkPreview
              url={project.website_url}
              isStatic
              imageSrc={project.image_url}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              Bekijk site <ExternalLink size={14} />
            </LinkPreview>
          )}
          <Link
            href="/projecten"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:border-white/50 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/45"
          >
            <ArrowLeft size={14} />
            Alle projecten
          </Link>
        </div>
      </WavePageHeader>

      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-start">
          <Reveal>
            <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50">
              <img
                src={project.image_url}
                alt={project.title}
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={60}>
            <div className="space-y-8">
              <div>
                <span className="overline-badge mb-4 inline-flex">Project highlights</span>
                <div className="space-y-3">
                  {project.highlights.map((highlight) => (
                    <div key={highlight} className="flex items-start gap-3 text-slate-600">
                      <CheckCircle size={18} className="mt-0.5 text-orange-500 flex-shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <p className="max-w-md text-sm leading-relaxed text-slate-500">
                  Zit je met een vergelijkbaar vraagstuk? Dan kijk ik mee naar de snelste logische stap voor jouw bedrijf.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-200"
                  >
                    Even sparren <ArrowRight size={14} />
                  </Link>
                  <Link
                    href="/diensten"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-orange-300 hover:text-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-100"
                  >
                    Bekijk diensten
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {project.screenshot_url && (
        <section className="bg-slate-50 py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Reveal>
              <div className="mb-8 max-w-3xl">
                <span className="gradient-text text-[11px] font-bold uppercase tracking-[0.14em]">
                  Fullpage screenshot
                </span>
                <h2 className="mt-3 font-headline text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] text-slate-900 md:text-4xl">
                  De pagina in zijn geheel
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-500 md:text-lg">
                  Een actuele snapshot van de live website, los van de omslagfoto hierboven.
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white">
                <div className="flex h-10 items-center gap-2 border-b border-slate-200 bg-slate-50 px-4">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  {project.website_url && (
                    <span className="ml-3 truncate text-xs font-medium text-slate-400">
                      {project.website_url}
                    </span>
                  )}
                </div>
                <div className="max-h-[72vh] overflow-y-auto bg-white">
                  <img
                    src={project.screenshot_url}
                    alt={`Fullpage screenshot van ${project.title}`}
                    className="h-auto w-full"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section className="bg-slate-50 py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Reveal>
            <span className="overline-badge mb-4 inline-flex">Over dit project</span>
            <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-8">
              Van vraagstuk naar praktische oplossing
            </h2>
          </Reveal>

          <Reveal delay={50}>
            {looksLikeHtml(project.content) ? (
              <div
                className="prose-content"
                dangerouslySetInnerHTML={{ __html: project.content }}
              />
            ) : (
              <div className="space-y-5">
                {plainParagraphs.map((paragraph, index) => (
                  <p key={index} className="text-slate-600 leading-relaxed text-base md:text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {testimonial && (
        <section className="bg-white py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Reveal>
              <div className="brand-gradient-ring rounded-2xl bg-white p-8 shadow-sm md:p-10">
                <div className="mb-4 flex items-center gap-2">
                  <span className="gradient-text text-[11px] font-bold uppercase tracking-[0.14em]">
                    Wat de klant zegt
                  </span>
                  <div className="flex items-center gap-0.5 ml-auto">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < (testimonial.rating ?? 5) ? 'fill-accent-400 text-accent-400' : 'fill-slate-200 text-slate-200'}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-lg leading-relaxed text-slate-700 md:text-xl">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  {testimonial.avatar_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={testimonial.avatar_url}
                      alt={testimonial.name}
                      className="h-11 w-11 rounded-full object-cover"
                    />
                  ) : (
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white"
                      style={{ background: 'linear-gradient(135deg, #f97316 0%, #ec4899 50%, #a78bfa 100%)' }}
                    >
                      {getInitials(testimonial.name)}
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-slate-900">{testimonial.name}</div>
                    {testimonial.role && (
                      <div className="text-xs text-slate-400">{testimonial.role}</div>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <CTASection />
    </div>
  )
}
