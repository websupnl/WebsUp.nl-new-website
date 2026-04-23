import Link from 'next/link'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'
import { BookOpen, Newspaper, MessageSquare, FolderOpen, Plus, Eye, ArrowRight } from 'lucide-react'
import { getTenantId } from '@/lib/tenant'
import { isMissingColumnError } from '@/lib/supabase/schema-helpers'
import { getAllProjectsAdmin } from '@/lib/queries/projects'

export default async function AdminDashboardPage() {
  const supabase = await createServerSupabaseClient()
  const tenantId = getTenantId()
  const projects = await getAllProjectsAdmin()
  const pubCountRes = await supabase.from('publications').select('*', { count: 'exact', head: true }).eq('tenant_id', tenantId)
  const newsCountRes = await supabase.from('news_articles').select('*', { count: 'exact', head: true }).eq('tenant_id', tenantId)
  const testimonialCountRes = await supabase.from('testimonials').select('*', { count: 'exact', head: true }).eq('tenant_id', tenantId)
  const recentPubsRes = await supabase
    .from('publications')
    .select('id, title, published, created_at')
    .eq('tenant_id', tenantId)
    .order('created_at', { ascending: false })
    .limit(4)
  const recentNewsRes = await supabase
    .from('news_articles')
    .select('id, title, status, created_at')
    .eq('tenant_id', tenantId)
    .order('created_at', { ascending: false })
    .limit(3)

  const [{ count: pubCount }, { count: newsCount }, { count: testimonialCount }, { data: recentPubs }, { data: recentNews }] =
    isMissingColumnError(pubCountRes.error, 'tenant_id') ||
    isMissingColumnError(newsCountRes.error, 'tenant_id') ||
    isMissingColumnError(testimonialCountRes.error, 'tenant_id') ||
    isMissingColumnError(recentPubsRes.error, 'tenant_id') ||
    isMissingColumnError(recentNewsRes.error, 'tenant_id')
      ? await Promise.all([
          supabase.from('publications').select('*', { count: 'exact', head: true }),
          supabase.from('news_articles').select('*', { count: 'exact', head: true }),
          supabase.from('testimonials').select('*', { count: 'exact', head: true }),
          supabase
            .from('publications')
            .select('id, title, published, created_at')
            .order('created_at', { ascending: false })
            .limit(4),
          supabase
            .from('news_articles')
            .select('id, title, status, created_at')
            .order('created_at', { ascending: false })
            .limit(3),
        ])
      : [pubCountRes, newsCountRes, testimonialCountRes, recentPubsRes, recentNewsRes]

  const stats = [
    {
      label: 'Kennisbank',
      value: pubCount ?? 0,
      icon: BookOpen,
      color: 'bg-orange-50 text-orange-600',
      href: '/admin/kennisbank',
    },
    {
      label: 'Projecten',
      value: projects.length,
      icon: FolderOpen,
      color: 'bg-blue-50 text-blue-600',
      href: '/admin/projecten',
    },
    {
      label: 'Nieuwsartikelen',
      value: newsCount ?? 0,
      icon: Newspaper,
      color: 'bg-slate-50 text-slate-600',
      href: '/admin/nieuws',
    },
    {
      label: 'Testimonials',
      value: testimonialCount ?? 0,
      icon: MessageSquare,
      color: 'bg-purple-50 text-purple-600',
      href: '/admin/testimonials',
    },
  ]

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Overzicht van uw website content</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-white rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-md transition-shadow flex items-center gap-4"
            >
              <div className={`w-11 h-11 rounded-xl ${stat.color} flex items-center justify-center flex-shrink-0`}>
                <Icon size={20} />
              </div>
              <div className="min-w-0">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-gray-500 text-xs truncate">{stat.label}</p>
              </div>
              <ArrowRight size={14} className="ml-auto text-gray-300 flex-shrink-0" />
            </Link>
          )
        })}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Snelle acties
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/publicaties/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors"
          >
            <Plus size={16} />
            Nieuwe publicatie
          </Link>
          <Link
            href="/admin/nieuws/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors"
          >
            <Plus size={16} />
            Nieuw artikel
          </Link>
          <Link
            href="/admin/projecten/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-xl transition-colors"
          >
            <Plus size={16} />
            Nieuw project
          </Link>
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-xl transition-colors"
          >
            <Eye size={16} />
            Website bekijken
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent publications */}
        {recentPubs && recentPubs.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Recente publicaties
              </h2>
              <Link href="/admin/publicaties" className="text-xs text-blue-600 hover:text-blue-700">
                Alle bekijken →
              </Link>
            </div>
            <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06)] overflow-hidden">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-50">
                  {recentPubs.map((pub) => (
                    <tr key={pub.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <span className="font-medium text-gray-900 text-sm">{pub.title}</span>
                        <p className="text-xs text-gray-400">{formatDate(pub.created_at)}</p>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${pub.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                          {pub.published ? 'Live' : 'Concept'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link href={`/admin/publicaties/${pub.id}`} className="text-blue-600 hover:text-blue-700 text-xs font-medium">
                          Bewerken
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Recent news */}
        {recentNews && recentNews.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Recente artikelen
              </h2>
              <Link href="/admin/nieuws" className="text-xs text-blue-600 hover:text-blue-700">
                Alle bekijken →
              </Link>
            </div>
            <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06)] overflow-hidden">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-50">
                  {recentNews.map((article) => (
                    <tr key={article.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <span className="font-medium text-gray-900 text-sm">{article.title}</span>
                        <p className="text-xs text-gray-400">{formatDate(article.created_at)}</p>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${article.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                          {article.status === 'published' ? 'Live' : 'Concept'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link href={`/admin/nieuws/${article.id}`} className="text-blue-600 hover:text-blue-700 text-xs font-medium">
                          Bewerken
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}