import Link from 'next/link'

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
        <linearGradient id="acl" x1="0" x2="1">
          <stop offset="0%" stopColor="#FF7A3D" stopOpacity=".7" />
          <stop offset="100%" stopColor="#8A47E0" stopOpacity=".7" />
        </linearGradient>
        <linearGradient id="ach" x1="0" x2="1">
          <stop offset="0%" stopColor="#FF7A3D" />
          <stop offset="100%" stopColor="#8A47E0" />
        </linearGradient>
      </defs>
      {nodes.map((n, i) => (
        <line key={i} x1={cx} y1={cy} x2={n.x + 45} y2={n.y + 26}
          stroke="url(#acl)" strokeWidth="1.5" strokeDasharray="3 4" />
      ))}
      <circle cx={cx} cy={cy} r="48" fill="url(#ach)" opacity=".08" />
      <circle cx={cx} cy={cy} r="32" fill="url(#ach)" />
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

export default function CdAutomation() {
  return (
    <section className="bg-white py-[32px]">
      <div className="mx-auto max-w-[1280px] px-7">
        <div className="overflow-hidden rounded-[22px] border border-[#e6e8eb] bg-gradient-to-br from-[#fef8f5] via-white to-[#f5f0fe]" style={{ position: 'relative' }}>
          {/* Soft glow */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-[360px] w-[360px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,122,61,.12), transparent 60%)' }} />

          <div className="grid items-center gap-10 p-12 lg:grid-cols-2 lg:gap-10 lg:p-14">

            {/* Left: text */}
            <div>
              <p className="mb-3.5 text-[11.5px] font-semibold uppercase tracking-[0.16em]"
                style={{ color: '#FF7A3D' }}>
                Automatisering
              </p>
              <h2 className="mb-4 text-[clamp(26px,3vw,38px)] font-bold leading-[1.05] tracking-[-0.02em] text-[#15181d]">
                Laat repeterend werk doen door{' '}
                <span style={{
                  background: 'linear-gradient(95deg,#FF7A3D,#F0517E,#C742C1,#8A47E0)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  slimme automatisering.
                </span>
              </h2>
              <p className="mb-7 max-w-[460px] text-[15.5px] leading-[1.55] text-[#3b4048]">
                Aanvragen die automatisch in je CRM landen. Facturen die zichzelf versturen. Voorraad die meebeweegt met je webshop. Ik koppel de tools die je al gebruikt.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/diensten/automatisering"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-[14.5px] font-semibold text-white transition-all hover:-translate-y-px"
                  style={{ background: 'linear-gradient(95deg,#FF7A3D,#F0517E,#C742C1,#8A47E0)', boxShadow: '0 8px 20px -6px rgba(240,81,126,.45)' }}
                >
                  Bekijk integraties
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-full border border-[#e6e8eb] bg-white px-5 py-3 text-[14.5px] font-semibold text-[#15181d] transition-colors hover:border-[#15181d]"
                >
                  Even sparren
                </Link>
              </div>
            </div>

            {/* Right: diagram */}
            <div className="rounded-[18px] border border-[#e6e8eb] bg-[#f6f7f8] p-8">
              <EcosystemDiagram />
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
