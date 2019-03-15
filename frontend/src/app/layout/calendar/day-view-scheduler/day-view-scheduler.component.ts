import { Component, EventEmitter, Injectable, Output, Input } from '@angular/core';
import { CalendarDayViewComponent, CalendarUtils } from 'angular-calendar';
import { DayView, DayViewEvent } from 'calendar-utils';

const HEADER_MARGIN_LEFT = 100;
let EVENT_WIDTH: number;

@Injectable()
export class DayViewSchedulerCalendarUtils extends CalendarUtils {
  staffs: any[];

  getDayView(args: any) {
    const view = super.getDayView(args);

    this.staffs = args.events[0].meta.staffs;
    // calculated base on number of displayed staffs
    EVENT_WIDTH = (Math.round(document.querySelector('.main-container').clientWidth - HEADER_MARGIN_LEFT) / this.staffs.length);

    view.events = view.events.map(dayViewEvent => {
      const index = this.staffs.indexOf(dayViewEvent.event.meta.user);
      const mapped = { index: index, ...dayViewEvent };
      mapped.left = index * EVENT_WIDTH; // change the column of the event
      mapped.width = EVENT_WIDTH;
      return mapped;
    }).filter(e => e.index !== -1);
    view.width = this.staffs.length * EVENT_WIDTH;
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
  view: DayView;

  @Output() userChanged = new EventEmitter();
  @Input() staffs;

  ngOnInit() {
    this.eventWidth = EVENT_WIDTH;
  }

  isNow(date): boolean {
		const diff = Math.abs(new Date().getTime() - new Date(date).getTime());
		return diff < 300000;
	}

  eventDragged(dayEvent: DayViewEvent, xPixels: number, yPixels: number): void {
    // super.dragEnded(dayEvent, { y: yPixels, x: 0 } as any); // original behaviour

    if (yPixels !== 0) {
      super.dragEnded(dayEvent, { y: yPixels, x: 0 } as any); // original behaviour
    }
    if (xPixels !== 0) {
      const columnsMoved = xPixels / EVENT_WIDTH;
      const currentColumnIndex = this.staffs.findIndex(
        user => user.id === dayEvent.event.meta.user.id
      );
      const newIndex = currentColumnIndex + columnsMoved;
      const newUser = this.staffs[newIndex];
      if (newUser) {
        this.userChanged.emit({ event: dayEvent.event, newUser });
      }
    }
  }

  viewWeekScheduleOf(staffId) {
    console.log(staffId);
  }
}
