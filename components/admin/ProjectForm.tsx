'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, Trash2, Plus, X } from 'lucide-react'
import { slugify } from '@/lib/utils'
import { deleteProject, saveProject } from '@/lib/actions/projects.actions'
import { useToast } from '@/hooks/useToast'
import MediaUploader from './MediaUploader'
import TiptapEditor from './TiptapEditor'
import { PortfolioProject } from '@/lib/projects/default-projects'

interface Props {
  project?: PortfolioProject
  mode: 'create' | 'edit'
}

function isPersistedProjectId(value?: string | null) {
  return Boolean(
    value &&
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
  )
}

export default function ProjectForm({ project, mode }: Props) {
  const router = useRouter()
  const { show, startNavigation } = useToast()
  const persistedProject = isPersistedProjectId(project?.id)

  const [title, setTitle] = useState(project?.title ?? '')
  const [slug, setSlug] = useState(project?.slug ?? '')
  const [category, setCategory] = useState(project?.category ?? '')
  const [excerpt, setExcerpt] = useState(project?.excerpt ?? '')
  const [content, setContent] = useState(project?.content ?? '')
  const [imageUrl, setImageUrl] = useState(project?.image_url ?? '')
  const [websiteUrl, setWebsiteUrl] = useState(project?.website_url ?? '')
  const [highlights, setHighlights] = useState<string[]>(
    project?.highlights?.length ? project.highlights : ['']
  )
  const [featured, setFeatured] = useState(project?.featured ?? false)
  const [published, setPublished] = useState(project?.published ?? true)
  const [sortOrder, setSortOrder] = useState(project?.sort_order ?? 10)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleTitleChange = (value: string) => {
    setTitle(value)
    if (mode === 'create') {
      setSlug(slugify(value))
    }
  }

  const updateHighlight = (index: number, value: string) => {
    setHighlights((current) => current.map((item, itemIndex) => (itemIndex === index ? value : item)))
  }

  const addHighlight = () => {
    setHighlights((current) => [...current, ''])
  }

  const removeHighlight = (index: number) => {
    setHighlights((current) => {
      if (current.length === 1) return ['']
      return current.filter((_, itemIndex) => itemIndex !== index)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await saveProject({
      id: project?.id,
      title: title.trim(),
      slug: (slug.trim() || slugify(title.trim())).trim(),
      category: category.trim(),
      excerpt: excerpt.trim(),
      content,
      image_url: imageUrl.trim(),
      website_url: websiteUrl.trim() || null,
      highlights: highlights.map((item) => item.trim()).filter(Boolean),
      featured,
      published,
      sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
    })

    if (!result.success) {
      setError(result.error)
      setLoading(false)
      return
    }

    show(mode === 'create' ? 'Project succesvol aangemaakt.' : 'Project succesvol opgeslagen.')
    startNavigation('/admin/projecten')
    router.push('/admin/projecten')
    router.refresh()
  }

  const handleDelete = async () => {
    if (!project || !persistedProject || !confirm(`"${project.title}" verwijderen?`)) return

    setLoading(true)
    setError('')
    const result = await deleteProject(project.id, project.slug)

    if (!result.success) {
      setError(result.error)
      setLoading(false)
      return
    }

    show('Project succesvol verwijderd.')
    startNavigation('/admin/projecten')
    router.push('/admin/projecten')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          {mode === 'create' ? 'Nieuw project' : 'Project bewerken'}
        </h1>
        <div className="flex items-center gap-2">
          {mode === 'edit' && persistedProject && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
              title="Verwijderen"
            >
              <Trash2 size={18} />
            </button>
          )}
          <button
            type="submit"
            disabled={loading || !title || !slug}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            <Save size={16} />
            {loading ? 'Opslaan...' : 'Opslaan'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-red-600 text-sm">
          {error}
        </div>
      )}

      {mode === 'edit' && !persistedProject && (
        <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-amber-700 text-sm">
          Dit project komt nog uit de standaardlijst. Bij opslaan wordt het een echt database-item.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Titel *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Bijv. Website voor Verkeersschool Haak"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Slug *</label>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm">/projecten/</span>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="verkeersschool-haak"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Categorie *</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Rijschool"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Korte beschrijving *</label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                placeholder="Korte samenvatting voor op de projectenpagina"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
            <label className="block text-sm font-medium text-gray-700 mb-3">Projectomschrijving *</label>
            <TiptapEditor content={content} onChange={setContent} />
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-700">Highlights</h2>
              <button
                type="button"
                onClick={addHighlight}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Plus size={14} />
                Highlight toevoegen
              </button>
            </div>

            <div className="space-y-3">
              {highlights.map((item, index) => (
                <div key={`${index}-${project?.id ?? 'new'}`} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateHighlight(index, e.target.value)}
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Bijv. Mobielvriendelijk en eenvoudig beheer"
                  />
                  <button
                    type="button"
                    onClick={() => removeHighlight(index)}
                    className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Verwijderen"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-white rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] space-y-4">
            <h2 className="text-sm font-semibold text-gray-700">Publicatie</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Sorteervolgorde</label>
                <input
                  type="number"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  min={0}
                  step={10}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Live URL</label>
                <input
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="https://..."
                />
              </div>
            </div>

            <label className="flex items-center justify-between gap-3 cursor-pointer">
              <span className="text-sm text-gray-700">Uitgelicht project</span>
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4"
              />
            </label>

            <label className="flex items-center justify-between gap-3 cursor-pointer">
              <span className="text-sm text-gray-700">Gepubliceerd</span>
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="w-4 h-4"
              />
            </label>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Projectafbeelding</h2>
            <MediaUploader
              value={imageUrl}
              onChange={setImageUrl}
              accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
              maxSizeMB={6}
            />
          </div>
        </div>
      </div>
    </form>
  )
}