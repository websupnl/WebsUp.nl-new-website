'use client'

import type React from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'

import { cn } from '@/lib/utils'

type LinkPreviewProps = {
  children: React.ReactNode
  url: string
  className?: string
  width?: number
  height?: number
  quality?: number
  isStatic?: boolean
  imageSrc?: string
}

export function LinkPreview({
  children,
  url,
  className,
  width = 220,
  height = 138,
  quality = 50,
  isStatic = false,
  imageSrc,
}: LinkPreviewProps) {
  const [isOpen, setOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const x = useMotionValue(0)
  const translateX = useSpring(x, { stiffness: 100, damping: 15 })

  const src = useMemo(() => {
    if (isStatic && imageSrc) return imageSrc

    const params = new URLSearchParams({
      url,
      screenshot: 'true',
      meta: 'false',
      embed: 'screenshot.url',
      colorScheme: 'dark',
      'viewport.isMobile': 'true',
      'viewport.deviceScaleFactor': '1',
      'viewport.width': String(width * 3),
      'viewport.height': String(height * 3),
      quality: String(quality),
    })

    return `https://api.microlink.io/?${params.toString()}`
  }, [height, imageSrc, isStatic, quality, url, width])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const targetRect = event.currentTarget.getBoundingClientRect()
    const eventOffsetX = event.clientX - targetRect.left
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2
    x.set(offsetFromCenter)
  }

  return (
    <span className="relative inline-flex">
      {isMounted ? (
        <span className="hidden">
          <img src={src} width={width} height={height} alt="" />
        </span>
      ) : null}

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onMouseMove={handleMouseMove}
        className={cn('text-black dark:text-white', className)}
      >
        {children}
      </a>

      <AnimatePresence>
        {isOpen && (
          <motion.span
            initial={{ opacity: 0, y: 18, scale: 0.72 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: 'spring',
                stiffness: 260,
                damping: 20,
              },
            }}
            exit={{ opacity: 0, y: 18, scale: 0.72 }}
            className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-3 block -translate-x-1/2 rounded-xl shadow-xl"
            style={{ x: translateX }}
          >
            <span className="block rounded-xl border-2 border-transparent bg-white p-1 shadow hover:border-neutral-200 dark:bg-neutral-950 dark:hover:border-neutral-800">
              <img
                src={src}
                width={width}
                height={height}
                className="rounded-lg object-cover"
                alt="Website preview"
              />
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}
