export type BlockKind = 'navbar'|'hero'|'heading'|'text'|'button'|'image'|'cards'|'panel'|'stats'|'gallery'|'form'|'footer'|'divider'|'spacer';
export type Motion = 'none'|'fade'|'rise'|'glow'|'float';
export interface BlockStyle {
 background:string; color:string; accent:string; radius:number;
 padding:number; blur:number; opacity:number; shadow:number;
 borderWidth:number; borderColor:string; gradient:boolean;
 gradientEnd:string; gradientAngle:number; fontSize:number;
}
export interface PageBlock {
 id:string; kind:BlockKind; title:string; content:string;
 secondary:string; image:string; href:string; motion:Motion; style:BlockStyle;
}
export interface AtlasProject {
 id:string; name:string; description:string; theme:'dark'|'light';
 blocks:PageBlock[]; updatedAt:number;
}
export interface TemplateDefinition {
 id:string; name:string; description:string; icon:string; badge:string;
 kinds:BlockKind[]; theme:'dark'|'light'; accent:string;
}
export interface ComponentDefinition {
 kind:BlockKind; name:string; description:string; icon:string; category:string;
}
