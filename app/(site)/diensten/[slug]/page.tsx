import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  CheckCircle,
  Monitor,
  ShoppingCart,
  Star,
  LayoutDashboard,
  Zap,
  Workflow,
  Wrench,
  CreditCard,
  Layers,
  Activity,
  Settings,
  Users,
  Link as LinkIcon,
  Mail,
  RefreshCw,
  FileText,
  Code,
  type LucideIcon,
} from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import WavePageHeader from '@/components/site/WavePageHeader'
import CTASection from '@/components/site/CTASection'
import { finalTrustItems } from '@/lib/homepage-content'

type ServiceMeta = {
  title: string
  headline: string
  description: string
}

const SERVICE_META: Record<string, ServiceMeta> = {
  websites: {
    title: 'Websites',
    headline: 'Een sterke basis voor je bedrijf',
    description:
      'Een goede website moet meer doen dan er netjes uitzien. WebsUp bouwt websites die professioneel overkomen, duidelijk vertellen wat je doet en gericht zijn op contact, aanvragen en groei. Snel, logisch opgebouwd en afgestemd op jouw bedrijf.',
  },
  webshops: {
    title: 'Webshops',
    headline: 'Een webshop die verkoop makkelijker maakt',
    description:
      'Voor bedrijven die online willen verkopen met een sterke shop, slimme flow en ruimte om verder door te groeien.',
  },
  'apps-dashboards': {
    title: 'Apps & Dashboards',
    headline: 'Overzicht en grip met een systeem dat past',
    description:
      'Voor bedrijven die vastlopen in losse tools, handmatig werk of gebrek aan overzicht.',
  },
  automatisering: {
    title: 'Automatisering',
    headline: 'Minder handmatig werk, meer overzicht',
    description:
      'Slimme koppelingen en automatiseringen voor processen die sneller, duidelijker en betrouwbaarder kunnen.',
  },
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return Object.keys(SERVICE_META).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = SERVICE_META[slug]
  if (!service) return {}
  return { title: service.title, description: service.description }
}

/* ──────────────────────────────────────────────────────────
   SHARED BUILDING BLOCKS
   ────────────────────────────────────────────────────────── */

function ServiceHero({
  badge,
  title,
  highlight,
  subtitle,
}: {
  badge: string
  title: string
  highlight: string
  subtitle: string
}) {
  return (
    <WavePageHeader badge={badge} title={title} titleHighlight={highlight} subtitle={subtitle} heightClass="min-h-[56vh]">
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
        {finalTrustItems.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.label}
              className="flex items-center gap-3 border-l border-white/14 bg-white/[0.025] px-5 py-4 backdrop-blur-sm transition-colors hover:border-orange-400/60 hover:bg-white/[0.045]"
            >
              <Icon size={18} className="shrink-0 text-white/62" />
              <span className="text-[1rem] font-medium text-white/84">{item.label}</span>
            </div>
          )
        })}
      </div>
    </WavePageHeader>
  )
}

