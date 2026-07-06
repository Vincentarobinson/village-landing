-- Village landing page: launch notification signups
-- Run in the Supabase SQL editor.

create table if not exists public.launch_notifications (
  id uuid primary key default gen_random_uuid(),
  method text not null check (method in ('email', 'phone')),
  contact text not null,
  zip text check (zip ~ '^\d{5}$'),
  created_at timestamptz not null default now(),
  unique (method, contact)
);

-- RLS on; the service role key (used by the API route) bypasses RLS,
-- and no anon access is granted.
alter table public.launch_notifications enable row level security;

-- Zip density view — doubles as the metro-selection map (spec §7 Phase 0)
create or replace view public.signup_density as
select zip, count(*) as signups
from public.launch_notifications
where zip is not null
group by zip
order by signups desc;
