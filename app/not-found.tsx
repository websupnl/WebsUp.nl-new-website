import Link from 'next/link'
import { ArrowRight, Compass, Home, Search } from 'lucide-react'
import SiteFrame from '@/components/site/SiteFrame'

export default function NotFound() {
  return (
    <SiteFrame>
      <main className="bg-[color:var(--surface-2)]">
        <section className="hero-wave-bg relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.22),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.16),transparent_24%)]" />
          <div className="relative mx-auto max-w-5xl px-6 py-24 text-center text-white md:py-32 lg:px-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.5rem] border border-white/12 bg-white/8 text-orange-300">
              <Compass size={28} />
            </div>
            <span className="overline-badge mt-8 inline-flex">404</span>
            <h1 className="mt-6 font-headline text-4xl font-extrabold leading-[1.04] tracking-[-0.03em] md:text-6xl">
              Deze pagina is er niet meer.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/68">
              Mogelijk is de route verplaatst, verwijderd of was de link gewoon niet juist. De rest
              van de site staat wel gewoon voor je klaar.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/" className="btn-brand inline-flex items-center gap-2">
                Naar homepage
                <Home size={15} />
              </Link>
              <Link href="/diensten" className="btn-dark-ghost inline-flex items-center gap-2">
                Bekijk diensten
                <ArrowRight size={15} />
              </Link>
              <Link href="/kennisbank" className="btn-dark-ghost inline-flex items-center gap-2">
                Naar kennisbank
                <Search size={15} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </SiteFrame>
  )
}
