# Arquitectura

```
Navegador
  └── apps/web (Vite + React + TypeScript)
        ├── Studio: canvas, biblioteca, editor de propiedades y capas
        ├── Catálogo: componentes Bootstrap e iconos
        ├── Guías: snippets multi-framework
        ├── Exportador: HTML/CSS/ZIP local con JSZip
        └── API opcional --> apps/api (Node.js + Express)
Laboratorios independientes
  ├── apps/angular (Angular standalone)
  └── examples/php (PHP integrado)
```

## Principios

1. Componentes tipados, editor mediante árbol de bloques serializables.
2. No se ejecuta código de usuarios en el proceso React; la vista previa del documento exportado se encapsula.
3. Compatibilidad con Bootstrap y exportación estática sin servidor.
4. Las demostraciones de Angular, React, Express y PHP tienen arranques independientes.
5. El legado v2.4 se incluye bajo `apps/web/public/legacy/atlas.html` como documento separado para evitar conflictos entre sus estilos globales y React. La versión empaquetada se abre desde la propia interfaz.
6. API opcional: el Studio debe abrir aun cuando Express no esté activo.
