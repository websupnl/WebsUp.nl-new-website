import Link from 'next/link'
import { Publication } from '@/types/database.types'
import PublicationCard from './PublicationCard'
import { ArrowRight } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'

interface PublicationGridProps {
  publications: Publication[]
  title?: string
  subtitle?: string
  showViewAll?: boolean
}

export default function PublicationGrid({
  publications,
  title = 'Ontdek onze zakelijke publicaties',
  subtitle = 'Wij maken informatieve en waardevolle publicaties voor de zakelijke markt.',
  showViewAll = true,
}: PublicationGridProps) {
  if (publications.length === 0) {
    return (
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">Nog geen publicaties beschikbaar.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          {subtitle && (
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">{subtitle}</p>
          )}
        </Reveal>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {publications.map((pub, index) => (
            <Reveal key={pub.id} delay={index * 80}>
              <PublicationCard publication={pub} />
            </Reveal>
          ))}
        </div>

        {/* View all */}
        {showViewAll && (
          <Reveal className="mt-12 text-center" delay={120}>
            <Link
              href="/publicaties"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all hover:shadow-md"
            >
              Alle publicaties bekijken
              <ArrowRight size={16} />
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  )
}
