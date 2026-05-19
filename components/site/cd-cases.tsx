import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

function WebsiteMock() {
  return (
    <div className="w-full overflow-hidden rounded-[10px] border border-[#e6e8eb] bg-white shadow-sm" style={{ aspectRatio: '16/10' }}>
      <div className="flex items-center gap-1.5 border-b border-[#e6e8eb] bg-[#f6f7f8] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[#ff6158]" />
        <span className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
      </div>
      <div className="p-3">
        <div className="mb-2 flex items-center justify-between">
          <div className="h-2 w-12 rounded-full" style={{ background: 'linear-gradient(90deg,#FF7A3D,#8A47E0)' }} />
          <div className="flex gap-1.5">
            {[1,2,3,4].map(i => <div key={i} className="h-1.5 w-5 rounded-full bg-[#eef0f2]" />)}
          </div>
        </div>
        <div className="mb-1 h-3 w-[85%] rounded bg-[#15181d]" />
        <div className="mb-2.5 h-3 w-[55%] rounded" style={{ background: 'linear-gradient(90deg,#FF7A3D,#8A47E0)' }} />
        <div className="mb-2.5 flex gap-1.5">
          <div className="h-5 w-16 rounded-full" style={{ background: 'linear-gradient(90deg,#FF7A3D,#8A47E0)' }} />
          <div className="h-5 w-14 rounded-full border border-[#e6e8eb] bg-[#eef0f2]" />
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {[1,2,3].map(i => (
            <div key={i} className="aspect-square rounded border border-[#e6e8eb]"
              style={{ background: `linear-gradient(135deg,rgba(255,122,61,${0.1+i*0.05}),rgba(255,122,61,0.02))` }} />
          ))}
        </div>
      </div>
    </div>
  )
}

