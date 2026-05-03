import Link from 'next/link'
import { ArrowRight, Plus } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import { homepageFaq } from '@/lib/homepage-content'

interface FAQSectionProps {
  limit?: number
  showPageLink?: boolean
  sectionClassName?: string
  hideHeading?: boolean
}

export default function FAQSection({
  limit,
  showPageLink = false,
  sectionClassName = 'bg-white py-16 lg:py-24',
  hideHeading = false,
}: FAQSectionProps) {
  const items = typeof limit === 'number' ? homepageFaq.slice(0, limit) : homepageFaq

  if (hideHeading) {
    return (
      <section className={sectionClassName}>
        <div className="mx-auto max-w-3xl space-y-3 px-6 lg:px-8">
          {items.map((item, index) => (
            <Reveal key={item.question} delay={index * 30}>
              <details className="group rounded-2xl border border-slate-200 bg-white transition-colors open:border-slate-300">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-6 py-5 text-left">
                  <span className="font-headline text-base font-bold leading-tight text-slate-900 md:text-lg">
                    {item.question}
                  </span>
                  <Plus size={18} className="mt-1 shrink-0 text-slate-400 transition-transform group-open:rotate-45" />
                </summary>
                <p className="px-6 pb-5 pt-0 text-base leading-relaxed text-slate-600">
                  {item.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className={sectionClassName}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <span className="overline-badge mb-5 inline-flex">FAQ</span>
            <h2 className="max-w-xl font-headline text-4xl font-extrabold leading-[1.08] tracking-[-0.02em] text-slate-900 md:text-5xl">
              Veelgestelde vragen
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-500 md:text-lg">
              Twijfel je nog of WebsUp bij je past? Hieronder beantwoord ik alvast een paar vragen die vaak terugkomen.
            </p>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="text-sm font-semibold text-slate-900">Staat jouw vraag er niet tussen?</div>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Stuur hem gerust door. Vaak is kort sparren sneller dan blijven zoeken.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800">
                  Stel je vraag
                  <ArrowRight size={14} />
                </Link>
                {showPageLink && (
                  <Link href="/veelgestelde-vragen" className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition-colors hover:border-slate-400">
                    Alle vragen
                  </Link>
                )}
              </div>
            </div>
          </Reveal>

          <div className="space-y-3">
            {items.map((item, index) => (
              <Reveal key={item.question} delay={index * 45}>
                <details className="group rounded-2xl border border-slate-200 bg-white transition-colors open:border-slate-300">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-6 py-5 text-left">
                    <span className="font-headline text-base font-bold leading-tight text-slate-900 md:text-lg">
                      {item.question}
                    </span>
                    <Plus size={18} className="mt-1 shrink-0 text-slate-400 transition-transform group-open:rotate-45" />
                  </summary>
                  <p className="px-6 pb-5 pt-0 text-base leading-relaxed text-slate-600">
                    {item.answer}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
