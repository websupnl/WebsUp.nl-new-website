import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getLatestNewsArticles, getNewsArticleBySlug } from '@/lib/queries/news'
import CTASection from '@/components/site/CTASection'
import NewsCard from '@/components/site/NewsCard'

import { formatDate } from '@/lib/utils'
import { ArrowLeft, Calendar } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getNewsArticleBySlug(slug)
  if (!article) return {}

  const description = article.excerpt ?? undefined
  const images = article.image_url
    ? [{ url: article.image_url, width: 1200, height: 630, alt: article.title }]
    : []

  return {
    title: article.title,
    description,
    alternates: {
      canonical: `/nieuws/${slug}`,
    },
    openGraph: {
      title: article.title,
      description,
      type: 'article',
      locale: 'nl_NL',
      publishedTime: article.published_at ?? article.created_at,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description,
      images: article.image_url ? [article.image_url] : [],
    },
  }
}

export default async function NieuwsDetailPage({ params }: Props) {
  const { slug } = await params
  const article = await getNewsArticleBySlug(slug)

  if (!article) notFound()

  const relatedArticles = (await getLatestNewsArticles(4))
    .filter((item) => item.id !== article.id)
    .slice(0, 3)

  return (
    <article className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_38%),_radial-gradient(circle_at_bottom_right,_rgba(129,140,248,0.18),_transparent_32%)]" />
        <Reveal className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div className="relative z-10">
              <Link
                href="/nieuws"
                className="inline-flex items-center gap-2 text-slate-300 hover:text-white text-sm transition-colors mb-10"
              >
                <ArrowLeft size={15} />
                Alle artikelen
              </Link>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6 max-w-3xl">
                {article.title}
              </h1>

              {article.excerpt && (
                <p className="text-slate-300 text-lg sm:text-xl max-w-2xl leading-relaxed mb-8">
                  {article.excerpt}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                <span className="inline-flex items-center gap-2">
                  <Calendar size={14} />
                  {formatDate(article.published_at ?? article.created_at)}
                </span>
              </div>
            </div>

            <div className="relative z-10">
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 shadow-2xl shadow-slate-950/20">
                {article.image_url ? (
                  <Image
                    src={article.image_url}
                    alt={article.title}
                    width={900}
                    height={1200}
                    className="w-full max-w-full object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <div className="aspect-[4/5] bg-gradient-to-br from-slate-800 via-slate-900 to-blue-950" />
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Content */}
      <Reveal className="max-w-3xl mx-auto px-4 sm:px-6 py-14 lg:py-20">
        {article.content && (
          <div
            className="prose-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        )}
      </Reveal>

      {relatedArticles.length > 0 && (
        <section className="bg-gray-50 py-16 lg:py-20">
          <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10 text-center">
              Gerelateerde artikelen
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <NewsCard key={relatedArticle.id} article={relatedArticle} />
              ))}
            </div>
          </Reveal>
        </section>
      )}

      <Reveal className="pt-6 pb-24 lg:pb-32">
        <CTASection />
      </Reveal>
    </article>
  )
}