function WebshopMock() {
  return (
    <div className="w-full overflow-hidden rounded-[10px] border border-[#e6e8eb] bg-white shadow-sm" style={{ aspectRatio: '16/10' }}>
      <div className="flex items-center gap-1.5 border-b border-[#e6e8eb] bg-[#f6f7f8] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[#ff6158]" />
        <span className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
      </div>
      <div className="p-3">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex gap-1.5">
            {['Alle','Nieuw','Sale'].map((t, i) => (
              <div key={i} className="rounded-full px-2 py-0.5 text-[9px] font-semibold"
                style={{ background: i === 0 ? '#15181d' : '#fff', color: i === 0 ? '#fff' : '#15181d', border: '1px solid #e6e8eb' }}>
                {t}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1 rounded-full border border-[#e6e8eb] bg-white px-2 py-0.5 text-[9px]">
            🛒 3
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {['#FF7A3D','#F0517E','#C742C1','#8A47E0'].map((c, i) => (
            <div key={i} className="rounded-[6px] border border-[#e6e8eb] bg-white p-1.5">
              <div className="mb-1 rounded" style={{ aspectRatio: '1.5', background: `linear-gradient(135deg,${c}40,${c}10)` }} />
              <div className="mb-0.5 h-1.5 w-[70%] rounded bg-[#eef0f2]" />
              <div className="flex items-center justify-between">
                <div className="h-1.5 w-7 rounded" style={{ background: 'linear-gradient(90deg,#FF7A3D,#8A47E0)' }} />
                <span className="text-[7px] text-[#9aa0a8]">★ 4.8</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ModuleMock() {
  return (
    <div className="w-full overflow-hidden rounded-[10px] border border-[#e6e8eb] bg-white shadow-sm" style={{ aspectRatio: '16/10' }}>
      <div className="flex items-center gap-1.5 border-b border-[#e6e8eb] bg-[#f6f7f8] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[#ff6158]" />
        <span className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
      </div>
      <div className="grid grid-cols-2 gap-2.5 p-3">
        <div>
          <div className="mb-1.5 text-[8px] font-semibold uppercase tracking-[.1em] text-[#9aa0a8]">Configurator</div>
          {[['Type','Hoek-opstelling'],['Breedte','240 cm'],['Materiaal','Eikenhout'],['Afwerking','Mat']].map(([l,v],i) => (
            <div key={i} className="flex justify-between py-1.5 text-[9.5px]"
              style={{ borderBottom: i < 3 ? '1px solid #e6e8eb' : 'none' }}>
              <span className="text-[#6b7280]">{l}</span>
              <span className="font-semibold">{v}</span>
            </div>
          ))}
        </div>
        <div className="rounded-[6px] border border-[#e6e8eb] p-2.5"
          style={{ background: 'linear-gradient(155deg,rgba(255,122,61,.08),rgba(138,71,224,.05))' }}>
          <div className="mb-1 text-[8px] font-semibold uppercase tracking-[.1em] text-[#9aa0a8]">Prijsindicatie</div>
          <div className="mb-1.5 text-[20px] font-bold leading-none tracking-tight"
            style={{ background: 'linear-gradient(95deg,#FF7A3D,#8A47E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            € 3.240
          </div>
          <div className="mb-1.5 flex flex-col gap-0.5 text-[8.5px] text-[#6b7280]">
            {[['Basis','€ 2.400'],['Opties','€ 540'],['Levering','€ 300']].map(([l,v]) => (
              <div key={l} className="flex justify-between"><span>{l}</span><span>{v}</span></div>
            ))}
          </div>
          <div className="rounded py-1 text-center text-[9px] font-semibold text-white"
            style={{ background: 'linear-gradient(95deg,#FF7A3D,#8A47E0)' }}>
            Offerte
          </div>
        </div>
      </div>
    </div>
  )
}

const cases = [
  {
    tag: 'Website redesign',
    isNew: true,
    isHot: false,
    title: 'Heldere aanvraagroute voor lokale dienstverlener',
    desc: 'Verouderde site omgezet naar een nieuwe structuur met focus op duidelijkheid en aanvragen.',
    mock: <WebsiteMock />,
  },
  {
    tag: 'Webshop optimalisatie',
    isNew: false,
    isHot: false,
    title: 'Productpagina\'s en checkout vereenvoudigd',
    desc: 'Bestaande webshop opnieuw ingericht met focus op snelheid en conversie.',
    mock: <WebshopMock />,
  },
  {
    tag: 'Maatwerk module',
    isNew: false,
    isHot: true,
    title: 'Auditiefunctionaliteit voor dansschool',
    desc: 'Maatwerk inschrijfmodule met automatische bevestiging en overzicht.',
    mock: <ModuleMock />,
  },
]

export default function CdCases() {
  return (
    <section className="bg-white py-[72px]">
      <div className="mx-auto max-w-[1280px] px-7">

        {/* Header */}
        <div className="mb-8 flex items-end justify-between gap-5">
          <div>
            <p className="mb-2.5 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[#9aa0a8]">
              Cases & voorbeelden
            </p>
            <h2 className="text-[clamp(28px,3.2vw,42px)] font-bold leading-[1.05] tracking-[-0.02em] text-[#15181d]">
              Werk uit de praktijk.
            </h2>
          </div>
          <Link
            href="/projecten"
            className="hidden shrink-0 items-center gap-1.5 text-[14.5px] font-semibold text-[#15181d] transition-colors hover:text-[#F0517E] sm:inline-flex"
          >
            Alle cases bekijken
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid gap-5 sm:grid-cols-3">
          {cases.map((c, i) => (
            <Link
              key={i}
              href="/projecten"
              className="flex flex-col overflow-hidden rounded-[16px] border border-[#e6e8eb] bg-white transition-all hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-16px_rgba(20,22,26,.16)]"
            >
              <div className="flex gap-2 px-5 pt-5">
                {c.isNew && (
                  <span className="rounded-full bg-[#15181d] px-2.5 py-1 text-[11px] font-semibold text-white">
                    Nieuw
                  </span>
                )}
                {c.isHot && (
                  <span className="rounded-full px-2.5 py-1 text-[11px] font-semibold text-white"
                    style={{ background: 'linear-gradient(95deg,#FF7A3D,#8A47E0)' }}>
                    Uitgelicht
                  </span>
                )}
                <span className="rounded-full border border-[#e6e8eb] bg-[#f6f7f8] px-2.5 py-1 text-[11px] font-semibold text-[#3b4048]">
                  {c.tag}
                </span>
              </div>
              <div className="px-5 py-4">
                <h3 className="mb-2 text-[18px] font-bold leading-[1.2] text-[#15181d]">{c.title}</h3>
                <p className="text-[13.5px] leading-[1.5] text-[#3b4048]">{c.desc}</p>
              </div>
              <div className="mt-auto px-5 pb-5">{c.mock}</div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
