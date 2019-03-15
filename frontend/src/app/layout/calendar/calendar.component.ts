import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarEventTimesChangedEvent, CalendarEventTitleFormatter, CalendarView, DateAdapter } from 'angular-calendar';
import { addHours } from 'date-fns';
import { Subject } from 'rxjs';
import { StaffService } from 'src/app/layout/staff/staff.service';
import { CustomEventTitleFormatter } from './utils/custom-event-title-formatter.provider';
import { colors } from './utils/colors';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
declare var Date: any;

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
	staffFilter: number | string;
	
	viewDate: Date = new Date();
	dayStartHour = "8";
	dayEndHour = "24";
	refresh: Subject<any> = new Subject();
	allEvents: CalendarEvent[];
	events: CalendarEvent[];

	currentStaffList: any[];
	allStaff: any[];
	isToday = true;
	staffList$ = this.staffService.getList();

	constructor(
		private staffService: StaffService,
		private route: Router,
		private dateAdapter: DateAdapter
	) {
		this.staffFilter = 'all';
		this.currentStaffList = [];
		this.events = [this.getHiddenEvent(new Date())];
	}

	ngOnInit() {
		this.getListStaff();
	}

	getCalendarSearch() {
		const cal: any = JSON.parse(localStorage.getItem('calendarSearch'));
		if (cal) {
			this.staffFilter = cal.staffFilter;
			this.view = cal.viewType;
		}
	}

	setCalendarSearch() {
		const data = {
			staffFilter: this.staffFilter,
			viewType: this.view
		};
		localStorage.setItem('calendarSearch', JSON.stringify(data));
	}

	// to pass list staffs for day-view
	getHiddenEvent(date) {
		return {
			start: this.dateAdapter.startOfDay(date),
			title: '',
			cssClass: 'd-none',
			meta: {
				staffs: this.allStaff,
			}
		};
	}

	getListStaff() {
		this.staffList$.subscribe((data: any) => {
				this.allStaff = data.user
					.map(s =>
						({
							id: s.id,
							name: s.firstName + s.lastName,
							sortOrder: s.sort_order,
							color: s.id % 2 == 0 ? colors.yellow : colors.blue,
						}))
					.sort((a, b) => a.sortOrder - b.sortOrder);
				// TODO: move to oninit later
				this.getCalendarSearch();
				this.getListAppointments();
				this.changeStaff(this.staffFilter);
			}, err => {});
	}

	trackByStaffId(index, staff) {
		return staff.id;
	}

	viewDateChange(date) {
		this.isToday = this.dateAdapter.startOfDay(date).getTime() === this.dateAdapter.startOfDay(new Date()).getTime();
		const hiddenEvent = this.events.filter(e => e.cssClass === 'd-none' && e.start == this.dateAdapter.startOfDay(date))[0];
		if (!hiddenEvent) {
			this.events.push(this.getHiddenEvent(date));
		}
	}

	getListAppointments(): void {
		this.allEvents = [this.getHiddenEvent(new Date()),
			{
				id: 1,
				meta: {
					user: this.allStaff[1]
				  },
				title: 'test event',
				color: this.allStaff[1].color,
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
					user: this.allStaff[0]
				  },
				title: 'test event 2',
				color: this.allStaff[0].color,
				start: addHours(new Date(), 1),
				end: addHours(new Date(), 2),
				resizable: {
					beforeStart: true,
					afterEnd: true
				},
				draggable: true,
			},
			{
				id: 3,
				meta: {
					user: this.allStaff[1]
				  },
				title: 'test event 3',
				color: this.allStaff[1].color,
				start: addHours(new Date(), 2),
				end: addHours(new Date(), 3),
				resizable: {
					beforeStart: true,
					afterEnd: true
				},
				draggable: true,
			},
		];
		this.events = this.allEvents;
	}

	switchToWeekView() {
		this.view = CalendarView.Week;
		if (this.staffFilter === 'all' || this.staffFilter === 'working') {
			this.staffFilter = this.allStaff[0].id;
		}
		this.setCalendarSearch();
	}

	switchToDayView(): void {
		this.view = CalendarView.Day;
		this.events[0].meta.staffs = this.currentStaffList;
		this.events = [...this.allEvents];
	}

	changeStaff(value?) {
		this.setCalendarSearch();

		if (value === 'all') { // show all staff
		  this.currentStaffList = this.allStaff;
		  this.switchToDayView();
		  return;
		}

		if (value === 'working') {
			this.currentStaffList = this.getWorkingStaffs();
			this.switchToDayView();
			return;
		}

		value = parseInt(value, 10);
		this.currentStaffList = this.allStaff.filter(s => s.id === value);
		this.events[0].meta.staffs = this.currentStaffList;
		this.events = [this.events[0], ...this.allEvents.filter(e => e.meta.user && e.meta.user.id === value)];
		
	}

	getWorkingStaffs() {
		//TODO: test
		return this.allStaff.filter(s => s.id % 2 === 0);
	}

	eventTimesChanged({
		event,
		newStart,
		newEnd
	}: CalendarEventTimesChangedEvent): void {
		event.start = newStart;
		event.end = newEnd;
		// this.refresh.next();
		this.events = [...this.events];
		console.log(event);
	}

	userChanged({ event, newUser }) {
		event.color = newUser.color;
		event.meta.user = newUser;
		// this.refresh.next();
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
		this.route.navigate(['appointment/add'], { queryParams: { 
			start_date: evt.date.toString('yyyy-MM-dd'),
			start_time: evt.date.toString('HHmm'),
			staff_id: this.staffFilter,
		 }});
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
			console.log(evt.date);
			this.route.navigate(['appointment/add'], { queryParams: { 
				start_date: evt.date.toString('yyyy-MM-dd'),
				start_time: evt.date.toString('HHmm'),
				staff_id: found.id,
			 }});
		}
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