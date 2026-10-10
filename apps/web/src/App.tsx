import {useState} from 'react';
import {ArrowUpRight,ChevronRight,CodeXml,ExternalLink,GalleryVerticalEnd,House,LayoutTemplate,Menu,Monitor,MousePointer2,PanelLeftClose,PanelLeftOpen,Search,Shapes,Sparkles,WandSparkles,X} from 'lucide-react';
import Editor from './Editor';
import {Components,Home,IconsLab,Legacy,MotionLab,Stacks,Templates} from './Views';
import type {BlockKind,TemplateDefinition} from './types';
const groups=[
 {label:'WORKSPACE',items:[
  {id:'home',name:'Inicio',icon:House},
  {id:'editor',name:'Diseñador visual',icon:Monitor},
  {id:'components',name:'Componentes',icon:Shapes},
  {id:'templates',name:'Plantillas',icon:LayoutTemplate}]},
 {label:'CREATIVE TOOLS',items:[
  {id:'icons',name:'Iconos',icon:Sparkles},
  {id:'motion',name:'Animaciones',icon:MousePointer2},
  {id:'stacks',name:'Frameworks',icon:CodeXml}]},
 {label:'RECURSOS',items:[
  {id:'legacy',name:'Atlas clásico 2.4',icon:GalleryVerticalEnd}]}
];
const labels:Record<string,string>={home:'Inicio',editor:'Diseñador visual',components:'Biblioteca de componentes',templates:'Plantillas',icons:'Iconos',motion:'Animaciones y cursores',stacks:'Frameworks',legacy:'Atlas clásico'};
function App(){
 const [page,setPage]=useState('home');
 const [sidebar,setSidebar]=useState(false);
 const [collapsed,setCollapsed]=useState(false);
 const [seed,setSeed]=useState<TemplateDefinition|null>(null);
 const [insert,setInsert]=useState<BlockKind|null>(null);
 const navigate=(id:string)=>{setPage(id);setSidebar(false);window.scrollTo({top:0,behavior:'smooth'});};
 const choose=(template:TemplateDefinition)=>{setSeed(template);navigate('editor');};
 const add=(kind:BlockKind)=>{setInsert(kind);navigate('editor');};
 return <div className={'atlas-app '+(collapsed?'atlas-app-collapsed':'')}>
  <aside className={'atlas-sidebar '+(sidebar?'mobile-open':'')}>
   <div className="atlas-brand"><button className="atlas-logo" aria-label="Volver a inicio" onClick={()=>navigate('home')}>A<span>.</span></button><div className="atlas-brand-names"><strong>ATLAS</strong><small>WEB DEV STUDIO</small></div><button className="atlas-sidebar-collapse" onClick={()=>setCollapsed(v=>!v)} aria-label={collapsed?'Expandir menú':'Contraer menú'}>{collapsed?<PanelLeftOpen size={17}/>:<PanelLeftClose size={17}/>}</button><button className="atlas-mobile-close" aria-label="Cerrar menú" onClick={()=>setSidebar(false)}><X size={20}/></button></div>
   <div className="atlas-side-body">{groups.map(group=><div key={group.label} className="atlas-nav-group"><div className="atlas-nav-caption">{group.label}</div><nav aria-label={group.label}>{group.items.map(item=><button key={item.id} className={'atlas-nav-link '+(page===item.id?'active':'')} onClick={()=>navigate(item.id)} title={item.name}><item.icon size={18} strokeWidth={1.8}/><span>{item.name}</span>{item.id==='editor'&&<i className="atlas-nav-new">NEW</i>}{page===item.id&&<ChevronRight className="atlas-nav-chevron" size={14}/>}</button>)}</nav></div>)}</div>
   <div className="atlas-sidebar-bottom"><div className="atlas-sidebar-tip"><WandSparkles size={19}/><div><strong>Diseña sin límites</strong><p>Crea, ajusta y exporta.</p></div></div><a href="https://github.com/kortCobein/Bootstrap-Atlas" rel="noreferrer" target="_blank" className="atlas-github-link"><i className="bi bi-github"/> <span>Ver repositorio</span><ArrowUpRight size={15}/></a></div>
  </aside>
  {sidebar&&<button aria-label="Cerrar menú" className="atlas-mobile-overlay" onClick={()=>setSidebar(false)}/>}
  <div className="atlas-main">
   <header className="atlas-topbar"><div className="atlas-topbar-left"><button aria-label="Abrir menú" className="atlas-mobile-toggle" onClick={()=>setSidebar(true)}><Menu size={21}/></button><span className="atlas-breadcrumb">Atlas Studio</span><ChevronRight size={14}/><strong>{labels[page]??'Inicio'}</strong></div>
   <div className="atlas-topbar-right"><span className="atlas-runtime"><span className="atlas-live-dot"/> React + TypeScript</span><button className="atlas-topbar-search" onClick={()=>navigate('components')} title="Buscar en biblioteca"><Search size={17}/><span>Explorar</span><kbd>↗</kbd></button><a target="_blank" rel="noreferrer" href="https://github.com/kortCobein/Bootstrap-Atlas" title="Repositorio GitHub" className="atlas-topbar-icon"><i className="bi bi-github"/></a><button onClick={()=>navigate('editor')} className="atlas-topbar-create"><Sparkles size={15}/> Nuevo proyecto</button></div></header>
   <div className={'atlas-content '+(page==='editor'?'atlas-content-editor':'')}>
    <div key={page} className="atlas-route-transition">
    {page==='home'&&<Home go={navigate} choose={choose}/>}
    {page==='editor'&&<Editor seed={seed} insertKind={insert} onSeedUsed={()=>setSeed(null)} onInsertUsed={()=>setInsert(null)}/>}
    {page==='components'&&<Components onAdd={add}/>}
    {page==='templates'&&<Templates onChoose={choose}/>}
    {page==='icons'&&<IconsLab/>}
    {page==='motion'&&<MotionLab/>}
    {page==='stacks'&&<Stacks/>}
    {page==='legacy'&&<Legacy/>}
    </div>
    {page!=='editor'&&<footer className="atlas-main-footer"><span>© {new Date().getFullYear()} Bootstrap Atlas · Studio v3.0</span><span>Diseñado con Bootstrap 5, React, TypeScript y Vite</span><a href="https://getbootstrap.com" target="_blank" rel="noreferrer">Documentación Bootstrap <ExternalLink size={13}/></a></footer>}
   </div>
  </div>
 </div>;
}
export default App;
