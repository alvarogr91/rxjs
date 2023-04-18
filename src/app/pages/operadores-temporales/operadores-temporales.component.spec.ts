import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperadoresTemporalesComponent } from './operadores-temporales.component';

describe('OperadoresTemporalesComponent', () => {
  let component: OperadoresTemporalesComponent;
  let fixture: ComponentFixture<OperadoresTemporalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperadoresTemporalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperadoresTemporalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
