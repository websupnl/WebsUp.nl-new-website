import { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle,
  Lightbulb,
  MessageCircle,
  Rocket,
  Sparkles,
  Store,
  Wrench,
} from 'lucide-react'
import WavePageHeader from '@/components/site/WavePageHeader'
import Reveal from '@/components/ui/Reveal'
import CTASection from '@/components/site/CTASection'
import GradientIcon from '@/components/site/GradientIcon'

export const metadata: Metadata = {
  title: 'Voor starters',
  description:
    'Voor starters, startups en ondernemers met een sterk idee die professioneel willen beginnen met een website, webshop of digitale basis die later kan meegroeien.',
}

const trustPoints = [
  'Voor starters, startups en ondernemers met een sterk idee',
  'Professioneel starten zonder direct te groot te bouwen',
  'Ruimte om later door te groeien met webshop, dashboard of maatwerk',
]

const starterFit = [
  'Je hebt een duidelijk idee en wilt daar serieus iets van maken',
  'Je wilt professioneel beginnen in plaats van blijven hangen in proefballonnen',
  'Je zoekt iemand die eerlijk meedenkt over de slimste eerste stap',
  'Je wilt iets neerzetten waar later op doorgebouwd kan worden',
]

const supportAreas = [
  {
    title: 'Eerste website of landingspagina',
    text: 'Een sterke eerste online basis waarmee je professioneel naar buiten kunt treden en helder kunt laten zien wat je doet.',
    icon: Lightbulb,
  },
  {
    title: 'Concept of visuele richting',
    text: 'Soms is het slim om eerst scherp te krijgen hoe je merk, aanbod of homepage het beste neergezet moet worden.',
    icon: Sparkles,
  },
  {
    title: 'Webshop of merkstart',
    text: 'Voor starters die direct iets willen verkopen en een shop nodig hebben die goed voelt, duidelijk werkt en later kan meegroeien.',
    icon: Store,
  },
  {
    title: 'Maatwerk als het idee daarom vraagt',
    text: 'Soms zit de kern juist in een dashboard, portaal, calculator of andere slimme module. Dan kijken we ook daarnaar.',
    icon: Wrench,
  },
]

const steps = [
  'Jij vertelt je idee, je fase en waar je nu tegenaan loopt.',
  'We kijken samen wat slim is als eerste stap en wat nog niet nodig is.',
  'Ik geef eerlijk aan of dit past en welke opzet logisch voelt voor jouw situatie.',
  'Als er een goede match is, maken we een plan voor een professionele start waar je later op kunt doorgroeien.',
]

