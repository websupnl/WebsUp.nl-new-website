import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import WavePageHeader from '@/components/site/WavePageHeader'
import Reveal from '@/components/ui/Reveal'
import { formatDate } from '@/lib/utils'

interface ArticleLike {
  title: string
  excerpt?: string | null
  content?: string | null
  image_url?: string | null
  created_at: string
  published_at?: string | null
}

interface ArticleDetailPageProps {
  article: ArticleLike
  backHref: string
  backLabel: string
  badge?: string
}

function readingTime(content?: string | null) {
  if (!content) return 2

  return Math.max(1, Math.round(content.split(/\s+/).filter(Boolean).length / 220))
}

export default function ArticleDetailPage({
  article,
  backHref,
  backLabel,
  badge = 'Artikel',
}: ArticleDetailPageProps) {
  const publishedAt = article.published_at ?? article.created_at

  return (
    <div>
      <WavePageHeader
        badge={badge}
        title={article.title}
        subtitle={article.excerpt ?? 'Praktisch artikel van WebsUp over websites, vindbaarheid en digitale keuzes.'}
        heightClass="min-h-[56vh]"
      >
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            <ArrowLeft size={14} />
            {backLabel}
          </Link>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-5 text-sm text-white/55">
          <span className="inline-flex items-center gap-2">
            <Calendar size={14} />
            {formatDate(publishedAt)}
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock size={14} />
            {readingTime(article.content)} min lezen
          </span>
        </div>
      </WavePageHeader>

      {article.image_url && (
        <section className="bg-white pt-10">
          <Reveal className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100">
              <Image
                src={article.image_url}
                alt={article.title}
                width={1600}
                height={900}
                className="h-auto w-full object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
          </Reveal>
        </section>
      )}

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          {article.excerpt && (
            <Reveal>
              <p className="border-b border-slate-200 pb-8 text-xl leading-relaxed text-slate-600">
                {article.excerpt}
              </p>
            </Reveal>
          )}

          {article.content && (
            <Reveal delay={40}>
              <div
                className="site-article pt-8"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </Reveal>
          )}
        </div>
      </section>
    </div>
  )
}
