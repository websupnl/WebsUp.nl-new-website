import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle, MapPin } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'

const trustPoints = [
  'Je schakelt direct met degene die ontwerpt en bouwt',
  'Eerlijk advies over WordPress, Shopify of maatwerk',
  'Technisch sterk, maar praktisch uitgelegd',
]

export default function AboutMeSection() {
  return (
    <section className="bg-white py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-end gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
          <Reveal>
            <div className="relative">
              <div className="absolute left-5 top-5 z-10 inline-flex rounded-full border border-white/50 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur-sm">
                Over WebsUp
              </div>
              <div className="relative h-[24rem] overflow-hidden rounded-[2.5rem] bg-slate-100 sm:h-[32rem]">
                <Image
                  src="/Daan Koolhaas.jpg"
                  alt="Daan Koolhaas"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06040c]/70 via-[#06040c]/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 flex items-center gap-4 p-6 text-white">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="font-headline text-lg font-bold">Daan Koolhaas</div>
                    <div className="text-sm text-white/70">Direct aanspreekpunt voor jouw project</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <span className="overline-badge mb-4 inline-flex">Over WebsUp</span>
            <h2 className="max-w-2xl font-headline text-4xl font-extrabold leading-[1.08] tracking-[-0.02em] text-slate-900 md:text-5xl">
              Direct contact met de bouwer
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-500">
              WebsUp is bewust persoonlijk opgezet. Geen doorschuiven tussen sales, accountmanagement en development, maar korte lijnen met Daan. Daardoor blijven keuzes helder, technisch kloppend en passend bij jouw bedrijf.
            </p>

            <div className="mt-7 grid gap-3">
              {trustPoints.map((point) => (
                <div key={point} className="flex items-start gap-2.5 text-sm text-slate-600">
                  <CheckCircle size={16} className="mt-0.5 shrink-0 text-orange-500" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 border-t border-slate-200 pt-6">
              <Link
                href="/over-ons"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-px hover:bg-slate-800"
              >
                Meer over mij
                <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
