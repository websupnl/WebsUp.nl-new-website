import {
  Building2,
  CheckCircle,
  Handshake,
  Hammer,
  LayoutDashboard,
  MessageCircle,
  Monitor,
  Rocket,
  ShoppingBag,
  ShoppingCart,
  Store,
  Zap,
  type LucideIcon,
} from 'lucide-react'

export const homepageServices: Array<{
  title: string
  href: string
  cta: string
  icon: LucideIcon
  description: string
  bullets: string[]
}> = [
  {
    title: 'Websites',
    href: '/diensten/websites',
    cta: 'Bekijk websites',
    icon: Monitor,
    description:
      'Een professionele website die duidelijk laat zien wie je bent, wat je doet en waarom klanten voor jou moeten kiezen.',
    bullets: [
      'Sterke eerste indruk',
      'Duidelijke structuur',
      'Gericht op vertrouwen en contact',
      'Goed te beheren en uit te breiden',
    ],
  },
  {
    title: 'Webshops',
    href: '/diensten/webshops',
    cta: 'Bekijk webshops',
    icon: ShoppingCart,
    description:
      'Een webshop die logisch werkt voor je klanten en professioneel aansluit op je merk, producten en doelgroep.',
    bullets: [
      'Duidelijke productpresentatie',
      'Gebruiksvriendelijke opbouw',
      'Gericht op gemak en vertrouwen',
      'Klaar om verder te groeien',
    ],
  },
  {
    title: 'Apps en dashboards',
    href: '/diensten/apps-dashboards',
    cta: 'Bekijk maatwerk',
    icon: LayoutDashboard,
    description:
      'Maatwerk oplossingen voor bedrijven die meer overzicht willen of processen slimmer willen inrichten.',
    bullets: [
      'Klantportalen en dashboards',
      'Interne tools en overzichten',
      'Slimme formulieren en workflows',
      'Gebouwd rondom jouw manier van werken',
    ],
  },
  {
    title: 'Automatisering',
    href: '/diensten/automatisering',
    cta: 'Bekijk automatisering',
    icon: Zap,
    description:
      'Koppelingen en slimme functies die handmatig werk verminderen en je bedrijf makkelijker laten draaien.',
    bullets: [
      'Minder dubbel werk',
      'Betere informatie op een plek',
      'Koppelingen tussen systemen',
      'Praktisch ingericht voor dagelijks gebruik',
    ],
  },
]

export const personalContactPoints = [
  'Je hebt direct contact met de maker',
  'Ik denk mee voordat we gaan bouwen',
  'Ook na oplevering blijf ik betrokken',
]

export const audienceItems: Array<{
  title: string
  text: string
  icon: LucideIcon
}> = [
  {
    title: "MKB en ZZP'ers",
    text: 'Voor ondernemers die professioneel zichtbaar willen zijn en online vertrouwen willen opbouwen.',
    icon: Building2,
  },
  {
    title: 'Webshops',
    text: 'Voor bedrijven die hun producten duidelijker, professioneler en gebruiksvriendelijker willen verkopen.',
    icon: ShoppingBag,
  },
  {
    title: 'Installatiebedrijven',
    text: 'Voor technische bedrijven die online sterker willen staan of slimmer willen werken met digitale tools.',
    icon: Hammer,
  },
  {
    title: 'Dienstverleners',
    text: 'Voor bedrijven waarbij vertrouwen, uitleg en persoonlijk contact belangrijk zijn.',
    icon: Handshake,
  },
  {
    title: 'Starters',
    text: 'Voor ondernemers met een sterk idee die direct goed willen starten met een professionele basis.',
    icon: Rocket,
  },
  {
    title: 'Lokale ondernemers',
    text: 'Voor bedrijven die dichtbij hun klant staan en online beter gevonden en gekozen willen worden.',
    icon: Store,
  },
]

