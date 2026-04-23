export default function SiteLoading() {
  return (
    <div className="min-h-screen animate-pulse">
      {/* Hero skeleton */}
      <div className="h-[480px] bg-gray-200" />
      {/* Content skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-4">
        <div className="h-8 bg-gray-100 rounded-xl w-1/3" />
        <div className="h-4 bg-gray-100 rounded-xl w-2/3" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-48 bg-gray-100 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  )
}