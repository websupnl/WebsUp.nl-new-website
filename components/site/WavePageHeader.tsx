import { ReactNode } from 'react'
import { PageHero } from '@/components/site/design-system'

interface WavePageHeaderProps {
  badge?: string
  title: string
  titleHighlight?: string
  subtitle?: string
  children?: ReactNode
  heightClass?: string
}

const stripFinalDot = (value: string) => value.replace(/\.+\s*$/, '')

export default function WavePageHeader({
  badge,
  title,
  titleHighlight,
  subtitle,
  children,
  heightClass = 'min-h-[58vh]',
}: WavePageHeaderProps) {
  return (
    <PageHero
      badge={badge}
      title={stripFinalDot(title)}
      highlight={titleHighlight ? stripFinalDot(titleHighlight) : undefined}
      subtitle={subtitle}
      actions={children}
      heightClass={heightClass}
    />
  )
}
