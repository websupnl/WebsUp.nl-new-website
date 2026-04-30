import type { Testimonial } from '@/types/database.types'
import { Star } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
  title?: string
  limit?: number
}

const fallbackTestimonials = [
  {
    id: 'fallback-jeremy-palsma',
    name: 'Jeremy Palsma',
    role: 'Google review',
    content: 'Daan heeft voor ons in no time, binnen 2 weken, een complete professionele website gebouwd. Hij denkt creatief mee, komt met slimme ideeen en regelt alles snel en duidelijk. Qua kwaliteit en uitstraling komt het resultaat verrassend dicht in de buurt van veel duurdere agencies.',
    rating: 5,
  },
  {
    id: 'fallback-r-haak',
    name: 'R. Haak',
    role: 'Google review',
    content: 'Gewoon top. Geduldig en het meedenken voor een mooie website. Ik heb voor WebsUp gekozen voor betrouwbaarheid, professionaliteit en persoonlijke communicatie.',
    rating: 5,
  },
  {
    id: 'fallback-robin-van-der-heide',
    name: 'Robin van der Heide',
    role: 'Google review',
    content: 'Daan heeft voor mij een website gemaakt en het ziet er keurig uit. Zeker een aanrader.',
    rating: 5,
  },
  {
    id: 'fallback-nynke',
    name: 'Nynke',
    role: 'Google review',
    content: 'Wij zijn super tevreden met onze nieuwe website. Het contact was fijn en snel, er werd goed geluisterd naar onze wensen en het resultaat is precies zoals we hoopten.',
    rating: 5,
  },
  {
    id: 'fallback-ineke-bouws',
    name: 'Ineke Bouws',
    role: 'Google review',
    content: 'Super tevreden over de website. Snelle service, makkelijk bereikbaar, reageert vlot en biedt ruimte voor eigen invulling en aanpassingen. Prettige samenwerking met Daan.',
    rating: 5,
  },
  {
    id: 'fallback-jan-thomas-lodewijks',
    name: 'Jan-Thomas Lodewijks',
    role: 'Google review',
    content: 'Communicatie was top en met eindresultaat een fantastische website. Echt een aanrader.',
    rating: 5,
  },
  {
    id: 'fallback-greate-buorren',
    name: 'Buurtvereniging Greate Buorren',
    role: 'Google review',
    content: 'Daan van WebsUp heeft een geweldige job gedaan met onze nieuwe website! De service was ongelooflijk snel en hij dacht echt goed met ons mee. Ik zou hem zeker aanraden aan iedereen die op zoek is naar een professionele en betrouwbare website-ontwikkelaar.',
    rating: 5,
  },
] satisfies Array<Pick<Testimonial, 'id' | 'name' | 'role' | 'content' | 'rating'>>

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map((p) => p.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase()
  return (
    <div
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
      style={{ background: 'linear-gradient(135deg,#f97316 0%,#ec4899 55%,#a78bfa 100%)' }}
    >
      {initials}
    </div>
  )
}

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < rating ? 'fill-orange-400 text-orange-400' : 'fill-white/10 text-white/10'}
        />
      ))}
    </div>
  )
}

export default function TestimonialsSection({
  testimonials,
  title = 'Wat klanten over WebsUp zeggen',
  limit = 7,
}: TestimonialsSectionProps) {
  const items = testimonials.length > 0 ? testimonials : fallbackTestimonials
  const featured = items[0]
  const grid = items.slice(1, limit)

  return (
    <section className="bg-[#06040c] py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <Reveal className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="overline-badge mb-4 inline-flex">Reviews</span>
            <h2 className="font-headline text-4xl font-extrabold leading-[1.08] tracking-[-0.02em] text-white md:text-5xl">
              {title}
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-white/50">
              Geen gelikte claims, maar ervaringen van klanten over communicatie, snelheid en het eindresultaat.
            </p>
          </div>
          <div className="shrink-0 rounded-2xl border border-white/8 bg-white/4 px-6 py-4 text-center">
            <div className="flex justify-center gap-0.5 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className="fill-orange-400 text-orange-400" />
              ))}
            </div>
            <div className="text-2xl font-bold text-white">5.0</div>
            <div className="mt-0.5 text-xs text-white/40">{items.length}+ Google reviews</div>
          </div>
        </Reveal>

        {/* Featured review */}
        {featured && (
          <Reveal>
            <article
              className="relative mb-5 overflow-hidden rounded-2xl border border-white/8 p-8 lg:p-12"
              style={{
                background:
                  'linear-gradient(135deg, rgba(249,115,22,0.07) 0%, rgba(236,72,153,0.05) 50%, rgba(167,139,250,0.07) 100%)',
              }}
            >
              {/* Decorative large quote mark */}
              <div
                className="pointer-events-none absolute right-6 top-0 select-none font-headline text-[9rem] font-extrabold leading-none text-white/[0.04] lg:right-10 lg:text-[13rem]"
                aria-hidden
              >
                &ldquo;
              </div>

              <Stars rating={featured.rating} size={16} />

              <blockquote className="relative mt-6 max-w-4xl font-headline text-2xl font-bold leading-[1.45] text-white lg:text-[1.85rem]">
                &ldquo;{featured.content}&rdquo;
              </blockquote>

              <div className="mt-8 flex items-center gap-3 border-t border-white/8 pt-6">
                <Avatar name={featured.name} />
                <div>
                  <p className="text-sm font-semibold text-white">{featured.name}</p>
                  <p className="text-xs text-white/40">{featured.role || 'Klant van WebsUp'}</p>
                </div>
              </div>
            </article>
          </Reveal>
        )}

        {/* Card grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {grid.map((t, index) => (
            <Reveal key={t.id} delay={index * 55}>
              <article className="flex h-full flex-col rounded-xl border border-white/8 bg-white/[0.03] p-6 transition-colors hover:bg-white/[0.06]">
                <Stars rating={t.rating} />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-white/65">
                  &ldquo;{t.content}&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center gap-3 border-t border-white/8 pt-5">
                  <Avatar name={t.name} />
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-white/40">{t.role || 'Klant van WebsUp'}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  )
}
