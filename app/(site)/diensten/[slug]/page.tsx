import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import CTASection from '@/components/site/CTASection'
import WavePageHeader from '@/components/site/WavePageHeader'

// Statische service pagina's
const SERVICES: Record<string, {
  title: string
  headline: string
  description: string
  bullets: string[]
  extra: string[]
  color: string
  bg: string
}> = {
  websites: {
    title: 'Websites',
    headline: 'Een website die werkt als je beste verkoper.',
    description:
      'Moderne, snelle websites gebouwd op Next.js die niet alleen mooi zijn, maar ook gericht op resultaat. SEO-geoptimaliseerd, bliksemssnel en conversiegerichte.',
    bullets: [
      'Conversiegerichte designs op maat',
      'Next.js voor maximale snelheid & SEO',
      'Mobiel-first & volledig responsief',
      'Beheerbaar via admin dashboard',
      'Koppelingen met CRM & analytics',
      'SSL, CDN & edge hosting',
    ],
    extra: [
      'Wij werken niet met WordPress-templates. Elke website is custom gebouwd op Next.js met TypeScript — schaalbaar, snel en toekomstbestendig.',
      'Nadat je website live gaat ben ik bereikbaar voor aanpassingen, uitbreidingen en technische vragen.',
    ],
    color: 'text-orange-500',
    bg: 'bg-orange-50/60',
  },
  webshops: {
    title: 'Webshops',
    headline: 'Een webshop die converteert, niet alleen laat zien.',
    description:
      'Gebruiksvriendelijke webshops met slimme functies en optimale checkout flow. Gebouwd voor conversie, niet voor de showcase.',
    bullets: [
      'Geoptimaliseerde checkout flow',
      'Koppeling met Mollie, Stripe, iDeal',
      'Voorraadbeheer & orderbeheer',
      'Upsell & cross-sell logica',
      'Klantaccounts & bestelhistorie',
      'Automatische order e-mails',
    ],
    extra: [
      'Van simpele webshop tot complexe multi-product stores — we bouwen wat jouw business nodig heeft.',
      'Integraties met Exact Online, Lightspeed, Bol.com en andere platformen zijn mogelijk.',
    ],
    color: 'text-pink-500',
    bg: 'bg-pink-50/60',
  },
  'apps-dashboards': {
    title: 'Apps & Dashboards',
    headline: 'Maatwerk tools die jouw team slimmer laten werken.',
    description:
      'Klantportalen, interne tools en realtime dashboards op maat. Geen off-the-shelf software maar systemen die precies passen bij jouw processen.',
    bullets: [
      'Klantportalen met rolgebaseerde toegang',
      'Interne management dashboards',
      'Realtime data & analytics views',
      'Koppeling met externe systemen',
      'Mobile-friendly interfaces',
      'Supabase backend met RLS-beveiliging',
    ],
    extra: [
      'Gebouwd op het moderne Next.js + Supabase stack. Schaalbaar van 1 gebruiker tot duizenden tegelijk.',
      'Perfect voor installatiebedrijven, dienstverleners, SaaS-producten en interne tools.',
    ],
    color: 'text-violet-500',
    bg: 'bg-violet-50/60',
  },
  automatisering: {
    title: 'Automatisering',
    headline: 'Elimineer handmatig werk. Laat systemen voor je werken.',
    description:
      'Koppelingen en slimme workflows die repetitief werk elimineren en jouw bedrijf efficiënter maken. Geen data-entry meer, alleen strategie.',
    bullets: [
      'API-koppelingen & webhooks',
      'Workflow automatisering met n8n',
      'CRM & e-mail integraties',
      'Data synchronisatie tussen systemen',
      'Automatische rapportages',
      'Fout-detectie & alerting',
    ],
    extra: [
      'Met n8n bouwen we complexe multi-stap workflows die draaien op jouw eigen server of in de cloud.',
      'Integraties met HubSpot, Mailchimp, Slack, WhatsApp Business, Google Sheets en honderden andere tools.',
    ],
    color: 'text-orange-500',
    bg: 'bg-orange-50/60',
  },
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return Object.keys(SERVICES).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = SERVICES[slug]
  if (!service) return {}
  return {
    title: service.title,
    description: service.description,
  }
}

export default async function DienstDetailPage({ params }: Props) {
  const { slug } = await params
  const service = SERVICES[slug]
  if (!service) notFound()

  const otherServices = Object.entries(SERVICES).filter(([s]) => s !== slug)

  return (
    <div>
      <WavePageHeader
        badge="Diensten"
        title={service.headline}
        subtitle={service.description}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-slate-900 font-semibold text-sm px-6 py-3 rounded-full hover:-translate-y-px hover:bg-white/90 transition-all shadow-sm"
          >
            Gratis adviesgesprek <ArrowRight size={14} />
          </Link>
          <Link
            href="/diensten"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            Alle diensten
          </Link>
        </div>
      </WavePageHeader>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-start">
          <Reveal>
            <h2 className="font-headline text-3xl font-bold text-slate-900 mb-8">
              Wat je krijgt
            </h2>
            <ul className="space-y-4">
              {service.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-orange-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={80}>
            <div className="space-y-6">
              {service.extra.map((text, i) => (
                <div key={i} className={`p-6 rounded-2xl ${service.bg}`}>
                  <p className="text-slate-700 leading-relaxed">{text}</p>
                </div>
              ))}

              {/* Process mini */}
              <div className="p-6 rounded-2xl bg-slate-900 text-white">
                <h3 className="font-headline font-bold mb-4 text-sm uppercase tracking-wider text-orange-400">
                  Hoe het werkt
                </h3>
                <ol className="space-y-3">
                  {['Gratis kennismakingsgesprek', 'Voorstel & scope', 'Bouw met feedback', 'Live & support'].map((step, i) => (
                    <li key={step} className="flex items-center gap-3 text-sm">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 text-white" style={{ background: 'linear-gradient(135deg,#f97316,#ec4899)' }}>
                        {i + 1}
                      </span>
                      <span className="text-slate-300">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Andere diensten */}
      <section className="py-16 bg-slate-50">
        <Reveal className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="font-headline text-2xl font-bold text-slate-900 mb-8">
            Andere diensten
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherServices.map(([s, svc]) => (
              <Link
                key={s}
                href={`/diensten/${s}`}
                className="group p-6 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all"
              >
                <div className="font-headline font-bold text-slate-900 mb-2 group-hover:text-orange-500 transition-colors">
                  {svc.title}
                </div>
                <p className="text-sm text-slate-500 line-clamp-2">{svc.description}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-orange-500">
                  Meer info <ArrowRight size={12} />
                </div>
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      <CTASection />
    </div>
  )
}
