import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Calendar, Clock, BookOpen } from 'lucide-react'
import WavePageHeader from '@/components/site/WavePageHeader'
import Reveal from '@/components/ui/Reveal'
import { formatDate } from '@/lib/utils'
import type { NewsArticle } from '@/types/database.types'
import { Tooltip } from '@/components/ui/tooltip-card'

interface TopicPill {
  label: string
  tip: string
}

interface ArticleArchivePageProps {
  badge: string
  title: string
  titleHighlight?: string
  subtitle: string
  articles: NewsArticle[]
  basePath: string
  topicPills?: TopicPill[]
}

function readingTime(content?: string | null) {
  if (!content) return 2
  return Math.max(1, Math.round(content.split(/\s+/).filter(Boolean).length / 220))
}

export default function ArticleArchivePage({
  badge,
  title,
  titleHighlight,
  subtitle,
  articles,
  basePath,
  topicPills = [],
}: ArticleArchivePageProps) {
  return (
    <div>
      <WavePageHeader badge={badge} title={title} titleHighlight={titleHighlight} subtitle={subtitle} />

      {topicPills.length > 0 && (
        <div className="bg-white py-10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-4 max-w-2xl">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Onderwerpen</div>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Praktische thema’s waar ondernemers meestal mee zitten als ze hun website, vindbaarheid of digitale processen willen verbeteren.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {topicPills.map((pill) => (
                <Tooltip key={pill.label} content={pill.tip}>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600">
                    {pill.label}
                  </span>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>
      )}

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {articles.length === 0 ? (
            <Reveal className="py-24 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-100 bg-slate-50">
                <BookOpen size={24} className="text-slate-400" />
              </div>
              <h2 className="mb-3 font-headline text-2xl font-bold text-slate-900">Eerste artikel komt eraan</h2>
              <p className="mx-auto max-w-md leading-relaxed text-slate-500">
                De eerste artikelen staan nog niet live. Heb je nu al een vraag? Neem dan gewoon contact op.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-px hover:bg-slate-800"
              >
                Stel een vraag
                <ArrowRight size={14} />
              </Link>
            </Reveal>
          ) : (
            <>
              {articles[0] && (
                <Reveal className="mb-12">
                  <Link
                    href={`${basePath}/${articles[0].slug}`}
                    className="group grid gap-0 overflow-hidden rounded-[1.9rem] border border-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(15,23,42,0.08)] lg:grid-cols-[0.95fr_1.05fr]"
                  >
                    <div className="relative min-h-[18rem] overflow-hidden bg-slate-100">
                      {articles[0].image_url ? (
                        <Image
                          src={articles[0].image_url}
                          alt={articles[0].title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 1024px) 100vw, 45vw"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-slate-50">
                          <BookOpen size={28} className="text-slate-200" />
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col justify-center p-8 lg:p-12">
                      <span className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-orange-500">
                        Uitgelicht
                      </span>
                      <h2 className="font-headline text-2xl font-extrabold leading-tight text-slate-900 transition-colors group-hover:text-orange-500 md:text-3xl">
                        {articles[0].title}
                      </h2>
                      {articles[0].excerpt && (
                        <p className="mt-4 text-base leading-relaxed text-slate-500">{articles[0].excerpt}</p>
                      )}
                      <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar size={12} />
                          {formatDate(articles[0].published_at ?? articles[0].created_at)}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock size={12} />
                          {readingTime(articles[0].content)} min lezen
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              )}

              {articles.length > 1 && (
                <div className="divide-y divide-slate-200 rounded-[2rem] border border-slate-200 bg-slate-50">
                  {articles.slice(1).map((article, index) => (
                    <Reveal key={article.id} delay={index * 45}>
                      <Link
                        href={`${basePath}/${article.slug}`}
                        className="group flex items-start justify-between gap-5 px-6 py-6 transition-colors hover:bg-white md:px-8"
                      >
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                            <span className="inline-flex items-center gap-1.5">
                              <Calendar size={12} />
                              {formatDate(article.published_at ?? article.created_at)}
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                              <Clock size={12} />
                              {readingTime(article.content)} min lezen
                            </span>
                          </div>

                          <h3 className="mt-3 max-w-3xl font-headline text-2xl font-bold leading-tight text-slate-900 transition-colors group-hover:text-orange-500">
                            {article.title}
                          </h3>
                          {article.excerpt && (
                            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-500">{article.excerpt}</p>
                          )}
                        </div>

                        <ArrowRight size={18} className="mt-1 flex-shrink-0 text-slate-300 transition-all duration-200 group-hover:translate-x-1 group-hover:text-orange-500" />
                      </Link>
                    </Reveal>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
