import { Metadata } from 'next'
import Link from 'next/link'
import WavePageHeader from '@/components/site/WavePageHeader'
import { ArrowRight, Star } from 'lucide-react'
import ServiceCardsGrid from '@/components/site/ServiceCard'
import Reveal from '@/components/ui/Reveal'
import CTASection from '@/components/site/CTASection'
import { finalTrustItems } from '@/lib/homepage-content'

export const metadata: Metadata = {
  title: 'Diensten',
  description:
    'Websites, webshops, maatwerk apps, dashboards en automatisering. Persoonlijk gebouwd, geen standaard pakketten.',
}

export default function DienstenPage() {
  return (
    <div>
      <WavePageHeader
        badge="Diensten"
        title="Digitale oplossingen die"
        titleHighlight="passen bij je bedrijf."
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
          {finalTrustItems.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.label}
                className="flex items-center gap-3 border-l border-white/14 bg-white/[0.025] px-5 py-4 backdrop-blur-sm transition-colors hover:border-orange-400/60 hover:bg-white/[0.045]"
              >
                <Icon size={18} className="shrink-0 text-white/62" />
                <span className="text-sm font-medium text-white/84">{item.label}</span>
              </div>
            )
          })}
        </div>
      </WavePageHeader>

      {/* Service cards — wit met dark glass cards */}
      <section className="relative overflow-hidden bg-[#f8f9fc] py-20 lg:py-28">
        <div className="pointer-events-none absolute -top-20 left-[5%] h-72 w-72 rounded-full bg-orange-400/10 blur-[90px]" />
        <div className="pointer-events-none absolute -bottom-10 right-[5%] h-64 w-64 rounded-full bg-violet-400/10 blur-[80px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="mb-14 max-w-2xl">
            <span className="overline-badge mb-4 inline-flex">Wat ik bouw</span>
            <h2 className="mt-3 font-headline text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] text-slate-900 md:text-4xl lg:text-4xl">
              Vier richtingen, een aanpak
            </h2>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-slate-500">
              Heldere keuzes voor bedrijven die professioneel zichtbaar willen zijn, online willen verkopen of slimmer willen werken.
            </p>
          </Reveal>

          <ServiceCardsGrid />
        </div>
      </section>

      {/* Quote — light */}
      <section className="bg-[#f8f9fc] py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
          <Reveal>
            <div className="mb-4 flex items-center gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} size={18} className="fill-orange-400 text-orange-400" />
              ))}
            </div>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-slate-400">Klantreactie</p>
            <p className="mt-3 text-sm font-semibold text-slate-500">Jeremy Palsma</p>
          </Reveal>
          <Reveal delay={80}>
            <blockquote className="font-headline text-2xl font-bold leading-snug tracking-[-0.01em] text-slate-900 md:text-3xl">
              &ldquo;Daan heeft voor ons in no time, binnen 2 weken, een complete professionele website gebouwd. Qua kwaliteit komt het resultaat verrassend dicht in de buurt van veel duurdere agencies.&rdquo;
            </blockquote>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </div>
  )
}
