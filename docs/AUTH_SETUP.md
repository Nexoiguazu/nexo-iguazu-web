# Nexo Iguazú — registro e inicio de sesión (rama de desarrollo)

## Estado
Implementación inicial: correo/contraseña, alta de usuario, Google OAuth y página Mi cuenta.
No incluye todavía chat, roles de administrador ni recuperación de contraseña.
No fusionar a main sin configurar y probar el entorno de preview.

## Supabase
1. Crear un proyecto en https://supabase.com/dashboard.
2. En Authentication > Providers, activar Email y habilitar confirmación por correo.
3. En Authentication > Providers > Google, activar Google y configurar OAuth Client ID/Secret en Google Cloud; registrar el callback de Supabase que muestra el panel.
4. En Authentication > URL Configuration, registrar la URL de preview de Vercel y las URLs de retorno autorizadas terminadas en /mi-cuenta. Configurar Site URL acorde al entorno.
5. No agregar claves secretas/service_role al navegador ni al repositorio.

## Vercel
Configurar NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en el entorno Preview.
Usar URL de preview estable o configurar redirecciones permitidas para previews dinámicos.
No activar en Production hasta terminar pruebas.

## Dependencias
Se incorpora @supabase/supabase-js en package.json. Regenerar y confirmar el lockfile
con el gestor de paquetes elegido (el repositorio contiene pnpm-lock.yaml y package-lock.json)
antes de ejecutar un deploy con instalación congelada.

## Pruebas
- Registro por email y recepción de confirmación.
- Inicio y cierre de sesión por contraseña.
- Inicio de sesión por Google y retorno a /mi-cuenta.
- Usuarios no autenticados no ven datos privados.
- Comprobar preview en Vercel y probar en celular.
- Diseñar RLS y autorización de roles antes de crear panel admin o chat.

## Seguridad
La ruta /mi-cuenta muestra solo información básica del usuario autenticado.
El control de acceso a futuros datos se implementará en Supabase mediante RLS.
No conceder permisos de administrador desde el cliente ni basados solo en email.
