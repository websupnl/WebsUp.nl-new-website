'use client'

import type { ModuleRow } from '@/types/database.types'

type ModuleItem = Pick<ModuleRow, 'key' | 'enabled' | 'label'>

interface Props {
  modules: ModuleItem[]
  onChange: (modules: ModuleItem[]) => void
}

const MODULE_META: Record<string, { icon: string; description: string }> = {
  blog:         { icon: '📝', description: 'Blog / nieuwsoverzicht sectie' },
  testimonials: { icon: '💬', description: 'Klantbeoordelingen en reviews' },
  cta:          { icon: '🚀', description: 'Call-to-action sectie op homepage' },
  contact_form: { icon: '📬', description: 'Contactformulier pagina' },
}

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      role="switch"
      aria-checked={enabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        enabled ? 'bg-blue-600' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  )
}

export default function ModulesSection({ modules, onChange }: Props) {
  const toggle = (key: string) => {
    onChange(
      modules.map((m) =>
        m.key === key ? { ...m, enabled: !m.enabled } : m
      )
    )
  }

  return (
    <div className="space-y-3">
      {modules.map((mod) => {
        const meta = MODULE_META[mod.key] ?? { icon: '⚙️', description: '' }
        return (
          <div
            key={mod.key}
            className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${
              mod.enabled
                ? 'bg-blue-50/50 border-blue-100'
                : 'bg-gray-50 border-gray-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{meta.icon}</span>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {mod.label ?? mod.key}
                </p>
                {meta.description && (
                  <p className="text-xs text-gray-400 mt-0.5">{meta.description}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs font-medium ${mod.enabled ? 'text-blue-600' : 'text-gray-400'}`}>
                {mod.enabled ? 'Aan' : 'Uit'}
              </span>
              <Toggle enabled={mod.enabled} onChange={() => toggle(mod.key)} />
            </div>
          </div>
        )
      })}

      {modules.length === 0 && (
        <p className="text-sm text-gray-400 text-center py-6">
          Geen modules gevonden — run schema_v2.sql om de standaard modules aan te maken.
        </p>
      )}
    </div>
  )
}
