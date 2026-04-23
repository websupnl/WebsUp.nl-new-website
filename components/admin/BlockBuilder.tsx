'use client'

import { useState, useEffect, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import { savePublicationBlocks, BlockInput } from '@/lib/actions/publications.actions'
import { Plus, Trash2, ChevronUp, ChevronDown, Save } from 'lucide-react'
import { PublicationBlock } from '@/types/database.types'
import { useToast } from '@/hooks/useToast'
import { Skeleton, Spinner } from '@/components/ui/skeleton'
import { adminButtonClass } from '@/components/admin/AdminPageLayout'

interface Props {
  publicationId?: string
  initialBlocks?: BlockInput[]
  onBlocksChange?: (blocks: BlockInput[]) => void
}

const TYPE_LABELS: Record<string, string> = {
  text: 'Tekst',
  features: 'Kenmerken',
  cta: 'Call-to-action',
}

const TYPE_COLORS: Record<string, string> = {
  text: 'bg-gray-100 text-gray-600',
  features: 'bg-orange-100 text-orange-700',
  cta: 'bg-orange-100 text-orange-700',
}

export default function BlockBuilder({ publicationId, initialBlocks, onBlocksChange }: Props) {
  const supabase = useMemo(() => createClient(), [])
  const { show } = useToast()
  const [blocks, setBlocks] = useState<BlockInput[]>(initialBlocks ?? [])
  const [loading, setLoading] = useState(Boolean(publicationId))
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [showTypeMenu, setShowTypeMenu] = useState(false)

  const setLocalBlocks = (nextBlocks: React.SetStateAction<BlockInput[]>) => {
    setBlocks((prevBlocks) => {
      const resolvedBlocks =
        typeof nextBlocks === 'function'
          ? (nextBlocks as (prev: BlockInput[]) => BlockInput[])(prevBlocks)
          : nextBlocks

      return resolvedBlocks
    })
  }

  useEffect(() => {
    onBlocksChange?.(blocks)
  }, [blocks, onBlocksChange])

  useEffect(() => {
    if (!publicationId) return

    supabase
      .from('publication_blocks')
      .select('*')
      .eq('publication_id', publicationId)
      .order('order_index', { ascending: true })
      .then(({ data }) => {
        if (data) {
          setLocalBlocks(
            data.map((b: PublicationBlock) => ({
              type: b.type,
              title: b.title ?? '',
              content: b.content ?? '',
              order_index: b.order_index,
            }))
          )
        }
        setLoading(false)
      })
  }, [publicationId, supabase])

  const addBlock = (type: 'text' | 'features' | 'cta') => {
    setLocalBlocks((prev) => [
      ...prev,
      { type, title: '', content: '', order_index: prev.length },
    ])
    setShowTypeMenu(false)
  }

  const updateBlock = (index: number, field: 'title' | 'content', value: string) => {
    setLocalBlocks((prev) =>
      prev.map((b, i) => (i === index ? { ...b, [field]: value } : b))
    )
  }

  const removeBlock = (index: number) => {
    setLocalBlocks((prev) => prev.filter((_, i) => i !== index))
  }

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newBlocks = [...blocks]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= newBlocks.length) return
    ;[newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]]
    setLocalBlocks(newBlocks)
  }

  const handleSave = async () => {
    if (!publicationId) return
    setSaving(true)
    setError('')
    const result = await savePublicationBlocks(
      publicationId,
      blocks.map((b, i) => ({ ...b, order_index: i }))
    )
    if (result.success) {
      setSaved(true)
      show('Blokken succesvol opgeslagen.')
      setTimeout(() => setSaved(false), 2000)
    } else {
      setError(result.error)
      show(`Opslaan mislukt: ${result.error}`, 'error')
    }
    setSaving(false)
  }

  if (loading) {
    return <Skeleton className="h-40 w-full" />
  }

  return (
    <div className="space-y-4">
      {/* Blocks list */}
      {blocks.length === 0 && (
        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center">
          <p className="text-gray-400 text-sm mb-1">Nog geen blokken toegevoegd.</p>
          <p className="text-gray-400 text-xs">Voeg een blok toe via de knop hieronder.</p>
        </div>
      )}

      {blocks.map((block, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden"
        >
          {/* Block header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-xs font-mono">#{index + 1}</span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${TYPE_COLORS[block.type]}`}>
                {TYPE_LABELS[block.type]}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => moveBlock(index, 'up')}
                disabled={index === 0}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-30 transition-colors"
              >
                <ChevronUp size={15} />
              </button>
              <button
                type="button"
                onClick={() => moveBlock(index, 'down')}
                disabled={index === blocks.length - 1}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-30 transition-colors"
              >
                <ChevronDown size={15} />
              </button>
              <button
                type="button"
                onClick={() => removeBlock(index)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>

          {/* Block fields */}
          <div className="p-4 space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Titel</label>
              <input
                type="text"
                value={block.title ?? ''}
                onChange={(e) => updateBlock(index, 'title', e.target.value)}
                placeholder={block.type === 'cta' ? 'Bijv. Interesse in deze publicatie?' : 'Bloktitel'}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                {block.type === 'features' ? 'Kenmerken (één per regel)' : 'Inhoud'}
              </label>
              <textarea
                value={block.content ?? ''}
                onChange={(e) => updateBlock(index, 'content', e.target.value)}
                rows={block.type === 'features' ? 6 : 4}
                placeholder={
                  block.type === 'features'
                    ? 'Kenmerk 1\nKenmerk 2\nKenmerk 3'
                    : block.type === 'cta'
                    ? 'Beschrijving onder de CTA-kop'
                    : 'Tekstinhoud van dit blok...'
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all resize-none"
              />
            </div>
          </div>
        </div>
      ))}

      {/* Actions row */}
      <div className="flex items-center justify-between pt-2">
        {/* Add block */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowTypeMenu(!showTypeMenu)}
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors"
          >
            <Plus size={15} />
            Blok toevoegen
          </button>

          {showTypeMenu && (
            <div className="absolute top-full left-0 mt-1.5 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-10 min-w-[180px]">
              {(['text', 'features', 'cta'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => addBlock(type)}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <span className={`w-2 h-2 rounded-full ${type === 'text' ? 'bg-gray-400' : 'bg-orange-500'}`} />
                  {TYPE_LABELS[type]}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Save */}
        <div className="flex items-center gap-3">
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button
            type="button"
            onClick={handleSave}
            disabled={!publicationId || saving}
            className={adminButtonClass}
          >
            <Save size={15} />
            {saving
              ? <Spinner label="Opslaan..." />
              : saved
              ? 'Opgeslagen!'
              : publicationId
              ? 'Blokken opslaan'
              : 'Sla eerst publicatie op'}
          </button>
        </div>
      </div>
    </div>
  )
}
