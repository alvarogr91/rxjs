import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { CreacionObservablesComponent } from './pages/creacion-observables/creacion-observables.component';
import { OperadoresBasicosComponent } from './pages/operadores-basicos/operadores-basicos.component';
import { UtilidadesComponent } from './pages/utilidades/utilidades.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CreacionObservablesComponent,
    OperadoresBasicosComponent,
    UtilidadesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
