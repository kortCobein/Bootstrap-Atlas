# Reglas generales para Bootstrap Atlas

- Idioma de interfaz, documentación y comentarios: español.
- Mantener las aplicaciones independientes: React en apps/web, Express en apps/api, Angular en apps/angular y PHP en examples/php.
- No introducir HTML monolítico en la app moderna; organizar componentes, hooks, utilidades y estilos por responsabilidad.
- TypeScript estricto, accesibilidad por teclado, vistas responsivas, validación en entradas.
- Usar Bootstrap instalado por npm. Evitar CDN como dependencia obligatoria.
- No usar dangerouslySetInnerHTML con texto del usuario en React; para previsualización HTML exportado usar iframe con sandbox.
- Los cambios del editor deben ser serializables en JSON y exportables sin código remoto.
- Evitar archivos generados, datos personales, node_modules, dist y credenciales en Git.
- Antes de hacer cambios grandes: comprobar npm run check y npm run build cuando el entorno permita instalar dependencias.
