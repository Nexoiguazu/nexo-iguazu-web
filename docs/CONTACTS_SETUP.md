# Nexo Iguazú — contactos útiles y asesoramiento por WhatsApp

Esta versión se desarrolla en `feature/auth-email-google`. Nunca ejecutar
migraciones en una base de datos real sin confirmar el proyecto y hacer
copia de seguridad si hay información importante.

## 1. Crear el directorio administrable
- Abrí **Supabase > nexo-iguazu-dev > SQL Editor > New query**.
- En GitHub, rama `feature/auth-email-google`, abrí
  `supabase/migrations/20261111_nexo_contacts.sql`.
- Copiá el contenido completo, revisá que el destino sea SOLO
  `nexo-iguazu-dev`, y presioná **Run**.
- Debería aparecer un resultado exitoso. En Table Editor existirán
  `nexo_contacts` y `nexo_settings`.
- El script conserva los 10 contactos que estaban cargados en código,
  con sus categorías, etiquetas, teléfonos y horarios. Un teléfono que
  estaba incompleto se deja sin teléfono en la tabla para evitar enlaces rotos.
- Esta migración no sobreescribe cambios posteriores de una fila existente
  (usa `on conflict do nothing`).

La migración requiere que ya exista `is_nexo_admin()` y la tabla
`nexo_admins` creadas por `20261110_nexo_admin.sql`.

## 2. Usar el panel
- Iniciar sesión con tu cuenta administradora en una URL Preview de Vercel.
- Entrar a `/admin`, y presionar **Gestionar contactos útiles**.
- También se puede abrir `/admin/contactos` directamente.
- Seleccionar categoría, completar nombre, zona, dirección, horario,
  teléfono, WhatsApp, mapa y etiquetas.
- Marcar **Publicar este contacto en la página**.
- Guardar, abrir la página principal y actualizar con F5.
- Desde la lista podrás editar, ocultar o eliminar contactos.
- Si no aparece la opción, comprobar permisos de administradora y que la
  migración se haya ejecutado sin errores.

## 3. WhatsApp de asesoramiento, sin chat
- En `/admin/contactos`, buscar **WhatsApp de asesoramiento**.
- Cargar el número oficial que controlás (código de país y área,
  solo dígitos, 10 a 15 en total; por ejemplo, un número argentino suele
  comenzar por 54).
- Guardar.
- Actualizar la página principal y `/contacto`.
- Los botones de excursiones, contacto y transfer usarán ese mismo número
  con un mensaje preescrito. Si no está configurado, no se publica ningún
  enlace con un número ficticio o incompleto.
- El botón de WhatsApp propio de cada comercio (si fue informado) es
  distinto y se gestiona en la ficha de ese comercio.

## 4. Seguridad y límites
- La tabla `nexo_contacts` aplica RLS; solo contactos publicados pueden
  ser leídos por visitantes. Solo administradores pueden crear, editar o
  borrar.
- La configuración de WhatsApp permite lectura pública del número oficial,
  pero solamente administradores pueden modificarlo.
- Validar teléfonos, horarios y enlaces antes de publicar. Son datos
  aportados originalmente al sitio, no verificados automáticamente.
- No se ha construido un chat privado, ni se envían mensajes WhatsApp de
  forma automática. El usuario abre su aplicación para enviar el mensaje.
- `/mi-cuenta` dirige al turista a `/contacto`, sin prometer un chat.
- Los cambios en Supabase Preview son para pruebas, **no** para producción.
