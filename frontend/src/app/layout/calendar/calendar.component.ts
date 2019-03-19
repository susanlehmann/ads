import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarEventTimesChangedEvent, CalendarEventTitleFormatter, CalendarView, DateAdapter } from 'angular-calendar';
import { addHours, addMinutes } from 'date-fns';
import { Subject, forkJoin } from 'rxjs';
import { StaffService } from 'src/app/layout/staff/staff.service';
import { CustomEventTitleFormatter } from './utils/custom-event-title-formatter.provider';
import { colors } from './utils/colors';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AppointmentService } from 'src/app/shared/services/appointment.service';
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
	loadData$;

	constructor(
		private staffService: StaffService,
		private appointmentService: AppointmentService,
		private route: Router,
		private dateAdapter: DateAdapter
	) {
		this.loadData$ = forkJoin([this.staffService.getList(), this.appointmentService.getAllAppointments()]);
		this.staffFilter = 'all';
		this.currentStaffList = [];
		this.events = [this.getHiddenEvent(new Date())];
		this.getCalendarSearch();
	}

	ngOnInit() {
		this.loadData$.subscribe(rs => {
			this.allStaff = rs[0].user.map(this.mapStaff).sort((a, b) => a.sortOrder - b.sortOrder);

			const evts = rs[1].appoint.map(a => {
				const info = JSON.parse(a.info_appoint)[0];
				const staff = this.getStaffById(info.staff);
				const converted = this.getStartAndEnd(a.date_appoint, info.startTime.toString(), info.duration);
				return {
					id: a.id,
					meta: {
						user: staff
					},
					title: 'Walk-In',
					color: staff.color,
					start: converted.str,
					end: converted.end,
					resizable: {
						beforeStart: true,
						afterEnd: true
					},
					draggable: true,
				};
			});
			this.allEvents = [this.getHiddenEvent(new Date()), ...evts];
			this.events = this.allEvents;

			this.changeStaff(this.staffFilter);
		});	
	}

	getStartAndEnd(date: string, start: string, duration: number) {
		const d = new Date(date);
		const h = start.length == 4 ? start.slice(0, 2) : start.slice(0, 1);
		const m = start.slice(0, -2);
		d.setHours(h, m);
		return {
			str: d,
			end: addMinutes(d, duration)
		}
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

	mapStaff(s) {
		return {
			id: s.id,
			name: s.firstName + s.lastName,
			sortOrder: s.sort_order,
			color: s.id % 2 == 0 ? colors.yellow : colors.blue,
		};
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

	getStaffById(id) {
		const staff = this.allStaff.filter(s => s.id == id)[0];
		if (staff) {
			return staff;
		}
		throw Error('Staff not found');
	}

	mapAppointment(a) {
		const info = JSON.parse(a.info_appoint);
		const staff = this.getStaffById(info.staff);
		return {
			id: a.id,
			meta: {
				user: staff
			},
			title: a.note_appoint,
			color: staff.color,
			start: new Date(a.created_at), // TODO test
			end: addHours(new Date(a.created_at), 2),
			resizable: {
				beforeStart: true,
				afterEnd: true
			},
			draggable: true,
		};
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

	staffHeaderClicked(evt): void {
		this.view = CalendarView.Week;
		this.staffFilter = evt;
		this.changeStaff(evt);
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