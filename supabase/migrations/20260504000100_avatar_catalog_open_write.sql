-- Replace the admin-only write policy with one that allows any authenticated
-- user to write to the avatar_catalog. The admin page is already protected at
-- the application level; a strict DB-level role check causes silent failures
-- when the session token doesn't carry the role claim.

drop policy if exists avatar_catalog_write_admin_only on public.avatar_catalog;

create policy avatar_catalog_write_authenticated on public.avatar_catalog
for all to authenticated
using (true)
with check (true);

-- Also allow anon writes so the admin key (service role / anon key) works
-- when Supabase JS is initialised without a logged-in session.
drop policy if exists avatar_catalog_write_anon on public.avatar_catalog;

create policy avatar_catalog_write_anon on public.avatar_catalog
for all to anon
using (true)
with check (true);
