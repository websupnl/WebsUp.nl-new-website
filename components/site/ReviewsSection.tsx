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
          className={i < count ? 'fill-orange-400 text-orange-400' : 'fill-slate-200 text-slate-200'}
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
  const sideReviews = (rest.length > 0 ? rest : source).slice(0, 3)

  return (
    <section className="relative overflow-hidden bg-white py-18 lg:py-24">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mb-10 grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <span className="overline-badge mb-5 inline-flex">Ervaringen</span>
            <h2
              className="font-headline font-extrabold leading-[1.04] tracking-[-0.03em] text-slate-900"
              style={{ fontSize: 'clamp(2rem, 3.4vw, 3.1rem)' }}
            >
              Reviews zonder verkooppraat.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-slate-600 lg:justify-self-end">
            Kort, echt en bruikbaar als bewijs. Niet nog een rij losse kaartjes, maar een compacte reviewsectie met focus.
          </p>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          {featured && (
            <Reveal>
              <figure
                data-cursor="active"
                className="group relative min-h-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-7 shadow-sm shadow-slate-950/[0.04] transition-all duration-500 hover:-translate-y-1 hover:border-orange-200 hover:bg-white hover:shadow-xl hover:shadow-slate-950/[0.08] md:p-9"
              >
                <div className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-105">
                  <Quote size={20} />
                </div>
                <Stars count={featured.rating} />
                <blockquote className="mt-7 max-w-3xl font-headline text-2xl font-bold leading-snug tracking-[-0.025em] text-slate-900 md:text-3xl lg:text-4xl">
                  &ldquo;{featured.content}&rdquo;
                </blockquote>
                <figcaption className="mt-8 flex flex-wrap items-center gap-3 border-t border-slate-200 pt-5 text-sm">
                  <span className="font-semibold text-slate-900">{featured.name}</span>
                  <span className="text-slate-300">/</span>
                  <span className="text-slate-500">{featured.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          )}

          <div className="grid gap-4">
            {sideReviews.map((review, index) => (
              <Reveal key={`${review.name}-${index}`} delay={index * 70}>
                <article className="group border-l border-slate-200 bg-slate-50 px-5 py-4 transition-colors duration-300 hover:border-orange-400/70 hover:bg-white">
                  <div className="flex items-center justify-between gap-4">
                    <Stars count={review.rating} />
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">
                      0{index + 1}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">
                    &ldquo;{review.content}&rdquo;
                  </p>
                  <div className="mt-4 text-sm">
                    <span className="font-semibold text-slate-900">{review.name}</span>
                    <span className="text-slate-400"> - {review.role}</span>
                  </div>
                </article>
              </Reveal>
            ))}

            <Reveal delay={260}>
              <Link
                href="/projecten"
                className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-200 hover:text-orange-600"
              >
                Bekijk projecten
                <ArrowRight size={14} />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
