'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const BLOCKS = [
  {
    category: 'Website',
    title: 'Thuisbatterijen Friesland',
    description:
      'Een heldere, snelle website gericht op vertrouwen en aanvragen — voor een groeiende energiemarkt.',
    image: '/Projecten/thuisbatterijen_friesland_mockup.png',
    href: '/projecten',
    accent: '#f97316',
  },
  {
    category: 'Apps & Dashboards',
    title: 'JTEQ Industries',
    description:
      'Maatwerk omgeving met overzicht, rapportage en controle voor een technisch dienstverlenend bedrijf.',
    image: '/Projecten/jteq_mockup.png',
    href: '/projecten',
    accent: '#ec4899',
  },
  {
    category: 'Webshop',
    title: 'Gold Center Drachten',
    description:
      'Een professionele webshop die direct vertrouwen en kwaliteit uitstraalt — voor juwelier en goudinkoop.',
    image: '/Projecten/goldcenterdrachten_mockup.png',
    href: '/projecten',
    accent: '#8b5cf6',
  },
]

export default function BouwblokkenSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-slate-100" />

      {/* Header */}
      <div className="mx-auto max-w-7xl px-6 pb-0 pt-24 lg:px-8 lg:pt-32">
        <span className="overline-badge mb-5 inline-flex">Bouwblokken</span>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <h2
            className="max-w-xl font-headline font-extrabold leading-[1.04] tracking-[-0.035em] text-slate-900"
            style={{ fontSize: 'clamp(2rem, 3.4vw, 3.2rem)' }}
          >
            Gebouwde digitale bouwblokken.
          </h2>
          <p className="max-w-[38ch] text-[0.95rem] leading-relaxed text-slate-500 lg:text-right">
            Websites, dashboards en systemen die bedrijven écht verder helpen.
          </p>
        </div>
      </div>

      {/* Alternating showcase blocks */}
      <div className="mt-16 lg:mt-20">
        {BLOCKS.map((block, i) => (
          <ShowcaseBlock key={block.title} block={block} index={i} />
        ))}
      </div>

      {/* Footer link */}
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-12 lg:px-8 lg:pb-32">
        <Link
          href="/projecten"
          className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
        >
          Alle projecten bekijken
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  )
}

function ShowcaseBlock({
  block,
  index,
}: {
  block: (typeof BLOCKS)[number]
  index: number
}) {
  const isReversed = index % 2 === 1

  return (
    <div
      className="border-t border-slate-100"
      style={{
        animationDelay: `${index * 120}ms`,
      }}
    >
      <div className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>

        {/* Mockup image — dominant, edge-to-edge */}
        <div className="group relative min-h-[22rem] flex-[1.75] overflow-hidden lg:min-h-[36rem]">
          <Image
            src={block.image}
            alt={block.title}
            fill
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.025]"
            sizes="(max-width: 1024px) 100vw, 65vw"
          />
          {/* Edge fade toward text side */}
          <div
            className={`pointer-events-none absolute inset-y-0 w-24 ${
              isReversed ? 'left-0 bg-gradient-to-r' : 'right-0 bg-gradient-to-l'
            } from-white/0 to-white/[0.06]`}
          />
        </div>

        {/* Text column */}
        <div className="flex flex-[1] flex-col justify-center px-8 py-12 lg:px-14 lg:py-20">
          <p
            className="mb-4 text-[0.62rem] font-bold uppercase tracking-[0.24em]"
            style={{ color: block.accent }}
          >
            {block.category}
          </p>
          <h3
            className="font-headline font-extrabold leading-[1.1] tracking-[-0.025em] text-slate-900"
            style={{ fontSize: 'clamp(1.6rem, 2.2vw, 2.1rem)' }}
          >
            {block.title}
          </h3>
          <p className="mt-4 max-w-[34ch] text-[0.95rem] leading-relaxed text-slate-500">
            {block.description}
          </p>
          <Link
            href={block.href}
            className="group mt-10 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition-all"
          >
            Bekijk project
            <ArrowRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  )
}
