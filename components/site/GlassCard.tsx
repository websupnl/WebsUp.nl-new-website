import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  variant?: 'default' | 'orange' | 'light'
  className?: string
  padding?: string
}

/**
 * Liquid glass card, gebruik ALLEEN voor:
 *: Trust badges in hero (pill bovenaan headline)
 *: Floating statistieken/review badge in hero
 *: Contact info blokken (reactietijd, vrijblijvend, eerlijk advies)
 *: Nav bij scrollen
 *: "Niet zeker welke dienst past?" kaart in mega menu
 *: Drie vertrouwensitems in CTA-sectie boven footer
 *
 * NIET voor: normale service cards, FAQ items, project cards, werkwijze blokken.
 */
export function GlassCard({
  children,
  variant = 'default',
  className = '',
  padding = 'p-4',
}: GlassCardProps) {
  const styles = {
    default: 'bg-white/[0.075] border border-white/14 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_18px_44px_rgba(0,0,0,0.18)]',
    orange: 'bg-orange-500/10 border border-orange-500/24 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_18px_44px_rgba(0,0,0,0.16)]',
    light: 'bg-white/72 border border-white/80 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_18px_44px_rgba(15,23,42,0.08)]',
  }
  return (
    <div className={cn('relative overflow-hidden rounded-2xl', styles[variant], padding, className)}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-2xl bg-gradient-to-b from-white/14 to-transparent" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export default GlassCard
