import { Metadata } from 'next'
import { siteConfig } from '@/config/site.config'
import { getNewsArticles } from '@/lib/queries/news'
import NewsCard from '@/components/site/NewsCard'
import CTASection from '@/components/site/CTASection'
import Reveal from '@/components/ui/Reveal'
import WavePageHeader from '@/components/site/WavePageHeader'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Nieuws & Inzichten',
  description: 'Laatste inzichten, trends en nieuws van Business Publicatie Uitgevers.',
}

export default async function NieuwsPage() {
  const articles = await getNewsArticles()

  return (
    <div>
      <WavePageHeader
        badge="Nieuws & Inzichten"
        title={siteConfig.news?.heading ?? 'Laatste nieuws'}
        subtitle={siteConfig.news?.subheading ?? 'Updates, tips en inzichten van WebsUp.'}
      />

      {/* Artikelen */}
      <section className="bg-white py-16 lg:py-20">
        <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {articles.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📰</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Nog geen artikelen</h2>
              <p className="text-gray-500">Kom binnenkort terug voor onze laatste inzichten.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </Reveal>
      </section>

      <Reveal className="pt-2 pb-16 lg:pb-24">
        <CTASection />
      </Reveal>
    </div>
  )
}
