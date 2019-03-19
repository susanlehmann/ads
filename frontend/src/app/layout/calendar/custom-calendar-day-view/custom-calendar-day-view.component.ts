import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { CalendarWeekViewComponent, CalendarEvent, CalendarUtils, DateAdapter, getWeekViewPeriod } from 'angular-calendar';
import { GetWeekViewArgs } from 'calendar-utils';

@Component({
  selector: 'app-custom-calendar-day-view',
  templateUrl: './custom-calendar-day-view.component.html',
  styleUrls: ['./custom-calendar-day-view.component.scss']
})
export class CustomCalendarDayViewComponent extends CalendarWeekViewComponent implements OnInit {
  @Input() staffs;

  // constructor(cdr, private utilss, locale, private dateAdapters) {
  //   super(cdr, utilss, locale, dateAdapters);
  // }
  arrDays: any[] = ['1'];

   ngOnInit() {
  }

  test() {
    console.table(this.view);
  }

  // private getWeekViews(events: CalendarEvent[]) {
  //   return this.utilss.getWeekView({
  //     events,
  //     viewDate: this.viewDate,
  //     weekStartsOn: this.weekStartsOn,
  //     excluded: this.excludeDays,
  //     precision: this.precision,
  //     absolutePositionedEvents: true,
  //     hourSegments: this.hourSegments,
  //     dayStart: {
  //       hour: this.dayStartHour,
  //       minute: this.dayStartMinute
  //     },
  //     dayEnd: {
  //       hour: this.dayEndHour,
  //       minute: this.dayEndMinute
  //     },
  //     segmentHeight: this.hourSegmentHeight,
  //     weekendDays: this.weekendDays,
  //     ...getWeekViewPeriod(
  //       this.dateAdapters,
  //       this.viewDate,
  //       this.weekStartsOn,
  //       this.excludeDays,
  //       this.daysInWeek
  //     )
  //   });
  // }


  //  getWeekViewss({
  //   events = [],
  //   viewDate,
  //   weekStartsOn,
  //   excluded = [],
  //   precision = 'days',
  //   absolutePositionedEvents = false
  // }: GetWeekViewArgs): WeekViewEventRow[] {
  
  //   if (!events) {
  //     events = [];
  //   }
  
  //   const startOfViewWeek: Date = startOfWeek(viewDate, {weekStartsOn});
  //   const endOfViewWeek: Date = endOfWeek(viewDate, {weekStartsOn});
  //   const maxRange: number = DAYS_IN_WEEK - excluded.length;
  
  //   const eventsMapped: WeekViewEvent[] = getEventsInPeriod({events, periodStart: startOfViewWeek, periodEnd: endOfViewWeek}).map(event => {
  //     let offset: number = getWeekViewEventOffset({event, startOfWeek: startOfViewWeek, excluded, precision});
  //     let span: number = getWeekViewEventSpan({event, offset, startOfWeekDate: startOfViewWeek, excluded, precision});
  //     return {event, offset, span};
  //   }).filter(e => e.offset < maxRange).filter(e => e.span > 0).map(entry => ({
  //       event: entry.event,
  //       offset: entry.offset,
  //       span: entry.span,
  //       startsBeforeWeek: entry.event.start < startOfViewWeek,
  //       endsAfterWeek: (entry.event.end || entry.event.start) > endOfViewWeek
  //   })).sort((itemA, itemB): number => {
  //     const startSecondsDiff: number = differenceInSeconds(itemA.event.start, itemB.event.start);
  //     if (startSecondsDiff === 0) {
  //       return differenceInSeconds(itemB.event.end || itemB.event.start, itemA.event.end || itemA.event.start);
  //     }
  //     return startSecondsDiff;
  //   });
  
  //   const eventRows: WeekViewEventRow[] = [];
  //   const allocatedEvents: WeekViewEvent[] = [];
  
  //   eventsMapped.forEach((event: WeekViewEvent, index: number) => {
  //     if (allocatedEvents.indexOf(event) === -1) {
  //       allocatedEvents.push(event);
  //       let rowSpan: number = event.span + event.offset;
  //       const otherRowEvents: WeekViewEvent[] = eventsMapped.slice(index + 1).filter(nextEvent => {
  //         if (
  //           nextEvent.offset >= rowSpan &&
  //           rowSpan + nextEvent.span <= DAYS_IN_WEEK &&
  //           allocatedEvents.indexOf(nextEvent) === -1
  //         ) {
  //           const nextEventOffset: number = nextEvent.offset - rowSpan;
  //           if (!absolutePositionedEvents) {
  //             nextEvent.offset = nextEventOffset;
  //           }
  //           rowSpan += nextEvent.span + nextEventOffset;
  //           allocatedEvents.push(nextEvent);
  //           return true;
  //         }
  //       });
  //       eventRows.push({
  //         row: [
  //           event,
  //           ...otherRowEvents
  //         ]
  //       });
  //     }
  //   });
  
  //   return eventRows;
  // }

}
