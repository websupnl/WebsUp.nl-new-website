import Link from 'next/link'

function FormMock() {
  return (
    <div className="w-full overflow-hidden rounded-[12px] border border-[#e6e8eb] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.07)]">
      <div className="flex items-center gap-1.5 border-b border-[#e6e8eb] bg-[#f6f7f8] px-3 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff6158]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <div className="ml-3 text-[11.5px] text-[#6b7280]">gratis-ontwerp / aanvraag</div>
      </div>
      <div className="p-5">
        <div className="mb-2.5">
          <div className="mb-1 text-[11px] text-[#6b7280]">Bedrijfsnaam</div>
          <div className="rounded-[8px] border border-[#e6e8eb] bg-[#f6f7f8] px-3 py-2.5 text-[13px] text-[#3b4048]">
            Voorbeeld B.V.
          </div>
        </div>
        <div className="mb-2.5">
          <div className="mb-1 text-[11px] text-[#6b7280]">Wat doe je?</div>
          <div className="min-h-[50px] rounded-[8px] border border-[#e6e8eb] bg-[#f6f7f8] px-3 py-2.5 text-[13px] text-[#9aa0a8]">
            Wij helpen bedrijven met…
          </div>
        </div>
        <div className="mb-2.5 grid grid-cols-2 gap-2">
          <div>
            <div className="mb-1 text-[11px] text-[#6b7280]">Type</div>
            <div className="rounded-[8px] border px-3 py-2 text-[12px] font-semibold text-[#15181d]"
              style={{ background: 'linear-gradient(95deg,rgba(255,122,61,.14),rgba(138,71,224,.14))', borderColor: 'rgba(255,122,61,.3)' }}>
              Website
            </div>
          </div>
          <div>
            <div className="mb-1 text-[11px] text-[#6b7280]">Stijl</div>
            <div className="rounded-[8px] border border-[#e6e8eb] bg-[#f6f7f8] px-3 py-2 text-[12px] text-[#3b4048]">
              Modern / strak
            </div>
          </div>
        </div>
        <div className="rounded-[8px] py-3 text-center text-[14px] font-semibold text-white"
          style={{ background: 'linear-gradient(95deg,#FF7A3D,#F0517E,#C742C1,#8A47E0)' }}>
          Stuur mijn aanvraag
        </div>
      </div>
    </div>
  )
}

const benefits = [
  'Eerste visuele richting voor jouw website',
  'Op basis van een kort intakegesprek',
  'Geen kosten, geen verplichtingen',
  'Binnen 5 werkdagen in je mailbox',
]

export default function CdGratisOntwerp() {
  return (
    <section className="py-[32px]">
      <div className="mx-auto max-w-[1280px] px-7">
        <div
          className="relative overflow-hidden rounded-[22px]"
          style={{
            background: 'linear-gradient(160deg, #161922 0%, #1a1a28 40%, #2a1a30 100%)',
            minHeight: 460,
          }}
        >
          {/* Wave SVG */}
          <svg
            viewBox="0 0 1400 460"
            preserveAspectRatio="xMaxYMid slice"
            className="pointer-events-none absolute inset-0 h-full w-full"
            style={{ opacity: 0.55 }}
          >
            <defs>
              <linearGradient id="fbWave" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#FF7A3D" stopOpacity="0" />
                <stop offset="50%" stopColor="#F0517E" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#8A47E0" stopOpacity="0" />
              </linearGradient>
            </defs>
            {Array.from({ length: 14 }).map((_, i) => (
              <path key={i}
                d={`M ${600 + i*8} 30 Q ${1000 + i*4} ${230 + i*8} ${800 + i*6} 460`}
                fill="none" stroke="url(#fbWave)"
                strokeWidth={0.6 + i * 0.05}
                opacity={0.45 + i * 0.04}
              />
            ))}
          </svg>

          <div className="relative grid items-center gap-12 p-16 lg:grid-cols-2">

            {/* Left: text */}
            <div>
              <p className="mb-3.5 text-[11.5px] font-semibold uppercase tracking-[0.16em]"
                style={{ color: '#FF7A3D' }}>
                Gratis ontwerp
              </p>
              <h2 className="mb-4 text-[clamp(26px,2.8vw,44px)] font-bold leading-[1.02] tracking-[-0.02em] text-white">
                Zie hoe jouw website{' '}
                <span style={{
                  background: 'linear-gradient(95deg,#FF7A3D,#F0517E,#C742C1,#8A47E0)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  eruit kan zien.
                </span>
              </h2>
              <p className="mb-7 max-w-[500px] text-[16px] leading-[1.55]" style={{ color: 'rgba(255,255,255,.78)' }}>
                Twijfel je over een nieuwe website of redesign? Vraag een gratis ontwerp aan en krijg een eerste visuele richting voor jouw site, zonder verplichtingen achteraf.
              </p>

              <div className="mb-8 flex max-w-[480px] flex-col gap-2.5">
                {benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-[14.5px]" style={{ color: 'rgba(255,255,255,.9)' }}>
                    <span
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                      style={{ background: 'linear-gradient(95deg,#FF7A3D,#8A47E0)' }}
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                        <path d="M5 12l5 5L20 7"/>
                      </svg>
                    </span>
                    {b}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-[14.5px] font-semibold text-white transition-all hover:-translate-y-px"
                  style={{ background: 'linear-gradient(95deg,#FF7A3D,#F0517E,#C742C1,#8A47E0)', boxShadow: '0 8px 20px -6px rgba(240,81,126,.45)' }}
                >
                  Vraag een gratis ontwerp aan
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-full px-5 py-3 text-[14.5px] font-semibold text-white"
                  style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.18)' }}
                >
                  Liever even bellen
                </Link>
              </div>
            </div>

            {/* Right: form mockup */}
            <div>
              <FormMock />
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
