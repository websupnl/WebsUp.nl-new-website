import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, ArrowRight, Monitor, ShoppingCart, LayoutDashboard, Zap } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'

const solutions = [
  {
    id: 'websites',
    overline: 'Websites',
    icon: Monitor,
    title: 'Een website die écht werkt voor jouw bedrijf.',
    bullets: ['WordPress, Shopify of maatwerk', 'Snel, mobielvriendelijk & vindbaar', 'Webshop met iDEAL of Mollie', 'Eenvoudig zelf te beheren'],
    href: '/diensten/websites',
    image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=800&q=70',
  },
  {
    id: 'webshops',
    overline: 'Webshops',
    icon: ShoppingCart,
    title: 'Een webshop die converteert, niet alleen laat zien.',
    bullets: ['Geoptimaliseerde checkout flow', 'Koppeling met Mollie, Stripe, iDEAL', 'Voorraadbeheer & orderbeheer', 'Automatische order e-mails'],
    href: '/diensten/webshops',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=70',
  },
  {
    id: 'apps-dashboards',
    overline: 'Apps & Dashboards',
    icon: LayoutDashboard,
    title: 'Maatwerk tools die jouw team slimmer laten werken.',
    bullets: ['Klantportaal met eigen login', 'Interne management dashboards', 'Realtime data & overzichten', 'Veilige toegang per gebruikersrol'],
    href: '/diensten/apps-dashboards',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=70',
  },
  {
    id: 'automatisering',
    overline: 'Automatisering',
    icon: Zap,
    title: 'Stop met kopiëren en plakken. Laat het systeem het doen.',
    bullets: ['Koppelingen tussen al je tools', 'Automatische e-mails & meldingen', 'Lead- en orderverwerking', 'Minder fouten, meer overzicht'],
    href: '/diensten/automatisering',
    image: 'https://images.unsplash.com/photo-1518432031352-d6fc5734c3d0?auto=format&fit=crop&w=800&q=70',
  },
]

export default function SolutionsSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal className="mb-12">
          <span className="overline-badge mb-4 inline-flex">Wat ik bouw</span>
          <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-slate-900 mt-2 max-w-2xl leading-[1.08] tracking-[-0.02em]">
            Geen losse tools,{' '}
            <span className="gradient-text">maar één geheel.</span>
          </h2>
          <p className="text-lg text-slate-500 mt-4 max-w-xl leading-relaxed">
            Ik bouw websites, webshops, apps en automatiseringen die op elkaar aansluiten. Jij kiest het platform — ik zorg dat het werkt.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-5">
          {solutions.map((sol, i) => {
            const Icon = sol.icon
            return (
              <Reveal key={sol.id} delay={i * 60}>
                <Link
                  href={sol.href}
                  className="group flex flex-col bg-white border border-slate-100 rounded-[1.5rem] overflow-hidden hover:border-orange-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden bg-slate-100">
                    <Image
                      src={sol.image}
                      alt={sol.overline}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center">
                      <Icon size={17} className="text-white" />
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-7 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-headline text-xl font-bold text-slate-900 tracking-tight">
                        {sol.overline}
                      </h3>
                      <ArrowRight
                        size={16}
                        className="text-slate-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0 mt-1"
                      />
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed mb-5 flex-1">
                      {sol.title}
                    </p>
                    <ul className="space-y-2">
                      {sol.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2 text-sm text-slate-600">
                          <CheckCircle size={13} className="text-orange-400 flex-shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="mt-8 text-center">
          <Link
            href="/diensten"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Bekijk alle diensten <ArrowRight size={14} />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
