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
  TrendingUp,
  LayoutPanelTop,
  type LucideIcon,
} from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import WavePageHeader from '@/components/site/WavePageHeader'
import CTASection from '@/components/site/CTASection'
import { GlassCard } from '@/components/site/GlassCard'

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

const websiteResults = [
  {
    title: 'Vertrouwen opbouwen',
    text: 'Je website is vaak de eerste indruk. Die moet direct duidelijk maken dat je professioneel werkt en serieus genomen wilt worden.',
  },
  {
    title: 'Duidelijk vertellen wat je doet',
    text: 'Bezoekers moeten snel begrijpen wie je bent, wat je doet en waarom ze bij jou moeten zijn — zonder te moeten zoeken.',
  },
  {
    title: 'Contact en aanvragen stimuleren',
    text: 'Een goede website helpt mensen de volgende stap te zetten. Bellen, mailen, aanvragen of kennismaken.',
  },
]

const websiteIncludes = [
  'Maatwerk ontwerp of een sterke visuele richting die bij je bedrijf past',
  'Volledig responsive op mobiel, tablet en desktop',
  'Duidelijke pagina opbouw en contentstructuur',
  'Basis SEO en sterke technische prestaties',
  'Beheerbare content waar dat logisch is',
  'Koppelingen met formulieren, analytics of externe tools',
  'Veilige en stabiele hostingopzet',
  'Ruimte om later uit te breiden met webshop, dashboard of maatwerk',
]

const websiteSteps = [
  {
    title: 'Kennismaking',
    text: 'We bespreken je bedrijf, je doelen en wat de website echt moet doen.',
  },
  {
    title: 'Voorstel en richting',
    text: 'Je krijgt een duidelijke opzet of visuele richting zodat je weet waar we naartoe werken.',
  },
  {
    title: 'Ontwerp en bouw',
    text: 'De website wordt uitgewerkt met ruimte voor feedback tussendoor.',
  },
  {
    title: 'Livegang',
    text: 'Na oplevering gaan we live. De website kan later altijd verder meegroeien.',
  },
]

const websiteWhy = [
  'Direct contact met degene die meedenkt en bouwt',
  'Eerlijk advies over wat wel en niet nodig is',
  'Geen standaard pakket dat overal overheen wordt gelegd',
  'Ruimte om later door te bouwen als dat nodig is',
]

const serviceProgression = [
  {
    slug: 'webshops',
    title: 'Webshops',
    description: 'Voor bedrijven die online willen verkopen met een sterke shop en slimme flow.',
    icon: ShoppingCart,
  },
  {
    slug: 'apps-dashboards',
    title: 'Apps & Dashboards',
    description: 'Voor intern overzicht, klantportalen of maatwerk tools die processen slimmer maken.',
    icon: Workflow,
  },
  {
    slug: 'automatisering',
    title: 'Automatisering',
    description: 'Voor terugkerend werk, koppelingen en processen die efficienter kunnen.',
    icon: Wrench,
  },
]

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

  return {
    title: service.title,
    description: service.description,
  }
}

