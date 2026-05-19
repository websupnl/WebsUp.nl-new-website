import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const posts = [
  { cat: 'Strategie',  color: '#fef0e8', title: 'Wanneer is je website toe aan een redesign?',           excerpt: 'Vijf signalen dat het tijd is voor een nieuwe versie.',              date: '12 mei 2026', time: '5 min' },
  { cat: 'Conversie',  color: '#fde6ed', title: 'Waarom een mooie website niet genoeg is',               excerpt: 'Zonder duidelijke route naar contact blijft het bij kijken.',        date: '3 mei 2026',  time: '4 min' },
  { cat: 'Webshops',   color: '#f3e6f5', title: 'Wat een goede webshop nodig heeft om te verkopen',     excerpt: 'Productpagina\'s, vertrouwen en een soepele checkout.',              date: '24 apr 2026', time: '7 min' },
  { cat: 'Maatwerk',   color: '#ede6f7', title: 'Maatwerk software voor kleine bedrijven',               excerpt: 'Wanneer standaard plugins niet meer toereikend zijn.',               date: '11 apr 2026', time: '6 min' },
]

export default function CdKennisbankCards() {
  return (
    <section className="bg-white py-[72px]">
      <div className="mx-auto max-w-[1280px] px-7">

        {/* Header */}
        <div className="mb-8 flex items-end justify-between gap-5">
          <div>
            <p className="mb-2.5 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[#9aa0a8]">
              Kijk eens naar wat nieuw is
            </p>
            <h2 className="text-[clamp(28px,3.2vw,42px)] font-bold leading-[1.05] tracking-[-0.02em] text-[#15181d]">
              Praktische artikelen om door te lezen.
            </h2>
          </div>
          <Link
            href="/kennisbank"
            className="hidden shrink-0 items-center gap-1.5 text-[14.5px] font-semibold text-[#15181d] transition-colors hover:text-[#F0517E] sm:inline-flex"
          >
            Naar kennisbank
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Cards grid */}
        <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((p, i) => (
            <Link
              key={i}
              href="/kennisbank"
              className="flex flex-col overflow-hidden rounded-[16px] border border-[#e6e8eb] bg-white transition-all hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-16px_rgba(20,22,26,.16)]"
            >
              {/* Color header */}
              <div className="relative overflow-hidden" style={{ aspectRatio: '16/10', background: p.color }}>
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'radial-gradient(80% 60% at 30% 40%, #fff 0%, transparent 60%), linear-gradient(135deg, transparent 40%, rgba(255,122,61,.15) 100%)',
                    opacity: 0.5,
                  }}
                />
                <div className="absolute bottom-4 right-4 flex gap-1.5">
                  {[1,2,3].map(k => (
                    <div key={k} className="h-2 w-2 rounded-full"
                      style={{ background: `linear-gradient(135deg, hsl(${10+k*60},70%,60%), hsl(${10+k*60},70%,40%))` }} />
                  ))}
                </div>
                <div className="absolute left-3.5 top-3.5">
                  <span className="rounded-full border border-[#e6e8eb] bg-white/80 px-2.5 py-1 text-[11px] font-semibold text-[#3b4048] backdrop-blur-sm">
                    {p.cat}
                  </span>
                </div>
              </div>

              {/* Text */}
              <div className="flex flex-1 flex-col p-[22px]">
                <h3 className="mb-2 text-[17px] font-bold leading-[1.25] text-[#15181d]">{p.title}</h3>
                <p className="mb-4 flex-1 text-[13.5px] leading-[1.5] text-[#6b7280]">{p.excerpt}</p>
                <div className="flex justify-between text-[12px] text-[#9aa0a8]">
                  <span>{p.date}</span>
                  <span>{p.time}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
