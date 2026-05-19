import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

function EcosystemDiagram() {
  const nodes = [
    { x: 60,  y: 40,  label: 'Website',    c: '#FF7A3D' },
    { x: 280, y: 30,  label: 'CRM',        c: '#F0517E' },
    { x: 400, y: 130, label: 'E-mail',     c: '#C742C1' },
    { x: 280, y: 230, label: 'Boekhouden', c: '#8A47E0' },
    { x: 60,  y: 220, label: 'Webshop',    c: '#FF7A3D' },
  ]
  const cx = 200, cy = 130
  return (
    <svg viewBox="0 0 500 280" className="w-full h-auto">
      <defs>
        <linearGradient id="ecl" x1="0" x2="1">
          <stop offset="0%" stopColor="#FF7A3D" stopOpacity=".7" />
          <stop offset="100%" stopColor="#8A47E0" stopOpacity=".7" />
        </linearGradient>
        <linearGradient id="ech" x1="0" x2="1">
          <stop offset="0%" stopColor="#FF7A3D" />
          <stop offset="100%" stopColor="#8A47E0" />
        </linearGradient>
      </defs>
      {nodes.map((n, i) => (
        <line key={i} x1={cx} y1={cy} x2={n.x + 45} y2={n.y + 26}
          stroke="url(#ecl)" strokeWidth="1.5" strokeDasharray="3 4" />
      ))}
      <circle cx={cx} cy={cy} r="48" fill="url(#ech)" opacity=".08" />
      <circle cx={cx} cy={cy} r="32" fill="url(#ech)" />
      <text x={cx} y={cy + 5} textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff" fontFamily="system-ui">WebsUp</text>
      {nodes.map((n, i) => (
        <g key={i}>
          <rect x={n.x} y={n.y} width="90" height="52" rx="10" fill="#fff" stroke="#e6e8eb" strokeWidth="1" />
          <circle cx={n.x + 18} cy={n.y + 18} r="10" fill={n.c} />
          <text x={n.x + 35} y={n.y + 22} fontSize="11" fill="#15181d" fontWeight="600" fontFamily="system-ui">{n.label}</text>
          <text x={n.x + 18} y={n.y + 40} fontSize="8.5" fill="#9aa0a8" textAnchor="middle" fontFamily="system-ui">verbonden</text>
        </g>
      ))}
    </svg>
  )
}

export default function CdEcosystemIntro() {
  return (
    <section className="bg-white py-[72px]">
      <div className="mx-auto max-w-[1280px] px-7">
        <div className="grid items-center gap-[64px] lg:grid-cols-2">

          {/* Left */}
          <div>
            <div className="mb-4 h-1 w-10 rounded-full" style={{ background: 'linear-gradient(90deg,#FF7A3D,#F0517E,#8A47E0)' }} />
            <p className="mb-3 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-slate-400">Aan de slag</p>
            <h2 className="mb-5 text-[clamp(28px,3.2vw,42px)] font-bold leading-[1.05] tracking-[-0.02em] text-[#15181d]">
              Hoe mijn ecosysteem werkt
            </h2>
            <p className="mb-5 max-w-[480px] text-[16px] leading-[1.55] text-[#3b4048]">
              Het begint bij wat je bedrijf nodig heeft, niet bij een lijstje features. Soms is dat een website. Soms een formulier, portaal of koppeling. Ik kijk eerst, daarna pas bouwen.
            </p>
            <p className="mb-7 max-w-[480px] text-[15px] leading-[1.55] text-[#6b7280]">
              Alle onderdelen werken samen: website, hosting, beheer, formulieren, dashboards en automatisering. Één partner, één aanspreekpunt.
            </p>
            <Link
              href="/diensten"
              className="inline-flex items-center gap-2 rounded-full bg-[#15181d] px-5 py-3 text-[14.5px] font-semibold text-white transition-colors hover:bg-black"
            >
              Ontdek het ecosysteem
            </Link>
          </div>

          {/* Right */}
          <div className="rounded-[22px] border border-[#e6e8eb] bg-[#f6f7f8] p-8">
            <EcosystemDiagram />
          </div>

        </div>
      </div>
    </section>
  )
}
