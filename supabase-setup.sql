-- =============================================
-- CGHDS Website — Supabase Database Setup
-- Run this entire file in your Supabase SQL editor.
-- Safe to run multiple times (idempotent).
-- =============================================

-- Publications table
create table if not exists public.publications (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  type text not null check (type in ('journal', 'newsletter', 'monograph', 'publication')),
  authors text,
  abstract text,
  publish_date date,
  volume text,
  file_url text,
  external_url text,
  cover_image text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Staff table
create table if not exists public.staff (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  role text not null,
  category text not null check (category in ('current_executive', 'current_staff', 'past_executive', 'past_staff')),
  photo_url text,
  tenure text,
  achievements text,
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Gallery table
create table if not exists public.gallery (
  id uuid default gen_random_uuid() primary key,
  image_url text not null,
  caption text,
  category text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Upcoming Events table (max 1 active event shown on homepage)
create table if not exists public.upcoming_events (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  subtitle text,
  event_date text,
  link text,
  created_at timestamptz default now()
);

-- Events table (appears as cards on the public /events page)
-- Note: "desc" is a reserved SQL keyword, so it must be double-quoted
-- everywhere it's used as a column name (Supabase JS client calls need no quoting).
create table if not exists public.events (
  id uuid default gen_random_uuid() primary key,
  tag text not null default 'CONFERENCE',
  date text,
  title text not null,
  "desc" text,
  img text,
  link text,
  internal boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Auto-update updated_at trigger function
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists publications_updated_at on public.publications;
create trigger publications_updated_at
  before update on public.publications
  for each row execute function update_updated_at();

drop trigger if exists staff_updated_at on public.staff;
create trigger staff_updated_at
  before update on public.staff
  for each row execute function update_updated_at();

drop trigger if exists gallery_updated_at on public.gallery;
create trigger gallery_updated_at
  before update on public.gallery
  for each row execute function update_updated_at();

drop trigger if exists events_updated_at on public.events;
create trigger events_updated_at
  before update on public.events
  for each row execute function update_updated_at();

-- =============================================
-- Row Level Security
-- =============================================
alter table public.publications enable row level security;
alter table public.staff enable row level security;
alter table public.gallery enable row level security;
alter table public.upcoming_events enable row level security;
alter table public.events enable row level security;

-- Anyone can read
drop policy if exists "Anyone can read publications" on public.publications;
create policy "Anyone can read publications" on public.publications for select using (true);

drop policy if exists "Anyone can read staff" on public.staff;
create policy "Anyone can read staff" on public.staff for select using (true);

drop policy if exists "Anyone can read gallery" on public.gallery;
create policy "Anyone can read gallery" on public.gallery for select using (true);

drop policy if exists "Anyone can read upcoming_events" on public.upcoming_events;
create policy "Anyone can read upcoming_events" on public.upcoming_events for select using (true);

drop policy if exists "Anyone can read events" on public.events;
create policy "Anyone can read events" on public.events for select using (true);

-- Only authenticated users (admin) can write
drop policy if exists "Auth users insert publications" on public.publications;
create policy "Auth users insert publications" on public.publications for insert with check (auth.role() = 'authenticated');
drop policy if exists "Auth users update publications" on public.publications;
create policy "Auth users update publications" on public.publications for update using (auth.role() = 'authenticated');
drop policy if exists "Auth users delete publications" on public.publications;
create policy "Auth users delete publications" on public.publications for delete using (auth.role() = 'authenticated');

drop policy if exists "Auth users insert staff" on public.staff;
create policy "Auth users insert staff" on public.staff for insert with check (auth.role() = 'authenticated');
drop policy if exists "Auth users update staff" on public.staff;
create policy "Auth users update staff" on public.staff for update using (auth.role() = 'authenticated');
drop policy if exists "Auth users delete staff" on public.staff;
create policy "Auth users delete staff" on public.staff for delete using (auth.role() = 'authenticated');

drop policy if exists "Auth users insert gallery" on public.gallery;
create policy "Auth users insert gallery" on public.gallery for insert with check (auth.role() = 'authenticated');
drop policy if exists "Auth users update gallery" on public.gallery;
create policy "Auth users update gallery" on public.gallery for update using (auth.role() = 'authenticated');
drop policy if exists "Auth users delete gallery" on public.gallery;
create policy "Auth users delete gallery" on public.gallery for delete using (auth.role() = 'authenticated');

drop policy if exists "Auth users insert upcoming_events" on public.upcoming_events;
create policy "Auth users insert upcoming_events" on public.upcoming_events for insert with check (auth.role() = 'authenticated');
drop policy if exists "Auth users update upcoming_events" on public.upcoming_events;
create policy "Auth users update upcoming_events" on public.upcoming_events for update using (auth.role() = 'authenticated');
drop policy if exists "Auth users delete upcoming_events" on public.upcoming_events;
create policy "Auth users delete upcoming_events" on public.upcoming_events for delete using (auth.role() = 'authenticated');

drop policy if exists "Auth users insert events" on public.events;
create policy "Auth users insert events" on public.events for insert with check (auth.role() = 'authenticated');
drop policy if exists "Auth users update events" on public.events;
create policy "Auth users update events" on public.events for update using (auth.role() = 'authenticated');
drop policy if exists "Auth users delete events" on public.events;
create policy "Auth users delete events" on public.events for delete using (auth.role() = 'authenticated');

-- =============================================
-- ADMIN USER SETUP
-- Go to: Supabase Dashboard → Authentication → Users → Add User
-- Create the admin login there manually (not stored in this file).
-- =============================================

-- Sample publications data (only inserted if the table is currently empty,
-- so rerunning this script won't create duplicates)
insert into public.publications (title, type, authors, abstract, publish_date, volume)
select * from (values
  ('Gender Equality in Sub-Saharan Africa: Progress and Challenges', 'journal', 'Prof. O.I. Aina, Dr. O.O. Ilesanmi', 'This paper examines the multifaceted dimensions of gender equality across Sub-Saharan Africa.', '2024-03-15'::date, '1'),
  ('CGHDS Newsletter — Q1 2025', 'newsletter', 'CGHDS Editorial Team', 'Updates from the Centre including upcoming conferences and student achievements.', '2025-01-20'::date, null),
  ('Humanitarian Response in Crisis-Affected Communities', 'monograph', 'Mrs. I.D. Adefisoye', 'A comprehensive monograph exploring humanitarian response frameworks.', '2023-11-10'::date, '2')
) as v(title, type, authors, abstract, publish_date, volume)
where not exists (select 1 from public.publications);

-- Sample staff data (only inserted if the table is currently empty;
-- replace photo_url values with real image URLs, or upload via the admin panel)
insert into public.staff (name, role, category, photo_url, tenure, achievements, sort_order)
select * from (values
  ('Prof. O.I. Aina (PhD)', 'Founding Director', 'past_executive', 'http://cghds.run.edu.ng/assets/img/executives/prof-aina.jpg', '2020–2023', 'Established CGHDS by Senate mandate in 2020. Led the Centre through its founding years, launching key research programmes and international partnerships.', 1),
  ('Dr. O.O. Ilesanmi (PhD)', 'Director', 'current_executive', 'http://cghds.run.edu.ng/assets/img/executives/dr-mrs-ilesanmi-centre-acting-director.JPG', '2023–Present', 'Currently steering the Centre towards greater research impact, community engagement, and academic excellence.', 1),
  ('Mrs. I.D. Adefisoye', 'Lecturer', 'current_staff', 'http://cghds.run.edu.ng/assets/img/executives/Ibironke-Adefisoye.JPG', '2020–Present', 'Key contributor to CGHDS research publications and academic programming.', 2),
  ('Mrs. Elizabeth A. Salami', 'Admin Staff', 'current_staff', 'http://cghds.run.edu.ng/assets/img/executives/Mrs Salami.jpg', '2020–Present', 'Provides administrative support ensuring smooth day-to-day operations of the Centre.', 3)
) as v(name, role, category, photo_url, tenure, achievements, sort_order)
where not exists (select 1 from public.staff);