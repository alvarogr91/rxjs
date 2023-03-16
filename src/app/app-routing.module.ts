import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreacionObservablesComponent } from './pages/creacion-observables/creacion-observables.component';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'creacion-observables', component: CreacionObservablesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
