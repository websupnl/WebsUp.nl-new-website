# WebsUp.nl — Volledige site-inventaris voor AI-assistenten

**Lees dit ALTIJD voordat je iets aanmaakt of aanpast.**
**Gebruik daarnaast ook altijd `CLAUDE.md` als aanvullende projectinstructie bij elke taak in deze repository.**
Maak nooit een pagina, component of lib-bestand aan dat hieronder al bestaat.

---

## 🎨 Branding & Design System

| Element | Waarde |
|---|---|
| Brand gradient | `linear-gradient(135deg, #f97316 0%, #ec4899 50%, #a78bfa 100%)` |
| Dark bg kleur | `#06040c` |
| Primaire tekst bg | `bg-slate-900` |
| Gradient alleen op | Tekst highlights + "Gratis ontwerp" nav-knop |
| Knoppen | `bg-white text-slate-900` (licht) of `bg-slate-900 text-white` (donker) |
| Accent hover kleur | `text-orange-500` / `hover:text-orange-500` (NIET indigo/blue/violet) |
| Hero animatie class | `.hero-wave-bg` → `hero-wave-drift` keyframe in `globals.css` |
| CSS gradient class | `.gradient-text` → brand gradient op tekst |
| Badge class | `.overline-badge` → oranje tint, pink border |

---

## 📄 Publieke pagina's (`app/(site)/`)

| Route | Bestand | Status | Beschrijving |
|---|---|---|---|
| `/` | `app/(site)/page.tsx` + `app/page.tsx` (homepage) | ✅ Actief | Homepage met HeroSection, SolutionsSection, BentoSection, WhySection, CTASection |
| `/diensten` | `app/(site)/diensten/page.tsx` | ✅ Actief | Overzicht diensten als 4-card grid + tech stack tooltips sectie |
| `/diensten/websites` | `app/(site)/diensten/[slug]/page.tsx` | ✅ Actief | Statische detailpagina via SERVICES object |
| `/diensten/webshops` | ← zelfde slug pagina | ✅ Actief | |
| `/diensten/apps-dashboards` | ← zelfde slug pagina | ✅ Actief | |
| `/diensten/automatisering` | ← zelfde slug pagina | ✅ Actief | |
| `/projecten` | `app/(site)/projecten/page.tsx` | ✅ Actief | Portfolio: stats balk, featured 2-col cards, meer grid |
| `/projecten/[slug]` | `app/(site)/projecten/[slug]/page.tsx` | ✅ Actief | Projectdetail pagina |
| `/kennisbank` | `app/(site)/kennisbank/page.tsx` | ✅ Actief | Kennisbank artikellijst (gebruikt `news_articles` tabel) |
| `/kennisbank/[slug]` | `app/(site)/kennisbank/[slug]/page.tsx` | ✅ Actief | Kennisbank artikeldetail |
| `/over-ons` | `app/(site)/over-ons/page.tsx` | ✅ Actief | Over Daan + stats + waarden-cards |
| `/contact` | `app/(site)/contact/page.tsx` | ✅ Actief | Contactformulier + contactgegevens (`'use client'`) |
| `/blog` | `app/(site)/blog/page.tsx` | ✅ Aanwezig | Blog overzicht (zelfde data als kennisbank) |
| `/blog/[slug]` | `app/(site)/blog/[slug]/page.tsx` | ✅ Aanwezig | Blog artikeldetail |
| `/nieuws` | `app/(site)/nieuws/page.tsx` | ✅ Aanwezig | Nieuwsoverzicht |
| `/nieuws/[slug]` | `app/(site)/nieuws/[slug]/page.tsx` | ✅ Aanwezig | Nieuwsdetail |
| `/publicaties` | `app/(site)/publicaties/page.tsx` | ✅ Aanwezig | Publicaties overzicht (kennisbank-template) |
| `/publicaties/[slug]` | `app/(site)/publicaties/[slug]/page.tsx` | ✅ Aanwezig | Publicatiedetail |
| `/privacybeleid` | `app/(site)/privacybeleid/page.tsx` | ✅ Aanwezig | Privacy policy |
| `/cookies` | `app/(site)/cookies/page.tsx` | ✅ Aanwezig | Cookiebeleid |
| `/algemene-voorwaarden` | `app/(site)/algemene-voorwaarden/page.tsx` | ✅ Aanwezig | Algemene voorwaarden |
| `/magazine-voor-organisaties` | `app/(site)/magazine-voor-organisaties/page.tsx` | ⚠️ Legacy | BP Uitgevers restant — niet gelinkt, niet aanpassen |

---

## 🔐 Admin pagina's (`app/admin/`)

