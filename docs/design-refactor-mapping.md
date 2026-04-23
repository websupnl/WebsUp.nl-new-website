# WebsUp Design Refactor Mapping

Baseline: huidige acceptabele site na rollback.  
Design reference: `Design Richting.html`.

## Fase 1 - Codebase Analyse

### Bestaande publieke basis

- `HeroSection.tsx`: homepage hero met `hero-bg.png`, donkere overlay, CTA's, proof points en platform pills.
- `WavePageHeader.tsx`: herbruikbare donkere header voor subpagina's.
- `CTASection.tsx`: herbruikbare donkere wave CTA boven footer.
- `ServicesSection.tsx`: homepage dienstenblok met intro + kaartgrid.
- `ProjectsSection.tsx`: homepage projectkaarten.
- `Navbar.tsx` en `Footer.tsx`: globale site shell.
- `GradientIcon.tsx`, `overline-badge`, `surface-card`, `btn-brand`, `btn-ghost`, `btn-dark-ghost`: losse styling utilities.

### Bestaande pagina-patronen

- Subpagina's gebruiken meestal `WavePageHeader`.
- Homepage gebruikt nog losse secties: `ProjectsSection`, `ServicesSection`, `AboutMeSection`, `VoorWieSection`, `TestimonialsSection`, `StarterCTASection`, `FAQSection`, `KennisbankPreviewSection`, `CTASection`.
- Detailpagina's hebben eigen layouts en herhalen kaart-, button- en sectiepatronen.

### Inconsistenties

- Typography: `font-headline` staat globaal ook op `h3-h6`, terwijl de designregel is: Genty alleen voor `h1/h2`.
- Headings: globale heading-dot met glow staat nog aan via `page-shell h*::after`; dit botst met "geen glow dots".
- Kleuren: globale tokens bevatten nog `#493ee5`, indigo/blauw shadows en mesh gradients.
- Buttons: er zijn meerdere systemen tegelijk:
  - CSS classes: `btn-brand`, `btn-ghost`, `btn-dark-ghost`
  - shadcn-like `components/ui/button.tsx`
  - inline Tailwind buttons in pagina's en componenten
- Cards: `surface-card` bestaat, maar veel pagina's gebruiken eigen `rounded-[2rem]`, custom shadows en losse borders.
- Gradients: gebruikt voor tekst, navbar CTA en soms icon/radial/background effecten; dit moet strakker begrensd worden.
- Legacy/restanten: enkele oude componenten bevatten nog blauwe/indigo stijlen, maar zijn niet allemaal actief.

### Afwijkingen t.o.v. design reference

- Design reference gebruikt rustige basis: `--surface #f8f9fc`, `--card #fff`, `--rule #e4e8f0`, `--muted #56647a`.
- Huidige globals hebben nog oude indigo primary tokens en mesh/radial gradients.
- Design reference heeft section ritme met `wrap`, consequente max-width, duidelijke `sec-head`, kaart radius rond 16px.
- Huidige site is acceptabel, maar section spacing/card vormen zijn nog verspreid en niet centraal gestuurd.

## Fase 2 - Component Mapping

### Hergebruiken

- `HeroSection.tsx`: behouden als homepage hero; alleen later intern normaliseren naar tokens.
- `WavePageHeader.tsx`: behouden als subpage hero; dit is de enige page-header component.
- `CTASection.tsx`: behouden als enige CTA-sectie.
- `Navbar.tsx` en `Footer.tsx`: behouden, alleen kleur/tokens corrigeren waar nodig.
- `GradientIcon.tsx`: behouden, maar alleen gebruiken waar icon-accent echt nodig is.
- `Reveal.tsx`, `tooltip-card.tsx`, `LoadingLink.tsx`, `AppFeedbackProvider.tsx`: behouden.

### Vervangen of samenvoegen

- Inline button classes in pagina's vervangen door een beperkt button systeem.
- Losse cards in project-, dienst-, kennisbank- en publicatieblokken vervangen door gedeelde card classes of kleine presentational components.
- Custom section headers vervangen door een gedeeld section-header patroon.
- `font-headline` op `h3+` afbouwen naar Inter, behalve wanneer bewust als display-stijl nodig.

### Niet gebruiken / later opruimen

- `ConnectBanner.tsx`: niet opnieuw gebruiken.
- Legacy secties zoals `AboutSection`, `DoelgroepSection`, `FeatureCards`, `ServicesSection` legacy varianten alleen aanpassen als ze actief blijken.
- `magazine-voor-organisaties`: legacy route, niet meenemen in visuele refactor.

### Nieuw maken, maar alleen als dunne primitives

Geen nieuwe hero of CTA.

Wel toegestaan als kleine design-system primitives:

- `SectionShell`: max-width, padding, tone (`white`, `surface`, `dark`).
- `SectionHeader`: overline, title, highlighted title part, description.
- `SiteCard`: basis card wrapper met vaste radius/border/shadow.
- `ButtonLink`: beperkt button systeem voor links (`light`, `dark`, `outline`, `ghost`).
- `PageLoadingSkeleton`: later pas, voor page loading.
- `ActionSpinner`: later pas, voor submit/action states.

## Veilige Implementatievolgorde

1. `globals.css` tokens corrigeren zonder layouts te veranderen:
   - brand tokens naar design reference
   - heading-dot/glow verwijderen
   - Genty beperken tot `h1/h2`
   - hover accent naar orange/pink, niet blauw/indigo
2. Button systeem stabiliseren:
   - bestaande classes behouden als compatibility layer
   - inline buttons pas daarna per component vervangen
3. Card systeem stabiliseren:
   - `surface-card` en `inset-card` aanpassen naar design reference
   - geen page layouts herschrijven
4. Eerst homepage-secties:
   - `ProjectsSection`
   - `ServicesSection`
   - `FAQSection`
   - `KennisbankPreviewSection`
5. Daarna subpagina's met `WavePageHeader`.
6. Daarna detail/edit/admin layouts.

## Guardrails

- Per fase maximaal een kleine set bestanden.
- Na elke fase build-check.
- Geen nieuwe pagina's of vervangende hero/CTA componenten.
- Gradient maximaal 3x per pagina.
- Geen glow dots, bokeh, radial decoration of blauwe legacy accentkleur in actieve site.
- Genty alleen voor `h1/h2`; cards en h3's blijven Inter tenzij expliciet display.
