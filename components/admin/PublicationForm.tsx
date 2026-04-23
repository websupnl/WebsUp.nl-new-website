'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { deletePublication, savePublication, BlockInput } from '@/lib/actions/publications.actions'
import { slugify } from '@/lib/utils'
import { Save, Trash2, Layers } from 'lucide-react'
import { Publication } from '@/types/database.types'
import BlockBuilder from './BlockBuilder'
import { useToast } from '@/hooks/useToast'
import MediaUploader from './MediaUploader'
import { Spinner } from '@/components/ui/skeleton'
import { adminButtonClass, adminDangerButtonClass } from '@/components/admin/AdminPageLayout'

interface Props {
  publication?: Publication
  mode: 'create' | 'edit'
}

type Tab = 'info' | 'blocks'

export default function PublicationForm({ publication, mode }: Props) {
  const router = useRouter()
  const { show, startNavigation } = useToast()

  const [tab, setTab] = useState<Tab>('info')
  const [title, setTitle] = useState(publication?.title ?? '')
  const [slug, setSlug] = useState(publication?.slug ?? '')
  const [excerpt, setExcerpt] = useState(publication?.excerpt ?? '')
  const [flipUrl, setFlipUrl] = useState(publication?.flip_url ?? '')
  const [label, setLabel] = useState(publication?.label ?? '')
  const [imageUrl, setImageUrl] = useState(publication?.image_url ?? '')
  const [published, setPublished] = useState(publication?.published ?? false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [blocks, setBlocks] = useState<BlockInput[]>([])

  const handleTitleChange = (value: string) => {
    setTitle(value)
    if (mode === 'create') {
      setSlug(slugify(value))
    }
  }

  const handleSave = async () => {
    if (!title || !slug) return

    setLoading(true)
    setError('')

    const result = await savePublication({
      id: publication?.id,
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim() || null,
      label: label.trim() || null,
      flip_url: flipUrl.trim() || null,
      image_url: imageUrl || null,
      published,
    })

    if (!result.success) {
      setError(result.error)
      setLoading(false)
      return
    }

    show(mode === 'create' ? 'Publicatie succesvol aangemaakt.' : 'Publicatie succesvol opgeslagen.')
    startNavigation(mode === 'create' ? `/admin/publicaties/${result.id}` : '/admin/publicaties')
    router.push(mode === 'create' ? `/admin/publicaties/${result.id}` : '/admin/publicaties')
    router.refresh()
  }

  const handleDelete = async () => {
    if (!publication || !confirm(`"${publication.title}" verwijderen? Dit kan niet ongedaan worden gemaakt.`)) return

    setLoading(true)
    setError('')
    const result = await deletePublication(publication.id, publication.slug)

    if (!result.success) {
      setError(result.error)
      setLoading(false)
      return
    }

    show('Publicatie succesvol verwijderd.')
    startNavigation('/admin/publicaties')
    router.push('/admin/publicaties')
    router.refresh()
  }

  const tabs: { key: Tab; label: string; icon?: React.ReactNode }[] = [
    { key: 'info', label: 'Algemene info' },
    { key: 'blocks', label: 'Content blokken', icon: <Layers size={15} /> },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {mode === 'create' ? 'Nieuwe publicatie' : 'Publicatie bewerken'}
          </h1>
          {publication && (
            <p className="text-gray-400 text-xs mt-1">/publicaties/{publication.slug}</p>
          )}
        </div>
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
          {tab !== 'blocks' && (
            <button
              type="button"
              onClick={handleSave}
              disabled={loading || !title || !slug}
              className={adminButtonClass}
            >
              <Save size={16} />
              {loading ? <Spinner label="Opslaan..." /> : 'Opslaan'}
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-red-600 text-sm">
          {error}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
        <div className="flex border-b border-gray-100">
          {tabs.map(({ key, label, icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
                tab === key
                  ? 'border-slate-900 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {tab === 'info' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
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
                      placeholder="Bijv. Financiele Strategieen 2025"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Slug (URL) <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-sm flex-shrink-0">/publicaties/</span>
                      <input
                        type="text"
                        required
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                        placeholder="financiele-strategieen-2025"
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
                      maxLength={300}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all resize-none"
                      placeholder="Korte samenvatting die op de detailpagina getoond wordt"
                    />
                    <p className="text-xs text-gray-400 mt-1 text-right">{excerpt.length}/300</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      FlipHTML5 viewer URL
                    </label>
                    <input
                      type="url"
                      value={flipUrl}
                      onChange={(e) => setFlipUrl(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                      placeholder="https://online.fliphtml5.com/xxxxx/xxxxx/"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Wordt ingebed als interactieve lezer op de publicatiepagina.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Label
                    </label>
                    <select
                      value={label}
                      onChange={(e) => setLabel(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                    >
                      <option value="">Geen label</option>
                      <option value="Binnenkort beschikbaar">Binnenkort beschikbaar</option>
                      <option value="Nieuwe editie">Nieuwe editie</option>
                      <option value="Nieuwe publicatie">Nieuwe publicatie</option>
                    </select>
                    <p className="text-xs text-gray-400 mt-1">
                      Deze badgetekst wordt getoond op de publicatiepagina.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <div className="bg-white rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4">Publicatiestatus</h3>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={published}
                        onChange={(e) => setPublished(e.target.checked)}
                      />
                      <div
                        className={`w-11 h-6 rounded-full transition-colors ${
                          published ? 'bg-slate-900' : 'bg-gray-200'
                        }`}
                      >
                        <div
                          className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                            published ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </div>
                    </div>
                    <span className="text-sm text-gray-700">
                      {published ? 'Gepubliceerd (zichtbaar op site)' : 'Concept (niet zichtbaar)'}
                    </span>
                  </label>
                </div>

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
          )}

          {tab === 'blocks' && (
            <div className="bg-white rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Content blokken
              </label>
              <BlockBuilder
                publicationId={publication?.id}
                initialBlocks={blocks}
                onBlocksChange={setBlocks}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
