import Link from 'next/link'
import { siteConfig } from '@/config/site.config'
import { NewsArticle } from '@/types/database.types'
import NewsCard from './NewsCard'
import { ArrowRight } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'

interface LatestNewsSectionProps {
  articles: NewsArticle[]
  heading?: string
  subheading?: string
}

export default function LatestNewsSection({
  articles,
  heading = siteConfig.news.heading,
  subheading = siteConfig.news.subheading,
}: LatestNewsSectionProps) {
  if (articles.length === 0) return null

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="inline-block text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3 bg-blue-50 px-3 py-1 rounded-full">
              Nieuws & inzichten
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{heading}</h2>
            {subheading && (
              <p className="text-gray-500 mt-2 max-w-xl">{subheading}</p>
            )}
          </div>
          <Link
            href="/nieuws"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium whitespace-nowrap transition-colors"
          >
            Alle artikelen
            <ArrowRight size={15} />
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <Reveal key={article.id} delay={index * 80}>
              <NewsCard article={article} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
