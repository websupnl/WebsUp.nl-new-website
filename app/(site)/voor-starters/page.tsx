import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, MessageCircle, Rocket } from 'lucide-react'
import CTASection from '@/components/site/CTASection'
import WavePageHeader from '@/components/site/WavePageHeader'
import Reveal from '@/components/ui/Reveal'

export const metadata: Metadata = {
  title: 'Voor starters',
  description:
    'Voor starters en ondernemers die professioneel willen beginnen zonder direct groter te bouwen dan nodig is.',
}

const starterFit = [
  'Je hebt een serieus idee en wilt professioneel starten',
  'Je zoekt een eerste stap die haalbaar is, maar niet goedkoop aanvoelt',
  'Je wilt ruimte houden om later uit te breiden met webshop, dashboard of automatisering',
  'Je zoekt iemand die eerlijk meedenkt over wat nu wel en juist nog niet slim is',
]

const firstSteps = [
  {
    title: 'Eerste website of landingspagina',
    text: 'Een sterke basis waarmee je direct professioneel naar buiten kunt treden zonder alles al dicht te timmeren.',
  },
  {
    title: 'Richting in aanbod en structuur',
    text: 'Soms is de eerste winst niet alleen bouwen, maar eerst scherp krijgen hoe je verhaal, aanbod en homepage moeten staan.',
  },
  {
    title: 'Webshop of slimme online basis',
    text: 'Als je direct iets wilt verkopen, kijken we naar een shop of opzet die logisch voelt en later kan meegroeien.',
  },
  {
    title: 'Maatwerk zodra het idee daarom vraagt',
    text: 'Sommige plannen draaien juist om een portaal, calculator, aanvraagflow of ander slim digitaal onderdeel. Dan pakken we dat mee.',
  },
]

const steps = [
  'Je vertelt waar je staat, wat je idee is en wat je nu vooral nodig hebt.',
  'We kijken samen wat de slimste eerste stap is en welke onderdelen nog prima kunnen wachten.',
  'Je krijgt een eerlijk voorstel dat past bij je fase, niet een pakket dat groter wordt gemaakt dan nodig.',
  'Als het klopt, bouwen we een basis waar je later gewoon op verder kunt groeien.',
]

