import Link from 'next/link'

const items = [
  { cat: 'Update',      title: 'Nieuwe pakketten voor hosting en beheer',   date: '14 mei 2026' },
  { cat: 'Case',        title: 'Webshop migratie naar Shopify afgerond',    date: '10 mei 2026' },
  { cat: 'Update',      title: 'Sneller laden door nieuwe CDN-koppeling',   date: '5 mei 2026'  },
  { cat: 'Achtergrond', title: 'Hoe ik prijzen bepaal voor maatwerk',       date: '2 mei 2026'  },
]

export default function CdNieuwsUpdate() {
  return (
    <section className="py-[32px] pb-[72px]" style={{ background: '#f6f7f8' }}>
      <div className="mx-auto max-w-[1280px] px-7">

        {/* Header */}
        <div className="mb-8 flex items-end justify-between gap-5">
          <div>
            <p className="mb-2.5 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[#9aa0a8]">
              Het laatste nieuws
            </p>
            <h2 className="text-[clamp(28px,3.2vw,42px)] font-bold leading-[1.05] tracking-[-0.02em] text-[#15181d]">
              Updates & achtergronden.
            </h2>
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <Link
              key={i}
              href="/kennisbank"
              className="flex min-h-[160px] flex-col gap-3 rounded-[16px] border border-[#e6e8eb] bg-white p-[22px] transition-all hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-16px_rgba(20,22,26,.16)]"
            >
              <div>
                <span className="rounded-full border border-[#e6e8eb] bg-[#f6f7f8] px-2.5 py-1 text-[11px] font-semibold text-[#3b4048]">
                  {it.cat}
                </span>
              </div>
              <h3 className="mt-1 text-[16px] font-bold leading-[1.25] text-[#15181d]">{it.title}</h3>
              <div className="mt-auto text-[12px] text-[#9aa0a8]">{it.date}</div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/kennisbank"
            className="inline-flex items-center rounded-full border border-[#e6e8eb] bg-white px-5 py-3 text-[14.5px] font-semibold text-[#15181d] transition-colors hover:border-[#15181d]"
          >
            Bekijk alle artikelen
          </Link>
        </div>

      </div>
    </section>
  )
}
