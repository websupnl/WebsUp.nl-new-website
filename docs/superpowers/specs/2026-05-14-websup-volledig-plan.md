# WebsUp.nl — Volledig Implementatieplan
**Datum:** 14 mei 2026  
**Status:** Actief — bijwerken bij elke sessie

---

## ✅ KLAAR (deze sessie)

- Hero: 2-regels headline, 3 pills, overlay verlicht, mobile padding
- HeroRotatingWord: rode squiggle, grotere cursor, helderdere selectie
- EcosystemSection: Website→Auto→Dashboard→Groei, animated pulse, hover
- ProblemSection: dark glassmorphism redesign
- WhatsApp float button: hover card met Daan-foto + glass card
- Navbar logo: responsive sizing (h-10 sm:h-14 md:h-20)
- PushNotification: git push naar main ✅

---

## 🔴 KRITIEK — Direct fixen (bugs/broken)

### 1. `/gratis-ontwerp` pagina bestaat niet — 404!
Navbar CTA + sidebar CTA linken beide naar `/gratis-ontwerp` maar de pagina bestaat niet.

**Oplossing A (snel):** Redirect alle `/gratis-ontwerp` links naar `/contact`  
**Oplossing B (goed):** Maak een aparte `/gratis-ontwerp` pagina — een mini intake formulier:
- Stap 1: Wat voor project? (website / webshop / dashboard / automatisering)
- Stap 2: Budget range + urgentie
- Stap 3: Contact gegevens
- Daan ontvangt email via Resend / Supabase action
- Succespagina met warm bericht van Daan

**Aanbeveling:** Oplossing B — sterkste conversietool van de site.

### 2. Sidebar stagger animatie werkt niet
De `transitionDelay` staat op kleur-transitie, maar items animeren niet echt in.

**Fix:** Items beginnen met `opacity: 0` + `translateX(-16px)` en animeren naar visible wanneer `menuOpen = true`.

```tsx
style={{
  opacity: menuOpen ? 1 : 0,
  transform: menuOpen ? 'translateX(0)' : 'translateX(-16px)',
  transitionDelay: menuOpen ? `${i * 55}ms` : '0ms',
  transition: 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1)',
}}
```

### 3. Hero wave animatie — te subtiel
`hero-wave-drift` is 22 seconden — bijna onzichtbaar. Verlagen naar 14s + overlay nog iets lichter op de rechterkant zodat de wave zichtbaarder is.

---

## 🟠 HOOG — Homepage sectie redesigns

### 4. ServicesSection — dark redesign
**Huidig:** `bg-white` met saaie service cards  
**Doel:** Donker, asymmetrisch grid — passend bij de rest

Lay-out idee:
- Groot featured card (Website) links, 70% breedte — met screenshot/mockup gradient
- Kleine cards rechts gestacked (Webshop, Dashboard, Automatisering)
- Elk met icon, titel, 2-3 bullets, CTA-link
- Hover: subtle glow in brand kleur per dienst
- Background: `bg-[#06040c]` met subtiele grid-textuur

### 5. AboutMeSection — premium persoonlijk
**Huidig:** `bg-slate-50` — generiek en vlak  
**Doel:** Dark editorial — Daan als betrouwbare maker

- Links: grote foto van Daan (al aanwezig: `/Daan Koolhaas.jpg`)
- Rechts: headline + persoonlijke tekst + 4-5 waarden-pills
- Waarden: `Eerlijk`, `Direct`, `Technisch`, `Friesland`, `Maatwerkdenker`
- Statistieken: subtiel onderaan — niet als stat-blokjes maar als inline tekst
- Achtergrond: donker met ambient orb links-boven
- Geen "over mij" template-vibes — schrijf als Daan zelf praat

### 6. ReviewsSection — verbeterde dark versie
**Huidig:** `bg-white` — terwijl reviews juist de donkere marquee-versie al heeft  
**Check:** Was al donker met marquee in vorige sessie? Controleer of bg-white nog klopt of al vervangen is.  
**Fix indien nodig:** `bg-[#06040c]` + glassmorphism review cards

