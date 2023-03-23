import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperadoresBasicosComponent } from './operadores-basicos.component';

describe('OperadoresBasicosComponent', () => {
  let component: OperadoresBasicosComponent;
  let fixture: ComponentFixture<OperadoresBasicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperadoresBasicosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperadoresBasicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
