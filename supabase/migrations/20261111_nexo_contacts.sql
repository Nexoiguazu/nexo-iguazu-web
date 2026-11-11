-- Nexo Iguazú - catálogo de contactos útiles y WhatsApp de asesoramiento.
-- Ejecutar SOLO en el proyecto de Supabase nexo-iguazu-dev, tras revisar la consulta.
-- Requiere haber ejecutado 20261110_nexo_admin.sql (función is_nexo_admin).
-- Esta migración no cambia registros ya editados: ON CONFLICT DO NOTHING.

create table if not exists public.nexo_contacts (
  id text primary key default gen_random_uuid()::text,
  name text not null check (char_length(btrim(name)) between 2 and 150),
  category text not null check (category in ('farmacias','supermercados','comidas','otros')),
  zone text not null default '',
  hours text not null default '',
  phone text,
  whatsapp text,
  address text not null default '',
  maps_url text,
  tags text[] not null default '{}',
  is_published boolean not null default false,
  position integer not null default 50,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint nexo_contacts_phone_format check (
    phone is null or regexp_replace(phone, '[^0-9]', '', 'g') ~ '^[0-9]{10,15}$'
  ),
  constraint nexo_contacts_whatsapp_format check (
    whatsapp is null or regexp_replace(whatsapp, '[^0-9]', '', 'g') ~ '^[0-9]{10,15}$'
  ),
  constraint nexo_contacts_maps_https check (
    maps_url is null or maps_url ~ '^https://'
  )
);

alter table public.nexo_contacts enable row level security;
revoke all on public.nexo_contacts from public, anon, authenticated;
grant select on public.nexo_contacts to anon, authenticated;
grant insert, update, delete on public.nexo_contacts to authenticated;

drop policy if exists "nexo_contacts_public_read" on public.nexo_contacts;
drop policy if exists "nexo_contacts_admin_read" on public.nexo_contacts;
drop policy if exists "nexo_contacts_admin_insert" on public.nexo_contacts;
drop policy if exists "nexo_contacts_admin_update" on public.nexo_contacts;
drop policy if exists "nexo_contacts_admin_delete" on public.nexo_contacts;

create policy "nexo_contacts_public_read"
on public.nexo_contacts for select to anon, authenticated
using (is_published = true);

create policy "nexo_contacts_admin_read"
on public.nexo_contacts for select to authenticated
using ((select public.is_nexo_admin()));

create policy "nexo_contacts_admin_insert"
on public.nexo_contacts for insert to authenticated
with check ((select public.is_nexo_admin()));

create policy "nexo_contacts_admin_update"
on public.nexo_contacts for update to authenticated
using ((select public.is_nexo_admin()))
with check ((select public.is_nexo_admin()));

create policy "nexo_contacts_admin_delete"
on public.nexo_contacts for delete to authenticated
using ((select public.is_nexo_admin()));

-- Contactos que ya figuran públicamente en ContactsSection.tsx.
-- Revisar horarios y números antes de hacer difusión masiva: son datos preexistentes.
insert into public.nexo_contacts
  (id, name, category, zone, hours, phone, whatsapp, maps_url, tags, is_published, position)
values
('farm-rys', 'Rys', 'farmacias', 'Av. Republica Argentina 189', 'Lun a Sab 07:00–21:30 / Dom 09:00–12:30 y 17:00–21:00',
 '+543757434398', '+543757434398', 'https://maps.app.goo.gl/wYEbvcDJkL8drYsP8',
 array['delivery','obra social','OSDE','Prevención Salud','Swiss Medical','Medifé','TV Salud'], true, 1),
('farm-gio-farma', 'Gio Farma', 'farmacias', 'Av. Republica Argentina 757', 'Lun a Sab 07:00–23:00 / Dom 09:30 y 17:00–21:00',
 '+543757363911', '+543757363911', 'https://maps.app.goo.gl/X9gCevVpch4gmZdc6',
 array['delivery','mín $5.000','web: giofarma.ar','horario a confirmar'], true, 2),
