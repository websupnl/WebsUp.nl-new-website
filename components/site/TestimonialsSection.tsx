import type { Testimonial } from '@/types/database.types'
import { Quote, Star } from 'lucide-react'
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
    content:
      'Daan heeft voor ons in no time, binnen 2 weken, een complete professionele website gebouwd. Hij denkt creatief mee, komt met slimme ideeen en regelt alles snel en duidelijk. Qua kwaliteit en uitstraling komt het resultaat verrassend dicht in de buurt van veel duurdere agencies.',
    rating: 5,
  },
  {
    id: 'fallback-r-haak',
    name: 'R. Haak',
    role: 'Google review',
    content:
      'Gewoon top. Geduldig en het meedenken voor een mooie website. Ik heb voor WebsUp gekozen voor betrouwbaarheid, professionaliteit en persoonlijke communicatie.',
    rating: 5,
  },
  {
    id: 'fallback-robin-van-der-heide',
    name: 'Robin van der Heide',
    role: 'Google review',
    content:
      'Daan heeft voor mij een website gemaakt en het ziet er keurig uit. Zeker een aanrader.',
    rating: 5,
  },
  {
    id: 'fallback-nynke',
    name: 'Nynke',
    role: 'Google review',
    content:
      'Wij zijn super tevreden met onze nieuwe website. Het contact was fijn en snel, er werd goed geluisterd naar onze wensen en het resultaat is precies zoals we hoopten.',
    rating: 5,
  },
  {
    id: 'fallback-ineke-bouws',
    name: 'Ineke Bouws',
    role: 'Google review',
    content:
      'Super tevreden over de website. Snelle service, makkelijk bereikbaar, reageert vlot en biedt ruimte voor eigen invulling en aanpassingen. Prettige samenwerking met Daan.',
    rating: 5,
  },
  {
    id: 'fallback-jan-thomas-lodewijks',
    name: 'Jan-Thomas Lodewijks',
    role: 'Google review',
    content:
      'Communicatie was top en met eindresultaat een fantastische website. Echt een aanrader.',
    rating: 5,
  },
  {
    id: 'fallback-jan-de-haan',
    name: 'Jan de Haan',
    role: 'Google review',
    content:
      'Daan heeft een leuke site gemaakt: duidelijk, eenvoudig en vlot. Echt een aanrader.',
    rating: 5,
  },
  {
    id: 'fallback-ronald',
    name: 'Ronald',
    role: 'Google review',
    content:
      'Goed contact met Daan gehad. Na het maken van een voorbeeld nog wat dingen aangepast en het resultaat is een perfecte website. Zeer tevreden mee.',
    rating: 5,
  },
  {
    id: 'fallback-johannes-rondaan',
    name: 'Johannes Rondaan',
    role: 'Google review',
    content: 'Hele mooie website laten maken. Ben blij met het resultaat.',
    rating: 5,
  },
  {
    id: 'fallback-greate-buorren',
    name: 'Buurtvereniging Greate Buorren',
    role: 'Google review',
    content:
      'Daan van WebsUp heeft een geweldige job gedaan met onze nieuwe website. De service was ongelooflijk snel en hij dacht echt goed met ons mee.',
    rating: 5,
  },
  {
    id: 'fallback-hans-veenstra',
    name: 'Hans "Flyingdutchman #66" Veenstra',
    role: 'Google review',
    content: 'Zeer goed werk verricht. Ben blij met mijn nieuwe website.',
    rating: 5,
  },
] satisfies Array<Pick<Testimonial, 'id' | 'name' | 'role' | 'content' | 'rating'>>

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={14}
          className={
            index < rating ? 'fill-orange-400 text-orange-400' : 'fill-slate-200 text-slate-200'
          }
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
  const featured = items[0]
  const secondary = items.slice(1)

  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <Reveal>
            <span className="overline-badge mb-4 inline-flex">Reviews</span>
            <h2 className="max-w-3xl font-headline text-4xl font-extrabold leading-[1.08] tracking-[-0.02em] text-slate-900 md:text-5xl">
              {title}
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-500">
              Echte reviews van klanten die met WebsUp hebben samengewerkt.
            </p>

            <div className="mt-10 border-l-2 border-orange-200 pl-5">
              <div className="text-sm font-semibold text-slate-900">Geen opgepoetste testimonials</div>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Gewoon ervaringen van klanten over de samenwerking, communicatie en het eindresultaat.
              </p>
            </div>
          </Reveal>

          <div>
            {featured && (
              <Reveal>
                <article className="border-b border-slate-200 pb-10">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                      <Quote size={16} />
                    </div>
                    <StarRating rating={featured.rating} />
                  </div>

                  <blockquote className="max-w-3xl font-headline text-2xl font-bold leading-[1.35] text-slate-900 md:text-[2rem]">
                    &ldquo;{featured.content}&rdquo;
                  </blockquote>

                  <div className="mt-6 flex items-center gap-3">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white"
                      style={{ background: 'linear-gradient(135deg,#f97316 0%,#ec4899 55%,#a78bfa 100%)' }}
                    >
                      {featured.name
                        .split(' ')
                        .map((part) => part.charAt(0))
                        .join('')
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{featured.name}</p>
                      <p className="text-xs text-slate-400">{featured.role || 'Klant van WebsUp'}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            )}

            <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
              {secondary.map((testimonial, index) => (
                <Reveal key={testimonial.id} delay={index * 70}>
                  <article className="border-t border-slate-200 pt-6">
                    <StarRating rating={testimonial.rating} />
                    <blockquote className="mt-4 text-sm leading-relaxed text-slate-600">
                      &ldquo;{testimonial.content}&rdquo;
                    </blockquote>
                    <div className="mt-5">
                      <p className="text-sm font-semibold text-slate-900">{testimonial.name}</p>
                      <p className="text-xs text-slate-400">{testimonial.role || 'Klant van WebsUp'}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
