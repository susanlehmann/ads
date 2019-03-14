import { Component, EventEmitter, Injectable, Output, Input } from '@angular/core';
import { CalendarDayViewComponent, CalendarUtils } from 'angular-calendar';
import { DayView, DayViewEvent, GetDayViewArgs } from 'calendar-utils';

// extend the interface to add the array of users
interface DayViewScheduler extends DayView {
  staffs: any[];
}

const HEADER_MARGIN_LEFT = 100;
let EVENT_WIDTH: number;

@Injectable()
export class DayViewSchedulerCalendarUtils extends CalendarUtils {

  getDayView(args: GetDayViewArgs): DayViewScheduler {
    const view: DayViewScheduler = {
      ...super.getDayView(args),
      staffs: []
    };

    view.staffs = view.events[0].event.meta.staffs;
    // calculated base on number of displayed staffs
    EVENT_WIDTH = (Math.round(document.querySelector('.main-container').clientWidth - HEADER_MARGIN_LEFT) / view.staffs.length);

    view.events = view.events.map(dayViewEvent => {
      const index = view.staffs.indexOf(dayViewEvent.event.meta.user);
      dayViewEvent.left = index * EVENT_WIDTH; // change the column of the event
      dayViewEvent.width = EVENT_WIDTH;
      return dayViewEvent;
    });
    view.width = view.staffs.length * EVENT_WIDTH;
    return view;
  }
}

@Component({
  // tslint:disable-line max-classes-per-file
  selector: 'mwl-day-view-scheduler',
  templateUrl: './day-view-scheduler.component.html',
  styleUrls: ['./day-view-scheduler.component.scss'],
  providers: [
    {
      provide: CalendarUtils,
      useClass: DayViewSchedulerCalendarUtils
    }
  ],
})
export class DayViewSchedulerComponent extends CalendarDayViewComponent {
  view: DayViewScheduler;

  @Output() userChanged = new EventEmitter();
  @Input() staffs;

  ngOnInit() {
    this.eventWidth = EVENT_WIDTH;
  }

  eventDragged(dayEvent: DayViewEvent, xPixels: number, yPixels: number): void {
    // super.dragEnded(dayEvent, { y: yPixels, x: 0 } as any); // original behaviour

    if (yPixels !== 0) {
      super.dragEnded(dayEvent, { y: yPixels, x: 0 } as any); // original behaviour
    }
    if (xPixels !== 0) {
      const columnsMoved = xPixels / EVENT_WIDTH;
      const currentColumnIndex = this.view.staffs.findIndex(
        user => user.id === dayEvent.event.meta.user.id
      );
      const newIndex = currentColumnIndex + columnsMoved;
      const newUser = this.view.staffs[newIndex];
      if (newUser) {
        this.userChanged.emit({ event: dayEvent.event, newUser });
      }
    }
  }

  viewWeekScheduleOf(staffId) {
    console.log(staffId);
  }
}