export default function VoorStartersPage() {
  return (
    <div>
      <WavePageHeader
        badge="Voor starters"
        title="Een sterk idee verdient"
        titleHighlight="een goede start."
        subtitle="Sta je aan het begin van een nieuw bedrijf, product of concept? Dan hoeft niet alles meteen groots en ingewikkeld te zijn. Soms is een slimme eerste stap juist het belangrijkst. WebsUp helpt starters en startups met een sterke basis waarmee je professioneel kunt beginnen en later kunt doorgroeien."
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
            href="/contact?ref=starter"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-px hover:bg-white/15"
          >
            Vertel je idee
          </Link>
        </div>

        <div className="mt-7 flex flex-wrap gap-2">
          {trustPoints.map((point) => (
            <span
              key={point}
              className="inline-flex rounded-full border border-white/12 bg-white/8 px-3 py-1 text-xs font-semibold text-white/70"
            >
              {point}
            </span>
          ))}
        </div>
      </WavePageHeader>

      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="overflow-hidden rounded-[2rem] border border-slate-100 bg-slate-50 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
            <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="p-7 lg:p-10">
                <span className="overline-badge mb-4 inline-flex">Wat dit is</span>
                <h2 className="font-headline text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] text-slate-900 md:text-4xl">
                  Geen algemene kortingsactie, maar een passende instap.
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-slate-500">
                  Niet iedere starter heeft direct een compleet traject nodig. Soms is een slimme, haalbare eerste stap veel sterker dan te groot beginnen en onderweg vastlopen.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-slate-500">
                  Daarom kijk ik in sommige gevallen naar een passende eerste opzet of een aangepast instaptarief. Niet voor iedereen, maar voor starters met een sterk idee en serieuze ambitie.
                </p>
              </div>

              <div className="bg-[#06040c] p-7 text-white lg:p-10">
                <div className="inline-flex rounded-full border border-white/12 bg-white/8 px-3 py-1 text-xs font-semibold text-white/70">
                  Voor wie dit bedoeld is
                </div>
                <p className="mt-5 text-base leading-relaxed text-white/62">
                  Dit past het best bij starters en ondernemers die niet klein denken, maar wel slim willen beginnen.
                </p>

                <div className="mt-6 space-y-3">
                  {starterFit.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-[1.15rem] border border-white/10 bg-white/5 px-4 py-4 text-sm leading-relaxed text-white/72">
                      <CheckCircle size={16} className="mt-0.5 flex-shrink-0 text-orange-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-slate-50 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="mb-12 max-w-3xl">
            <span className="overline-badge mb-4 inline-flex">Waar ik mee kan helpen</span>
            <h2 className="font-headline text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] text-slate-900 md:text-4xl">
              De slimste eerste stap hangt af van je idee.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-500">
              Soms begint dat met een website. Soms met een homepage concept, webshop of eerste maatwerk oplossing. Het doel is niet om direct alles te bouwen, maar om goed te beginnen.
            </p>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2">
            {supportAreas.map((item, index) => {
              const Icon = item.icon

              return (
                <Reveal key={item.title} delay={index * 70}>
                  <div className="h-full rounded-[1.75rem] border border-slate-100 bg-white p-7 shadow-[0_12px_40px_rgba(15,23,42,0.04)]">
                    <GradientIcon icon={Icon} className="mb-4" />
                    <h3 className="font-headline text-xl font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-500">{item.text}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
            <Reveal className="rounded-[2rem] bg-[#06040c] p-7 text-white lg:p-10">
              <span className="overline-badge mb-4 inline-flex">Waarom ik dit doe</span>
              <h2 className="font-headline text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] md:text-4xl">
                Goede ideeen vroeg helpen opbouwen is juist interessant.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/66">
                Niet omdat het goedkoop moet zijn, maar omdat je in een vroege fase vaak nog de beste keuzes kunt maken in opzet, structuur en richting. Daar zit vaak juist de winst.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-white/66">
                Ik vind het leuk om mee te denken met ideeën waar potentie in zit. Om samen te kijken wat echt nodig is om professioneel te starten, zonder meteen onnodig groot te bouwen.
              </p>
            </Reveal>

            <Reveal className="rounded-[2rem] border border-slate-100 bg-slate-50 p-7 lg:p-10">
              <span className="overline-badge mb-4 inline-flex">Hoe het werkt</span>
              <h2 className="font-headline text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] text-slate-900 md:text-4xl">
                Eerst duidelijkheid. Daarna pas bouwen.
              </h2>

              <div className="mt-8 space-y-5">
                {steps.map((step, index) => (
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

              <div className="mt-8 rounded-[1.4rem] border border-slate-200 bg-white p-5">
                <GradientIcon icon={Rocket} size="sm" className="mb-3" />
                <div className="text-sm font-semibold text-slate-900">Selectief en persoonlijk</div>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  Dit is bedoeld voor starters met een sterk idee, niet als algemene route voor iedereen die vooral zo goedkoop mogelijk wil beginnen.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
            <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="p-7 lg:p-10">
                <span className="overline-badge mb-4 inline-flex">Klaar om te sparren</span>
                <h2 className="font-headline text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] text-slate-900 md:text-4xl">
                  Heb je een sterk idee en zoek je iemand die met je meedenkt?
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-500">
                  Dan kijk ik graag met je mee naar de slimste eerste stap. Soms is dat kleiner dan je dacht, soms juist iets anders dan je vooraf in je hoofd had. Als de basis maar klopt.
                </p>
              </div>

              <div className="bg-[#06040c] p-7 text-white lg:p-10">
                <div className="space-y-3">
                  {[
                    'Plan een kennismaking als je wilt sparren over de beste opzet',
                    'Stuur je idee door als je eerst kort wilt toetsen of het past',
                    'Geen verkooppraatje, wel een eerlijk gesprek over wat slim voelt',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-[1.15rem] border border-white/10 bg-white/5 px-4 py-4 text-sm leading-relaxed text-white/72">
                      <MessageCircle size={16} className="mt-0.5 flex-shrink-0 text-orange-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-all hover:-translate-y-px hover:bg-white/90"
                  >
                    Plan een kennismaking
                    <ArrowRight size={14} />
                  </Link>
                  <Link
                    href="/contact?ref=starter"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-px hover:bg-white/15"
                  >
                    Vertel je idee
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
