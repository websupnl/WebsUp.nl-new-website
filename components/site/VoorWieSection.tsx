import Link from 'next/link'
import {
  ArrowRight,
  Building2,
  ShoppingBag,
  Hammer,
  Handshake,
  Rocket,
  Store,
  type LucideIcon,
} from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import { siteConfig } from '@/config/site.config'
import GradientIcon from '@/components/site/GradientIcon'

const iconMap: Record<string, LucideIcon> = {
  "MKB & ZZP'ers": Building2,
  Webshops: ShoppingBag,
  Installatiebedrijven: Hammer,
  Dienstverleners: Handshake,
  Startups: Rocket,
  'Lokale ondernemers': Store,
}

const descriptions: Record<string, string> = {
  "MKB & ZZP'ers": 'Voor bedrijven die professioneel zichtbaar willen zijn en een site zoeken die gewoon duidelijk werkt.',
  Webshops: 'Voor ondernemers die online willen verkopen zonder gedoe in checkout, beheer of koppelingen.',
  Installatiebedrijven: 'Voor technische bedrijven die betrouwbaarheid, duidelijkheid en aanvragen online beter willen neerzetten.',
  Dienstverleners: 'Voor bedrijven waar vertrouwen, uitleg en een sterke eerste indruk direct verschil maken.',
  Startups: 'Voor plannen die goed moeten starten, maar ook ruimte nodig hebben om later door te groeien.',
  'Lokale ondernemers': 'Voor ondernemers die lokaal beter gevonden willen worden en online sterker voor de dag willen komen.',
}

const fitSignals = [
  'Je wilt professioneel overkomen en meer vertrouwen wekken',
  'Je zoekt korte lijnen in plaats van een groot bureauproces',
  'Je wilt nu goed starten, maar later kunnen uitbreiden',
]

export default function VoorWieSection() {
  return (
    <section className="bg-slate-50 py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-start gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
          <Reveal>
            <span className="overline-badge mb-4 inline-flex">Voor wie</span>
            <h2 className="max-w-xl font-headline text-4xl font-extrabold leading-[1.06] tracking-[-0.02em] text-slate-900 md:text-5xl">
              Vooral voor bedrijven die duidelijkheid en korte lijnen zoeken
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-500">
              {siteConfig.useCases.subheading} WebsUp past vooral bij ondernemers die een sterke digitale basis willen zonder dat het traject groter wordt gemaakt dan nodig.
            </p>

            <div className="mt-8 grid gap-3">
              {fitSignals.map((signal) => (
                <div key={signal} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700">
                  {signal}
                </div>
              ))}
            </div>

            <Link
              href="/diensten"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition-colors hover:text-orange-500"
            >
              Bekijk diensten
              <ArrowRight size={14} />
            </Link>
          </Reveal>

          <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {siteConfig.useCases.items.map((item, index) => {
              const Icon = iconMap[item.label] ?? Building2

              return (
                <Reveal key={item.label} delay={index * 60}>
                  <div className="group flex items-start gap-5">
                    <GradientIcon icon={Icon} size="lg" />
                    <div>
                      <h3 className="font-headline text-xl font-bold text-slate-900 group-hover:text-orange-500 transition-colors">
                        {item.label}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-500">
                        {descriptions[item.label] ?? 'Voor bedrijven die een duidelijke, sterke en praktische digitale basis zoeken.'}
                      </p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

