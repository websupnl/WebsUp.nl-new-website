import Link from 'next/link'
import { getAllNewsAdmin } from '@/lib/queries/news'
import { formatDate } from '@/lib/utils'
import { Plus, Pencil, Eye } from 'lucide-react'

export default async function AdminNieuwsPage() {
  const articles = await getAllNewsAdmin()

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nieuws & artikelen</h1>
          <p className="text-gray-400 text-sm mt-1">{articles.length} artikel(en) totaal</p>
        </div>
        <Link
          href="/admin/nieuws/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          <Plus size={16} />
          Nieuw artikel
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
          <p className="text-gray-400">Nog geen artikelen. Maak het eerste aan.</p>
          <Link
            href="/admin/nieuws/new"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors"
          >
            <Plus size={15} />
            Eerste artikel aanmaken
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06)] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-5 py-3.5 text-gray-500 font-medium text-xs uppercase tracking-wide">Titel</th>
                <th className="text-left px-5 py-3.5 text-gray-500 font-medium text-xs uppercase tracking-wide hidden sm:table-cell">Datum</th>
                <th className="text-left px-5 py-3.5 text-gray-500 font-medium text-xs uppercase tracking-wide">Status</th>
                <th className="px-5 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <span className="font-medium text-gray-900">{article.title}</span>
                    <p className="text-xs text-gray-400 mt-0.5">/nieuws/{article.slug}</p>
                  </td>
                  <td className="px-5 py-4 text-gray-500 hidden sm:table-cell">
                    {formatDate(article.published_at ?? article.created_at)}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${article.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {article.status === 'published' ? 'Gepubliceerd' : 'Concept'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      {article.status === 'published' && (
                        <Link
                          href={`/nieuws/${article.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                          title="Bekijken"
                        >
                          <Eye size={15} />
                        </Link>
                      )}
                      <Link
                        href={`/admin/nieuws/${article.id}`}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        title="Bewerken"
                      >
                        <Pencil size={15} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}