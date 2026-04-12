export default function AdminLoading() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="space-y-2">
        <div className="h-8 w-40 animate-pulse rounded-xl bg-gray-200" />
        <div className="h-4 w-64 animate-pulse rounded-lg bg-gray-100" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div key={item} className="h-28 animate-pulse rounded-2xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]" />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {[1, 2].map((item) => (
          <div key={item} className="space-y-3">
            <div className="h-4 w-40 animate-pulse rounded-lg bg-gray-100" />
            <div className="h-64 animate-pulse rounded-2xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]" />
          </div>
        ))}
      </div>
    </div>
  )
}
