export const dynamic = 'force-dynamic'

import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'
import { requireAuthenticatedAdminPage } from '@/lib/auth/admin'

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, role } = await requireAuthenticatedAdminPage()

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar userEmail={user.email ?? ''} role={role} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
