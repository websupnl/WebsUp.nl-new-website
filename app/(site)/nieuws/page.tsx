export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import CTASection from '@/components/site/CTASection'
import ArticleArchivePage from '@/components/site/ArticleArchivePage'
import { getNewsArticles } from '@/lib/queries/news'

export const metadata: Metadata = {
  title: 'Nieuws & Updates',
  description: 'Nieuws, artikelen en updates van WebsUp.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: '/kennisbank',
  },
}

export default async function NieuwsPage() {
  const articles = await getNewsArticles()

  return (
    <div>
      <ArticleArchivePage
        badge="Nieuws"
        title="Nieuws &"
        titleHighlight="updates."
        subtitle="Ook via deze route zijn de artikelen van WebsUp bereikbaar. Voor zoekmachines is de kennisbank de hoofdroute."
        articles={articles}
        basePath="/nieuws"
      />
      <CTASection />
    </div>
  )
}
