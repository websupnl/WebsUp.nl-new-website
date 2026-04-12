import { Testimonial } from '@/types/database.types'
import { Star, Quote } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
  title?: string
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
] satisfies Array<Pick<Testimonial, 'id' | 'name' | 'role' | 'content' | 'rating'>>

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? 'fill-orange-400 text-orange-400' : 'fill-slate-200 text-slate-200'}
        />
      ))}
    </div>
  )
}

export default function TestimonialsSection({
  testimonials,
  title = 'Wat klanten over WebsUp zeggen',
}: TestimonialsSectionProps) {
  const items = testimonials.length > 0 ? testimonials : fallbackTestimonials

  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mb-12">
          <span className="overline-badge mb-4 inline-flex">Reviews</span>
          <h2 className="max-w-3xl font-headline text-4xl font-extrabold leading-[1.08] tracking-[-0.02em] text-slate-900 md:text-5xl">
            {title}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-500">
            Recht uit het dashboard geladen. Echte reviews van klanten die met WebsUp hebben samengewerkt.
          </p>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((testimonial, index) => (
            <Reveal key={testimonial.id} delay={index * 70}>
              <article className="group h-full rounded-[1.5rem] border border-slate-100 bg-white p-7 shadow-[0_12px_40px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-orange-100 hover:shadow-[0_18px_50px_rgba(249,115,22,0.10)]">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <StarRating rating={testimonial.rating} />
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-orange-100 bg-orange-50 text-orange-500">
                    <Quote size={16} />
                  </div>
                </div>

                <blockquote className="text-sm leading-relaxed text-slate-600">
                  &ldquo;{testimonial.content}&rdquo;
                </blockquote>

                <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white shadow-sm" style={{ background: 'linear-gradient(135deg,#f97316 0%,#ec4899 55%,#a78bfa 100%)' }}>
                    {testimonial.name
                      .split(' ')
                      .map((part) => part.charAt(0))
                      .join('')
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{testimonial.name}</p>
                    <p className="text-xs text-slate-400">{testimonial.role || 'Klant van WebsUp'}</p>
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
