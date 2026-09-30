# Reacell

Tienda simulada de celulares reacondicionados construida con React, Vite, Axios y Mock Service Worker.

## Ejecutar

```bash
npm install
npm run dev
```

## Flujo de la API

```text
React -> Axios -> /api/... -> MSW -> JSON -> React
```

## Persistencia simulada

MSW guarda el estado simulado en Cache Storage del navegador. Por eso usuarios, sesión, carrito y stock permanecen después de recargar la página.

## Archivos importantes

- `src/api/client.js`: instancia de Axios e interceptor de peticiones.
- `src/api/*.js`: llamadas que haría el frontend contra una API real.
- `src/mocks/handlers.js`: API simulada con MSW.
- `src/mocks/estado.js`: persistencia del estado de la API simulada.
- `src/mocks/browser.js`: registra MSW.
- `src/main.jsx`: inicia MSW antes de renderizar React.
- `public/mockServiceWorker.js`: archivo generado por MSW.

## Imágenes

Las imágenes de prueba están en `public/imagenes`. Se pueden reemplazar por las fotos reales manteniendo los mismos nombres.

## GitHub

No subir `node_modules`. Cada integrante puede clonar el repositorio y ejecutar `npm install`.