export const fallbackReviews = [
  {
    content:
      'Daan heeft goed geluisterd naar mijn wensen en dacht actief mee over de uitstraling en indeling van mijn website. Het contact verliep prettig en snel. Het resultaat past goed bij wat ik wilde uitstralen en geeft mijn bedrijf een professionele online basis.',
    name: 'Klant van WebsUp',
    role: 'Website project',
  },
  {
    content:
      'Fijne samenwerking. Daan reageert snel, denkt mee en maakt duidelijke keuzes in het ontwerp.',
    name: 'Klant van WebsUp',
    role: 'Samenwerking',
  },
  {
    content:
      'De website voelt professioneel en overzichtelijk. Precies wat ik nodig had om beter zichtbaar te worden.',
    name: 'Klant van WebsUp',
    role: 'Website project',
  },
  {
    content:
      'Er werd niet zomaar iets gebouwd. Er werd echt meegedacht over wat logisch was voor mijn bedrijf.',
    name: 'Klant van WebsUp',
    role: 'Maatwerk',
  },
]

export const starterItems = [
  {
    title: 'Eerst een ontwerp, daarna beslissen',
    text: 'Je krijgt een eerste richting of homepageconcept, zodat je beter ziet wat mogelijk is voordat je een groot traject ingaat.',
  },
  {
    title: 'Compact, maar niet goedkoop-ogend',
    text: 'Ook een kleinere website moet professioneel, betrouwbaar en duidelijk aanvoelen.',
  },
  {
    title: 'Groeien zonder opnieuw te beginnen',
    text: "We bouwen een basis die later uitgebreid kan worden met extra pagina's, functies of systemen.",
  },
  {
    title: 'Altijd met het doel in beeld',
    text: 'Niet zomaar iets moois maken, maar iets dat past bij jouw bedrijf en je volgende stap.',
  },
]

export const homepageFaq = [
  {
    question: 'Wat kost een website of webshop?',
    answer:
      'Dat hangt af van wat je nodig hebt. Een eenvoudige website vraagt minder werk dan een maatwerk webshop of dashboard. Daarom kijk ik eerst naar je situatie, doelen en wensen. Daarna krijg je een duidelijk voorstel zonder verrassingen.',
  },
  {
    question: 'Werk je alleen in Friesland?',
    answer:
      'Nee. Ik werk graag voor bedrijven uit Friesland en Noord-Nederland, maar kan ook prima op afstand werken. Het belangrijkste is dat de samenwerking duidelijk en persoonlijk blijft.',
  },
  {
    question: 'Werk je ook voor grotere bedrijven?',
    answer:
      'Ja. WebsUp is vooral geschikt voor bedrijven die korte lijnen willen en snel willen schakelen. Dat kan een starter zijn, maar ook een MKB-bedrijf of technische organisatie die een praktische digitale oplossing zoekt.',
  },
  {
    question: 'Kan ik later verder uitbreiden?',
    answer:
      'Ja. Dat is juist belangrijk. Een goede website of webshop moet kunnen meegroeien. Denk aan extra pagina’s, koppelingen, formulieren, dashboards, automatisering of een klantomgeving.',
  },
  {
    question: 'Kan je ook maatwerk dashboards of systemen bouwen?',
    answer:
      'Ja. Naast websites en webshops bouw ik ook maatwerk oplossingen zoals dashboards, portalen, formulieren, interne tools en koppelingen. Vooral als je merkt dat je veel handmatig werk doet, kan maatwerk veel overzicht geven.',
  },
  {
    question: 'Hoe snel kunnen we starten?',
    answer:
      'Dat hangt af van mijn planning en de grootte van het project. Vaak kunnen we snel beginnen met een kennismaking of eerste ontwerp, zodat je snel ziet welke richting logisch is.',
  },
]

export const finalTrustItems = [
  { icon: CheckCircle, label: 'Geen verplichting' },
  { icon: MessageCircle, label: 'Direct contact met Daan' },
  { icon: Zap, label: 'Praktisch advies' },
]
