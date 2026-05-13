alter table public.avatar_catalog
  add column if not exists show_in text not null default 'both';
