import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Globe,
  ShoppingCart,
  LayoutPanelTop,
  Workflow,
  Link2,
  Calculator,
} from 'lucide-react'
import Reveal from '@/components/ui/Reveal'

const cards = [
  {
    title: 'Websites die vertrouwen opbouwen',
    description:
      'Voor bedrijven die professioneel zichtbaar willen zijn en meer uit hun online aanwezigheid willen halen.',
    href: '/diensten/websites',
    icon: Globe,
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80',
    eyebrow: 'Website',
    accent: 'text-orange-400',
    span: 'lg:col-span-7',
    height: 'min-h-[32rem]',
  },
  {
    title: 'Webshops die verkoop makkelijker maken',
    description:
      'Van presentatie tot checkout en opvolging. Minder losse handelingen, meer grip op je proces.',
    href: '/diensten/webshops',
    icon: ShoppingCart,
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80',
    eyebrow: 'Webshop',
    accent: 'text-pink-400',
    span: 'lg:col-span-5',
    height: 'min-h-[15.25rem]',
  },
  {
    title: 'Dashboards en systemen op maat',
    description:
      'Voor processen die niet meer lekker passen in losse tools, Excel lijsten of handmatig werk.',
    href: '/diensten/apps-dashboards',
    icon: Workflow,
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    eyebrow: 'Maatwerk',
    accent: 'text-orange-400',
    span: 'lg:col-span-5',
    height: 'min-h-[15.25rem]',
  },
]

const compactPoints = [
  'Van eenvoudige website tot compleet klantportaal',
  'Geen standaard pakket, maar wat jouw bedrijf nodig heeft',
  'Ontwerp, techniek en logica in één traject geregeld',
]

const modules = [
  { label: 'Portalen', icon: LayoutPanelTop },
  { label: 'Koppelingen', icon: Link2 },
  { label: 'Calculators', icon: Calculator },
]

export default function WhySection() {
  return (
    <section className="bg-[#06040c] py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mb-14">
          <span className="overline-badge mb-5 inline-flex">Wat ik voor je kan bouwen</span>
          <div className="max-w-4xl">
            <h2 className="font-headline text-4xl font-extrabold leading-[1.04] tracking-[-0.03em] text-white md:text-6xl">
              Van website tot maatwerk systeem.
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/62">
              Soms is een sterke website genoeg. Soms vraagt je bedrijf om meer: een webshop die beter verkoopt, een dashboard dat overzicht geeft, een portaal voor klanten of een maatwerk oplossing die werk uit handen neemt. WebsUp bouwt wat nodig is, los of slim gecombineerd.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-12">
          <Reveal className={cards[0].span}>
            <Link
              href={cards[0].href}
              className={`group relative flex overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 ${cards[0].height}`}
            >
              <Image
                src={cards[0].image}
                alt={cards[0].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(6,4,12,0.14)_0%,rgba(6,4,12,0.18)_35%,rgba(6,4,12,0.92)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 p-8 lg:p-10">
                <div className="mb-4 inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur-sm">
                  {cards[0].eyebrow}
                </div>
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm ${cards[0].accent}`}>
                  <Globe size={18} />
                </div>
                <h3 className="max-w-xl font-headline text-3xl font-bold leading-tight text-white">
                  {cards[0].title}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/65">
                  {cards[0].description}
                </p>
              </div>
              <div className="absolute right-7 top-7 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-transform duration-200 group-hover:translate-x-1">
                <ArrowRight size={16} />
              </div>
            </Link>
          </Reveal>

          <div className="grid gap-5 lg:col-span-5">
            {cards.slice(1).map((card, index) => {
              const Icon = card.icon

              return (
                <Reveal key={card.title} delay={index * 80}>
                  <Link
                    href={card.href}
                    className={`group relative flex overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 ${card.height}`}
                  >
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      sizes="(max-width: 1024px) 100vw, 42vw"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(6,4,12,0.16)_0%,rgba(6,4,12,0.24)_38%,rgba(6,4,12,0.92)_100%)]" />
                    <div className="relative flex w-full flex-col justify-between p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur-sm">
                          {card.eyebrow}
                        </div>
                        <div className={`flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm ${card.accent}`}>
                          <Icon size={16} />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-headline text-2xl font-bold leading-tight text-white">
                          {card.title}
                        </h3>
                        <p className="mt-2 max-w-md text-sm leading-relaxed text-white/62">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>

        <Reveal delay={120} className="mt-5">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.03)_100%)]">
            <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="border-b border-white/10 p-7 lg:border-b-0 lg:border-r lg:p-8">
                <div className="mb-4 inline-flex rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs font-semibold text-white/80">
                  Geen standaard pakket. Wel een aanpak die past.
                </div>
                <p className="max-w-2xl text-base leading-relaxed text-white/70">
                  Niet ieder bedrijf heeft hetzelfde nodig. Daarom kijk ik niet vanuit een vast stramien, maar vanuit jouw situatie. Soms is een website de juiste stap. Soms zit de winst juist in een koppeling, calculator, portaal of intern systeem.
                </p>

                <div className="mt-6 grid gap-3 md:grid-cols-3">
                  {compactPoints.map((point) => (
                    <div
                      key={point}
                      className="rounded-[1.25rem] border border-white/10 bg-[#0b0813] px-4 py-3 text-sm leading-relaxed text-white/62"
                    >
                      {point}
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {modules.map((module) => {
                    const Icon = module.icon

                    return (
                      <div
                        key={module.label}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/65"
                      >
                        <Icon size={13} className="text-orange-400" />
                        {module.label}
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="flex h-full flex-col justify-between p-7 lg:p-8">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-orange-400">
                    Samen kijken wat past
                  </div>
                  <p className="mt-4 text-base leading-relaxed text-white/72">
                    Website, webshop of maatwerkoplossing nodig? Dan kijken we samen wat past bij jouw bedrijf, je doelen en hoe je nu werkt.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-white/90"
                  >
                    Plan een kennismaking
                    <ArrowRight size={14} />
                  </Link>
                  <Link
                    href="/diensten"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    Bekijk diensten
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
