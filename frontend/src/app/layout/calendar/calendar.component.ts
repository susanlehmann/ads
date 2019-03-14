import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarEventTimesChangedEvent, CalendarEventTitleFormatter, CalendarView } from 'angular-calendar';
import { addHours } from 'date-fns';
import { Subject } from 'rxjs';
import { StaffService } from 'src/app/layout/staff/staff.service';
import { CustomEventTitleFormatter } from './utils/custom-event-title-formatter.provider';
import { colors } from './utils/colors';

@Component({
	selector: 'app-calendar',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [{
		provide: CalendarEventTitleFormatter,
		useClass: CustomEventTitleFormatter
	}],
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {
	view: CalendarView = CalendarView.Week;
	CalendarView = CalendarView;
	hourSegments = 6;
	weekStartsOn = 1;
	selectedStaffId;
	
	viewDate: Date = new Date();
	dayStartHour = "8";
	dayEndHour = "24";
	refresh: Subject<any> = new Subject();
	events: CalendarEvent[];

	currentStaffList: any[];
	allStaff: any[];

	constructor(
		private staffService: StaffService,
	) {
	}

	ngOnInit() {
		this.getListStaff();
	}

	getListStaff() {
		this.staffService.getList()
			.subscribe((data: any) => {
				this.allStaff = data.user
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
				this.changeStaff(this.selectedStaffId);
				this.getListAppointments();
			}, err => {});
	}

	getListAppointments(): void {
		this.events = [
			{
				id: 1,
				meta: {
					user: this.currentStaffList[1]
				  },
				title: 'test event',
				color: this.currentStaffList[1].color,
				start: new Date(),
				end: addHours(new Date(), 1), // an end date is always required for resizable events to work
				resizable: {
					beforeStart: true, // this allows you to configure the sides the event is resizable from
					afterEnd: true
				},
				draggable: true,
			},
			{
				id: 2,
				meta: {
					user: this.currentStaffList[0]
				  },
				title: 'test event 2',
				color: this.currentStaffList[0].color,
				start: addHours(new Date(), 1),
				draggable: true,
				end: addHours(new Date(), 2)
			},
			{
				id: 3,
				meta: {
					user: this.currentStaffList[1]
				  },
				title: 'test event 3',
				color: this.currentStaffList[1].color,
				start: addHours(new Date(), 2),
				draggable: true,
				end: addHours(new Date(), 3)
			},
		];
	}

	changeStaff(staffId) {
		if (!staffId) { // show all staff
		  this.currentStaffList = this.allStaff;
		} else {
		  staffId = parseInt(staffId, 10);
		  this.currentStaffList = this.allStaff.filter(s => s.staffId === staffId);
		}
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

		let found = this.currentStaffList.filter(s => {
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

		this.currentStaffList.forEach(s => {
			s.xStart = xStart;
			s.xEnd = xStart += width;
		});
	}

}