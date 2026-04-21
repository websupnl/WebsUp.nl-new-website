export const revalidate = 3600

import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import { getNewsArticles } from '@/lib/queries/news'
import Reveal from '@/components/ui/Reveal'
import CTASection from '@/components/site/CTASection'
import WavePageHeader from '@/components/site/WavePageHeader'
import { Tooltip } from '@/components/ui/tooltip-card'
import { BlogPostCard } from '@/components/ui/card-18'

export const metadata: Metadata = {
  title: 'Kennisbank',
  description: 'Praktische artikelen, tips en handleidingen over webdevelopment, SEO, automatisering en digitale groei.',
}

function readingTime(content?: string | null): number {
  if (!content) return 3
  return Math.max(1, Math.round(content.split(' ').length / 200))
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
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
      <WavePageHeader
        badge="Kennisbank"
        title="Praktische kennis,"
        titleHighlight="gratis."
        subtitle="Artikelen, handleidingen en tips over websites, online vindbaarheid, automatisering en digitale groei."
      />

      <div className="bg-white py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-4 max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Populaire onderwerpen</div>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Niet technisch ingestoken, maar gewoon in duidelijke taal. Dit zijn de onderwerpen waar ondernemers meestal mee zitten.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <Tooltip key={cat.label} content={cat.tip}>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600">
                  {cat.label}
                </span>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {articles.length === 0 ? (
            <Reveal className="py-24 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-100 bg-slate-50">
                <BookOpen size={24} className="text-slate-400" />
              </div>
              <h2 className="mb-3 font-headline text-2xl font-bold text-slate-900">
                Eerste artikel komt eraan
              </h2>
              <p className="mx-auto mb-6 max-w-md leading-relaxed text-slate-500">
                We zijn bezig met de eerste kennisbank artikelen. Heb je een vraag? Neem gerust contact op.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-px hover:bg-slate-800"
              >
                Stel een vraag <ArrowRight size={14} />
              </Link>
            </Reveal>
          ) : (
            <>
              {articles[0] && (
                <Reveal className="mb-12">
                  <BlogPostCard
                    variant="featured"
                    tag="Uitgelicht"
                    date={formatDate(articles[0].created_at)}
                    title={articles[0].title}
                    description={articles[0].excerpt ?? ''}
                    imageUrl={articles[0].image_url ?? undefined}
                    href={`/kennisbank/${articles[0].slug}`}
                    readMoreText="Lees meer"
                  />
                </Reveal>
              )}

              {articles.length > 1 && (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {articles.slice(1).map((article, i) => (
                    <Reveal key={article.id} delay={i * 50}>
                      <BlogPostCard
                        tag="Kennisbank"
                        date={formatDate(article.created_at)}
                        title={article.title}
                        description={article.excerpt ?? ''}
                        imageUrl={article.image_url ?? undefined}
                        href={`/kennisbank/${article.slug}`}
                      />
                    </Reveal>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <CTASection />
    </div>
  )
}
