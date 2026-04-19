export const revalidate = 3600

import type { Metadata } from 'next'
import CTASection from '@/components/site/CTASection'
import ArticleArchivePage from '@/components/site/ArticleArchivePage'
import { getNewsArticles } from '@/lib/queries/news'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Inzichten, artikelen en updates van WebsUp over websites, automatisering en digitale groei.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: '/kennisbank',
  },
}

export default async function BlogPage() {
  const articles = await getNewsArticles()

  return (
    <div>
      <ArticleArchivePage
        badge="Blog"
        title="Artikelen &"
        titleHighlight="inzichten."
        subtitle="Dezelfde praktische artikelen van WebsUp, maar dan via de blog-ingang bereikbaar."
        articles={articles}
        basePath="/blog"
      />
      <CTASection />
    </div>
  )
}
