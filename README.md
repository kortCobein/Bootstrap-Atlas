# Bootstrap Atlas — Web Development Studio

Plataforma modular para explorar tecnologías web y construir páginas visualmente.

## Aplicaciones

| Ruta | Tecnología | Función |
|---|---|---|
| `apps/web` | React 19 + TypeScript + Vite + Bootstrap 5 | Estudio visual, componentes, plantillas, snippets y exportaciones |
| `apps/api` | Node.js + Express | API REST local, catálogo de stacks y presets |
| `apps/angular` | Angular standalone + TypeScript | Laboratorio Angular independiente |
| `examples/php` | PHP 8 | Formulario y endpoint de demostración |
| `docs` | Markdown | Arquitectura y guía del proyecto |

## Requisitos

Node.js 22+, npm 10+, Git. PHP 8+ solo para el ejemplo PHP.

```bash
git clone https://github.com/kortCobein/Bootstrap-Atlas.git
cd Bootstrap-Atlas
npm install
npm run install:bootstrap
npm run dev
```

Web: http://localhost:5173 · API: http://localhost:3001/api/health

### Comandos

```bash
npm run dev                 # React + API
npm run dev:web             # Solo React
npm run dev:api             # Solo Express
npm run build               # Build de React
npm run test                # Pruebas API
npm run install:bootstrap   # Instala Bootstrap e iconos usando npm
npm run dev:angular         # Requiere npm install --prefix apps/angular
php -S localhost:8080 -t examples/php
```

## Qué incluye el Studio

- Editor visual drag and drop con inspector por elemento, árbol de capas, vista responsive, undo/redo, duplicación, JSON, HTML, CSS y exportación ZIP.
- Presets de páginas y bloques: héroe, navegación, tarjetas, texto, imágenes, CTA, formularios, galerías, footer y secciones.
- Biblioteca Bootstrap con búsqueda, iconos, ejemplos y edición de propiedades.
- Laboratorio de stack y snippets para React, Angular, TypeScript, Express, PHP y Bootstrap.
- Tema oscuro, motion accesible y navegación con transiciones.
- Persistencia del proyecto de diseño en localStorage.

## Atlas clásico 2.4

El Atlas 2.4 (263 demos, 80 SVG y 8 plantillas) se desarrolló como un HTML independiente **antes** de inicializar este repositorio. Para usarlo en la nueva web, coloca el archivo `bootstrap-atlas-2.4.html` en `apps/web/public/legacy/atlas.html`. El portal ofrece un acceso a su laboratorio legado y explica cuando falta ese archivo. No se afirma que el catálogo antiguo esté ya migrado a React; su migración a componentes nativos es una tarea posterior.

## Arquitectura y límites

Cada framework reside en su propio workspace, no se mezclan React y Angular en un mismo runtime. Express ofrece una API de demostración sin base de datos ni autenticación. El editor genera sitios estáticos Bootstrap; no genera automáticamente un backend funcional. El código exportado debe revisarse antes de usarlo en producción.

Ver [docs/ARQUITECTURA.md](docs/ARQUITECTURA.md) y [docs/HOJA-DE-RUTA.md](docs/HOJA-DE-RUTA.md).
