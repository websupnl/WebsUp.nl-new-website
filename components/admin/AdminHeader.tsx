'use client'

import { usePathname } from 'next/navigation'
import { siteConfig } from '@/config/site.config'
import { Home, ChevronRight } from 'lucide-react'
import LoadingLink from '@/components/ui/LoadingLink'

const breadcrumbMap: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/publicaties': 'Publicaties',
  '/admin/publicaties/new': 'Nieuwe publicatie',
  '/admin/testimonials': 'Testimonials',
  '/admin/testimonials/new': 'Nieuwe testimonial',
  '/admin/instellingen': 'Instellingen',
}

export default function AdminHeader() {
  const pathname = usePathname()

  // Build breadcrumbs
  const parts = pathname.split('/').filter(Boolean)
  const breadcrumbs = parts.map((_, index) => {
    const path = '/' + parts.slice(0, index + 1).join('/')
    return { path, label: breadcrumbMap[path] ?? parts[index] }
  })

  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-sm">
        <LoadingLink href="/admin" className="text-gray-400 hover:text-gray-600 transition-colors">
          <Home size={15} />
        </LoadingLink>
        {breadcrumbs.slice(1).map((crumb, i) => (
          <span key={crumb.path} className="flex items-center gap-1.5">
            <ChevronRight size={13} className="text-gray-300" />
            {i === breadcrumbs.length - 2 ? (
              <span className="font-medium text-gray-700">{crumb.label}</span>
            ) : (
              <LoadingLink href={crumb.path} className="text-gray-400 hover:text-gray-600 transition-colors">
                {crumb.label}
              </LoadingLink>
            )}
          </span>
        ))}
      </nav>

      {/* Site name */}
      <p className="text-xs text-gray-400 hidden sm:block">{siteConfig.name}</p>
    </header>
  )
}
