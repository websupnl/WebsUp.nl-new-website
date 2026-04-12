-- ============================================================
-- WEBSUP.NL — Supabase Schema
-- Plak dit in de Supabase SQL Editor en klik "Run"
-- Project: https://kmadfbjorglckhzzykvj.supabase.co
-- ============================================================

create extension if not exists "uuid-ossp";

-- ============================================================
-- TENANTS
-- ============================================================
create table if not exists tenants (
  id         uuid primary key default uuid_generate_v4(),
  name       text not null,
  domain     text,
  created_at timestamptz not null default now()
);

insert into tenants (id, name, domain)
values ('00000000-0000-0000-0000-000000000001', 'WebsUp.nl', 'websup.nl')
on conflict (id) do nothing;

-- ============================================================
-- SITE_SETTINGS
-- ============================================================
create table if not exists site_settings (
  id              uuid primary key default uuid_generate_v4(),
  tenant_id       uuid not null references tenants(id) on delete cascade,
  site_name       text,
  tagline         text,
  logo_url        text,
  logo_dark_url   text,
  favicon_url     text,
  primary_color   text default '#2563EB',
  secondary_color text default '#1E293B',
  font_family     text default 'Inter',
  email           text,
  phone           text,
  address         text,
  linkedin_url    text,
  og_image_url    text,
  updated_at      timestamptz not null default now(),
  unique (tenant_id)
);

alter table site_settings enable row level security;

create policy "Public kan site_settings lezen"
  on site_settings for select using (true);
create policy "Auth kan site_settings bewerken"
  on site_settings for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

insert into site_settings (
  tenant_id, site_name, tagline, primary_color,
  email, phone, address, linkedin_url
) values (
  '00000000-0000-0000-0000-000000000001',
  'WebsUp.nl',
  'Websites, apps en systemen die groeien.',
  '#2563EB',
  'info@websup.nl',
  '+31 6 12345678',
  'Friesland, Nederland',
  'https://linkedin.com/company/websup'
)
on conflict (tenant_id) do update set
  site_name    = excluded.site_name,
  tagline      = excluded.tagline,
  email        = excluded.email,
  phone        = excluded.phone,
  address      = excluded.address,
  linkedin_url = excluded.linkedin_url,
  updated_at   = now();

-- ============================================================
-- SEO_SETTINGS
-- ============================================================
create table if not exists seo_settings (
  id                   uuid primary key default uuid_generate_v4(),
  tenant_id            uuid not null references tenants(id) on delete cascade,
  meta_title           text,
  meta_description     text,
  keywords             text,
  canonical_url        text,
  og_title             text,
  og_description       text,
  google_analytics_id  text,
  updated_at           timestamptz not null default now(),
  unique (tenant_id)
);

alter table seo_settings enable row level security;

create policy "Public kan seo_settings lezen"
  on seo_settings for select using (true);
create policy "Auth kan seo_settings bewerken"
  on seo_settings for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

insert into seo_settings (
  tenant_id, meta_title, meta_description,
  og_title, og_description, canonical_url
) values (
  '00000000-0000-0000-0000-000000000001',
  'WebsUp.nl | Websites, apps & systemen die groeien',
  'Wij bouwen moderne websites, webshops, maatwerk apps en automatiseringen die jouw bedrijf laten groeien. Persoonlijk, technisch sterk en resultaatgericht.',
  'WebsUp.nl | Websites, apps & systemen die groeien',
  'Maatwerk digitale oplossingen uit Friesland. Next.js, React, Supabase.',
  'https://websup.nl'
)
on conflict (tenant_id) do update set
  meta_title       = excluded.meta_title,
  meta_description = excluded.meta_description,
  og_title         = excluded.og_title,
  og_description   = excluded.og_description,
  updated_at       = now();

-- ============================================================
-- NAVIGATION_ITEMS
-- ============================================================
create table if not exists navigation_items (
  id          uuid primary key default uuid_generate_v4(),
  tenant_id   uuid not null references tenants(id) on delete cascade,
  label       text not null,
  url         text not null,
  type        text not null default 'internal' check (type in ('internal', 'external')),
  location    text not null default 'header' check (location in ('header', 'footer')),
  order_index int not null default 0,
  created_at  timestamptz not null default now()
);

create index if not exists nav_items_tenant_idx
  on navigation_items(tenant_id, location, order_index);

alter table navigation_items enable row level security;

create policy "Public kan navigation_items lezen"
  on navigation_items for select using (true);
create policy "Auth kan navigation_items bewerken"
  on navigation_items for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- WebsUp navigatie
insert into navigation_items (tenant_id, label, url, type, location, order_index) values
  ('00000000-0000-0000-0000-000000000001', 'Home',      '/',          'internal', 'header', 0),
  ('00000000-0000-0000-0000-000000000001', 'Diensten',  '/diensten',  'internal', 'header', 1),
  ('00000000-0000-0000-0000-000000000001', 'Projecten', '/projecten', 'internal', 'header', 2),
  ('00000000-0000-0000-0000-000000000001', 'Contact',   '/contact',   'internal', 'header', 3),
  ('00000000-0000-0000-0000-000000000001', 'Home',      '/',          'internal', 'footer', 0),
  ('00000000-0000-0000-0000-000000000001', 'Diensten',  '/diensten',  'internal', 'footer', 1),
  ('00000000-0000-0000-0000-000000000001', 'Projecten', '/projecten', 'internal', 'footer', 2),
  ('00000000-0000-0000-0000-000000000001', 'Contact',   '/contact',   'internal', 'footer', 3)
