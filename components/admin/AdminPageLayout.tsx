import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function AdminPageLayout({
  title,
  description,
  actions,
  children,
  className,
}: {
  title: string
  description?: string
  actions?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('mx-auto max-w-5xl space-y-8', className)}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--ink)]">{title}</h1>
          {description && <p className="mt-1 text-sm text-[var(--muted)]">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
      {children}
    </div>
  )
}

export function AdminCard({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('rounded-[var(--radius-md)] border border-[var(--rule)] bg-white p-5 shadow-[var(--shadow-sm)]', className)}>
      {children}
    </div>
  )
}

export function AdminField({
  label,
  required,
  hint,
  children,
}: {
  label: string
  required?: boolean
  hint?: string
  children: ReactNode
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-[var(--ink-2)]">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-[var(--muted-2)]">{hint}</p>}
    </div>
  )
}

export const adminInputClass =
  'w-full rounded-[var(--radius-sm)] border border-[var(--rule)] px-4 py-2.5 text-sm transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-400'

export const adminButtonClass =
  'btn-dark px-5 py-2.5 text-sm'

export const adminDangerButtonClass =
  'inline-flex items-center justify-center rounded-[var(--radius-sm)] p-2 text-[var(--muted-2)] transition-colors hover:bg-red-50 hover:text-red-600'
