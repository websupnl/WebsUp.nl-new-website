import type { Metadata } from 'next'
import Reveal from '@/components/ui/Reveal'

export const metadata: Metadata = {
  title: 'Algemene Voorwaarden',
  description: 'Lees de algemene voorwaarden van Business Publicatie Uitgevers.',
}

export default function AlgemeneVoorwaardenPage() {
  return (
    <Reveal className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Algemene Voorwaarden</h1>
      <p className="text-gray-400 text-sm mb-10">Versie 1.0 — januari 2025</p>

      <div className="prose-content space-y-8 text-gray-700">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Artikel 1 — Definities</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Business Publicatie Uitgevers:</strong> de besloten vennootschap gevestigd te Amsterdam.</li>
            <li><strong>Opdrachtgever:</strong> de natuurlijke of rechtspersoon die een overeenkomst aangaat met Business Publicatie Uitgevers.</li>
            <li><strong>Diensten:</strong> alle door Business Publicatie Uitgevers aangeboden publicaties, advertentiemogelijkheden en gerelateerde diensten.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Artikel 2 — Toepasselijkheid</h2>
          <p>
            Deze algemene voorwaarden zijn van toepassing op alle offertes, aanbiedingen, overeenkomsten
            en diensten van Business Publicatie Uitgevers, tenzij schriftelijk anders overeengekomen.
          </p>
          <p className="mt-2">
            Afwijkingen van deze voorwaarden zijn slechts geldig indien en voor zover deze schriftelijk
            zijn overeengekomen.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Artikel 3 — Totstandkoming overeenkomst</h2>
          <p>
            Een overeenkomst komt tot stand op het moment dat Business Publicatie Uitgevers een opdracht
            schriftelijk bevestigt of met de uitvoering ervan aanvangt. Offertes zijn geldig gedurende
            30 dagen, tenzij anders vermeld.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Artikel 4 — Prijzen en betaling</h2>
          <p>
            Alle prijzen zijn exclusief btw, tenzij anders vermeld. Facturen dienen te worden voldaan
            binnen 14 dagen na factuurdatum. Bij niet-tijdige betaling is de opdrachtgever van rechtswege
            in verzuim en is een rente van 1% per maand verschuldigd.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Artikel 5 — Uitvoering van diensten</h2>
          <p>
            Business Publicatie Uitgevers zal de opdracht naar beste inzicht en vermogen uitvoeren.
            Opgegeven levertijden zijn indicatief en geven de opdrachtgever bij overschrijding geen
            recht op schadevergoeding of ontbinding van de overeenkomst.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Artikel 6 — Intellectueel eigendom</h2>
          <p>
            Alle door Business Publicatie Uitgevers vervaardigde of ter beschikking gestelde materialen,
            publicaties en content blijven eigendom van Business Publicatie Uitgevers, tenzij schriftelijk
            anders overeengekomen. Het is niet toegestaan deze te verveelvoudigen, openbaar te maken
            of te exploiteren zonder voorafgaande schriftelijke toestemming.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Artikel 7 — Aansprakelijkheid</h2>
          <p>
            De aansprakelijkheid van Business Publicatie Uitgevers is beperkt tot het bedrag dat in het
            betreffende geval door de aansprakelijkheidsverzekering wordt gedekt. Indien geen verzekeringsuitkering
            plaatsvindt, is de aansprakelijkheid beperkt tot de factuurwaarde van de opdracht.
          </p>
          <p className="mt-2">
            Business Publicatie Uitgevers is niet aansprakelijk voor indirecte schade, gevolgschade of
            gederfde winst.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Artikel 8 — Klachten</h2>
          <p>
            Klachten over de uitvoering van de diensten dienen binnen 14 dagen na constatering schriftelijk
            te worden ingediend bij Business Publicatie Uitgevers. Klachten schorten de betalingsverplichting
            niet op.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Artikel 9 — Toepasselijk recht</h2>
          <p>
            Op alle overeenkomsten is Nederlands recht van toepassing. Geschillen worden bij uitsluiting
            voorgelegd aan de bevoegde rechter in het arrondissement Amsterdam.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Contact</h2>
          <p>
            Voor vragen over deze voorwaarden kunt u contact opnemen via{' '}
            <a href="mailto:info@businesspublicatieuitgevers.nl" className="text-orange-600 hover:underline">
              info@businesspublicatieuitgevers.nl
            </a>.
          </p>
        </section>
      </div>
    </Reveal>
  )
}
