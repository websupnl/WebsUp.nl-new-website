import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import { siteConfig } from '@/config/site.config'

interface FAQSectionProps {
  limit?: number
  showPageLink?: boolean
  sectionClassName?: string
}

export default function FAQSection({
  limit,
  showPageLink = true,
  sectionClassName = 'bg-white py-24 lg:py-28',
}: FAQSectionProps) {
  const items = typeof limit === 'number'
    ? siteConfig.faq.items.slice(0, limit)
    : siteConfig.faq.items

  return (
    <section className={sectionClassName}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-start gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <span className="overline-badge mb-4 inline-flex">FAQ</span>
            <h2 className="max-w-xl font-headline text-4xl font-extrabold leading-[1.06] tracking-[-0.02em] text-slate-900 md:text-5xl">
              {siteConfig.faq.heading}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-500">
              {siteConfig.faq.subheading}
            </p>

            <div className="mt-8 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
              <div className="text-sm font-semibold text-slate-900">Staat je vraag er niet tussen?</div>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Dan is kort sparren vaak sneller dan blijven twijfelen. Een goed gesprek maakt meestal snel duidelijk wat slim is.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {showPageLink && (
                <Link
                  href="/veelgestelde-vragen"
                  className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
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

          <div className="space-y-1">
            {items.map((item, index) => (
              <Reveal key={item.question} delay={index * 45}>
                <details className="group border-t border-slate-200 py-5 last:border-b last:border-slate-200">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left">
                    <span className="font-headline text-xl font-bold leading-tight text-slate-900">
                      {item.question}
                    </span>
                    <span className="mt-1 text-lg font-semibold text-slate-300 transition-transform duration-200 group-open:rotate-45 group-open:text-orange-500">
                      +
                    </span>
                  </summary>
                  <p className="max-w-3xl pt-4 text-base leading-relaxed text-slate-500">
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
