'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [active, setActive] = useState(false)
  const [visible, setVisible] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 420, damping: 34, mass: 0.28 })
  const ringY = useSpring(y, { stiffness: 420, damping: 34, mass: 0.28 })
  const dotX = useSpring(x, { stiffness: 900, damping: 38, mass: 0.16 })
  const dotY = useSpring(y, { stiffness: 900, damping: 38, mass: 0.16 })

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches
    if (!finePointer) return

    const move = (event: PointerEvent) => {
      setVisible(true)
      x.set(event.clientX)
      y.set(event.clientY)
      const target = event.target as HTMLElement | null
      setActive(Boolean(target?.closest('a, button, [data-cursor="active"]')))
    }

    const hide = () => setVisible(false)

    window.addEventListener('pointermove', move)
    document.documentElement.addEventListener('mouseleave', hide)

    return () => {
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('mouseleave', hide)
    }
  }, [x, y])

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden rounded-full md:block"
        style={{
          x: ringX,
          y: ringY,
          translateX: active ? '-18px' : '-12px',
          translateY: active ? '-18px' : '-12px',
          width: active ? 36 : 24,
          height: active ? 36 : 24,
          opacity: visible ? 1 : 0,
          border: '1px solid rgba(255,255,255,0.38)',
          background: 'linear-gradient(135deg, rgba(249,115,22,0.22), rgba(236,72,153,0.18), rgba(167,139,250,0.22))',
          boxShadow: active
            ? '0 0 28px rgba(236,72,153,0.28), inset 0 0 18px rgba(255,255,255,0.08)'
            : '0 0 18px rgba(249,115,22,0.16)',
          backdropFilter: 'blur(2px)',
        }}
        transition={{ type: 'spring', stiffness: 520, damping: 36 }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[101] hidden h-2 w-2 rounded-full md:block"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-4px',
          translateY: '-4px',
          opacity: visible ? 1 : 0,
          background: 'linear-gradient(135deg, #f97316, #ec4899, #a78bfa)',
        }}
      />
    </>
  )
}
