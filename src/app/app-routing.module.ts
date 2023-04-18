import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// PAGES
import { MainComponent } from './pages/main/main.component';
import { CreacionObservablesComponent } from './pages/creacion-observables/creacion-observables.component';
import { OperadoresBasicosComponent } from './pages/operadores-basicos/operadores-basicos.component';
import { UtilidadesComponent } from './pages/utilidades/utilidades.component';
import { OperadoresTemporalesComponent } from './pages/operadores-temporales/operadores-temporales.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'creacion-observables', component: CreacionObservablesComponent },
  { path: 'operadores-basicos', component: OperadoresBasicosComponent },
  { path: 'utilidades', component: UtilidadesComponent },
  { path: 'operadores-temporales', component: OperadoresTemporalesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: "enabled",
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
