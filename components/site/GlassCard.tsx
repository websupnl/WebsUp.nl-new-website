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
    default: 'bg-white/5 border border-white/10 backdrop-blur-md',
    orange: 'bg-orange-500/8 border border-orange-500/20 backdrop-blur-md',
    light: 'bg-white/70 border border-white/80 backdrop-blur-md',
  }
  return (
    <div className={cn('rounded-2xl', styles[variant], padding, className)}>
      {children}
    </div>
  )
}

export default GlassCard
