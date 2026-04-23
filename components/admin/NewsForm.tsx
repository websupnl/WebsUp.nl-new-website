'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { saveNewsArticle, deleteNewsArticle } from '@/lib/actions/news.actions'
import TiptapEditor from './TiptapEditor'
import { slugify } from '@/lib/utils'
import { Save, Trash2 } from 'lucide-react'
import { NewsArticle } from '@/types/database.types'
import { useToast } from '@/hooks/useToast'
import MediaUploader from './MediaUploader'
import { Spinner } from '@/components/ui/skeleton'
import { adminButtonClass, adminDangerButtonClass } from '@/components/admin/AdminPageLayout'

interface Props {
  article?: NewsArticle
  mode: 'create' | 'edit'
}

export default function NewsForm({ article, mode }: Props) {
  const router = useRouter()
  const { show, startNavigation } = useToast()

  const [title, setTitle] = useState(article?.title ?? '')
  const [slug, setSlug] = useState(article?.slug ?? '')
  const [excerpt, setExcerpt] = useState(article?.excerpt ?? '')
  const [content, setContent] = useState(article?.content ?? '')
  const [imageUrl, setImageUrl] = useState(article?.image_url ?? '')
  const [status, setStatus] = useState<'draft' | 'published'>(article?.status ?? 'draft')
  const [publishedAt, setPublishedAt] = useState(
    article?.published_at ? article.published_at.slice(0, 10) : ''
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleTitleChange = (value: string) => {
    setTitle(value)
    if (mode === 'create') {
      setSlug(slugify(value))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const payload = {
      id: article?.id,
      title: title.trim(),
      slug: slug.trim() || slugify(title.trim()),
      excerpt: excerpt.trim() || null,
      content: content || null,
      image_url: imageUrl || null,
      status,
      published_at: status === 'published' ? (publishedAt ? new Date(publishedAt).toISOString() : new Date().toISOString()) : null,
    }

    const result = await saveNewsArticle(payload)

    if (!result.success) {
      setError(result.error)
      setLoading(false)
      return
    }

    show(mode === 'create' ? 'Artikel succesvol aangemaakt.' : 'Artikel succesvol opgeslagen.')
    startNavigation('/admin/nieuws')
    router.push('/admin/nieuws')
    router.refresh()
  }

  const handleDelete = async () => {
    if (!article || !confirm(`"${article.title}" verwijderen? Dit kan niet ongedaan worden gemaakt.`)) return

    setLoading(true)
    setError('')
    const result = await deleteNewsArticle(article.id, article.slug)

    if (!result.success) {
      setError(result.error)
      setLoading(false)
      return
    }

    show('Artikel succesvol verwijderd.')
    startNavigation('/admin/nieuws')
    router.push('/admin/nieuws')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          {mode === 'create' ? 'Nieuw artikel' : 'Artikel bewerken'}
        </h1>
        <div className="flex items-center gap-2">
          {mode === 'edit' && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className={adminDangerButtonClass}
              title="Verwijderen"
            >
              <Trash2 size={18} />
            </button>
          )}
          <button
            type="submit"
            disabled={loading || !title || !slug}
            className={adminButtonClass}
          >
            <Save size={16} />
            {loading ? <Spinner label="Opslaan..." /> : 'Opslaan'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-red-600 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Titel <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                placeholder="Bijv. De 5 trends in zakelijk Nederland voor 2025"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Slug (URL) <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm">/nieuws/</span>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                  placeholder="de-5-trends-2025"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Samenvatting (excerpt)
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all resize-none"
                placeholder="Korte samenvatting die op de overzichtspagina getoond wordt"
              />
            </div>
          </div>

          {/* Content editor */}
          <div className="bg-white rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Artikel inhoud
            </label>
            <TiptapEditor content={content} onChange={setContent} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Publish */}
          <div className="bg-white rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Publicatiestatus</h3>
            <div className="space-y-3 mb-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="draft"
                  checked={status === 'draft'}
                  onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">Concept (niet zichtbaar)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="published"
                  checked={status === 'published'}
                  onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">Gepubliceerd (zichtbaar op site)</span>
              </label>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">
                Publicatiedatum
              </label>
              <input
                type="date"
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
              />
              <p className="text-xs text-gray-500 mt-2">
                De publicatiedatum wordt ingesteld wanneer je het artikel op &lsquo;Gepubliceerd&rsquo; zet.
              </p>
            </div>
          </div>

          {/* Image upload */}
          <div className="bg-white rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Uitgelichte afbeelding</h3>

            <MediaUploader
              value={imageUrl}
              onChange={setImageUrl}
              accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml,image/x-icon,image/vnd.microsoft.icon"
              maxSizeMB={5}
            />
          </div>
        </div>
      </div>
    </form>
  )
}
