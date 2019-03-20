import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgbModal, NgbModalRef, NgbDateStruct, NgbDateParserFormatter, NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { LocationsService } from './../../../shared/services/location.service';
declare var Date: any;


@Component({
	selector: 'app-invoices',
	templateUrl: './invoices.component.html',
	styleUrls: ['./invoices.component.scss'],
	providers: [
    	{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },
  	]
})

export class InvoicesComponent implements OnInit {

	currentWeekModel: any;
	listLocation: any;
	listDateTime: any[] = [];
	form: any = {};
	location: string;
	staff: string;
	dateSelected: string;

	constructor(
		private locationService: LocationsService,
		private datePipe: DatePipe
	){}

	ngOnInit() {
		this.loadLocation();
		this.loadDateTime();
		this.form.location = "";
		this.currentWeekModel = Date.today().toString('dddd, dd MMM yyyy');
		if(this.form.location == "") {
			this.location = "All Locations";
		}
		this.form.dateTime = "today";
		if(this.form.dateTime == "today") {
			this.dateSelected = Date.today().toString('dddd, dd MMM yyyy');
		}
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

	loadDateTime() {
		this.listDateTime.push({name : 'Today', value: 'today'});
		this.listDateTime.push({name : 'Yesterday', value: 'yesterday'});
		this.listDateTime.push({name : 'Last 7 days', value: 'last_7'});
		this.listDateTime.push({name : 'This month', value: 'month'});
		this.listDateTime.push({name : 'Last 30 days', value: 'last_30'});
		this.listDateTime.push({name : 'Tomorrow', value: 'tomorrow'});
		this.listDateTime.push({name : 'Next 7 days', value: 'next_7'});
		this.listDateTime.push({name : 'Next month', value: 'next_month'});
		this.listDateTime.push({name : 'Next 30 days', value: 'next_30'});
		this.listDateTime.push({name : 'All time', value: 'all'});
		this.listDateTime.push({name : 'Custom range', value: 'custom'});

	}

	selectedDate() {
		if(this.form.dateTime == "today") {
			this.dateSelected = Date.today().toString('dddd, dd MMM yyyy');
		} else if(this.form.dateTime == "yesterday") {
			this.dateSelected = Date.today().addDays(-1).toString('dddd, dd MMM yyyy');
		} else if(this.form.dateTime == "last_7") {
			this.dateSelected = Date.today().addDays(-7).toString('dddd, dd MMM yyyy');
		} else if(this.form.dateTime == "month") {
			this.dateSelected = Date.today().addDays(-7).toString('dddd, dd MMM yyyy');
		} else if(this.form.dateTime == "last_30") {
			this.dateSelected = Date.today().addDays(-30).toString('dddd, dd MMM yyyy');
		} else if(this.form.dateTime == "tomorrow") {
			this.dateSelected = Date.today().addDays(1).toString('dddd, dd MMM yyyy');
		} else if(this.form.dateTime == "next_7") {
			this.dateSelected = Date.today().addDays(7).toString('dddd, dd MMM yyyy');
		} else if(this.form.dateTime == "next_month") {
			this.dateSelected = Date.today().addDays(30).toString('dddd, dd MMM yyyy');
		} else if(this.form.dateTime == "next_30") {
			this.dateSelected = Date.today().addDays(30).toString('dddd, dd MMM yyyy');
		}
	}

	exportEvent(event) {
		console.log(event.srcElement.value);
	}

	filterConf() {
		console.log(this.form);
	}
	

}