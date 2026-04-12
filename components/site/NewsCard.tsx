import Link from 'next/link'
import Image from 'next/image'
import { NewsArticle } from '@/types/database.types'
import { truncate, formatDate } from '@/lib/utils'
import { ArrowRight, Calendar } from 'lucide-react'

interface NewsCardProps {
  article: NewsArticle
}

export default function NewsCard({ article }: NewsCardProps) {
  return (
    <article className="group bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_-1px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col">
      {/* Image */}
      <Link
        href={`/nieuws/${article.slug}`}
        className="relative aspect-video overflow-hidden bg-gray-100 block"
        aria-label={`Lees artikel ${article.title}`}
      >
        {article.image_url ? (
          <Image
            src={article.image_url}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-blue-50 flex items-center justify-center">
            <span className="text-blue-300 text-4xl font-bold">
              {article.title.charAt(0)}
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-3">
          <Calendar size={12} />
          <span>{formatDate(article.published_at ?? article.created_at)}</span>
        </div>

        <h3 className="text-gray-900 font-semibold text-lg leading-snug mb-2 group-hover:text-blue-600 transition-colors">
          {article.title}
        </h3>

        {article.excerpt && (
          <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">
            {truncate(article.excerpt, 110)}
          </p>
        )}

        <Link
          href={`/nieuws/${article.slug}`}
          className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-sm font-medium mt-auto transition-colors"
        >
          Lees meer
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </article>
  )
}
