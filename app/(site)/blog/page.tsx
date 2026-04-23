export const revalidate = 3600

import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getNewsArticles } from '@/lib/queries/news'
import Reveal from '@/components/ui/Reveal'
import CTASection from '@/components/site/CTASection'
import WavePageHeader from '@/components/site/WavePageHeader'
import { BlogPostCard } from '@/components/ui/card-18'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Inzichten, tips en updates over webdevelopment, automatisering en digitale groei.',
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function BlogPage() {
  const articles = await getNewsArticles()

  return (
    <div>
      <WavePageHeader
        badge="Inzichten"
        title="Blog &"
        titleHighlight="updates."
        subtitle="Tips, inzichten en updates over webdevelopment, automatisering en digitale groei."
      />

      {/* Articles */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {articles.length === 0 ? (
            <Reveal className="text-center py-20">
              <div className="text-4xl mb-4">✍️</div>
              <h2 className="font-headline text-2xl font-bold text-slate-900 mb-3">
                Eerste artikel komt eraan
              </h2>
              <p className="text-slate-500 max-w-md mx-auto">
                We zijn bezig met de eerste blogposts. Kom snel terug of neem contact op.
              </p>
              <Link href="/contact" className="btn-brand inline-flex items-center gap-2 px-6 py-3 mt-6 text-sm">
                Contact opnemen <ArrowRight size={16} />
              </Link>
            </Reveal>
          ) : (
            <>
              {/* Featured (first article) */}
              {articles[0] && (
                <Reveal className="mb-14">
                  <BlogPostCard
                    variant="featured"
                    tag="Uitgelicht"
                    date={formatDate(articles[0].created_at)}
                    title={articles[0].title}
                    description={articles[0].excerpt ?? ''}
                    imageUrl={articles[0].image_url ?? undefined}
                    href={`/blog/${articles[0].slug}`}
                    readMoreText="Lees meer"
                  />
                </Reveal>
              )}

              {/* Grid */}
              {articles.length > 1 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {articles.slice(1).map((article, i) => (
                    <Reveal key={article.id} delay={i * 60}>
                      <BlogPostCard
                        tag="Update"
                        date={formatDate(article.created_at)}
                        title={article.title}
                        description={article.excerpt ?? ''}
                        imageUrl={article.image_url ?? undefined}
                        href={`/blog/${article.slug}`}
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
