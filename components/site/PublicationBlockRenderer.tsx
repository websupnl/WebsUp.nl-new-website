import Link from 'next/link'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { PublicationBlock } from '@/types/database.types'

interface Props {
  block: PublicationBlock
  index: number
}

export default function PublicationBlockRenderer({ block, index }: Props) {
  const bg = index % 2 === 0 ? 'bg-white' : 'bg-gray-50'

  if (block.type === 'text') {
    return (
      <section className={`${bg} py-16 lg:py-20`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {block.title && (
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 leading-tight">
              {block.title}
            </h2>
          )}
          {block.content && (
            <p className="text-gray-500 text-lg leading-relaxed">{block.content}</p>
          )}
        </div>
      </section>
    )
  }

  if (block.type === 'features') {
    const items = (block.content ?? '')
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)

    return (
      <section className={`${bg} py-16 lg:py-20`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {block.title && (
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10 text-center leading-tight">
              {block.title}
            </h2>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-white rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
              >
                <CheckCircle size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (block.type === 'cta') {
    return (
      <section className="bg-blue-600 py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {block.title && (
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">{block.title}</h2>
          )}
          {block.content && (
            <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              {block.content}
            </p>
          )}
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-all hover:shadow-lg"
          >
            Neem contact op
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    )
  }

  return null
}
