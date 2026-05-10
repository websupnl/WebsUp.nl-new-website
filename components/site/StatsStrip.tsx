import Reveal from '@/components/ui/Reveal'

const stats = [
  { value: '5+', label: 'projecten opgeleverd' },
  { value: '100%', label: 'maatwerk per klant' },
  { value: '< 24u', label: 'reactie op werkdagen' },
  { value: 'NL', label: 'Friesland en daarbuiten' },
]

export default function StatsStrip() {
  return (
    <section className="relative z-10 bg-white">
      <Reveal distance={18}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid border-y border-slate-200 py-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`py-5 sm:px-6 lg:px-8 ${index > 0 ? 'border-slate-200 sm:border-l' : ''} ${index === 2 ? 'sm:border-l-0 lg:border-l' : ''}`}
              >
                <div className="font-headline text-3xl font-extrabold leading-none tracking-[-0.035em] gradient-text md:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm font-medium text-slate-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
