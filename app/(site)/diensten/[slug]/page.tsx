import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Globe,
  LayoutPanelTop,
  MessageCircle,
  ShoppingCart,
  Workflow,
  Wrench,
} from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import WavePageHeader from '@/components/site/WavePageHeader'
import CTASection from '@/components/site/CTASection'

type ServiceMeta = {
  title: string
  headline: string
  description: string
}

const SERVICE_META: Record<string, ServiceMeta> = {
  websites: {
    title: 'Websites',
    headline: 'Een website die werkt als een sterke basis voor je bedrijf.',
    description:
      'Een goede website moet meer doen dan er netjes uitzien. WebsUp bouwt websites die professioneel overkomen, duidelijk vertellen wat je doet en gericht zijn op contact, aanvragen en groei. Snel, logisch opgebouwd en afgestemd op jouw bedrijf.',
  },
  webshops: {
    title: 'Webshops',
    headline: 'Een webshop die verkoop makkelijker maakt.',
    description:
      'Voor bedrijven die online willen verkopen met een sterke shop, slimme flow en ruimte om verder door te groeien.',
  },
  'apps-dashboards': {
    title: 'Apps & Dashboards',
    headline: 'Overzicht en grip met een systeem dat past.',
    description:
      'Voor bedrijven die vastlopen in losse tools, handmatig werk of gebrek aan overzicht.',
  },
  automatisering: {
    title: 'Automatisering',
    headline: 'Minder handmatig werk. Meer rust en overzicht.',
    description:
      'Slimme koppelingen en automatiseringen voor processen die sneller, duidelijker en betrouwbaarder kunnen.',
  },
}

