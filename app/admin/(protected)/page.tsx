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

  const newsCountRes = await supabase.from('news_articles').select('*', { count: 'exact', head: true }).eq('tenant_id', tenantId)
  const testimonialCountRes = await supabase.from('testimonials').select('*', { count: 'exact', head: true }).eq('tenant_id', tenantId)
  const recentNewsRes = await supabase
    .from('news_articles')
    .select('id, title, status, created_at')
    .eq('tenant_id', tenantId)
    .order('created_at', { ascending: false })
    .limit(6)

  const [{ count: newsCount }, { count: testimonialCount }, { data: recentNews }] =
    isMissingColumnError(newsCountRes.error, 'tenant_id') ||
    isMissingColumnError(testimonialCountRes.error, 'tenant_id') ||
    isMissingColumnError(recentNewsRes.error, 'tenant_id')
      ? await Promise.all([
          supabase.from('news_articles').select('*', { count: 'exact', head: true }),
          supabase.from('testimonials').select('*', { count: 'exact', head: true }),
          supabase
            .from('news_articles')
            .select('id, title, status, created_at')
            .order('created_at', { ascending: false })
            .limit(6),
        ])
      : [newsCountRes, testimonialCountRes, recentNewsRes]

  const stats = [
    {
      label: 'Kennisbank',
      value: newsCount ?? 0,
      icon: BookOpen,
      color: 'bg-orange-50 text-orange-600',
      href: '/admin/kennisbank',
    },
    {
      label: 'Projecten',
      value: projects.length,
      icon: FolderOpen,
      color: 'bg-orange-50 text-orange-600',
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
      color: 'bg-slate-50 text-slate-600',
      href: '/admin/testimonials',
    },
  ]

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">Overzicht van je website content</p>
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
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-slate-500 text-xs truncate">{stat.label}</p>
              </div>
              <ArrowRight size={14} className="ml-auto text-slate-300 flex-shrink-0" />
            </Link>
          )
        })}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Snelle acties
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/kennisbank/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-xl transition-colors"
          >
            <Plus size={16} />
            Nieuw kennisbank-artikel
          </Link>
          <Link
            href="/admin/projecten/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-xl transition-colors"
          >
            <Plus size={16} />
            Nieuw project
          </Link>
          <Link
            href="/admin/testimonials/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-xl transition-colors"
          >
            <Plus size={16} />
            Nieuwe testimonial
          </Link>
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-xl transition-colors"
          >
            <Eye size={16} />
            Website bekijken
          </Link>
        </div>
      </div>

      {/* Recent news */}
      {recentNews && recentNews.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
              Recente artikelen
            </h2>
            <Link href="/admin/kennisbank" className="text-xs text-orange-500 hover:text-orange-600">
              Alle bekijken →
            </Link>
          </div>
          <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06)] overflow-hidden">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-slate-100">
                {recentNews.map((article) => (
                  <tr key={article.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <span className="font-medium text-slate-900 text-sm">{article.title}</span>
                      <p className="text-xs text-slate-400">{formatDate(article.created_at)}</p>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${article.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                        {article.status === 'published' ? 'Live' : 'Concept'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/admin/kennisbank/${article.id}`} className="text-orange-500 hover:text-orange-600 text-xs font-medium">
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
  )
}
