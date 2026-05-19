import Image from 'next/image'
import Link from 'next/link'

export default function CdDaanBanner() {
  return (
    <section className="bg-white py-[48px]">
      <div className="mx-auto max-w-[1280px] px-7">
        <div className="overflow-hidden rounded-[22px] border border-[#e6e8eb]">
          <div className="grid" style={{ gridTemplateColumns: '1fr 1.4fr' }}>

            {/* Left: photo */}
            <div
              className="relative flex min-h-[360px] items-end justify-center overflow-hidden p-10"
              style={{ background: 'linear-gradient(135deg, #fef0e8 0%, #fde6ed 50%, #f3e6f5 100%)' }}
            >
              <Image
                src="/Daan Koolhaas.jpg"
                alt="Daan Koolhaas — WebsUp"
                fill
                className="object-cover object-top"
                style={{ boxShadow: '0 24px 50px -10px rgba(255,122,61,.25)' }}
              />
            </div>

            {/* Right: text */}
            <div className="flex flex-col justify-center px-14 py-12">
              <p className="mb-3.5 text-[11.5px] font-semibold uppercase tracking-[0.16em]"
                style={{ color: '#F0517E' }}>
                Over WebsUp
              </p>
              <h2 className="mb-4 text-[clamp(26px,3vw,38px)] font-bold leading-[1.05] tracking-[-0.02em] text-[#15181d]">
                Je werkt direct met Daan.
              </h2>
              <p className="mb-4 max-w-[540px] text-[16px] leading-[1.55] text-[#3b4048]">
                Geen accountmanager, geen tussenpersonen. Je werkt direct met de developer en designer die ook daadwerkelijk bouwt. Dat zorgt voor korte lijnen, snelle beslissingen en oplossingen die kloppen.
              </p>
              <p className="mb-7 max-w-[540px] text-[15.5px] leading-[1.55] text-[#6b7280]">
                Ik snap techniek én denk praktisch mee. Hoe moeilijker de opdracht, hoe leuker ik het vind. En klanten zijn bij mij geen nummertje.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/over-ons"
                  className="inline-flex items-center gap-2 rounded-full bg-[#15181d] px-5 py-3 text-[14.5px] font-semibold text-white transition-colors hover:bg-black"
                >
                  Lees mijn verhaal
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-full border border-[#e6e8eb] px-5 py-3 text-[14.5px] font-semibold text-[#15181d] transition-colors hover:border-[#15181d]"
                >
                  Plan kennismaking
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
