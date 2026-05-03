import type { Metadata } from 'next'
import Reveal from '@/components/ui/Reveal'
import { siteConfig } from '@/config/site.config'

export const metadata: Metadata = {
  title: 'Algemene Voorwaarden',
  description: 'Lees de algemene voorwaarden van WebsUp.nl.',
}

export default function AlgemeneVoorwaardenPage() {
  return (
    <Reveal className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
      <h1 className="font-headline text-4xl font-extrabold text-slate-900 mb-2">Algemene Voorwaarden</h1>
      <p className="text-slate-400 text-sm mb-10">Versie 1.0, januari 2026</p>

      <div className="prose-content space-y-8 text-slate-700">
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Artikel 1, Definities</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>WebsUp:</strong> de eenmanszaak WebsUp.nl van Daan Koolhaas, gevestigd in Friesland{siteConfig.kvk ? `, KVK ${siteConfig.kvk}` : ''}.</li>
            <li><strong>Opdrachtgever:</strong> de natuurlijke of rechtspersoon die een overeenkomst aangaat met WebsUp.</li>
            <li><strong>Diensten:</strong> alle door WebsUp aangeboden werkzaamheden, waaronder websites, webshops, apps, dashboards, automatisering en aanverwante digitale diensten.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Artikel 2, Toepasselijkheid</h2>
          <p>
            Deze algemene voorwaarden zijn van toepassing op alle offertes, aanbiedingen, overeenkomsten en diensten van WebsUp, tenzij schriftelijk anders overeengekomen.
          </p>
          <p className="mt-2">
            Afwijkingen van deze voorwaarden zijn slechts geldig indien en voor zover deze schriftelijk zijn overeengekomen.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Artikel 3, Totstandkoming overeenkomst</h2>
          <p>
            Een overeenkomst komt tot stand op het moment dat WebsUp een opdracht schriftelijk bevestigt of met de uitvoering ervan aanvangt. Offertes zijn geldig gedurende 30 dagen, tenzij anders vermeld.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Artikel 4, Prijzen en betaling</h2>
          <p>
            Alle prijzen zijn exclusief btw, tenzij anders vermeld. Facturen dienen te worden voldaan binnen 14 dagen na factuurdatum. Bij niet tijdige betaling is de opdrachtgever van rechtswege in verzuim en is een rente van 1% per maand verschuldigd.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Artikel 5, Uitvoering van diensten</h2>
          <p>
            WebsUp zal de opdracht naar beste inzicht en vermogen uitvoeren. Opgegeven opleverdata zijn indicatief en geven de opdrachtgever bij overschrijding geen recht op schadevergoeding of ontbinding van de overeenkomst, tenzij sprake is van opzet of grove nalatigheid.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Artikel 6, Intellectueel eigendom</h2>
          <p>
            Alle door WebsUp vervaardigde of ter beschikking gestelde materialen, code, ontwerpen en content blijven eigendom van WebsUp totdat de volledige factuur is voldaan. Na betaling verkrijgt opdrachtgever een gebruiksrecht zoals beschreven in de overeenkomst.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Artikel 7, Aansprakelijkheid</h2>
          <p>
            De aansprakelijkheid van WebsUp is beperkt tot het bedrag van de factuurwaarde van de opdracht waarop de aansprakelijkheid betrekking heeft. WebsUp is niet aansprakelijk voor indirecte schade, gevolgschade of gederfde winst.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Artikel 8, Klachten</h2>
          <p>
            Klachten over de uitvoering van de diensten dienen binnen 14 dagen na constatering schriftelijk te worden ingediend bij WebsUp. Klachten schorten de betalingsverplichting niet op.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Artikel 9, Toepasselijk recht</h2>
          <p>
            Op alle overeenkomsten is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter in het arrondissement Noord-Nederland.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Contact</h2>
          <p>
            Voor vragen over deze voorwaarden kun je contact opnemen via{' '}
            <a href={`mailto:${siteConfig.email}`} className="text-orange-500 hover:underline">
              {siteConfig.email}
            </a>.
          </p>
        </section>
      </div>
    </Reveal>
  )
}
