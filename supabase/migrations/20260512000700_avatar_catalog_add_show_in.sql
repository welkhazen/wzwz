alter table public.avatar_catalog
  add column if not exists show_in text not null default 'both'
    constraint avatar_catalog_show_in_check check (show_in in ('landing', 'app', 'both'));
