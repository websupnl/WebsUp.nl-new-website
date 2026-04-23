'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

import FreeDesignForm from '@/components/site/FreeDesignForm'

function isFreeDesignLink(anchor: HTMLAnchorElement) {
  const href = anchor.getAttribute('href')
  if (!href) return false

  try {
    const url = new URL(href, window.location.origin)
    return url.origin === window.location.origin && url.pathname.replace(/\/$/, '') === '/gratis-ontwerp'
  } catch {
    return href.replace(/\/$/, '') === '/gratis-ontwerp'
  }
}

export default function FreeDesignModalProvider() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0
      ) {
        return
      }

      const target = event.target as Element | null
      const anchor = target?.closest('a')
      if (!(anchor instanceof HTMLAnchorElement) || !isFreeDesignLink(anchor)) return

      event.preventDefault()
      setOpen(true)
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[#06040c]/72 px-4 py-6 backdrop-blur-md [perspective:800px]"
          role="dialog"
          aria-modal="true"
          aria-label="Gratis ontwerp aanvragen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, backdropFilter: 'blur(10px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false)
          }}
        >
          <motion.div
            className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[1.6rem] bg-white shadow-[0_24px_90px_rgba(0,0,0,0.28)]"
            initial={{ opacity: 0, scale: 0.72, rotateX: 24, y: 36 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.86, rotateX: 8, y: 18 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:border-orange-200 hover:text-orange-500"
              aria-label="Sluit gratis ontwerp formulier"
            >
              <X size={18} />
            </button>
            <div className="p-3 sm:p-4">
              <FreeDesignForm />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
