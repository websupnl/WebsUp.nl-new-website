export interface PortfolioProject {
  id: string
  slug: string
  title: string
  category: string
  excerpt: string
  content: string
  highlights: string[]
  image_url: string
  website_url: string | null
  featured: boolean
  published: boolean
  sort_order: number
}

export const defaultProjects: PortfolioProject[] = [
  {
    id: 'project-verkeersschool-haak',
    slug: 'verkeersschool-haak',
    title: 'Website voor Verkeersschool Haak',
    category: 'Rijschool',
    excerpt:
      'Een professionele en overzichtelijke website die perfect aansluit bij de betrouwbaarheid en persoonlijke aanpak van de rijschool.',
    content:
      'Voor Verkeersschool Haak ontwikkelden we een professionele en overzichtelijke website die perfect aansluit bij de betrouwbaarheid en persoonlijke aanpak van de rijschool. De website laat het aanbod aan rijlessen, pakketten en locaties duidelijk zien en spreekt zowel beginnende bestuurders als heropfrissers aan. Met een heldere uitstraling, sterke visuals en een gebruiksvriendelijk ontwerp is de website eenvoudig te beheren en aantrekkelijk voor nieuwe leerlingen. Zo zet Verkeersschool Haak niet alleen veilige stappen op de weg, maar ook online.',
    highlights: [
      'Duidelijke rijlessen en pakketten',
      'Mobielvriendelijk en eenvoudig beheer',
      'Sterke online presentatie voor nieuwe leerlingen',
    ],
    image_url: '/Projecten/verkeerschoolhaak_mockup.png',
    website_url: null,
    featured: true,
    published: true,
    sort_order: 10,
  },
  {
    id: 'project-rottevalle',
    slug: 'rottevalle',
    title: 'Website voor Dorp Rottevalle',
    category: 'Dorpswebsite',
    excerpt:
      'Een toegankelijke dorpswebsite waar inwoners en bezoekers terechtkunnen voor lokaal nieuws, evenementen en verenigingsinformatie.',
    content:
      'Voor Rottevalle.com ontwikkelden we een toegankelijke dorpswebsite waar inwoners en bezoekers terechtkunnen voor lokaal nieuws, evenementen en verenigingsinformatie. De site is gebruiksvriendelijk opgezet zodat het beheer eenvoudig blijft voor vrijwilligers en op mobiel goed werkt. De uitstraling sluit aan bij het dorp: warm, duidelijk en betrokken. Een digitaal dorpsplein dat echt leeft.',
    highlights: [
      'Gebruiksvriendelijk voor jong en oud',
      'Actueel dorpsnieuws en agenda',
      'Beheerbaar door vrijwilligers',
    ],
    image_url: '/Projecten/rottevalle_mockup.png',
    website_url: null,
    featured: true,
    published: true,
    sort_order: 20,
  },
  {
    id: 'project-contextcareisa',
    slug: 'contextcareisa',
    title: 'Behandeling op maat voor kind en gezin',
    category: 'Specialistische zorg',
    excerpt:
      'Een rustige en toegankelijke website die vertrouwen uitstraalt en de werkwijze van intensieve systeembehandeling zichtbaar maakt.',
    content:
      'Voor ContextCareISA ontwikkelden we een rustige, toegankelijke website die vertrouwen uitstraalt en de unieke werkwijze van intensieve systeembehandeling zichtbaar maakt. De site is gericht op ouders, verwijzers en professionals, en brengt specialistische zorg op een heldere manier in beeld zonder afstandelijk te worden.',
    highlights: [
      'Empathisch en helder design',
      'Gericht op doelgroepcommunicatie',
      'Mobielvriendelijk en snel',
    ],
    image_url: '/Projecten/context-care-isa_mockup.png',
    website_url: null,
    featured: true,
    published: true,
    sort_order: 30,
  },
  {
    id: 'project-feel-the-move',
    slug: 'feel-the-move',
    title: 'Website voor Dansschool Feel The Move',
    category: 'Dansschool',
    excerpt:
      'Een moderne en dynamische website die perfect aansluit bij de energie van de dansschool en het lesaanbod duidelijk presenteert.',
    content:
      'Voor Feel The Move ontwikkelden we een moderne en dynamische website die perfect aansluit bij de energie van de dansschool. De site laat het aanbod aan danslessen, evenementen en optredens duidelijk zien en spreekt zowel jongeren als volwassenen aan. Met een frisse uitstraling, sterke visuals en een mobielvriendelijk ontwerp is de website eenvoudig te beheren en aantrekkelijk voor nieuwe leden. Zo blijft dansen niet alleen in de zaal, maar ook online volop in beweging.',
    highlights: [
      'Aansprekend en energiek ontwerp',
      'Actuele lessen en tarieven',
      'Mobielvriendelijk en eenvoudig beheer',
    ],
    image_url: '/Projecten/dansschool-feel-the-move_mockup.png',
    website_url: null,
    featured: true,
    published: true,
    sort_order: 40,
  },
  {
    id: 'project-rondom-verlies',
    slug: 'rondom-verlies',
    title: 'Website voor Rondom Verlies',
    category: 'Unieke diensten',
    excerpt:
      'Een warme en betekenisvolle website waar herinnering, kunst en troost samenkomen in een overzichtelijke omgeving.',
    content:
      'Voor Rondomverlies.nl ontwikkelden we een warme, rustige en betekenisvolle website waar herinnering, kunst en troost samenkomen. De site presenteert handgemaakte urnen, gedenkharten en maatwerkcreaties die met zorg en liefde worden vervaardigd. Bezoekers vinden naast producten ook persoonlijke verhalen, rouwondersteuning en inspiratie in een overzichtelijke en toegankelijke omgeving. De uitstraling sluit volledig aan bij de visie van Anita de Jong: persoonlijk, betrokken en creatief. Het ontwerp is gebruiksvriendelijk, mobielvriendelijk en gericht op vertrouwen en verbinding.',
    highlights: [
      'Handgemaakte urnen en gedenkharten op maat',
      'Persoonlijk en empathisch ontwerp',
      'Overzichtelijk en mobiel goed bruikbaar',
    ],
    image_url: '/Projecten/rondom-verlies_mockup.png',
    website_url: null,
    featured: true,
    published: true,
    sort_order: 50,
  },
  {
    id: 'project-azie-drachten',
    slug: 'azie-drachten',
    title: 'Frisse website voor Aziatisch afhaalrestaurant',
    category: 'Horeca en afhaal',
    excerpt:
      'Een moderne, overzichtelijke website waarmee bezoekers snel het menu kunnen bekijken en eenvoudig contact kunnen opnemen.',
    content:
      'Voor Azie Drachten realiseerden we een moderne, overzichtelijke website waarmee bezoekers snel het menu kunnen bekijken en eenvoudig contact kunnen opnemen of langskomen. De site straalt de warme sfeer van het restaurant uit en werkt perfect op mobiel.',
    highlights: [
      'Gebruiksvriendelijk menu',
      'Mobiel geoptimaliseerd',
      'Direct contact en navigatie geintegreerd',
    ],
    image_url: '/Projecten/azie_mockup.png',
    website_url: null,
    featured: false,
    published: true,
    sort_order: 60,
  },
  {
    id: 'project-peter-kalsbeek',
    slug: 'peter-kalsbeek-coaching',
    title: 'Persoonlijke en gezinsgerichte coaching op maat',
    category: 'Mentale coaching',
    excerpt:
      'Een toegankelijke en rustige website die de praktische en persoonlijke aanpak van de praktijk goed weerspiegelt.',
    content:
      'Voor Peter Kalsbeek Coaching ontwikkelden we een toegankelijke, rustige website die zijn praktische en persoonlijke aanpak weerspiegelt. De site is gericht op jeugdigen, volwassenen en gezinnen die steun zoeken bij uitdagingen in het dagelijks leven.',
    highlights: [
      'Professionele en warme uitstraling',
      'Gericht op vertrouwen en duidelijkheid',
      'Mobielvriendelijk en overzichtelijk',
    ],
    image_url: '/Projecten/peter_kalsbeek_coaching_mockup.png',
    website_url: null,
    featured: false,
    published: true,
    sort_order: 70,
  },
  {
    id: 'project-golfcenter-drachten',
    slug: 'golfcenter-drachten',
    title: 'Website voor Golfcenter Drachten',
    category: 'Golf winkel',
    excerpt:
      'Een website die de belofte van eerlijk advies, persoonlijke service en kwaliteit voor een goede prijs goed vangt.',
    content:
      'Voor Golfcenter Drachten maakten we een website die precies de kern vangt van hun belofte: eerlijk advies, persoonlijke service en kwaliteit voor een goede prijs. De site legt de focus op clubfitting op maat, aanbiedingen en het brede assortiment golfmaterialen. Bezoekers vinden snel wat ze zoeken dankzij duidelijke navigatie, heldere product- en servicepagina’s en een uitnodigende toon. De uitstraling ademt passie voor golf, zonder poespas.',
    highlights: [
      'Clubfitting op maat',
      'Groot assortiment golfproducten',
      'Laagste prijs garantie duidelijk gepositioneerd',
    ],
    image_url: '/Projecten/goldcenterdrachten_mockup.png',
    website_url: null,
    featured: false,
    published: true,
    sort_order: 80,
  },
  {
    id: 'project-thuisbatterijen-friesland',
    slug: 'thuisbatterijen-friesland',
    title: 'Leadgerichte SEO-landingspagina voor thuisbatterijen',
    category: 'Leadgeneratie en SEO',
    excerpt:
      'Een lokale SEO-website gericht op zichtbaarheid, vertrouwen en aanvragen rondom thuisbatterijen, EMS en laadpalen.',
    content:
      'Voor Thuisbatterijen Friesland ontwikkelden we een leadgerichte website die lokaal goed kan ranken op zoekopdrachten rondom thuisbatterijen, EMS en laadpalen. De opbouw is helder, mobiel sterk en inhoudelijk gericht op vertrouwen en conversie. Daarmee vormt de site een stevige basis voor organische zichtbaarheid en nieuwe aanvragen.',
    highlights: [
      'Gebouwd voor lokale vindbaarheid',
      'Duidelijke leadgerichte pagina-opbouw',
      'Snel en mobielvriendelijk',
    ],
    image_url: '/Projecten/thuisbatterijen_friesland_mockup.png',
    website_url: null,
    featured: false,
    published: true,
    sort_order: 90,
  },
  {
    id: 'project-bigband-drachten',
    slug: 'bigband-drachten',
    title: 'Website voor Bigband Drachten',
    category: 'Muziek en evenementen',
    excerpt:
      'Een website waarin sfeer, optredens en praktische informatie samenkomen voor bezoekers, organisatoren en bandleden.',
    content:
      'Voor Bigband Drachten ontwikkelden we een website waarin optredens, sfeer en bandinformatie overzichtelijk samenkomen. De site maakt het makkelijk om agenda, achtergrondinformatie en boekingsmogelijkheden duidelijk te presenteren, met een uitstraling die past bij live muziek en optredens.',
    highlights: [
      'Agenda en optredens duidelijk zichtbaar',
      'Sfeervolle presentatie van de band',
      'Mobielvriendelijk en praktisch te beheren',
    ],
    image_url: '/Projecten/bigband-drahten_mockup.png',
    website_url: null,
    featured: false,
    published: true,
    sort_order: 100,
  },
  {
    id: 'project-camperhulp',
    slug: 'camperhulp',
    title: 'Website voor Camperhulp',
    category: 'Service en mobiliteit',
    excerpt:
      'Een duidelijke website waarin diensten, werkgebied en contact centraal staan voor mensen die snel hulp zoeken.',
    content:
      'Voor Camperhulp ontwikkelden we een heldere website waarin diensten, werkgebied en contact centraal staan. De site is erop gericht om bezoekers snel duidelijkheid te geven: waarvoor kunnen ze terecht, hoe nemen ze contact op en wat mogen ze verwachten.',
    highlights: [
      'Diensten direct helder uitgelegd',
      'Sterke mobiele gebruikservaring',
      'Snel contact voor bezoekers',
    ],
    image_url: '/Projecten/camperhulp_mockup.png',
    website_url: null,
    featured: false,
    published: true,
    sort_order: 110,
  },
  {
    id: 'project-de-kapper-drachten',
    slug: 'de-kapper-drachten',
    title: 'Website voor De Kapper Drachten',
    category: 'Salon en beauty',
    excerpt:
      'Een frisse website die behandelingen, sfeer en bereikbaarheid overzichtelijk laat zien en vertrouwen uitstraalt.',
    content:
      'Voor De Kapper Drachten ontwikkelden we een frisse en toegankelijke website waarin behandelingen, sfeer en bereikbaarheid overzichtelijk samenkomen. De uitstraling is verzorgd en eigentijds, terwijl de structuur bezoekers helpt om snel de juiste informatie te vinden.',
    highlights: [
      'Professionele uitstraling zonder poespas',
      'Duidelijke structuur voor bezoekers',
      'Mobiel goed bruikbaar',
    ],
    image_url: '/Projecten/de-kapper-drachten_mockup.png',
    website_url: null,
    featured: false,
    published: true,
    sort_order: 120,
  },
  {
    id: 'project-gemar-schuttingen',
    slug: 'gemar-schuttingen',
    title: 'Website voor Gemar Schuttingen',
    category: 'Bouw en buitenruimte',
    excerpt:
      'Een praktische website die projecten, diensten en aanvragen overzichtelijk samenbrengt voor een duidelijke eerste indruk.',
    content:
      'Voor Gemar Schuttingen ontwikkelden we een praktische website waarin diensten, gerealiseerde projecten en contact helder naar voren komen. De site ondersteunt een zakelijke, betrouwbare uitstraling en helpt bezoekers snel te begrijpen wat het bedrijf levert.',
    highlights: [
      'Duidelijke presentatie van diensten',
      'Projecten overzichtelijk in beeld',
      'Gericht op vertrouwen en aanvragen',
    ],
    image_url: '/Projecten/gemar-schuttingen_mockup.png',
    website_url: null,
    featured: false,
    published: true,
    sort_order: 130,
  },
  {
    id: 'project-jteq',
    slug: 'jteq',
    title: 'Website voor JTEQ',
    category: 'Techniek en service',
    excerpt:
      'Een strakke zakelijke website die techniek, dienstverlening en betrouwbaarheid op een heldere manier presenteert.',
    content:
      'Voor JTEQ ontwikkelden we een strakke zakelijke website waarin techniek, dienstverlening en betrouwbaarheid centraal staan. De inhoud is overzichtelijk opgebouwd, zodat bezoekers snel begrijpen wat het bedrijf doet en op welke manier het verschil maakt.',
    highlights: [
      'Zakelijke en moderne uitstraling',
      'Diensten helder gestructureerd',
      'Gebouwd voor duidelijke communicatie',
    ],
    image_url: '/Projecten/jteq_mockup.png',
    website_url: null,
    featured: false,
    published: true,
    sort_order: 140,
  },
  {
    id: 'project-kloppenburg-vloerreiniging',
    slug: 'kloppenburg-vloerreiniging',
    title: 'Website voor Kloppenburg Vloerreiniging',
    category: 'Schoonmaak en onderhoud',
    excerpt:
      'Een website die diensten, werkwijze en betrouwbaarheid duidelijk maakt voor zowel particuliere als zakelijke aanvragen.',
    content:
      'Voor Kloppenburg Vloerreiniging ontwikkelden we een overzichtelijke website die diensten, werkwijze en contact helder presenteert. De site ondersteunt een betrouwbare eerste indruk en helpt bezoekers snel de juiste informatie te vinden.',
    highlights: [
      'Heldere uitleg van diensten',
      'Focus op vertrouwen en resultaat',
      'Geschikt voor mobiel en desktop',
    ],
    image_url: '/Projecten/kloppenburg-vloerreiniging_mockup.png',
    website_url: null,
    featured: false,
    published: true,
    sort_order: 150,
  },
  {
    id: 'project-mce',
    slug: 'mce',
    title: 'Website voor MCE',
    category: 'Techniek en advies',
    excerpt:
      'Een compacte zakelijke website met heldere structuur, duidelijke positionering en een professionele uitstraling.',
    content:
      'Voor MCE ontwikkelden we een compacte zakelijke website die duidelijk laat zien waar het bedrijf voor staat. Door een heldere structuur en rustige vormgeving ontstaat een professionele online basis die vertrouwen uitstraalt en makkelijk uit te breiden is.',
    highlights: [
      'Zakelijke uitstraling',
      'Rustige en heldere opbouw',
      'Basis om later verder uit te bouwen',
    ],
    image_url: '/Projecten/mce_mockup.png',
    website_url: null,
    featured: false,
    published: true,
    sort_order: 160,
  },
  {
    id: 'project-sinq',
    slug: 'sinq',
    title: 'Website voor Sinq',
    category: 'Zakelijke dienstverlening',
    excerpt:
      'Een moderne website die professionaliteit uitstraalt en de dienstverlening in duidelijke taal presenteert.',
    content:
      'Voor Sinq ontwikkelden we een moderne website die professionaliteit uitstraalt en de dienstverlening in duidelijke taal presenteert. De opbouw is overzichtelijk, zodat bezoekers snel begrijpen wat het bedrijf aanbiedt en hoe ze contact kunnen opnemen.',
    highlights: [
      'Moderne zakelijke presentatie',
      'Duidelijke structuur en inhoud',
      'Gericht op vertrouwen en contact',
    ],
    image_url: '/Projecten/sinq_mockup.png',
    website_url: null,
    featured: false,
    published: true,
    sort_order: 170,
  },
]
