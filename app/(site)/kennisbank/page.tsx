export const revalidate = 3600

import type { Metadata } from 'next'
import CTASection from '@/components/site/CTASection'
import ArticleArchivePage from '@/components/site/ArticleArchivePage'
import { getNewsArticles } from '@/lib/queries/news'

export const metadata: Metadata = {
  title: 'Kennisbank',
  description: 'Praktische artikelen, tips en handleidingen over websites, SEO, automatisering en digitale groei.',
}

const categories = [
  { label: 'Meer aanvragen via je website', tip: 'Praktische tips over duidelijkere websites, structuur en betere online zichtbaarheid.' },
  { label: 'Hoger in Google komen', tip: 'SEO uitgelegd zonder technisch jargon, gericht op meer bereik en betere vindbaarheid.' },
  { label: 'Tijd besparen met automatisering', tip: 'Voor ondernemers die minder handmatig werk willen en processen slimmer willen inrichten.' },
  { label: 'Webshop verbeteren', tip: 'Tips over conversie, checkout, productpresentatie en online verkopen.' },
  { label: 'Website sneller en duidelijker', tip: 'Artikelen over snelheid, gebruiksvriendelijkheid en vertrouwen op je site.' },
  { label: 'Digitale keuzes maken', tip: 'Hulp bij de vraag wat slim is: WordPress, maatwerk, webshop, koppelingen of iets daartussenin.' },
]

export default async function KennisbankPage() {
  const articles = await getNewsArticles()

  return (
    <div>
      <ArticleArchivePage
        badge="Kennisbank"
        title="Praktische kennis,"
        titleHighlight="gratis."
        subtitle="Artikelen, handleidingen en tips over websites, online vindbaarheid, automatisering en digitale groei."
        articles={articles}
        basePath="/kennisbank"
        topicPills={categories}
      />
      <CTASection />
    </div>
  )
}
