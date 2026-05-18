import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Globe,
  ShoppingCart,
  LayoutDashboard,
  Zap,
  CheckCircle,
  Star,
} from 'lucide-react'
import WavePageHeader from '@/components/site/WavePageHeader'
import CTASection from '@/components/site/CTASection'
import Reveal from '@/components/ui/Reveal'

export const metadata: Metadata = {
  title: 'Diensten',
  description:
    'Websites, webshops, maatwerk apps, dashboards en automatisering. Persoonlijk gebouwd, geen standaard pakketten.',
}

const SERVICES = [
  {
    slug: 'websites',
    icon: Globe,
    title: 'Websites',
    subtitle: 'Professioneel & converteerbaar',
    description:
      'Websites die vertrouwen opbouwen en bezoekers omzetten naar klanten. Van compacte bedrijfssite tot complete multi-pagina strategie.',
    bullets: [
      'Conversiegerichte opbouw',
      'Razendsnel op mobiel',
      'SEO-vriendelijke structuur',
      'Eenvoudig te beheren',
    ],
    image: '/Projecten/rottevalle_mockup.png',
    accent: '#f97316',
    href: '/diensten/websites',
  },
  {
    slug: 'webshops',
    icon: ShoppingCart,
    title: 'Webshops',
    subtitle: 'Verkoop slimmer & meer',
    description:
      'Webshops waarbij producten, merkgevoel en gebruiksgemak samenkomen. Van eenvoudige catalogus tot volledig geoptimaliseerde shop.',
    bullets: [
      'Professionele productpresentatie',
      'Soepele checkout flow',
      'Koppelbaar met betaalsystemen',
      'Klaar om verder te groeien',
    ],
    image: '/Projecten/goldcenterdrachten_mockup.png',
    accent: '#ec4899',
    href: '/diensten/webshops',
  },
  {
    slug: 'apps-dashboards',
    icon: LayoutDashboard,
    title: 'Apps & dashboards',
    subtitle: 'Maatwerk systemen',
    description:
      'Voor processen die niet meer passen in losse tools of spreadsheets. Klantportalen, interne dashboards en digitale werkprocessen op maat.',
    bullets: [
      'Klantportalen op maat',
      'Realtime data dashboards',
      'Rolgebaseerde toegang',
      'Koppelbaar met bestaande tools',
    ],
    image: '/Projecten/jteq_mockup.png',
    accent: '#a78bfa',
    href: '/diensten/apps-dashboards',
  },
  {
    slug: 'automatisering',
    icon: Zap,
    title: 'Automatisering',
    subtitle: 'Minder handmatig werk',
    description:
      'Koppelingen en slimme flows die terugkerend werk beperken en je proces overzichtelijker maken. Van e-mail integraties tot complexe API koppelingen.',
    bullets: [
      'API koppelingen & webhooks',
      'Workflow automatisering',
      'CRM & e-mail integraties',
      'Data synchronisatie',
    ],
    image: '/Projecten/thuisbatterijen_friesland_mockup.png',
    accent: '#f97316',
    href: '/diensten/automatisering',
  },
]

const STATS = [
  { value: '20+', label: 'Projecten opgeleverd' },
  { value: '5.0', label: 'Google beoordeling' },
  { value: '100%', label: 'Maatwerk, nooit templates' },
  { value: '1 dag', label: 'Gemiddelde reactietijd' },
]

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Kennismaking & analyse',
    body: 'We beginnen met een vrijblijvend gesprek over je bedrijf, je doelen en waar je tegenaan loopt. Geen verkooppraat, gewoon een eerlijk gesprek.',
    accent: '#f97316',
  },
  {
    step: '02',
    title: 'Voorstel & aanpak',
    body: 'Je krijgt een concrete aanpak met duidelijke scope en eerlijke prijzen. Geen vage offertes of verborgen kosten.',
    accent: '#ec4899',
  },
  {
    step: '03',
    title: 'Bouw & feedback',
    body: 'Ik bouw iteratief. Je ziet tussentijdse resultaten en geeft feedback voordat alles vastligt. Kort contact, snel schakelen.',
    accent: '#a78bfa',
  },
  {
    step: '04',
    title: 'Live & doorgroeien',
    body: 'Na lancering ben ik beschikbaar voor uitbreidingen, optimalisaties en nieuwe functionaliteiten. Geen afsluiting, maar een begin.',
    accent: '#f97316',
  },
]

