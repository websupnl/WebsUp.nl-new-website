import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import GrainOverlay from '@/components/ui/GrainOverlay'
import HeroRotatingWord from '@/components/site/HeroRotatingWord'


export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-[#06040c]">

      {/* ── Background ─────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Wave image — zelfde aanpak als WavePageHeader */}
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

        {/* Directional overlay: links donker voor tekst, rechts open voor wave */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(110deg, rgba(6,4,12,0.95) 0%, rgba(6,4,12,0.82) 38%, rgba(6,4,12,0.44) 65%, rgba(6,4,12,0.18) 100%)',
          }}
        />

        {/* Ambient orbs */}
        <div className="hero-orb-a absolute -top-40 right-[8%] h-[560px] w-[560px] rounded-full bg-orange-500/[0.14] blur-[140px]" />
        <div className="hero-orb-b absolute -bottom-24 right-[-4%] h-[440px] w-[440px] rounded-full bg-pink-500/[0.10] blur-[120px]" />
        <div className="hero-orb-c absolute left-[-8%] top-[25%] h-[380px] w-[380px] rounded-full bg-violet-600/[0.07] blur-[110px]" />

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#06040c] to-transparent" />
      </div>

      <GrainOverlay opacity={0.022} className="absolute" />

      {/* ── Main grid ──────────────────────────────────────────── */}
      <div className="relative mx-auto grid w-full max-w-7xl flex-1 gap-14 px-6 pb-16 pt-28 md:pt-32 lg:grid-cols-[1.22fr_0.78fr] lg:items-center lg:gap-20 lg:px-8 lg:pb-20 lg:pt-36">

        {/* ── LEFT: content ──────────────────────────────────── */}
        <div className="flex flex-col">

          {/* Badge */}
          <div className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.11] bg-white/[0.055] px-4 py-2 backdrop-blur-md">
            <span className="h-[5px] w-[5px] rounded-full bg-gradient-to-r from-orange-400 to-pink-400" />
            <span className="text-[0.72rem] font-medium tracking-wide text-white/55">
              Digitale oplossingen die met je bedrijf meegroeien
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-headline font-extrabold leading-[1.04] tracking-[-0.038em] text-white"
            style={{ fontSize: 'clamp(2.2rem, 4.2vw, 4.8rem)' }}
          >
            Ik bouw oplossingen
            <br />
            voor bedrijven die willen
            <br />
            <HeroRotatingWord />
          </h1>

          {/* Separator — zelfde stijl als WavePageHeader */}
          <div className="focus-pulse-line mt-7 h-[3px] w-24 rounded-full bg-gradient-to-r from-orange-400 via-pink-400 to-violet-300" />

          {/* Body */}
          <p className="mt-6 max-w-[52ch] text-[0.9375rem] leading-[1.76] text-white/52 md:text-[1rem]">
            Ik ontwerp en bouw digitale oplossingen die niet alleen goed ogen, maar ook bijdragen aan de groei van jouw bedrijf. Van converterende websites en webshops tot maatwerk dashboards en automatisering.
          </p>

          {/* CTAs */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="btn-brand-gradient group gap-2.5 !px-7 !py-3.5"
            >
              Gratis ontwerp aanvragen
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/projecten"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.13] bg-white/[0.045] px-7 py-3.5 text-sm font-medium text-white/72 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-white/[0.22] hover:bg-white/[0.08] hover:text-white"
            >
              Bekijk projecten
            </Link>
          </div>

        </div>

        {/* ── RIGHT: image card ───────────────────────────────── */}
        <div className="relative mx-auto w-full max-w-[22rem] lg:mx-0 lg:ml-auto lg:max-w-[27rem]">

          {/* Ambient glow behind card */}
          <div className="pointer-events-none absolute -inset-10 rounded-[3rem] opacity-80 blur-3xl"
            style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(249,115,22,0.24), rgba(236,72,153,0.12) 50%, transparent 72%)' }}
          />

          {/* Card */}
          <div className="group relative overflow-hidden rounded-[2rem] border border-white/[0.10] bg-white/[0.035] shadow-[0_32px_80px_rgba(0,0,0,0.52),0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur-sm transition-all duration-700 hover:-translate-y-1.5 hover:border-white/[0.16] hover:shadow-[0_48px_110px_rgba(0,0,0,0.60)]">

            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <Image
              src="/Daan Koolhaas.jpg"
              alt="Daan Koolhaas — WebsUp.nl"
              width={640}
              height={800}
              priority
              className="h-auto w-full object-cover"
            />

            <GrainOverlay opacity={0.05} />

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#06040c]/95 via-[#06040c]/55 to-transparent px-6 pb-7 pt-24">
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.22em] text-orange-300/65">
                WebsUp.nl
              </p>
              <p className="mt-2 text-[1.35rem] font-extrabold leading-tight tracking-[-0.02em] text-white">
                Daan Koolhaas
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[0.78rem] text-white/45">Design</span>
                <span className="h-[3px] w-[3px] rounded-full bg-white/25" />
                <span className="text-[0.78rem] text-white/45">Strategie</span>
                <span className="h-[3px] w-[3px] rounded-full bg-white/25" />
                <span className="text-[0.78rem] text-white/45">Techniek</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Watermark */}
      <div className="pointer-events-none absolute bottom-7 right-8 hidden items-center gap-3 text-[0.6rem] font-bold uppercase tracking-[0.22em] text-white/18 lg:flex">
        <span className="h-px w-10 bg-gradient-to-r from-transparent via-white/24 to-transparent" />
        WebsUp
      </div>
    </section>
  )
}
