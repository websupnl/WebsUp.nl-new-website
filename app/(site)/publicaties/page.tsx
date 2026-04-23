export const dynamic = 'force-dynamic'

import { Metadata } from 'next'
import Image from 'next/image'
import PublicationGrid from '@/components/site/PublicationGrid'
import CTASection from '@/components/site/CTASection'
import { getPublications } from '@/lib/queries/publications'
import { BookOpen, Users, Award, TrendingUp } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import GradientIcon from '@/components/site/GradientIcon'

export const metadata: Metadata = {
  title: 'Publicaties',
  description: 'Bekijk al onze zakelijke publicaties over financiële strategieën, management en innovatie.',
}

const stats = [
  { icon: BookOpen, value: '500+', label: 'Publicaties verzorgd' },
  { icon: Users, value: '1.200+', label: 'Lezers per editie' },
  { icon: TrendingUp, value: '15+', label: 'Jaar ervaring' },
  { icon: Award, value: '100%', label: 'Zakelijke doelgroep' },
]

export default async function PublicatiesPage() {
  const publications = await getPublications()

  return (
    <div>
      {/* Hero */}
      <div className="relative bg-gray-900 text-white py-24 lg:py-32 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
          alt="Publicaties"
          fill
          className="object-cover opacity-40"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-gray-900/30" />
        <Reveal className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block text-xs font-semibold text-blue-400 uppercase tracking-widest mb-4 bg-blue-400/10 border border-blue-400/20 px-3 py-1 rounded-full">
            Onze publicaties
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 max-w-3xl">
            Zakelijke kennis die echt werkt
          </h1>
          <p className="text-gray-300 text-xl max-w-2xl leading-relaxed">
            Diepgaande inzichten voor professionals die hun sector vooruit willen brengen.
          </p>
        </Reveal>
      </div>

      {/* Stats balk */}
      <div className="bg-blue-600 py-8">
        <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <GradientIcon icon={Icon} size="sm" />
                <div>
                  <div className="text-2xl font-bold text-white leading-none">{value}</div>
                  <div className="text-blue-200 text-xs mt-0.5">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal>
        <PublicationGrid
          publications={publications}
          title=""
          subtitle=""
          showViewAll={false}
        />
      </Reveal>

      <Reveal className="pt-2 pb-16 lg:pb-24">
        <CTASection />
      </Reveal>
    </div>
  )
}