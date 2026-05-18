import Reveal from '@/components/ui/Reveal'
import ReviewsCarousel from '@/components/site/ReviewsCarousel'
import { getTestimonials } from '@/lib/queries/testimonials'
import { fallbackReviews } from '@/lib/homepage-content'
import type { TestimonialWithProject } from '@/lib/queries/testimonials'

const FALLBACK: TestimonialWithProject[] = fallbackReviews.map((r, i) => ({
  id: `fallback-${i}`,
  tenant_id: null,
  name: r.name,
  role: r.role,
  content: r.content,
  rating: 5,
  avatar_url: null,
  published: true,
  project_id: null,
  created_at: new Date().toISOString(),
  project: null,
}))

function sortReviews(reviews: TestimonialWithProject[]): TestimonialWithProject[] {
  return [...reviews].sort((a, b) => {
    // Reviews with a named role first (real ones), null role = generic "Klant van WebsUp" last
    if (a.role && !b.role) return -1
    if (!a.role && b.role) return 1
    return 0
  })
}

export default async function ReviewsSection() {
  const db = await getTestimonials()
  const testimonials: TestimonialWithProject[] = db.length > 0 ? sortReviews(db) : FALLBACK

  return (
    <section className="relative overflow-hidden bg-slate-50 py-18 lg:py-24">
      <div className="pointer-events-none absolute -top-16 right-[8%] h-64 w-64 rounded-full bg-pink-400/6 blur-[80px]" />
      <div className="pointer-events-none absolute bottom-0 left-[4%] h-56 w-56 rounded-full bg-orange-400/6 blur-[70px]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mb-12 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <span className="overline-badge mb-5 inline-flex">Ervaringen</span>
            <h2
              className="font-headline font-extrabold leading-[1.06] tracking-[-0.03em] text-slate-900"
              style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.9rem)' }}
            >
              Klanten aan het woord.
            </h2>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
                <span className="flex gap-0.5">
                  {[0,1,2,3,4].map(i => (
                    <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#FBBC05" aria-hidden="true">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </span>
                <span className="text-sm font-bold text-slate-900">5.0</span>
                <span className="text-xs text-slate-400">Google</span>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-green-400" />
                <span className="text-xs font-semibold text-slate-700">Beschikbaar voor nieuwe projecten</span>
              </div>
            </div>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-slate-600 lg:justify-self-end">
            Geen marketingpraat — echte feedback van mensen waarvoor ik heb gebouwd.
          </p>
        </Reveal>

        <ReviewsCarousel testimonials={testimonials} />
      </div>
    </section>
  )
}
