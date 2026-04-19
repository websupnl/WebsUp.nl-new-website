import type { Metadata } from 'next'
import LegalPage from '@/components/site/LegalPage'
import { siteConfig } from '@/config/site.config'

export const metadata: Metadata = {
  title: 'Algemene voorwaarden',
  description: 'De algemene voorwaarden van WebsUp voor websites, webshops, maatwerk en digitale dienstverlening.',
}

export default function AlgemeneVoorwaardenPage() {
  return (
    <LegalPage
      badge="Voorwaarden"
      title="Algemene voorwaarden"
      subtitle="De basisafspraken voor offertes, samenwerking, oplevering en aansprakelijkheid bij WebsUp."
      updatedLabel="19 april 2026"
      sections={[
        {
          title: '1. Toepasselijkheid',
          paragraphs: [
            'Deze voorwaarden gelden voor alle offertes, overeenkomsten en werkzaamheden van WebsUp, tenzij schriftelijk iets anders is afgesproken.',
          ],
        },
        {
          title: '2. Offertes en overeenkomsten',
          paragraphs: [
            'Een offerte is vrijblijvend tenzij daarin een geldigheidsduur staat vermeld. Een overeenkomst ontstaat zodra een voorstel wordt geaccepteerd of zodra WebsUp in overleg start met de uitvoering.',
          ],
        },
        {
          title: '3. Uitvoering van werkzaamheden',
          paragraphs: [
            'WebsUp voert opdrachten uit naar beste inzicht en vermogen. Daarbij wordt gewerkt vanuit een praktische aanpak: duidelijk afstemmen, gericht bouwen en bijsturen waar nodig.',
            'Levertijden zijn altijd indicatief, tenzij schriftelijk een harde deadline is afgesproken.',
          ],
        },
        {
          title: '4. Input en medewerking van de opdrachtgever',
          paragraphs: [
            'De opdrachtgever levert tijdig juiste informatie, feedback, teksten, beelden en andere benodigde input aan. Vertraging in die aanlevering kan invloed hebben op planning en oplevering.',
          ],
        },
        {
          title: '5. Prijzen en betaling',
          paragraphs: [
            'Alle genoemde prijzen zijn exclusief btw tenzij anders vermeld. Facturen dienen te worden betaald binnen de afgesproken termijn.',
            'Bij grotere trajecten kan WebsUp werken met deelbetalingen of een aanbetaling vooraf.',
          ],
        },
        {
          title: '6. Revisies en meerwerk',
          paragraphs: [
            'Normale feedback- en correctierondes horen bij een traject. Extra wensen of wijzigingen buiten de afgesproken scope gelden als meerwerk en kunnen apart worden geoffreerd.',
          ],
        },
        {
          title: '7. Oplevering en nazorg',
          paragraphs: [
            'Een project geldt als opgeleverd zodra de afgesproken onderdelen zijn geleverd of live zijn gezet. Kleine restpunten die normaal gebruik niet blokkeren, houden oplevering niet automatisch tegen.',
          ],
        },
        {
          title: '8. Intellectueel eigendom',
          paragraphs: [
            'Concepten, ontwerpen, code en andere opgeleverde onderdelen blijven eigendom van WebsUp totdat facturen volledig zijn voldaan, tenzij schriftelijk iets anders is afgesproken.',
            'Na volledige betaling krijgt de opdrachtgever het gebruiksrecht op het afgesproken eindresultaat binnen het doel van de opdracht.',
          ],
        },
        {
          title: '9. Aansprakelijkheid',
          paragraphs: [
            'WebsUp is niet aansprakelijk voor indirecte schade, gevolgschade, gemiste omzet of schade die ontstaat door foutieve input van derden of door systemen buiten de invloedssfeer van WebsUp.',
            'Directe aansprakelijkheid is altijd beperkt tot het bedrag van het betreffende deel van de opdracht of het bedrag dat de verzekeraar uitkeert, als dat lager is.',
          ],
        },
        {
          title: '10. Onderhoud, externe tools en hosting',
          paragraphs: [
            'Als een project gebruikmaakt van externe diensten zoals hosting, plugins, platforms, betaalproviders of APIs, dan blijven de voorwaarden en beschikbaarheid van die partijen van toepassing.',
          ],
        },
        {
          title: '11. Toepasselijk recht',
          paragraphs: [
            'Op alle overeenkomsten met WebsUp is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter in Nederland.',
          ],
          note: `Voor vragen over deze voorwaarden kun je mailen naar ${siteConfig.email}.`,
        },
      ]}
    />
  )
}
