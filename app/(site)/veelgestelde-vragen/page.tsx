import type { Metadata } from 'next'
import WavePageHeader from '@/components/site/WavePageHeader'
import FAQSection from '@/components/site/FAQSection'
import CTASection from '@/components/site/CTASection'

export const metadata: Metadata = {
  title: 'Veelgestelde vragen',
  description:
    'Antwoorden op veelgestelde vragen over websites, webshops, maatwerk, samenwerking en digitale oplossingen van WebsUp.',
}

export default function VeelgesteldeVragenPage() {
  return (
    <div>
      <WavePageHeader
        badge="FAQ"
        title="Veelgestelde"
        titleHighlight="vragen."
        subtitle="Antwoorden op vragen die vaak terugkomen over websites, webshops, maatwerk, planning en samenwerking."
      />

      <FAQSection showPageLink={false} />
      <CTASection />
    </div>
  )
}
