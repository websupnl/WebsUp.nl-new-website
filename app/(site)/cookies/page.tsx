import type { Metadata } from 'next'
import Reveal from '@/components/ui/Reveal'
import { siteConfig } from '@/config/site.config'

export const metadata: Metadata = {
  title: 'Cookiebeleid',
  description: 'Lees het cookiebeleid van WebsUp.nl en hoe cookies worden gebruikt op deze website.',
}

export default function CookiesPage() {
  return (
    <Reveal className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
      <h1 className="font-headline text-4xl font-extrabold text-slate-900 mb-2">Cookiebeleid</h1>
      <p className="text-slate-400 text-sm mb-10">Laatst bijgewerkt: januari 2026</p>

      <div className="prose-content space-y-8 text-slate-700">
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Wat zijn cookies?</h2>
          <p>
            Cookies zijn kleine tekstbestanden die worden opgeslagen op je apparaat wanneer je deze website bezoekt. Ze helpen om de website goed te laten functioneren en de ervaring te verbeteren.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Welke cookies gebruik ik?</h2>

          <div className="space-y-4">
            <div className="rounded-xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-900 mb-1">Functionele cookies</h3>
              <p className="text-sm text-slate-600">
                Noodzakelijk voor het functioneren van de website. Deze cookies kun je niet weigeren.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-900 mb-1">Analytische cookies</h3>
              <p className="text-sm text-slate-600">
                Anonieme statistieken om te begrijpen hoe bezoekers de website gebruiken. De gegevens worden niet gedeeld met derden voor commerciële doeleinden.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-900 mb-1">Voorkeurscookies</h3>
              <p className="text-sm text-slate-600">
                Slaan voorkeuren op, zoals je toestemming voor cookies, zodat je deze niet bij elk bezoek opnieuw hoeft in te stellen.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Cookies beheren of verwijderen</h2>
          <p>
            Je kunt cookies beheren of verwijderen via de instellingen van je browser. Houd er rekening mee dat het uitschakelen van cookies de werking van de website kan beïnvloeden.
          </p>
          <p className="mt-3">
            Meer informatie over het beheren van cookies vind je op{' '}
            <a
              href="https://www.consumentenbond.nl/veilig-internetten/cookies-verwijderen"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:underline"
            >
              consumentenbond.nl
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Toestemming intrekken</h2>
          <p>
            Je kunt je toestemming voor niet-functionele cookies op elk moment intrekken door je browserinstellingen aan te passen of door contact op te nemen via{' '}
            <a href={`mailto:${siteConfig.email}`} className="text-orange-500 hover:underline">
              {siteConfig.email}
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Vragen?</h2>
          <p>
            Heb je vragen over dit cookiebeleid? Neem dan contact op. Zie ook het{' '}
            <a href="/privacybeleid" className="text-orange-500 hover:underline">privacybeleid</a>.
          </p>
        </section>
      </div>
    </Reveal>
  )
}
