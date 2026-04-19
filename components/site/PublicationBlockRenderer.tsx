import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { PublicationBlock } from '@/types/database.types'

interface Props {
  block: PublicationBlock
  index: number
}

export default function PublicationBlockRenderer({ block, index }: Props) {
  const sectionClass = index % 2 === 0 ? 'bg-white' : 'bg-[color:var(--surface-2)]'

  if (block.type === 'text') {
    return (
      <section className={`${sectionClass} py-16 lg:py-20`}>
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          {block.title && (
            <h2 className="font-headline text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] text-slate-900 md:text-4xl">
              {block.title}
            </h2>
          )}
          {block.content && (
            <div className="mt-5 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
              {block.content}
            </div>
          )}
        </div>
      </section>
    )
  }

  if (block.type === 'features') {
    const items = (block.content ?? '')
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean)

    return (
      <section className={`${sectionClass} py-16 lg:py-20`}>
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
          <div>
            {block.title && (
              <h2 className="font-headline text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] text-slate-900 md:text-4xl">
                {block.title}
              </h2>
            )}
            <p className="mt-5 max-w-md text-base leading-relaxed text-slate-600">
              Geen stapel losse kaarten, maar een leesbare opsomming van de belangrijkste punten uit
              deze publicatie.
            </p>
          </div>

          <div className="divide-y divide-slate-200 rounded-[1.75rem] border border-slate-200 bg-white">
            {items.map((item) => (
              <div key={item} className="flex items-start gap-3 px-6 py-5">
                <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0 text-orange-500" />
                <p className="text-sm leading-relaxed text-slate-600 md:text-base">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (block.type === 'cta') {
    return (
      <section className="bg-[#06040c] py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center text-white lg:px-8">
          {block.title && (
            <h2 className="font-headline text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] md:text-4xl">
              {block.title}
            </h2>
          )}
          {block.content && (
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/68 md:text-lg">
              {block.content}
            </p>
          )}
          <div className="mt-8">
            <Link href="/contact" className="btn-brand inline-flex items-center gap-2">
              Neem contact op
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return null
}
