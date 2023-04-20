import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent {
  navigationData = [
    { title: 'Creación de observables', route: '/creacion-observables' },
    { title: 'Operadores básicos', route: '/operadores-basicos' },
    { title: 'Utilidades', route: '/utilidades' },
    { title: 'Operadores temporales', route: '/operadores-temporales' },
    { title: 'Combinación de observables', route: '/combinacion-observables' },
    { title: 'High Order Observables', route: '/high-order-observables' },
    { title: 'Utilidades avanzadas', route: '/utilidades-avanzadas' },
  ]
}
