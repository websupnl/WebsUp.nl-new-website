import Link from 'next/link'
import { ArrowRight, Calendar, Clock } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import { siteConfig } from '@/config/site.config'
import type { NewsArticle } from '@/types/database.types'
import { formatDate } from '@/lib/utils'

interface KennisbankPreviewSectionProps {
  articles: NewsArticle[]
}

function readingTime(content?: string | null): number {
  if (!content) return 3
  return Math.max(1, Math.round(content.split(' ').length / 200))
}

export default function KennisbankPreviewSection({
  articles,
}: KennisbankPreviewSectionProps) {
  if (articles.length === 0) return null

  return (
    <section className="bg-slate-50 py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14">
          <Reveal>
            <span className="overline-badge mb-4 inline-flex">Kennisbank</span>
            <h2 className="max-w-xl font-headline text-4xl font-extrabold leading-[1.06] tracking-[-0.02em] text-slate-900 md:text-5xl">
              {siteConfig.knowledgePreview.heading}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-500">
              {siteConfig.knowledgePreview.subheading}
            </p>

            <div className="mt-8 rounded-[1.5rem] border border-slate-200 bg-white p-5">
              <div className="text-sm font-semibold text-slate-900">Geen vage theorie</div>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Gewoon bruikbare artikelen voor ondernemers die betere digitale keuzes willen maken.
              </p>
            </div>

            <Link
              href="/kennisbank"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
            >
              Naar de kennisbank
              <ArrowRight size={14} />
            </Link>
          </Reveal>

          <div className="space-y-1">
            {articles.map((article, index) => (
              <Reveal key={article.id} delay={index * 60}>
                <Link
                  href={`/kennisbank/${article.slug}`}
                  className="group block border-t border-slate-200 py-6 last:border-b last:border-slate-200"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={12} />
                          {formatDate(article.published_at ?? article.created_at)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={12} />
                          {readingTime(article.content)} min lezen
                        </span>
                      </div>

                      <h3 className="mt-3 max-w-2xl font-headline text-2xl font-bold leading-tight text-slate-900 transition-colors group-hover:text-orange-500">
                        {article.title}
                      </h3>

                      {article.excerpt && (
                        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-500">
                          {article.excerpt}
                        </p>
                      )}
                    </div>

                    <ArrowRight
                      size={18}
                      className="mt-1 flex-shrink-0 text-slate-300 transition-all duration-200 group-hover:translate-x-1 group-hover:text-orange-500"
                    />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
