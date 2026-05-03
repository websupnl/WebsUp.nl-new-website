import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import { audienceItems } from '@/lib/homepage-content'

export default function VoorWieSection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <span className="overline-badge mb-5 inline-flex">Voor wie</span>
            <h2 className="max-w-3xl font-headline text-4xl font-extrabold leading-[1.06] tracking-[-0.02em] text-slate-900 md:text-5xl">
              Vooral voor bedrijven die duidelijkheid en korte lijnen zoeken
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg lg:justify-self-end">
            WebsUp past goed bij ondernemers en bedrijven die een professionele digitale oplossing willen, zonder vast te zitten aan een log bureau of onduidelijk traject.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {audienceItems.map((item, index) => {
            const Icon = item.icon

            return (
              <Reveal key={item.title} delay={index * 45}>
                <div className="group h-full rounded-2xl border border-slate-200 bg-white p-6 transition-colors hover:border-slate-300">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 text-slate-800 ring-1 ring-slate-200">
                    <Icon size={19} />
                  </div>
                  <h3 className="font-headline text-xl font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={280}>
          <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm font-semibold text-slate-900">Past jouw bedrijf hierbij?</div>
              <p className="mt-1 text-sm text-slate-500">
                Dan is een korte kennismaking vaak genoeg om de richting scherp te krijgen.
              </p>
            </div>
            <Link href="/contact" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800">
              Plan kennismaking
              <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
