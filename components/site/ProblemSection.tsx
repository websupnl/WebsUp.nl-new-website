import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import GrainOverlay from '@/components/ui/GrainOverlay'

const painPoints = [
  {
    problem: 'Bezoekers snappen niet direct wat je doet of aanbiedt',
    solution: 'Meteen duidelijk: wat je biedt, voor wie en waarom jij de juiste keuze bent',
  },
  {
    problem: 'Er is geen duidelijke reden om contact op te nemen',
    solution: 'Gerichte oproep tot actie op het juiste moment, zodat een bezoeker weet wat de volgende stap is',
  },
  {
    problem: 'De uitstraling wekt geen vertrouwen op bij de doelgroep',
    solution: 'Een uitstraling die aansluit bij jouw merk en het vertrouwen geeft dat bezoekers nodig hebben om te kiezen',
  },
]

export default function ProblemSection() {
  return (
    <section className="relative overflow-hidden bg-[#06040c] py-16 lg:py-24">
      <GrainOverlay opacity={0.04} />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <span className="overline-badge overline-badge-dark mb-5 inline-flex">Herkenbaar?</span>
            <h2
              className="max-w-2xl font-headline font-extrabold leading-[1.06] tracking-[-0.03em] text-white"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
            >
              Een nette website levert niet automatisch klanten op
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-white/56 md:text-lg lg:justify-self-end">
            Veel bedrijven hebben een website die er goed uitziet, maar te weinig bezoekers omzet in klanten of contact. Dat komt bijna altijd door dezelfde drie dingen.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {painPoints.map((point, index) => (
            <Reveal key={point.problem} delay={index * 70}>
              <div className="glass-panel-dark flex h-full flex-col rounded-2xl p-7 transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.08]">
                <div className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white/38">
                  Vaak zo
                </div>
                <p className="text-sm leading-relaxed text-white/58">{point.problem}</p>
                <div className="my-5 flex items-center gap-3">
                  <div className="h-px flex-1 bg-white/12" />
                  <ArrowRight size={13} className="shrink-0 text-white/30" />
                  <div className="h-px flex-1 bg-white/12" />
                </div>
                <div className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white/80">
                  Hoe het anders kan
                </div>
                <p className="text-sm font-medium leading-relaxed text-white/86">{point.solution}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={240}>
          <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-white/10 pt-8">
            <Link href="/gratis-ontwerp" className="btn-brand-gradient">
              Gratis ontwerp aanvragen
              <ArrowRight size={14} />
            </Link>
            <p className="text-sm text-white/42">
              Zo zie je direct wat anders kan, zonder verplichting.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
