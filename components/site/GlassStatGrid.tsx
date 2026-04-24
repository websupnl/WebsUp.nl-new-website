import type { LucideIcon } from 'lucide-react'
import GradientIcon from '@/components/site/GradientIcon'

interface GlassStatItem {
  icon?: LucideIcon
  value: string
  label: string
}

interface GlassStatGridProps {
  items: GlassStatItem[]
  className?: string
}

export default function GlassStatGrid({ items, className = '' }: GlassStatGridProps) {
  return (
    <div className={`mt-7 grid gap-3 sm:grid-cols-3 ${className}`.trim()}>
      {items.map(({ icon: Icon, value, label }) => (
        <div key={`${value}-${label}`} className="hero-glass-stat">
          {Icon ? <GradientIcon icon={Icon} size="sm" /> : null}
          <div>
            <div className="text-sm font-semibold leading-none text-white">{value}</div>
            <div className="mt-0.5 text-xs text-white/55">{label}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
