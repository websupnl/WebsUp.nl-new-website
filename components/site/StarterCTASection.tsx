import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'

const points = [
  {
    title: 'Voor serieuze starters',
    text: 'Bedoeld voor ondernemers en startups die aan het begin staan, maar wel bewust en professioneel willen starten.',
  },
  {
    title: 'Slimme digitale basis',
    text: 'We kijken samen wat nodig is om goed te beginnen en ruimte te houden om later verder te bouwen.',
  },
  {
    title: 'Niet te klein, niet te groot',
    text: 'De insteek is om professioneel te starten zonder meteen vast te lopen in een te zwaar traject.',
  },
]

export default function StarterCTASection() {
  return (
    <section className="bg-white py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="grid items-start gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
              <Sparkles size={13} className="text-orange-500" />
              Voor starters
            </div>
            <h2 className="max-w-2xl font-headline text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] text-slate-900 md:text-5xl">
              Professioneel starten, zonder meteen te veel op te tuigen.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
              Sta je aan het begin van iets moois? Voor starters en startups met een sterk idee denkt WebsUp graag mee over een slimme digitale basis. In sommige gevallen is er ruimte voor een aangepaste instap, zodat je goed kunt beginnen en later verder kunt bouwen.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/voor-starters"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
              >
                Bekijk starterstraject
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition-colors hover:border-slate-400"
              >
                Plan een kennismaking
              </Link>
            </div>
          </div>

          <div className="lg:pt-10">
            <div className="space-y-8 border-l border-slate-200 pl-6">
              {points.map((point, index) => (
                <div key={point.title} className="relative">
                  <div className="absolute -left-10 top-0.5 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-xs font-bold text-orange-500">
                    {index + 1}
                  </div>
                  <div className="text-sm font-semibold text-slate-900">{point.title}</div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{point.text}</p>
                </div>
              ))}

              <div className="relative">
                <div className="absolute -left-10 top-0.5 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-xs font-bold text-orange-500">
                  4
                </div>
                <div className="text-sm font-semibold text-slate-900">Alleen als het past</div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Dit is geen standaard kortingstraject voor iedereen, maar bedoeld voor plannen waar echt potentie, klik en groeiruimte in zit.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
