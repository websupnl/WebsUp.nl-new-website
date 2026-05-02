'use client'

import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import LoadingLink from '@/components/ui/LoadingLink'
import { useToast } from '@/hooks/useToast'
import {
  LayoutDashboard,
  FolderOpen,
  BookOpen,
  MessageSquare,
  Settings,
  ExternalLink,
  LogOut,
  ChevronRight,
} from 'lucide-react'

const editorNavItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, exact: true },
  { label: 'Projecten', href: '/admin/projecten', icon: FolderOpen },
  { label: 'Kennisbank', href: '/admin/kennisbank', icon: BookOpen },
  { label: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
]

const adminNavItems = [
  ...editorNavItems,
  { label: 'Instellingen', href: '/admin/instellingen', icon: Settings },
]

interface Props {
  userEmail: string
  role: 'admin' | 'editor'
}

export default function AdminSidebar({ userEmail, role }: Props) {
  const navItems = role === 'admin' ? adminNavItems : editorNavItems
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const { show, startNavigation } = useToast()

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    show('Je bent uitgelogd.')
    startNavigation('/admin/login')
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <aside className="hidden lg:flex flex-col w-60 bg-white border-r border-slate-100 min-h-screen sticky top-0">
      {/* Logo */}
      <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
        <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
        </div>
        <span className="text-base font-bold text-slate-900 tracking-tight">
          Webs<span className="text-orange-500">Up</span>
          <span className="text-slate-400 font-normal text-sm">.nl</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href, item.exact)

          return (
            <LoadingLink
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? 'bg-orange-50 text-orange-600'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon size={17} />
              {item.label}
              {active && (
                <ChevronRight size={14} className="ml-auto text-orange-400" />
              )}
            </LoadingLink>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-4 space-y-0.5 border-t border-slate-100 pt-4">
        <LoadingLink
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all"
        >
          <ExternalLink size={17} />
          Website bekijken
        </LoadingLink>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-orange-50 hover:text-orange-600 transition-all"
        >
          <LogOut size={17} />
          Uitloggen
        </button>
        <div className="px-3 pt-2">
          <p className="text-xs text-slate-400 truncate">{userEmail}</p>
          <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-medium ${role === 'admin' ? 'bg-orange-50 text-orange-600' : 'bg-slate-100 text-slate-500'}`}>
            {role === 'admin' ? 'Beheerder' : 'Redacteur'}
          </span>
          <p className="text-xs text-slate-300 mt-2 opacity-60">
            <a
              href="https://websup.nl"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-400 transition-colors"
            >
              WebsUp CMS
            </a>
          </p>
        </div>
      </div>
    </aside>
  )
}
