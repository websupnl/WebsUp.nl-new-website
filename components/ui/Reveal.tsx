'use client'

import type { CSSProperties, ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  distance?: number
}

export default function Reveal({
  children,
  className,
  delay = 0,
  distance = 28,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const revealNow = () => {
      window.setTimeout(() => {
        setVisible(true)
      }, 24)
    }

    const rect = node.getBoundingClientRect()
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight
    const isInitiallyVisible = rect.top < viewportHeight * 0.92 && rect.bottom > 0

    if (isInitiallyVisible) {
      revealNow()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          revealNow()
          observer.disconnect()
        }
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -10% 0px',
      }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'reveal-visible' : ''}${className ? ` ${className}` : ''}`}
      style={
        {
          '--reveal-delay': `${delay}ms`,
          '--reveal-distance': `${distance}px`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  )
}
