export const revalidate = 3600

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'
import { getPublicationBySlug, getAllPublicationSlugs } from '@/lib/queries/publications'
import Reveal from '@/components/ui/Reveal'
import CTASection from '@/components/site/CTASection'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllPublicationSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await getPublicationBySlug(slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.description ?? project.excerpt ?? undefined,
    openGraph: {
      title: project.title,
      images: project.image_url ? [project.image_url] : [],
    },
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const project = await getPublicationBySlug(slug)
  if (!project) notFound()

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-16 lg:py-24 mesh-gradient-bg">
        <Reveal className="max-w-7xl mx-auto px-6 lg:px-8">
          <Link
            href="/projecten"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Alle projecten
          </Link>
          {project.label && (
            <span className="inline-block text-[0.7rem] font-bold uppercase tracking-[0.08em] text-indigo-600 mb-4">
              {project.label}
            </span>
          )}
          <h1 className="font-headline text-5xl md:text-6xl font-extrabold text-slate-900 leading-[1.05] tracking-tight mb-6 max-w-3xl">
            {project.title}
          </h1>
          {project.description && (
            <p className="text-xl text-slate-500 leading-relaxed max-w-2xl">
              {project.description}
            </p>
          )}
        </Reveal>
      </section>

      {/* Image */}
      {project.image_url && (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-8 mb-16 relative z-10">
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full rounded-3xl aspect-video object-cover shadow-glass"
          />
        </div>
      )}

      {/* Content */}
      {(project.content || project.excerpt) && (
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            {project.excerpt && !project.content && (
              <p className="text-lg text-slate-600 leading-relaxed">{project.excerpt}</p>
            )}
            {project.content && (
              <div
                className="prose-content"
                dangerouslySetInnerHTML={{ __html: project.content }}
              />
            )}
          </div>
        </section>
      )}

      <CTASection
        heading="Jouw project is het volgende."
        subheading="Laten we kijken wat ik voor jou kan bouwen."
      />
    </div>
  )
}
