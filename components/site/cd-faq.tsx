'use client'

import { useState } from 'react'

const faqs = [
  { q: 'Wat kost een website bij WebsUp?', a: 'Dat hangt af van wat je nodig hebt. Een eenvoudige zakelijke website zit vaak in een andere prijscategorie dan een webshop of maatwerk module. Na een kennismakingsgesprek krijg je een concreet voorstel met een vaste prijs.' },
  { q: 'Kan WebsUp ook mijn bestaande website verbeteren?', a: 'Ja, dat kan. Soms is een volledige redesign nodig, soms helpen gerichte verbeteringen al een hoop. Ik kijk eerst wat het slimst is voordat ik iets adviseer.' },
  { q: 'Werk je met WordPress, Shopify of maatwerk?', a: 'Alle drie. De keuze hangt af van wat je nodig hebt en hoe het bedrijf wil groeien. Ik adviseer eerlijk welk platform past.' },
  { q: 'Kan ik ook hosting en onderhoud afnemen?', a: 'Ja. Updates, backups, beveiliging en support kan ik volledig overnemen. Één aanspreekpunt voor alles online.' },
  { q: 'Hoe snel kan mijn website online?', a: 'Een eenvoudige website kan binnen enkele weken live. Grotere projecten met maatwerk duren langer. In het voorstel staat altijd een duidelijke planning.' },
  { q: 'Kan ik eerst vrijblijvend kennismaken?', a: 'Zeker. Een kennismakingsgesprek is altijd gratis en zonder verplichtingen. Je kunt direct online een moment plannen.' },
]

export default function CdFaq() {
  const [open, setOpen] = useState<number>(0)

  return (
    <section className="bg-white py-[72px]">
      <div className="mx-auto max-w-[1280px] px-7">

        {/* Header */}
        <div className="mx-auto mb-10 max-w-[720px] text-center">
          <p className="mb-2.5 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[#9aa0a8]">
            Veelgestelde vragen
          </p>
          <h2 className="text-[clamp(28px,3.2vw,42px)] font-bold leading-[1.05] tracking-[-0.02em] text-[#15181d]">
            Misschien zit je vraag hier al tussen.
          </h2>
        </div>

        {/* Accordion */}
        <div className="mx-auto flex max-w-[820px] flex-col gap-2">
          {faqs.map((it, i) => {
            const isOpen = open === i
            return (
              <button
                key={i}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="w-full rounded-[16px] border px-6 py-5 text-left transition-all"
                style={{
                  background: isOpen ? 'linear-gradient(180deg, #fff, #fef9f6)' : '#fff',
                  borderColor: isOpen ? 'rgba(255,122,61,.3)' : '#e6e8eb',
                }}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[16.5px] font-bold text-[#15181d]">{it.q}</span>
                  <span
                    className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full transition-all"
                    style={{
                      background: isOpen ? 'linear-gradient(95deg,#FF7A3D,#8A47E0)' : '#f6f7f8',
                      color: isOpen ? '#fff' : '#15181d',
                      border: isOpen ? 'none' : '1px solid #e6e8eb',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
                      transition: 'all .3s cubic-bezier(.2,.7,.2,1.4)',
                    }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 5v14M5 12h14"/>
                    </svg>
                  </span>
                </div>
                <div
                  className="overflow-hidden transition-all"
                  style={{
                    maxHeight: isOpen ? 200 : 0,
                    marginTop: isOpen ? 14 : 0,
                    transition: 'max-height .35s ease, margin .35s ease',
                  }}
                >
                  <p className="max-w-[720px] text-[14.5px] leading-[1.55] text-[#3b4048]">{it.a}</p>
                </div>
              </button>
            )
          })}
        </div>

      </div>
    </section>
  )
}
