import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const steps = [
  { n: '01', t: 'Kennismaken',     d: 'Vrijblijvend gesprek over wat je bedrijf nodig heeft.' },
  { n: '02', t: 'Probleem scherp', d: 'Doorvragen tot we weten wat er écht gebouwd moet worden.' },
  { n: '03', t: 'Voorstel',        d: 'Een duidelijk voorstel met scope, planning en investering.' },
  { n: '04', t: 'Bouwen',          d: 'Bouw in fases, met tussentijdse reviews en feedback.' },
  { n: '05', t: 'Lanceren',        d: 'Soepele oplevering met controle, training en livegang.' },
  { n: '06', t: 'Verbeteren',      d: 'Doorontwikkelen op basis van data, gebruik en feedback.' },
]

export default function CdWorkflow() {
  return (
    <section className="py-[72px]" style={{ background: '#f6f7f8' }}>
      <div className="mx-auto max-w-[1280px] px-7">

        {/* Header */}
        <div className="mb-8 flex items-end justify-between gap-5">
          <div>
            <p className="mb-2.5 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[#9aa0a8]">
              Werkwijze
            </p>
            <h2 className="text-[clamp(28px,3.2vw,42px)] font-bold leading-[1.05] tracking-[-0.02em] text-[#15181d]">
              Van eerste idee tot livegang.
            </h2>
          </div>
          <Link
            href="/diensten"
            className="hidden shrink-0 items-center gap-1.5 text-[14.5px] font-semibold text-[#15181d] transition-colors hover:text-[#F0517E] sm:inline-flex"
          >
            Volledige werkwijze
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Steps grid */}
        <div className="relative grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-6">
          {/* Connecting line */}
          <div
            className="pointer-events-none absolute left-[4%] right-[4%] top-7 hidden h-[2px] lg:block"
            style={{ background: 'linear-gradient(95deg,#FF7A3D,#F0517E,#C742C1,#8A47E0)', opacity: 0.3 }}
          />

          {steps.map((s, i) => (
            <div
              key={i}
              className="relative rounded-[16px] border border-[#e6e8eb] bg-white p-5 transition-all hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-16px_rgba(20,22,26,.16)]"
            >
              <div
                className="mb-3.5 flex h-[42px] w-[42px] items-center justify-center rounded-full text-[13px] font-bold text-white"
                style={{ background: 'linear-gradient(95deg,#FF7A3D,#F0517E,#C742C1,#8A47E0)', boxShadow: '0 8px 18px rgba(240,81,126,.3)' }}
              >
                {s.n}
              </div>
              <div className="mb-1.5 text-[15px] font-bold text-[#15181d]">{s.t}</div>
              <div className="text-[12.5px] leading-[1.5] text-[#6b7280]">{s.d}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
