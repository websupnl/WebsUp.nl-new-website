export const revalidate = 3600

import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle,
  MapPin,
  Quote,
  Star,
} from 'lucide-react'
import WavePageHeader from '@/components/site/WavePageHeader'
import CTASection from '@/components/site/CTASection'
import Reveal from '@/components/ui/Reveal'
import GradientIcon from '@/components/site/GradientIcon'
import GlassStatGrid from '@/components/site/GlassStatGrid'
import { getTestimonials } from '@/lib/queries/testimonials'
import type { Testimonial } from '@/types/database.types'

export const metadata: Metadata = {
  title: 'Over mij',
  description:
    'Bij WebsUp schakel je direct met degene die meedenkt, ontwerpt en bouwt. Geen tussenlagen, geen ruis, wel korte lijnen en een oplossing die past bij jouw bedrijf.',
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
    id: 'fallback-nynke',
    name: 'Nynke',
    role: 'Google review',
    content:
      'Wij zijn super tevreden met onze nieuwe website. Het contact was fijn en snel, er werd goed geluisterd naar onze wensen en het resultaat is precies zoals we hoopten.',
    rating: 5,
  },
] satisfies Array<Pick<Testimonial, 'id' | 'name' | 'role' | 'content' | 'rating'>>

const collaborationSteps = [
  'We beginnen gewoon met een gesprek over je bedrijf, je vraag en waar je op vastloopt.',
  'Daarna bepalen we samen wat de slimste stap is. Soms is dat een website, soms juist meer.',
  'Vanaf daar bouwen we iets dat klopt, goed werkt en later verder kan meegroeien.',
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={14}
          className={index < rating ? 'fill-orange-400 text-orange-400' : 'fill-white/10 text-white/10'}
        />
      ))}
    </div>
  )
}

