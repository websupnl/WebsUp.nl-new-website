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

export default function VoorWieSection() {
  return (
    <section className="bg-slate-50 py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mb-8 grid gap-8 lg:grid-cols-2 lg:items-start">
          <div>
            <span className="overline-badge mb-4 inline-flex">Voor wie</span>
            <h2 className="font-headline text-4xl font-extrabold leading-[1.06] tracking-[-0.02em] text-slate-900 md:text-5xl">
              Vooral voor bedrijven die duidelijkheid en korte lijnen zoeken
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-500">
              {siteConfig.useCases.subheading} WebsUp past vooral bij ondernemers die een sterke digitale basis willen zonder dat het traject groter wordt gemaakt dan nodig.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 lg:justify-end lg:pt-10">
            <Link href="/contact" className="btn-brand px-7 py-3.5 text-sm">
              Plan een kennismaking
            </Link>
            <Link href="/diensten" className="btn-ghost px-7 py-3.5 text-sm">
              Bekijk diensten
            </Link>
          </div>
        </Reveal>

        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.useCases.items.map((item, index) => {
            const Icon = iconMap[item.label] ?? Building2

            return (
              <Reveal key={item.label} delay={index * 60}>
                <div className="group flex items-start gap-5">
                  <GradientIcon icon={Icon} size="lg" />
                  <div>
                    <h3 className="font-headline text-xl font-bold text-slate-900 transition-colors group-hover:text-orange-500">
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
    </section>
  )
}

