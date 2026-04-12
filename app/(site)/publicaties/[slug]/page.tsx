import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getPublicationBySlug, getPublicationBlocks, getLatestPublications, getAllPublicationSlugs } from '@/lib/queries/publications'
import { formatDate } from '@/lib/utils'
import { Calendar, ArrowLeft, ArrowRight, BookOpen, Users, TrendingUp, Target } from 'lucide-react'
import PublicationBlockRenderer from '@/components/site/PublicationBlockRenderer'
import PublicationViewer from '@/components/site/PublicationViewer'
import PublicationCard from '@/components/site/PublicationCard'
import Reveal from '@/components/ui/Reveal'

export const revalidate = 60

export async function generateStaticParams() {
  const slugs = await getAllPublicationSlugs()
  return slugs.map((slug) => ({ slug }))
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const publication = await getPublicationBySlug(slug)
  if (!publication) return {}

  const desc = publication.excerpt ?? publication.description ?? undefined

  const images = publication.image_url
    ? [{ url: publication.image_url, width: 900, height: 1200, alt: publication.title }]
    : []

  return {
    title: publication.title,
    description: desc,
    alternates: {
      canonical: `/publicaties/${slug}`,
    },
    openGraph: {
      title: publication.title,
      description: desc,
      type: 'article',
      locale: 'nl_NL',
      publishedTime: publication.created_at,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: publication.title,
      description: desc,
      images: publication.image_url ? [publication.image_url] : [],
    },
  }
}

const stats = [
  { icon: BookOpen, value: '500+', label: 'Publicaties verzorgd' },
  { icon: Users, value: '1.200+', label: 'Lezers per editie' },
  { icon: TrendingUp, value: '15+', label: 'Jaar ervaring' },
  { icon: Target, value: '100%', label: 'Zakelijke doelgroep' },
]

export default async function PublicatieDetailPage({ params }: Props) {
  const { slug } = await params
  const publication = await getPublicationBySlug(slug)

  if (!publication) notFound()

  const [blocks, allRecent] = await Promise.all([
    getPublicationBlocks(publication.id),
    getLatestPublications(4),
  ])

  const related = allRecent.filter((p) => p.id !== publication.id).slice(0, 3)
  const excerpt = publication.excerpt ?? publication.description

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_38%),_radial-gradient(circle_at_bottom_right,_rgba(129,140,248,0.18),_transparent_32%)]" />
        <Reveal className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div className="relative z-10">
              <Link
                href="/publicaties"
                className="inline-flex items-center gap-2 text-slate-300 hover:text-white text-sm mb-6 transition-colors"
              >
                <ArrowLeft size={15} />
                Alle publicaties
              </Link>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6 max-w-3xl">
                {publication.title}
              </h1>

              {excerpt && (
                <p className="text-slate-300 text-lg sm:text-xl max-w-2xl leading-relaxed mb-8">
                  {excerpt}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-10">
                <span className="inline-flex items-center gap-2">
                  <Calendar size={14} />
                  {formatDate(publication.created_at)}
                </span>
                <span className="inline-flex h-1 w-1 rounded-full bg-slate-500" />
                <span>{publication.flip_url ? 'Online beschikbaar' : 'Wordt binnenkort beschikbaar'}</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {publication.flip_url ? (
                  <a
                    href="#viewer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all shadow-lg"
                  >
                    Bekijk publicatie
                    <ArrowRight size={18} />
                  </a>
                ) : (
                  <span className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-100 text-slate-900 font-semibold rounded-full shadow-sm">
                    Binnenkort beschikbaar
                  </span>
                )}
              </div>
            </div>

            <div className="relative z-10">
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 shadow-2xl shadow-slate-950/20">
                {publication.image_url ? (
                  <Image
                    src={publication.image_url}
                    alt={publication.title}
                    width={900}
                    height={1200}
                    className="w-full max-w-full object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <div className="aspect-[4/5] bg-slate-800" />
                )}
                {publication.label && (
                  <span className="absolute right-4 top-4 inline-flex items-center rounded-full bg-blue-600/95 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white shadow-lg shadow-blue-900/20">
                    {publication.label}
                  </span>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Stats balk */}
      <div className="bg-blue-600 py-8">
        <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white leading-none">{value}</div>
                  <div className="text-blue-200 text-xs mt-0.5">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Content blokken */}
      {blocks.length > 0 && (
        <Reveal>
          {blocks.map((block, index) => (
            <PublicationBlockRenderer key={block.id} block={block} index={index} />
          ))}
        </Reveal>
      )}

      {/* FlipHTML5 Viewer */}
      {publication.flip_url && (
        <section id="viewer" className="bg-white py-16 lg:py-20">
          <Reveal className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="inline-block text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3 bg-blue-50 px-3 py-1 rounded-full">
                Online lezer
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Blader door de publicatie
              </h2>
            </div>
            <PublicationViewer flip_url={publication.flip_url} />
          </Reveal>
        </section>
      )}

      {/* CTA aanvragen */}
      <section className="bg-white pt-16 pb-24 lg:pb-32 overflow-hidden">
        <Reveal className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="bg-gray-900 px-8 sm:px-12 lg:px-16 py-16 lg:py-20 flex flex-col justify-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
                Vraag deze publicatie aan
              </h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-xl">
            Interesse in deze publicatie of wilt u meer informatie? Neem vrijblijvend contact op, wij helpen u graag verder.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 w-fit px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all hover:shadow-lg"
                >
                  Neem contact op
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/publicaties"
                  className="inline-flex items-center gap-2 w-fit px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-full transition-all"
                >
                  Alle publicaties
                </Link>
              </div>
            </div>

            <div className="relative h-64 lg:h-auto min-h-[300px] bg-gray-200">
              <Image
                src="/group-of-young-business-people-in-the-modern-offic-2026-01-08-05-01-37-utc.jpg"
                alt="Zakelijke professionals in overleg"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Gerelateerde publicaties */}
      {related.length > 0 && (
        <section className="bg-gray-50 py-16 lg:py-20">
          <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10 text-center">
              Bekijk ook
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((pub) => (
                <PublicationCard key={pub.id} publication={pub} />
              ))}
            </div>
          </Reveal>
        </section>
      )}
    </div>
  )
}
