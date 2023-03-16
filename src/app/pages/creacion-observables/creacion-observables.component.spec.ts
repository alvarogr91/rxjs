import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionObservablesComponent } from './creacion-observables.component';

describe('CreacionObservablesComponent', () => {
  let component: CreacionObservablesComponent;
  let fixture: ComponentFixture<CreacionObservablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreacionObservablesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreacionObservablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
