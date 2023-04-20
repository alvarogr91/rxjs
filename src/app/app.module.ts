import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

// COMPONENTS
import { MainComponent } from './pages/main/main.component';
import { CreacionObservablesComponent } from './pages/creacion-observables/creacion-observables.component';
import { OperadoresBasicosComponent } from './pages/operadores-basicos/operadores-basicos.component';
import { UtilidadesComponent } from './pages/utilidades/utilidades.component';
import { OperadoresTemporalesComponent } from './pages/operadores-temporales/operadores-temporales.component';
import { CombinacionObservablesComponent } from './pages/combinacion-observables/combinacion-observables.component';
import { HighOrderObservablesComponent } from './pages/high-order-observables/high-order-observables.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CreacionObservablesComponent,
    OperadoresBasicosComponent,
    UtilidadesComponent,
    OperadoresTemporalesComponent,
    CombinacionObservablesComponent,
    HighOrderObservablesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
