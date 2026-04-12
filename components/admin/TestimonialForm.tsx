'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, Trash2, Star } from 'lucide-react'
import { Testimonial } from '@/types/database.types'
import { deleteTestimonial, saveTestimonial } from '@/lib/actions/testimonials.actions'
import { useToast } from '@/hooks/useToast'

interface Props {
  testimonial?: Testimonial
  mode: 'create' | 'edit'
}

export default function TestimonialForm({ testimonial, mode }: Props) {
  const router = useRouter()
  const { show, startNavigation } = useToast()

  const [name, setName] = useState(testimonial?.name ?? '')
  const [role, setRole] = useState(testimonial?.role ?? '')
  const [content, setContent] = useState(testimonial?.content ?? '')
  const [rating, setRating] = useState(testimonial?.rating ?? 5)
  const [avatarUrl, setAvatarUrl] = useState(testimonial?.avatar_url ?? '')
  const [published, setPublished] = useState(testimonial?.published ?? false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const payload = {
      name: name.trim(),
      role: role.trim() || null,
      content: content.trim(),
      rating,
      avatar_url: avatarUrl.trim() || null,
      published,
    }

    const result = await saveTestimonial({
      ...payload,
      id: testimonial?.id,
    })

    if (!result.success) {
      setError(result.error)
      setLoading(false)
      return
    }

    show(mode === 'create' ? 'Review succesvol aangemaakt.' : 'Review succesvol opgeslagen.')
    startNavigation('/admin/testimonials')
    router.push('/admin/testimonials')
    router.refresh()
  }

  const handleDelete = async () => {
    if (!testimonial || !confirm(`Testimonial van "${testimonial.name}" verwijderen?`)) return

    setLoading(true)
    setError('')
    const result = await deleteTestimonial(testimonial.id)

    if (!result.success) {
      setError(result.error)
      setLoading(false)
      return
    }

    show('Review succesvol verwijderd.')
    startNavigation('/admin/testimonials')
    router.push('/admin/testimonials')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          {mode === 'create' ? 'Nieuwe testimonial' : 'Testimonial bewerken'}
        </h1>
        <div className="flex items-center gap-2">
          {mode === 'edit' && (
            <button type="button" onClick={handleDelete} disabled={loading}
              className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors">
              <Trash2 size={18} />
            </button>
          )}
          <button type="submit" disabled={loading || !name || !content}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white text-sm font-semibold rounded-xl transition-colors">
            <Save size={16} />
            {loading ? 'Opslaan...' : 'Opslaan'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-red-600 text-sm">{error}</div>
      )}

      <div className="bg-white rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)] space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Naam *</label>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Jan de Vries" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Functie / bedrijf</label>
            <input type="text" value={role} onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="CEO, Acme B.V." />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Beoordeling *</label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} type="button" onClick={() => setRating(star)}>
                <Star size={24} className={star <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'} />
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-500">{rating}/5</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Testimonial *</label>
          <textarea required value={content} onChange={(e) => setContent(e.target.value)} rows={4}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Wat zegt de klant over uw diensten?" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Avatar URL (optioneel)</label>
          <input type="url" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://..." />
        </div>

        <div>
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <input type="checkbox" className="sr-only" checked={published} onChange={(e) => setPublished(e.target.checked)} />
              <div className={`w-11 h-6 rounded-full transition-colors ${published ? 'bg-blue-600' : 'bg-gray-200'}`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${published ? 'translate-x-6' : 'translate-x-1'}`} />
              </div>
            </div>
            <span className="text-sm text-gray-700">{published ? 'Gepubliceerd' : 'Concept'}</span>
          </label>
        </div>
      </div>
    </form>
  )
}
