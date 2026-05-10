import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'

const painPoints = [
  {
    problem: 'Bezoekers snappen niet direct wat je doet',
    solution: 'Meteen duidelijk: wat je biedt, voor wie en waarom jij de juiste keuze bent.',
  },
  {
    problem: 'Geen duidelijke reden om contact op te nemen',
    solution: 'Gerichte call-to-action op het juiste moment. De volgende stap is altijd helder.',
  },
  {
    problem: 'De uitstraling wekt geen vertrouwen op',
    solution: 'Een uitstraling die aansluit bij jouw merk en bezoekers het vertrouwen geeft om te kiezen.',
  },
]

export default function ProblemSection() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 lg:py-28">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal className="lg:sticky lg:top-32">
            <span className="overline-badge mb-5 inline-flex">Herkenbaar?</span>
            <h2
              className="max-w-xl font-headline font-extrabold leading-[1.04] tracking-[-0.03em] text-slate-900"
              style={{ fontSize: 'clamp(2rem, 3.4vw, 3.1rem)' }}
            >
              Drie redenen waarom het misloopt.
            </h2>
            <p className="mt-6 max-w-[42ch] text-base leading-relaxed text-slate-600 md:text-lg">
              Een website kan er netjes uitzien en toch geen vertrouwen of actie oproepen. Dit zijn meestal de echte knelpunten.
            </p>
          </Reveal>

          <div className="space-y-0">
            {painPoints.map((point, i) => (
              <Reveal key={point.problem} delay={i * 80}>
                <div className="grid gap-5 border-t border-slate-200 py-10 lg:grid-cols-[4.5rem_1fr] lg:gap-8">
                  <span
                    className="font-headline text-4xl font-extrabold leading-none tracking-[-0.04em]"
                    style={{
                      background: 'linear-gradient(135deg, #f97316 0%, #ec4899 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="text-xl font-semibold leading-snug text-slate-900 md:text-2xl">
                      {point.problem}
                    </p>
                    <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
                      {point.solution}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
            <div className="border-t border-slate-200" />
          </div>
        </div>

        <Reveal delay={280}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/gratis-ontwerp" className="btn-brand-gradient">
              Gratis ontwerp aanvragen
              <ArrowRight size={14} />
            </Link>
            <p className="text-sm text-slate-500">
              Zo zie je direct wat anders kan, zonder verplichting.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
