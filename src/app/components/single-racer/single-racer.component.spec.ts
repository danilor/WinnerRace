import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleRacerComponent } from './single-racer.component';

describe('SingleRacerComponent', () => {
  let component: SingleRacerComponent;
  let fixture: ComponentFixture<SingleRacerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleRacerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleRacerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
