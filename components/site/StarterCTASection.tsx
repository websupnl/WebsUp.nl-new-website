import Link from 'next/link'
import { ArrowRight, Sparkles, Lightbulb, Layers3 } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'

const points = [
  {
    title: 'Voor serieuze starters',
    text: 'Bedoeld voor ondernemers en startups die aan het begin staan, maar wel bewust en professioneel willen starten.',
    icon: Lightbulb,
  },
  {
    title: 'Slimme digitale basis',
    text: 'We kijken samen wat nodig is om goed te beginnen en ruimte te houden om later verder te bouwen.',
    icon: Layers3,
  },
]

export default function StarterCTASection() {
  return (
    <section className="bg-[#06040c] px-6 py-8 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.03)_100%)]">
            <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="border-b border-white/10 p-7 lg:border-b-0 lg:border-r lg:p-8">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs font-semibold text-white/80">
                  <Sparkles size={13} className="text-orange-400" />
                  Voor starters
                </div>
                <h2 className="max-w-2xl font-headline text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] text-white md:text-4xl">
                  Voordeeltarief voor starters met een sterk idee.
                </h2>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/62">
                  Sta je aan het begin van iets moois? Voor starters en startups met een sterk idee denk ik graag mee over een slimme digitale basis. In sommige gevallen werk ik met een aangepaste instap, zodat je professioneel kunt starten en later verder kunt bouwen.
                </p>
              </div>

              <div className="flex h-full flex-col justify-between p-7 lg:p-8">
                <div className="grid gap-3">
                  {points.map((point) => {
                    const Icon = point.icon

                    return (
                      <div
                        key={point.title}
                        className="rounded-[1.25rem] border border-white/10 bg-[#0b0813] p-4"
                      >
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/8 text-orange-400">
                          <Icon size={16} />
                        </div>
                        <div className="text-sm font-semibold text-white">{point.title}</div>
                        <div className="mt-2 text-sm leading-relaxed text-white/58">{point.text}</div>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/voor-starters"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-white/90"
                  >
                    Bekijk starterstraject
                    <ArrowRight size={14} />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    Plan een kennismaking
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
