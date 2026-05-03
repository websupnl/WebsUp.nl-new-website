import { Metadata } from 'next'
import Link from 'next/link'
import WavePageHeader from '@/components/site/WavePageHeader'
import { Monitor, ShoppingCart, LayoutDashboard, Zap, ArrowRight, CheckCircle, LucideIcon, Star, Settings, MapPin, MessageCircle } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import CTASection from '@/components/site/CTASection'
import { GlassCard } from '@/components/site/GlassCard'

export const metadata: Metadata = {
  title: 'Diensten',
  description:
    'Websites, webshops, maatwerk apps, dashboards en automatisering. Persoonlijk gebouwd, geen standaard pakketten.',
}

interface ServiceItem {
  title: string
  slug: string
  icon: LucideIcon
  intro: string
  bullets: string[]
}

const services: ServiceItem[] = [
  {
    title: 'Websites',
    slug: 'websites',
    icon: Monitor,
    intro:
      'Moderne, snelle websites die professioneel overkomen en gericht zijn op resultaat. WordPress, Next.js of Shopify, het platform volgt de vraag.',
    bullets: [
      'Conversiegerichte opbouw',
      'Mobiel eerst & razendsnel',
      'Basis SEO en technische fundering',
      'Beheerbaar en uitbreidbaar',
    ],
  },
  {
    title: 'Webshops',
    slug: 'webshops',
    icon: ShoppingCart,
    intro:
      'Webshops die vertrouwen uitstralen én verkopen. Met iDEAL, Mollie, slimme checkout en alles wat nodig is om direct te starten.',
    bullets: [
      'Optimale checkout flow',
      'Koppeling met betaalsystemen',
      'Voorraadbeheer & orders',
      'Uitbreidbaar naar maatwerk',
    ],
  },
  {
    title: 'Apps & Dashboards',
    slug: 'apps-dashboards',
    icon: LayoutDashboard,
    intro:
      'Maatwerk tools, klantportalen en dashboards die processen automatiseren en inzicht geven. Voor bedrijven die meer nodig hebben dan een website.',
    bullets: [
      'Klantportalen op maat',
      'Interne management tools',
      'Realtime data dashboards',
      'Rolgebaseerde toegang',
    ],
  },
  {
    title: 'Automatisering',
    slug: 'automatisering',
    icon: Zap,
    intro:
      'Koppelingen en slimme workflows die handmatig werk elimineren. Van n8n-automatiseringen tot volledige API koppelingen tussen je systemen.',
    bullets: [
      'API koppelingen',
      'Workflow automatisering',
      'CRM & email integraties',
      'n8n en maatwerk scripts',
    ],
  },
]

export default function DienstenPage() {
  return (
    <div>
      <WavePageHeader
        badge="Diensten"
        title="Websites, webshops, apps en automatiseringen die"
        titleHighlight="aansluiten op hoe jouw bedrijf werkt."
        subtitle="Geen standaard pakketten. Ik kijk naar wat past bij jouw situatie, je doelen en hoe je bedrijf werkt."
      >
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/contact" className="btn-brand-gradient">
            Plan een kennismaking
            <ArrowRight size={14} />
          </Link>
          <Link
            href="/gratis-ontwerp"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:border-white/50 hover:bg-white/20"
          >
            Vraag gratis ontwerp aan
          </Link>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            { icon: Settings, label: 'Maatwerk, geen pakketten', color: 'text-orange-400' },
            { icon: MessageCircle, label: 'Direct persoonlijk contact', color: 'text-accent-400' },
            { icon: MapPin, label: 'Werk voor heel Nederland', color: 'text-violet-300' },
          ].map(({ icon: Icon, label, color }) => (
            <GlassCard key={label} padding="px-4 py-3" className="flex items-center gap-2.5">
              <Icon size={16} className={`flex-shrink-0 ${color}`} />
              <span className="text-sm text-white/85 font-medium">{label}</span>
            </GlassCard>
          ))}
        </div>
      </WavePageHeader>

      {/* Service cards */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="mb-14 max-w-2xl">
            <span className="gradient-text text-[11px] font-bold uppercase tracking-[0.14em]">
              Wat ik bouw
            </span>
            <h2 className="mt-3 font-headline text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] text-slate-900 md:text-4xl lg:text-5xl">
              Vier richtingen, een aanpak
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-500">
              Heldere keuzes voor bedrijven die professioneel zichtbaar willen zijn, online willen verkopen of slimmer willen werken.
            </p>
          </Reveal>

          <div className="grid gap-5 lg:grid-cols-2">
            {services.map((service, i) => {
              const Icon = service.icon
              return (
                <Reveal key={service.slug} delay={i * 70}>
                  <Link
                    href={`/diensten/${service.slug}`}
                    className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent-200 hover:shadow-xl hover:shadow-slate-900/5"
                  >
                    <div className="mb-5 flex items-center gap-4">
                      <span
                        className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-md"
                        style={{ background: 'linear-gradient(135deg, #f97316 0%, #ec4899 50%, #a78bfa 100%)' }}
                      >
                        <Icon size={22} strokeWidth={1.8} />
                      </span>
                      <h3 className="font-headline text-2xl font-bold text-slate-900 transition-colors group-hover:text-accent-600">
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-base leading-relaxed text-slate-600">
                      {service.intro}
                    </p>

                    <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                      {service.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2 text-sm leading-relaxed text-slate-700">
                          <CheckCircle size={14} className="mt-0.5 flex-shrink-0 text-orange-500" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-600">
                      Meer over {service.title.toLowerCase()}
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="bg-slate-50 py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <Reveal>
            <div className="mb-5 flex items-center justify-center gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} size={18} className="fill-accent-400 text-accent-400" />
              ))}
            </div>
            <blockquote className="font-headline text-2xl font-bold leading-snug tracking-[-0.01em] text-slate-900 md:text-3xl lg:text-4xl">
              &ldquo;Daan heeft voor ons in no time, binnen 2 weken, een complete professionele website gebouwd. Qua kwaliteit komt het resultaat verrassend dicht in de buurt van veel duurdere agencies.&rdquo;
            </blockquote>
            <p className="mt-6 text-sm font-semibold text-slate-500">Jeremy Palsma</p>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </div>
  )
}