export default async function OverOnsPage() {
  const testimonials = await getTestimonials()
  const reviewItems = (testimonials.length > 0 ? testimonials : fallbackTestimonials).slice(0, 3)
  const featuredReview = reviewItems[0]
  const sideReviews = reviewItems.slice(1)

  return (
    <div>
      <WavePageHeader
        badge="Over mij"
        title="Geen groot bureau."
        titleHighlight="Wel direct contact."
        subtitle="Bij WebsUp schakel je direct met degene die meedenkt, ontwerpt en bouwt. Geen tussenlagen, geen ruis, wel korte lijnen en een oplossing die past bij jouw bedrijf."
      >
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-all hover:-translate-y-px hover:bg-white/90"
          >
            Plan een kennismaking
            <ArrowRight size={14} />
          </Link>
          <Link
            href="/gratis-ontwerp"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-px hover:bg-white/15"
          >
            Vraag gratis ontwerp aan
          </Link>
        </div>

        <GlassStatGrid
          items={[
            { value: 'Direct contact', label: 'geen tussenlagen' },
            { value: 'Korte lijnen', label: 'snel schakelen' },
            { value: 'Persoonlijk', label: 'maar wel professioneel' },
          ]}
        />
      </WavePageHeader>

      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
            <Reveal className="relative min-h-[26rem] overflow-hidden rounded-lg bg-slate-100">
              <div className="absolute inset-0">
                <Image
                  src="/Daan Koolhaas.jpg"
                  alt="Daan Koolhaas van WebsUp"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#06040c]/70 via-[#06040c]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="text-lg font-semibold">Daan Koolhaas</div>
                <div className="mt-1 text-sm text-white/72">Direct aanspreekpunt voor jouw project</div>
              </div>
            </Reveal>

            <Reveal>
              <div>
                <span className="overline-badge mb-4 inline-flex">Wie er achter WebsUp zit</span>
                <h2 className="font-headline text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] text-slate-900 md:text-4xl">
                  Hoi, ik ben Daan
                </h2>
                <div className="mt-5 space-y-4 text-lg leading-relaxed text-slate-500">
                  <p>
                    Ik bouw websites en digitale oplossingen voor ondernemers en bedrijven die geen zin hebben in onnodig gedoe, vage trajecten of doorschuiven tussen verschillende mensen. Bij WebsUp werk je direct met degene die meedenkt en bouwt.
                  </p>
                  <p>
                    Soms is dat een website. Soms een webshop, dashboard of maatwerk oplossing. Ik kijk niet vanuit een standaard pakket, maar vanuit wat het beste past bij jouw situatie, je doelen en hoe jouw bedrijf werkt.
                  </p>
                </div>

                <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500">
                  <MapPin size={14} className="text-orange-500" />
                  Gebaseerd in Friesland, werk voor klanten door heel Nederland.
                </div>

                <div className="mt-8 space-y-4">
                  {[
                    'Direct contact met degene die bouwt',
                    'Eerlijk advies over wat wel en niet nodig is',
                    'Technisch sterk, maar praktisch ingestoken',
                    'Ruimte om later door te bouwen',
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 text-sm leading-relaxed text-slate-600"
                    >
                      <CheckCircle size={16} className="mt-0.5 flex-shrink-0 text-orange-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-white pb-20 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 border-t border-slate-200 pt-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14 lg:pt-12">
            <Reveal>
              <div>
                <span className="overline-badge mb-4 inline-flex">Waarom dit anders werkt</span>
                <h2 className="font-headline text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] text-slate-900 md:text-4xl">
                  Persoonlijk samenwerken, zonder het groter te maken dan het is
                </h2>
                <div className="mt-6 space-y-4 text-lg leading-relaxed text-slate-500">
                  <p>
                    WebsUp is geen groot bureau met accountmanagers, saleslagen of trajecten die onnodig zwaar worden opgetuigd. Het voordeel daarvan is simpel: communicatie blijft helder, keuzes blijven logisch en het werk blijft dicht op de praktijk.
                  </p>
                  <p>
                    Juist daardoor is er ruimte om eerlijk te kijken naar wat wel nodig is, en wat niet. Soms is dat een complete website, soms alleen een slimmere structuur, een webshop of een maatwerk oplossing achter de schermen.
                  </p>
                  <p>
                    Het doel is niet om overal een groot verhaal van te maken, maar om iets neer te zetten dat technisch klopt, prettig werkt en later nog verder kan meegroeien.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="border-t border-slate-200 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                  In de praktijk
                </div>
                <div className="mt-6 space-y-6">
                  {[
                    {
                      label: 'Communicatie',
                      text: 'Snel, duidelijk en zonder omwegen.',
                    },
                    {
                      label: 'Aanpak',
                      text: 'Geen standaard pakket, maar keuzes die passen bij het bedrijf.',
                    },
                    {
                      label: 'Techniek',
                      text: 'Stevig genoeg om nu goed te werken en later op door te bouwen.',
                    },
                  ].map((item) => (
                    <div key={item.label} className="border-b border-slate-200 pb-6 last:border-b-0 last:pb-0">
                      <div className="text-sm font-semibold text-slate-900">{item.label}</div>
                      <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <div>
                <span className="overline-badge mb-4 inline-flex">Samenwerken</span>
                <h2 className="font-headline text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] text-slate-900 md:text-4xl">
                  Geen ruis, wel duidelijke lijnen
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-slate-500">
                  Ik geloof niet in onnodig ingewikkelde trajecten. Het begint meestal gewoon met een gesprek: waar loop je tegenaan, wat wil je neerzetten en wat is daarin de slimste stap?
                </p>
                <p className="mt-4 text-lg leading-relaxed text-slate-500">
                  Of het nu gaat om een website, webshop of maatwerk digitale oplossing, het doel is altijd hetzelfde. Iets maken dat klopt, goed werkt en waar je op verder kunt bouwen.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="space-y-5 border-t border-slate-200 pt-6 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
                {collaborationSteps.map((step, index) => (
                  <div key={step} className="flex items-start gap-4">
                    <div
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl text-sm font-bold text-white"
                      style={{ background: 'linear-gradient(135deg,#f97316 0%,#ec4899 55%,#a78bfa 100%)' }}
                    >
                      {index + 1}
                    </div>
                    <p className="pt-1 text-base leading-relaxed text-slate-600">{step}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 border-t border-slate-200 pt-6">
                <div className="text-sm font-semibold text-slate-900">Wat dat in de praktijk betekent</div>
                <p className="mt-3 text-base leading-relaxed text-slate-500">
                  Geen accountmanager ertussen, geen onnodige vertraging en geen voorstel dat groter wordt gemaakt dan nodig. Wel een traject waarin ontwerp, techniek en logica goed op elkaar aansluiten.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="mb-12 max-w-3xl">
            <span className="overline-badge mb-4 inline-flex">Reviews</span>
            <h2 className="font-headline text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] text-slate-900 md:text-4xl">
              Wat klanten over de samenwerking zeggen
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-500">
              Echte reviews van klanten die met WebsUp hebben samengewerkt. Juist daarin zie je het persoonlijke contact en de korte lijnen terug.
            </p>
          </Reveal>

          <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
            {featuredReview && (
              <Reveal>
                <article className="h-full border-t border-slate-200 pt-8">
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <StarRating rating={featuredReview.rating} />
                    <GradientIcon icon={Quote} />
                  </div>
                  <blockquote className="max-w-2xl font-headline text-2xl font-bold leading-[1.3] text-slate-900 md:text-[2rem]">
                    &ldquo;{featuredReview.content}&rdquo;
                  </blockquote>
                  <div className="mt-8 flex items-center gap-3 border-t border-slate-200 pt-6">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white"
                      style={{ background: 'linear-gradient(135deg,#f97316 0%,#ec4899 55%,#a78bfa 100%)' }}
                    >
                      {featuredReview.name
                        .split(' ')
                        .map((part) => part.charAt(0))
                        .join('')
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{featuredReview.name}</div>
                      <div className="text-xs text-slate-400">{featuredReview.role || 'Klant van WebsUp'}</div>
                    </div>
                  </div>
                </article>
              </Reveal>
            )}

            <div className="border-t border-slate-200">
              {sideReviews.map((testimonial, index) => (
                <Reveal key={testimonial.id} delay={index * 80}>
                  <article className="border-b border-slate-200 py-6 last:border-b-0">
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <StarRating rating={testimonial.rating} />
                      <GradientIcon icon={Quote} size="sm" />
                    </div>
                    <blockquote className="text-sm leading-relaxed text-slate-600">
                      &ldquo;{testimonial.content}&rdquo;
                    </blockquote>
                    <div className="mt-5 flex items-center gap-3 border-t border-slate-200 pt-4">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white"
                        style={{ background: 'linear-gradient(135deg,#f97316 0%,#ec4899 55%,#a78bfa 100%)' }}
                      >
                        {testimonial.name
                          .split(' ')
                          .map((part) => part.charAt(0))
                          .join('')
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{testimonial.name}</div>
                        <div className="text-xs text-slate-400">{testimonial.role || 'Klant van WebsUp'}</div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  )
}
