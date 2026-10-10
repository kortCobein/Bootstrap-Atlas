import {useEffect,useRef,useState} from 'react';
import {ArrowDown,ArrowUp,Check,ChevronDown,Code2,Copy,Download,FileCode2,FileJson,ImagePlus,Layers3,Monitor,Plus,Redo2,RotateCcw,Save,Smartphone,Tablet,Trash2,Undo2,Upload} from 'lucide-react';
import {components,createBlock,createProject,defaultStyle} from './data';
import {downloadFile,downloadZip,getHtml,getCss,getJs} from './export';
import type {AtlasProject,BlockKind,PageBlock,BlockStyle,TemplateDefinition,Motion} from './types';
const STORAGE_KEY='atlas-studio-project-v3';
const blockKinds=new Set(components.map(c=>c.kind));
const uid=()=>crypto.randomUUID();
function load():AtlasProject{
 try {const saved=localStorage.getItem(STORAGE_KEY);if(saved){const p=JSON.parse(saved) as AtlasProject;if(validate(p))return p;}}catch{}
 return createProject();
}
function validate(value:unknown):value is AtlasProject{
 if(!value||typeof value!=='object')return false;
 const p=value as AtlasProject;
 return typeof p.name==='string'&&['dark','light'].includes(p.theme)&&Array.isArray(p.blocks)&&p.blocks.length<=150&&p.blocks.every(b=>b&&typeof b.id==='string'&&blockKinds.has(b.kind)&&typeof b.content==='string'&&typeof b.secondary==='string'&&typeof b.image==='string'&&typeof b.href==='string'&&b.style&&typeof b.style==='object');
}
type Props={seed:TemplateDefinition|null;insertKind:BlockKind|null;onSeedUsed:()=>void;onInsertUsed:()=>void};
const displayImage=(url:string)=>/^(https?:\/\/|data:image\/|\/)/i.test(url)?url:undefined;
const variants:Motion[]=['none','fade','rise','glow','float'];
function cssOf(style:BlockStyle):React.CSSProperties{
 return {background:style.gradient?'linear-gradient('+style.gradientAngle+'deg,'+style.background+','+style.gradientEnd+')':style.background,
 color:style.color,borderRadius:style.radius,padding:style.padding,fontSize:style.fontSize,
 border:style.borderWidth+'px solid '+style.borderColor,opacity:style.opacity/100,
 backdropFilter:'blur('+style.blur+'px)',boxShadow:'0 14px '+style.shadow+'px #00000055'};
}
function NativeBlock({b}:{b:PageBlock}){
 const links=b.secondary.split(',').map(v=>v.trim()).filter(Boolean);
 switch(b.kind){
 case 'navbar':return <nav className="navbar navbar-expand-lg"><div className="container-fluid"><a className="navbar-brand fw-bold" href="#" onClick={e=>e.preventDefault()}>{b.content}</a><div className="navbar-nav ms-auto d-flex flex-row flex-wrap gap-3">{links.map((v,i)=><a key={i} className="nav-link" href="#" onClick={e=>e.preventDefault()}>{v}</a>)}</div></div></nav>;
 case 'hero':return <div className="container py-4"><span className="badge rounded-pill text-bg-info mb-3">NUEVA EXPERIENCIA</span><h1 className="display-4 fw-bold mb-3">{b.content}</h1><p className="lead col-lg-10">{b.secondary}</p><span className="btn btn-primary mt-2" style={{background:b.style.accent,borderColor:b.style.accent,color:'#051525'}}>Comenzar →</span></div>;
 case 'heading':return <div className="container"><h2 className="display-6 fw-bold">{b.content}</h2><p>{b.secondary}</p></div>;
 case 'text':return <div className="container"><p className="lead">{b.content}</p><p>{b.secondary}</p></div>;
 case 'button':return <div className="text-center"><span className="btn btn-lg" style={{background:b.style.accent,color:'#051525'}}>{b.content} ↗</span></div>;
 case 'image':return <div className="container"><img src={displayImage(b.image)} alt={b.content} className="w-100 rounded-4 object-fit-cover" style={{maxHeight:300}}/><small className="d-block mt-2">{b.secondary}</small></div>;
 case 'cards':return <div className="container"><h3>{b.content}</h3><p>{b.secondary}</p><div className="row g-3">{[1,2,3].map(i=><div className="col-md-4" key={i}><div className="atlas-preview-card h-100"><span className="badge text-bg-primary">0{i}</span><h4 className="h6 mt-3">Elemento {i}</h4><p className="small mb-0">{b.secondary}</p></div></div>)}</div></div>;
 case 'panel':return <div className="atlas-glass-test"><div className="atlas-inside-glass" style={{backdropFilter:'blur('+Math.max(3,b.style.blur)+'px)',borderColor:b.style.accent+'88'}}><span className="badge text-bg-info">GLASS / NEON</span><h3 className="mt-2">{b.content}</h3><p>{b.secondary}</p></div></div>;
 case 'stats':return <div className="container"><h3>{b.content}</h3><div className="row g-2 mt-2">{['98%','24K','120+','4.9'].map((n,i)=><div key={n} className="col-6 col-md-3"><div className="atlas-preview-card text-center"><b className="h3 d-block">{n}</b><small>Métrica {i+1}</small></div></div>)}</div></div>;
 case 'gallery':return <div className="container"><h3>{b.content}</h3><div className="atlas-reel-preview">{links.map((url,i)=><img key={i} src={displayImage(url)} alt={'Galería '+(i+1)}/>)}</div></div>;
 case 'form':return <div className="container" style={{maxWidth:560}}><h3>{b.content}</h3><p>{b.secondary}</p><label className="form-label w-100">Correo<input type="email" className="form-control mt-1" placeholder="correo@ejemplo.com" readOnly/></label><label className="form-label w-100">Mensaje<textarea className="form-control mt-1" rows={2} placeholder="Escribe tu mensaje" readOnly/></label><span className="btn btn-primary">Enviar</span></div>;
 case 'footer':return <footer className="container d-flex gap-3 justify-content-between flex-wrap align-items-center"><strong>{b.content}</strong><div className="d-flex gap-3">{links.map((v,i)=><small key={i}>{v}</small>)}</div><small>© {new Date().getFullYear()}</small></footer>;
 case 'divider':return <div className="container"><hr style={{borderColor:b.style.accent}}/></div>;
 case 'spacer':return <div style={{height:35}}/>;
 }
}
export default function Editor({seed,insertKind,onSeedUsed,onInsertUsed}:Props){
 const [project,setProject]=useState<AtlasProject>(load);
 const [selected,setSelected]=useState<string|null>(null);
 const [past,setPast]=useState<AtlasProject[]>([]);
 const [future,setFuture]=useState<AtlasProject[]>([]);
 const [device,setDevice]=useState<'desktop'|'tablet'|'mobile'>('desktop');
 const [inspectorTab,setInspectorTab]=useState<'content'|'style'|'effects'>('content');
 const [openPane,setOpenPane]=useState<'blocks'|'layers'>('blocks');
 const [toast,setToast]=useState('');
 const [showCode,setShowCode]=useState(false);
 const fileRef=useRef<HTMLInputElement>(null);
 const inputRef=useRef<HTMLInputElement>(null);
 const selectedBlock=project.blocks.find(b=>b.id===selected)??null;
 const notify=(m:string)=>{setToast(m);window.setTimeout(()=>setToast(''),2600);};
 useEffect(()=>{try{localStorage.setItem(STORAGE_KEY,JSON.stringify(project));}catch{notify('El proyecto supera el espacio de guardado local. Exporta JSON para conservarlo.');}},[project]);
 useEffect(()=>{if(seed){save(createProject(seed));setSelected(null);onSeedUsed();notify('Plantilla cargada: '+seed.name);}},[seed]);
 useEffect(()=>{if(insertKind){add(insertKind);onInsertUsed();}},[insertKind]);
 function save(next:AtlasProject){setPast(p=>[...p.slice(-29),project]);setFuture([]);setProject({...next,updatedAt:Date.now()});}
 function editProject(patch:Partial<AtlasProject>){save({...project,...patch});}
 function add(kind:BlockKind,at?:number){
  const b=createBlock(kind,project.blocks[0]?.style.accent??'#43e6c5',project.theme);
  const list=[...project.blocks];list.splice(at??list.length,0,b);
  save({...project,blocks:list});setSelected(b.id);setInspectorTab('content');
 }
 function updateBlock(patch:Partial<PageBlock>){if(!selectedBlock)return;save({...project,blocks:project.blocks.map(b=>b.id===selected?{...b,...patch}:b)});}
 function updateStyle(patch:Partial<BlockStyle>){if(selectedBlock)updateBlock({style:{...selectedBlock.style,...patch}});}
 function remove(id:string){save({...project,blocks:project.blocks.filter(b=>b.id!==id)});if(selected===id)setSelected(null);}
 function duplicate(id:string){const i=project.blocks.findIndex(b=>b.id===id);if(i<0)return;const b={...project.blocks[i],style:{...project.blocks[i].style},id:uid()};const list=[...project.blocks];list.splice(i+1,0,b);save({...project,blocks:list});setSelected(b.id);}
 function move(id:string,diff:number){const list=[...project.blocks];const i=list.findIndex(b=>b.id===id),j=i+diff;if(i<0||j<0||j>=list.length)return;[list[i],list[j]]=[list[j],list[i]];save({...project,blocks:list});}
 function undo(){if(!past.length)return;setFuture(f=>[project,...f]);setProject(past[past.length-1]);setPast(p=>p.slice(0,-1));}
 function redo(){if(!future.length)return;setPast(p=>[...p,project]);setProject(future[0]);setFuture(f=>f.slice(1));}
 function onDrop(e:React.DragEvent,at:number){e.preventDefault();const raw=e.dataTransfer.getData('text/plain');
  if(raw.startsWith('new:')&&blockKinds.has(raw.slice(4) as BlockKind)){add(raw.slice(4) as BlockKind,at);return;}
  if(raw.startsWith('move:')){const id=raw.slice(5);const list=[...project.blocks];const i=list.findIndex(b=>b.id===id);if(i<0)return;const [b]=list.splice(i,1);list.splice(i<at?at-1:at,0,b);save({...project,blocks:list});setSelected(id);}
 }
 async function copy(text:string,done='Copiado al portapapeles'){try{await navigator.clipboard.writeText(text);notify(done);}catch{notify('El navegador bloqueó el portapapeles: utiliza exportar.');}}
 async function importJson(file?:File){if(!file)return;try{const data=JSON.parse(await file.text());if(!validate(data))throw Error('Formato inválido');save({...data,id:uid()});setSelected(null);notify('Proyecto importado');}catch{notify('No se pudo importar: formato de proyecto incorrecto');}}
 async function importImage(file?:File){if(!selectedBlock||!file)return;if(!file.type.startsWith('image/')||file.size>3_000_000){notify('Usa una imagen de menos de 3 MB');return;}const reader=new FileReader();reader.onload=()=>updateBlock({image:String(reader.result)});reader.readAsDataURL(file);}
 const exportName=project.name.toLowerCase().replace(/[^a-z0-9-]/g,'-')||'mi-sitio';
 return <div className="atlas-studio">
  <header className="atlas-studio-top">
   <div className="atlas-studio-heading"><span className="atlas-live-dot"/><div><small>ATLAS DESIGNER</small><input aria-label="Nombre del proyecto" value={project.name} onChange={e=>editProject({name:e.target.value})}/></div></div>
   <div className="atlas-studio-actions">
    <button title="Deshacer" disabled={!past.length} onClick={undo}><Undo2 size={17}/></button><button title="Rehacer" disabled={!future.length} onClick={redo}><Redo2 size={17}/></button><span className="atlas-toolbar-divider"/>
    <button title="Vista escritorio" className={device==='desktop'?'active':''} onClick={()=>setDevice('desktop')}><Monitor size={17}/></button><button title="Vista tablet" className={device==='tablet'?'active':''} onClick={()=>setDevice('tablet')}><Tablet size={17}/></button><button title="Vista móvil" className={device==='mobile'?'active':''} onClick={()=>setDevice('mobile')}><Smartphone size={17}/></button>
    <span className="atlas-toolbar-divider"/>
    <button onClick={()=>setShowCode(v=>!v)} title="Ver código"><Code2 size={17}/><span className="atlas-hide-narrow">Código</span></button>
    <div className="dropdown"><button className="atlas-primary-btn dropdown-toggle" data-bs-toggle="dropdown"><Download size={16}/> Exportar</button><ul className="dropdown-menu dropdown-menu-end shadow-lg">
     <li><button className="dropdown-item" onClick={()=>downloadFile(exportName+'.html',getHtml(project,true),'text/html')}>HTML completo sin CDN</button></li>
     <li><button className="dropdown-item" onClick={()=>void downloadZip(project)}>Proyecto ZIP + Bootstrap local</button></li>
     <li><button className="dropdown-item" onClick={()=>downloadFile(exportName+'.json',JSON.stringify(project,null,2),'application/json')}>Proyecto JSON editable</button></li>
     <li><hr className="dropdown-divider"/></li>
     <li><button className="dropdown-item" onClick={()=>copy(getHtml(project,true))}>Copiar HTML</button></li><li><button className="dropdown-item" onClick={()=>copy(getCss(project))}>Copiar CSS documentado</button></li><li><button className="dropdown-item" onClick={()=>copy(getJs())}>Copiar JavaScript</button></li>
    </ul></div>
   </div>
  </header>
  <div className="atlas-editor-grid">
   <aside className="atlas-editor-library">
    <div className="atlas-tab-pair"><button className={openPane==='blocks'?'active':''} onClick={()=>setOpenPane('blocks')}><Plus size={15}/> Bloques</button><button className={openPane==='layers'?'active':''} onClick={()=>setOpenPane('layers')}><Layers3 size={15}/> Capas</button></div>
    {openPane==='blocks'?<><p className="atlas-subtle px-3 mt-3 mb-2">Arrastra al lienzo o pulsa para agregar</p><div className="atlas-block-list">{components.map(c=><button key={c.kind} className="atlas-block-tile" draggable onDragStart={e=>e.dataTransfer.setData('text/plain','new:'+c.kind)} onClick={()=>add(c.kind)}><span className="atlas-block-symbol">{c.icon.slice(0,2).toUpperCase()}</span><span><b>{c.name}</b><small>{c.category}</small></span><Plus size={15}/></button>)}</div></>:<div className="atlas-layer-list">{project.blocks.map((b,i)=><button key={b.id} className={'atlas-layer '+(selected===b.id?'active':'')} draggable onDragStart={e=>e.dataTransfer.setData('text/plain','move:'+b.id)} onClick={()=>setSelected(b.id)}><span className="atlas-layer-count">{String(i+1).padStart(2,'0')}</span><span>{b.kind} · {b.content.slice(0,25)}</span><ChevronDown size={14}/></button>)}<button className="atlas-outline-btn m-3" onClick={()=>inputRef.current?.click()}><Upload size={15}/> Importar JSON</button><input hidden type="file" accept=".json,application/json" ref={inputRef} onChange={e=>void importJson(e.target.files?.[0])}/></div>}
   </aside>
   <main className="atlas-editor-middle">
    <div className="atlas-canvas-guide"><span><span className="atlas-live-dot"/> VISTA {device.toUpperCase()}</span><span>{project.blocks.length} bloques · arrastra para ordenar</span></div>
    {showCode?<div className="atlas-code-pane"><div className="atlas-code-pane-top"><span>HTML exportado</span><button onClick={()=>copy(getHtml(project,true))}><Copy size={15}/> Copiar</button></div><pre>{getHtml(project,false)}</pre></div>:
    <div className="atlas-canvas-shell">
      <div className={'atlas-canvas atlas-canvas-'+device} data-theme={project.theme}>
       <div className="atlas-drop-target" onDragOver={e=>e.preventDefault()} onDrop={e=>onDrop(e,0)}>+ Soltar bloque aquí</div>
       {project.blocks.map((b,i)=><div key={b.id}>
         <div draggable onDragStart={e=>e.dataTransfer.setData('text/plain','move:'+b.id)} className={'atlas-canvas-block '+(selected===b.id?'selected':'')} onClick={()=>{setSelected(b.id);setInspectorTab('content');}}>
          <div className="atlas-block-badge"><span>{i+1}. {b.kind.toUpperCase()}</span><div><button title="Subir" onClick={e=>{e.stopPropagation();move(b.id,-1)}}><ArrowUp size={13}/></button><button title="Bajar" onClick={e=>{e.stopPropagation();move(b.id,1)}}><ArrowDown size={13}/></button><button title="Duplicar" onClick={e=>{e.stopPropagation();duplicate(b.id)}}><Copy size={13}/></button><button title="Eliminar" onClick={e=>{e.stopPropagation();remove(b.id)}}><Trash2 size={13}/></button></div></div>
          <section className={'atlas-inner-block atlas-motion-'+b.motion} style={cssOf(b.style)}><NativeBlock b={b}/></section>
         </div>
         <div className="atlas-drop-target" onDragOver={e=>e.preventDefault()} onDrop={e=>onDrop(e,i+1)}>+ Soltar bloque aquí</div>
        </div>)}
       {!project.blocks.length&&<div className="atlas-canvas-empty"><Plus size={27}/><h3>Tu lienzo está vacío</h3><p>Agrega un componente para comenzar.</p></div>}
      </div>
    </div>}
   </main>
   <aside className="atlas-editor-inspector">
    <div className="atlas-inspector-head"><div><small>PROPIEDADES</small><h3>{selectedBlock?selectedBlock.kind:'Página'}</h3></div><button title="Restablecer bloque" onClick={()=>selectedBlock?updateBlock({style:{...defaultStyle}}):setProject(createProject())}><RotateCcw size={15}/></button></div>
    {!selectedBlock?<div className="atlas-props">
       <label>Nombre del sitio<input className="form-control" value={project.name} onChange={e=>editProject({name:e.target.value})}/></label>
       <label>Descripción<input className="form-control" value={project.description} onChange={e=>editProject({description:e.target.value})}/></label>
       <label>Tema<select className="form-select" value={project.theme} onChange={e=>editProject({theme:e.target.value as AtlasProject['theme']})}><option value="dark">Oscuro</option><option value="light">Claro</option></select></label>
       <button className="atlas-outline-btn w-100 mt-2" onClick={()=>inputRef.current?.click()}><FileJson size={15}/> Importar diseño JSON</button>
       <input hidden type="file" accept=".json" ref={inputRef} onChange={e=>void importJson(e.target.files?.[0])}/>
       <div className="atlas-tip"><Check size={17}/> El proyecto se guarda automáticamente en este navegador.</div>
     </div>:<>
      <div className="atlas-inspector-tabs">{(['content','style','effects'] as const).map(t=><button key={t} className={inspectorTab===t?'active':''} onClick={()=>setInspectorTab(t)}>{t==='content'?'Contenido':t==='style'?'Estilo':'Efectos'}</button>)}</div>
      <div className="atlas-props" key={selectedBlock.id}>
       {inspectorTab==='content'&&<>
        <label>Texto principal<input className="form-control" value={selectedBlock.content} onChange={e=>updateBlock({content:e.target.value})}/></label>
        <label>{['navbar','footer','gallery'].includes(selectedBlock.kind)?'Elementos separados por coma':'Texto secundario'}<textarea className="form-control" rows={3} value={selectedBlock.secondary} onChange={e=>updateBlock({secondary:e.target.value})}/></label>
        {['image','hero','gallery'].includes(selectedBlock.kind)&&<><label>URL de imagen<input className="form-control" value={selectedBlock.image} onChange={e=>updateBlock({image:e.target.value})}/></label><button className="atlas-outline-btn w-100" onClick={()=>fileRef.current?.click()}><ImagePlus size={15}/> Cargar imagen local</button><input hidden ref={fileRef} type="file" accept="image/*" onChange={e=>void importImage(e.target.files?.[0])}/><small className="atlas-subtle">La imagen local se incrusta en el HTML exportado. Máximo 3 MB.</small></>}
        {['button','hero'].includes(selectedBlock.kind)&&<label>Enlace del botón<input className="form-control" value={selectedBlock.href} onChange={e=>updateBlock({href:e.target.value})}/></label>}
        <button className="atlas-outline-btn w-100" onClick={()=>duplicate(selectedBlock.id)}><Copy size={15}/> Duplicar elemento</button>
       </>}
       {inspectorTab==='style'&&<>
        <div className="atlas-color-grid">{(['background','color','accent','borderColor'] as const).map(key=><label key={key}>{({background:'Fondo',color:'Texto',accent:'Acento',borderColor:'Borde'})[key]}<input type="color" value={selectedBlock.style[key]} onChange={e=>updateStyle({[key]:e.target.value})}/></label>)}</div>
        <Range label="Relleno" unit="px" value={selectedBlock.style.padding} max={100} onChange={v=>updateStyle({padding:v})}/>
        <Range label="Radio de borde" unit="px" value={selectedBlock.style.radius} max={80} onChange={v=>updateStyle({radius:v})}/>
        <Range label="Grosor de borde" unit="px" value={selectedBlock.style.borderWidth} max={12} onChange={v=>updateStyle({borderWidth:v})}/>
        <Range label="Tamaño de texto" unit="px" value={selectedBlock.style.fontSize} min={12} max={28} onChange={v=>updateStyle({fontSize:v})}/>
        <Range label="Opacidad" unit="%" value={selectedBlock.style.opacity} min={5} max={100} onChange={v=>updateStyle({opacity:v})}/>
       </>}
       {inspectorTab==='effects'&&<>
        <label>Animación<select className="form-select" value={selectedBlock.motion} onChange={e=>updateBlock({motion:e.target.value as Motion})}>{variants.map(v=><option key={v} value={v}>{v}</option>)}</select></label>
        <Range label="Backdrop blur" unit="px" value={selectedBlock.style.blur} max={50} onChange={v=>updateStyle({blur:v})}/>
        <Range label="Difusión de sombra" unit="px" value={selectedBlock.style.shadow} max={100} onChange={v=>updateStyle({shadow:v})}/>
        <div className="form-check form-switch"><input id="gradientSwitch" type="checkbox" className="form-check-input" checked={selectedBlock.style.gradient} onChange={e=>updateStyle({gradient:e.target.checked})}/><label htmlFor="gradientSwitch" className="form-check-label">Activar gradiente</label></div>
        {selectedBlock.style.gradient&&<><label>Segundo color<input type="color" value={selectedBlock.style.gradientEnd} onChange={e=>updateStyle({gradientEnd:e.target.value})}/></label><Range label="Ángulo" unit="°" max={360} value={selectedBlock.style.gradientAngle} onChange={v=>updateStyle({gradientAngle:v})}/></>}
        <p className="atlas-subtle">El patrón de líneas en los paneles muestra claramente la intensidad real del blur.</p>
        <div className="atlas-effects-checker"><div style={{...cssOf(selectedBlock.style),maxWidth:'80%',margin:'auto'}}>Vista del efecto</div></div>
       </>}
       <button className="atlas-danger-btn" onClick={()=>remove(selectedBlock.id)}><Trash2 size={15}/> Eliminar bloque</button>
      </div>
     </>}
     <div className="atlas-inspector-bottom"><button onClick={()=>copy(getHtml(project,true))}><FileCode2 size={16}/> Copiar HTML</button><button onClick={()=>downloadFile(exportName+'.json',JSON.stringify(project,null,2),'application/json')}><Save size={16}/> Guardar JSON</button></div>
   </aside>
  </div>
  {toast&&<div role="status" className="atlas-toast"><Check size={16}/>{toast}</div>}
 </div>;
}
function Range({label,value,onChange,min=0,max=100,unit}:{label:string,value:number,onChange:(v:number)=>void,min?:number,max?:number,unit:string}){
 return <label className="atlas-range"><span>{label}<b>{value}{unit}</b></span><input type="range" min={min} max={max} value={value} onChange={e=>onChange(Number(e.target.value))}/></label>;
}
