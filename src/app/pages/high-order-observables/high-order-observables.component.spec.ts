import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighOrderObservablesComponent } from './high-order-observables.component';

describe('HighOrderObservablesComponent', () => {
  let component: HighOrderObservablesComponent;
  let fixture: ComponentFixture<HighOrderObservablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighOrderObservablesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighOrderObservablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