('sup-autoservicio-cataratas', 'Autoservicio Cataratas', 'supermercados', 'B. Nuevo Iguazú', '08:00–12:30 / 16:00–22:00',
 '+543757502533', '+543757502533', null, array['envíos','mín $6.000'], true, 3),
('com-la-tucumana', 'La Tucumana (Pizzas y Empanadas)', 'comidas', 'Centro', '20:00–23:55',
 '+543757678538', '+543757678538', null, array['delivery','miércoles cerrado'], true, 4),
('com-imperio', 'Imperio', 'comidas', 'Centro', '20:00–00:00',
 '+543757516565', '+543757516565', 'https://maps.app.goo.gl/znMRL4QPGfxoZZ3w6', array['delivery','lunes cerrado'], true, 5),
('com-lidia-delicias', 'Lidia Delicias', 'comidas', 'Centro', '19:00–23:00',
 '+543757442783', '+543757442783', null, array['delivery','todos los días'], true, 6),
('otr-heladeria-duomo', 'Heladería Duomo', 'otros', 'Centro', '17:00–23:00',
 '+543757446949', '+543757446949', 'https://maps.app.goo.gl/m2S2Znm4MhBVnwzt5', array['delivery','heladería'], true, 7),
('com-gaby-chipas', 'Gaby Chipas', 'comidas', 'Centro', '08:00–18:00',
 '+543757554314', '+543757554314', 'https://maps.app.goo.gl/GbpF3zZrM5t67XUi9', array['envíos','chipa'], true, 8),
('com-jasy-restaurante', 'Jasy Restaurante', 'comidas', 'Centro', '18:00–00:00',
 '+543757576678', '+543757625928', 'https://maps.app.goo.gl/m7q1JDg6AjkxpP5K6', array['sin envíos','2 teléfonos'], true, 9),
-- El número de Importado Paraguay estaba incompleto; no publicarlo como teléfono.
('otr-importado-paraguay', 'Importado Paraguay', 'otros', '', '', null, null, null,
 array['tel incompleto','compras en Paraguay','mandado'], true, 10)
on conflict (id) do nothing;

-- Un solo número de WhatsApp para asesoramiento de Nexo Iguazú.
-- No cargar ningún número ficticio: el administrador deberá completarlo.
create table if not exists public.nexo_settings (
  key text primary key,
  value_text text not null default '',
  updated_at timestamptz not null default now(),
  constraint nexo_settings_advice_phone_check check (
    key <> 'advisory_whatsapp'
    or value_text = ''
    or regexp_replace(value_text, '[^0-9]', '', 'g') ~ '^[0-9]{10,15}$'
  )
);

alter table public.nexo_settings enable row level security;
revoke all on public.nexo_settings from public, anon, authenticated;
grant select on public.nexo_settings to anon, authenticated;
grant insert, update on public.nexo_settings to authenticated;

drop policy if exists "nexo_settings_public_advisory" on public.nexo_settings;
drop policy if exists "nexo_settings_admin_read" on public.nexo_settings;
drop policy if exists "nexo_settings_admin_insert" on public.nexo_settings;
drop policy if exists "nexo_settings_admin_update" on public.nexo_settings;

create policy "nexo_settings_public_advisory"
on public.nexo_settings for select to anon, authenticated
using (key = 'advisory_whatsapp');

create policy "nexo_settings_admin_read"
on public.nexo_settings for select to authenticated
using ((select public.is_nexo_admin()));

create policy "nexo_settings_admin_insert"
on public.nexo_settings for insert to authenticated
with check ((select public.is_nexo_admin()));

create policy "nexo_settings_admin_update"
on public.nexo_settings for update to authenticated
using ((select public.is_nexo_admin()))
with check ((select public.is_nexo_admin()));

insert into public.nexo_settings(key, value_text)
values('advisory_whatsapp', '')
on conflict (key) do nothing;
