import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'

const points = [
  {
    title: 'Alleen voor serieuze plannen',
    text: 'Voor starters die bewust willen starten en snappen dat een goede basis later veel gedoe voorkomt.',
  },
  {
    title: 'Compact, maar niet goedkoop-ogend',
    text: 'De instap blijft professioneel: duidelijke structuur, sterke eerste indruk en technisch netjes opgezet.',
  },
  {
    title: 'Doorgroeien zonder opnieuw beginnen',
    text: "Als je later meer nodig hebt, kan de basis door naar extra pagina's, funnels, koppelingen of maatwerk.",
  },
  {
    title: 'Alleen als het past',
    text: 'Dit is geen standaard kortingsactie, maar een bewuste instap voor plannen waar potentie, klik en groeiruimte in zit.',
  },
]

export default function StarterCTASection() {
  return (
    <section className="bg-[#06040c] py-20 lg:py-28">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <Reveal className="mb-12 grid gap-8 lg:grid-cols-2 lg:items-start">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1 text-xs font-semibold text-white/70">
              <Sparkles size={12} className="text-orange-400" />
              Voor starters
            </div>
            <h2 className="font-headline text-4xl font-extrabold leading-[1.08] tracking-[-0.02em] text-white md:text-5xl">
              Sterk starten zonder meteen een zwaar traject
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/55">
              Sta je aan het begin van een bedrijf, product of concept? Dan hoeft niet alles groot, maar het moet wel kloppen. Voor plannen met potentie is er ruimte voor een slimme eerste stap.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end lg:pt-20">
            <Link
              href="/voor-starters"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-opacity hover:opacity-90"
            >
              Bekijk starterstraject
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/12"
            >
              Plan een kennismaking
            </Link>
          </div>
        </Reveal>

        {/* 2×2 card grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {points.map((point, index) => (
            <Reveal key={point.title} delay={index * 60}>
              <div className="flex h-full gap-5 rounded-2xl border border-white/8 bg-white/[0.03] p-6 transition-colors hover:bg-white/[0.06]">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
                  style={{ background: 'linear-gradient(135deg,#f97316 0%,#ec4899 55%,#a78bfa 100%)' }}
                >
                  {index + 1}
                </div>
                <div>
                  <div className="font-semibold text-white">{point.title}</div>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">{point.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  )
}
