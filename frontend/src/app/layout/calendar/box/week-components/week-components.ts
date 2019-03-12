import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarEventTimesChangedEvent, CalendarEventTitleFormatter, CalendarView } from 'angular-calendar';
import { addHours } from 'date-fns';
import { Subject } from 'rxjs';
import { CustomEventTitleFormatter } from './custom-event-title-formatter.provider';

@Component({
	selector: 'week-calendar',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [{
		provide: CalendarEventTitleFormatter,
		useClass: CustomEventTitleFormatter
	}],
	templateUrl: './week-components.html',
	styleUrls: ['./week-components.scss']
})

export class WeekComponents implements OnInit {
	view: CalendarView = CalendarView.Week;
	CalendarView = CalendarView;
	
	viewDate: Date = new Date();
	dayStartHour = "8";
	dayEndHour = "24";
	refresh: Subject<any> = new Subject();
	events: CalendarEvent[] = [
		{
			title: 'test event',
			//   color: colors.yellow,
			start: new Date(),
			end: addHours(new Date(), 1), // an end date is always required for resizable events to work
			resizable: {
				beforeStart: true, // this allows you to configure the sides the event is resizable from
				afterEnd: true
			},
			draggable: true,
		},
		{
			title: 'test event 2',
			//   color: colors.blue,
			start: new Date(),
			draggable: true,
			end: addHours(new Date(), 1)
		}
	];

	constructor(
	) {
	}

	ngOnInit() {
		this.getListAppointments();
	}

	getListAppointments(): void {
	}

	eventTimesChanged({
		event,
		newStart,
		newEnd
	}: CalendarEventTimesChangedEvent): void {
		event.start = newStart;
		event.end = newEnd;
		this.refresh.next();
		console.log(event);
	}

	dayHeaderClicked(evt): void {
		console.log(evt);
	}

	eventClicked(evt): void {
		console.log(evt);
	}

	hourSegmentClicked(evt): void {
		console.log(evt);
		const diff = new Date().getTime() - new Date(evt).getTime();
	}

	isNow(date): boolean {
		const diff = Math.abs(new Date().getTime() - new Date(date).getTime());
		return diff < 300000;
	}

}