import express from 'express';
import cors from 'cors';
export const technologies = [
  { id:'bootstrap',name:'Bootstrap',kind:'CSS UI',description:'Componentes responsivos, utilidades y JS accesible',command:'npm install bootstrap bootstrap-icons' },
  { id:'react',name:'React',kind:'Frontend',description:'Interfaces declarativas y componentes',command:'npm create vite@latest web -- --template react-ts' },
  { id:'typescript',name:'TypeScript',kind:'Lenguaje',description:'Tipado estático sobre JavaScript',command:'npm install -D typescript' },
  { id:'vite',name:'Vite',kind:'Build',description:'Servidor de desarrollo y bundling rápido',command:'npm create vite@latest' },
  { id:'node',name:'Node.js',kind:'Runtime',description:'Ejecución de JavaScript del lado servidor',command:'node --version' },
  { id:'express',name:'Express.js',kind:'Backend',description:'Rutas HTTP REST y middlewares',command:'npm install express' },
  { id:'angular',name:'Angular',kind:'Frontend',description:'Framework estructurado con inyección y componentes',command:'npx @angular/cli@latest new portal' },
  { id:'php',name:'PHP',kind:'Backend',description:'Renderizado de servidor y formularios tradicionales',command:'php -S localhost:8080' },
];
export function createApp() {
  const app=express(); app.disable('x-powered-by');
  app.use(cors({origin:['http://localhost:5173','http://127.0.0.1:5173']}));
  app.use(express.json({limit:'100kb'}));
  app.get('/api/health',(_req,res)=>res.json({ok:true,service:'Bootstrap Atlas API',version:'3.0.0'}));
  app.get('/api/stacks',(_req,res)=>res.json({data:technologies}));
  app.get('/api/presets',(_req,res)=>res.json({data:[
    {id:'landing',title:'Landing SaaS',sections:['navbar','hero','features','cta','footer']},
    {id:'portfolio',title:'Portafolio',sections:['navbar','hero','gallery','features','footer']},
    {id:'store',title:'Tienda',sections:['navbar','hero','products','cta','footer']},
    {id:'dashboard',title:'Dashboard',sections:['navbar','stats','features','footer']}
  ]}));
  app.use('/api', (_req,res)=>res.status(404).json({error:'Endpoint no encontrado'}));
  return app;
}
