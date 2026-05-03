import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import { personalContactPoints } from '@/lib/homepage-content'

export default function AboutMeSection() {
  return (
    <section className="bg-slate-50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-18">
          <Reveal>
            <div className="relative overflow-hidden rounded-[1.75rem] bg-slate-200">
              <Image
                src="/Daan Koolhaas.jpg"
                alt="Daan Koolhaas, eigenaar van WebsUp.nl"
                width={720}
                height={900}
                className="h-[34rem] w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/82 via-slate-950/34 to-transparent p-6 pt-24 text-white">
                <div className="font-headline text-xl font-bold">Daan Koolhaas</div>
                <div className="mt-1 text-sm text-white/68">Eigenaar van WebsUp.nl</div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <span className="overline-badge mb-5 inline-flex">Geen groot bureau</span>
            <h2 className="max-w-2xl font-headline text-4xl font-extrabold leading-[1.08] tracking-[-0.02em] text-slate-900 md:text-5xl">
              Direct persoonlijk contact
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              Bij WebsUp werk je direct met mij. Geen accountmanager, geen lagen en geen onnodige ruis. Je legt je idee uit aan degene die ook met je meedenkt en het voor je bouwt.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-500">
              Ik denk niet alleen mee over hoe iets eruit moet zien, maar vooral over wat praktisch werkt voor jouw bedrijf. Soms is dat een website. Soms een webshop. En soms juist een maatwerk systeem dat veel werk uit handen neemt.
            </p>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/[0.03]">
              <div className="font-headline text-2xl font-bold text-slate-900">
                Je werkt direct met mij.
              </div>
              <div className="mt-5 grid gap-3">
                {personalContactPoints.map((point) => (
                  <div key={point} className="flex items-start gap-3 text-sm text-slate-600">
                    <CheckCircle size={16} className="mt-0.5 shrink-0 text-slate-400" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/over-ons"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
              >
                Meer over Daan
                <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
