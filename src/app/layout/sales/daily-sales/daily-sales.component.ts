import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgbModal, NgbModalRef, NgbDateStruct, NgbDateParserFormatter, NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { LocationsService } from './../../../shared/services/location.service';
declare var Date: any;

@Component({
	selector: 'app-daily-sales',
	templateUrl: './daily-sales.component.html',
	styleUrls: ['./daily-sales.component.scss'],
	providers: [
    	{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },
  	]
})

export class DailySalesComponent implements OnInit {

	currentWeekModel: any;
	listLocation: any;
	form: any = {};
	location: string;

	constructor(
		private locationService: LocationsService,
		private datePipe: DatePipe
	){}

	ngOnInit(){
		this.loadLocation();
		this.form.location = "";
		if(this.form.location == "") {
			this.location = "All Locations";
		}
		this.currentWeekModel = Date.today().toString('dddd, dd MMM yyyy');
	}


	loadLocation() {
		var user = JSON.parse(localStorage.getItem('user'));
		this.locationService.listLocation(user.id).subscribe(
			success => { 
				this.listLocation = success;
			},
			error => {
				console.log(error);
			}
		);
	}

	changeDate(event) {
		this.currentWeekModel = this.datePipe.transform(event, 'EEEE, dd MMM yyyy');
	}

	getToday() {
		this.currentWeekModel = Date.today().toString('dddd, dd MMM yyyy');
	}

	prevDate() {
		this.currentWeekModel = new Date(this.currentWeekModel).addDays(-1).toString('dddd, dd MMM yyyy');
	}

	nextDate() {
		this.currentWeekModel = new Date(this.currentWeekModel).addDays(1).toString('dddd, dd MMM yyyy');
	}

	exportEvent(event) {
		console.log(event.srcElement.value);
	}

	filterConf() {
		console.log(this.form);
	}
}