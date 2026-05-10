# WebsUp.nl — Full Redesign Plan
## Referentie: Stripe · Apple · Victron Energy niveau

---

## 1. Design DNA — wat maakt deze sites zo goed?

### Stripe
- Elk scherm heeft één visuele focus
- Gradient achtergrond die *leeft* (subtiel animated mesh)
- Typography: grote display koppen, altijd tight tracking (-0.04em+)
- Glassmorphism cards die boven de bg zweven
- Micro-animations op alles: hover states, scroll reveals, gradient shifts
- Nooit meer dan 2 acties per sectie

### Apple
- Whitespace als designelement — niets is ooit druk
- Headline = max 5 woorden, altijd een statement of vraag
- Sectie-breedte wisselt (full-bleed vs narrow content) — creëert ritme
- Foto's zijn editorial: scherp, groot, crop-tight, geen stockfoto's
- Animaties zijn physics-based (spring curves), niet lineair

### Victron Energy
- Dark-first, technisch maar niet koud
- Gradient accenten op key data/nummers
- Grid layouts die asymmetrisch zijn maar toch kloppen
- Vertrouwenssignalen (stats, specs) zijn prominent maar niet druk

---

## 2. Wat er mis is aan de huidige site

| Probleem | Impact |
|---|---|
| Hero headline: 8 woorden, te klein display | ❌ Geen impact |
| Sectie-headers zijn te druk en dicht op elkaar | ❌ Leest als tekst, niet als design |
| ServicesSection: geen beelden, alleen text+nummers | ❌ Saai, geen leven |
| AboutMe: card met checklist = AI cliché | ❌ Voelt gegenereerd |
| ReviewsSection: kleine cards in een rij | ❌ Geen vertrouwen, geen impact |
| Animaties: alleen eenvoudige fade-reveals | ❌ Website "leeft" niet |
| WavePageHeader: te lange titels | ❌ Kop heeft geen punch |
| Geen cursor interactie, geen hover-personality | ❌ Voelt statisch |

---

## 3. Redesign structuur

### Homepage secties (nieuwe volgorde + aanpak)

#### Hero (dark, full viewport)
- **Headline**: max 4-5 woorden, 2 regels, enorm. Bijv: "Gebouwd om te groeien." of "Digitaal. Strak. Persoonlijk."
- Gradient animated bg (mesh gradient, langzaam shift)
- Daan's foto: editorial, rechts, geen card-border — blended in achtergrond
- Animated headline (woorden staggered in op page load)
- CTA: 1 primary (gradient) + 1 ghost
- Trust strip onderaan: 3 pills, geen borders/icons
- WhatsApp floating CTA bij foto (al gebouwd ✓)

#### Stats strip (nieuw, tussen hero en problem)
- Stripe-stijl horizontale strip
- 4 nummers: "5+ projecten" · "100% maatwerk" · "< 24u reactie" · "Friesland & heel NL"
- Kleine gradient op de cijfers
- Scheidt hero van de rest visueel

#### Problem section (dark, editorial)
- Headline max 5 woorden: "Drie redenen waarom het misloopt."
- Numbered list (01/02/03) — al verbeterd ✓
- Meer ademruimte (grotere padding)

#### Services (dark, met echte beelden)
- Titelbadge + korte kop
- 2×2 grid kaarten MET afbeelding
- Elke kaart: foto links (gradient overlay) + tekst rechts
- Hover: card lift + gradient shimmer op foto
- Stijl: denk aan Stripe's product features

#### Projects (full-bleed, asymmetrisch)
- Grote featured project bovenaan (full-width)
- 2-col grid eronder
- Geen bullets — alleen titel + korte tag

#### About (licht, editorial)
- Titel: "Geen bureau. Gewoon ik." (al goed ✓)
- Foto: groot, tilted, al goed ✓
- GEEN card met checklist → vervangen door inline chips/pills met naam-labels
- Blockquote als vertrouwenssignaal (al goed ✓)

#### Reviews (dark, Stripe-stijl)
- Titel: simpel — "Wat ze zeggen." of "In hun woorden."
- Eén grote featured quote: HUGE font, gradient aanhalingstekens
- Marquee eronder voor extra reviews
- Geen cards — quote staat gewoon op de dark bg

#### CTA (full-bleed dark, gradient)
- Al redelijk goed — headline aanpassen naar 4 woorden max

---

## 4. Animatie strategie

### Page load sequence (hero)
```
0ms   — gradient bg fade in
100ms — eyebrow badge slide up
200ms — headline woord 1 slide up
280ms — headline woord 2 slide up
360ms — subtitle fade in
440ms — CTA buttons fade up
600ms — photo parallax start + fade in
700ms — trust pills fade in
```

### Scroll reveals
- Alle secties: `opacity: 0 → 1` + `translateY: 32px → 0`
- Duur: 600ms, easing: `cubic-bezier(0.16, 1, 0.3, 1)` (spring-achtig)
- Stagger binnen secties: 80ms per element

### Hover states
- Cards: `translateY: -4px` + subtiele shadow toename
- Links: `color shift` + `translateX: 2px` op pijl-iconen
- Foto: schaal naar 1.02 (subtiel)
- CTA gradient knop: gradient animation + lift

### Background animations
- Hero gradient: langzame radial-gradient shift (20s infinite)
- Grain overlay: al aanwezig, goed ✓

### Cursor (optioneel maar impactvol)
- Custom cursor dot (8px, gradient) die volgt met spring delay
- Op hover over cards/links: cursor vergroot naar 32px, blend-mode difference

---

## 5. Typography fixes

| Element | Huidig | Correct |
|---|---|---|
| Hero h1 | `clamp(2.8rem, 5.8vw, 5.2rem)` | `clamp(3.5rem, 8vw, 7.5rem)` |
| Hero leading | `1.02` | `0.95` |
| Hero tracking | `-0.04em` | `-0.05em` |
| Section h2 | `clamp(2.2rem, 4.5vw, 3.6rem)` | `clamp(2.5rem, 5vw, 4.5rem)` |
| Section leading | `1.06` | `1.0` |
| Body text line-height | `1.6` (goed) | behouden |

---

## 6. Services sectie — beelden

Per dienst 1 image nodig (Unsplash, royalty-free):
- Websites: `https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80` (web design)
- Webshops: `https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80` (ecommerce)
- Apps/dashboards: `https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80` (dashboard)
- Automatisering: `https://images.unsplash.com/photo-1518432031352-d6fc5734c3d0?w=800&q=80` (automation)

Behandeling:
- Overlay: `linear-gradient(135deg, rgba(6,4,12,0.7) 0%, rgba(6,4,12,0.2) 100%)`
- Hover: scale(1.04) op het beeld, 700ms ease

---

## 7. Prioriteit volgorde voor implementatie

1. Typography fixes (headline sizes + leading) — snelste impact
2. Hero animatie (staggered entrance)
3. Stats strip toevoegen
4. Services met beelden
5. Reviews redesign (grote quote, simpel)
6. AboutMe card → bullets
7. Custom cursor
8. WavePageHeader titels korter maken

---
