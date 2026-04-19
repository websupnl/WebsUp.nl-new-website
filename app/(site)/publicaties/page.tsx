export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, BookOpen } from 'lucide-react'
import CTASection from '@/components/site/CTASection'
import WavePageHeader from '@/components/site/WavePageHeader'
import Reveal from '@/components/ui/Reveal'
import { getPublications } from '@/lib/queries/publications'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Publicaties',
  description: 'Digitale publicaties en magazines die via WebsUp beheerd en gepresenteerd worden.',
  robots: {
    index: false,
    follow: true,
  },
}

export default async function PublicatiesPage() {
  const publications = await getPublications()

  return (
    <div>
      <WavePageHeader
        badge="Publicaties"
        title="Digitale publicaties"
        titleHighlight="en magazines."
        subtitle="Deze route blijft beschikbaar voor publicaties en bladerbare magazines, maar speelt bewust geen hoofdrol in de primaire WebsUp-site."
      />

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {publications.length === 0 ? (
            <Reveal className="py-24 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-100 bg-slate-50">
                <BookOpen size={24} className="text-slate-400" />
              </div>
              <h2 className="mb-3 font-headline text-2xl font-bold text-slate-900">Nog geen publicaties beschikbaar</h2>
              <p className="mx-auto max-w-md leading-relaxed text-slate-500">
                Zodra er publicaties live staan, verschijnen ze hier in dezelfde rustige stijl als de rest van de site.
              </p>
            </Reveal>
          ) : (
            <div className="divide-y divide-slate-200 rounded-[2rem] border border-slate-200 bg-slate-50">
              {publications.map((publication, index) => (
                <Reveal key={publication.id} delay={index * 40}>
                  <article className="grid gap-6 px-6 py-6 md:grid-cols-[12rem_1fr_auto] md:items-center md:px-8">
                    <div className="relative overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white">
                      {publication.image_url ? (
                        <Image
                          src={publication.image_url}
                          alt={publication.title}
                          width={480}
                          height={640}
                          className="aspect-[4/5] h-auto w-full object-cover"
                          sizes="192px"
                        />
                      ) : (
                        <div className="flex aspect-[4/5] items-center justify-center bg-slate-100">
                          <BookOpen size={26} className="text-slate-300" />
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-500">
                        {publication.label || 'Publicatie'}
                      </div>
                      <h2 className="mt-2 font-headline text-2xl font-bold text-slate-900">{publication.title}</h2>
                      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
                        {publication.excerpt ?? publication.description ?? 'Digitale publicatie beschikbaar via WebsUp.'}
                      </p>
                      <div className="mt-4 text-xs text-slate-400">{formatDate(publication.created_at)}</div>
                    </div>

                    <Link
                      href={`/publicaties/${publication.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition-colors hover:text-orange-500"
                    >
                      Bekijk publicatie
                      <ArrowRight size={14} />
                    </Link>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </div>
  )
}
