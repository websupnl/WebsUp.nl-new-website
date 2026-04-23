'use client'
import { Plus, Trash2, ChevronUp, ChevronDown, ExternalLink } from 'lucide-react'
import type { NavigationItemRow } from '@/types/database.types'

type NavItem = Omit<NavigationItemRow, 'created_at'> & { id: string; _isNew?: boolean }

interface Props {
  items: NavItem[]
  onChange: (items: NavItem[]) => void
}

function newItem(location: 'header' | 'footer', order: number): NavItem {
  return {
    id: `new-${Date.now()}-${Math.random()}`,
    tenant_id: '',
    label: '',
    url: '',
    type: 'internal',
    location,
    order_index: order,
    _isNew: true,
  }
}

function NavGroup({
  title,
  location,
  items,
  allItems,
  onChange,
}: {
  title: string
  location: 'header' | 'footer'
  items: NavItem[]
  allItems: NavItem[]
  onChange: (items: NavItem[]) => void
}) {
  const add = () => {
    const newItems = [...allItems, newItem(location, items.length)]
    onChange(newItems)
  }

  const remove = (id: string) => {
    onChange(allItems.filter((i) => i.id !== id))
  }

  const update = (id: string, patch: Partial<NavItem>) => {
    onChange(allItems.map((i) => (i.id === id ? { ...i, ...patch } : i)))
  }

  const move = (id: string, dir: -1 | 1) => {
    const groupItems = allItems.filter((i) => i.location === location)
    const idx = groupItems.findIndex((i) => i.id === id)
    const swapIdx = idx + dir
    if (swapIdx < 0 || swapIdx >= groupItems.length) return

    const updated = [...allItems]
    const aIdx = updated.findIndex((i) => i.id === groupItems[idx].id)
    const bIdx = updated.findIndex((i) => i.id === groupItems[swapIdx].id)
    ;[updated[aIdx], updated[bIdx]] = [updated[bIdx], updated[aIdx]]
    updated[aIdx] = { ...updated[aIdx], order_index: idx }
    updated[bIdx] = { ...updated[bIdx], order_index: swapIdx }
    onChange(updated)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-600">{title}</h3>
        <button
          type="button"
          onClick={add}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-700 transition-colors"
        >
          <Plus size={13} />
          Item toevoegen
        </button>
      </div>

      {items.length === 0 ? (
        <div className="text-sm text-gray-400 py-4 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
          Geen menu-items — klik op &ldquo;Item toevoegen&rdquo;
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 border border-gray-100"
            >
              {/* Order buttons */}
              <div className="flex flex-col gap-0.5">
                <button
                  type="button"
                  onClick={() => move(item.id, -1)}
                  disabled={idx === 0}
                  className="p-0.5 text-gray-400 hover:text-gray-700 disabled:opacity-30 transition-colors"
                >
                  <ChevronUp size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => move(item.id, 1)}
                  disabled={idx === items.length - 1}
                  className="p-0.5 text-gray-400 hover:text-gray-700 disabled:opacity-30 transition-colors"
                >
                  <ChevronDown size={13} />
                </button>
              </div>

              {/* Label */}
              <input
                type="text"
                value={item.label}
                onChange={(e) => update(item.id, { label: e.target.value })}
                placeholder="Label"
                className="w-28 px-2.5 py-1.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
              />

              {/* URL */}
              <input
                type="text"
                value={item.url}
                onChange={(e) => update(item.id, { url: e.target.value })}
                placeholder="/pagina of https://..."
                className="flex-1 px-2.5 py-1.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
              />

              {/* Type toggle */}
              <button
                type="button"
                onClick={() =>
                  update(item.id, {
                    type: item.type === 'internal' ? 'external' : 'internal',
                  })
                }
                title={item.type === 'external' ? 'Extern (nieuw tabblad)' : 'Intern'}
                className={`p-1.5 rounded-lg transition-colors ${
                  item.type === 'external'
                    ? 'bg-amber-100 text-amber-600'
                    : 'bg-gray-100 text-gray-400 hover:text-gray-600'
                }`}
              >
                <ExternalLink size={13} />
              </button>

              {/* Delete */}
              <button
                type="button"
                onClick={() => remove(item.id)}
                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function NavigatieSection({ items, onChange }: Props) {
  const headerItems = items
    .filter((i) => i.location === 'header')
    .sort((a, b) => a.order_index - b.order_index)

  const footerItems = items
    .filter((i) => i.location === 'footer')
    .sort((a, b) => a.order_index - b.order_index)

  return (
    <div className="space-y-8">
      <NavGroup
        title="Header navigatie"
        location="header"
        items={headerItems}
        allItems={items}
        onChange={onChange}
      />
      <div className="border-t border-gray-100 pt-6">
        <NavGroup
          title="Footer navigatie"
          location="footer"
          items={footerItems}
          allItems={items}
          onChange={onChange}
        />
      </div>
      <p className="text-xs text-gray-400">
        Tip: gebruik <code className="bg-gray-100 px-1 rounded">/pagina</code> voor interne links,{' '}
        <code className="bg-gray-100 px-1 rounded">https://...</code> voor externe links (oranje icoon).
      </p>
    </div>
  )
}
