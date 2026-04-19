export const revalidate = 3600

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, CheckCircle, ExternalLink } from 'lucide-react'
import CTASection from '@/components/site/CTASection'
import Reveal from '@/components/ui/Reveal'
import WavePageHeader from '@/components/site/WavePageHeader'
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
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            <ArrowLeft size={14} />
            Alle projecten
          </Link>
          {project.website_url && (
            <a
              href={project.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-white/90"
            >
              Bekijk website
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </WavePageHeader>

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
          <Reveal>
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100">
              <Image
                src={project.image_url}
                alt={project.title}
                width={1600}
                height={1000}
                className="h-auto w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
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
                      <CheckCircle size={18} className="mt-0.5 flex-shrink-0 text-orange-500" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm leading-relaxed text-slate-500">
                  Website, webshop of maatwerkoplossing nodig? Dan kijken we samen wat past bij je bedrijf,
                  je doelen en hoe je nu werkt.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
                  >
                    Kennismaking plannen
                    <ArrowRight size={14} />
                  </Link>
                  <Link
                    href="/diensten"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-white"
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
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Reveal>
            <span className="overline-badge mb-4 inline-flex">Over dit project</span>
            <h2 className="font-headline text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              Van vraagstuk naar praktische oplossing.
            </h2>
          </Reveal>

          <Reveal delay={50}>
            {looksLikeHtml(project.content) ? (
              <div className="site-article pt-8" dangerouslySetInnerHTML={{ __html: project.content }} />
            ) : (
              <div className="space-y-5 pt-8">
                {plainParagraphs.map((paragraph, index) => (
                  <p key={index} className="text-base leading-relaxed text-slate-600 md:text-lg">
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
