-- =============================================
-- Migration: add "literature" publication type
-- Run this in your Supabase SQL editor if you already
-- have the publications table set up from an earlier
-- version of supabase-setup.sql. Safe to run multiple times.
-- =============================================

-- 1. Widen the type check constraint to allow 'literature'.
--    Postgres auto-names this constraint publications_type_check
--    unless you renamed it — this drops whatever check constraint
--    currently exists on the type column and re-adds it correctly.
alter table public.publications drop constraint if exists publications_type_check;
alter table public.publications
  add constraint publications_type_check
  check (type in ('journal', 'literature', 'newsletter', 'monograph', 'publication'));

-- 2. Add an optional column so a publication can link to a bespoke
--    in-app detail page (e.g. /publications/literature/okafor-and-ikwubizo)
--    instead of just a raw file/external link. Leave it blank for any
--    publication that doesn't have a custom page.
alter table public.publications add column if not exists detail_path text;

-- 3. Seed the literature article shown in the design mockups, if you
--    haven't already added it yourself via the admin panel.
insert into public.publications (title, type, authors, abstract, publish_date, volume, file_url, detail_path)
select
  'Women as ''Other'': Gender Bias in Male-Authored Igbo Literature',
  'literature',
  'Ebele Eucharia Okafor, Iwu Ikwubuzo (PhD)',
  'A comparative study of two post-war Igbo novels examining how their male authors portray women, and how that portrayal shifts over time.',
  '2026-01-01'::date,
  '1',
  '/documents/women-as-other-gender-bias-igbo-literature.pdf',
  '/publications/literature/okafor-and-ikwubizo'
where not exists (
  select 1 from public.publications where detail_path = '/publications/literature/okafor-and-ikwubizo'
);

-- Note: the PDF referenced above ships as a static file at
-- public/documents/women-as-other-gender-bias-igbo-literature.pdf
-- in this repo. If you'd rather serve it from Supabase Storage
-- (recommended once you're managing it via the admin panel), upload
-- it through Admin → Publications → Document File, which will
-- overwrite file_url with the Storage URL automatically.
