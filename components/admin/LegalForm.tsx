'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save } from 'lucide-react'
import { saveLegalPage } from '@/lib/actions/legal.actions'
import TiptapEditor from './TiptapEditor'
import { useToast } from '@/hooks/useToast'
import type { LegalPage } from '@/types/database.types'

const SLUGS = {
  'algemene-voorwaarden': 'Algemene Voorwaarden',
  privacybeleid: 'Privacybeleid',
  cookiebeleid: 'Cookiebeleid',
} as const

interface Props {
  page: LegalPage | null
  slug: 'algemene-voorwaarden' | 'privacybeleid' | 'cookiebeleid'
}

export default function LegalForm({ page, slug }: Props) {
  const router = useRouter()
  const { show } = useToast()

  const [title, setTitle] = useState(page?.title ?? SLUGS[slug])
  const [version, setVersion] = useState(page?.version ?? '')
  const [content, setContent] = useState(page?.content ?? '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await saveLegalPage({ slug, title, content, version })

    if (!result.success) {
      setError(result.error)
      setLoading(false)
      return
    }

    show('Pagina opgeslagen.')
    router.refresh()
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Paginatitel</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Versie</label>
          <input
            type="text"
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            placeholder="bijv. 2.0 — mei 2026"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Inhoud</label>
        <div className="rounded-xl border border-slate-200 bg-white">
          <TiptapEditor content={content} onChange={setContent} />
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 pt-4">
        <a
          href={`/${slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-slate-500 hover:text-slate-800 hover:underline"
        >
          Bekijk live pagina →
        </a>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          <Save size={15} />
          {loading ? 'Opslaan...' : 'Opslaan'}
        </button>
      </div>
    </form>
  )
}
