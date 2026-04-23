import Link from 'next/link'
import { getAllPublicationsAdmin } from '@/lib/queries/publications'
import { formatDate } from '@/lib/utils'
import { Plus, Pencil, Eye } from 'lucide-react'

export default async function AdminPublicatiesPage() {
  const publications = await getAllPublicationsAdmin()

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Publicaties</h1>
          <p className="text-gray-400 text-sm mt-1">{publications.length} publicatie(s) totaal</p>
        </div>
        <Link
          href="/admin/publicaties/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          <Plus size={16} />
          Nieuw
        </Link>
      </div>

      {publications.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
          <p className="text-gray-400">Nog geen publicaties. Maak er een aan.</p>
          <Link
            href="/admin/publicaties/new"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors"
          >
            <Plus size={15} />
            Eerste publicatie aanmaken
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
              {publications.map((pub) => (
                <tr key={pub.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <span className="font-medium text-gray-900">{pub.title}</span>
                    <p className="text-xs text-gray-400 mt-0.5">/{pub.slug}</p>
                  </td>
                  <td className="px-5 py-4 text-gray-500 hidden sm:table-cell">
                    {formatDate(pub.created_at)}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                        pub.published
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {pub.published ? 'Gepubliceerd' : 'Concept'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      {pub.published && (
                        <Link
                          href={`/publicaties/${pub.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                          title="Bekijken"
                        >
                          <Eye size={15} />
                        </Link>
                      )}
                      <Link
                        href={`/admin/publicaties/${pub.id}`}
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