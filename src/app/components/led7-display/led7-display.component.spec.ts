import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Led7DisplayComponent } from './led7-display.component';

describe('Led7DisplayComponent', () => {
  let component: Led7DisplayComponent;
  let fixture: ComponentFixture<Led7DisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Led7DisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Led7DisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
