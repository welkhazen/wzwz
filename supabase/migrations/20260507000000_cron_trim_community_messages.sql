-- Enable pg_cron (no-op if already enabled)
create extension if not exists pg_cron with schema extensions;

-- Grant usage so the cron worker can call the job
grant usage on schema cron to postgres;

-- Function: hard-delete oldest messages per community beyond 150
create or replace function trim_community_messages()
returns void
language plpgsql
security definer
as $$
begin
  delete from community_messages
  where id in (
    select id
    from (
      select
        id,
        row_number() over (
          partition by community_id
          order by created_at desc
        ) as rn
      from community_messages
    ) ranked
    where rn > 150
  );
end;
$$;

-- Schedule: run every hour at :00
select cron.schedule(
  'trim-community-messages',
  '0 * * * *',
  $$ select trim_community_messages(); $$
);
