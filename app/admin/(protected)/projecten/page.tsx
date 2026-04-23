import Link from 'next/link'
import { Eye, Pencil, Plus, Star } from 'lucide-react'
import { getAllProjectsAdmin } from '@/lib/queries/projects'

function isPersistedProjectId(value?: string | null) {
  return Boolean(
    value &&
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
  )
}

export default async function AdminProjectenPage() {
  const projects = await getAllProjectsAdmin()

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projecten</h1>
          <p className="text-gray-400 text-sm mt-1">{projects.length} project(en) totaal</p>
        </div>
        <Link
          href="/admin/projecten/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          <Plus size={16} />
          Nieuw project
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06)] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-5 py-3.5 text-gray-500 font-medium text-xs uppercase tracking-wide">Project</th>
              <th className="text-left px-5 py-3.5 text-gray-500 font-medium text-xs uppercase tracking-wide hidden md:table-cell">Categorie</th>
              <th className="text-left px-5 py-3.5 text-gray-500 font-medium text-xs uppercase tracking-wide">Status</th>
              <th className="text-left px-5 py-3.5 text-gray-500 font-medium text-xs uppercase tracking-wide hidden lg:table-cell">Type</th>
              <th className="px-5 py-3.5" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {projects.map((project) => {
              const persistedProject = isPersistedProjectId(project.id)

              return (
                <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-start gap-3">
                      {project.image_url ? (
                        <img
                          src={project.image_url}
                          alt=""
                          className="w-14 h-10 rounded-lg object-cover border border-gray-100"
                        />
                      ) : (
                        <div className="w-14 h-10 rounded-lg bg-gray-100 border border-gray-100" />
                      )}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{project.title}</span>
                          {project.featured && <Star size={14} className="text-amber-400 fill-amber-400" />}
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">/projecten/{project.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-500 hidden md:table-cell">{project.category}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                        project.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {project.published ? 'Gepubliceerd' : 'Concept'}
                    </span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                        persistedProject ? 'bg-orange-50 text-orange-600' : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {persistedProject ? 'Database' : 'Standaard'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      {project.published && (
                        <Link
                          href={`/projecten/${project.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                          title="Bekijken"
                        >
                          <Eye size={15} />
                        </Link>
                      )}
                      <Link
                        href={`/admin/projecten/${project.id}`}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                        title="Bewerken"
                      >
                        <Pencil size={15} />
                      </Link>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
