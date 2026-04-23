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

      <div className="bg-slate-50 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-6 grid gap-5 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div className="max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Populaire onderwerpen</div>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Niet technisch ingestoken, maar gewoon in duidelijke taal. Dit zijn de onderwerpen waar ondernemers meestal mee zitten.
            </p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {categories.slice(0, 4).map((cat, index) => (
              <Tooltip key={cat.label} content={cat.tip}>
                <span className="liquid-glass-light block min-h-[132px] cursor-default p-5 transition-transform hover:-translate-y-1">
                  <span className="mb-3 block text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                    0{index + 1}
                  </span>
                  <span className="block text-base font-bold leading-tight text-slate-900">
                  {cat.label}
                  </span>
                  <span className="mt-3 block text-sm leading-relaxed text-slate-500">
                    {cat.tip}
                  </span>
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
