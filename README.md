# NEXO IGUAZU (v0 export)

Este ZIP incluye una estructura completa (Next.js App Router + Tailwind v4) basada en el código que pegaste desde v0.

## Requisitos
- Node.js (LTS recomendado)

## Instalar y ejecutar
En la carpeta del proyecto:

```bash
npm install
npm run dev
```

Abrí: http://localhost:3000

## Importante (versiones)
El package.json viene igual que en v0. Si `npm install` falla por versiones (next/react),
probá cambiar en `package.json`:
- `"next": "latest"`
- `"react": "latest"`
- `"react-dom": "latest"`
y volver a correr `npm install`.

## Reemplazar imágenes
- Reemplazá `public/images/mariposa-logo.png` por tu logo real (mismo nombre).
- Reemplazá los íconos en `public/` si querés.
