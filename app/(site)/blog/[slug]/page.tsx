export const revalidate = 3600

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import { getNewsArticleBySlug, getAllNewsSlugs } from '@/lib/queries/news'
import Reveal from '@/components/ui/Reveal'
import CTASection from '@/components/site/CTASection'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllNewsSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getNewsArticleBySlug(slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.excerpt ?? undefined,
    openGraph: {
      title: article.title,
      description: article.excerpt ?? undefined,
      images: article.image_url ? [article.image_url] : [],
    },
  }
}

function readingTime(content?: string | null): number {
  if (!content) return 2
  return Math.max(1, Math.round(content.split(' ').length / 200))
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await getNewsArticleBySlug(slug)
  if (!article) notFound()

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-16 lg:py-24 mesh-gradient-bg">
        <Reveal className="max-w-4xl mx-auto px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-orange-500 transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Terug naar blog
          </Link>
          <h1 className="font-headline text-4xl md:text-5xl font-extrabold text-slate-900 leading-[1.05] tracking-tight mb-6">
            {article.title}
          </h1>
          <div className="flex items-center gap-5 text-sm text-slate-400">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {formatDate(article.created_at)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {readingTime(article.content)} min lezen
            </span>
          </div>
        </Reveal>
      </section>

      {/* Hero image */}
      {article.image_url && (
        <div className="max-w-4xl mx-auto px-6 lg:px-8 -mt-6 mb-12">
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full rounded-2xl aspect-video object-cover shadow-ambient"
          />
        </div>
      )}

      {/* Article content */}
      <article className="max-w-4xl mx-auto px-6 lg:px-8 pb-20">
        {article.excerpt && (
          <p className="text-xl text-slate-500 leading-relaxed mb-10 pb-10 border-b border-slate-100 font-medium">
            {article.excerpt}
          </p>
        )}
        {article.content && (
          <div
            className="prose-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        )}
      </article>

      <CTASection
        heading="Meer weten of hulp nodig?"
        subheading="Neem gerust contact op. Ik help je graag verder."
      />
    </div>
  )
}
