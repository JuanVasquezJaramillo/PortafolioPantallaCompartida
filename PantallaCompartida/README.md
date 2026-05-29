# PantallaCompartida

Aplicación web de portfolio con estética retro que muestra pantallas interactivas (video, podcast, estática, boot screen) y efectos visuales.

## Propósito

`PantallaCompartida` es un proyecto de demostración y portfolio que agrupa proyectos multimedia dentro de una interfaz inspirada en pantallas antiguas (CRT). Está pensado para exponer demos, videos y experiencias interactivas con estilo nostálgico.

## Tecnologías

- Vite
- React
- TypeScript
- CSS

## Requisitos

- Node.js v16+ (recomendado)
- npm o yarn

## Instalación

1. Clona el repositorio:

   git clone <url-del-repo>
   cd PantallaCompartida

2. Instala las dependencias:

   npm install

3. Inicia el servidor de desarrollo:

   npm run dev

Abre la URL que indique Vite (por defecto http://localhost:5173).

## Scripts comunes

- `npm run dev` — Inicia el servidor de desarrollo con HMR.
- `npm run build` — Genera la versión optimizada para producción.
- `npm run preview` — Sirve la build para previsualizarla localmente.

## Estructura del proyecto (resumen)

- [src/App.tsx](src/App.tsx) — Componente raíz.
- [src/main.tsx](src/main.tsx) — Punto de montaje de React.
- [src/components](src/components) — Componentes reutilizables, incluye `pantallas/` con las distintas vistas.
- [src/assets](src/assets) — Imágenes y recursos estáticos.
- [src/data/projects.ts](src/data/projects.ts) — Datos de los proyectos mostrados.
- [src/utils](src/utils) — Utilidades (p. ej. efectos de audio).

## Uso / Ejemplos

- Desarrollo rápido:

  npm run dev

  Luego abrir la URL indicada por Vite.

- Generar y probar producción:

  npm run build
  npm run preview

## Contribuciones

1. Haz fork y crea una rama descriptiva (`feature/mi-cambio`).
2. Asegúrate de que los cambios funcionan en desarrollo.
3. Envía un pull request con una descripción clara de los cambios.

## Notas y recomendaciones

- Los componentes de las pantallas están en [src/components/pantallas](src/components/pantallas).
- Ajusta sonidos y efectos en [src/utils/audioEffects.ts](src/utils/audioEffects.ts) si trabajas con audio.
- Para añadir proyectos, edita [src/data/projects.ts](src/data/projects.ts).

## Licencia

PANTALLA COMPARTIDA - UNICAUCA 2026 ©️

## Contacto

Si tienes preguntas o sugerencias, abre un issue en el repositorio o contacta al autor.
