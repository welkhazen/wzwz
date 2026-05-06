-- Consolidate avatar_catalog RLS policies into a single clean set.
-- Multiple overlapping policies (especially anon ALL + anon SELECT) can
-- confuse PostgREST's schema cache and return 500 on SELECT.

drop policy if exists avatar_catalog_read_all on public.avatar_catalog;
drop policy if exists avatar_catalog_write_all on public.avatar_catalog;
drop policy if exists avatar_catalog_write_admin_only on public.avatar_catalog;
drop policy if exists avatar_catalog_write_anon on public.avatar_catalog;
drop policy if exists avatar_catalog_write_authenticated on public.avatar_catalog;

-- Read: anyone can see active avatars.
create policy avatar_catalog_read
  on public.avatar_catalog for select
  to anon, authenticated
  using (is_active = true);

-- Write: admin panel uses the publishable (anon) key, so anon needs write access.
create policy avatar_catalog_write
  on public.avatar_catalog for all
  to anon, authenticated
  using (true)
  with check (true);

notify pgrst, 'reload schema';
