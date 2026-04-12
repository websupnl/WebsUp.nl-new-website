# BP Uitgevers — Next.js Website Template

Moderne, schaalbare zakelijke website template gebouwd met Next.js 16, Supabase en Tailwind CSS. Herbruikbaar per klant via een centrale config.

---

## Stack

| Technologie | Gebruik |
|---|---|
| Next.js 16 (App Router) | Frontend + server components |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Supabase | Database + Auth + Storage |
| Tiptap | WYSIWYG editor in admin |
| Cloudflare Pages | Deployment |

---

## Snel starten

### 1. Supabase project aanmaken

1. Ga naar [supabase.com](https://supabase.com) en maak een nieuw project
2. Voer het schema uit via SQL Editor:
   - Open `supabase/schema.sql`
   - Plak de inhoud in de Supabase SQL Editor en run
3. Maak een Storage bucket aan:
   - Ga naar Storage → New Bucket
   - Naam: `media`, zet op **Public**
   - Voeg storage policies toe (zie `supabase/schema.sql` onderaan)

### 2. Environment variables instellen

```bash
cp .env.local.example .env.local
```

Vul in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://jouw-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=jouw-anon-key
SUPABASE_SERVICE_ROLE_KEY=jouw-service-role-key
```

### 3. Admin gebruiker aanmaken

1. Ga naar Supabase → Authentication → Users
2. Klik "Add user" en voer een e-mail + wachtwoord in
3. Dit zijn de inloggegevens voor `/admin`

### 4. Lokaal draaien

```bash
npm install
npm run dev
```

Open `http://localhost:3000`

---

## Per klant aanpassen

### Branding en content (snel)

Pas `config/site.config.ts` aan:

```typescript
export const siteConfig = {
  name: "Naam van de klant",
  email: "info@klant.nl",
  phone: "+31 6 12345678",
  brand: {
    primary: "#2563EB",  // Kleur aanpassen
  },
  hero: {
    heading: "Jouw unieke propositie",
  },
}
```

### Dynamische instellingen (via admin panel)

Na deployment kan de klant via `/admin/instellingen` bedrijfsnaam, e-mail, telefoon en meer aanpassen zonder code.

---

## Structuur

```
app/
  (site)/          - Publieke website
    page.tsx       - Homepage
    over-ons/
    publicaties/
    contact/
  admin/           - Beheer panel
    login/
    publicaties/
    testimonials/
    instellingen/
components/
  site/            - Website componenten
  admin/           - Admin componenten
config/
  site.config.ts   - PER KLANT aanpassen
lib/
  supabase/        - Supabase clients
  queries/         - Database queries
supabase/
  schema.sql       - Database schema
types/
  database.types.ts
```

---

## Deployment: Cloudflare Pages

1. Push naar GitHub
2. Cloudflare Pages → Create project → koppel GitHub repo
3. Build settings:
   - Build command: `npm run build`
   - Output directory: `.next`
   - Node version: `20`
4. Environment variables instellen in Cloudflare dashboard

---

## Types updaten na schema wijziging

```bash
npx supabase gen types typescript --project-id jouw-project-id > types/database.types.ts
```

---

Gebouwd door [WebsUp.nl](https://websup.nl)
