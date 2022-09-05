import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenRestrictionComponent } from './screen-restriction.component';

describe('ScreenRestrictionComponent', () => {
  let component: ScreenRestrictionComponent;
  let fixture: ComponentFixture<ScreenRestrictionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenRestrictionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenRestrictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
