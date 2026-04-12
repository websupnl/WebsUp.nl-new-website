export const revalidate = 3600

import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Calendar, Clock } from 'lucide-react'
import { getNewsArticles } from '@/lib/queries/news'
import Reveal from '@/components/ui/Reveal'
import CTASection from '@/components/site/CTASection'
import WavePageHeader from '@/components/site/WavePageHeader'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Inzichten, tips en updates over webdevelopment, automatisering en digitale groei.',
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

export default async function BlogPage() {
  const articles = await getNewsArticles()

  return (
    <div>
      <WavePageHeader
        badge="Inzichten"
        title="Blog &"
        titleHighlight="updates."
        subtitle="Tips, inzichten en updates over webdevelopment, automatisering en digitale groei."
      />

      {/* Articles */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {articles.length === 0 ? (
            <Reveal className="text-center py-20">
              <div className="text-4xl mb-4">✍️</div>
              <h2 className="font-headline text-2xl font-bold text-slate-900 mb-3">
                Eerste artikel komt eraan
              </h2>
              <p className="text-slate-500 max-w-md mx-auto">
                We zijn bezig met de eerste blogposts. Kom snel terug of neem contact op.
              </p>
              <Link href="/contact" className="btn-brand inline-flex items-center gap-2 px-6 py-3 mt-6 text-sm">
                Contact opnemen <ArrowRight size={16} />
              </Link>
            </Reveal>
          ) : (
            <>
              {/* Featured (first article) */}
              {articles[0] && (
                <Reveal className="mb-14">
                  <Link
                    href={`/blog/${articles[0].slug}`}
                    className="group grid lg:grid-cols-2 gap-10 items-center bg-slate-50 rounded-3xl p-8 lg:p-12 hover:shadow-ambient transition-all"
                  >
                    {articles[0].image_url && (
                      <div className="overflow-hidden rounded-2xl aspect-video bg-orange-50">
                        <img
                          src={articles[0].image_url}
                          alt={articles[0].title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    )}
                    <div className={articles[0].image_url ? '' : 'lg:col-span-2'}>
                      <span className="text-[0.7rem] font-bold uppercase tracking-[0.08em] text-orange-500 mb-3 block">
                        Uitgelicht
                      </span>
                      <h2 className="font-headline text-3xl font-extrabold text-slate-900 mb-4 group-hover:text-orange-500 transition-colors leading-tight">
                        {articles[0].title}
                      </h2>
                      {articles[0].excerpt && (
                        <p className="text-slate-500 text-lg leading-relaxed mb-6 line-clamp-3">
                          {articles[0].excerpt}
                        </p>
                      )}
                      <div className="flex items-center gap-5 text-xs text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={13} />
                          {formatDate(articles[0].created_at)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={13} />
                          {readingTime(articles[0].content)} min lezen
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              )}

              {/* Grid */}
              {articles.length > 1 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.slice(1).map((article, i) => (
                    <Reveal key={article.id} delay={i * 60}>
                      <Link
                        href={`/blog/${article.slug}`}
                        className="group flex flex-col h-full rounded-2xl border border-slate-100 overflow-hidden hover:shadow-ambient hover:-translate-y-1 transition-all duration-300"
                      >
                        {article.image_url ? (
                          <div className="aspect-video overflow-hidden bg-orange-50/60">
                            <img
                              src={article.image_url}
                              alt={article.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                          </div>
                        ) : (
                          <div className="aspect-video bg-gradient-to-br from-orange-50 to-pink-50 flex items-center justify-center">
                            <span className="font-headline text-4xl font-bold text-orange-200">
                              {article.title.charAt(0)}
                            </span>
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
                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                            <span className="text-xs text-slate-400">{formatDate(article.created_at)}</span>
                            <span className="text-xs text-slate-400 flex items-center gap-1">
                              <Clock size={11} />
                              {readingTime(article.content)} min
                            </span>
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
