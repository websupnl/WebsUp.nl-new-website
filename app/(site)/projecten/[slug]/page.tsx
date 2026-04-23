export const revalidate = 3600

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle, ExternalLink } from 'lucide-react'
import CTASection from '@/components/site/CTASection'
import Reveal from '@/components/ui/Reveal'
import WavePageHeader from '@/components/site/WavePageHeader'
import { LinkPreview } from '@/components/ui/link-preview'
import { getAllProjectSlugs, getProjectBySlug } from '@/lib/queries/projects'

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

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) notFound()

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
        <div className="flex flex-wrap gap-3">
          <Link
            href="/projecten"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 bg-white/5 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={14} />
            Alle projecten
          </Link>
          {project.website_url && (
            <LinkPreview
              url={project.website_url}
              isStatic
              imageSrc={project.image_url}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-slate-900 text-sm font-semibold hover:bg-white/90 transition-colors"
            >
              Bekijk site <ExternalLink size={14} />
            </LinkPreview>
          )}
        </div>
      </WavePageHeader>

      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-start">
          <Reveal>
            <div className="rounded-[1.75rem] overflow-hidden border border-slate-200 bg-slate-50">
              <img
                src={project.image_url}
                alt={project.title}
                className="w-full aspect-[16/10] object-cover"
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

              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm text-slate-500 leading-relaxed">
                  Website, webshop of maatwerkoplossing nodig? Dan kijken we samen wat past bij je bedrijf, je doelen en hoe je nu werkt.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors"
                  >
                    Kennismaking plannen <ArrowRight size={14} />
                  </Link>
                  <Link
                    href="/diensten"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-white transition-colors"
                  >
                    Bekijk diensten
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

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

      <CTASection />
    </div>
  )
}
