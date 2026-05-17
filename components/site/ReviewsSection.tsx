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

export default async function ReviewsSection() {
  const db = await getTestimonials()
  const testimonials: TestimonialWithProject[] = db.length > 0 ? db : FALLBACK

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
