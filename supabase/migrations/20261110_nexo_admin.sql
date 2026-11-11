-- Nexo Iguazú: ejecutar manualmente en Supabase > SQL Editor, proyecto nexo-iguazu-dev.
-- Revisión 1: panel admin de excursiones y fotografías. No requiere clave service_role.
-- IMPORTANTE: comprobar el proyecto ANTES de ejecutar. Nunca ejecutar a ciegas en producción.

create table if not exists public.nexo_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.nexo_admins enable row level security;
revoke all on public.nexo_admins from public, anon, authenticated;
grant select on public.nexo_admins to authenticated;
drop policy if exists "nexo_admins_view_own" on public.nexo_admins;
create policy "nexo_admins_view_own"
on public.nexo_admins for select to authenticated
using (user_id = (select auth.uid()));

create or replace function public.is_nexo_admin()
returns boolean language sql stable security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.nexo_admins
    where user_id = (select auth.uid())
  );
$$;
revoke all on function public.is_nexo_admin() from public, anon;
grant execute on function public.is_nexo_admin() to authenticated;

create table if not exists public.nexo_excursions (
  id uuid primary key default gen_random_uuid(),
  title text not null unique check (char_length(btrim(title)) between 3 and 150),
  price_text text not null default 'Consultar',
  duration text not null default '',
  description text not null default '',
  image_url text,
  is_published boolean not null default false,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.nexo_excursions enable row level security;
revoke all on public.nexo_excursions from public, anon, authenticated;
grant select on public.nexo_excursions to anon, authenticated;
grant insert, update, delete on public.nexo_excursions to authenticated;
drop policy if exists "nexo_excursions_public_and_admin_read" on public.nexo_excursions;
drop policy if exists "nexo_excursions_read_published" on public.nexo_excursions;
drop policy if exists "nexo_excursions_admin_read" on public.nexo_excursions;
drop policy if exists "nexo_excursions_admin_insert" on public.nexo_excursions;
drop policy if exists "nexo_excursions_admin_update" on public.nexo_excursions;
drop policy if exists "nexo_excursions_admin_delete" on public.nexo_excursions;
create policy "nexo_excursions_read_published"
on public.nexo_excursions for select to anon, authenticated
using (is_published = true);
create policy "nexo_excursions_admin_read"
on public.nexo_excursions for select to authenticated
using ((select public.is_nexo_admin()));
create policy "nexo_excursions_admin_insert"
on public.nexo_excursions for insert to authenticated
with check ((select public.is_nexo_admin()));
create policy "nexo_excursions_admin_update"
on public.nexo_excursions for update to authenticated
using ((select public.is_nexo_admin()))
with check ((select public.is_nexo_admin()));
create policy "nexo_excursions_admin_delete"
on public.nexo_excursions for delete to authenticated
using ((select public.is_nexo_admin()));

-- Seed inicial para trasladar las excursiones que existen en la página actual.
-- Si ya existe el título, no se sobreescribe ningún precio.
insert into public.nexo_excursions (title, price_text, duration, is_published, position) values
('Cataratas del Iguazú – Lado Argentino', 'Desde $32.000 por persona (mín. 10 pax) — 4 a 9 pax: consultar', 'Día completo (aprox. 6–9 h según ritmo)', true, 1),
('Cataratas Brasil + Parque das Aves', 'Paquete completo: $40.000 por persona (mín. 10 pax) — 4 a 9 pax: consultar', 'Día completo (4–6 h)', true, 2),
('Paraguay/Itaipú', '$50.000 por persona (mín. 10 pax) — 4 a 9 pax: consultar', '', true, 3),
('Compras en Paraguay — Shopping + auto con espera', '$34.000 por persona (mín. 10 pax) — 4 a 9 pax: consultar', '', true, 4),
('Salto del Turista', '$20.000 por persona (mín. 10 pax) — 4 a 9 pax: consultar', 'Medio día (3–5 h)', true, 5),
('Salto Mbocay', '$15.000 por persona (mín. 10 pax) — 4 a 9 pax: consultar', 'Medio día (2–4 h)', true, 6),
('Minas de Wanda', 'A confirmar', 'Medio día (4–6 h)', true, 7),
('Paseo náutico', '$30.000 por persona(mín. 10 pax) — 4 a 9 pax: consultar', '2–3 h', true, 8),
('Selva Iryapú – Comunidades originarias', '$20.000 por persona (mín. 10 pax) — 4 a 9 pax: consultar', '2–4 h', true, 9)
on conflict (title) do nothing;

-- Bucket público: únicamente fotografías destinadas a mostrarse públicamente.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('nexo-excursions', 'nexo-excursions', true, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "nexo_excursions_images_admin_select" on storage.objects;
drop policy if exists "nexo_excursions_images_admin_insert" on storage.objects;
drop policy if exists "nexo_excursions_images_admin_update" on storage.objects;
drop policy if exists "nexo_excursions_images_admin_delete" on storage.objects;

create policy "nexo_excursions_images_admin_select"
on storage.objects for select to authenticated
using (bucket_id = 'nexo-excursions' and (select public.is_nexo_admin()));
create policy "nexo_excursions_images_admin_insert"
on storage.objects for insert to authenticated
with check (bucket_id = 'nexo-excursions' and (select public.is_nexo_admin()));
create policy "nexo_excursions_images_admin_update"
on storage.objects for update to authenticated
using (bucket_id = 'nexo-excursions' and (select public.is_nexo_admin()))
with check (bucket_id = 'nexo-excursions' and (select public.is_nexo_admin()));
create policy "nexo_excursions_images_admin_delete"
on storage.objects for delete to authenticated
using (bucket_id = 'nexo-excursions' and (select public.is_nexo_admin()));

-- NO creamos administradores automáticamente: se asignan manualmente con ID de usuario verificado.