| Route | Bestand | Beschrijving |
|---|---|---|
| `/admin/login` | `app/admin/login/page.tsx` | Supabase auth login |
| `/admin` | `app/admin/(protected)/page.tsx` | Dashboard: stats, recente publicaties & artikelen |
| `/admin/kennisbank` | `app/admin/(protected)/kennisbank/page.tsx` | Kennisbank artikelen lijst |
| `/admin/kennisbank/new` | `app/admin/(protected)/kennisbank/new/page.tsx` | Nieuw kennisbank artikel |
| `/admin/kennisbank/[id]` | `app/admin/(protected)/kennisbank/[id]/page.tsx` | Kennisbank artikel bewerken |
| `/admin/nieuws` | `app/admin/(protected)/nieuws/page.tsx` | Nieuwsartikelen lijst |
| `/admin/nieuws/new` | `app/admin/(protected)/nieuws/new/page.tsx` | Nieuw nieuwsartikel |
| `/admin/nieuws/[id]` | `app/admin/(protected)/nieuws/[id]/page.tsx` | Nieuwsartikel bewerken |
| `/admin/publicaties` | `app/admin/(protected)/publicaties/page.tsx` | Publicaties lijst |
| `/admin/publicaties/new` | `app/admin/(protected)/publicaties/new/page.tsx` | Nieuwe publicatie |
| `/admin/publicaties/[id]` | `app/admin/(protected)/publicaties/[id]/page.tsx` | Publicatie bewerken (BlockBuilder) |
| `/admin/testimonials` | `app/admin/(protected)/testimonials/page.tsx` | Testimonials lijst |
| `/admin/testimonials/new` | `app/admin/(protected)/testimonials/new/page.tsx` | Nieuwe testimonial |
| `/admin/testimonials/[id]` | `app/admin/(protected)/testimonials/[id]/page.tsx` | Testimonial bewerken |
| `/admin/instellingen` | `app/admin/(protected)/instellingen/page.tsx` | Site instellingen (branding, SEO, nav, contact) |

---

## 🧩 Components — Site (`components/site/`)

