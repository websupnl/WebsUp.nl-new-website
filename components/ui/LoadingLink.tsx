'use client'

import Link from 'next/link'
import type { LinkProps } from 'next/link'
import { MouseEvent, PropsWithChildren } from 'react'
import { useAppFeedback } from '@/components/ui/AppFeedbackProvider'

type LoadingLinkProps = PropsWithChildren<
  LinkProps & {
    className?: string
    target?: string
    title?: string
    onClick?: (event: MouseEvent<HTMLAnchorElement>) => void
  }
>

export default function LoadingLink({
  children,
  onClick,
  target,
  ...props
}: LoadingLinkProps) {
  const { startNavigation } = useAppFeedback()

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)

    if (
      event.defaultPrevented ||
      target === '_blank' ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return
    }

    startNavigation(typeof props.href === 'string' ? props.href : props.href.toString())
  }

  return (
    <Link {...props} target={target} onClick={handleClick}>
      {children}
    </Link>
  )
}
