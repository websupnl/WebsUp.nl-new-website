'use client'

import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, ArrowRight, Monitor, ShoppingCart, LayoutDashboard, Zap } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card'
import { Tooltip } from '@/components/ui/tooltip-card'
import GradientIcon from '@/components/site/GradientIcon'

const solutions = [
  {
    id: 'websites',
    overline: 'Websites',
    icon: Monitor,
    title: 'Een website die echt werkt voor jouw bedrijf.',
    tooltips: [
      { label: 'Ideaal voor', content: 'Bedrijven die professioneel zichtbaar willen zijn en online aanvragen willen binnenhalen.' },
      { label: 'Stack', content: 'WordPress voor snelheid, Next.js voor maatwerk en Shopify wanneer verkoop een grotere rol speelt.' },
    ],
    bullets: ['WordPress, Shopify of maatwerk', 'Snel, mobielvriendelijk & vindbaar', 'Webshop met iDEAL of Mollie', 'Eenvoudig zelf te beheren'],
    href: '/diensten/websites',
    image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=800&q=70',
  },
  {
    id: 'webshops',
    overline: 'Webshops',
    icon: ShoppingCart,
    title: 'Een webshop die converteert, niet alleen laat zien.',
    tooltips: [
      { label: 'Ideaal voor', content: 'Ondernemers die online willen verkopen met een strakke checkout en minder afhakers.' },
      { label: 'Koppelingen', content: 'Mollie, Stripe, iDEAL, ordermails en praktische koppelingen met je verkoopproces.' },
    ],
    bullets: ['Geoptimaliseerde checkout flow', 'Koppeling met Mollie, Stripe, iDEAL', 'Voorraadbeheer & orderbeheer', 'Automatische order e-mails'],
    href: '/diensten/webshops',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=70',
  },
  {
    id: 'apps-dashboards',
    overline: 'Apps & Dashboards',
    icon: LayoutDashboard,
    title: 'Maatwerk tools die jouw team slimmer laten werken.',
    tooltips: [
      { label: 'Voor teams', content: 'Handig wanneer processen, klantdata of interne workflows niet meer lekker in losse tools passen.' },
      { label: 'Resultaat', content: 'Een centrale omgeving met realtime inzicht, duidelijke rechten en minder handmatig werk.' },
    ],
    bullets: ['Klantportaal met eigen login', 'Interne management dashboards', 'Realtime data & overzichten', 'Veilige toegang per gebruikersrol'],
    href: '/diensten/apps-dashboards',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=70',
  },
  {
    id: 'automatisering',
    overline: 'Automatisering',
    icon: Zap,
    title: 'Stop met kopieren en plakken. Laat het systeem het doen.',
    tooltips: [
      { label: 'Typische winst', content: 'Minder fouten, snellere opvolging en minder tijd kwijt aan terugkerend handmatig werk.' },
      { label: 'Tools', content: 'n8n, API-koppelingen, CRM-syncs, formulieren en automatische meldingen tussen je systemen.' },
    ],
    bullets: ['Koppelingen tussen al je tools', 'Automatische e-mails & meldingen', 'Lead- en orderverwerking', 'Minder fouten, meer overzicht'],
    href: '/diensten/automatisering',
    image: 'https://images.unsplash.com/photo-1518432031352-d6fc5734c3d0?auto=format&fit=crop&w=800&q=70',
  },
]

export default function SolutionsSection() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mb-12">
          <span className="overline-badge mb-4 inline-flex">Wat ik bouw</span>
          <h2 className="mt-2 max-w-2xl font-headline text-4xl font-extrabold leading-[1.08] tracking-[-0.02em] text-slate-900 md:text-5xl">
            Geen losse tools,{' '}
            <span className="gradient-text">maar een geheel.</span>
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-500">
            Ik bouw websites, webshops, apps en automatiseringen die op elkaar aansluiten. Jij kiest het platform, ik zorg dat het werkt.
          </p>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {solutions.map((sol, i) => {
            const Icon = sol.icon

            return (
              <Reveal key={sol.id} delay={i * 60}>
                <CardContainer containerClassName="h-full w-full">
                  <CardBody className="group/card h-full w-full">
                    <Link
                      href={sol.href}
                      className="group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-slate-100 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.04)] transition-all duration-300 hover:border-orange-100 hover:shadow-[0_22px_60px_rgba(249,115,22,0.10)]"
                    >
                      <CardItem
                        translateZ={18}
                        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-orange-300/80 to-transparent opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
                      />

                      <CardItem translateZ={26} className="relative h-52 overflow-hidden bg-slate-100">
                        <Image
                          src={sol.image}
                          alt={sol.overline}
                          fill
                          className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-slate-900/5 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#06040c]/35 to-transparent" />
                        <CardItem
                          translateZ={52}
                          className="absolute left-4 top-4"
                        >
                          <GradientIcon icon={Icon} size="sm" innerClassName="bg-white/95" />
                        </CardItem>
                      </CardItem>

                      <div className="flex flex-1 flex-col p-7">
                        <div className="mb-3 flex items-start justify-between">
                          <CardItem translateZ={36} as="h3" className="font-headline text-xl font-bold tracking-tight text-slate-900">
                            {sol.overline}
                          </CardItem>
                          <CardItem translateZ={44}>
                            <ArrowRight
                              size={16}
                              className="mt-1 flex-shrink-0 text-slate-300 transition-all duration-200 group-hover/card:translate-x-1 group-hover/card:text-orange-500"
                            />
                          </CardItem>
                        </div>

                        <CardItem translateZ={30} as="p" className="mb-5 flex-1 text-sm leading-relaxed text-slate-500">
                          {sol.title}
                        </CardItem>

                        <CardItem translateZ={34} className="mb-5 flex flex-wrap gap-2">
                          {sol.tooltips.map((tooltip) => (
                            <Tooltip key={tooltip.label} content={tooltip.content}>
                              <span className="inline-flex cursor-default items-center rounded-full border border-orange-100 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600 transition-colors hover:border-orange-200 hover:bg-orange-100/80">
                                {tooltip.label}
                              </span>
                            </Tooltip>
                          ))}
                        </CardItem>

                        <CardItem translateZ={28} as="ul" className="space-y-2">
                          {sol.bullets.map((bullet) => (
                            <li key={bullet} className="flex items-center gap-2 text-sm text-slate-600">
                              <CheckCircle size={13} className="flex-shrink-0 text-orange-400" />
                              {bullet}
                            </li>
                          ))}
                        </CardItem>
                      </div>
                    </Link>
                  </CardBody>
                </CardContainer>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="mt-8 text-center">
          <Link
            href="/diensten"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900"
          >
            Bekijk alle diensten <ArrowRight size={14} />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
