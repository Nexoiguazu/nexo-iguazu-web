# Nexo Iguazú — activar el panel administrativo (solo entorno de pruebas)

## Qué se agregó
La ruta /admin permite a una cuenta autorizada:
- editar el texto de los precios;
- modificar duración y descripción;
- subir una fotografía JPG, PNG o WebP (máx. 5 MB);
- crear, publicar, ocultar y eliminar excursiones.

La página de inicio consulta los datos publicados en la base de datos. Si la base
de datos aún no existe, conserva los precios y excursiones originales en código.
El panel NO incluye aún chat privado, reservas, ni cuentas con varios roles editables.

## Antes de comenzar
1. Seguir trabajando solamente en la rama feature/auth-email-google.
2. Verificar que Supabase sea el proyecto **nexo-iguazu-dev**, no uno de producción.
3. No pegar claves secretas, contraseñas ni identificadores de usuarios en un chat.
4. Realizar copia de seguridad si ya existen datos reales en la base de datos.

## Paso 1 — Crear las tablas y el almacenamiento
1. Entrar a https://supabase.com/dashboard y abrir el proyecto nexo-iguazu-dev.
2. Abrir SQL Editor > New query.
3. En GitHub, abrir **supabase/migrations/20261110_nexo_admin.sql**
   desde la rama feature/auth-email-google.
4. Copiar el contenido completo, revisar el proyecto destino y ejecutarlo UNA vez
   con Run. El script es repetible: las tablas se crean si no existen y el
   catálogo inicial se inserta solo cuando un título todavía no existe.
5. Comprobar en Table Editor que exista public.nexo_excursions.

ADVERTENCIA: Ejecutar SQL Editor tiene permisos elevados. Este script debe
ejecutarse solamente en el proyecto de pruebas.

## Paso 2 — Asignar TU cuenta como administradora (manualmente)
1. En Supabase > Authentication > Users, identificar exactamente la cuenta que
   controlás y que querés usar como administradora.
2. Copiar su **UID** (identificador del usuario) desde esa pantalla.
3. En Supabase > SQL Editor > New query, ejecutar la siguiente instrucción
   reemplazando el texto del ejemplo por el UID real; NO enviar el UID a ChatGPT:

```sql
insert into public.nexo_admins (user_id)
values ('PEGAR_AQUI_EL_UID_DE_TU_CUENTA')
on conflict (user_id) do nothing;
```

4. Nunca configurar un usuario administrador por defecto desde el navegador o
   por su correo sin verificar identidad. Solo esta inserción manual o una
   operación de servidor con privilegios podrá asignar el rol.
5. Para revocar el acceso, borrar ese UID de public.nexo_admins desde SQL Editor.

## Paso 3 — Probar en Vercel
1. Abrir el despliegue más reciente de **Preview**, NO Production.
2. En Supabase > Authentication > URL Configuration, agregar el retorno
   `https://URL-DE-TU-PREVIEW.vercel.app/mi-cuenta`.
3. Iniciar sesión con tu cuenta desde /login.
4. Entrar en /mi-cuenta. Aparecerá **Abrir panel de administración** si el
   usuario está autorizado. También se puede acceder a /admin directamente.
5. Editar una excursión de prueba, guardar el nuevo precio y visitar el inicio.
6. Subir una imagen pequeña, guardar, y comprobar que se muestra en la tarjeta.
7. Ocultar y volver a publicar una excursión de prueba.

## Seguridad implementada
- La tabla nexo_admins no acepta inserciones ni modificaciones desde el navegador.
- La base de datos aplica Row Level Security a las excursiones.
- Los visitantes solo pueden leer excursiones publicadas.
- Solo administradores pueden modificar las excursiones y subir imágenes.
- El bucket nexo-excursions es PÚBLICO para visualizar fotos de excursiones:
  no subir documentos privados, fotos de clientes ni imágenes sensibles.
- Las claves secretas o service_role nunca deben aparecer en NEXT_PUBLIC_*.

## Cambios y límites
- Los enlaces de WhatsApp de las tarjetas originales contienen números
  incompletos; se corregirán en otra etapa con un número autorizado.
- Las otras excursiones informativas que no tienen precio siguen siendo
  contenido estático y todavía no se gestionan desde el panel.
- El inicio ahora carga datos de Supabase al abrirse; para ver ediciones
  recientes hay que actualizar la página.
- La opción Eliminar borra el registro de la excursión; no elimina la imagen
  subida del bucket (limpieza manual de archivos no usados en Storage).
- No migrar esta base de datos de pruebas a producción ni fusionar a main
  hasta probar roles, fotos, precios, formularios, móviles y recuperación de
  errores y aprobar expresamente el lanzamiento.
