import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarEventTimesChangedEvent, CalendarEventTitleFormatter, CalendarView } from 'angular-calendar';
import { addHours } from 'date-fns';
import { Subject } from 'rxjs';
import { CustomEventTitleFormatter } from './custom-event-title-formatter.provider';
import { colors } from './colors';
import { StaffService } from 'src/app/layout/staff/staff.service';

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
	hourSegments = 6;
	weekStartsOn = 1;
	
	viewDate: Date = new Date();
	dayStartHour = "8";
	dayEndHour = "24";
	refresh: Subject<any> = new Subject();
	events: CalendarEvent[];

	staffs: any[];

	constructor(
		private staffService: StaffService,
	) {
		this.staffs = [];
	}

	ngOnInit() {
		this.getListStaff();
	}

	getListStaff() {
		this.staffService.getList()
			.subscribe((data: any) => {
				this.staffs = data.user
					.map(s => {
						return {
							id: s.id,
							name: s.firstName + s.lastName,
							sortOrder: s.sort_order,
							color: s.id % 2 == 0 ? colors.yellow : colors.blue,
						}
					})
					.sort((a, b) => a.sortOrder - b.sortOrder);
				// TODO: move to oninit later
				this.getListAppointments();
			}, err => {});
	}

	getListAppointments(): void {
		this.events = [
			{
				id: Math.random.toString(),
				meta: {
					user: this.staffs[1]
				  },
				title: 'test event',
				color: this.staffs[1].color,
				start: new Date(),
				end: addHours(new Date(), 1), // an end date is always required for resizable events to work
				resizable: {
					beforeStart: true, // this allows you to configure the sides the event is resizable from
					afterEnd: true
				},
				draggable: true,
			},
			{
				id: Math.random.toString(),
				meta: {
					user: this.staffs[0]
				  },
				title: 'test event 2',
				color: this.staffs[0].color,
				start: addHours(new Date(), 1),
				draggable: true,
				end: addHours(new Date(), 2)
			},
			{
				id: Math.random.toString(),
				meta: {
					user: this.staffs[1]
				  },
				title: 'test event 3',
				color: this.staffs[1].color,
				start: addHours(new Date(), 2),
				draggable: true,
				end: addHours(new Date(), 3)
			},
		];
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

	userChanged({ event, newUser }) {
		event.color = newUser.color;
		event.meta.user = newUser;
		this.events = [...this.events];
	  }

	dayHeaderClicked(evt): void {
		console.log(evt);
		this.view = CalendarView.Day;
		this.viewDate = evt.day.date;
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

	dayHourSegmentClicked(evt): void {
		this.setStaffCoordinate();

		let found = this.staffs.filter(s => {
			return evt.event.screenX >= s.xStart && evt.event.screenX <= s.xEnd;
		})[0];

		if (found) {
			console.log(found.name);
		}
		console.log(evt.date);
	}

	setStaffCoordinate(): void {
		const firstStaffCoordinate = document.querySelector('.day-view-column-header').getBoundingClientRect() as DOMRectReadOnly;
		let xStart = firstStaffCoordinate.x;
		const width = firstStaffCoordinate.width;

		this.staffs.forEach(s => {
			s.xStart = xStart;
			s.xEnd = xStart += width;
		});
	}

}