| Component | Gebruik |
|---|---|
| `Navbar.tsx` | Sticky nav met animated mega-menu voor Diensten, transparant→wit op scroll, gradient "Gratis ontwerp" knop |
| `Footer.tsx` | Footer met logo (zwart), nav kolommen, contact, socials |
| `HeroSection.tsx` | Homepage hero: donker, geanimeerd wave bg, platform tooltips (`'use client'`) |
| `WavePageHeader.tsx` | Herbruikbare donkere pagina-header (alle subpagina's) |
| `SolutionsSection.tsx` | Homepage "Wat ik bouw" — 4-card grid (zelfde stijl als diensten) |
| `BentoSection.tsx` | Homepage bento/use-cases grid |
| `WhySection.tsx` | Homepage "Waarom WebsUp" + testimonials |
| `CTASection.tsx` | Wave-bg CTA boven footer — alleen dit type CTA gebruiken |
| `ConnectBanner.tsx` | Oud banner component — **NIET meer gebruiken op pagina's** |
| `CookieBanner.tsx` | Cookie consent banner (localStorage, `'use client'`) |
| `AboutSection.tsx` | Legacy — niet actief gebruikt |
| `DoelgroepSection.tsx` | Legacy — niet actief gebruikt |
| `FeatureCards.tsx` | Legacy — niet actief gebruikt |
| `LatestNewsSection.tsx` | Nieuwssectie component |
| `NewsCard.tsx` | Nieuwskaart component |
| `ProcessSection.tsx` | Werkwijze sectie |
| `ProjectsSection.tsx` | Projecten sectie |
| `PublicationBlockRenderer.tsx` | Rendert publicatie blokken op site |
| `PublicationCard.tsx` | Publicatiekaart |
| `PublicationGrid.tsx` | Publicatiegrid |
| `PublicationViewer.tsx` | Publicatie viewer |
| `ServicesSection.tsx` | Legacy diensten sectie — niet actief |
| `TestimonialsSection.tsx` | Testimonials component |
| `TrustStrip.tsx` | Vertrouwensbalk |
| `VoorWieSection.tsx` | "Voor wie" sectie |
| `WhatsAppButton.tsx` | WhatsApp floating button |
| `WhyWebsUpSection.tsx` | "Waarom WebsUp" sectie (legacy) |
| `WordAuteurSection.tsx` | Legacy — niet actief |

---

## 🧩 Components — Admin (`components/admin/`)

| Component | Gebruik |
|---|---|
| `AdminHeader.tsx` | Admin topbar |
| `AdminSidebar.tsx` | Admin navigatie sidebar |
| `BlockBuilder.tsx` | Drag & drop blokken editor voor publicaties |
| `MediaUploader.tsx` | Bestandsupload naar Supabase Storage |
| `NewsForm.tsx` | Formulier voor nieuws/kennisbank artikelen |
| `PublicationForm.tsx` | Formulier voor publicaties |
| `TestimonialForm.tsx` | Formulier voor testimonials |
| `TiptapEditor.tsx` | Rich text editor (Tiptap v3) |
| `settings/SettingsClient.tsx` | Client wrapper voor instellingen |
| `settings/BedrijfsinfoSection.tsx` | Bedrijfsinformatie instelling |
| `settings/BrandingSection.tsx` | Logo/kleur instelling |
| `settings/FormBuilderSection.tsx` | Formulier builder |
| `settings/ModulesSection.tsx` | Module aan/uitzetten |
| `settings/NavigatieSection.tsx` | Navigatie items beheren |
| `settings/SeoSection.tsx` | SEO instellingen |

---

## 🧩 Components — UI (`components/ui/`)

| Component | Gebruik |
|---|---|
| `Reveal.tsx` | Scroll-in fade animatie wrapper |
| `tooltip-card.tsx` | Animated mouse-follow tooltip (motion/react) |
| `AppFeedbackProvider.tsx` | Toast/feedback context provider |
| `LoadingLink.tsx` | Link met loading state |

---

## 📚 Lib (`lib/`)

| Bestand | Gebruik |
|---|---|
| `queries/news.ts` | `getNewsArticles()`, `getNewsArticleBySlug()`, `getAllNewsAdmin()` |
| `queries/publications.ts` | `getPublications()`, `getPublicationBySlug()` |
| `queries/testimonials.ts` | `getTestimonials()` |
| `queries/settings.ts` | `getSiteSettings()` |
| `queries/site-settings.ts` | `getMergedSiteSettings()`, `getMergedSeoSettings()`, `getNavigationItems()` |
| `actions/news.actions.ts` | `saveNewsArticle()`, `deleteNewsArticle()` |
| `actions/publications.actions.ts` | `savePublication()`, `deletePublication()` |
| `actions/testimonials.actions.ts` | `saveTestimonial()`, `deleteTestimonial()` |
| `actions/settings.actions.ts` | `saveSiteSettings()` |
| `supabase/server.ts` | `createServerSupabaseClient()` — SSR client |
| `supabase/client.ts` | `createBrowserSupabaseClient()` — browser client |
| `supabase/schema-helpers.ts` | `isMissingColumnError()` |
| `tenant.ts` | `getTenantId()` → altijd `00000000-0000-0000-0000-000000000001` |
| `utils.ts` | `slugify()`, `formatDate()`, `truncate()`, `cn()` |
| `auth/admin.ts` | Admin auth helpers |
| `security/` | Rate limiting, validatie, content security |

---

## 🖼️ Public assets (`public/`)

| Bestand | Gebruik |
|---|---|
| `WebsUp favicon.png` | Favicon (ook in `app/favicon.png`) |
| `WebsUp.nl logo wit.png` | Logo navbar (transparante bg / donkere header) |
| `WebsUp.nl logo zwart.png` | Logo navbar (witte bg, scrolled) + footer |
| `hero-bg.png` | Donkere wave achtergrond — gebruikt in ALLE heroes |
| `wave.webp` | Oud wave beeld — niet actief |
| `connect-bg.webp` | ConnectBanner achtergrond — niet meer gebruikt |
| `group-of-young-business-people-*.jpg` | CTA sectie afbeelding (legacy) |

---

## ⚙️ Navigatie (config)

Definitief in `config/site.config.ts`:
```
Diensten → /diensten
Projecten → /projecten
Kennisbank → /kennisbank
Over ons → /over-ons
Contact → /contact
```

Navbar logica: als DB nav < config nav items → gebruik `siteConfig.nav` als fallback (FALLBACK_NAV).
Gradient "Gratis ontwerp" knop staat altijd rechts naast de nav — dit is de **enige** knop op de site met een gradient achtergrond.

---

## 🚫 Nooit opnieuw aanmaken

- Geen nieuwe hero component — gebruik `WavePageHeader` of `HeroSection`
- Geen nieuwe CTA sectie — gebruik `CTASection`
- Geen nieuwe tooltip — gebruik `components/ui/tooltip-card.tsx`
- Geen `ConnectBanner` meer toevoegen op pagina's
- Geen `indigo`, `blue-6xx`, `violet`, `purple` kleuren gebruiken — altijd brand kleuren (`orange-500`, `pink-500`, gradient)
- Geen `gradient` op knoppen — alleen op tekst highlights en de "Gratis ontwerp" navbar knop
