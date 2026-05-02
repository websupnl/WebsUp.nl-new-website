import Link from 'next/link'
import { ArrowRight, Plus } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import { siteConfig } from '@/config/site.config'

interface FAQSectionProps {
  limit?: number
  showPageLink?: boolean
  sectionClassName?: string
  hideHeading?: boolean
}

export default function FAQSection({
  limit,
  showPageLink = true,
  sectionClassName = 'bg-white py-14 lg:py-20',
  hideHeading = false,
}: FAQSectionProps) {
  const items = typeof limit === 'number' ? siteConfig.faq.items.slice(0, limit) : siteConfig.faq.items

  if (hideHeading) {
    return (
      <section className={sectionClassName}>
        <div className="mx-auto max-w-3xl px-6 lg:px-8 space-y-3">
          {items.map((item, index) => (
            <Reveal key={item.question} delay={index * 30}>
              <details className="group rounded-2xl border border-slate-200 bg-white open:border-l-[3px] open:border-l-orange-500 transition-colors">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-6 py-5 text-left">
                  <span className="font-headline text-base font-bold leading-tight text-slate-900 md:text-lg">
                    {item.question}
                  </span>
                  <Plus
                    size={18}
                    className="mt-1 flex-shrink-0 text-slate-400 transition-all duration-200 group-open:rotate-45 group-open:text-orange-500"
                  />
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
        <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <Reveal>
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-orange-500">FAQ</span>
            <h2 className="mt-3 max-w-xl font-headline text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] text-slate-900 md:text-4xl lg:text-5xl">
              {siteConfig.faq.heading}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-500">
              {siteConfig.faq.subheading}
            </p>

            <div className="mt-8 rounded-2xl border border-orange-500/20 bg-orange-500/[0.06] p-5">
              <div className="text-sm font-semibold text-slate-900">Staat je vraag er niet tussen?</div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Dan is kort sparren vaak sneller dan blijven twijfelen. Een goed gesprek maakt meestal snel duidelijk wat slim is.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {showPageLink && (
                <Link
                  href="/veelgestelde-vragen"
                  className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
                >
                  Bekijk alle vragen
                  <ArrowRight size={14} />
                </Link>
              )}
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition-colors hover:border-slate-400"
              >
                Stel een vraag
              </Link>
            </div>
          </Reveal>

          <div className="space-y-3">
            {items.map((item, index) => (
              <Reveal key={item.question} delay={index * 45}>
                <details className="group rounded-2xl border border-slate-200 bg-white open:border-l-[3px] open:border-l-orange-500 transition-colors">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-6 py-5 text-left">
                    <span className="font-headline text-base font-bold leading-tight text-slate-900 md:text-lg">
                      {item.question}
                    </span>
                    <Plus
                      size={18}
                      className="mt-1 flex-shrink-0 text-slate-400 transition-all duration-200 group-open:rotate-45 group-open:text-orange-500"
                    />
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
