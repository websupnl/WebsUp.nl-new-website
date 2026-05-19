import Link from 'next/link'

export default function CdKennismakenCta() {
  return (
    <section className="pb-[72px] pt-[32px]">
      <div className="mx-auto max-w-[1280px] px-7">
        <div
          className="relative overflow-hidden rounded-[22px] border border-[#e6e8eb] p-14 text-center"
          style={{ background: 'linear-gradient(135deg, #fef0e8 0%, #fde6ed 50%, #f3e6f5 100%)' }}
        >
          {/* Background orbs */}
          <div className="pointer-events-none absolute -left-24 -top-24 h-[360px] w-[360px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,122,61,.18), transparent 60%)' }} />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-[360px] w-[360px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(138,71,224,.16), transparent 60%)' }} />

          <div className="relative mx-auto max-w-[640px]">
            <p className="mb-3.5 text-[11.5px] font-semibold uppercase tracking-[0.16em]"
              style={{ color: '#F0517E' }}>
              Kennismaken
            </p>
            <h2 className="mb-4 text-[clamp(28px,3.2vw,42px)] font-bold leading-[1.05] tracking-[-0.02em] text-[#15181d]">
              Even sparren over jouw digitale uitdaging?
            </h2>
            <p className="mb-8 text-[16px] leading-[1.55] text-[#3b4048]">
              Een kennismakingsgesprek duurt ongeveer 30 minuten. We bespreken waar je tegenaan loopt, wat je doelen zijn en of ik daar de juiste partner voor ben. Geen verkoop, gewoon een gesprek.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-[14.5px] font-semibold text-white transition-all hover:-translate-y-px"
                style={{ background: 'linear-gradient(95deg,#FF7A3D,#F0517E,#C742C1,#8A47E0)', boxShadow: '0 8px 20px -6px rgba(240,81,126,.45)' }}
              >
                Plan een kennismakingsgesprek
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full border border-[#e6e8eb] bg-white px-5 py-3 text-[14.5px] font-semibold text-[#15181d] transition-colors hover:border-[#15181d]"
              >
                Stuur eerst een bericht
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
