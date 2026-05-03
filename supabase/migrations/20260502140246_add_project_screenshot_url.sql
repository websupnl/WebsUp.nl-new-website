alter table public.projects
  add column if not exists screenshot_url text;

update public.projects
set screenshot_url = concat(
  'https://kmadfbjorglckhzzykvj.supabase.co/storage/v1/object/public/media/',
  tenant_id,
  '/project-screenshots/',
  slug,
  '-fullpage.png'
)
where website_url is not null
  and (screenshot_url is null or screenshot_url = '');
