import Link from 'next/link'
import { getAllTestimonialsAdmin } from '@/lib/queries/testimonials'
import { Plus, Pencil, Star } from 'lucide-react'

export default async function AdminTestimonialsPage() {
  const testimonials = await getAllTestimonialsAdmin()

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
          <p className="text-gray-400 text-sm mt-1">{testimonials.length} testimonial(s)</p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          <Plus size={16} />
          Nieuw
        </Link>
      </div>

      {testimonials.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
          <p className="text-gray-400">Nog geen testimonials.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex items-start gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-900 text-sm">{t.name}</span>
                  {t.role && <span className="text-gray-400 text-xs">— {t.role}</span>}
                  <span
                    className={`ml-auto inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                      t.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {t.published ? 'Gepubliceerd' : 'Concept'}
                  </span>
                </div>
                <div className="flex items-center gap-0.5 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={i < t.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}
                    />
                  ))}
                </div>
                <p className="text-gray-500 text-sm line-clamp-2">{t.content}</p>
              </div>
              <Link
                href={`/admin/testimonials/${t.id}`}
                className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors flex-shrink-0"
              >
                <Pencil size={15} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
