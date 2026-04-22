import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Clock, LayoutTemplate, MessageCircle, Sparkles } from 'lucide-react'
import WavePageHeader from '@/components/site/WavePageHeader'
import Reveal from '@/components/ui/Reveal'
import FreeDesignForm from '@/components/site/FreeDesignForm'

export const metadata: Metadata = {
  title: 'Gratis ontwerp aanvragen',
  description:
    'Vraag een gratis ontwerp of eerste visuele richting aan voor je website, webshop of digitale oplossing van WebsUp.nl.',
}

const benefits = [
  'Een concrete eerste richting voor je website, webshop of digitale systeem',
  'Eerlijk advies over wat wel en niet nodig is',
  'Direct contact met Daan, zonder saleslaag ertussen',
]

const steps = [
  {
    title: 'Jij deelt je vraag',
    text: 'Je vult kort in wat je wilt bereiken, wat er nu staat en waar je nieuwe ontwerp bij moet helpen.',
    icon: MessageCircle,
  },
  {
    title: 'Ik kijk inhoudelijk mee',
    text: 'Ik beoordeel je situatie en vertaal dat naar een logische richting voor structuur, uitstraling en vervolgstap.',
    icon: LayoutTemplate,
  },
  {
    title: 'Je krijgt een eerste richting',
    text: 'Binnen een werkdag reageer ik met vragen, advies of een voorstel voor de beste aanpak.',
    icon: Sparkles,
  },
]

export default function GratisOntwerpPage() {
  return (
    <div>
      <WavePageHeader
        badge="Gratis ontwerp"
        title="Vraag een gratis"
        titleHighlight="ontwerp aan."
        subtitle="Wil je weten hoe jouw website, webshop of digitale oplossing sterker kan worden neergezet? Deel kort je idee en ik denk mee over een passende eerste richting."
        heightClass="min-h-[64vh]"
      >
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="#aanvragen"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-all hover:-translate-y-px hover:bg-white/90"
          >
            Start aanvraag
            <ArrowRight size={14} />
          </a>
          <Link
            href="/projecten"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-px hover:bg-white/15"
          >
            Bekijk werk
          </Link>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          {[
            { value: 'Gratis', label: 'eerste richting' },
            { value: 'Binnen 1 werkdag', label: 'persoonlijke reactie' },
            { value: 'Vrijblijvend', label: 'geen verplichtingen' },
          ].map((item) => (
            <div key={item.label} className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
              <div className="text-sm font-semibold text-white">{item.value}</div>
              <div className="mt-0.5 text-xs text-white/55">{item.label}</div>
            </div>
          ))}
        </div>
      </WavePageHeader>

      <section id="aanvragen" className="bg-slate-50 py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.88fr_1.12fr] lg:px-8">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <span className="overline-badge mb-4 inline-flex">Wat je krijgt</span>
            <h2 className="font-headline text-3xl font-extrabold leading-[1.08] text-slate-900 md:text-4xl">
              Geen standaard template, maar een richting die past bij jouw bedrijf.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-500">
              Een gratis ontwerp is bedoeld om snel helder te krijgen wat visueel en inhoudelijk logisch is. Soms is dat een homepage richting, soms juist advies over structuur, aanbod of techniek.
            </p>

            <div className="mt-8 space-y-3">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3 rounded-lg border border-slate-100 bg-white px-4 py-4 text-sm leading-relaxed text-slate-600">
                  <CheckCircle size={16} className="mt-0.5 flex-shrink-0 text-orange-500" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-lg border border-orange-100 bg-orange-50 px-4 py-4 text-sm text-orange-800">
              <Clock size={17} className="flex-shrink-0" />
              Reageer ik niet inhoudelijk binnen een werkdag, dan stuur ik je in elk geval wanneer je reactie komt.
            </div>
          </Reveal>

          <Reveal>
            <FreeDesignForm />
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="mb-10 max-w-3xl">
            <span className="overline-badge mb-4 inline-flex">Werkwijze</span>
            <h2 className="font-headline text-3xl font-extrabold leading-[1.08] text-slate-900 md:text-4xl">
              Snel duidelijkheid over de juiste richting.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-500">
              De aanvraag is bewust laagdrempelig. Het doel is niet om direct alles vast te zetten, maar om de eerste slimme keuzes helder te krijgen.
            </p>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon

              return (
                <Reveal key={step.title} delay={index * 80}>
                  <div className="h-full rounded-lg border border-slate-100 bg-slate-50 p-6">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-white text-orange-500 shadow-sm">
                      <Icon size={18} />
                    </div>
                    <h3 className="font-headline text-xl font-bold text-slate-900">{step.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-500">{step.text}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