### 7. CTASection — integreer met dark flow
**Huidig:** `bg-white` wrapper om een donkere inner card — vreemd contrast  
**Fix:** Wrapper ook donker maken, of de section uitbreiden tot een full-bleed dark CTA met Daan-foto op de achtergrond

---

## 🟡 MIDDEL — Subpagina's redesign

### 8. /diensten — dienstenpagina
**Huidig:** Dark header ✅, dan `bg-white` grid van service cards, dan `bg-slate-50` tech stack  
**Probleem:** Harde overgang naar wit na de donkere hero

**Plan:**
- Behoud WavePageHeader (donker) ✅
- Services grid: dark versie — zelfde stijl als nieuwe homepage ServicesSection
- Tech stack sectie: dark glassmorphism tooltips/pills
- Onderaan: CTASection dark

### 9. /diensten/[slug] — service detailpagina's
**Huidig:** Statische data via SERVICES object — onbekende staat  
**Plan:**
- Elke pagina: dark hero met dienstnaam + tagline
- "Wat krijg je" sectie: dark cards
- "Proces" sectie: numbered steps dark
- CTA onderaan

### 10. /over-ons — over Daan
**Huidig:** Dark hero ✅, dan meerdere `bg-white` secties  
**Plan:**
- Volledige dark redesign alle secties
- Persoonlijk verhaal — waarom WebsUp, Friesland, de dubbele carrière
- Tijdlijn van Daan's traject (Bouma → freelance → WebsUp)
- Waarden-sectie premium dark cards
- Foto's van het werk / de persoon

### 11. /projecten — portfolio
**Huidig:** `bg-slate-50` wrapper, cards zijn donker (slate-900)  
**Plan:**
- Wrapper donker: `bg-[#06040c]`
- Featured project: full-bleed dark card met screenshot
- Grid: premium glassmorphism cards
- Filter op type (website / webshop / dashboard)

### 12. /contact — contactpagina
**Huidig:** Dark hero ✅, dan `bg-white` met contactformulier  
**Plan:**
- Formulier: dark glassmorphism card
- Rechts: Daan's contactinfo + WhatsApp CTA + beschikbaarheid indicator
- Formulier direct naar Supabase / Resend email

---

## 🟢 LAAG — Micro-animaties & polish

### 13. CTA pijl "bouwt" bij hover
De `ArrowRight` in knoppen moet progressief tevoorschijn komen.

```tsx
// Pijl begint onzichtbaar/links, schuift in bij hover
<ArrowRight className="translate-x-[-4px] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
```

### 14. Scroll-progress indicator
Dunne oranje/roze/paarse lijn bovenaan de pagina die vult naarmate je scrolt.

### 15. Page transitions
Tussen pagina's: subtiele fade-in via Next.js layout animatie.

### 16. Avatar hover status dynamisch
In de Daan hover card: de status pulseert en wisselt subtiel:
- "Nu beschikbaar"
- "Reageert doorgaans dezelfde dag"

### 17. Navbar `active` indicator
Geen dot voor actieve pagina (al verwijderd), maar misschien subtiele gradient underline op het active nav-item in de sidebar.

---

## 🔵 NIEUW — Pagina's aanmaken

### 18. /gratis-ontwerp — intake pagina (PRIORITEIT #1)
Multi-stap formulier:
1. Soort project kiezen (4 tiles)
2. Budget + planning
3. Naam + email + telefoon + korte beschrijving
4. Versturen → Supabase `contact_requests` tabel + Resend email naar Daan

### 19. /kennisbank — blog/artikelen
**Huidig:** Bestaat al, heeft CMS  
**Check:** Dark redesign van de listing en detail pagina's

### 20. Privacy / Cookies / Algemene voorwaarden
**Huidig:** Aanwezig maar waarschijnlijk bland  
**Plan:** Dark header + leesbare content layout

---

