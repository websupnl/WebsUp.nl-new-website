import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type GradientIconSize = 'sm' | 'md' | 'lg'

const sizeClasses: Record<GradientIconSize, { outer: string; inner: string; icon: number }> = {
  sm: { outer: 'h-10 w-10 rounded-lg', inner: 'rounded-[0.45rem]', icon: 18 },
  md: { outer: 'h-11 w-11 rounded-lg', inner: 'rounded-[0.45rem]', icon: 20 },
  lg: { outer: 'h-14 w-14 rounded-[1.25rem]', inner: 'rounded-[1.15rem]', icon: 24 },
}

interface GradientIconProps {
  icon: LucideIcon
  size?: GradientIconSize
  className?: string
  iconClassName?: string
  innerClassName?: string
}

export default function GradientIcon({
  icon: Icon,
  size = 'md',
  className,
  iconClassName,
  innerClassName,
}: GradientIconProps) {
  const sizing = sizeClasses[size]

  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center p-[1px] shadow-lg shadow-pink-500/10 transition-transform duration-300 group-hover:scale-110',
        sizing.outer,
        className
      )}
      style={{ background: 'linear-gradient(135deg, #f97316 0%, #ec4899 50%, #a78bfa 100%)' }}
    >
      <div className={cn('flex h-full w-full items-center justify-center bg-white', sizing.inner, innerClassName)}>
        <Icon
          size={sizing.icon}
          strokeWidth={1.75}
          className={cn('text-slate-900 transition-colors group-hover:text-orange-500', iconClassName)}
        />
      </div>
    </div>
  )
}
