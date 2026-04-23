'use client'

import { LinkPreview } from '@/components/ui/link-preview'

export default function LinkPreviewDemo() {
  return (
    <div className="flex h-[40rem] flex-col items-center justify-center px-4">
      <p className="mx-auto mb-10 max-w-3xl text-xl text-neutral-500 md:text-3xl dark:text-neutral-400">
        <LinkPreview url="https://tailwindcss.com" className="font-bold">
          Tailwind CSS
        </LinkPreview>{' '}
        and{' '}
        <LinkPreview url="https://motion.dev" className="font-bold">
          Motion
        </LinkPreview>{' '}
        are a great way to build modern websites.
      </p>
      <p className="mx-auto max-w-3xl text-xl text-neutral-500 md:text-3xl dark:text-neutral-400">
        Visit{' '}
        <LinkPreview
          url="https://ui.aceternity.com"
          className="bg-gradient-to-br from-purple-500 to-pink-500 bg-clip-text font-bold text-transparent"
        >
          Aceternity UI
        </LinkPreview>{' '}
        for Tailwind and Motion components.
      </p>
    </div>
  )
}
