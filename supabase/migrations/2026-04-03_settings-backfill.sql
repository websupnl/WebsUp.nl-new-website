create extension if not exists "uuid-ossp";

create table if not exists tenants (
  id         uuid primary key default uuid_generate_v4(),
  name       text not null,
  domain     text,
  created_at timestamptz not null default now()
);

insert into tenants (id, name, domain)
values ('00000000-0000-0000-0000-000000000001', 'Default', 'localhost')
on conflict (id) do nothing;

create table if not exists site_settings (
  id                uuid primary key default uuid_generate_v4(),
  tenant_id         uuid not null references tenants(id) on delete cascade,
  site_name         text,
  tagline           text,
  logo_url          text,
  logo_dark_url     text,
  favicon_url       text,
  primary_color     text default '#2563EB',
  secondary_color   text default '#1E293B',
  font_family       text default 'Inter',
  email             text,
  phone             text,
  address           text,
  linkedin_url      text,
  og_image_url      text,
  updated_at        timestamptz not null default now(),
  unique (tenant_id)
);

alter table site_settings enable row level security;

drop policy if exists "Public kan site_settings lezen" on site_settings;
create policy "Public kan site_settings lezen"
  on site_settings for select using (true);

drop policy if exists "Auth kan site_settings bewerken" on site_settings;
create policy "Auth kan site_settings bewerken"
  on site_settings for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

insert into site_settings (tenant_id)
values ('00000000-0000-0000-0000-000000000001')
on conflict (tenant_id) do nothing;

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

drop policy if exists "Public kan seo_settings lezen" on seo_settings;
create policy "Public kan seo_settings lezen"
  on seo_settings for select using (true);

drop policy if exists "Auth kan seo_settings bewerken" on seo_settings;
create policy "Auth kan seo_settings bewerken"
  on seo_settings for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

insert into seo_settings (tenant_id)
values ('00000000-0000-0000-0000-000000000001')
on conflict (tenant_id) do nothing;

create table if not exists navigation_items (
  id           uuid primary key default uuid_generate_v4(),
  tenant_id    uuid not null references tenants(id) on delete cascade,
  label        text not null,
  url          text not null,
  type         text not null default 'internal' check (type in ('internal', 'external')),
  location     text not null default 'header' check (location in ('header', 'footer')),
  order_index  int not null default 0,
  created_at   timestamptz not null default now()
);

create index if not exists nav_items_tenant_idx
  on navigation_items(tenant_id, location, order_index);

alter table navigation_items enable row level security;

drop policy if exists "Public kan navigation_items lezen" on navigation_items;
create policy "Public kan navigation_items lezen"
  on navigation_items for select using (true);

drop policy if exists "Auth kan navigation_items bewerken" on navigation_items;
create policy "Auth kan navigation_items bewerken"
  on navigation_items for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

insert into navigation_items (tenant_id, label, url, type, location, order_index) values
  ('00000000-0000-0000-0000-000000000001', 'Home', '/', 'internal', 'header', 0),
  ('00000000-0000-0000-0000-000000000001', 'Over ons', '/over-ons', 'internal', 'header', 1),
  ('00000000-0000-0000-0000-000000000001', 'Publicaties', '/publicaties', 'internal', 'header', 2),
  ('00000000-0000-0000-0000-000000000001', 'Contact', '/contact', 'internal', 'header', 3)
on conflict do nothing;

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

drop policy if exists "Public kan modules lezen" on modules;
create policy "Public kan modules lezen"
  on modules for select using (true);

drop policy if exists "Auth kan modules bewerken" on modules;
create policy "Auth kan modules bewerken"
  on modules for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

insert into modules (tenant_id, key, enabled, label) values
  ('00000000-0000-0000-0000-000000000001', 'blog', true, 'Blog'),
  ('00000000-0000-0000-0000-000000000001', 'testimonials', true, 'Testimonials'),
  ('00000000-0000-0000-0000-000000000001', 'cta', true, 'CTA sectie'),
  ('00000000-0000-0000-0000-000000000001', 'contact_form', true, 'Contactformulier')
on conflict (tenant_id, key) do nothing;

create table if not exists forms (
  id         uuid primary key default uuid_generate_v4(),
  tenant_id  uuid not null references tenants(id) on delete cascade,
  name       text not null,
  email_to   text,
  fields     jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table forms enable row level security;

drop policy if exists "Public kan forms lezen" on forms;
create policy "Public kan forms lezen"
  on forms for select using (true);

drop policy if exists "Auth kan forms bewerken" on forms;
create policy "Auth kan forms bewerken"
  on forms for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

alter table publications add column if not exists tenant_id uuid references tenants(id) on delete cascade;
update publications
set tenant_id = '00000000-0000-0000-0000-000000000001'
where tenant_id is null;

alter table testimonials add column if not exists tenant_id uuid references tenants(id) on delete cascade;
update testimonials
set tenant_id = '00000000-0000-0000-0000-000000000001'
where tenant_id is null;