## 🟣 TECHNIEK & SEO

### 21. SEO optimalisatie
- OG images per pagina (Next.js `generateImageMetadata`)
- Sitemap.xml genereren
- Structured data (LocalBusiness schema voor Daan/WebsUp)
- robots.txt controleren

### 22. Performance
- Image optimization audit (sizes/quality op alle Next.js Images)
- Lazy loading voor secties onder de fold
- Font loading strategie checken

### 23. Analytics
- Google Analytics ID instellen via Admin → Instellingen
- Goal tracking: contactformulier submissions, WhatsApp clicks

### 24. Cookie consent
- CookieBanner al aanwezig ✅
- Controleren of GA pas laadt na consent

---

## 📐 DESIGN SYSTEEM — Consistentie

### 25. Dark mode als standaard voor alle secties
Alle secties op `bg-[#06040c]` of varianten (`bg-[#07050e]`, `bg-[#080616]`)  
Nooit meer `bg-white` of `bg-slate-50` als hoofdachtergrond — hooguit als card-achtergrond binnenin een dark section.

### 26. Section overgangs-gradient
Tussen secties een subtiele gradient zodat de overgang vloeiend is:
```css
.section-blend-bottom {
  background: linear-gradient(to bottom, transparent, #06040c);
}
```

### 27. Consistente typografie-hiërarchie
- H1: `clamp(1.75rem, 4.2vw, 3.8rem)` — hero
- H2: `clamp(1.6rem, 3vw, 2.6rem)` — sectiekoppen
- H3: `clamp(1rem, 1.6vw, 1.3rem)` — card titels
- Body: `0.9rem` / `0.95rem` leading-relaxed
- Small: `0.72rem` - `0.78rem` voor labels/badges

---

## 🔧 AANBEVOLEN VOLGORDE

1. `/gratis-ontwerp` redirect → `/contact` (5 min) OF intake pagina (2u)
2. Sidebar stagger fix (15 min)
3. ServicesSection dark redesign (1.5u)
4. AboutMeSection dark redesign (1u)
5. ReviewsSection check/fix (30 min)
6. CTASection wrapper fix (20 min)
7. /contact dark formulier (1u)
8. /over-ons dark redesign (1.5u)
9. /diensten dark redesign (1u)
10. /projecten dark wrapper fix (30 min)
11. CTA pijl micro-animatie (20 min)
12. Scroll progress bar (30 min)
13. /gratis-ontwerp intake pagina (3u)
14. SEO audit (1u)
15. Performance audit (1u)

---

## 📊 SAMENVATTING AUDIT (14 mei 2026)

| Sectie/Pagina | Status | Prioriteit |
|---|---|---|
| Hero | ✅ Dark + animations | — |
| EcosystemSection | ✅ Nieuw, dark | — |
| ProblemSection | ✅ Dark redesign | — |
| ServicesSection | ❌ bg-white | 🟠 Hoog |
| AboutMeSection | ❌ bg-slate-50 | 🟠 Hoog |
| ReviewsSection | ❌ bg-white | 🟠 Hoog |
| CTASection | ⚠️ Wrapper wit | 🟡 Middel |
| ProjectsSection | ⚠️ Wrapper licht | 🟡 Middel |
| Navbar | ✅ Goed | — |
| WhatsApp button | ✅ Hover card | — |
| /gratis-ontwerp | ❌ 404! | 🔴 KRITIEK |
| Sidebar stagger | ❌ Werkt niet echt | 🔴 Kritiek |
| /diensten | ⚠️ Mix dark/wit | 🟡 Middel |
| /over-ons | ⚠️ Mix dark/wit | 🟡 Middel |
| /contact | ⚠️ Formulier op wit | 🟡 Middel |
| /projecten | ⚠️ Wrapper licht | 🟡 Middel |
| SEO/Analytics | ❓ Onbekend | 🟢 Laag |
| /gratis-ontwerp intake | ❌ Niet aanwezig | 🔴 Sterk aanbevolen |
