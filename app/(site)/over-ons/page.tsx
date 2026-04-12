export const revalidate = 3600

import { Metadata } from 'next'
import Image from 'next/image'
import WavePageHeader from '@/components/site/WavePageHeader'
import CTASection from '@/components/site/CTASection'
import { CheckCircle, MessageCircle, Eye, Wrench } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import { Tooltip } from '@/components/ui/tooltip-card'

export const metadata: Metadata = {
  title: 'Over ons',
  description: 'WebsUp is Daan Koolhaas — een zelfstandige webdeveloper uit Friesland. Persoonlijk contact, eerlijk advies en direct met de persoon die bouwt.',
}

const stats = [
  { value: '94+', label: 'Klanten geholpen' },
  { value: '7+', label: 'Jaar ervaring' },
  { value: '100%', label: 'Maatwerk' },
  { value: 'Friesland', label: 'Gevestigd' },
]

const gradientStyle = {
  background: 'linear-gradient(135deg,#f97316 0%,#ec4899 50%,#a78bfa 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
} as React.CSSProperties

const values = [
  {
    icon: MessageCircle,
    title: 'Eén aanspreekpunt',
    desc: 'Geen accountmanager die doorverwijst. Je werkt direct met Daan — van eerste gesprek tot oplevering en daarna.',
  },
  {
    icon: Eye,
    title: 'Eerlijk & transparant',
    desc: 'Geen verborgen kosten, geen vage beloftes. Je weet vooraf wat je krijgt, wat het kost en wanneer het klaar is.',
  },
  {
    icon: Wrench,
    title: 'Technisch én praktisch',
    desc: 'WordPress, Shopify, Next.js of volledig maatwerk — het juiste platform voor jouw situatie, niet het duurste.',
  },
]

export default async function OverOnsPage() {
  return (
    <div>
      <WavePageHeader
        badge="Over WebsUp"
        title="Geen groot bureau."
        titleHighlight="Gewoon Daan."
        subtitle="Persoonlijk contact, eerlijk advies en direct met de persoon die bouwt. Gebaseerd in Friesland."
      />

      {/* Stats balk */}
      <div className="bg-white border-b border-slate-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center lg:text-left">
                <div className="text-3xl font-bold leading-none" style={gradientStyle}>{value}</div>
                <div className="text-slate-500 text-sm mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Daan + persoonlijke tekst */}
      <section className="bg-white py-16 lg:py-24">
        <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Afbeelding */}
            <div className="relative h-80 lg:h-[520px] rounded-2xl overflow-hidden shadow-xl order-2 lg:order-1">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=70"
                alt="Daan Koolhaas — WebsUp"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Tekst */}
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                Hoi, ik ben Daan.
              </h2>
              <div className="space-y-4 text-slate-500 leading-relaxed text-lg">
                <p>
                  Ik bouw websites en digitale oplossingen voor ondernemers die niet willen jongleren met bureaus, tussenlagen of vage offertes. Bij WebsUp doe je dat gewoon rechtstreeks met mij.
                </p>
                <p>
                  Met meer dan 7 jaar ervaring in webdevelopment weet ik wat werkt — en wat niet. Van een snelle{' '}
                  <Tooltip content="Open-source CMS. Ideaal voor blogs, bedrijfssites en portals. Snel te beheren zonder technische kennis.">
                    <span className="font-semibold text-slate-700 cursor-default underline decoration-dotted underline-offset-2">WordPress</span>
                  </Tooltip>
                  -site tot een volledig maatwerk{' '}
                  <Tooltip content="Next.js is een React-framework gebouwd voor snelheid en SEO. Dé keuze voor moderne, schaalbare websites en apps.">
                    <span className="font-semibold text-slate-700 cursor-default underline decoration-dotted underline-offset-2">Next.js</span>
                  </Tooltip>
                  -platform: ik kies het platform dat bij jouw situatie past, niet het duurste.
                </p>
                <p>
                  Ik ben gevestigd in Friesland en werk voor klanten door heel Nederland. Bereikbaar via WhatsApp, altijd direct antwoord. Geen ticketsystemen, geen helpdesk.
                </p>
              </div>
              <ul className="mt-8 space-y-3">
                {[
                  {
                    text: (
                      <>
                        <Tooltip content="WordPress voor content-sites, Shopify voor webshops, Next.js voor snelle maatwerk-platforms.">
                          <span className="underline decoration-dotted underline-offset-2 cursor-default">WordPress, Shopify, Next.js</span>
                        </Tooltip>
                        {' '}& volledig maatwerk
                      </>
                    ),
                  },
                  { text: 'Technisch sterk — van code tot server tot SEO' },
                  { text: 'Vaste prijs, geen verrassingen achteraf' },
                  { text: 'Direct bereikbaar via WhatsApp' },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle size={17} className="flex-shrink-0 mt-0.5" style={{ color: '#f97316' }} />
                    <span className="text-slate-500 text-sm leading-relaxed">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Waarden */}
      <section className="bg-slate-50 py-16 lg:py-24">
        <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
              Waarom ondernemers voor WebsUp kiezen
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-8 border border-slate-100">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: 'linear-gradient(135deg,#f97316 0%,#ec4899 50%,#a78bfa 100%)' }}>
                  <Icon size={20} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <CTASection />
    </div>
  )
}
