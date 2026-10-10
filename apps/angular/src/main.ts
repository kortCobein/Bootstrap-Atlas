import {Component,signal} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
@Component({
  selector:'atlas-root',
  standalone:true,
  template:`<main class="container py-5">
  <a class="accent" href="http://localhost:5173">← Volver al Studio React</a>
  <section class="atlas-card mt-4">
    <span class="badge text-bg-info">ANGULAR STANDALONE</span>
    <h1 class="display-5 mt-3">Laboratorio Angular</h1>
    <p class="text-secondary-emphasis">Ejemplo funcional con señales, eventos, interpolación y Bootstrap local.</p>
    <p class="fs-4">Contador reactivo: <strong class="accent">{{contador()}}</strong></p>
    <button class="btn btn-info me-2" (click)="incrementar()">+ Aumentar</button>
    <button class="btn btn-outline-light" (click)="contador.set(0)">Reiniciar</button>
  </section></main>`
})
class App { contador=signal(0); incrementar(){this.contador.update(n=>n+1);} }
bootstrapApplication(App).catch(console.error);
