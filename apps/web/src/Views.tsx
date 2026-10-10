import {useEffect,useRef,useState} from 'react';
import {ArrowRight,BookOpen,Check,Code2,Copy,ExternalLink,FileCode2,FolderOpen,Layers3,MousePointer2,Play,Plus,Search,ShieldCheck,Upload} from 'lucide-react';
import {components,stacks,templates,createBlock,createProject} from './data';
import {getHtml} from './export';
import {cdns} from './export';
import type {BlockKind,TemplateDefinition} from './types';
const palette=['#43e6c5','#009d81','#7c69ed','#f26ba3','#ffb84b'];
const icons='alarm alarm-fill archive arrow-down arrow-down-circle arrow-left arrow-left-right arrow-repeat arrow-right arrow-up arrows-angle-contract arrows-angle-expand award bag bag-check bar-chart bell bell-fill bell-slash bookmark bookmark-fill box box-arrow-up-right briefcase brush bucket calendar calendar-event camera camera-video cart cart-plus chat chat-dots check check-circle check-circle-fill check-lg chevron-down chevron-left chevron-right chevron-up clipboard code code-slash collection compass copy cpu credit-card cup cursor dash database diagram-3 display download envelope envelope-fill exclamation-triangle eye eye-slash facebook file-earmark file-earmark-code file-earmark-pdf filetype-css filetype-html filetype-js filetype-json filetype-php filetype-tsx filter flag folder folder2-open gear gear-fill github globe grid grid-3x3-gap heart heart-fill house house-door image images info-circle instagram journal-code key laptop layers layout-sidebar lightbulb lightning link linkedin list lock lock-fill magic map map-fill menu-button moon moon-stars mouse music note pencil people person person-circle person-plus phone play play-circle plus plus-circle printer puzzle question-circle recycle robot rocket save search search-heart send server share shield shield-check shop shopping-bag sliders smartphone soundwave speedometer2 star star-fill stars stopwatch sun tablet terminal three-dots three-dots-vertical toggle-on tools trash trash3 trophy truck twitter ui-checks unlock upload user-check vector-pen volume-up wallet2 wifi window wrench x x-circle youtube zoom-in zoom-out'.split(' ');
const showToast=(setter:(v:string)=>void,msg:string)=>{setter(msg);setTimeout(()=>setter(''),2300);};
export function Templates({onChoose}:{onChoose:(t:TemplateDefinition)=>void}){
 return <div className="atlas-view atlas-enter">
 <div className="atlas-page-heading"><span className="atlas-eyebrow">STARTERS · PERSONALIZABLES</span><h1>Proyectos listos para comenzar.</h1><p>Elige una estructura real, ábrela en el diseñador y convierte cada sección en tu propio sitio.</p></div>
 <div className="atlas-template-grid">{templates.map((t,i)=><article key={t.id} className="atlas-template-card">
  <div className={'atlas-template-art atlas-template-art-'+(i%4)} style={{'--temp-accent':t.accent} as React.CSSProperties}>
   <div className="atlas-template-mock"><div className="atlas-mock-nav"><i/><i/><i/></div><div className="atlas-mock-hero"><span/><strong/><em/><button/></div><div className="atlas-mock-tiles"><i/><i/><i/></div></div><span className="atlas-template-badge">{t.badge}</span>
  </div>
  <div className="atlas-template-details"><div><h3>{t.name}</h3><p>{t.description}</p><small>{t.kinds.length} bloques · {t.theme==='dark'?'Tema oscuro':'Tema claro'}</small></div><button aria-label={'Editar '+t.name} onClick={()=>onChoose(t)}><ArrowRight size={19}/></button></div>
 </article>)}</div>
 </div>;
}
function Sample({kind}:{kind:BlockKind}){
 if(kind==='navbar')return <nav className="navbar navbar-expand bg-body-tertiary p-2 rounded-3"><a className="navbar-brand fw-bold fs-6" href="#" onClick={e=>e.preventDefault()}>Atlas</a><div className="ms-auto d-flex gap-2"><a href="#" onClick={e=>e.preventDefault()} className="small">Inicio</a><a href="#" onClick={e=>e.preventDefault()} className="small">Docs</a></div></nav>;
 if(kind==='hero')return <div className="rounded-3 p-3 bg-primary bg-gradient text-white"><span className="badge text-bg-light mb-2">NUEVO</span><h3 className="h4 fw-bold">Creamos el futuro.</h3><p className="small mb-2">Una plataforma, todas tus ideas.</p><button className="btn btn-sm btn-light">Explorar</button></div>;
 if(kind==='heading')return <div><span className="badge bg-info text-dark">TÍTULO</span><h3 className="display-6 fw-bold">Typography.</h3><p className="small">Escala de encabezados y subtítulos.</p></div>;
 if(kind==='text')return <p className="lh-lg">El diseño se construye con <strong>jerarquía visual</strong>, una tipografía legible y espacios bien calculados.</p>;
 if(kind==='button')return <div className="d-flex gap-2"><button className="btn btn-primary">Primary</button><button className="btn btn-outline-info">Outline</button><button className="btn btn-secondary">More</button></div>;
 if(kind==='image')return <div className="atlas-demo-image"><i className="bi bi-image fs-1"/><span>Imagen responsive</span></div>;
 if(kind==='cards')return <div className="row g-2">{['UI','CSS','JS'].map(x=><div key={x} className="col-4"><div className="p-2 rounded-3 border text-center"><i className="bi bi-grid-fill d-block fs-4"/><small>{x}</small></div></div>)}</div>;
 if(kind==='panel')return <div className="atlas-glass-test"><div className="atlas-inside-glass"><h3 className="h5 mb-1">Glass neon</h3><small>backdrop-filter: blur()</small></div></div>;
 if(kind==='stats')return <div className="row text-center">{['32K','98%','24/7'].map(x=><div className="col-4" key={x}><strong className="h4 d-block">{x}</strong><small>KPI</small></div>)}</div>;
 if(kind==='gallery')return <div className="atlas-gallery-sample">{palette.map(p=><span key={p} style={{background:'linear-gradient(45deg,'+p+',#112647)'}}/>)}</div>;
 if(kind==='form')return <form onSubmit={e=>e.preventDefault()}><input className="form-control form-control-sm mb-2" aria-label="Correo" placeholder="Correo electrónico"/><button className="btn btn-sm btn-primary w-100">Enviar</button></form>;
 if(kind==='footer')return <footer className="d-flex justify-content-between border-top pt-3"><b>ATLAS</b><small>Docs · GitHub · Contacto</small></footer>;
 if(kind==='divider')return <div><hr/><small>Separador responsivo</small></div>;
 return <div className="text-center p-4 border rounded-3 border-dashed">Espacio de separación ↕</div>;
}
export function Components({onAdd}:{onAdd:(k:BlockKind)=>void}){
 const [search,setSearch]=useState(''),[filter,setFilter]=useState('Todo'),[toast,setToast]=useState('');
 const types=['Todo',...new Set(components.map(c=>c.category))];
 const filtered=components.filter(c=>(filter==='Todo'||filter===c.category)&&(c.name+' '+c.description).toLowerCase().includes(search.toLowerCase()));
 function copy(kind:BlockKind){const project=createProject();project.name='Demo '+kind;project.blocks=[createBlock(kind)];void navigator.clipboard.writeText(getHtml(project,true)).then(()=>showToast(setToast,'HTML real del componente copiado')).catch(()=>showToast(setToast,'Usa el editor para exportar'));}
 return <div className="atlas-view atlas-enter">
  <div className="atlas-page-heading"><span className="atlas-eyebrow">LIBRERÍA · BOOTSTRAP 5</span><h1>Componentes que puedes tocar.</h1><p>Bloques editables, ejemplos funcionales y acceso directo al constructor visual.</p></div>
  <div className="atlas-library-toolbar"><label className="atlas-search"><Search size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar componentes..."/></label><div className="atlas-filters">{types.map(t=><button key={t} onClick={()=>setFilter(t)} className={filter===t?'active':''}>{t}</button>)}</div></div>
  <div className="atlas-component-grid">{filtered.map(c=><article className="atlas-component-card" key={c.kind}>
   <header><span className="atlas-component-tag">{c.category}</span><small>Bootstrap</small></header><div className="atlas-component-demo"><Sample kind={c.kind}/></div><div className="atlas-component-bottom"><h3>{c.name}</h3><p>{c.description}</p><div className="atlas-component-actions"><button onClick={()=>copy(c.kind)}><Copy size={15}/> Copiar ejemplo</button><button className="primary" onClick={()=>onAdd(c.kind)}><Plus size={15}/> Editar en lienzo</button></div></div>
  </article>)}</div>
  {!filtered.length&&<div className="atlas-empty">No hay coincidencias. Prueba otra búsqueda.</div>}
  {toast&&<div className="atlas-toast"><Check size={16}/>{toast}</div>}
 </div>;
}
export function IconsLab(){
 const [query,setQuery]=useState(''),[color,setColor]=useState('#43e6c5'),[size,setSize]=useState(28),[toast,setToast]=useState('');
 const filtered=icons.filter(v=>v.includes(query.toLowerCase())).slice(0,160);
 function copy(name:string){const html='<i class="bi bi-'+name+'" aria-hidden="true" style="color:'+color+';font-size:'+size+'px"></i>';void navigator.clipboard.writeText(html).then(()=>showToast(setToast,'Icono '+name+' copiado'));}
 return <div className="atlas-view atlas-enter">
  <div className="atlas-page-heading"><span className="atlas-eyebrow">BOOTSTRAP ICONS · +150 REFERENCIAS</span><h1>Iconos que encajan con tu interfaz.</h1><p>Busca, modifica color y tamaño, y copia el elemento listo para tu proyecto. Incluye la dependencia bootstrap-icons.</p></div>
  <div className="atlas-icon-toolbar"><label className="atlas-search"><Search size={18}/><input placeholder="Buscar icono..." value={query} onChange={e=>setQuery(e.target.value)}/></label><label>Color<input type="color" value={color} onChange={e=>setColor(e.target.value)}/></label><label>Tamaño <strong>{size}px</strong><input type="range" min="16" max="60" value={size} onChange={e=>setSize(Number(e.target.value))}/></label></div>
  <div className="atlas-icons-grid">{filtered.map(name=><button title={'Copiar '+name} key={name} onClick={()=>copy(name)}><i className={'bi bi-'+name} aria-hidden="true" style={{fontSize:size,color}}/><small>{name}</small></button>)}</div>
  {toast&&<div className="atlas-toast"><Check size={16}/>{toast}</div>}
 </div>;
}
export function Stacks(){
 const [selected,setSelected]=useState(stacks[0].name),[toast,setToast]=useState('');
 const [online,setOnline]=useState<'checking'|'online'|'offline'>('checking');
 const active=stacks.find(s=>s.name===selected)??stacks[0];
 useEffect(()=>{const controller=new AbortController();fetch('/api/health',{signal:controller.signal}).then(r=>setOnline(r.ok?'online':'offline')).catch(()=>setOnline('offline'));return()=>controller.abort();},[]);
 const copy=(s:string)=>void navigator.clipboard.writeText(s).then(()=>showToast(setToast,'Comando copiado')).catch(()=>showToast(setToast,'Copia manualmente el comando'));
 return <div className="atlas-view atlas-enter">
  <div className="atlas-page-heading"><span className="atlas-eyebrow">WEB STACKS · LEARN BY DOING</span><h1>Las herramientas de desarrollo, juntas.</h1><p>Aprende el propósito de cada framework, copia el comando de instalación y experimenta en proyectos separados.</p></div>
  <div className="atlas-api-state"><span className={'atlas-status-dot '+online}/><strong>Express API:</strong> {online==='online'?'Conectada en localhost:3001':online==='checking'?'Verificando...':'Modo sin servidor — el Studio sigue funcionando'}<span className="ms-auto">Node · npm · REST</span></div>
  <div className="atlas-stack-layout"><div className="atlas-stack-list">{stacks.map(s=><button key={s.name} className={selected===s.name?'selected':''} onClick={()=>setSelected(s.name)}><span className="atlas-stack-mark" style={{color:s.color}}>{s.mark}</span><span><strong>{s.name}</strong><small>{s.version}</small></span><ArrowRight size={17}/></button>)}</div>
   <div className="atlas-stack-detail"><div className="atlas-stack-mark big" style={{color:active.color}}>{active.mark}</div><span className="atlas-eyebrow">{active.version.toUpperCase()}</span><h2>{active.name}</h2><p>{active.text}</p><h3>Instalación</h3><div className="atlas-terminal"><code>$ {active.install}</code><button aria-label="Copiar comando" onClick={()=>copy(active.install)}><Copy size={17}/></button></div><h3>Ejemplo de código</h3><pre className="atlas-code-example"><code>{active.code}</code></pre><div className="atlas-stack-buttons"><button className="atlas-primary-btn" onClick={()=>copy(active.code)}><Code2 size={16}/> Copiar ejemplo</button><a className="atlas-outline-btn" href={active.name==='Angular'?'https://angular.dev':active.name==='React'?'https://react.dev':active.name==='Bootstrap'?'https://getbootstrap.com':active.name==='PHP'?'https://www.php.net':active.name==='Express.js'?'https://expressjs.com':active.name==='TypeScript'?'https://www.typescriptlang.org':active.name==='Vite'?'https://vite.dev':'https://nodejs.org'} target="_blank" rel="noreferrer"><ExternalLink size={16}/> Documentación</a></div>
    </div></div>
  <div className="atlas-platform-note"><ShieldCheck size={20}/><div><b>Separación por arquitectura</b><p>React, Angular y PHP no se ejecutan dentro del mismo runtime: cada tecnología tiene su proyecto propio y scripts de arranque documentados en el repositorio.</p></div></div>
  {toast&&<div className="atlas-toast"><Check size={16}/>{toast}</div>}
 </div>;
}
const effects=[
 {name:'Neon pulse',cls:'neon',desc:'Resplandor pulsante para destacar paneles'},
 {name:'Floating glass',cls:'float',desc:'Movimiento flotante suave'},
 {name:'Shimmer',cls:'shimmer',desc:'Brillo deslizante al pasar el cursor'},
 {name:'Aurora',cls:'aurora',desc:'Gradientes animados en fondo'},
 {name:'Gradient border',cls:'border',desc:'Bordes con gradiente en movimiento'},
 {name:'Hover lift',cls:'lift',desc:'Elevación interactiva con sombra'},
 {name:'Spotlight',cls:'spotlight',desc:'Foco luminoso sobre superficies'},
 {name:'Scanlines',cls:'scan',desc:'Franjas de barrido para dashboards'},
 {name:'Glow text',cls:'text',desc:'Tipografía neón en tema oscuro'}
];
export function MotionLab(){
 const [cursor,setCursor]=useState<'dot'|'neon'|'cross'|'glass'|'negative'>('glass');
 const [pos,setPos]=useState({x:150,y:95}),[inside,setInside]=useState(false),[toast,setToast]=useState('');
 const stage=useRef<HTMLDivElement>(null);
 const vars:{[key:string]:string}={dot:'•',neon:'•',cross:'+',glass:'',negative:'●'};
 function onMove(e:React.PointerEvent){if(!stage.current)return;const r=stage.current.getBoundingClientRect();setPos({x:e.clientX-r.left,y:e.clientY-r.top});}
 function copyCss(){void navigator.clipboard.writeText('.mi-panel{background:#08223780;backdrop-filter:blur(12px);box-shadow:0 0 30px #43e6c533;border:1px solid #43e6c555}').then(()=>showToast(setToast,'CSS copiado'));}
 return <div className="atlas-view atlas-enter">
  <div className="atlas-page-heading"><span className="atlas-eyebrow">MOTION LAB · CSS FX</span><h1>Interacciones con personalidad.</h1><p>Fondos animados, neón, hover y cursores alternativos sobre superficies de contraste real.</p></div>
  <div className="atlas-motion-grid">{effects.map(v=><article className={'atlas-effect-card atlas-effect-'+v.cls} key={v.cls}><div className="atlas-effect-visual"><span>{v.cls==='aurora'?'◉':v.cls==='text'?'NEON':'ATLAS'}</span></div><h3>{v.name}</h3><p>{v.desc}</p></article>)}</div>
  <div className="atlas-cursor-section"><div><span className="atlas-eyebrow">CURSOR PLAYGROUND</span><h2>Prueba otro puntero.</h2><p>El cursor original desaparece solo dentro del área de prueba.</p><div className="atlas-cursor-options">{(['glass','neon','dot','cross','negative'] as const).map(v=><button key={v} className={cursor===v?'active':''} onClick={()=>setCursor(v)}>{({glass:'Flecha cristal',neon:'Neón',dot:'Punto',cross:'Mira',negative:'Negativo'})[v]}</button>)}</div><button className="atlas-outline-btn mt-3" onClick={copyCss}><Copy size={15}/> Copiar estilo glass</button></div>
  <div className="atlas-cursor-stage" ref={stage} onPointerMove={onMove} onPointerEnter={()=>setInside(true)} onPointerLeave={()=>setInside(false)}>
   <div className="atlas-cursor-lines"/><strong>Desliza el cursor aquí</strong><p>Contraste · Blur · Opacidad · Glow</p>
   {inside&&<span className={'atlas-fake-cursor cursor-'+cursor} style={{left:pos.x,top:pos.y}}>{vars[cursor]}</span>}
  </div></div>
  {toast&&<div className="atlas-toast"><Check size={16}/>{toast}</div>}
 </div>;
}
export function Legacy(){
 const [html,setHtml]=useState(''),[filename,setFilename]=useState(''),[error,setError]=useState('');
 const [routeState,setRouteState]=useState<'checking'|'ready'|'missing'>('checking');
 useEffect(()=>{fetch('/legacy/atlas.html',{method:'HEAD'}).then(r=>setRouteState(r.ok?'ready':'missing')).catch(()=>setRouteState('missing'));},[]);
 async function read(file?:File){if(!file)return;if(!/\.html?$/i.test(file.name)){setError('Selecciona un archivo HTML');return;}if(file.size>8_000_000){setError('El archivo supera 8 MB');return;}setHtml(await file.text());setFilename(file.name);setError('');}
 return <div className="atlas-view atlas-enter">
 <div className="atlas-page-heading"><span className="atlas-eyebrow">ARCHIVO CLÁSICO · ATLAS 2.4</span><h1>Tu catálogo anterior, sin perderlo.</h1><p>El laboratorio original de 263 ejemplos es compatible como módulo aislado. Carga el HTML único 2.4 para previsualizarlo aquí o colócalo en public/legacy/atlas.html.</p></div>
 <div className="atlas-legacy-panel"><div className="atlas-legacy-intro"><FolderOpen size={30}/><h2>Importar Atlas anterior</h2><p>Usa el archivo independiente <b>bootstrap-atlas-2.4.html</b>. El contenido se ejecuta en un iframe aislado y no se sube a ningún servidor.</p><label className="atlas-primary-btn"><Upload size={17}/> Seleccionar HTML<input type="file" hidden accept=".html,text/html" onChange={e=>void read(e.target.files?.[0])}/></label>
 {routeState==='ready'&&<a href="/legacy/atlas.html" target="_blank" rel="noreferrer" className="atlas-outline-btn mt-3"><ExternalLink size={16}/> Abrir legado instalado</a>}
 {routeState==='missing'&&<small className="atlas-subtle d-block mt-3">El repositorio original estaba vacío: el HTML anterior no se encuentra aún en el directorio public/legacy.</small>}
 {error&&<p role="alert" className="text-warning">{error}</p>}
 </div><div className="atlas-legacy-preview">{html?<><div className="atlas-preview-title"><Check size={16}/> {filename} <span>iframe aislado</span></div><iframe title="Bootstrap Atlas legado" srcDoc={html} sandbox="allow-scripts allow-downloads" referrerPolicy="no-referrer"/></>:<div className="atlas-legacy-placeholder"><Layers3 size={44}/><h3>Vista previa del Atlas clásico</h3><p>Selecciona el HTML para verlo aquí.</p></div>}</div></div>
 <div className="atlas-platform-note mt-4"><BookOpen size={20}/><div><b>Migración progresiva</b><p>El nuevo Studio ofrece bloques React tipados. El antiguo Atlas permanece como una aplicación independiente; sus 263 demos no se contabilizan todavía como componentes React nativos.</p></div></div>
 </div>;
}
export function QuickDocs(){
 const [toast,setToast]=useState('');
 const items=[{title:'Bootstrap CSS',value:cdns.css},{title:'Bootstrap JavaScript',value:cdns.js},{title:'Ambos CDN',value:cdns.css+'\n'+cdns.js},{title:'HTML inicial',value:'<!doctype html>\n<html lang="es"><head><meta charset="utf-8">'+cdns.css+'</head><body><main class="container py-5"><h1>Hola, Bootstrap</h1></main>'+cdns.js+'</body></html>'}];
 return <div className="atlas-quick-docs"><div><FileCode2 size={23}/><h3>Snippets Bootstrap</h3><p>Incluye los CDN o instala Bootstrap por npm para trabajar completamente en local.</p></div><div>{items.map(i=><button key={i.title} onClick={()=>{void navigator.clipboard.writeText(i.value).then(()=>showToast(setToast,i.title+' copiado'));}}><Code2 size={16}/>{i.title}<Copy size={15}/></button>)}</div>{toast&&<small>{toast}</small>}</div>;
}
export function Home({go,choose}:{go:(v:string)=>void;choose:(t:TemplateDefinition)=>void}){
 return <div className="atlas-view atlas-home atlas-enter">
  <div className="atlas-home-hero"><div className="atlas-orb orb-a"/><div className="atlas-orb orb-b"/><div className="atlas-home-hero-copy"><span className="atlas-eyebrow"><span className="atlas-live-dot"/> WEB DEVELOPMENT STUDIO · V3</span><h1>Imagina.<br/>Diseña.<br/><em>Construye.</em></h1><p>De componentes Bootstrap a sitios completos. Diseña visualmente, aprende frameworks y exporta código listo para integrar.</p><div className="atlas-home-ctas"><button className="atlas-primary-btn" onClick={()=>go('editor')}><Play size={17}/> Abrir el diseñador <ArrowRight size={17}/></button><button className="atlas-outline-btn" onClick={()=>go('templates')}>Explorar plantillas</button></div><div className="atlas-home-metrics"><span><b>14</b> bloques visuales</span><i/><span><b>8</b> plantillas</span><i/><span><b>8</b> tecnologías</span></div></div>
  <div className="atlas-home-visual"><div className="atlas-window"><div className="atlas-window-bar"><i/><i/><i/><span>atlas-designer / preview</span></div><div className="atlas-window-content"><div className="atlas-window-nav"><strong>ATLAS.</strong><span>Inicio &nbsp; Servicios &nbsp; Contacto</span></div><span className="atlas-visual-chip">DESIGN SYSTEM</span><h2>Ideas que se<br/><em>vuelven web.</em></h2><p>Un estudio visual para crear sin límites.</p><span className="atlas-visual-button">Comenzar ahora ↗</span><div className="atlas-window-panel-grid"><i/><i/><i/></div></div></div><div className="atlas-floating-code"><Code2 size={18}/><span>React · TypeScript · Vite</span></div><div className="atlas-floating-badge">✓ Bootstrap 5</div></div></div>
  <div className="atlas-section-heading"><div><span className="atlas-eyebrow">EL WORKSPACE</span><h2>Todo lo que necesitas para desarrollar.</h2></div><p>Un espacio real, organizado por herramientas y responsabilidades.</p></div>
  <div className="atlas-feature-grid">{[
   ['editor','Designer visual','Canvas, inspector, responsive, historial y exportación.','bi-columns-gap'],
   ['components','Biblioteca UI','Bloques Bootstrap listos para editar y componer.','bi-grid-3x3-gap'],
   ['templates','Plantillas','Sitios de inicio para ecommerce, SaaS y dashboards.','bi-window'],
   ['icons','Iconografía','Bootstrap Icons con búsqueda y copia.','bi-stars'],
   ['motion','Motion Lab','Hover, neón, gradientes y cursores alternativos.','bi-lightning'],
   ['stacks','Framework Hub','React, Angular, Express, PHP, Node y más.','bi-code-slash']
  ].map(x=><button className="atlas-feature-card" key={x[0]} onClick={()=>go(x[0])}><span className="atlas-feature-icon"><i className={'bi '+x[3]}/></span><h3>{x[1]}</h3><p>{x[2]}</p><span>Explorar <ArrowRight size={15}/></span></button>)}</div>
  <div className="atlas-section-heading"><div><span className="atlas-eyebrow">PROYECTOS</span><h2>Empieza con una plantilla.</h2></div><button className="atlas-text-button" onClick={()=>go('templates')}>Ver todas <ArrowRight size={17}/></button></div>
  <div className="atlas-home-templates">{templates.slice(0,3).map((t,i)=><button key={t.id} onClick={()=>choose(t)} className={'atlas-home-template atlas-home-template-'+i}><span className="atlas-template-label">{t.badge}</span><h3>{t.name}</h3><p>{t.description}</p><span>Usar plantilla <ArrowRight size={16}/></span></button>)}</div>
  <div className="atlas-section-heading"><div><span className="atlas-eyebrow">SNIPPETS</span><h2>El código correcto, a un clic.</h2></div></div><QuickDocs/>
  <div className="atlas-home-bottom"><div><MousePointer2 size={29}/><h2>Del aprendizaje al proyecto real.</h2><p>Prueba, personaliza y expórtalo. Todo el código es tuyo.</p></div><button className="atlas-primary-btn" onClick={()=>go('editor')}>Crear mi primera página <ArrowRight size={18}/></button></div>
 </div>;
}
