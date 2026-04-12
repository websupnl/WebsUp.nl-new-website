import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin, MessageCircle, Wrench } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'

const points = [
  'Direct contact met degene die meedenkt en bouwt',
  'Eerlijk advies over wat wel en niet nodig is',
  'Een oplossing die praktisch werkt en met je bedrijf mee kan groeien',
]

export default function AboutMeSection() {
  return (
    <section className="bg-white py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-100 bg-slate-100 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
              <div className="absolute left-5 top-5 z-10 inline-flex rounded-full border border-white/50 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur-sm">
                Over WebsUp
              </div>
              <div className="relative h-[24rem] sm:h-[30rem]">
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
              Geen onnodige lagen.
              <span className="gradient-text"> Gewoon direct schakelen.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-500">
              WebsUp is bewust persoonlijk opgezet. Je schakelt direct met degene die meedenkt, ontwerpt en bouwt. Geen ruis, geen onnodige omwegen, wel korte lijnen, eerlijk advies en een oplossing die past bij jouw bedrijf.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5">
                <MessageCircle size={18} className="text-orange-500" />
                <div className="mt-3 text-sm font-semibold text-slate-900">Direct contact</div>
                <div className="mt-1 text-sm leading-relaxed text-slate-500">
                  Korte lijnen, snel schakelen en direct duidelijkheid tijdens het hele traject.
                </div>
              </div>
              <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5">
                <Wrench size={18} className="text-pink-500" />
                <div className="mt-3 text-sm font-semibold text-slate-900">Technisch sterk</div>
                <div className="mt-1 text-sm leading-relaxed text-slate-500">
                  Van website tot maatwerk module: slim bedacht en degelijk gebouwd.
                </div>
              </div>
              <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5">
                <MapPin size={18} className="text-orange-500" />
                <div className="mt-3 text-sm font-semibold text-slate-900">Persoonlijk & dichtbij</div>
                <div className="mt-1 text-sm leading-relaxed text-slate-500">
                  Nuchter, betrokken en goed bereikbaar. Online, telefonisch of gewoon op locatie.
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              {points.map((point) => (
                <div key={point} className="flex items-start gap-3 text-sm leading-relaxed text-slate-600">
                  <div className="mt-1 h-2 w-2 rounded-full bg-orange-500" />
                  {point}
                </div>
              ))}
            </div>

            <Link
              href="/over-ons"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-px hover:bg-slate-800"
            >
              Meer over mij
              <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
