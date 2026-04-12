import { AnimatedTestimonials, type AnimatedTestimonial } from '@/components/ui/animated-testimonials'
import Reveal from '@/components/ui/Reveal'
import { Testimonial } from '@/types/database.types'

interface AnimatedTestimonialsSectionProps {
  testimonials: Testimonial[]
}

const featuredReviews: AnimatedTestimonial[] = [
  {
    quote: 'Daan heeft voor ons in no time, binnen 2 weken, een complete professionele website gebouwd. Hij denkt creatief mee, komt met slimme ideeen en regelt alles snel en duidelijk. Qua kwaliteit en uitstraling komt het resultaat verrassend dicht in de buurt van veel duurdere agencies.',
    name: 'Jeremy Palsma',
    designation: 'Google review',
    rating: 5,
  },
  {
    quote: 'Gewoon top. Geduldig, denkt mee voor een mooie website en je merkt direct de betrouwbaarheid, professionaliteit en persoonlijke communicatie.',
    name: 'R. Haak',
    designation: 'Google review',
    rating: 5,
  },
  {
    quote: 'Daan heeft voor mij een website gemaakt en het ziet er keurig uit. Zeker een aanrader.',
    name: 'Robin van der Heide',
    designation: 'Google review',
    rating: 5,
  },
  {
    quote: 'Wij zijn super tevreden met onze nieuwe website. Het contact was fijn en snel, er werd goed geluisterd naar onze wensen en het resultaat is precies zoals we hoopten.',
    name: 'Nynke',
    designation: 'Google review',
    rating: 5,
  },
  {
    quote: 'Super tevreden over de website. Snelle service, makkelijk bereikbaar, reageert vlot en biedt ruimte voor eigen invulling en aanpassingen. Prettige samenwerking met Daan.',
    name: 'Ineke Bouws',
    designation: 'Google review',
    rating: 5,
  },
  {
    quote: 'Na het maken van een voorbeeld nog wat dingen aangepast en het resultaat is een perfecte website. Zeer tevreden mee.',
    name: 'Ronald',
    designation: 'Google review',
    rating: 5,
  },
  {
    quote: 'Communicatie was top en het eindresultaat een fantastische website. Je voelt direct dat dit een sterke samenwerking wordt.',
    name: 'Jan-Thomas Lodewijks',
    designation: 'Google review',
    rating: 5,
  },
  {
    quote: 'Daan van WebsUp heeft een geweldige job gedaan met onze nieuwe website. De service was ongelooflijk snel en hij dacht echt goed met ons mee.',
    name: 'Buurtvereniging Greate Buorren',
    designation: 'Google review',
    rating: 5,
  },
]

export default function AnimatedTestimonialsSection({
  testimonials,
}: AnimatedTestimonialsSectionProps) {
  const dbTestimonials: AnimatedTestimonial[] = testimonials.map((testimonial) => ({
    quote: testimonial.content,
    name: testimonial.name,
    designation: testimonial.role ?? 'Klant van WebsUp',
    rating: testimonial.rating,
  }))

  const mergedTestimonials = [...featuredReviews]

  dbTestimonials.forEach((testimonial) => {
    const exists = mergedTestimonials.some(
      (item) => item.name.toLowerCase() === testimonial.name.toLowerCase() && item.quote === testimonial.quote
    )

    if (!exists) {
      mergedTestimonials.push(testimonial)
    }
  })

  const items = mergedTestimonials.slice(0, 8)

  return (
    <section className="bg-white py-24 lg:py-32">
      <Reveal className="mx-auto mb-12 max-w-7xl px-6 lg:px-8">
        <span className="overline-badge mb-4 inline-flex">Ervaringen</span>
        <h2 className="max-w-3xl font-headline text-4xl font-extrabold leading-[1.08] tracking-[-0.02em] text-slate-900 md:text-5xl">
          Geen gelikte verkooppraat.
          <span className="gradient-text"> Gewoon reacties van klanten.</span>
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-500">
          Hoe de samenwerking voelt, hoe snel er geschakeld wordt en waarom klanten juist het directe contact waarderen.
        </p>
      </Reveal>

      <Reveal delay={80}>
        <AnimatedTestimonials testimonials={items} autoplay />
      </Reveal>
    </section>
  )
}
