import Link from 'next/link'
import { ArrowRight, Quote, Star } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import type { TestimonialWithProject } from '@/lib/queries/testimonials'
import { fallbackReviews } from '@/lib/homepage-content'

interface ReviewsSectionProps {
  testimonials: TestimonialWithProject[]
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < count ? 'fill-slate-900 text-slate-900' : 'fill-slate-200 text-slate-200'}
        />
      ))}
    </div>
  )
}

export default function ReviewsSection({ testimonials }: ReviewsSectionProps) {
  const source = testimonials.length > 0
    ? testimonials.map((item) => ({
        content: item.content,
        name: item.name,
        role: item.role || item.project?.title || 'Klant van WebsUp',
        rating: item.rating ?? 5,
      }))
    : fallbackReviews.map((item) => ({ ...item, rating: 5 }))

  const featured =
    source.find((item) => !/achterstallige|geen afbeeldingen|probleem|bug|fout/i.test(item.content)) ??
    source[0]
  const rest = source.filter((item) => item !== featured)
  const smallReviews = rest.slice(0, 3)

  return (
    <section className="bg-slate-50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mb-10 max-w-3xl">
          <span className="overline-badge mb-5 inline-flex">Ervaringen</span>
          <h2 className="font-headline text-4xl font-extrabold leading-[1.06] tracking-[-0.02em] text-slate-900 md:text-5xl">
            Wat klanten over WebsUp zeggen
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-500 md:text-lg">
            Geen glad verhaal van mij, maar ervaringen van klanten die met WebsUp hebben gewerkt.
          </p>
        </Reveal>

        {featured && (
          <Reveal delay={80}>
            <article className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm shadow-slate-950/[0.03] md:p-10">
              <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
                <div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white">
                    <Quote size={22} />
                  </div>
                  <div className="mt-6">
                    <Stars count={featured.rating} />
                    <div className="mt-4 font-semibold text-slate-900">{featured.name}</div>
                    <div className="mt-1 text-sm text-slate-400">{featured.role}</div>
                  </div>
                </div>
                <p className="font-headline text-2xl font-bold leading-relaxed text-slate-900 md:text-3xl">
                  &ldquo;{featured.content}&rdquo;
                </p>
              </div>
            </article>
          </Reveal>
        )}

        {smallReviews.length > 0 && (
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {smallReviews.map((review, index) => (
              <Reveal key={`${review.name}-${index}`} delay={120 + index * 50}>
                <article className="h-full rounded-2xl border border-slate-200 bg-white p-6">
                  <Stars count={review.rating} />
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">
                    &ldquo;{review.content}&rdquo;
                  </p>
                  <div className="mt-5 border-t border-slate-100 pt-4">
                    <div className="text-sm font-semibold text-slate-900">{review.name}</div>
                    <div className="mt-0.5 text-xs text-slate-400">{review.role}</div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}

        <Reveal delay={280}>
          <div className="mt-8">
            <Link href="/projecten" className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition-colors hover:border-slate-400">
              Bekijk meer ervaringen
              <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
