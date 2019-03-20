import { LOCALE_ID, Inject } from '@angular/core';
import { CalendarEventTitleFormatter, CalendarEvent } from 'angular-calendar';
import { DatePipe } from '@angular/common';
declare var Date: any;
export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
  constructor(@Inject(LOCALE_ID) private locale: string) {
    super();
    this.locale = "en-GB";
  }

  getConvertedTime(start) {
    const d = new DatePipe(this.locale).transform(start, 'h:mm');
    return d;
  }

  // you can override any of the methods defined in the parent class

  month(event: CalendarEvent): string {
    return `${this.getConvertedTime(event.start)} <b>${event.title}</b>`;
  }

  week(event: CalendarEvent): string {
    return `${this.getConvertedTime(event.start)} <b>${event.title}</b>`;
  }

  day(event: CalendarEvent): string {
    return `${this.getConvertedTime(event.start)} <b>${event.title}</b>`;
  }

}