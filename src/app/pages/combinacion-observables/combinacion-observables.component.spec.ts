import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinacionObservablesComponent } from './combinacion-observables.component';

describe('CombinacionObservablesComponent', () => {
  let component: CombinacionObservablesComponent;
  let fixture: ComponentFixture<CombinacionObservablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CombinacionObservablesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CombinacionObservablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
