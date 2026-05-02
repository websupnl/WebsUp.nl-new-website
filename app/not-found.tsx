import Link from 'next/link'
import { ArrowLeft, Compass, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="relative overflow-hidden bg-[#06040c] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.30),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(236,72,153,0.18),_transparent_28%)]" />
      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-orange-500/20">
          <Compass size={34} className="text-orange-400" />
        </div>
        <span className="overline-badge overline-badge-dark mb-4 inline-flex items-center gap-2">
          <Search size={13} />
          Pagina niet gevonden
        </span>
        <h1 className="max-w-3xl font-headline text-4xl font-extrabold leading-tight sm:text-5xl">
          Deze pagina bestaat niet.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">
          De pagina die je zoekt is mogelijk verplaatst of verwijderd. Ga terug naar de homepage of bekijk de projecten.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn-brand-gradient">
            Naar homepage
          </Link>
          <Link
            href="/projecten"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
          >
            <ArrowLeft size={16} />
            Bekijk projecten
          </Link>
        </div>
      </div>
    </main>
  )
}
