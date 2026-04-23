'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import { cn } from '@/lib/utils'

export interface BlogPostCardProps extends React.HTMLAttributes<HTMLDivElement> {
  tag: string
  date: string
  title: string
  description: string
  imageUrl?: string
  href: string
  readMoreText?: string
  variant?: 'default' | 'featured'
}

const fallbackImage = '/hero-bg.png'

const BlogPostCard = React.forwardRef<HTMLDivElement, BlogPostCardProps>(
  (
    {
      className,
      variant = 'default',
      tag,
      date,
      title,
      description,
      imageUrl,
      href,
      readMoreText = 'Lees meer',
      ...props
    },
    ref
  ) => {
    const isFeatured = variant === 'featured'

    return (
      <motion.div
        ref={ref}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'group feature-card relative flex h-full overflow-hidden',
          isFeatured ? 'min-h-[360px] flex-col md:flex-row' : 'flex-col',
          className
        )}
        {...props}
      >
        <Link href={href} className="absolute inset-0 z-10" aria-label={`Lees meer over ${title}`}>
          <span className="sr-only">Lees meer</span>
        </Link>

        <div className={cn('relative overflow-hidden bg-slate-100', isFeatured ? 'min-h-[260px] md:w-[46%]' : 'aspect-[16/10]')}>
          <img
            src={imageUrl || fallbackImage}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading={isFeatured ? 'eager' : 'lazy'}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06040c]/35 via-transparent to-transparent" />
          <span className="absolute left-4 top-4 rounded-full border border-white/45 bg-white/90 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-slate-700 backdrop-blur-sm">
            {tag}
          </span>
        </div>

        <div className={cn('flex flex-1 flex-col', isFeatured ? 'p-8 lg:p-10' : 'p-6')}>
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
            {date}
          </div>

          <h3 className={cn('font-bold leading-tight text-slate-900 transition-colors group-hover:text-orange-500', isFeatured ? 'text-3xl md:text-4xl' : 'text-xl')}>
            {title}
          </h3>

          <p className={cn('mt-3 leading-relaxed text-slate-500', isFeatured ? 'text-base md:text-lg' : 'text-sm')}>
            {description}
          </p>

          <div className="mt-auto pt-6">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition-colors group-hover:text-orange-500">
              {readMoreText}
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </motion.div>
    )
  }
)

BlogPostCard.displayName = 'BlogPostCard'

export { BlogPostCard }
