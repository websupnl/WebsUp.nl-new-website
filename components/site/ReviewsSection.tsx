import Link from 'next/link'
import { ArrowRight, Quote, Star } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import GrainOverlay from '@/components/ui/GrainOverlay'
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
          className={i < count ? 'fill-orange-400 text-orange-400' : 'fill-white/14 text-white/14'}
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
  const marqueeItems = rest.length > 0 ? rest : source

  return (
    <section className="relative overflow-hidden bg-[#06040c] py-16 lg:py-24">
      <GrainOverlay opacity={0.04} />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mb-10 max-w-3xl">
          <span className="overline-badge overline-badge-dark mb-5 inline-flex">Ervaringen</span>
          <h2
            className="font-headline font-extrabold leading-[1.06] tracking-[-0.03em] text-white"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
          >
            Wat klanten over WebsUp zeggen
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/52 md:text-lg">
            Geen glad verhaal van mij, maar ervaringen van klanten die met WebsUp hebben gewerkt.
          </p>
        </Reveal>

        {featured && (
          <Reveal delay={80}>
            <article className="glass-panel-dark mb-5 rounded-[1.75rem] p-7 md:p-10">
              <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
                <div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white">
                    <Quote size={22} />
                  </div>
                  <div className="mt-6">
                    <Stars count={featured.rating} />
                    <div className="mt-4 font-semibold text-white">{featured.name}</div>
                    <div className="mt-1 text-sm text-white/42">{featured.role}</div>
                  </div>
                </div>
                <p className="font-headline text-2xl font-bold leading-relaxed text-white md:text-3xl">
                  &ldquo;{featured.content}&rdquo;
                </p>
              </div>
            </article>
          </Reveal>
        )}

        {marqueeItems.length > 0 && (
          <Reveal delay={140}>
            <div className="overflow-hidden">
              <div className="marquee-track flex gap-4" style={{ width: 'max-content' }}>
                {[...marqueeItems, ...marqueeItems].map((review, index) => (
                  <article
                    key={`${review.name}-${index}`}
                    className="glass-panel-dark w-[280px] shrink-0 rounded-2xl p-6"
                  >
                    <Stars count={review.rating} />
                    <p className="mt-4 text-sm leading-relaxed text-white/62">
                      &ldquo;{review.content}&rdquo;
                    </p>
                    <div className="mt-5 border-t border-white/10 pt-4">
                      <div className="text-sm font-semibold text-white/84">{review.name}</div>
                      <div className="mt-0.5 text-xs text-white/38">{review.role}</div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        <Reveal delay={200}>
          <div className="mt-8">
            <Link
              href="/projecten"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/14"
            >
              Bekijk meer ervaringen
              <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
