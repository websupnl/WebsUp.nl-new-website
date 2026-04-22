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
]

export default function StarterCTASection() {
  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-24">
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.08) 0%, rgba(236,72,153,0.06) 48%, rgba(167,139,250,0.08) 100%)' }}
      />
      <div className="absolute inset-0 bg-white/72" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="grid items-start gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
              <Sparkles size={13} className="text-orange-500" />
              Voor starters
            </div>
            <h2 className="max-w-2xl font-headline text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] text-slate-900 md:text-5xl">
              Sterk starten zonder meteen een zwaar traject
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
              Sta je aan het begin van een bedrijf, product of concept? Dan hoeft niet alles groot, maar het moet wel kloppen. Voor plannen met potentie is er ruimte voor een slimme eerste stap.
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
                  Dit is geen standaard kortingsactie, maar een bewuste instap voor plannen waar potentie, klik en groeiruimte in zit.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
