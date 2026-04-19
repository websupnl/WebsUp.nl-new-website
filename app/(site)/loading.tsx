export default function SiteLoading() {
  return (
    <div className="min-h-screen animate-pulse bg-[color:var(--surface-2)]">
      <div className="hero-wave-bg h-[28rem]" />
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
        <div className="h-3 w-28 rounded-full bg-white/70" />
        <div className="mt-5 h-12 max-w-2xl rounded-[1.5rem] bg-white/90" />
        <div className="mt-4 h-5 max-w-3xl rounded-full bg-white/80" />
        <div className="mt-16 space-y-5">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="h-28 rounded-[1.75rem] border border-white/70 bg-white/90" />
          ))}
        </div>
      </div>
    </div>
  )
}
