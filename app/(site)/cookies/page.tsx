import type { Metadata } from 'next'
import Reveal from '@/components/ui/Reveal'

export const metadata: Metadata = {
  title: 'Cookiebeleid',
  description: 'Lees ons cookiebeleid en hoe wij cookies gebruiken op onze website.',
}

export default function CookiesPage() {
  return (
    <Reveal className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Cookiebeleid</h1>
      <p className="text-gray-400 text-sm mb-10">Laatst bijgewerkt: januari 2025</p>

      <div className="prose-content space-y-8 text-gray-700">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Wat zijn cookies?</h2>
          <p>
            Cookies zijn kleine tekstbestanden die worden opgeslagen op uw apparaat wanneer u onze
            website bezoekt. Ze helpen ons de website goed te laten functioneren en uw ervaring te
            verbeteren.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Welke cookies gebruiken wij?</h2>

          <div className="space-y-5">
            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-1">Functionele cookies</h3>
              <p className="text-sm text-gray-600">
                Noodzakelijk voor het functioneren van de website. Deze cookies slaan bijvoorbeeld
                uw sessie op zodat u ingelogd blijft. U kunt deze cookies niet weigeren.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-1">Analytische cookies</h3>
              <p className="text-sm text-gray-600">
                Wij gebruiken anonieme statistieken om te begrijpen hoe bezoekers onze website
                gebruiken. De gegevens worden niet gedeeld met derden voor commerciële doeleinden.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-1">Voorkeurscookies</h3>
              <p className="text-sm text-gray-600">
                Slaan uw voorkeuren op, zoals uw toestemming voor cookies, zodat u deze niet bij
                elk bezoek opnieuw hoeft in te stellen.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Cookies beheren of verwijderen</h2>
          <p>
            U kunt cookies beheren of verwijderen via de instellingen van uw browser. Houd er
            rekening mee dat het uitschakelen van cookies de werking van de website kan
            beïnvloeden.
          </p>
          <p className="mt-3">
            Meer informatie over het beheren van cookies vindt u op{' '}
            <a
              href="https://www.consumentenbond.nl/veilig-internetten/cookies-verwijderen"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              consumentenbond.nl
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Toestemming intrekken</h2>
          <p>
            U kunt uw toestemming voor niet-functionele cookies op elk moment intrekken door uw
            browserinstellingen aan te passen of door contact met ons op te nemen via{' '}
            <a href="mailto:info@businesspublicatieuitgevers.nl" className="text-blue-600 hover:underline">
              info@businesspublicatieuitgevers.nl
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Vragen?</h2>
          <p>
            Heeft u vragen over ons cookiebeleid? Neem dan contact met ons op. Zie ook ons{' '}
            <a href="/privacybeleid" className="text-blue-600 hover:underline">privacybeleid</a>.
          </p>
        </section>
      </div>
    </Reveal>
  )
}