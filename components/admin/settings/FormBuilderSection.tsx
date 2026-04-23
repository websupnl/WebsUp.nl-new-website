'use client'

import { useState } from 'react'
import { Plus, Trash2, GripVertical, ChevronDown, ChevronUp } from 'lucide-react'
import type { FormRow, FormFieldDef } from '@/types/database.types'

type FormDraft = Omit<FormRow, 'tenant_id' | 'created_at' | 'updated_at'>

interface Props {
  forms: FormDraft[]
  onChange: (forms: FormDraft[]) => void
}

const FIELD_TYPES: Array<{ value: FormFieldDef['type']; label: string }> = [
  { value: 'text',     label: 'Tekst' },
  { value: 'email',    label: 'E-mail' },
  { value: 'phone',    label: 'Telefoon' },
  { value: 'textarea', label: 'Tekstvak' },
  { value: 'select',   label: 'Keuzemenu' },
]

function uid() {
  return Math.random().toString(36).slice(2, 10)
}

function FieldRow({
  field,
  onUpdate,
  onRemove,
}: {
  field: FormFieldDef
  onUpdate: (patch: Partial<FormFieldDef>) => void
  onRemove: () => void
}) {
  return (
    <div className="flex items-start gap-2 bg-white rounded-xl border border-gray-100 px-3 py-2.5">
      <GripVertical size={14} className="text-gray-300 mt-2.5 shrink-0" />
      <div className="flex-1 grid grid-cols-12 gap-2">
        {/* Type */}
        <select
          value={field.type}
          onChange={(e) => onUpdate({ type: e.target.value as FormFieldDef['type'] })}
          className="col-span-3 px-2 py-1.5 border border-gray-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {FIELD_TYPES.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
        {/* Label */}
        <input
          type="text"
          value={field.label}
          onChange={(e) => onUpdate({ label: e.target.value })}
          placeholder="Label"
          className="col-span-4 px-2 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* Placeholder */}
        <input
          type="text"
          value={field.placeholder ?? ''}
          onChange={(e) => onUpdate({ placeholder: e.target.value })}
          placeholder="Placeholder"
          className="col-span-4 px-2 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* Required toggle */}
        <div className="col-span-1 flex items-center justify-center">
          <input
            type="checkbox"
            checked={field.required}
            onChange={(e) => onUpdate({ required: e.target.checked })}
            title="Verplicht veld"
            className="w-4 h-4 rounded accent-blue-600 cursor-pointer"
          />
        </div>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="mt-1.5 p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"
      >
        <Trash2 size={13} />
      </button>
    </div>
  )
}

function FormCard({
  form,
  onUpdate,
  onRemove,
}: {
  form: FormDraft
  onUpdate: (patch: Partial<FormDraft>) => void
  onRemove: () => void
}) {
  const [open, setOpen] = useState(true)

  const addField = () => {
    onUpdate({
      fields: [
        ...form.fields,
        { id: uid(), type: 'text', label: '', placeholder: '', required: false },
      ],
    })
  }

  const updateField = (id: string, patch: Partial<FormFieldDef>) => {
    onUpdate({
      fields: form.fields.map((f) => (f.id === id ? { ...f, ...patch } : f)),
    })
  }

  const removeField = (id: string) => {
    onUpdate({ fields: form.fields.filter((f) => f.id !== id) })
  }

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border-b border-gray-100">
        <input
          type="text"
          value={form.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          placeholder="Formuliernaam"
          className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="p-1.5 text-gray-400 hover:text-gray-700 transition-colors"
          >
            {open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {open && (
        <div className="p-4 space-y-3">
          {/* Email destination */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Insturen naar e-mailadres
            </label>
            <input
              type="email"
              value={form.email_to ?? ''}
              onChange={(e) => onUpdate({ email_to: e.target.value })}
              placeholder="ontvanger@bedrijf.nl"
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Field header */}
          <div className="grid grid-cols-12 gap-2 px-9 text-xs text-gray-400 font-medium">
            <span className="col-span-3">Type</span>
            <span className="col-span-4">Label</span>
            <span className="col-span-4">Placeholder</span>
            <span className="col-span-1 text-center" title="Verplicht">*</span>
          </div>

          {/* Fields */}
          <div className="space-y-2">
            {form.fields.map((field) => (
              <FieldRow
                key={field.id}
                field={field}
                onUpdate={(patch) => updateField(field.id, patch)}
                onRemove={() => removeField(field.id)}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={addField}
            className="w-full flex items-center justify-center gap-2 py-2 text-sm text-blue-600 hover:text-blue-700 border border-dashed border-blue-200 hover:border-blue-400 rounded-xl transition-colors"
          >
            <Plus size={14} />
            Veld toevoegen
          </button>
        </div>
      )}
    </div>
  )
}

export default function FormBuilderSection({ forms, onChange }: Props) {
  const addForm = () => {
    onChange([
      ...forms,
      {
        id: undefined as unknown as string,
        name: 'Nieuw formulier',
        email_to: '',
        fields: [
          { id: uid(), type: 'text',  label: 'Naam',    placeholder: 'Uw naam',    required: true },
          { id: uid(), type: 'email', label: 'E-mail',  placeholder: 'uw@email.nl', required: true },
          { id: uid(), type: 'textarea', label: 'Bericht', placeholder: 'Uw bericht...', required: false },
        ],
      },
    ])
  }

  const updateForm = (idx: number, patch: Partial<FormDraft>) => {
    onChange(forms.map((f, i) => (i === idx ? { ...f, ...patch } : f)))
  }

  const removeForm = (idx: number) => {
    onChange(forms.filter((_, i) => i !== idx))
  }

  return (
    <div className="space-y-4">
      {forms.map((form, idx) => (
        <FormCard
          key={form.id ?? `new-${idx}`}
          form={form}
          onUpdate={(patch) => updateForm(idx, patch)}
          onRemove={() => removeForm(idx)}
        />
      ))}

      {forms.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <p className="text-sm">Geen formulieren aangemaakt</p>
        </div>
      )}

      <button
        type="button"
        onClick={addForm}
        className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
      >
        <Plus size={15} />
        Formulier toevoegen
      </button>
    </div>
  )
}