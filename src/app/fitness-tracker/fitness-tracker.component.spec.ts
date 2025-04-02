import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessTrackerComponent } from './fitness-tracker.component';

describe('FitnessTrackerComponent', () => {
  let component: FitnessTrackerComponent;
  let fixture: ComponentFixture<FitnessTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FitnessTrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FitnessTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
