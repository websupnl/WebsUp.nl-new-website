import Link from 'next/link'
import Image from 'next/image'
import { Publication } from '@/types/database.types'
import { truncate, formatDate } from '@/lib/utils'
import { ArrowRight, Calendar } from 'lucide-react'

interface PublicationCardProps {
  publication: Publication
  badge?: 'nieuw' | 'populair' | null
}

export default function PublicationCard({ publication, badge }: PublicationCardProps) {
  const summary = publication.excerpt ?? publication.description

  return (
    <article className="group bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_-1px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.12),0_8px_10px_-6px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1.5 overflow-hidden flex flex-col">
      {/* Image */}
      <Link
        href={`/publicaties/${publication.slug}`}
        className="relative aspect-[3/4] overflow-hidden bg-gray-50 block"
        aria-label={`Bekijk publicatie ${publication.title}`}
      >
        {publication.image_url ? (
          <Image
            src={publication.image_url}
            alt={publication.title}
            fill
            className="object-contain group-hover:scale-[1.02] transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
            <span className="text-blue-300 text-5xl font-bold">
              {publication.title.charAt(0)}
            </span>
          </div>
        )}

        {publication.label && (
          <div className="absolute left-4 top-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold tracking-[0.12em] uppercase shadow-sm">
              {publication.label}
            </span>
          </div>
        )}

        {/* Badge */}
        {badge && (
          <div className="absolute top-3 left-3">
            {badge === 'nieuw' && (
              <span className="inline-flex px-2.5 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full shadow-sm">
                Nieuw
              </span>
            )}
            {badge === 'populair' && (
              <span className="inline-flex px-2.5 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full shadow-sm">
                Populair
              </span>
            )}
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-3">
          <Calendar size={12} />
          <span>{formatDate(publication.created_at)}</span>
        </div>

        <h3 className="text-gray-900 font-semibold text-lg leading-snug mb-2 group-hover:text-blue-600 transition-colors">
          {publication.title}
        </h3>

        {summary && (
          <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">
            {truncate(summary, 120)}
          </p>
        )}

        <Link
          href={`/publicaties/${publication.slug}`}
          className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-sm font-medium mt-auto transition-colors"
        >
          Lees meer
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </article>
  )
}