function WebsitesServicePage() {
  return (
    <div>
      <WavePageHeader
        badge="Diensten · Websites"
        title="Een website die werkt voor jouw bedrijf —"
        titleHighlight="niet andersom."
        subtitle="Ik bouw websites die professioneel overkomen, duidelijk vertellen wat je doet en bezoekers aanzetten tot actie. Geen standaard thema's, maar opgebouwd rondom jouw situatie en doelen."
      >
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/contact" className="btn-brand-gradient">
            Plan een kennismaking
            <ArrowRight size={14} />
          </Link>
          <Link
            href="/gratis-ontwerp"
            className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:border-white/22 hover:bg-white/10"
          >
            Vraag gratis ontwerp aan
          </Link>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            { icon: Star, label: 'Professionele uitstraling', color: 'text-orange-400' },
            { icon: LayoutPanelTop, label: 'Duidelijke structuur', color: 'text-pink-400' },
            { icon: TrendingUp, label: 'Uitbreidbaar', color: 'text-violet-300' },
          ].map(({ icon: Icon, label, color }) => (
            <GlassCard key={label} padding="px-4 py-3" className="flex items-center gap-2.5">
              <Icon size={16} className={`flex-shrink-0 ${color}`} />
              <span className="text-sm text-white/85 font-medium">{label}</span>
            </GlassCard>
          ))}
        </div>
      </WavePageHeader>

      {/* Waarom een goede website telt */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Reveal>
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-orange-500">
              Waarom een goede website telt
            </span>
            <h2 className="mt-3 font-headline text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] text-slate-900 md:text-4xl lg:text-5xl">
              Een website die duidelijk werkt
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Voor veel bedrijven is de website de eerste echte indruk. Bezoekers beslissen in seconden of je professioneel bent, wat je doet en of ze bij jou willen zijn.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Dat vraagt om meer dan een mooi design. Het vraagt om een duidelijke structuur, een logische opbouw en content die direct antwoord geeft op wat iemand zoekt.
            </p>

            <div className="mt-10 space-y-7">
              {websiteResults.map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <ArrowRight size={20} className="mt-1 flex-shrink-0 text-orange-500" />
                  <div>
                    <h3 className="font-headline text-lg font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-1.5 text-base leading-relaxed text-slate-600">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Wat je krijgt */}
      <section className="bg-slate-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="mb-12 max-w-3xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-orange-500">
              Wat je krijgt
            </span>
            <h2 className="mt-3 font-headline text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] text-slate-900 md:text-4xl">
              Alles wat nodig is voor een sterke online basis
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-500">
              Geen overvolle lijst met loze features, maar precies wat nodig is om je website professioneel, snel en toekomstbestendig neer te zetten.
            </p>
          </Reveal>

          <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
            <div className="relative min-h-[22rem] overflow-hidden rounded-2xl bg-white">
              <Image
                src="/Projecten/thuisbatterijen_friesland_mockup.png"
                alt="Voorbeeldproject — Thuisbatterijen Friesland"
                fill
                className="object-contain p-6"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="space-y-3">
              {websiteIncludes.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
                  <CheckCircle size={16} className="mt-0.5 flex-shrink-0 text-orange-500" />
                  <span className="text-sm leading-relaxed text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Werkwijze */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Reveal className="mb-12 max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-orange-500">
              Werkwijze
            </span>
            <h2 className="mt-3 font-headline text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] text-slate-900 md:text-4xl lg:text-5xl">
              Duidelijk proces, korte lijnen
            </h2>
          </Reveal>

          <ol className="space-y-7">
            {websiteSteps.map((step, i) => (
              <Reveal key={step.title} delay={i * 70}>
                <li className="flex items-start gap-5">
                  <span className="font-headline flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-orange-500 text-base font-bold text-orange-500">
                    {i + 1}
                  </span>
                  <div className="pt-1">
                    <h3 className="font-headline text-xl font-bold text-slate-900">{step.title}</h3>
                    <p className="mt-2 text-base leading-relaxed text-slate-600">{step.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Review */}
      <section className="bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <Reveal>
            <div className="mb-5 flex items-center justify-center gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} size={16} className="fill-orange-400 text-orange-400" />
              ))}
            </div>
            <blockquote className="font-headline text-xl font-semibold leading-snug text-slate-900 md:text-2xl">
              &ldquo;Daan heeft voor ons in no time een complete professionele website gebouwd. Qua kwaliteit komt het resultaat verrassend dicht in de buurt van veel duurdere agencies.&rdquo;
            </blockquote>
            <p className="mt-5 text-sm font-semibold text-slate-500">— Jeremy Palsma</p>
          </Reveal>
        </div>
      </section>

      {/* Waarom WebsUp */}
      <section className="bg-[#06040c] py-20 lg:py-28">
        <div className="absolute inset-x-0 hidden" aria-hidden />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
              <div className="text-white">
                <span className="overline-badge overline-badge-dark mb-5">Waarom WebsUp</span>
                <h2 className="font-headline text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] md:text-4xl lg:text-5xl">
                  Persoonlijk contact, technisch sterk en praktisch ingestoken
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/65">
                  Je schakelt direct met mij — degene die meedenkt en bouwt. Geen ruis, geen onnodige lagen. Wel een website die past bij jouw bedrijf en ruimte laat om later verder te bouwen.
                </p>

                <ul className="mt-8 space-y-3">
                  {websiteWhy.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-base leading-relaxed text-white/80">
                      <ArrowRight size={18} className="mt-1 flex-shrink-0 text-orange-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-white lg:border-l lg:border-white/10 lg:pl-12">
                <div className="text-xs font-bold uppercase tracking-[0.14em] text-orange-300">
                  Daarna eventueel verder bouwen
                </div>
                <h3 className="mt-4 font-headline text-2xl font-bold text-white md:text-3xl">
                  Van website naar digitaal systeem
                </h3>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-white/65">
                  Heeft je bedrijf later meer nodig, dan kan WebsUp ook verder helpen met webshops, dashboards, portals, koppelingen en automatisering.
                </p>

                <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
                  {serviceProgression.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/diensten/${service.slug}`}
                      className="group flex items-center justify-between py-4 transition-colors hover:text-orange-300"
                    >
                      <div className="pr-4">
                        <div className="text-sm font-semibold text-white">{service.title}</div>
                        <div className="mt-1 text-sm leading-relaxed text-white/55">{service.description}</div>
                      </div>
                      <ArrowRight size={14} className="flex-shrink-0 text-white/35 transition-transform group-hover:translate-x-1 group-hover:text-white/70" />
                    </Link>
                  ))}
                </div>

                <Link
                  href="/diensten"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-orange-300 transition-colors hover:text-orange-200"
                >
                  Bekijk alle diensten
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </div>
  )
}

/* ──────────────────────────────────────────────────────────
   Shared building blocks for service detail pages
   ────────────────────────────────────────────────────────── */

interface OtherServiceLink {
  slug: string
  title: string
  description: string
  icon: LucideIcon
}

function ServiceHero({
  badge,
  title,
  highlight,
  subtitle,
  badges,
}: {
  badge: string
  title: string
  highlight: string
  subtitle: string
  badges: { icon: LucideIcon; label: string }[]
}) {
  return (
    <WavePageHeader badge={badge} title={title} titleHighlight={highlight} subtitle={subtitle}>
      <div className="flex flex-wrap items-center gap-3">
        <Link href="/contact" className="btn-brand-gradient">
          Plan een kennismaking
          <ArrowRight size={14} />
        </Link>
        <Link
          href="/gratis-ontwerp"
          className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:border-white/22 hover:bg-white/10"
        >
          Vraag gratis ontwerp aan
        </Link>
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {badges.map(({ icon: Icon, label }, i) => {
          const colors = ['text-orange-400', 'text-pink-400', 'text-violet-300']
          return (
            <GlassCard key={label} padding="px-4 py-3" className="flex items-center gap-2.5">
              <Icon size={16} className={`flex-shrink-0 ${colors[i % 3]}`} />
              <span className="text-sm text-white/85 font-medium">{label}</span>
            </GlassCard>
          )
        })}
      </div>
    </WavePageHeader>
  )
}

function NumberedSteps({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <ol className="space-y-7">
      {steps.map((step, i) => (
        <Reveal key={step.title} delay={i * 70}>
          <li className="flex items-start gap-5">
            <span className="font-headline flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-orange-500 text-base font-bold text-orange-500">
              {i + 1}
            </span>
            <div className="pt-1">
              <h3 className="font-headline text-xl font-bold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-slate-600">{step.text}</p>
            </div>
          </li>
        </Reveal>
      ))}
    </ol>
  )
}

function ReviewQuote({ author, text }: { author: string; text: string }) {
  return (
    <section className="bg-slate-50 py-16 lg:py-20">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
        <Reveal>
          <div className="mb-5 flex items-center justify-center gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} size={16} className="fill-orange-400 text-orange-400" />
            ))}
          </div>
          <blockquote className="font-headline text-xl font-semibold leading-snug text-slate-900 md:text-2xl">
            &ldquo;{text}&rdquo;
          </blockquote>
          <p className="mt-5 text-sm font-semibold text-slate-500">— {author}</p>
        </Reveal>
      </div>
    </section>
  )
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
              <span className="overline-badge overline-badge-dark mb-5">Waarom WebsUp</span>
              <h2 className="font-headline text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] md:text-4xl lg:text-5xl">
                {whyHeading}
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/65">{whyIntro}</p>
              <ul className="mt-8 space-y-3">
                {whyPoints.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-base leading-relaxed text-white/80">
                    <ArrowRight size={18} className="mt-1 flex-shrink-0 text-orange-400" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-white lg:border-l lg:border-white/10 lg:pl-12">
              <div className="text-xs font-bold uppercase tracking-[0.14em] text-orange-300">
                Andere diensten
              </div>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-white/65">{otherIntro}</p>

              <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
                {others.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/diensten/${s.slug}`}
                    className="group flex items-center justify-between py-4 transition-colors hover:text-orange-300"
                  >
                    <div className="pr-4">
                      <div className="text-sm font-semibold text-white">{s.title}</div>
                      <div className="mt-1 text-sm leading-relaxed text-white/55">{s.description}</div>
                    </div>
                    <ArrowRight size={14} className="flex-shrink-0 text-white/35 transition-transform group-hover:translate-x-1 group-hover:text-white/70" />
                  </Link>
                ))}
              </div>

              <Link
                href="/diensten"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-orange-300 transition-colors hover:text-orange-200"
              >
                Bekijk alle diensten
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────────────────
   WEBSHOPS
   ────────────────────────────────────────────────────────── */

