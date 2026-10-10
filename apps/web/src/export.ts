import JSZip from 'jszip';
import bootstrapCss from 'bootstrap/dist/css/bootstrap.min.css?raw';
import bootstrapJs from 'bootstrap/dist/js/bootstrap.bundle.min.js?raw';
import type {AtlasProject,PageBlock,BlockStyle} from './types';
const esc=(v:string)=>String(v).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'","&#39;");
const cssValue=(v:string)=>v.replace(/[<>;{}]/g,'');
const safeUrl=(u:string)=>/^(https?:\/\/|data:image\/(png|jpeg|gif|webp|svg\+xml);base64,|#|\/)/i.test(u)?esc(u):'#';
const render=(b:PageBlock):string=>{
 const label=esc(b.content);const desc=esc(b.secondary);
 const a=safeUrl(b.href);const img=safeUrl(b.image);
 const entries=b.secondary.split(',').map(s=>esc(s.trim())).filter(Boolean);
 switch(b.kind){
 case 'navbar':return '<nav class="navbar navbar-expand-lg"><div class="container-fluid"><a class="navbar-brand fw-bold" href="#">'+label+'</a><button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav-'+b.id+'"><span class="navbar-toggler-icon"></span></button><div class="collapse navbar-collapse" id="nav-'+b.id+'"><ul class="navbar-nav ms-auto">'+entries.map((item,i)=>'<li class="nav-item"><a class="nav-link" href="#section-'+i+'">'+item+'</a></li>').join('')+'</ul></div></div></nav>';
 case 'hero':return '<div class="container py-5"><span class="badge rounded-pill text-bg-info mb-3">NUEVA EXPERIENCIA</span><h1 class="display-3 fw-bold">'+label+'</h1><p class="lead col-lg-8">'+desc+'</p><a class="btn btn-primary btn-lg mt-3" href="'+a+'">Comenzar →</a></div>';
 case 'heading':return '<div class="container"><h2 class="display-5 fw-bold">'+label+'</h2><p>'+desc+'</p></div>';
 case 'text':return '<div class="container"><p class="lead mb-0">'+label+'</p><p>'+desc+'</p></div>';
 case 'button':return '<div class="container text-center"><a class="btn btn-primary btn-lg px-5" href="'+a+'">'+label+'</a></div>';
 case 'image':return '<div class="container"><figure class="m-0"><img class="img-fluid rounded-4 w-100" style="max-height:440px;object-fit:cover" src="'+img+'" alt="'+label+'" loading="lazy"><figcaption class="pt-3">'+desc+'</figcaption></figure></div>';
 case 'cards':return '<div class="container"><h2>'+label+'</h2><p>'+desc+'</p><div class="row g-3">'+[1,2,3].map(i=>'<div class="col-md-4"><div class="card h-100"><div class="card-body"><span class="badge text-bg-primary">0'+i+'</span><h3 class="h5 mt-3">Elemento '+i+'</h3><p>'+desc+'</p></div></div></div>').join('')+'</div></div>';
 case 'panel':return '<div class="container"><div class="atlas-glass-demo"><div class="atlas-glass-panel"><span class="badge text-bg-info mb-2">GLASS UI</span><h2>'+label+'</h2><p>'+desc+'</p></div></div></div>';
 case 'stats':return '<div class="container"><h2>'+label+'</h2><div class="row g-3 mt-1">'+['98%','24K+','120','4.9/5'].map((v,i)=>'<div class="col-6 col-md-3"><div class="p-3 text-center"><strong class="display-5 d-block">'+v+'</strong><span>Métrica '+(i+1)+'</span></div></div>').join('')+'</div></div>';
 case 'gallery':return '<div class="container"><h2>'+label+'</h2><div class="atlas-reel">'+entries.map(u=>'<img src="'+safeUrl(u)+'" alt="Fotografía de galería" loading="lazy">').join('')+'</div></div>';
 case 'form':return '<div class="container" style="max-width:650px"><h2>'+label+'</h2><p>'+desc+'</p><form class="atlas-contact"><label class="form-label">Nombre<input class="form-control" name="nombre" required></label><label class="form-label d-block">Correo<input class="form-control" name="correo" type="email" required></label><label class="form-label d-block">Mensaje<textarea class="form-control" name="mensaje" required></textarea></label><button class="btn btn-primary mt-3">Enviar demo</button><output class="d-block mt-2" role="status"></output></form></div>';
 case 'footer':return '<div class="container d-md-flex justify-content-between"><strong>'+label+'</strong><div>'+entries.map(s=>'<a class="me-3" href="#">'+s+'</a>').join('')+'</div><small>© '+new Date().getFullYear()+'</small></div>';
 case 'divider':return '<div class="container"><hr></div>';
 case 'spacer':return '<div style="height:45px"></div>';
 }
};
export function getCss(project:AtlasProject):string{
 const theme=project.theme==='dark'?'#070d19':'#f7f9fc';
 const color=project.theme==='dark'?'#eef6ff':'#15233a';
 const base='/* Atlas: estilos globales. Se usan en el body y demos de los bloques. */\nbody{margin:0;background:'+theme+';color:'+color+';font-family:system-ui,-apple-system,sans-serif} .atlas-section{margin:0 auto;position:relative;overflow:hidden} .atlas-reel{display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x mandatory;padding:18px 0}.atlas-reel img{width:260px;height:250px;object-fit:cover;flex:none;border-radius:18px;scroll-snap-align:start}.atlas-glass-demo{padding:50px;background:repeating-linear-gradient(90deg,#053551 0 11px,#061322 11px 22px);border-radius:20px}.atlas-glass-panel{max-width:540px;margin:auto;padding:35px;border:1px solid #ffffff44;border-radius:24px;background:#09284088;backdrop-filter:blur(12px)}.atlas-contact label{width:100%}.atlas-anim-rise{animation:atlas-rise .6s both}.atlas-anim-fade{animation:atlas-fade .6s both}.atlas-anim-glow{animation:atlas-glow 2.2s infinite alternate}.atlas-anim-float{animation:atlas-float 4s ease-in-out infinite}@keyframes atlas-rise{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}@keyframes atlas-fade{from{opacity:0}to{opacity:1}}@keyframes atlas-glow{to{filter:drop-shadow(0 0 18px #45e7c6)}}@keyframes atlas-float{50%{transform:translateY(-10px)}}@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}}\n';
 return base+project.blocks.map(b=>{
  const s=b.style; const bg=s.gradient?'linear-gradient('+s.gradientAngle+'deg,'+cssValue(s.background)+','+cssValue(s.gradientEnd)+')':cssValue(s.background);
  return '\n/* '+b.kind.toUpperCase()+': aplicar la clase .atlas-node-'+b.id+' al contenedor del elemento '+b.kind+'. */\n.atlas-node-'+b.id+'{background:'+bg+';color:'+cssValue(s.color)+';--bs-body-color:'+cssValue(s.color)+';--bs-heading-color:'+cssValue(s.color)+';--bs-link-color:'+cssValue(s.accent)+';--bs-primary-rgb:13,174,150;border:'+s.borderWidth+'px solid '+cssValue(s.borderColor)+';border-radius:'+s.radius+'px;padding:'+s.padding+'px;opacity:'+(s.opacity/100)+';backdrop-filter:blur('+s.blur+'px);box-shadow:0 14px '+s.shadow+'px #00000066;font-size:'+s.fontSize+'px}\n.atlas-node-'+b.id+' .btn-primary{background:'+cssValue(s.accent)+';border-color:'+cssValue(s.accent)+';color:#031321}\n.atlas-node-'+b.id+' a:not(.btn){color:inherit}\n';
 }).join('');
}
export const getJs=()=> '/* Formulario de demostración: no envía mensajes a un servidor. */\ndocument.querySelectorAll(".atlas-contact").forEach(form=>form.addEventListener("submit",event=>{event.preventDefault();form.querySelector("output").textContent="Demostración: conecta un backend antes de usar este formulario."; }));\n';
export function getHtml(project:AtlasProject,standalone=true):string {
 const css=standalone?'<style>'+bootstrapCss+'</style><style>'+getCss(project)+'</style>':'<link rel="stylesheet" href="vendor/bootstrap.min.css"><link rel="stylesheet" href="styles.css">';
 const script=standalone?'<script>'+bootstrapJs+'</script><script>'+getJs()+'</script>':'<script src="vendor/bootstrap.bundle.min.js"></script><script src="script.js"></script>';
 return '<!doctype html>\n<html lang="es" data-bs-theme="'+(project.theme==='dark'?'dark':'light')+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+esc(project.name)+'</title>'+css+'</head><body>'+project.blocks.map(b=>'<section id="block-'+b.id+'" class="atlas-section atlas-node-'+b.id+' atlas-anim-'+b.motion+'">'+render(b)+'</section>').join('\n')+script+'</body></html>';
}
export const cdns={
 css:'<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">',
 js:'<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>'
};
export function downloadFile(name:string,text:string,type='text/plain'){
 const blob=new Blob([text],{type});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1200);
}
export async function downloadZip(project:AtlasProject){
 const zip=new JSZip();
 zip.file('index.html',getHtml(project,false));
 zip.file('styles.css',getCss(project));
 zip.file('script.js',getJs());
 zip.file('vendor/bootstrap.min.css',bootstrapCss);
 zip.file('vendor/bootstrap.bundle.min.js',bootstrapJs);
 zip.file('README.md','# '+project.name+'\n\nAbre index.html en tu navegador. No requiere npm ni CDN.\nEdita styles.css (cada clase tiene comentario de uso) y script.js para personalizar.\n');
 const blob=await zip.generateAsync({type:'blob'});
 const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='atlas-'+project.name.toLowerCase().replace(/[^a-z0-9-]/g,'-')+'.zip';a.click();setTimeout(()=>URL.revokeObjectURL(url),1200);
}
