import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// PAGES
import { MainComponent } from './pages/main/main.component';
import { CreacionObservablesComponent } from './pages/creacion-observables/creacion-observables.component';
import { OperadoresBasicosComponent } from './pages/operadores-basicos/operadores-basicos.component';
import { UtilidadesComponent } from './pages/utilidades/utilidades.component';
import { OperadoresTemporalesComponent } from './pages/operadores-temporales/operadores-temporales.component';
import { CombinacionObservablesComponent } from './pages/combinacion-observables/combinacion-observables.component';
import { HighOrderObservablesComponent } from './pages/high-order-observables/high-order-observables.component';
import { UtilidadesAvanzadasComponent } from './pages/utilidades-avanzadas/utilidades-avanzadas.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'creacion-observables', component: CreacionObservablesComponent },
  { path: 'operadores-basicos', component: OperadoresBasicosComponent },
  { path: 'utilidades', component: UtilidadesComponent },
  { path: 'operadores-temporales', component: OperadoresTemporalesComponent },
  { path: 'combinacion-observables', component: CombinacionObservablesComponent },
  { path: 'high-order-observables', component: HighOrderObservablesComponent },
  { path: 'utilidades-avanzadas', component: UtilidadesAvanzadasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: "enabled",
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