function StatsStrip({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="border-b border-slate-100 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 divide-x divide-slate-100 md:grid-cols-4">
          {stats.map((stat) => (
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
  )
}

function ShowcaseSection({
  badge,
  heading,
  body,
  bullets,
  image,
  imageAlt,
  reverse = false,
  bg = 'bg-white',
}: {
  badge: string
  heading: string
  body: string
  bullets: string[]
  image: string
  imageAlt: string
  reverse?: boolean
  bg?: string
}) {
  return (
    <section className={`${bg} py-20 lg:py-28`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-16 ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-xl shadow-slate-900/8">
              <div className="flex h-9 items-center gap-2 border-b border-slate-100 bg-slate-50/80 px-4">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                <span className="ml-3 text-[11px] font-medium text-slate-400">websup.nl</span>
              </div>
              <Image
                src={image}
                alt={imageAlt}
                width={760}
                height={500}
                className="h-auto w-full object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>

          <Reveal delay={60}>
            <span className="overline-badge mb-4 inline-flex">{badge}</span>
            <h2
              className="font-headline font-extrabold leading-[1.06] tracking-[-0.035em] text-slate-900"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}
            >
              {heading}
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-slate-500">{body}</p>
            <ul className="mt-7 space-y-3">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-base text-slate-700">
                  <CheckCircle size={16} className="mt-0.5 shrink-0 text-orange-500" />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function IncludesSection({
  badge,
  heading,
  items,
  image,
  imageAlt,
}: {
  badge: string
  heading: string
  items: string[]
  image: string
  imageAlt: string
}) {
  return (
    <section className="bg-[#f8f9fc] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mb-10">
          <span className="overline-badge mb-4 inline-flex">{badge}</span>
          <h2
            className="font-headline font-extrabold leading-[1.06] tracking-[-0.035em] text-slate-900"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}
          >
            {heading}
          </h2>
        </Reveal>

        <div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-900/6">
              <div className="flex h-9 items-center gap-2 border-b border-slate-100 bg-slate-50 px-4">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
              </div>
              <Image
                src={image}
                alt={imageAlt}
                width={680}
                height={440}
                className="h-auto w-full object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>

          <Reveal delay={60}>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {items.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <CheckCircle size={16} className="mt-0.5 shrink-0 text-orange-500" />
                  <span className="text-[0.9375rem] leading-relaxed text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function IconBlocksSection({
  badge,
  heading,
  blocks,
  accent = '#f97316',
}: {
  badge: string
  heading: string
  blocks: { icon: LucideIcon; title: string; text: string; accent?: string }[]
  accent?: string
}) {
  return (
    <section className="bg-[#f8f9fc] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mb-12">
          <span className="overline-badge mb-4 inline-flex">{badge}</span>
          <h2
            className="font-headline font-extrabold leading-[1.06] tracking-[-0.035em] text-slate-900"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}
          >
            {heading}
          </h2>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {blocks.map((b, i) => {
            const Icon = b.icon
            const color = b.accent ?? [accent, '#ec4899', '#a78bfa'][i % 3]
            return (
              <Reveal key={b.title} delay={i * 50}>
                <div className="group flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-200 hover:shadow-md">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{ background: `${color}14`, border: `1px solid ${color}28` }}
                  >
                    <Icon size={20} style={{ color }} />
                  </div>
                  <div>
                    <h3 className="font-headline text-[1.0625rem] font-bold text-slate-900">{b.title}</h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-slate-500">{b.text}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const STEP_ACCENTS = ['#f97316', '#ec4899', '#a78bfa', '#f97316']

function DarkProcessSection({
  badge,
  heading,
  steps,
}: {
  badge: string
  heading: string
  steps: { title: string; text: string }[]
}) {
  return (
    <section className="relative overflow-hidden bg-[#06040c] py-20 lg:py-28">
      <div className="pointer-events-none absolute -top-20 left-[8%] h-72 w-72 rounded-full bg-orange-500/8 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-[6%] h-64 w-64 rounded-full bg-violet-500/8 blur-[90px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mb-14">
          <span className="overline-badge overline-badge-dark mb-4 inline-flex">{badge}</span>
          <h2
            className="max-w-2xl font-headline font-extrabold leading-[1.06] tracking-[-0.035em] text-white"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}
          >
            {heading}
          </h2>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 70}>
              <div
                className="relative overflow-hidden rounded-2xl p-6"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-30"
                  style={{ background: `linear-gradient(90deg, transparent, ${STEP_ACCENTS[i]}, transparent)` }}
                />
                <div
                  className="mb-4 font-headline text-3xl font-extrabold leading-none tracking-[-0.04em] opacity-30"
                  style={{ color: STEP_ACCENTS[i] }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="mb-3 font-headline text-[1.0625rem] font-bold leading-tight text-white/90">
                  {step.title}
                </h3>
                <p className="text-[0.9375rem] leading-relaxed text-white/50">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ReviewQuote({ author, text }: { author: string; text: string }) {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="grid items-center gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <div className="mb-4 flex items-center gap-1">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={18} className="fill-orange-400 text-orange-400" />
                ))}
              </div>
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-slate-400">Klantreactie</p>
              <p className="mt-3 text-[0.9375rem] font-semibold text-slate-600">{author}</p>
            </div>
            <blockquote
              className="font-headline font-bold leading-snug tracking-[-0.01em] text-slate-900"
              style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}
            >
              &ldquo;{text}&rdquo;
            </blockquote>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

interface OtherServiceLink {
  slug: string
  title: string
  description: string
  icon: LucideIcon
}

function WhyAndOtherServices({
  whyHeading,
  whyIntro,
  whyPoints,
  others,
  otherIntro,
}: {
  whyHeading: string
  whyIntro: string
  whyPoints: string[]
  others: OtherServiceLink[]
  otherIntro: string
}) {
  return (
    <section className="bg-[#06040c] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="text-white">
              <span className="overline-badge overline-badge-dark mb-5 inline-flex">Waarom WebsUp</span>
              <h2
                className="font-headline font-extrabold leading-[1.1] tracking-[-0.02em]"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}
              >
                {whyHeading}
              </h2>
              <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-white/65">{whyIntro}</p>
              <ul className="mt-8 space-y-3">
                {whyPoints.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-base leading-relaxed text-white/80">
                    <ArrowRight size={18} className="mt-1 shrink-0 text-orange-400" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-white lg:border-l lg:border-white/10 lg:pl-12">
              <div className="text-xs font-bold uppercase tracking-[0.14em] text-orange-300">
                {otherIntro}
              </div>
              <div className="mt-6 divide-y divide-white/10 border-y border-white/10">
                {others.map((s) => {
                  const Icon = s.icon
                  return (
                    <Link
                      key={s.slug}
                      href={`/diensten/${s.slug}`}
                      className="group flex items-center gap-4 py-4 transition-colors hover:text-orange-300"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.06]">
                        <Icon size={16} className="text-white/50 transition-colors group-hover:text-orange-300" />
                      </div>
                      <div className="flex-1 pr-2">
                        <div className="text-sm font-semibold text-white">{s.title}</div>
                        <div className="mt-0.5 text-sm leading-relaxed text-white/50">{s.description}</div>
                      </div>
                      <ArrowRight size={14} className="shrink-0 text-white/30 transition-transform group-hover:translate-x-1 group-hover:text-white/70" />
                    </Link>
                  )
                })}
              </div>
              <Link
                href="/diensten"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-orange-300 transition-colors hover:text-orange-200"
              >
                Bekijk alle diensten <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────────────────
   WEBSITES
   ────────────────────────────────────────────────────────── */

function WebsitesServicePage() {
  const stats = [
    { value: '50+', label: 'Websites gebouwd' },
    { value: '5.0 ⭐', label: 'Google rating' },
    { value: '2–4 wkn', label: 'Gemiddelde bouwtijd' },
    { value: '100%', label: 'Maatwerk, nooit templates' },
  ]

  const includes = [
    'Maatwerk ontwerp dat bij je bedrijf past',
    'Volledig responsive op mobiel, tablet en desktop',
    'Duidelijke pagina-opbouw en contentstructuur',
    'Basis SEO en sterke technische prestaties',
    'Beheerbare content waar dat logisch is',
    'Koppelingen met formulieren, analytics of externe tools',
    'Veilige en stabiele hostingopzet',
    'Ruimte om later te groeien met webshop of dashboard',
  ]

  const steps = [
    { title: 'Kennismaking', text: 'We bespreken je bedrijf, je doelen en wat de website echt moet doen. Vrijblijvend, geen verkooppraat.' },
    { title: 'Voorstel en richting', text: 'Je krijgt een concrete aanpak met scope en eerlijke prijs. Geen vage offertes.' },
    { title: 'Ontwerp en bouw', text: 'De website wordt uitgewerkt met ruimte voor feedback tussendoor. Iteratief, snel schakelen.' },
    { title: 'Live en doorgroeien', text: 'Na lancering ben ik beschikbaar voor updates, optimalisaties en uitbreidingen.' },
  ]

  return (
    <div>
      <ServiceHero
        badge="Diensten · Websites"
        title="Een website die werkt voor jouw bedrijf"
        highlight="niet andersom."
        subtitle="Ik bouw websites die professioneel overkomen, duidelijk vertellen wat je doet en bezoekers aanzetten tot actie. Geen standaard thema's, maar opgebouwd rondom jouw situatie en doelen."
      />

      <StatsStrip stats={stats} />

      <ShowcaseSection
        badge="Waarom dit telt"
        heading="Eerste indruk bepaalt alles — ook online."
        body="Bezoekers beslissen in seconden of je professioneel bent, wat je doet en of ze bij jou willen zijn. Een goede website bouwt vertrouwen, vertelt je verhaal en stimuleert contact."
        bullets={[
          'Vertrouwen opbouwen bij nieuwe bezoekers',
          'Direct duidelijk maken wat je doet en voor wie',
          'Aanvragen, telefoontjes en contact stimuleren',
          'Professioneel gevonden worden via Google',
        ]}
        image="/Projecten/rottevalle_mockup.png"
        imageAlt="Rottevalle website — voorbeeldproject WebsUp"
      />

      <IncludesSection
        badge="Wat je krijgt"
        heading="Alles voor een sterke online basis."
        items={includes}
        image="/Projecten/verkeerschoolhaak_mockup.png"
        imageAlt="Verkeerschool Haak — voorbeeldproject WebsUp"
      />

      <DarkProcessSection
        badge="Werkwijze"
        heading="Duidelijk proces, korte lijnen."
        steps={steps}
      />

      <ReviewQuote
        author="Jeremy Palsma"
        text="Daan heeft voor ons in no time, binnen 2 weken, een complete professionele website gebouwd. Qua kwaliteit komt het resultaat verrassend dicht in de buurt van veel duurdere agencies."
      />

      <WhyAndOtherServices
        whyHeading="Persoonlijk contact, technisch sterk en praktisch ingestoken."
        whyIntro="Je schakelt direct met mij, degene die meedenkt en bouwt. Geen ruis, geen onnodige lagen. Wel een website die past bij jouw bedrijf en ruimte laat om later verder te bouwen."
        whyPoints={[
          'Direct contact met degene die meedenkt en bouwt',
          'Eerlijk advies over wat wel en niet nodig is',
          'Geen standaard pakket dat overal overheen wordt gelegd',
          'Ruimte om later door te bouwen als dat nodig is',
        ]}
        otherIntro="Later misschien meer nodig?"
        others={[
          { slug: 'webshops', title: 'Webshops', description: 'Voor bedrijven die online willen verkopen met een sterke shop en slimme flow.', icon: ShoppingCart },
          { slug: 'apps-dashboards', title: 'Apps & Dashboards', description: 'Voor intern overzicht, klantportalen of maatwerk tools.', icon: Workflow },
          { slug: 'automatisering', title: 'Automatisering', description: 'Voor terugkerend werk, koppelingen en processen die efficiënter kunnen.', icon: Wrench },
        ]}
      />

      <CTASection />
    </div>
  )
}

/* ──────────────────────────────────────────────────────────
   WEBSHOPS
   ────────────────────────────────────────────────────────── */

function WebshopsServicePage() {
  const stats = [
    { value: '10+', label: 'Webshops gebouwd' },
    { value: 'iDEAL', label: '& Mollie betaling' },
    { value: 'Shopify', label: 'of WooCommerce' },
    { value: '100%', label: 'Zelf te beheren' },
  ]

  const includes = [
    'WooCommerce of Shopify, wat bij je past',
    'iDEAL, Mollie, creditcard en meer betaalmethodes',
    'Productpagina’s die overtuigen',
    'Voorraadbeheer en orderverwerking',
    'Mobiel geoptimaliseerde checkout',
    'Koppeling met boekhouding of CRM waar nodig',
    'Basis SEO voor vindbaarheid in Google',
    'Ruimte om later uit te breiden',
  ]

  const steps = [
    { title: 'Kennismaking', text: 'We bespreken je producten, doelgroep en hoe je nu verkoopt of waarom je wil starten.' },
    { title: 'Voorstel en richting', text: 'Helder voorstel: welk platform past, hoe de structuur eruitziet en wat de investering is.' },
    { title: 'Bouw en inrichting', text: 'Webshop ingericht met jouw producten, huisstijl en betaalmethodes. Met feedback tussendoor.' },
    { title: 'Live en beheer', text: 'We gaan live. Ik leg je uit hoe je zelf producten beheert en bestellingen afhandelt.' },
  ]

  const reasons = [
    { icon: Users, title: 'Vertrouwen uitstralen', text: 'Bezoekers beslissen in seconden of ze afrekenen of afhaken. Professionele uitstraling is omzetbehoud.' },
    { icon: ShoppingCart, title: 'Simpele checkout, minder afhakers', text: 'Elke extra stap kost conversies. De checkout zo efficiënt mogelijk, zonder essentiële stappen te missen.' },
    { icon: Settings, title: 'Zelf beheerbaar', text: 'Producten toevoegen, prijzen aanpassen, bestellingen bijhouden — zonder mij te bellen.' },
  ]

  return (
    <div>
      <ServiceHero
        badge="Diensten · Webshops"
        title="Een webshop die vertrouwen uitstraalt"
        highlight="én verkoopt."
        subtitle="Ik bouw webshops die er niet alleen goed uitzien, maar ook echt werken. Logische checkout, iDEAL en Mollie ingebouwd, en een beheer dat je zelf kunt bijhouden zonder technische kennis."
      />

      <StatsStrip stats={stats} />

      <ShowcaseSection
        badge="Waarom dit telt"
        heading="Een webshop die bezoekers omzet in klanten."
        body="Mensen die op je webshop landen willen snel weten wat je verkoopt, wat het kost en hoe ze kunnen afrekenen. Elke onnodige stap is een afhaker. Ik bouw shops die dat begrijpen."
        bullets={[
          'Duidelijke productpresentatie die overtuigt',
          'Checkout die niet irriteert of afschrikt',
          'iDEAL, Mollie en creditcard standaard ingebouwd',
          'Beheerpaneel dat je zelf dagelijks kunt gebruiken',
        ]}
        image="/Projecten/goldcenterdrachten_mockup.png"
        imageAlt="Golf Center Drachten webshop — voorbeeldproject WebsUp"
        reverse
        bg="bg-white"
      />

      <IconBlocksSection
        badge="Waar ik op let"
        heading="Drie dingen die het verschil maken."
        blocks={reasons}
      />

      <IncludesSection
        badge="Wat je krijgt"
        heading="Alles wat je nodig hebt om online te verkopen."
        items={includes}
        image="/Projecten/de-kapper-drachten_mockup.png"
        imageAlt="De Kapper Drachten website — voorbeeldproject WebsUp"
      />

      <DarkProcessSection
        badge="Werkwijze"
        heading="Duidelijk proces, korte lijnen."
        steps={steps}
      />

      <ReviewQuote
        author="Nynke"
        text="Wij zijn super tevreden met onze nieuwe website. Het contact was fijn en snel, er werd goed geluisterd naar onze wensen."
      />

      <WhyAndOtherServices
        whyHeading="Persoonlijk contact en eerlijk advies over wat past."
        whyIntro="Niet elk bedrijf heeft Shopify nodig. Ik kijk naar jouw situatie, wat je verkoopt, hoe je werkt en wat je budget is, en adviseer wat het meest logisch is. Zonder voorkeur voor het duurste pakket."
        whyPoints={[
          'Direct persoonlijk contact',
          'Eerlijk over wat je wel en niet nodig hebt',
          'Zowel WooCommerce als Shopify',
          'Uitbreidbaar naar koppelingen en automatisering',
        ]}
        otherIntro="Wat past er nog meer bij jouw bedrijf?"
        others={[
          { slug: 'websites', title: 'Websites', description: 'Voor bedrijven die professioneel zichtbaar willen zijn.', icon: Monitor },
          { slug: 'apps-dashboards', title: 'Apps & Dashboards', description: 'Voor bedrijven die meer nodig hebben dan een webshop.', icon: LayoutDashboard },
          { slug: 'automatisering', title: 'Automatisering', description: 'Koppel je webshop aan je administratie of CRM.', icon: Zap },
        ]}
      />

      <CTASection />
    </div>
  )
}

/* ──────────────────────────────────────────────────────────
   APPS & DASHBOARDS
   ────────────────────────────────────────────────────────── */

function AppsServicePage() {
  const stats = [
    { value: 'Maatwerk', label: 'Altijd op maat gebouwd' },
    { value: 'Realtime', label: 'Data dashboards' },
    { value: 'Veilig', label: 'Rolgebaseerde toegang' },
    { value: '5.0 ⭐', label: 'Google rating' },
  ]

  const recognise = [
    'Je beheert klanten of projecten in Excel omdat je geen betere tool hebt gevonden',
    'Je team werkt met losse systemen die niet met elkaar praten',
    'Je wil klanten een eigen omgeving geven voor bestanden en statussen',
    'Je hebt realtime data nodig maar die zit verspreid over meerdere plekken',
  ]

  const blocks = [
    { icon: Users, title: 'Klantportalen', text: 'Een beveiligde omgeving waar klanten bestanden, offertes en statussen inzien. Minder mailen, meer overzicht.' },
    { icon: LayoutDashboard, title: 'Interne dashboards', text: 'Realtime inzicht in bestellingen, leads, projectstatussen. Wat voor jou belangrijk is, op één plek.' },
    { icon: Settings, title: 'Interne tools en workflows', text: 'Formulieren, goedkeuringsprocessen, planners. Niet van de plank, maar gebouwd voor hoe jouw bedrijf werkt.' },
    { icon: Code, title: 'Maatwerk webapplicaties', text: 'Voor complexere vraagstukken waarbij standaard software niet past. We starten met de kern en bouwen later uit.' },
  ]

  const steps = [
    { title: 'Kennismaking en analyse', text: 'Begrijpen hoe je nu werkt, waar je tegenaan loopt en wat de kern van het probleem is.' },
    { title: 'Schets en voorstel', text: 'Duidelijke schets van wat ik ga bouwen, hoe het werkt en wat het kost. Geen verrassingen achteraf.' },
    { title: 'Bouw in fasen', text: 'We starten met de kern en bouwen van daaruit. Snel iets bruikbaars, bijsturen op basis van praktijk.' },
    { title: 'Oplevering en beheer', text: 'Na oplevering leg ik uit hoe het systeem werkt. Uitbreidingen zijn altijd mogelijk.' },
  ]

  return (
    <div>
      <ServiceHero
        badge="Diensten · Apps & Dashboards"
        title="Meer grip op je bedrijf met"
        highlight="een systeem op maat."
        subtitle="Soms is een website niet genoeg. Voor bedrijven die vastlopen in losse tools, handmatig werk of gebrek aan overzicht bouw ik klantportalen, interne dashboards en maatwerk webapplicaties."
      />

      <StatsStrip stats={stats} />

      <ShowcaseSection
        badge="Wanneer is dit slim?"
        heading="Wanneer een website niet meer volstaat."
        body="Niet elk probleem lost een website op. Soms heb je iets nodig dat intern werkt — een plek waar jij of je team dagelijks mee werkt, met realtime data en de juiste toegangsrechten."
        bullets={recognise}
        image="/Projecten/jteq_mockup.png"
        imageAlt="JTEQ dashboard — voorbeeldproject WebsUp"
      />

      <IconBlocksSection
        badge="Wat ik bouw"
        heading="Van eenvoudig dashboard tot volledig klantportaal."
        blocks={blocks}
      />

      <DarkProcessSection
        badge="Werkwijze"
        heading="Stap voor stap, met overzicht."
        steps={steps}
      />

      <WhyAndOtherServices
        whyHeading="Technisch sterk, maar altijd praktisch ingestoken."
        whyIntro="Ik bouw geen systemen die indrukwekkend zijn maar onhandelbaar in gebruik. Het doel is altijd: iets dat elke dag prettig werkt en later verder kan meegroeien."
        whyPoints={[
          'Direct persoonlijk contact',
          'Eerlijk over complexiteit en kosten',
          'Gebouwd met Next.js, Supabase en bewezen technologie',
          'Uitbreidbaar naar koppelingen en automatisering',
        ]}
        otherIntro="Andere richtingen die hierop aansluiten:"
        others={[
          { slug: 'websites', title: 'Websites', description: 'Voor bedrijven die professioneel zichtbaar willen zijn.', icon: Monitor },
          { slug: 'webshops', title: 'Webshops', description: 'Voor bedrijven die online willen verkopen.', icon: ShoppingCart },
          { slug: 'automatisering', title: 'Automatisering', description: 'Koppel je systemen en automatiseer terugkerend werk.', icon: Zap },
        ]}
      />

      <CTASection />
    </div>
  )
}

/* ──────────────────────────────────────────────────────────
   AUTOMATISERING
   ────────────────────────────────────────────────────────── */

function AutomatiseringServicePage() {
  const stats = [
    { value: 'Uren', label: 'Tijdsbesparing per week' },
    { value: 'API + n8n', label: 'Workflows & koppelingen' },
    { value: 'Direct', label: 'Koppelbaar met jouw tools' },
    { value: '5.0 ⭐', label: 'Google rating' },
  ]

  const recognise = [
    'Je kopieert elke week handmatig gegevens van het ene systeem naar het andere',
    'Klanten krijgen niet automatisch een bevestiging na een aanvraag of bestelling',
    'Je facturen, leads en bestellingen zitten in drie systemen die niet communiceren',
    'Je team besteedt uren aan taken die eigenlijk vanzelf zouden moeten gaan',
  ]

  const blocks = [
    { icon: FileText, title: 'Formulier en lead koppelingen', text: 'Aanvragen van je website gaan automatisch naar CRM, email of Slack. Geen handmatig overtikken.' },
    { icon: Mail, title: 'Email en notificatie workflows', text: 'Automatische bevestigingen, opvolgingen of herinneringen op basis van acties van klanten of team.' },
    { icon: LinkIcon, title: 'Systeem koppelingen via API', text: 'Webshop, boekhouding, CRM praten met elkaar. Bestellingen en klantgegevens automatisch gesynchroniseerd.' },
    { icon: Workflow, title: 'n8n workflows', text: 'Met n8n bouw ik visuele workflows die complexe processen automatiseren, zonder dat alles maatwerk code wordt.' },
    { icon: RefreshCw, title: 'Data synchronisatie', text: 'Dezelfde data op de juiste plek in elk systeem. Geen dubbele invoer, geen fouten door kopieerwerk.' },
  ]

  const steps = [
    { title: 'Inventarisatie', text: 'We brengen in kaart welke processen handmatig verlopen en welke het meeste opleveren als ze automatisch gaan.' },
    { title: 'Voorstel', text: 'Helder voorstel: wat ik automatiseer, hoe het werkt, wat het kost. Inclusief tijdbesparingsinschatting.' },
    { title: 'Bouwen en testen', text: 'De automatisering wordt gebouwd en grondig getest voor hij live gaat.' },
    { title: 'Oplevering', text: 'Uitleg over hoe het werkt en wat je doet als er iets misgaat. Uitbreidingen altijd mogelijk.' },
  ]

  return (
    <div>
      <ServiceHero
        badge="Diensten · Automatisering"
        title="Minder handmatig werk,"
        highlight="meer tijd voor wat telt."
        subtitle="Ik koppel je tools, automatiseer terugkerende processen en zorg dat systemen samenwerken. Van simpele formulier koppelingen tot complete n8n-workflows."
      />

      <StatsStrip stats={stats} />

      <ShowcaseSection
        badge="Wanneer is dit slim?"
        heading="Herken je dit in je bedrijf?"
        body="Automatisering is niet voor elk bedrijf direct nodig — maar voor bedrijven die groeien wordt handmatig werk al snel een rem. Als je team meer tijd kwijt is aan administratie dan aan klanten, is dit het moment."
        bullets={recognise}
        image="/Projecten/thuisbatterijen_friesland_mockup.png"
        imageAlt="Thuisbatterijen Friesland — voorbeeldproject WebsUp"
        reverse
      />

      <IconBlocksSection
        badge="Wat ik automatiseer"
        heading="Praktische automatiseringen die direct verschil maken."
        blocks={blocks}
      />

      <DarkProcessSection
        badge="Werkwijze"
        heading="Helder traject, snel resultaat."
        steps={steps}
      />

      <WhyAndOtherServices
        whyHeading="Geen overkill, wel de juiste automatisering."
        whyIntro="Niet alles hoeft geautomatiseerd te worden. Ik kijk eerst naar wat het meeste oplevert en begin daar. Eenvoudige oplossingen gaan voor complexe. Tijdsbesparing, niet technische indruk maken."
        whyPoints={[
          'Eerlijk advies over wat wel en niet slim is',
          'Verstand van zowel web als systemen',
          "n8n, API's en maatwerk waar nodig",
          'Uitbreidbaar en onderhoudbaar',
        ]}
        otherIntro="Andere richtingen die hierop aansluiten:"
        others={[
          { slug: 'apps-dashboards', title: 'Apps & Dashboards', description: 'Maatwerk tools, klantportalen en dashboards.', icon: LayoutDashboard },
          { slug: 'webshops', title: 'Webshops', description: 'Webshops met betaalkoppelingen en orderverwerking.', icon: ShoppingCart },
          { slug: 'websites', title: 'Websites', description: 'Snelle, professionele websites met basis SEO.', icon: Monitor },
        ]}
      />

      <CTASection />
    </div>
  )
}

/* ──────────────────────────────────────────────────────────
   ROUTER
   ────────────────────────────────────────────────────────── */

export default async function DienstDetailPage({ params }: Props) {
  const { slug } = await params
  const service = SERVICE_META[slug]

  if (!service) notFound()

  if (slug === 'websites') return <WebsitesServicePage />
  if (slug === 'webshops') return <WebshopsServicePage />
  if (slug === 'apps-dashboards') return <AppsServicePage />
  if (slug === 'automatisering') return <AutomatiseringServicePage />

  notFound()
}
