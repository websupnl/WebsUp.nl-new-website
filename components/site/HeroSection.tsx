import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MessageCircle, Sparkles, Zap } from 'lucide-react'
import { GlassCard } from '@/components/site/GlassCard'
import GrainOverlay from '@/components/ui/GrainOverlay'
import { siteConfig } from '@/config/site.config'
import { createWhatsAppHref } from '@/lib/utils'
import { finalTrustItems } from '@/lib/homepage-content'

export default function HeroSection() {
  const whatsappHref = createWhatsAppHref(
    siteConfig.phone,
    'Hoi Daan, ik wil graag sparren over mijn website.'
  )

  return (
    <section className="relative flex min-h-[92vh] flex-col overflow-hidden bg-[#06040c]">
      <div className="!absolute inset-0 bg-[#06040c]" />
      <div className="!absolute inset-x-0 top-0 h-[54vh] min-h-[430px] overflow-hidden">
        <div className="hero-wave-bg absolute inset-[-8%]">
          <Image
            src="/hero-bg.png"
            alt=""
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
            quality={85}
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(110deg, rgba(6,4,12,0.94) 0%, rgba(6,4,12,0.80) 40%, rgba(6,4,12,0.40) 70%, rgba(6,4,12,0.20) 100%)',
          }}
        />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#06040c] to-transparent" />
      </div>

      <GrainOverlay opacity={0.035} className="!absolute" />

      <div className="pointer-events-none !absolute bottom-8 right-10 hidden items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white/30 lg:flex">
        <span className="h-px w-16 bg-gradient-to-r from-orange-400 via-pink-400 to-violet-300" />
        WebsUp
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-6 pb-14 pt-40 md:pt-44 lg:grid-cols-[0.98fr_0.78fr] lg:items-center lg:px-8 lg:pb-16 lg:pt-48">
        <div className="max-w-4xl">
          <span className="overline-badge overline-badge-dark mb-5">
            <Sparkles className="h-3.5 w-3.5" />
            Websites - webshops - maatwerk
          </span>

          <h1
            className="max-w-4xl text-balance font-headline font-extrabold leading-[0.98] tracking-[-0.035em] text-white"
            style={{ fontSize: 'clamp(2.35rem, 4.8vw, 5rem)' }}
          >
            Meer vertrouwen
            <span className="gradient-text block">meer aanvragen.</span>
          </h1>

          <div className="focus-pulse-line my-6 h-[3px] w-24 rounded-full bg-gradient-to-r from-orange-400 via-pink-400 to-violet-300" />

          <p className="max-w-[58ch] text-base font-medium leading-7 text-white/62 md:text-lg">
            Ik ontwerp en bouw snelle sites voor ondernemers die serieus willen groeien:
            helder verhaal, sterke uitstraling en een route die bezoekers richting contact stuurt.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-extrabold text-slate-950 shadow-[0_18px_46px_rgba(255,255,255,0.18)] transition hover:-translate-y-0.5 hover:bg-orange-50"
            >
              Gratis ontwerp aanvragen
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/16 bg-white/[0.075] px-6 py-3 text-sm font-extrabold text-white backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-orange-300/50 hover:bg-white/12"
            >
              <MessageCircle className="h-4 w-4 text-orange-300" />
              App Daan direct
            </a>
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
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:ml-auto lg:max-w-[28rem]">
          <div className="pointer-events-none absolute -inset-5 rounded-[2rem] bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.28),transparent_58%)] blur-2xl" />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/12 bg-white/[0.04] shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <Image
              src="/Daan Koolhaas.jpg"
              alt="Daan Koolhaas van WebsUp"
              width={620}
              height={780}
              priority
              className="h-auto w-full object-cover"
            />
            <GrainOverlay opacity={0.06} />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#06040c]/92 via-[#06040c]/42 to-transparent p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-200/80">
                WebsUp.nl
              </p>
              <p className="mt-1 text-lg font-extrabold text-white">Daan Koolhaas</p>
              <p className="text-sm font-medium text-white/62">CRO, design en development</p>
            </div>
          </div>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.08] px-6 py-4 text-sm font-bold text-emerald-50 backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-emerald-500/[0.15] sm:w-auto"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20">
              <svg className="h-4 w-4 fill-emerald-400" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.224-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
              </svg>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-xs uppercase tracking-[0.1em] text-emerald-300/70">Vragen?</span>
              <span className="text-sm">App Daan direct</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