const webshopReasons = [
  {
    title: 'Vertrouwen uitstralen',
    text: 'Bezoekers beslissen in seconden of ze afrekenen of afhaken. Een professionele uitstraling is geen luxe — het is omzetbehoud.',
  },
  {
    title: 'Simpele checkout, minder afhakers',
    text: 'Elke extra stap in het bestelproces kost je conversies. Ik zet de checkout zo efficiënt mogelijk in zonder essentiële stappen te missen.',
  },
  {
    title: 'Zelf beheerbaar',
    text: 'Je wil producten kunnen toevoegen, prijzen aanpassen en bestellingen bijhouden zonder mij te bellen. Dat regel ik.',
  },
]

const webshopIncludes = [
  'WooCommerce of Shopify — afhankelijk van wat bij je past',
  'iDEAL, Mollie, creditcard en andere betaalmethodes',
  'Productpagina’s die overtuigen',
  'Voorraadbeheer en orderverwerking',
  'Mobiel geoptimaliseerde checkout',
  'Koppeling met boekhouding of CRM waar nodig',
  'Basis SEO voor vindbaarheid in Google',
  'Ruimte om later uit te breiden',
]

const webshopSteps = [
  { title: 'Kennismaking', text: 'We bespreken je producten, je doelgroep en hoe je nu verkoopt — of waarom je wil starten.' },
  { title: 'Voorstel en richting', text: 'Je krijgt een heldere opzet: welk platform past, hoe de structuur eruitziet en wat de investering is.' },
  { title: 'Bouw en inrichting', text: 'De webshop wordt ingericht met jouw producten, huisstijl en betaalmethodes. Met ruimte voor feedback tussendoor.' },
  { title: 'Livegang', text: 'We gaan live. Ik leg je uit hoe je zelf producten beheert en bestellingen afhandelt.' },
]