export default function DienstenPage() {
  return (
    <div>
      <WavePageHeader
        badge="Diensten"
        title="Digitale oplossingen die"
        titleHighlight="passen bij je bedrijf."
        subtitle="Geen standaard pakketten. Ik kijk naar wat past bij jouw situatie, je doelen en hoe je bedrijf werkt."
        heightClass="min-h-[56vh]"
      >
        <div className="flex flex-wrap gap-3">
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
      </WavePageHeader>

      {/* Stats strip */}
      <div className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 divide-x divide-slate-100 md:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="px-6 py-7 text-center">
                <div className="font-headline text-2xl font-extrabold tracking-[-0.03em] text-slate-900 md:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs font-medium text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services grid — Victron-stijl 2×2 */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="mb-14">
            <span className="overline-badge mb-4 inline-flex">Wat ik bouw</span>
            <h2
              className="max-w-2xl font-headline font-extrabold leading-[1.06] tracking-[-0.035em] text-slate-900"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
            >
              Vier richtingen,{' '}
              <span
                style={{
                  backgroundImage: 'linear-gradient(135deg, #f97316 0%, #ec4899 50%, #a78bfa 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                één aanpak.
              </span>
            </h2>
            <p className="mt-5 max-w-[50ch] text-[1.0625rem] leading-relaxed text-slate-500">
              Heldere keuzes voor bedrijven die professioneel zichtbaar willen zijn, online willen
              verkopen of slimmer willen werken.
            </p>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2">
            {SERVICES.map((service, i) => {
              const Icon = service.icon
              return (
                <Reveal key={service.slug} delay={i * 60}>
                  <Link
                    href={service.href}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-200 hover:shadow-lg"
                  >
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden bg-slate-50">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent" />
                      {/* Top gradient line on hover */}
                      <div
                        className="pointer-events-none absolute inset-x-0 top-0 h-0.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${service.accent}, transparent)`,
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-7">
                      <div className="mb-4 flex items-center gap-3">
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-xl"
                          style={{
                            background: `${service.accent}14`,
                            border: `1px solid ${service.accent}28`,
                          }}
                        >
                          <Icon size={18} style={{ color: service.accent }} />
                        </div>
                        <div>
                          <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-slate-400">
                            {service.subtitle}
                          </p>
                          <h3 className="font-headline text-xl font-extrabold leading-tight tracking-[-0.02em] text-slate-900">
                            {service.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-[1rem] leading-relaxed text-slate-500">{service.description}</p>

                      <ul className="mt-5 space-y-2.5">
                        {service.bullets.map((b) => (
                          <li key={b} className="flex items-center gap-2.5 text-[0.9375rem] text-slate-600">
                            <CheckCircle size={14} style={{ color: service.accent }} className="shrink-0" />
                            {b}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200 group-hover:translate-x-0.5" style={{ color: service.accent }}>
                        Meer over {service.title.toLowerCase()}
                        <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Hoe werkt samenwerken — donkere sectie */}
      <section className="relative overflow-hidden bg-[#06040c] py-20 lg:py-28">
        {/* Ambient blobs */}
        <div className="pointer-events-none absolute -top-20 left-[8%] h-72 w-72 rounded-full bg-orange-500/10 blur-[100px]" />
        <div className="pointer-events-none absolute bottom-0 right-[6%] h-64 w-64 rounded-full bg-violet-500/10 blur-[90px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="mb-14 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
            <div>
              <span className="overline-badge overline-badge-dark mb-5 inline-flex">Werkwijze</span>
              <h2
                className="max-w-2xl font-headline font-extrabold leading-[1.06] tracking-[-0.035em] text-white"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
              >
                Zo ziet samenwerken eruit.
              </h2>
            </div>
            <p className="max-w-xl text-[1.0625rem] leading-relaxed text-white/60 lg:justify-self-end">
              Geen lange trajecten of onduidelijke processen. Gewoon helder communiceren, snel schakelen en bouwen wat nodig is.
            </p>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map((step, i) => (
              <Reveal key={step.step} delay={i * 70}>
                <div
                  className="group relative overflow-hidden rounded-2xl p-6"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(16px)',
                  }}
                >
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-30"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${step.accent}, transparent)`,
                    }}
                  />
                  <div
                    className="mb-4 font-headline text-3xl font-extrabold leading-none tracking-[-0.04em] opacity-30"
                    style={{ color: step.accent }}
                  >
                    {step.step}
                  </div>
                  <h3 className="mb-3 font-headline text-lg font-bold leading-tight text-white/90">
                    {step.title}
                  </h3>
                  <p className="text-[0.9375rem] leading-relaxed text-white/50">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Klantreactie quote */}
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="grid items-center gap-10 lg:grid-cols-[0.72fr_1.28fr]">
              <div>
                <div className="mb-4 flex items-center gap-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} size={18} className="fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-slate-400">
                  Klantreactie
                </p>
                <p className="mt-3 text-[0.9375rem] font-semibold text-slate-600">
                  Jeremy Palsma
                </p>
              </div>
              <blockquote
                className="font-headline font-bold leading-snug tracking-[-0.01em] text-slate-900"
                style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}
              >
                &ldquo;Daan heeft voor ons in no time, binnen 2 weken, een complete professionele
                website gebouwd. Qua kwaliteit komt het resultaat verrassend dicht in de buurt van
                veel duurdere agencies.&rdquo;
              </blockquote>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </div>
  )
}
