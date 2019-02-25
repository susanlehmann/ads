import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { routerTransition } from '../../router.animations';
import * as $ from 'jquery';
import { EventSesrvice } from './event.service';
import {NgbModal, NgbModalRef, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { WeekComponents } from './box/week-components/week-components';
import { DayComponents } from './box/day-components/day-components';
declare var Date: any;

@Component({
	selector: 'app-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.scss'],
	animations: [routerTransition()]
})
export class CalendarComponent implements OnInit {

	closeResult: any;
	modalOptions: NgbModalOptions;
	switch: string = 'day';
	componentData: any = null;
	calendar: any;

	constructor(protected eventService: EventSesrvice,
	private modal: NgbModal,
	private datePipe: DatePipe) {}


	ngOnInit() {
		this.loadSwith();
	}

	private loadSwith(){
		if(this.switch == 'week') {
			this.componentData = {
				component: WeekComponents,
				inputs: {}
			};
		} else {
			this.componentData = {
				component: DayComponents,
				inputs: {}
			};
			this.calendar = Date.today().toString('dddd, MMM dd yyyy');
		}
	}

	openModal(content: NgbModalRef) {
		this.modal.open(content, this.modalOptions).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		}, (reason) => {
			this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
		});
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

	switchCalendar(value) {
		this.switch = value;
		if(value == 'week') {
			this.componentData = {
				component: WeekComponents,
				inputs: {}
			};
		} else {
			this.componentData = {
				component: DayComponents,
				inputs: {}
			};
		}
	}

	nextDay() {
		this.calendar = Date.today().add(1).day().toString('dddd, MMM dd yyyy');
	}
	prevDay() {
		this.calendar = Date.today().add(-1).day().toString('dddd, MMM dd yyyy');
	}
}
