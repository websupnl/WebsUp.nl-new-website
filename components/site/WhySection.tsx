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

const services = [
  {
    eyebrow: 'Website',
    title: 'Websites die vertrouwen opbouwen',
    description:
      'Voor bedrijven die professioneel zichtbaar willen zijn en meer uit hun online aanwezigheid willen halen.',
    href: '/diensten/websites',
    icon: Globe,
  },
  {
    eyebrow: 'Webshop',
    title: 'Webshops die verkoop makkelijker maken',
    description:
      'Van presentatie tot checkout en opvolging. Minder losse handelingen, meer grip op je proces.',
    href: '/diensten/webshops',
    icon: ShoppingCart,
  },
  {
    eyebrow: 'Maatwerk',
    title: 'Dashboards en systemen op maat',
    description:
      'Voor processen die niet meer lekker passen in losse tools, Excel lijsten of handmatig werk.',
    href: '/diensten/apps-dashboards',
    icon: Workflow,
  },
  {
    eyebrow: 'Automatisering',
    title: 'Automatiseringen die werk uit handen nemen',
    description:
      'Koppelingen en slimme flows die terugkerend werk beperken en je proces overzichtelijker maken.',
    href: '/diensten/automatisering',
    icon: Link2,
  },
]

const focusPoints = [
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
    <section className="bg-white py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="max-w-4xl">
          <span className="overline-badge mb-5 inline-flex">Wat ik voor je kan bouwen</span>
          <h2 className="font-headline text-4xl font-extrabold leading-[1.04] tracking-[-0.03em] text-slate-900 md:text-6xl">
            Van website tot maatwerk systeem.
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-500">
            Soms is een sterke website genoeg. Soms vraagt je bedrijf om meer: een webshop die beter verkoopt, een dashboard dat overzicht geeft, een portaal voor klanten of een maatwerk oplossing die werk uit handen neemt. WebsUp bouwt wat nodig is, los of slim gecombineerd.
          </p>
        </Reveal>

        <div className="mt-16 grid items-start gap-14 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20">
          <Reveal>
            <div className="max-w-xl">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-orange-500">
                Geen standaard pakket. Wel een aanpak die past.
              </div>
              <p className="mt-5 text-lg leading-relaxed text-slate-600">
                Niet ieder bedrijf heeft hetzelfde nodig. Daarom kijk ik niet vanuit een vast stramien, maar vanuit jouw situatie. Soms is een website de juiste stap. Soms zit de winst juist in een koppeling, calculator, portaal of intern systeem.
              </p>

              <div className="mt-8 space-y-4 border-l border-slate-200 pl-5">
                {focusPoints.map((point) => (
                  <div key={point} className="text-sm leading-relaxed text-slate-600">
                    {point}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {modules.map((module) => {
                  const Icon = module.icon

                  return (
                    <div
                      key={module.label}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600"
                    >
                      <Icon size={13} className="text-orange-500" />
                      {module.label}
                    </div>
                  )
                })}
              </div>

              <div className="mt-10 border-t border-slate-200 pt-6">
                <div className="text-sm font-semibold text-slate-900">Samen kijken wat past</div>
                <p className="mt-3 text-base leading-relaxed text-slate-500">
                  Website, webshop of maatwerkoplossing nodig? Dan kijken we samen wat past bij jouw bedrijf, je doelen en hoe je nu werkt.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
                  >
                    Plan een kennismaking
                    <ArrowRight size={14} />
                  </Link>
                  <Link
                    href="/diensten"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition-colors hover:border-slate-400"
                  >
                    Bekijk diensten
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="lg:grid lg:h-[36rem] lg:grid-rows-4">
            {services.map((service, index) => {
              const Icon = service.icon

              return (
                <Reveal key={service.title} delay={index * 70} className="h-full">
                  <Link
                    href={service.href}
                    className="group flex h-full items-center border-b border-slate-200 py-7 first:pt-0 last:border-b-0 last:pb-0 lg:py-0"
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-orange-500">
                        <Icon size={18} />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                          {service.eyebrow}
                        </div>
                        <div className="mt-2 flex items-start justify-between gap-4">
                          <h3 className="max-w-xl font-headline text-2xl font-bold leading-tight text-slate-900 md:text-[2rem]">
                            {service.title}
                          </h3>
                          <ArrowRight
                            size={18}
                            className="mt-1 flex-shrink-0 text-slate-300 transition-all duration-200 group-hover:translate-x-1 group-hover:text-orange-500"
                          />
                        </div>
                        <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-500">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
