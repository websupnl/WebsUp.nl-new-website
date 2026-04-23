export const dynamic = 'force-dynamic'

import { Metadata } from 'next'
import PublicationGrid from '@/components/site/PublicationGrid'
import CTASection from '@/components/site/CTASection'
import { getPublications } from '@/lib/queries/publications'
import Reveal from '@/components/ui/Reveal'
import WavePageHeader from '@/components/site/WavePageHeader'
import { StatStrip } from '@/components/site/design-system'

export const metadata: Metadata = {
  title: 'Publicaties',
  description: 'Bekijk al onze zakelijke publicaties over financiële strategieën, management en innovatie.',
}

const stats = [
  { value: '500+', label: 'Publicaties verzorgd' },
  { value: '1.200+', label: 'Lezers per editie' },
  { value: '15+', label: 'Jaar ervaring' },
  { value: '100%', label: 'Zakelijke doelgroep' },
]

export default async function PublicatiesPage() {
  const publications = await getPublications()

  return (
    <div>
      <WavePageHeader
        badge="Publicaties"
        title="Zakelijke kennis"
        titleHighlight="die echt werkt."
        subtitle="Diepgaande inzichten voor professionals die hun sector vooruit willen brengen."
      />

      <StatStrip items={stats} />

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
