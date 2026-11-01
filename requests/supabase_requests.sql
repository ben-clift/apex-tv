-- Run once in the Supabase SQL Editor. Safe pattern: the public anon key can only add requests,
-- read them, and add a vote. It cannot edit or delete. Clear the list from the dashboard.
create table if not exists requests (
  id bigint generated always as identity primary key,
  track text not null check (char_length(track) <= 80),
  who text check (char_length(who) <= 30),
  votes int not null default 1,
  created_at timestamptz default now()
);
alter table requests enable row level security;
create policy "read requests" on requests for select using (true);
create policy "add requests" on requests for insert with check (votes = 1);

create or replace function vote(req_id bigint) returns void
language sql security definer as $$ update requests set votes = votes + 1 where id = req_id; $$;
grant execute on function vote(bigint) to anon;
