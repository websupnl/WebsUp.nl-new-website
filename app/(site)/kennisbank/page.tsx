export const revalidate = 3600

import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, TrendingUp, Search, Zap, Globe, ShoppingCart } from 'lucide-react'
import { getNewsArticles } from '@/lib/queries/news'
import Reveal from '@/components/ui/Reveal'
import CTASection from '@/components/site/CTASection'
import WavePageHeader from '@/components/site/WavePageHeader'
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

const TOPICS = [
  {
    icon: TrendingUp,
    label: 'Meer aanvragen',
    desc: 'Duidelijkere websites, betere structuur en hogere conversie.',
    accent: '#f97316',
  },
  {
    icon: Search,
    label: 'Hoger in Google',
    desc: 'SEO zonder jargon: meer bereik, betere vindbaarheid.',
    accent: '#ec4899',
  },
  {
    icon: Zap,
    label: 'Automatisering',
    desc: 'Minder handmatig werk, slimmere processen.',
    accent: '#a78bfa',
  },
  {
    icon: ShoppingCart,
    label: 'Webshop verbeteren',
    desc: 'Conversie, checkout, productpresentatie en online verkopen.',
    accent: '#f97316',
  },
  {
    icon: Globe,
    label: 'Website sneller',
    desc: 'Snelheid, gebruiksgemak en vertrouwen op je site.',
    accent: '#ec4899',
  },
  {
    icon: BookOpen,
    label: 'Digitale keuzes',
    desc: 'WordPress, maatwerk, webshop of koppelingen?',
    accent: '#a78bfa',
  },
]

export default async function KennisbankPage() {
  const articles = await getNewsArticles()

  return (
    <div>
      <WavePageHeader
        badge="Kennisbank"
        title="Praktische kennis over"
        titleHighlight="websites en systemen."
        subtitle="Geen technisch jargon maar concrete uitleg over keuzes die voor jou als ondernemer relevant zijn. Wat kost iets, wanneer kies je welk platform, hoe werkt SEO echt."
        heightClass="min-h-[56vh]"
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="btn-brand-gradient">
            Stel een vraag <ArrowRight size={14} />
          </Link>
        </div>
      </WavePageHeader>

      {/* Topics strip */}
      <section className="border-b border-slate-100 bg-white py-14 lg:py-18">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="mb-10">
            <span className="overline-badge mb-4 inline-flex">Onderwerpen</span>
            <h2
              className="font-headline font-extrabold leading-[1.06] tracking-[-0.035em] text-slate-900"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}
            >
              Wat je hier vindt.
            </h2>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TOPICS.map((topic, i) => {
              const Icon = topic.icon
              return (
                <Reveal key={topic.label} delay={i * 40}>
                  <div className="group flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-200 hover:shadow-md">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                      style={{ background: `${topic.accent}14`, border: `1px solid ${topic.accent}28` }}
                    >
                      <Icon size={18} style={{ color: topic.accent }} />
                    </div>
                    <div>
                      <p className="font-headline text-[0.9375rem] font-bold text-slate-900">{topic.label}</p>
                      <p className="mt-1 text-[0.875rem] leading-relaxed text-slate-500">{topic.desc}</p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="bg-[#f8f9fc] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="mb-10">
            <span className="overline-badge mb-4 inline-flex">Artikelen</span>
            <h2
              className="font-headline font-extrabold leading-[1.06] tracking-[-0.035em] text-slate-900"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}
            >
              Alle artikelen
            </h2>
          </Reveal>

          {articles.length === 0 ? (
            <Reveal className="py-24 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-100 bg-white shadow-sm">
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
                <Reveal className="mb-10">
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
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
