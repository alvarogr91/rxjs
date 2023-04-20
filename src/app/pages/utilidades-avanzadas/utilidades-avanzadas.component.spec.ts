import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilidadesAvanzadasComponent } from './utilidades-avanzadas.component';

describe('UtilidadesAvanzadasComponent', () => {
  let component: UtilidadesAvanzadasComponent;
  let fixture: ComponentFixture<UtilidadesAvanzadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtilidadesAvanzadasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtilidadesAvanzadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
