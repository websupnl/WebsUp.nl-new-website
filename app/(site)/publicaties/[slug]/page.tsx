export const revalidate = 60

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, BookOpen, Calendar, ExternalLink } from 'lucide-react'
import PublicationBlockRenderer from '@/components/site/PublicationBlockRenderer'
import PublicationViewer from '@/components/site/PublicationViewer'
import Reveal from '@/components/ui/Reveal'
import WavePageHeader from '@/components/site/WavePageHeader'
import CTASection from '@/components/site/CTASection'
import {
  getPublicationBySlug,
  getPublicationBlocks,
  getLatestPublications,
  getAllPublicationSlugs,
} from '@/lib/queries/publications'
import { formatDate } from '@/lib/utils'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllPublicationSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const publication = await getPublicationBySlug(slug)

  if (!publication) return {}

  const description = publication.excerpt ?? publication.description ?? undefined

  return {
    title: publication.title,
    description,
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: `/publicaties/${slug}`,
    },
    openGraph: {
      title: publication.title,
      description,
      images: publication.image_url ? [publication.image_url] : [],
    },
  }
}

export default async function PublicatieDetailPage({ params }: Props) {
  const { slug } = await params
  const publication = await getPublicationBySlug(slug)

  if (!publication) notFound()

  const [blocks, allRecent] = await Promise.all([
    getPublicationBlocks(publication.id),
    getLatestPublications(4),
  ])

  const related = allRecent.filter((item) => item.id !== publication.id).slice(0, 3)
  const excerpt = publication.excerpt ?? publication.description

  return (
    <div>
      <WavePageHeader
        badge={publication.label || 'Publicatie'}
        title={publication.title}
        subtitle={excerpt ?? 'Digitale publicatie beschikbaar via WebsUp.'}
        heightClass="min-h-[54vh]"
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="/publicaties"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            <ArrowLeft size={14} />
            Alle publicaties
          </Link>
          {publication.flip_url && (
            <a
              href="#viewer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-white/90"
            >
              Bekijk online
              <ExternalLink size={14} />
            </a>
          )}
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-5 text-sm text-white/55">
          <span className="inline-flex items-center gap-2">
            <Calendar size={14} />
            {formatDate(publication.created_at)}
          </span>
          <span className="inline-flex items-center gap-2">
            <BookOpen size={14} />
            {publication.flip_url ? 'Online bladerbaar' : 'Detailpagina beschikbaar'}
          </span>
        </div>
      </WavePageHeader>

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <Reveal>
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100">
              {publication.image_url ? (
                <Image
                  src={publication.image_url}
                  alt={publication.title}
                  width={900}
                  height={1200}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              ) : (
                <div className="flex aspect-[4/5] items-center justify-center bg-slate-100">
                  <BookOpen size={28} className="text-slate-300" />
                </div>
              )}
            </div>
          </Reveal>

          <Reveal delay={50}>
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7 lg:p-10">
              <span className="overline-badge mb-4 inline-flex">Context</span>
              <h2 className="font-headline text-3xl font-extrabold text-slate-900 md:text-4xl">
                Een publicatie die binnen dezelfde rustige stijl leesbaar blijft.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600 md:text-lg">
                {excerpt ??
                  'Deze publicatie is online beschikbaar gemaakt binnen de WebsUp-site, zonder dat de presentatie uit de toon valt bij de rest van het merk.'}
              </p>

              {publication.flip_url && (
                <div className="mt-8">
                  <a
                    href="#viewer"
                    className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
                  >
                    Open bladerweergave
                    <ArrowRight size={14} />
                  </a>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {blocks.length > 0 && (
        <section className="bg-slate-50">
          {blocks.map((block, index) => (
            <PublicationBlockRenderer key={block.id} block={block} index={index} />
          ))}
        </section>
      )}

      {publication.flip_url && (
        <section id="viewer" className="bg-white py-16 lg:py-20">
          <Reveal className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="mb-10 text-center">
              <span className="overline-badge mb-4 inline-flex">Online viewer</span>
              <h2 className="font-headline text-3xl font-extrabold text-slate-900 md:text-4xl">
                Blader door de publicatie
              </h2>
            </div>
            <PublicationViewer flip_url={publication.flip_url} />
          </Reveal>
        </section>
      )}

      {related.length > 0 && (
        <section className="bg-slate-50 py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Reveal className="mb-10 max-w-3xl">
              <span className="overline-badge mb-4 inline-flex">Meer publicaties</span>
              <h2 className="font-headline text-3xl font-extrabold text-slate-900 md:text-4xl">
                Bekijk ook
              </h2>
            </Reveal>

            <div className="divide-y divide-slate-200 rounded-[2rem] border border-slate-200 bg-white">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/publicaties/${item.slug}`}
                  className="group flex items-start justify-between gap-5 px-6 py-5 transition-colors hover:bg-slate-50 md:px-8"
                >
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-500">
                      {item.label || 'Publicatie'}
                    </div>
                    <div className="mt-2 font-headline text-2xl font-bold text-slate-900 transition-colors group-hover:text-orange-500">
                      {item.title}
                    </div>
                    <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-500">
                      {item.excerpt ?? item.description ?? 'Digitale publicatie beschikbaar via WebsUp.'}
                    </p>
                  </div>
                  <ArrowRight size={16} className="mt-1 flex-shrink-0 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-orange-500" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </div>
  )
}
