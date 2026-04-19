export const revalidate = 3600

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllNewsSlugs, getNewsArticleBySlug } from '@/lib/queries/news'
import CTASection from '@/components/site/CTASection'
import ArticleDetailPage from '@/components/site/ArticleDetailPage'

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

export default async function KennisbankArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await getNewsArticleBySlug(slug)

  if (!article) notFound()

  return (
    <div>
      <ArticleDetailPage article={article} backHref="/kennisbank" backLabel="Terug naar kennisbank" badge="Kennisbank" />
      <CTASection />
    </div>
  )
}
