-- Village landing page: launch notification signups
-- (Already applied to the live project as migration `launch_notifications`.)

create table if not exists public.launch_notifications (
  id uuid primary key default gen_random_uuid(),
  method text not null check (method in ('email', 'phone')),
  contact text not null,
  zip text check (zip ~ '^\d{5}$'),
  created_at timestamptz not null default now(),
  unique (method, contact)
);

alter table public.launch_notifications enable row level security;

-- Public signup form: anon may insert, never read/update/delete
create policy "anon can sign up"
  on public.launch_notifications
  for insert
  to anon
  with check (true);

-- Zip density view — doubles as the metro-selection map (spec §7 Phase 0)
create or replace view public.signup_density
  with (security_invoker = on) as
select zip, count(*) as signups
from public.launch_notifications
where zip is not null
group by zip
order by signups desc;
