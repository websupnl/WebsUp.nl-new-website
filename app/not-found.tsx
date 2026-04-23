import Link from 'next/link'
import { ArrowLeft, Compass, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.35),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.18),_transparent_28%)]" />
      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-blue-950/40">
          <Compass size={34} className="text-blue-300" />
        </div>
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-blue-200">
          <Search size={13} />
          Pagina niet gevonden
        </span>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
          Deze pagina bestaat niet.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
          De pagina die u zoekt is mogelijk verplaatst of verwijderd. Ga terug naar de homepage of bekijk onze publicaties.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-500"
          >
            Naar homepage
          </Link>
          <Link
            href="/publicaties"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
          >
            <ArrowLeft size={16} />
            Bekijk publicaties
          </Link>
        </div>
      </div>
    </main>
  )
}