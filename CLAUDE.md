@AGENTS.md

# BP-Uitgevers — AI Context & Workflow Rules

## 🚫 CONTEXT RULES (STRICT)

- **NEVER scan the full codebase again** — this setup has been done once
- **Only open files directly relevant to the current task**
- Use the documentation below as your source of truth before reading code
- When unsure about a file's purpose, check `docs/architecture.md` first

---

## 📚 SOURCE OF TRUTH

| What | Where |
|---|---|
| Database schema | `supabase/schema.sql` |
| Architecture | `docs/architecture.md` |
| CMS documentation | `docs/cms.md` |
| Database tables | `docs/database.md` |
| Frontend config | `config/site.config.ts` |
| TypeScript types | `types/database.types.ts` |

---

## 🏗️ PROJECT PURPOSE

This is a **single-client website template** built for BP Uitgevers (Business Publicatie Uitgevers).

- NOT SaaS, NOT multi-tenant in practice
- The `tenant_id` column exists in tables but always uses one fixed ID: `00000000-0000-0000-0000-000000000001`
- `getTenantId()` in `lib/tenant.ts` returns this fixed ID
- The architecture supports future multi-tenancy but currently runs as single-tenant
- **Primary goal**: reusable template, easy to duplicate for other clients

---

## 📁 KEY FILES — Quick Reference

```
app/
  (site)/           → Public website (layout with Navbar + Footer)
  admin/            → CMS dashboard (requires Supabase auth)
  layout.tsx        → Root layout (fonts, metadata)

components/
  site/             → Public-facing components
  admin/            → Admin CMS components
    settings/       → Settings page sub-sections

lib/
  supabase/server.ts   → Server Supabase client
  supabase/client.ts   → Browser Supabase client
  queries/             → Read-only data fetching (server components)
  actions/             → Server actions (mutations, revalidatePath)
  tenant.ts            → getTenantId() — always returns fixed UUID
  utils.ts             → slugify, formatDate, truncate, cn

config/
  site.config.ts    → ALL static defaults (texts, colors, contact info)

types/
  database.types.ts → TypeScript types for all DB tables
```

---

## ⚙️ WORKFLOW RULES

### On database changes:
1. Run SQL in Supabase first
2. Update `supabase/schema.sql`
3. Update `types/database.types.ts`
4. Update `docs/database.md` if structure changed

### On new features:
1. Check `docs/architecture.md` for existing patterns
2. Follow existing query/action patterns
3. Server queries → `lib/queries/`
4. Mutations → `lib/actions/` with `'use server'` + `revalidatePath()`
5. Update relevant docs

### On config changes:
- All client-visible text, colors, contact info → `config/site.config.ts`
- Never hardcode client-specific values in components

---

## 🔧 TECH STACK

- **Next.js 16.2** (App Router) — note breaking changes, check AGENTS.md
- **Supabase** (`@supabase/ssr` v0.9) — SSR client via cookies
- **Tailwind CSS v4** — no config changes needed for new utilities
- **Tiptap v3** — rich text editor in admin
- **Lucide React v1** — icons

---

## 🧩 PATTERNS TO FOLLOW

### Server queries (read-only):
```ts
// lib/queries/example.ts
import { createServerSupabaseClient } from '@/lib/supabase/server'
export async function getItems() {
  const supabase = await createServerSupabaseClient()
  const { data } = await supabase.from('table').select('*').eq('published', true)
  return data ?? []
}
```

### Server actions (mutations):
```ts
// lib/actions/example.actions.ts
'use server'
import { revalidatePath } from 'next/cache'
import { createServerSupabaseClient } from '@/lib/supabase/server'
export async function saveItem(data: {...}) {
  const supabase = await createServerSupabaseClient()
  const { error } = await supabase.from('table').upsert(data)
  if (error) return { success: false, error: error.message }
  revalidatePath('/path', 'layout')
  return { success: true }
}
```

### Admin pages:
- Server components for data loading
- Pass data to `'use client'` form components
- Pattern: `app/admin/[section]/page.tsx` → `components/admin/SectionForm.tsx`

### Public pages with ISR:
```ts
export const revalidate = 60 // top of file
```

---

## ⚠️ KNOWN PATTERNS TO NOT BREAK

1. `getMergedSiteSettings()` — merges DB with `siteConfig` defaults, used in site layout
2. `FALLBACK_NAV` in `Navbar.tsx` — used when DB nav is empty
3. Publication blocks: `publication_blocks` table → `BlockBuilder.tsx` (admin) → `PublicationBlockRenderer.tsx` (site)
4. Auth in admin: handled in `app/admin/layout.tsx` — no redirect on login page to avoid loops
5. Stats bar pattern: same 4 stats on every public page hero

---

## 🚀 DUPLICATION CHECKLIST (new client setup)

1. Create new Supabase project
2. Run `supabase/schema.sql` in SQL editor
3. Update `.env.local` with new Supabase URL + keys
4. Update `config/site.config.ts` with client branding
5. Update `NEXT_PUBLIC_TENANT_ID` in env (or leave default)
6. Upload logo to Supabase storage or set via Admin → Instellingen
