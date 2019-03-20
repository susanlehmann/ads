import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCalendarDayViewComponent } from './custom-calendar-day-view.component';

describe('CustomCalendarDayViewComponent', () => {
  let component: CustomCalendarDayViewComponent;
  let fixture: ComponentFixture<CustomCalendarDayViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomCalendarDayViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCalendarDayViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