on conflict do nothing;

-- ============================================================
-- MODULES (feature flags)
-- ============================================================
create table if not exists modules (
  id         uuid primary key default uuid_generate_v4(),
  tenant_id  uuid not null references tenants(id) on delete cascade,
  key        text not null,
  enabled    boolean not null default true,
  label      text,
  updated_at timestamptz not null default now(),
  unique (tenant_id, key)
);

alter table modules enable row level security;

create policy "Public kan modules lezen"
  on modules for select using (true);
create policy "Auth kan modules bewerken"
  on modules for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

insert into modules (tenant_id, key, enabled, label) values
  ('00000000-0000-0000-0000-000000000001', 'testimonials', true,  'Testimonials'),
  ('00000000-0000-0000-0000-000000000001', 'contact_form', true,  'Contactformulier'),
  ('00000000-0000-0000-0000-000000000001', 'blog',         false, 'Blog / Nieuws'),
  ('00000000-0000-0000-0000-000000000001', 'cta',          true,  'CTA sectie')
on conflict (tenant_id, key) do nothing;

-- ============================================================
-- TESTIMONIALS
-- ============================================================
create table if not exists testimonials (
  id         uuid primary key default uuid_generate_v4(),
  tenant_id  uuid references tenants(id) on delete cascade,
  name       text not null,
  role       text,
  content    text not null,
  rating     int not null default 5 check (rating >= 1 and rating <= 5),
  avatar_url text,
  published  boolean not null default false,
  created_at timestamptz not null default now()
);

alter table testimonials enable row level security;

create policy "Public kan gepubliceerde testimonials lezen"
  on testimonials for select
  using (published = true);
create policy "Auth kan testimonials beheren"
  on testimonials for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ============================================================
-- NEWS_ARTICLES (optioneel — voor blog/nieuws later)
-- ============================================================
create table if not exists news_articles (
  id           uuid primary key default uuid_generate_v4(),
  tenant_id    uuid not null default '00000000-0000-0000-0000-000000000001'
               references tenants(id) on delete cascade,
  title        text not null,
  slug         text not null unique,
  excerpt      text,
  content      text,
  image_url    text,
  status       text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists news_slug_idx    on news_articles(slug);
create index if not exists news_status_idx  on news_articles(status, created_at desc);
create index if not exists news_tenant_idx  on news_articles(tenant_id, status, created_at desc);

alter table news_articles enable row level security;

create policy "Public kan gepubliceerde artikelen lezen"
  on news_articles for select
  using (status = 'published');
create policy "Auth kan nieuws beheren"
  on news_articles for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ============================================================
-- PUBLICATIONS (optioneel — herbruikbaar voor case studies)
-- ============================================================
create table if not exists publications (
  id          uuid primary key default uuid_generate_v4(),
  tenant_id   uuid references tenants(id) on delete cascade,
  title       text not null,
  slug        text not null unique,
  description text,
  excerpt     text,
  label       text,
  content     text,
  image_url   text,
  published   boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists publications_slug_idx      on publications(slug);
create index if not exists publications_published_idx on publications(published, created_at desc);
create index if not exists publications_tenant_idx    on publications(tenant_id, published, created_at desc);

alter table publications enable row level security;

create policy "Public kan gepubliceerde publicaties lezen"
  on publications for select
  using (published = true);
create policy "Auth kan publicaties beheren"
  on publications for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ============================================================
-- PUBLICATION_BLOCKS
-- ============================================================
create table if not exists publication_blocks (
  id             uuid primary key default uuid_generate_v4(),
  publication_id uuid not null references publications(id) on delete cascade,
  type           text not null default 'text' check (type in ('text', 'features', 'cta')),
  title          text,
  content        text,
  order_index    int not null default 0,
  created_at     timestamptz not null default now()
);

create index if not exists pub_blocks_pub_idx on publication_blocks(publication_id, order_index);

alter table publication_blocks enable row level security;

create policy "Public kan publication_blocks lezen"
  on publication_blocks for select using (true);
create policy "Auth kan publication_blocks beheren"
  on publication_blocks for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ============================================================
-- STORAGE BUCKET: media
-- ============================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict do nothing;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where tablename = 'objects' and policyname = 'Public kan media lezen'
  ) then
    create policy "Public kan media lezen"
      on storage.objects for select
      using (bucket_id = 'media');
  end if;

  if not exists (
    select 1 from pg_policies
    where tablename = 'objects' and policyname = 'Auth kan media uploaden'
  ) then
    create policy "Auth kan media uploaden"
      on storage.objects for insert
      with check (bucket_id = 'media' and auth.role() = 'authenticated');
  end if;

  if not exists (
    select 1 from pg_policies
    where tablename = 'objects' and policyname = 'Auth kan media updaten'
  ) then
    create policy "Auth kan media updaten"
      on storage.objects for update
      using (bucket_id = 'media' and auth.role() = 'authenticated');
  end if;

  if not exists (
    select 1 from pg_policies
    where tablename = 'objects' and policyname = 'Auth kan media verwijderen'
  ) then
    create policy "Auth kan media verwijderen"
      on storage.objects for delete
      using (bucket_id = 'media' and auth.role() = 'authenticated');
  end if;
end $$;

-- ============================================================
-- ADMIN USER AANMAKEN
-- Na het runnen van dit schema:
-- 1. Ga naar Supabase Dashboard → Authentication → Users
-- 2. Klik "Add user" → vul jouw email + wachtwoord in
-- 3. Je kunt dan inloggen op /admin/login
-- ============================================================
