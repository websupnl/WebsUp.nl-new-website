'use client'

import Link from 'next/link'
import { CheckCircle, ArrowRight, Monitor, ShoppingCart, LayoutDashboard, Zap } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'

const services = [
  {
    title: 'Websites',
    slug: 'websites',
    icon: Monitor,
    intro: 'Moderne, snelle websites die professioneel overkomen en gericht zijn op resultaat. WordPress, Next.js of Shopify, het platform volgt de vraag.',
    bullets: ['Conversiegerichte opbouw', 'Mobiel eerst & razendsnel', 'Basis SEO en technische fundering', 'Beheerbaar en uitbreidbaar'],
  },
  {
    title: 'Webshops',
    slug: 'webshops',
    icon: ShoppingCart,
    intro: 'Webshops die vertrouwen uitstralen én verkopen. Met iDEAL, Mollie, slimme checkout en alles wat nodig is om direct te starten.',
    bullets: ['Optimale checkout flow', 'Koppeling met betaalsystemen', 'Voorraadbeheer & orders', 'Uitbreidbaar naar maatwerk'],
  },
  {
    title: 'Apps & Dashboards',
    slug: 'apps-dashboards',
    icon: LayoutDashboard,
    intro: 'Maatwerk tools, klantportalen en dashboards die processen automatiseren en inzicht geven. Voor bedrijven die meer nodig hebben dan een website.',
    bullets: ['Klantportalen op maat', 'Interne management tools', 'Realtime data dashboards', 'Rolgebaseerde toegang'],
  },
  {
    title: 'Automatisering',
    slug: 'automatisering',
    icon: Zap,
    intro: 'Koppelingen en slimme workflows die handmatig werk elimineren. Van n8n-automatiseringen tot volledige API koppelingen tussen je systemen.',
    bullets: ['API koppelingen', 'Workflow automatisering', 'CRM & email integraties', 'n8n en maatwerk scripts'],
  },
]

export default function ServiceCardsGrid() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {services.map((service, i) => {
        const Icon = service.icon
        return (
          <Reveal key={service.slug} delay={i * 70}>
            <Link
              href={`/diensten/${service.slug}`}
              className="group flex h-full flex-col rounded-2xl p-7 transition-all duration-400 hover:-translate-y-1"
              style={{
                background: 'rgba(12,10,22,0.85)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(20px)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = '1px solid rgba(249,115,22,0.22)'
                e.currentTarget.style.boxShadow = '0 20px 56px rgba(0,0,0,0.40), 0 0 40px rgba(249,115,22,0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, #f97316 30%, #ec4899 60%, #a78bfa 90%, transparent 100%)',
                  opacity: 0.28,
                  position: 'absolute',
                }}
              />

              <div className="mb-5 flex items-center gap-4">
                <span
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-white"
                  style={{ background: 'linear-gradient(135deg, #f97316 0%, #ec4899 50%, #a78bfa 100%)' }}
                >
                  <Icon size={20} strokeWidth={1.8} />
                </span>
                <h3 className="font-headline text-xl font-bold text-white/90 transition-colors group-hover:text-white">
                  {service.title}
                </h3>
              </div>

              <p className="text-sm leading-relaxed text-white/48 transition-colors group-hover:text-white/58">
                {service.intro}
              </p>

              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2 text-sm leading-relaxed text-white/40">
                    <CheckCircle size={13} className="mt-0.5 flex-shrink-0 text-orange-400/70" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-white/35 transition-colors group-hover:text-orange-400">
                Meer over {service.title.toLowerCase()}
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </Reveal>
        )
      })}
    </div>
  )
}