export default function VoorStartersPage() {
  return (
    <div>
      <WavePageHeader
        badge="Voor starters"
        title="Goed beginnen"
        titleHighlight="zonder te groot te doen."
        subtitle="Niet ieder nieuw idee heeft direct een compleet bureau-traject nodig. Soms is een scherpe eerste stap juist veel sterker. WebsUp helpt starters met een professionele basis die nu klopt en later kan doorgroeien."
      >
        <div className="mt-7 flex flex-wrap gap-2">
          {['Professionele start', 'Eerlijk meedenken', 'Ruimte om door te groeien'].map((item) => (
            <span
              key={item}
              className="inline-flex rounded-full border border-white/12 bg-white/8 px-3 py-1 text-xs font-semibold text-white/72"
            >
              {item}
            </span>
          ))}
        </div>
      </WavePageHeader>

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
          <Reveal>
            <span className="overline-badge mb-4 inline-flex">Wat dit is</span>
            <h2 className="font-headline text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] text-slate-900 md:text-4xl">
              Geen algemene kortingsroute, wel een slimme instap als het idee klopt.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
              Voor starters is het vaak slimmer om eerst een sterke basis neer te zetten dan om
              direct alles te willen bouwen. Niet kleiner denken, wel logischer beginnen.
            </p>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
              Daarom kijk ik bij sommige starters bewust naar wat nu het meeste verschil maakt:
              een goede website, een eerste shop, duidelijke positionering of juist een slimme
              technische basis waar later op kan worden doorgebouwd.
            </p>
          </Reveal>

          <Reveal delay={60}>
            <div className="rounded-[2rem] bg-[#06040c] p-7 text-white lg:p-10">
              <div className="text-sm font-semibold uppercase tracking-[0.14em] text-white/44">
                Dit past vooral als
              </div>
              <div className="mt-6 space-y-4">
                {starterFit.map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm leading-relaxed text-white/72">
                    <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-orange-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[color:var(--surface-2)] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="max-w-3xl">
            <span className="overline-badge mb-4 inline-flex">Waar ik mee kan helpen</span>
            <h2 className="font-headline text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] text-slate-900 md:text-4xl">
              De beste eerste stap verschilt per idee.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Soms heb je vooral een sterke eerste indruk nodig. Soms juist structuur, een shop of
              een slimme technische basis. Daarom staat hier geen standaard starterspakket.
            </p>
          </Reveal>

          <div className="mt-12 divide-y divide-slate-200 rounded-[2rem] border border-slate-200 bg-white">
            {firstSteps.map((item, index) => (
              <Reveal key={item.title} delay={index * 50}>
                <div className="grid gap-5 px-6 py-6 md:grid-cols-[0.95fr_1.05fr] md:px-8">
                  <div className="text-sm font-semibold uppercase tracking-[0.16em] text-orange-500">
                    Stap {index + 1}
                  </div>
                  <div>
                    <h3 className="font-headline text-2xl font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
                      {item.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <Reveal>
            <div className="rounded-[2rem] bg-[#06040c] p-7 text-white lg:p-10">
              <span className="overline-badge mb-4 inline-flex">Waarom dit werkt</span>
              <h2 className="font-headline text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] md:text-4xl">
                Eerst duidelijkheid. Daarna pas bouwen.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/68">
                Juist in een vroege fase is het zonde om energie te verliezen aan verkeerde keuzes,
                te veel losse tools of een site die snel alweer niet meer past.
              </p>
            </div>
          </Reveal>

          <Reveal delay={60}>
            <div className="space-y-5">
              {steps.map((step, index) => (
                <div key={step} className="flex items-start gap-4 border-t border-slate-200 pt-5 first:border-t-0 first:pt-0">
                  <div
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl text-sm font-bold text-white"
                    style={{ background: 'linear-gradient(135deg,#f97316 0%,#ec4899 55%,#a78bfa 100%)' }}
                  >
                    {index + 1}
                  </div>
                  <p className="pt-1 text-base leading-relaxed text-slate-600">{step}</p>
                </div>
              ))}

              <div className="rounded-[1.75rem] border border-slate-200 bg-[color:var(--surface-2)] p-6">
                <div className="flex items-center gap-3 text-sm font-semibold text-slate-900">
                  <Rocket size={16} className="text-orange-500" />
                  Selectief en persoonlijk
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Dit is bedoeld voor starters die serieus iets willen neerzetten. Niet als algemene
                  route voor iedereen die vooral zo goedkoop mogelijk wil beginnen.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[color:var(--surface-2)] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="rounded-[2rem] bg-white p-7 shadow-[0_18px_50px_rgba(15,23,42,0.05)] lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <span className="overline-badge mb-4 inline-flex">Sparren over je idee</span>
                <h2 className="font-headline text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] text-slate-900 md:text-4xl">
                  Heb je iets goeds in je hoofd, maar wil je eerst toetsen wat slim is?
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
                  Dan is een kort gesprek meestal genoeg om snel duidelijkheid te krijgen. Soms wordt
                  het kleiner. Soms juist scherper. Als de basis maar klopt.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  'Vertel je idee en huidige fase',
                  'Ik denk mee over de eerste stap die het meeste verschil maakt',
                  'Geen opgeblazen traject, wel een professionele start',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm leading-relaxed text-slate-600">
                    <MessageCircle size={16} className="mt-0.5 flex-shrink-0 text-orange-500" />
                    <span>{item}</span>
                  </div>
                ))}

                <div className="pt-4">
                  <Link href="/contact" className="btn-brand inline-flex items-center gap-2">
                    Plan een kennismaking
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </div>
  )
}
