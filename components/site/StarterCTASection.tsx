import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Sparkles } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import { starterItems } from '@/lib/homepage-content'

export default function StarterCTASection() {
  return (
    <section className="bg-[#06040c] py-16 lg:py-24">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden rounded-[2rem] opacity-70">
          <Image
            src="/hero-bg.png"
            alt=""
            fill
            className="object-cover"
            sizes="1280px"
          />
          <div className="absolute inset-0 bg-[#06040c]/78" />
        </div>

        <div className="relative">
          <Reveal className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/7 px-3 py-1 text-xs font-semibold text-white/72">
                <Sparkles size={12} />
                Voor starters
              </div>
              <h2 className="max-w-3xl font-headline text-4xl font-extrabold leading-[1.08] tracking-[-0.02em] text-white md:text-5xl">
                Sterk starten zonder meteen een zwaar traject
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-relaxed text-white/62 md:text-lg lg:justify-self-end">
              Sta je aan het begin van een nieuw bedrijf, webshop of idee? Dan hoeft het niet meteen groot en ingewikkeld te worden. Ik help je met een sterke eerste versie waar je professioneel mee naar buiten kunt.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {starterItems.map((point, index) => (
              <Reveal key={point.title} delay={index * 60}>
                <article className="h-full rounded-2xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-sm">
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-2xl border border-white/12 bg-white/8 text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <h3 className="font-headline text-xl font-bold text-white">{point.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/56">{point.text}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={280}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/gratis-ontwerp" className="btn-brand-gradient">
                Gratis ontwerp aanvragen
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/8 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/14"
              >
                Kennismaking plannen
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
