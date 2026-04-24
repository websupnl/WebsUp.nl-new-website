import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, ArrowRight, Monitor, ShoppingCart, LayoutDashboard, Zap } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import GradientIcon from '@/components/site/GradientIcon'

const solutions = [
  {
    id: 'websites',
    title: 'Websites',
    icon: Monitor,
    intro: 'Een website die vertrouwen geeft, duidelijk uitlegt wat je doet en gericht is op contact of aanvragen.',
    stack: 'WordPress, Next.js of Shopify als dat beter past',
    bullets: ['Sterke eerste indruk', 'Snel en mobielvriendelijk', 'Logische pagina-opbouw', 'Zelf te beheren waar nodig'],
    href: '/diensten/websites',
    image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=800&q=70',
  },
  {
    id: 'webshops',
    title: 'Webshops',
    icon: ShoppingCart,
    intro: 'Een shop die niet alleen netjes oogt, maar ook helpt om eenvoudiger te verkopen.',
    stack: 'Shopify, WooCommerce of maatwerk waar dat logisch is',
    bullets: ['Sterke checkout flow', 'Mollie en iDEAL koppelingen', 'Order- en voorraadlogica', 'Klaar om door te groeien'],
    href: '/diensten/webshops',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=70',
  },
  {
    id: 'apps-dashboards',
    title: 'Apps & Dashboards',
    icon: LayoutDashboard,
    intro: 'Maatwerk tools voor teams die overzicht, grip en minder handmatig werk nodig hebben.',
    stack: 'Portals, dashboards en interne tools op maat',
    bullets: ['Realtime inzicht', 'Veilige rollen en rechten', 'Klantportalen of interne tools', 'Aansluitend op je werkproces'],
    href: '/diensten/apps-dashboards',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=70',
  },
  {
    id: 'automatisering',
    title: 'Automatisering',
    icon: Zap,
    intro: 'Koppelingen en flows die terugkerend werk uit handen nemen en fouten helpen voorkomen.',
    stack: 'n8n, API-koppelingen en slimme opvolging tussen systemen',
    bullets: ['Minder handmatig werk', 'Snellere opvolging', 'Betere datastromen', 'Meer rust en overzicht'],
    href: '/diensten/automatisering',
    image: 'https://images.unsplash.com/photo-1518432031352-d6fc5734c3d0?auto=format&fit=crop&w=800&q=70',
  },
]

export default function SolutionsSection() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mb-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <span className="overline-badge mb-4 inline-flex">Wat ik bouw</span>
            <h2 className="max-w-2xl font-headline text-4xl font-extrabold leading-[1.08] tracking-[-0.02em] text-slate-900 md:text-5xl">
              Vier richtingen, één heldere basis
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-slate-500 md:text-lg lg:justify-self-end">
            Websites, webshops, apps en automatiseringen die logisch aansluiten op hoe jouw bedrijf werkt. Geen losse tools, maar keuzes die als geheel kloppen.
          </p>
        </Reveal>

        <div className="border-t border-slate-200">
          <div className="grid gap-0 lg:grid-cols-4">
            {solutions.map((solution, index) => {
              const Icon = solution.icon

              return (
                <Reveal key={solution.id} delay={index * 60}>
                  <Link
                    href={solution.href}
                    className="group flex h-full flex-col border-b border-slate-200 py-7 lg:border-b-0 lg:px-6 lg:first:pl-0 lg:last:pr-0 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-slate-200"
                  >
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <GradientIcon icon={Icon} size="sm" />
                      <div className="text-xs font-bold uppercase tracking-[0.12em] text-slate-300 transition-colors group-hover:text-orange-400">
                        0{index + 1}
                      </div>
                    </div>

                    <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-lg bg-slate-100">
                      <Image
                        src={solution.image}
                        alt={solution.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#06040c]/40 via-transparent to-transparent" />
                    </div>

                    <h3 className="font-headline text-2xl font-bold leading-tight text-slate-900 transition-colors group-hover:text-orange-500">
                      {solution.title}
                    </h3>
                    <p className="mt-3 text-sm font-medium text-slate-400">{solution.stack}</p>
                    <p className="mt-4 text-sm leading-relaxed text-slate-500">{solution.intro}</p>

                    <div className="mt-6 space-y-2.5">
                      {solution.bullets.map((bullet) => (
                        <div key={bullet} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600">
                          <CheckCircle size={14} className="mt-0.5 shrink-0 text-orange-500" />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition-colors group-hover:text-orange-500">
                      Bekijk dienst
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>

        <Reveal className="mt-8">
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
