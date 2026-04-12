export const revalidate = 3600

import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Calendar, Clock, BookOpen } from 'lucide-react'
import { getNewsArticles } from '@/lib/queries/news'
import Reveal from '@/components/ui/Reveal'
import CTASection from '@/components/site/CTASection'
import WavePageHeader from '@/components/site/WavePageHeader'
import { Tooltip } from '@/components/ui/tooltip-card'

export const metadata: Metadata = {
  title: 'Kennisbank',
  description: 'Praktische artikelen, tips en handleidingen over webdevelopment, SEO, automatisering en digitale groei.',
}

function readingTime(content?: string | null): number {
  if (!content) return 3
  return Math.max(1, Math.round(content.split(' ').length / 200))
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const categories = [
  { label: 'WordPress', tip: 'Artikelen over WordPress: plugins, thema\'s, beveiliging en optimalisatie.' },
  { label: 'Next.js', tip: 'Deep dives in het React-framework voor moderne, snelle websites en apps.' },
  { label: 'SEO', tip: 'Praktische tips om hoger te scoren in Google en meer organisch verkeer te krijgen.' },
  { label: 'Automatisering', tip: 'Workflows, n8n, API-koppelingen en alles om handmatig werk te elimineren.' },
  { label: 'Webshops', tip: 'Shopify, WooCommerce en conversieoptimalisatie voor online verkoop.' },
  { label: 'Algemeen', tip: 'Overige tips over webdevelopment, ondernemen en digitale groei.' },
]

export default async function KennisbankPage() {
  const articles = await getNewsArticles()

  return (
    <div>
      <WavePageHeader
        badge="Kennisbank"
        title="Praktische kennis,"
        titleHighlight="gratis."
        subtitle="Artikelen, handleidingen en tips over webdevelopment, SEO, automatisering en digitale groei."
      />

      {/* Categorieën */}
      <div className="bg-white border-b border-slate-100 py-4 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center gap-2 overflow-x-auto scrollbar-hide">
          <span className="text-xs text-slate-400 font-medium whitespace-nowrap mr-1">Filter:</span>
          {categories.map((cat) => (
            <Tooltip key={cat.label} content={cat.tip}>
              <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-50 text-slate-600 border border-slate-100 cursor-pointer hover:border-slate-300 transition-colors whitespace-nowrap">
                {cat.label}
              </span>
            </Tooltip>
          ))}
        </div>
      </div>

      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {articles.length === 0 ? (
            <Reveal className="text-center py-24">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 bg-slate-50 border border-slate-100">
                <BookOpen size={24} className="text-slate-400" />
              </div>
              <h2 className="font-headline text-2xl font-bold text-slate-900 mb-3">
                Eerste artikel komt eraan
              </h2>
              <p className="text-slate-500 max-w-md mx-auto leading-relaxed mb-6">
                We zijn bezig met de eerste kennisbank artikelen. Heb je een vraag? Neem gerust contact op.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-slate-900 text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-slate-800 hover:-translate-y-px transition-all shadow-sm"
              >
                Stel een vraag <ArrowRight size={14} />
              </Link>
            </Reveal>
          ) : (
            <>
              {/* Featured */}
              {articles[0] && (
                <Reveal className="mb-12">
                  <Link
                    href={`/kennisbank/${articles[0].slug}`}
                    className="group grid lg:grid-cols-5 gap-0 rounded-[1.75rem] overflow-hidden border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    {articles[0].image_url && (
                      <div className="lg:col-span-2 aspect-video lg:aspect-auto overflow-hidden bg-slate-100">
                        <img
                          src={articles[0].image_url}
                          alt={articles[0].title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    )}
                    <div className={`flex flex-col justify-center p-8 lg:p-12 ${articles[0].image_url ? 'lg:col-span-3' : 'lg:col-span-5'}`}>
                      <span className="text-xs font-bold uppercase tracking-wider text-orange-500 mb-3">
                        Uitgelicht
                      </span>
                      <h2 className="font-headline text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 group-hover:text-orange-500 transition-colors leading-tight">
                        {articles[0].title}
                      </h2>
                      {articles[0].excerpt && (
                        <p className="text-slate-500 leading-relaxed mb-5 line-clamp-3">
                          {articles[0].excerpt}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-slate-400">
                        <span className="flex items-center gap-1.5"><Calendar size={12} />{formatDate(articles[0].created_at)}</span>
                        <span className="flex items-center gap-1.5"><Clock size={12} />{readingTime(articles[0].content)} min lezen</span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              )}

              {/* Grid */}
              {articles.length > 1 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {articles.slice(1).map((article, i) => (
                    <Reveal key={article.id} delay={i * 50}>
                      <Link
                        href={`/kennisbank/${article.slug}`}
                        className="group flex flex-col h-full rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                      >
                        {article.image_url ? (
                          <div className="aspect-video overflow-hidden bg-slate-50">
                            <img
                              src={article.image_url}
                              alt={article.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                          </div>
                        ) : (
                          <div className="aspect-video bg-slate-50 flex items-center justify-center">
                            <BookOpen size={28} className="text-slate-200" />
                          </div>
                        )}
                        <div className="p-6 flex flex-col flex-1">
                          <h3 className="font-headline font-bold text-slate-900 mb-2 group-hover:text-orange-500 transition-colors leading-snug">
                            {article.title}
                          </h3>
                          {article.excerpt && (
                            <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                              {article.excerpt}
                            </p>
                          )}
                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50 text-xs text-slate-400">
                            <span>{formatDate(article.created_at)}</span>
                            <span className="flex items-center gap-1"><Clock size={11} />{readingTime(article.content)} min</span>
                          </div>
                        </div>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <CTASection />
    </div>
  )
}
