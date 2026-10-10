import type {AtlasProject,BlockKind,BlockStyle,PageBlock,TemplateDefinition,ComponentDefinition} from './types';
export const defaultStyle:BlockStyle={
 background:'#14243e',color:'#f0f7ff',accent:'#43e6c5',radius:18,padding:28,blur:0,opacity:100,
 shadow:20,borderWidth:1,borderColor:'#2c4662',gradient:false,gradientEnd:'#1b4b71',
 gradientAngle:120,fontSize:16
};
export const components:ComponentDefinition[]=[
 {kind:'navbar',name:'Barra de navegación',description:'Menú responsive con enlaces, CTA y fondo personalizable',icon:'menu',category:'Estructura'},
 {kind:'hero',name:'Hero principal',description:'Título destacado, subtítulo, imagen y llamada a la acción',icon:'sparkles',category:'Secciones'},
 {kind:'heading',name:'Encabezado',description:'Tipografía y jerarquía visual',icon:'type',category:'Tipografía'},
 {kind:'text',name:'Bloque de texto',description:'Párrafo editorial y contenido informativo',icon:'align-left',category:'Tipografía'},
 {kind:'button',name:'Botón CTA',description:'Acción interactiva con hover y sombra',icon:'mouse-pointer',category:'Acciones'},
 {kind:'image',name:'Imagen',description:'Fotografía por URL o archivo local incrustado',icon:'image',category:'Medios'},
 {kind:'cards',name:'Tarjetas',description:'Grid responsivo de servicios o productos',icon:'layout-grid',category:'Secciones'},
 {kind:'panel',name:'Panel glass/neón',description:'Transparencia, blur, bordes y glow en fondo de contraste',icon:'square',category:'Efectos'},
 {kind:'stats',name:'Indicadores',description:'KPI numéricos en cuadrícula',icon:'bar-chart',category:'Secciones'},
 {kind:'gallery',name:'Galería de imágenes',description:'Reel horizontal de imágenes con desplazamiento',icon:'images',category:'Medios'},
 {kind:'form',name:'Formulario',description:'Campos y botón accesibles; sin backend asociado',icon:'mail',category:'Acciones'},
 {kind:'footer',name:'Footer',description:'Navegación secundaria y copyright',icon:'panel-bottom',category:'Estructura'},
 {kind:'divider',name:'Separador',description:'Línea de separación estilizable',icon:'minus',category:'Estructura'},
 {kind:'spacer',name:'Espaciador',description:'Aire visual entre secciones',icon:'move-vertical',category:'Estructura'}
];
export const templates:TemplateDefinition[]=[
 {id:'saas',name:'SaaS Aurora',description:'Landing para startups y software',icon:'rocket',badge:'Popular',theme:'dark',accent:'#43e6c5',kinds:['navbar','hero','stats','cards','panel','form','footer']},
 {id:'portfolio',name:'Portfolio Nova',description:'Presentación personal y proyectos',icon:'user-round',badge:'Creativa',theme:'dark',accent:'#b399ff',kinds:['navbar','hero','heading','gallery','cards','form','footer']},
 {id:'commerce',name:'Commerce Flow',description:'Catálogo comercial adaptable',icon:'shopping-bag',badge:'Ecommerce',theme:'light',accent:'#2563eb',kinds:['navbar','hero','cards','gallery','panel','footer']},
 {id:'campus',name:'Campus UT',description:'Sitio institucional universitario',icon:'graduation-cap',badge:'Institucional',theme:'light',accent:'#009d81',kinds:['navbar','hero','stats','cards','form','footer']},
 {id:'dashboard',name:'Data Pulse',description:'Indicadores en un dashboard oscuro',icon:'chart-no-axes-combined',badge:'Analytics',theme:'dark',accent:'#00d8ff',kinds:['navbar','heading','stats','panel','cards','footer']},
 {id:'agency',name:'Motion Studio',description:'Agencia con imágenes, efectos y contactos',icon:'wand-sparkles',badge:'Animada',theme:'dark',accent:'#ff6eab',kinds:['navbar','hero','gallery','cards','panel','form','footer']},
 {id:'blog',name:'Journal Minimal',description:'Artículos y presentación editorial',icon:'book-open',badge:'Editorial',theme:'light',accent:'#b8793c',kinds:['navbar','hero','heading','text','cards','footer']},
 {id:'gallery',name:'Frame Gallery',description:'Portafolio fotográfico y media',icon:'images',badge:'Visual',theme:'dark',accent:'#f5b85b',kinds:['navbar','hero','gallery','image','panel','footer']}
];
export const stacks=[
 {name:'Bootstrap',version:'CSS / UI',mark:'B',color:'#ae80ff',text:'Componentes, utilidades y layout responsive.',install:'npm install bootstrap bootstrap-icons',code:"import 'bootstrap/dist/css/bootstrap.min.css';\nimport 'bootstrap/dist/js/bootstrap.bundle.min.js';"},
 {name:'React',version:'Frontend',mark:'R',color:'#61dafb',text:'Interfaces por componentes, hooks y estados.',install:'npm create vite@latest mi-web -- --template react-ts',code:"export function Saludo() { return <h1>Hola React</h1>; }"},
 {name:'Angular',version:'Frontend',mark:'A',color:'#f05b8e',text:'Componentes standalone, señales, servicios y DI.',install:'npx @angular/cli@latest new mi-app',code:"import {signal} from '@angular/core';\nconst contador = signal(0);"},
 {name:'TypeScript',version:'Lenguaje',mark:'TS',color:'#4996ef',text:'Tipos estáticos y autocompletado para JavaScript.',install:'npm install -D typescript',code:"interface Usuario { nombre: string; activo: boolean; }"},
 {name:'Vite',version:'Build tool',mark:'V',color:'#ffc45b',text:'Desarrollo en caliente y compilación optimizada.',install:'npm create vite@latest',code:'npm run dev\nnpm run build'},
 {name:'Node.js',version:'Runtime',mark:'N',color:'#7ac95e',text:'Ejecuta JavaScript fuera del navegador.',install:'node --version',code:"import fs from 'node:fs';\nconsole.log(fs.readFileSync('README.md','utf8'));"},
 {name:'Express.js',version:'Backend',mark:'EX',color:'#d7e3ee',text:'API REST y middleware HTTP de Node.js.',install:'npm install express',code:"import express from 'express';\nconst app=express();\napp.get('/api/health',(_,res)=>res.json({ok:true}));\napp.listen(3001);"},
 {name:'PHP',version:'Backend',mark:'PHP',color:'#a69bf3',text:'Renderizado de servidor, formularios y APIs.',install:'php -v',code:"<?php header('Content-Type: application/json'); echo json_encode(['ok'=>true]);"}
];
export const newId=()=>crypto.randomUUID();
export function createBlock(kind:BlockKind,accent='#43e6c5',theme:'dark'|'light'='dark'):PageBlock {
 const item=components.find(x=>x.kind===kind);
 const style={...defaultStyle,accent,color:theme==='dark'?'#f0f7ff':'#16263a',background:theme==='dark'?'#14243e':'#f2f6fb',borderColor:theme==='dark'?'#29415e':'#dce5ef'};
 return {id:newId(),kind,title:item?.name??kind,content:{
  navbar:'ATLAS STUDIO',hero:'Diseña algo extraordinario.',heading:'Una experiencia que inspira',text:'Contenido claro, accesible y preparado para cualquier dispositivo.',
  button:'Explorar proyectos',image:'Imagen destacada',cards:'Nuestros servicios',panel:'Panel de cristal',stats:'En números',gallery:'Explora la galería',form:'Contáctanos',footer:'ATLAS STUDIO',divider:'',spacer:''
 }[kind],secondary:kind==='hero'?'Construye tu siguiente proyecto con componentes, detalles y personalidad.':kind==='cards'?'Diseño · Desarrollo · Experiencias':kind==='navbar'?'Inicio,Servicios,Proyectos,Contacto':kind==='footer'?'Inicio,Servicios,Contacto':kind==='gallery'?'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=600,https://images.unsplash.com/photo-1500534623283-312aade485b7?w=600,https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600':'Personaliza este bloque desde el inspector.',image:'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200',href:'#contacto',motion:'rise',style};
}
export function createProject(t:TemplateDefinition=templates[0]):AtlasProject {
 return {id:newId(),name:t.name,description:t.description,theme:t.theme,blocks:t.kinds.map(kind=>createBlock(kind,t.accent,t.theme)),updatedAt:Date.now()};
}
