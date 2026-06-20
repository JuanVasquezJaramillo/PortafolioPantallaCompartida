# PantallaCompartida

**Portafolio interactivo con estética retro** — aplicación web que exhibe proyectos multimedia universitarios a través de una interfaz inspirada en televisores CRT y la consola Nintendo 64.

Inserta cartuchos, enciende la consola y explora podcasts, videos y experiencias interactivas, todo envuelto en una estética vaporwave / noventera con líneas de barrido, chiptunes y efectos glitch.

---

## Características

- **Pantalla CRT** con secuencia de arranque, pantalla de "sin señal" y transiciones suaves
- **Consola estilo Nintendo 64** con controles de encendido, expulsión y reinicio
- **Estante de cartuchos** — selecciona entre 5 proyectos universitarios en 3 formatos
- **Reproducción multimedia**:
  - ▶️ Video (YouTube embebido)
  - 🎧 Podcast (lista de pistas de audio)
  - 🎛️ Interactivo (mezclador de sonido ambiental)
- **Audio inmersivo** — efectos de sonido al insertar cartucho, encender y arrancar
- **Guía de bienvenida y panel informativo** — flujo de onboarding y fichas técnicas de cada proyecto

---

## Tecnologías

| Tecnología | Propósito |
|---|---|
| [React 19](https://react.dev) | Framework de UI |
| [TypeScript](https://www.typescriptlang.org) | Tipado estático |
| [Vite](https://vitejs.dev) | Herramienta de build y servidor de desarrollo |
| [Tailwind CSS](https://tailwindcss.com) (vía plugin de Vite) | Estilos |
| [Motion](https://motion.dev) | Animaciones |
| [Lucide React](https://lucide.dev) | Iconos |
| [Express](http://expressjs.com) | Utilidades de servidor |
| [Google Gen AI](https://ai.google.dev) | Integración con IA |

---

## Primeros pasos

### Requisitos previos

- Node.js 18+
- npm o yarn

### Instalación

```bash
git clone <url-del-repositorio>
cd PortafolioPantallaCompartida
npm install
```

### Desarrollo

```bash
npm run dev
```

Abre la URL que indique Vite (por defecto `http://localhost:5173`).

### Build de producción

```bash
npm run build
npm run preview
```

---

## Estructura del proyecto

```
src/
├── App.tsx                          # Componente raíz — estado y orquestación del layout
├── main.tsx                         # Punto de entrada de React
├── types.ts                         # Tipos compartidos de TypeScript
├── components/
│   ├── CRT_TV.tsx                   # Contenedor de pantalla CRT
│   ├── Consola64.tsx                # Consola con encendido/expulsión/reinicio
│   ├── EstanteCartuchos.tsx         # Selector de cartuchos
│   ├── landing/
│   │   ├── Header.tsx               # Barra superior con estado y datos del cartucho
│   │   ├── Footer.tsx               # Barra de créditos
│   │   └── fichaTecnica/
│   │       ├── AcademicSheet.tsx    # Panel de información detallada del proyecto
│   │       └── WelcomeGuide.tsx     # Modal de bienvenida
│   └── pantallas/
│       ├── BootScreen.tsx           # Animación de arranque
│       ├── StaticScreen.tsx         # Pantalla "sin señal"
│       ├── VideoScreen.tsx          # Reproductor de video (YouTube)
│       ├── PodcastScreen.tsx        # Reproductor de audio con lista de pistas
│       └── InteractiveScreen.tsx    # Mezclador de elementos de sonido
├── data/
│   └── projects.ts                  # Definiciones de los proyectos (cartuchos)
├── utils/
│   └── audioEffects.ts             # Efectos de sonido
├── assets/                          # Imágenes y recursos estáticos
└── index.css                        # Estilos globales
```

---

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo con HMR |
| `npm run build` | Type-check y build para producción |
| `npm run preview` | Previsualiza la build de producción |
| `npm run lint` | Ejecuta ESLint en el proyecto |

---

## Contribuciones

1. Haz fork del repositorio
2. Crea una rama descriptiva (`feature/mi-cambio`)
3. Realiza los cambios y verifica que funcionen en desarrollo
4. Abre un pull request con una descripción clara

---

## Licencia

MIT License — 2026

---

## Contacto

Abre un issue en el repositorio o contacta al autor.