const websiteResults = [
  {
    title: 'Vertrouwen opbouwen',
    text: 'Je website is vaak de eerste echte indruk. Dan moet direct duidelijk zijn dat je professioneel werkt en serieus genomen wilt worden.',
    icon: Globe,
  },
  {
    title: 'Duidelijk vertellen wat je doet',
    text: 'Bezoekers moeten snel begrijpen wie je bent, wat je doet en waarom ze bij jou moeten zijn.',
    icon: LayoutPanelTop,
  },
  {
    title: 'Contact en aanvragen stimuleren',
    text: 'Een goede website helpt mensen om de volgende stap te zetten. Bellen, mailen, aanvragen of kennismaken.',
    icon: MessageCircle,
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
    text: 'Je krijgt een duidelijke opzet of visuele richting, zodat je weet waar we naartoe werken.',
  },
  {
    title: 'Ontwerp en bouw',
    text: 'De website wordt uitgewerkt en gebouwd, met ruimte voor feedback en aanscherping.',
  },
  {
    title: 'Livegang en doorontwikkeling',
    text: 'Na oplevering kan de website gewoon mee blijven groeien met je bedrijf.',
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
        badge="Diensten"
        title="Een website die werkt als een sterke basis voor je bedrijf."
        subtitle="Een goede website moet meer doen dan er netjes uitzien. WebsUp bouwt websites die professioneel overkomen, duidelijk vertellen wat je doet en gericht zijn op contact, aanvragen en groei. Snel, logisch opgebouwd en afgestemd op jouw bedrijf."
      >
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-all hover:-translate-y-px hover:bg-white/90"
          >
            Plan een kennismaking
            <ArrowRight size={14} />
          </Link>
          <Link
            href="/gratis-ontwerp"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-px hover:bg-white/15"
          >
            Vraag gratis ontwerp aan
          </Link>
        </div>

        <div className="mt-7 flex flex-wrap gap-2">
          {['Professionele uitstraling', 'Duidelijke structuur', 'Klaar om op door te bouwen'].map((item) => (
            <span
              key={item}
              className="inline-flex rounded-full border border-white/12 bg-white/8 px-3 py-1 text-xs font-semibold text-white/70"
            >
              {item}
            </span>
          ))}
        </div>
      </WavePageHeader>

      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:px-8">
          <Reveal>
            <span className="overline-badge mb-4 inline-flex">Waarom een goede website telt</span>
            <h2 className="max-w-xl font-headline text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] text-slate-900 md:text-4xl">
              Je website moet niet alleen mooi zijn. Hij moet duidelijk werken.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-500">
              Voor veel bedrijven is de website de eerste echte indruk. Dan moet direct duidelijk zijn wie je bent, wat je doet en waarom iemand voor jou zou kiezen. Daarom bouwen we websites die vertrouwen geven, logisch zijn opgebouwd en gericht zijn op resultaat, zonder onnodige poespas.
            </p>
          </Reveal>

          <div className="grid gap-4">
            {websiteResults.map((item, index) => {
              const Icon = item.icon

              return (
                <Reveal key={item.title} delay={index * 70}>
                  <div className="rounded-[1.75rem] border border-slate-100 bg-slate-50 p-6">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-orange-500 shadow-sm">
                      <Icon size={18} />
                    </div>
                    <h3 className="font-headline text-xl font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.text}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="mb-12 max-w-3xl">
            <span className="overline-badge mb-4 inline-flex">Wat je krijgt</span>
            <h2 className="font-headline text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] text-slate-900 md:text-4xl">
              Alles wat nodig is voor een sterke online basis.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-500">
              Geen overvolle lijst met loze features, maar precies wat nodig is om je website professioneel, snel en toekomstbestendig neer te zetten.
            </p>
          </Reveal>

          <div className="overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
            <div className="grid gap-0 lg:grid-cols-[1.02fr_0.98fr]">
              <div className="relative min-h-[22rem]">
                <Image
                  src="https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1400&q=80"
                  alt="Webdesign en websites op maat"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06040c]/82 via-[#06040c]/24 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
                  <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur-sm">
                    Sterke basis
                  </div>
                  <p className="mt-4 max-w-lg text-base leading-relaxed text-white/72">
                    Professioneel ontwerp, sterke structuur en een website die klaar is om later verder op uit te bouwen.
                  </p>
                </div>
              </div>

              <div className="p-7 lg:p-8">
                <div className="mb-5">
                  <div className="font-headline text-2xl font-bold text-slate-900">Inbegrepen waar nodig</div>
                  <div className="mt-2 text-sm leading-relaxed text-slate-400">
                    Praktisch, professioneel en klaar voor later.
                  </div>
                </div>

                <div className="space-y-3">
                  {websiteIncludes.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-[1.1rem] border border-slate-100 bg-slate-50 px-4 py-3">
                      <CheckCircle size={16} className="mt-0.5 flex-shrink-0 text-orange-500" />
                      <span className="text-sm leading-relaxed text-slate-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="mb-12 max-w-3xl">
            <span className="overline-badge mb-4 inline-flex">Hoe het traject verloopt</span>
            <h2 className="font-headline text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] text-slate-900 md:text-4xl">
              Duidelijk proces, korte lijnen.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-500">
              Je hoeft geen compleet plan klaar te hebben. We beginnen bij jouw situatie en werken stap voor stap naar een website die klopt.
            </p>
          </Reveal>

          <div className="overflow-hidden rounded-[2rem] border border-slate-100 bg-slate-50 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
            <div className="grid gap-0 lg:grid-cols-[0.86fr_1.14fr]">
              <div className="border-b border-slate-100 p-7 lg:border-b-0 lg:border-r lg:p-10">
                <div className="inline-flex rounded-full border border-orange-100 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
                  Stap voor stap
                </div>
                <h3 className="mt-5 font-headline text-2xl font-bold text-slate-900 md:text-[2rem]">
                  Geen ingewikkeld traject, wel een duidelijke route.
                </h3>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-500">
                  Je hoeft vooraf niet alles al uitgewerkt te hebben. We brengen eerst scherp in kaart wat de website moet doen, waarna ontwerp, inhoud en techniek logisch op elkaar aansluiten.
                </p>
              </div>

              <div className="p-7 lg:p-10">
                <div className="space-y-5">
                  {websiteSteps.map((step, index) => (
                    <Reveal key={step.title} delay={index * 70}>
                      <div className="flex items-start gap-4 border-b border-slate-100 pb-5 last:border-b-0 last:pb-0">
                        <div
                          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl text-sm font-bold text-white"
                          style={{ background: 'linear-gradient(135deg,#f97316 0%,#ec4899 55%,#a78bfa 100%)' }}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-headline text-xl font-bold text-slate-900">{step.title}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-slate-500">{step.text}</p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="overflow-hidden rounded-[2rem] bg-[#06040c] shadow-[0_22px_60px_rgba(15,23,42,0.18)]">
            <div className="grid gap-0 lg:grid-cols-[1.08fr_0.92fr]">
              <div className="border-b border-white/10 p-7 text-white lg:border-b-0 lg:border-r lg:p-10">
                <span className="overline-badge mb-4 inline-flex">Waarom WebsUp</span>
                <h2 className="font-headline text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] md:text-4xl">
                  Persoonlijk contact, technisch sterk en praktisch ingestoken.
                </h2>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/64">
                  Je schakelt direct met degene die meedenkt en bouwt. Geen ruis, geen onnodige lagen en geen traject dat ingewikkelder wordt gemaakt dan nodig. Wel een website die past bij jouw bedrijf en ruimte laat om verder te bouwen als dat later nodig is.
                </p>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/52">
                  Deze dienst past vooral bij bedrijven die professioneler zichtbaar willen zijn, een verouderde site achter zich willen laten of een basis zoeken die later kan meegroeien met webshop, koppelingen of maatwerk.
                </p>

                <div className="mt-8 space-y-3">
                  {websiteWhy.map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm leading-relaxed text-white/72">
                      <div className="mt-1.5 h-2 w-2 rounded-full bg-orange-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-7 text-white lg:p-10">
                <div className="text-sm font-semibold text-white/88">Daarna eventueel verder bouwen</div>
                <h3 className="mt-5 font-headline text-2xl font-bold text-white">
                  Soms begint het met een website. Daarna bouw je verder.
                </h3>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-white/62">
                  Heeft je bedrijf later meer nodig, dan kan WebsUp ook verder helpen met webshops, dashboards, portals, koppelingen en automatisering. Geen losse tools als het slimmer als geheel kan.
                </p>

                <div className="mt-8 divide-y divide-white/10 rounded-[1.5rem] border border-white/10 bg-white/5">
                  {serviceProgression.map((service) => {
                    return (
                      <Link
                        key={service.slug}
                        href={`/diensten/${service.slug}`}
                        className="group flex items-center justify-between px-5 py-4 transition-colors hover:bg-white/5"
                      >
                        <div className="pr-4">
                          <div className="text-sm font-semibold text-white">{service.title}</div>
                          <div className="mt-1 text-sm leading-relaxed text-white/55">{service.description}</div>
                        </div>
                        <ArrowRight size={14} className="flex-shrink-0 text-white/35 transition-transform group-hover:translate-x-1 group-hover:text-white/70" />
                      </Link>
                    )
                  })}
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

function GenericServicePage({ slug, service }: { slug: string; service: ServiceMeta }) {
  const otherServices = Object.entries(SERVICE_META).filter(([key]) => key !== slug)

  return (
    <div>
      <WavePageHeader badge="Diensten" title={service.headline} subtitle={service.description}>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-all hover:-translate-y-px hover:bg-white/90"
          >
            Plan een kennismaking <ArrowRight size={14} />
          </Link>
          <Link
            href="/diensten"
            className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft size={14} />
            Alle diensten
          </Link>
        </div>
      </WavePageHeader>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="max-w-3xl">
            <h2 className="font-headline text-3xl font-extrabold text-slate-900 md:text-4xl">
              Meer dan een losse dienst
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-500">
              Ook deze dienst wordt niet als los pakket benaderd. We kijken altijd naar jouw situatie, hoe je nu werkt en wat logisch aansluit op je bedrijf.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="mb-8">
            <h2 className="font-headline text-2xl font-bold text-slate-900">Andere diensten</h2>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {otherServices.map(([key, item]) => (
              <Link
                key={key}
                href={`/diensten/${key}`}
                className="group rounded-[1.5rem] border border-slate-100 bg-white p-6 transition-all hover:border-orange-200 hover:shadow-sm"
              >
                <div className="font-headline text-xl font-bold text-slate-900 transition-colors group-hover:text-orange-500">
                  {item.title}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">{item.description}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-orange-500">
                  Meer info <ArrowRight size={13} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  )
}

export default async function DienstDetailPage({ params }: Props) {
  const { slug } = await params
  const service = SERVICE_META[slug]

  if (!service) notFound()

  if (slug === 'websites') {
    return <WebsitesServicePage />
  }

  return <GenericServicePage slug={slug} service={service} />
}
