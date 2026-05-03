import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Clock, MessageCircle, Sparkles } from 'lucide-react'
import WavePageHeader from '@/components/site/WavePageHeader'
import Reveal from '@/components/ui/Reveal'
import FreeDesignForm from '@/components/site/FreeDesignForm'
import { GlassCard } from '@/components/site/GlassCard'

export const metadata: Metadata = {
  title: 'Gratis ontwerp aanvragen',
  description:
    'Gratis voorbeeldontwerp op maat voor je website binnen 48 uur. Persoonlijk, vrijblijvend en zonder verkooppraat.',
}

const youGet = [
  'Een concrete visuele richting voor je website',
  'Eerlijk advies over structuur en aanpak',
  'Direct contact met mij, geen tussenpersoon',
  'Reactie binnen 48 uur, gegarandeerd',
]

const steps = [
  {
    title: 'Jij vult kort in',
    text: 'Wat voor bedrijf, wat je wil bereiken en wat je nu hebt (of niet hebt).',
  },
  {
    title: 'Ik kijk mee',
    text: 'Ik beoordeel je situatie en maak een eerste visuele richting op maat.',
  },
  {
    title: 'Je krijgt het binnen 48 uur',
    text: 'Een concreet voorbeeld en eerlijk advies over de vervolgstap. Geen verkooppraat.',
  },
]

export default function GratisOntwerpPage() {
  return (
    <div>
      <WavePageHeader
        badge="Gratis voorbeeldontwerp"
        title="Zie binnen 48 uur hoe jouw website"
        titleHighlight="eruit kan zien."
        subtitle="Ik maak een gratis voorbeeldontwerp op maat, afgestemd op jouw bedrijf, stijl en doelgroep. Geen verplichtingen. Geen standaard template. Gewoon laten zien wat er mogelijk is."
        heightClass="min-h-[64vh]"
      >
        <div className="flex flex-wrap items-center gap-3">
          <a href="#aanvragen" className="btn-brand-gradient">
            Start aanvraag
            <ArrowRight size={14} />
          </a>
          <Link
            href="/projecten"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:border-white/50 hover:bg-white/20"
          >
            Bekijk werk
          </Link>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <GlassCard padding="px-4 py-3" className="flex items-center gap-2">
            <Sparkles size={16} className="text-orange-400" />
            <span className="text-sm text-white/85">Persoonlijk op maat</span>
          </GlassCard>
          <GlassCard padding="px-4 py-3" className="flex items-center gap-2">
            <Clock size={16} className="text-orange-400" />
            <span className="text-sm text-white/85">Binnen 48 uur</span>
          </GlassCard>
          <GlassCard padding="px-4 py-3" className="flex items-center gap-2">
            <MessageCircle size={16} className="text-orange-400" />
            <span className="text-sm text-white/85">Geen verplichtingen</span>
          </GlassCard>
        </div>
      </WavePageHeader>

      <section id="aanvragen" className="bg-slate-50 py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.88fr_1.12fr] lg:px-8">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <span className="gradient-text text-[11px] font-bold uppercase tracking-[0.14em]">
              Wat je krijgt
            </span>
            <h2 className="mt-3 font-headline text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] text-slate-900 md:text-4xl">
              Geen template. Een echte eerste richting voor jouw situatie.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Een gratis voorbeeldontwerp is bedoeld om snel helder te krijgen of we een goede match zijn. Ik kijk naar jouw bedrijf, je doelgroep en wat je website moet doen, en vertaal dat naar een concrete eerste richting.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-500">
              Geen verkoopgesprek. Geen verplichting. Gewoon een eerlijk beeld van wat mogelijk is.
            </p>

            <div className="mt-8 space-y-3">
              {youGet.map((b) => (
                <div key={b} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
                  <CheckCircle size={16} className="mt-0.5 flex-shrink-0 text-orange-500" />
                  <span className="text-sm leading-relaxed text-slate-700">{b}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
              <h3 className="font-headline text-2xl font-bold text-slate-900">
                Vertel kort wat je wilt bouwen
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Geen uitgebreid briefing document nodig. Een paar regels over je bedrijf en wat je wil bereiken is genoeg om mee te beginnen.
              </p>
              <div className="mt-6">
                <FreeDesignForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Reveal className="mb-12 max-w-2xl">
            <span className="gradient-text text-[11px] font-bold uppercase tracking-[0.14em]">
              Hoe het werkt
            </span>
            <h2 className="mt-3 font-headline text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] text-slate-900 md:text-4xl lg:text-5xl">
              Drie stappen, geen omwegen
            </h2>
          </Reveal>

          <ol className="space-y-7">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 70}>
                <li className="flex items-start gap-5">
                  <span className="font-headline brand-gradient-ring flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-base font-bold text-accent-600">
                    {i + 1}
                  </span>
                  <div className="pt-1">
                    <h3 className="font-headline text-xl font-bold text-slate-900">{step.title}</h3>
                    <p className="mt-2 text-base leading-relaxed text-slate-600">{step.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </div>
  )
}
