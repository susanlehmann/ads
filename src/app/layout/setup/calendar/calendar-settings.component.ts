import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'setup-calendar-settings',
	templateUrl: './calendar-settings.component.html',
	styleUrls: ['./calendar-settings.component.scss']
})

export class CalendarSettingsComponent implements OnInit {

	form: any = {};

	constructor(){}

	ngOnInit() {
		this.form.appointment_color = "status";
		this.form.time_slot = "10";
		this.form.default_view = "week";
		this.form.week_start_day = "monday";
	}
}