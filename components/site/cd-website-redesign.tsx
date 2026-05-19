import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

function WebsiteMock() {
  return (
    <div className="w-full overflow-hidden rounded-[12px] border border-[#e6e8eb] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.07)]">
      {/* Title bar */}
      <div className="flex items-center gap-1.5 border-b border-[#e6e8eb] bg-[#f6f7f8] px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff6158]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <div className="ml-3 h-[18px] flex-1 rounded-md bg-[#eef0f2]" />
      </div>
      {/* Content */}
      <div className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="h-2 w-16 rounded-full" style={{ background: 'linear-gradient(90deg,#FF7A3D,#8A47E0)' }} />
          <div className="flex gap-2">
            {[1,2,3,4].map(i => <div key={i} className="h-1.5 w-7 rounded-full bg-[#eef0f2]" />)}
          </div>
        </div>
        <div className="mb-1.5 h-3.5 w-[85%] rounded-md bg-[#15181d]" />
        <div className="mb-3.5 h-3.5 w-[55%] rounded-md" style={{ background: 'linear-gradient(90deg,#FF7A3D,#8A47E0)' }} />
        <div className="mb-3.5 flex gap-1.5">
          <div className="h-5.5 w-20 rounded-full" style={{ background: 'linear-gradient(90deg,#FF7A3D,#8A47E0)' }} />
          <div className="h-5.5 w-18 rounded-full border border-[#e6e8eb] bg-[#eef0f2]" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[1,2,3].map(i => (
            <div key={i} className="aspect-square rounded-lg border border-[#e6e8eb]"
              style={{ background: `linear-gradient(135deg,rgba(255,122,61,${0.1+i*0.05}),rgba(255,122,61,0.03))` }} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function CdWebsiteRedesign() {
  return (
    <section className="bg-white py-[32px]">
      <div className="mx-auto max-w-[1280px] px-7">
        <div className="overflow-hidden rounded-[22px] border border-[#e6e8eb] bg-gradient-to-b from-white to-[#f8f5fa]">
          <div className="grid lg:grid-cols-2">

            {/* Left: mockup */}
            <div className="flex items-center p-10 sm:p-12 lg:p-14">
              <WebsiteMock />
            </div>

            {/* Right: text */}
            <div className="flex flex-col justify-center px-8 py-10 sm:px-12 lg:px-14 lg:py-14">
              <p className="mb-3 text-[11.5px] font-semibold uppercase tracking-[0.16em]"
                style={{ color: '#F0517E' }}>
                Website redesign
              </p>
              <h2 className="mb-4 text-[clamp(26px,3vw,38px)] font-bold leading-[1.05] tracking-[-0.02em] text-[#15181d]">
                Een website moet meer doen dan er goed uitzien.
              </h2>
              <p className="mb-7 max-w-[460px] text-[15.5px] leading-[1.55] text-[#3b4048]">
                Hij moet je verhaal duidelijk maken, vertrouwen wekken en aanvragen opleveren. Ik bouw sites die structuur geven aan wat je doet en bezoekers meenemen richting contact.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/diensten/websites"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-[14.5px] font-semibold text-white transition-all hover:-translate-y-px"
                  style={{ background: 'linear-gradient(95deg,#FF7A3D,#F0517E,#C742C1,#8A47E0)', boxShadow: '0 8px 20px -6px rgba(240,81,126,.45)' }}
                >
                  Naar websites
                </Link>
                <Link
                  href="/diensten"
                  className="inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-[#15181d] transition-colors hover:text-[#F0517E]"
                >
                  Bekijk werkwijze
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
