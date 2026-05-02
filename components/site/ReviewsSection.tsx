import { Star } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import type { Testimonial } from '@/types/database.types'

interface ReviewsSectionProps {
  testimonials: Testimonial[]
  title?: string
  subtitle?: string
  /** Maximum aantal niet-featured reviews in het grid (excl. featured). */
  limit?: number
}

function Stars({ size = 13, count = 5 }: { size?: number; count?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < count ? 'fill-orange-400 text-orange-400' : 'fill-slate-200 text-slate-200'}
        />
      ))}
    </div>
  )
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0] ?? '')
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

/**
 * Kiest de "featured" review automatisch:
 * 1. de langste content met max rating, of
 * 2. valt terug op de eerste in de lijst.
 */
function pickFeatured(items: Testimonial[]): { featured: Testimonial | null; rest: Testimonial[] } {
  if (items.length === 0) return { featured: null, rest: [] }
  const maxRating = Math.max(...items.map((t) => t.rating ?? 0))
  const candidates = items.filter((t) => (t.rating ?? 0) === maxRating)
  const featured = candidates.reduce((best, t) =>
    (t.content?.length ?? 0) > (best.content?.length ?? 0) ? t : best,
  candidates[0])
  return {
    featured,
    rest: items.filter((t) => t.id !== featured.id),
  }
}

export default function ReviewsSection({
  testimonials,
  title = 'Wat klanten over WebsUp zeggen',
  subtitle = 'Echte ervaringen. Geen gelikte claims.',
  limit = 6,
}: ReviewsSectionProps) {
  if (testimonials.length === 0) return null

  const { featured, rest } = pickFeatured(testimonials)
  const visibleRest = rest.slice(0, limit)
  const totalCount = testimonials.length
  const avgRating =
    testimonials.reduce((sum, t) => sum + (t.rating ?? 0), 0) / testimonials.length

  return (
    <section className="relative px-6 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <Reveal>
          <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-orange-500">
                Reviews
              </span>
              <h2 className="mt-3 font-headline text-3xl font-extrabold leading-tight tracking-[-0.02em] text-slate-900 md:text-4xl lg:text-5xl">
                {title}
              </h2>
              <p className="mt-3 text-base text-slate-500 max-w-xl">{subtitle}</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/[0.06] px-4 py-2 text-sm font-semibold text-slate-900 self-start sm:self-end">
              <Stars size={14} count={Math.round(avgRating)} />
              <span>
                {avgRating.toFixed(1)} — {totalCount}+ Google reviews
              </span>
            </div>
          </div>
        </Reveal>

        {/* Featured review */}
        {featured && (
          <Reveal delay={80}>
            <div className="mb-5 rounded-2xl border border-slate-200 border-l-[3px] border-l-orange-500 bg-white p-8 shadow-sm md:p-10">
              <div className="mb-4">
                <Stars count={featured.rating ?? 5} />
              </div>
              <p className="text-lg leading-relaxed text-slate-700 md:text-xl">
                &ldquo;{featured.content}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                {featured.avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={featured.avatar_url}
                    alt={featured.name}
                    className="h-11 w-11 rounded-full object-cover"
                  />
                ) : (
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{
                      background:
                        'linear-gradient(135deg, #f97316 0%, #ec4899 50%, #a78bfa 100%)',
                    }}
                  >
                    {getInitials(featured.name)}
                  </div>
                )}
                <div>
                  <div className="font-semibold text-slate-900">{featured.name}</div>
                  {featured.role && (
                    <div className="text-xs text-slate-400">{featured.role}</div>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* Smaller cards */}
        {visibleRest.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visibleRest.map((r, i) => (
              <Reveal key={r.id} delay={120 + i * 50}>
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 flex flex-col">
                  <Stars count={r.rating ?? 5} />
                  <p className="mt-4 text-sm leading-relaxed text-slate-600 line-clamp-6 flex-1">
                    &ldquo;{r.content}&rdquo;
                  </p>
                  <div className="mt-5 flex items-center gap-2.5">
                    {r.avatar_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={r.avatar_url}
                        alt={r.name}
                        className="h-9 w-9 rounded-full object-cover"
                      />
                    ) : (
                      <div
                        className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white"
                        style={{
                          background:
                            'linear-gradient(135deg, #f97316 0%, #ec4899 50%, #a78bfa 100%)',
                        }}
                      >
                        {getInitials(r.name)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-slate-900 truncate">{r.name}</div>
                      {r.role && (
                        <div className="text-xs text-slate-400 truncate">{r.role}</div>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
