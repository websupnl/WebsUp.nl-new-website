import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('ds-skeleton rounded-[var(--radius-md)]', className)} />
}

export function Spinner({ className, label }: { className?: string; label?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <Loader2 size={16} className="animate-spin" aria-hidden="true" />
      {label && <span>{label}</span>}
    </span>
  )
}