function WebshopsServicePage() {
  return (
    <div>
      <ServiceHero
        badge="Diensten · Webshops"
        title="Een webshop die vertrouwen uitstraalt"
        highlight="én verkoopt."
        subtitle="Ik bouw webshops die er niet alleen goed uitzien, maar ook echt werken. Logische checkout, iDEAL en Mollie ingebouwd, en een beheer dat je zelf kunt bijhouden zonder technische kennis."
        badges={[
          { icon: ShoppingCart, label: 'WooCommerce of Shopify' },
          { icon: CreditCard, label: 'iDEAL & Mollie' },
          { icon: Layers, label: 'Uitbreidbaar' },
        ]}
      />

      {/* Waarom een goede webshop */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Reveal>
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-orange-500">Waarom dit telt</span>
            <h2 className="mt-3 font-headline text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] text-slate-900 md:text-4xl lg:text-5xl">
              Een webshop die bezoekers omzet in klanten
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Mensen die op je webshop landen, willen snel weten wat je verkoopt, wat het kost en hoe ze kunnen afrekenen. Elke onnodige stap is een afhaker.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Ik bouw webshops die dat begrijpen. Duidelijke productpresentatie, een checkout die niet irriteert, en een beheerpaneel dat je zelf kunt gebruiken.
            </p>

            <div className="mt-10 space-y-7">
              {webshopReasons.map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <ArrowRight size={20} className="mt-1 flex-shrink-0 text-orange-500" />
                  <div>
                    <h3 className="font-headline text-lg font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-1.5 text-base leading-relaxed text-slate-600">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Wat je krijgt */}
      <section className="bg-slate-50 py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Reveal className="mb-10 max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-orange-500">Wat je krijgt</span>
            <h2 className="mt-3 font-headline text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] text-slate-900 md:text-4xl">
              Alles wat je nodig hebt om online te verkopen
            </h2>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2">
            {webshopIncludes.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
                <CheckCircle size={16} className="mt-0.5 flex-shrink-0 text-orange-500" />
                <span className="text-sm leading-relaxed text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Werkwijze */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Reveal className="mb-12 max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-orange-500">Werkwijze</span>
            <h2 className="mt-3 font-headline text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] text-slate-900 md:text-4xl lg:text-5xl">
              Duidelijk proces, korte lijnen
            </h2>
          </Reveal>
          <NumberedSteps steps={webshopSteps} />
        </div>
      </section>

      <ReviewQuote
        author="Nynke"
        text="Wij zijn super tevreden met onze nieuwe website. Het contact was fijn en snel, er werd goed geluisterd naar onze wensen."
      />

      <WhyAndOtherServices
        whyHeading="Persoonlijk contact en eerlijk advies over wat past"
        whyIntro="Niet elk bedrijf heeft Shopify nodig. Niet elk bedrijf is gebaat bij WooCommerce. Ik kijk naar jouw situatie — wat je verkoopt, hoe je werkt en wat je budget is — en adviseer wat het meest logisch is. Zonder voorkeur voor het duurste pakket."
        whyPoints={[
          'Direct persoonlijk contact',
          'Eerlijk over wat je wel en niet nodig hebt',
          'Zowel WooCommerce als Shopify',
          'Uitbreidbaar naar koppelingen en automatisering',
        ]}
        otherIntro="Wat past er nog meer bij jouw bedrijf?"
        others={[
          { slug: 'websites', title: 'Websites', description: 'Voor bedrijven die professioneel zichtbaar willen zijn en aanvragen willen genereren.', icon: Monitor },
          { slug: 'apps-dashboards', title: 'Apps & Dashboards', description: 'Voor bedrijven die meer nodig hebben dan een website of webshop.', icon: LayoutDashboard },
          { slug: 'automatisering', title: 'Automatisering', description: 'Koppel je webshop aan je administratie, CRM of andere systemen.', icon: Zap },
        ]}
      />

      <CTASection />
    </div>
  )
}

/* ──────────────────────────────────────────────────────────
   APPS & DASHBOARDS
   ────────────────────────────────────────────────────────── */

const appsRecognise = [
  'Je beheert klanten of projecten in Excel omdat je geen betere tool hebt gevonden',
  'Je team werkt met losse systemen die niet met elkaar praten',
  'Je wil klanten een eigen omgeving geven om bestanden te delen of statussen te bekijken',
  'Je hebt realtime data nodig maar die zit verspreid over meerdere plekken',
]

const appsBlocks = [
  {
    title: 'Klantportalen',
    text: 'Een beveiligde omgeving waar jouw klanten bestanden, offertes, statussen of facturen kunnen inzien. Minder heen-en-weer mailen, meer overzicht voor iedereen.',
  },
  {
    title: 'Interne dashboards',
    text: 'Realtime inzicht in je bedrijfsdata. Bestellingen, leads, projectstatussen, productiviteit — wat voor jou belangrijk is, zichtbaar op één plek.',
  },
  {
    title: 'Interne tools en workflows',
    text: 'Formulieren, goedkeuringsprocessen, planners of andere tools die specifiek passen bij hoe jouw bedrijf werkt. Niet van de plank, maar gebouwd voor jouw situatie.',
  },
  {
    title: 'Maatwerk webapplicaties',
    text: 'Voor complexere vraagstukken waarbij standaard software niet past. We beginnen met de kern en bouwen later uit.',
  },
]

const appsSteps = [
  { title: 'Kennismaking en analyse', text: 'We beginnen met begrijpen hoe je nu werkt, waar je tegenaan loopt en wat de kern van het probleem is.' },
  { title: 'Schets en voorstel', text: 'Ik maak een duidelijke schets van wat ik ga bouwen, hoe het werkt en wat het kost. Geen verrassingen achteraf.' },
  { title: 'Bouw in fasen', text: 'We starten met de kern en bouwen van daaruit verder. Zo heb je snel iets bruikbaars en kunnen we bijsturen op basis van praktijk.' },
  { title: 'Oplevering en beheer', text: 'Na oplevering leg ik uit hoe het systeem werkt. Uitbreidingen zijn altijd mogelijk.' },
]

function AppsServicePage() {
  return (
    <div>
      <ServiceHero
        badge="Diensten · Apps & Dashboards"
        title="Meer grip op je bedrijf met"
        highlight="een systeem op maat."
        subtitle="Soms is een website niet genoeg. Voor bedrijven die vastlopen in losse tools, handmatig werk of gebrek aan overzicht bouw ik klantportalen, interne dashboards en maatwerk webapplicaties."
        badges={[
          { icon: Users, label: 'Klantportalen' },
          { icon: Settings, label: 'Interne tools' },
          { icon: Activity, label: 'Realtime dashboards' },
        ]}
      />

      {/* Wanneer heb je dit nodig */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Reveal>
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-orange-500">Wanneer is dit slim?</span>
            <h2 className="mt-3 font-headline text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] text-slate-900 md:text-4xl lg:text-5xl">
              Wanneer een website niet meer volstaat
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Niet elk probleem lost een website op. Soms heb je iets nodig dat intern werkt — een plek waar jij of je team dagelijks mee werkt.
            </p>
            <p className="mt-4 text-lg font-semibold text-slate-900">Herken je dit?</p>

            <ul className="mt-6 space-y-4">
              {appsRecognise.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base leading-relaxed text-slate-700">
                  <ArrowRight size={18} className="mt-1 flex-shrink-0 text-orange-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-lg leading-relaxed text-slate-600">
              Dan is een maatwerk applicatie of dashboard vaak de slimste investering.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Wat ik bouw */}
      <section className="bg-slate-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="mb-12 max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-orange-500">Wat ik bouw</span>
            <h2 className="mt-3 font-headline text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] text-slate-900 md:text-4xl">
              Van eenvoudig dashboard tot volledig klantportaal
            </h2>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2">
            {appsBlocks.map((b) => (
              <div key={b.title} className="rounded-2xl border border-slate-200 bg-white p-7">
                <h3 className="font-headline text-xl font-bold text-slate-900">{b.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Werkwijze */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Reveal className="mb-12 max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-orange-500">Werkwijze</span>
            <h2 className="mt-3 font-headline text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] text-slate-900 md:text-4xl lg:text-5xl">
              Stap voor stap, met overzicht
            </h2>
          </Reveal>
          <NumberedSteps steps={appsSteps} />
        </div>
      </section>

      <WhyAndOtherServices
        whyHeading="Technisch sterk, maar altijd praktisch ingestoken"
        whyIntro="Ik bouw geen systemen die indrukwekkend zijn om te laten zien maar onhandelbaar zijn in gebruik. Het doel is altijd: iets dat elke dag prettig werkt en later verder kan meegroeien."
        whyPoints={[
          'Direct persoonlijk contact',
          'Eerlijk over complexiteit en kosten',
          'Gebouwd met Next.js, Supabase en bewezen technologie',
          'Uitbreidbaar naar koppelingen en automatisering',
        ]}
        otherIntro="Andere richtingen die hierop kunnen aansluiten:"
        others={[
          { slug: 'websites', title: 'Websites', description: 'Voor bedrijven die professioneel zichtbaar willen zijn.', icon: Monitor },
          { slug: 'webshops', title: 'Webshops', description: 'Voor bedrijven die online willen verkopen met een sterke shop.', icon: ShoppingCart },
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

const automationRecognise = [
  'Je kopieert elke week handmatig gegevens van het ene systeem naar het andere',
  'Klanten krijgen niet automatisch een bevestiging na een aanvraag of bestelling',
  'Je facturen, leads of bestellingen zitten in drie verschillende systemen die niet met elkaar praten',
  'Je team besteedt uren aan taken die eigenlijk vanzelf zouden moeten gaan',
]

const automationBlocks = [
  {
    title: 'Formulier- en lead-koppelingen',
    text: 'Aanvragen van je website gaan automatisch naar je CRM, e-mail of Slack. Geen handmatig overtikken meer.',
  },
  {
    title: 'E-mail en notificatie workflows',
    text: 'Automatische bevestigingen, follow-ups of herinneringen op basis van acties die klanten of je team uitvoert.',
  },
  {
    title: 'Systeem-koppelingen via API',
    text: 'Je webshop, boekhouding, CRM en andere tools praten met elkaar. Bestellingen, facturen en klantgegevens worden automatisch gesynchroniseerd.',
  },
  {
    title: 'n8n workflows',
    text: 'Met n8n bouw ik visuele workflows die complexe processen automatiseren — zonder dat alles maatwerk-code hoeft te worden.',
  },
  {
    title: 'Data synchronisatie',
    text: 'Dezelfde data op de juiste plek in elk systeem. Geen dubbele invoer, geen fouten door menselijk kopieerwerk.',
  },
]

const automationSteps = [
  { title: 'Inventarisatie', text: 'We brengen in kaart welke processen handmatig verlopen en welke het meest opleveren als ze automatisch gaan.' },
  { title: 'Voorstel', text: 'Ik maak een helder voorstel: wat ik automatiseer, hoe het werkt en wat het kost. Inclusief inschatting van tijdsbesparing.' },
  { title: 'Bouwen en testen', text: 'De automatisering wordt gebouwd en grondig getest voor hij live gaat.' },
  { title: 'Oplevering', text: 'Je krijgt uitleg over hoe het werkt en wat je moet doen als er iets mis gaat. Uitbreidingen zijn altijd mogelijk.' },
]

function AutomatiseringServicePage() {
  return (
    <div>
      <ServiceHero
        badge="Diensten · Automatisering"
        title="Minder handmatig werk,"
        highlight="meer tijd voor wat telt."
        subtitle="Ik koppel je tools, automatiseer terugkerende processen en zorg dat systemen samenwerken. Van simpele formulier-koppelingen tot complete n8n-workflows."
        badges={[
          { icon: Workflow, label: 'n8n workflows' },
          { icon: LinkIcon, label: 'API-koppelingen' },
          { icon: Users, label: 'CRM integraties' },
        ]}
      />

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Reveal>
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-orange-500">Wanneer is dit slim?</span>
            <h2 className="mt-3 font-headline text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] text-slate-900 md:text-4xl lg:text-5xl">
              Herken je dit?
            </h2>

            <ul className="mt-8 space-y-4">
              {automationRecognise.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base leading-relaxed text-slate-700">
                  <ArrowRight size={18} className="mt-1 flex-shrink-0 text-orange-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-lg leading-relaxed text-slate-600">
              Automatisering lost dit op — zonder dat je hoeft te leren programmeren.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-slate-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="mb-12 max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-orange-500">Wat ik automatiseer</span>
            <h2 className="mt-3 font-headline text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] text-slate-900 md:text-4xl">
              Praktische automatiseringen die direct verschil maken
            </h2>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2">
            {automationBlocks.map((b) => (
              <div key={b.title} className="rounded-2xl border border-slate-200 bg-white p-7">
                <h3 className="font-headline text-xl font-bold text-slate-900">{b.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Reveal className="mb-12 max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-orange-500">Werkwijze</span>
            <h2 className="mt-3 font-headline text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] text-slate-900 md:text-4xl lg:text-5xl">
              Helder traject, snel resultaat
            </h2>
          </Reveal>
          <NumberedSteps steps={automationSteps} />
        </div>
      </section>

      <WhyAndOtherServices
        whyHeading="Geen overkill, wel de juiste automatisering"
        whyIntro="Niet alles hoeft geautomatiseerd te worden. Ik kijk eerst naar wat het meeste oplevert en begin daar. Eenvoudige oplossingen gaan voor complexe. Het doel is tijdsbesparing, niet technische indruk maken."
        whyPoints={[
          'Eerlijk advies over wat wel en niet slim is',
          'Verstand van zowel web als systemen',
          "n8n, API's en maatwerk waar nodig",
          'Uitbreidbaar en onderhoudbaar',
        ]}
        otherIntro="Andere richtingen die hierop kunnen aansluiten:"
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
