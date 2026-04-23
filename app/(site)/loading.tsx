import { Skeleton } from '@/components/ui/skeleton'

export default function SiteLoading() {
  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <div className="h-[520px] bg-[var(--night)] px-6 pt-36 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <Skeleton className="h-5 w-48 bg-white/10" />
          <Skeleton className="h-16 max-w-3xl bg-white/10" />
          <Skeleton className="h-5 max-w-xl bg-white/10" />
          <div className="flex gap-3 pt-4">
            <Skeleton className="h-11 w-40 rounded-full bg-white/10" />
            <Skeleton className="h-11 w-36 rounded-full bg-white/10" />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl space-y-8 px-6 py-16 lg:px-8">
        <Skeleton className="h-8 w-1/3" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <Skeleton key={item} className="h-64" />
          ))}
        </div>
      </div>
    </div>
  )
}
