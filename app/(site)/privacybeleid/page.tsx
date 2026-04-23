import type { Metadata } from 'next'
import Reveal from '@/components/ui/Reveal'

export const metadata: Metadata = {
  title: 'Privacybeleid',
  description: 'Lees ons privacybeleid en hoe wij omgaan met uw persoonsgegevens.',
}

export default function PrivacybeleidPage() {
  return (
    <Reveal className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacybeleid</h1>
      <p className="text-gray-400 text-sm mb-10">Laatst bijgewerkt: januari 2025</p>

      <div className="prose-content space-y-8 text-gray-700">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Wie zijn wij?</h2>
          <p>
            Business Publicatie Uitgevers is een zakelijke uitgeverij gespecialiseerd in hoogwaardige
            publicaties voor de zakelijke markt. Wij zijn verantwoordelijk voor de verwerking van uw
            persoonsgegevens zoals beschreven in dit privacybeleid.
          </p>
          <p className="mt-2">
            <strong>Contactgegevens:</strong><br />
            Business Publicatie Uitgevers<br />
            Zakenstraat 10, 1234 AB Amsterdam<br />
            info@businesspublicatieuitgevers.nl
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Welke gegevens verzamelen wij?</h2>
          <p>Wij kunnen de volgende persoonsgegevens verwerken:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Naam en voornaam</li>
            <li>E-mailadres</li>
            <li>Telefoonnummer</li>
            <li>Bedrijfsnaam</li>
            <li>IP-adres en browsergegevens (via cookies)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Waarom verwerken wij uw gegevens?</h2>
          <p>Wij verwerken uw persoonsgegevens voor de volgende doeleinden:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Het afhandelen van contactverzoeken</li>
            <li>Het versturen van gevraagde informatie</li>
            <li>Het verbeteren van onze website en dienstverlening</li>
            <li>Het voldoen aan wettelijke verplichtingen</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Bewaartermijn</h2>
          <p>
            Wij bewaren uw persoonsgegevens niet langer dan strikt noodzakelijk voor de doeleinden
            waarvoor ze zijn verzameld. Contactgegevens worden maximaal 2 jaar bewaard, tenzij u
            eerder verzoekt om verwijdering.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Delen met derden</h2>
          <p>
            Wij verkopen uw gegevens niet aan derden. Wij kunnen gegevens delen met verwerkers die
            namens ons diensten verlenen (zoals hosting), uitsluitend op basis van een
            verwerkersovereenkomst.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Cookies</h2>
          <p>
            Wij maken gebruik van functionele en analytische cookies. Zie ons{' '}
            <a href="/cookies" className="text-blue-600 hover:underline">cookiebeleid</a> voor
            meer informatie.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Uw rechten</h2>
          <p>U heeft het recht om:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Inzage te vragen in uw persoonsgegevens</li>
            <li>Onjuiste gegevens te laten corrigeren</li>
            <li>Uw gegevens te laten verwijderen</li>
            <li>Bezwaar te maken tegen de verwerking</li>
            <li>Een klacht in te dienen bij de Autoriteit Persoonsgegevens</li>
          </ul>
          <p className="mt-3">
            Neem voor het uitoefenen van uw rechten contact op via{' '}
            <a href="mailto:info@businesspublicatieuitgevers.nl" className="text-blue-600 hover:underline">
              info@businesspublicatieuitgevers.nl
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Beveiliging</h2>
          <p>
            Wij nemen passende technische en organisatorische maatregelen om uw persoonsgegevens
            te beschermen tegen ongeautoriseerde toegang, verlies of misbruik.
          </p>
        </section>
      </div>
    </Reveal>
  )
}