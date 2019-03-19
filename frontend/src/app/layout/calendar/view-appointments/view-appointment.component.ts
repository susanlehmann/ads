import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgbModal, NgbModalRef, NgbDateStruct, NgbDateParserFormatter, NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { StaffService } from './../../staff/staff.service';
import { ServicesService } from './../../../shared/services/serv.service';
import { UserService } from './../../../shared/services/user.service';
import { AppointmentService } from './../../../shared/services/appointment.service';
import { NotifierService } from 'angular-notifier';

import * as data from './../../../../assets/time.json';
declare let Date: any;

@Component({
	selector: 'view-appointment',
	templateUrl: './view-appointment.component.html',
    styleUrls: ['./view-appointment.component.scss'],
    providers: [
    	{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },
  	]
})

export class ViewAppointmentComponent implements OnInit
{
	form: any = {};
	searchClient: string;
	dateSelected: string;
	listStaff: any = {};
	listService: any = {};
	times: any = [];
	stepAppoinent: any;
	showAddClient: boolean = false;
	client: any = {};
	clients: any;
	dataClient: any;
	dynamicComponent: boolean = false;
	repeater: any;
	clientAddBox: any;
	currentWeekModel: any;

	constructor(
		private route: Router,
		private activatedRoute: ActivatedRoute,
		private datePipe: DatePipe,
		private staffService: StaffService,
		private servService: ServicesService,
		private userService: UserService,
		private modal: NgbModal,
		private appService: AppointmentService,
		private notify: NotifierService
	){
	}

	ngOnInit(){
		this.loadStaff();
		this.loadService();
		this.getUser();

		this.times = data;
		this.activatedRoute.queryParams.subscribe((params: Params) => {
			if(params.appointmentId == "undefined" || params.appointmentId == undefined){
				this.route.navigate(['calendar']);
			} else {
				this.loadAppointment(params.appointmentId);
			}
		});
		
	}

	loadAppointment(id: string): void {
		this.appService.getAppointmentById(id).subscribe(
			response => { 
				this.stepAppoinent = JSON.parse(response.appoint.info_appoint);
				this.dateSelected = this.datePipe.transform(response.appoint.date_appoint, 'EEEE, dd MMM yyyy');
				console.log(this.stepAppoinent);
			}
		);
	}

	onSubmit() :void {
		

	}

	selectedTime() {
		console.log(this.form.startTime);
	}

	changeDate(event) {
		this.dateSelected = this.datePipe.transform(event, 'EEEE, dd MMM yyyy');
	}


	loadStaff() {
		this.staffService.getList()
		.subscribe(
			(listusers:any) => {
	        	this.listStaff = listusers;
			}, 
			err => {
	    	}
	    );
	}

	loadService() {
		let userInfo = JSON.parse(localStorage.getItem('user'));
		let _form : any = {};
		_form.ownerId = userInfo.id;
		this.servService.listServiceIngroup(_form).subscribe(
			success => {
                this.listService = success;
			},
			error => {}
		);
	}

	getPriceOptions(value) {
		if(value.price_options !== null) {
			let options = JSON.parse(value.price_options);
			let str = options[0].duration_service+"m, $"+options[0].retail_price_service;
			return str;
		} else {
			let str = value.duration_service+"m, $"+value.retail_price_service;
			return str;
		}
	}

	convertTime(time) {
        var strTime = "";
        if(Math.floor(time/60) > 0) {
            strTime += Math.floor(time/60)+'h ';
        }
        if(Math.ceil(time%60) > 0) {
            strTime += Math.ceil(time%60)+'min';
        }
        return strTime;
    }

    getNameService(id: number) {
    	const service = this.arrayFilter(this.listService.service,id);
    	console.log(service);
    	if(typeof(service.name_service) == "undefined" || typeof(service.name_service) == undefined){
    		return '';
		} else {
			return service.name_service;
		}
	}

	getNameStaff(id: number) {
		const staff = this.arrayFilter(this.listStaff.user,id);
		if(staff.firstName == "undefined" || staff.lastName == "undefined" || staff.firstName == undefined || staff.lastName == undefined){
    		return '';
		} else {
			return staff.firstName + ' ' + staff.lastName;
		}
    	// return staff.name_service;
	}

	arrayFilter(arr: any[] = [], id: number) {
		const result = arr.filter(s => s.id == id);
		return result[0];
	}

	getUser() {
		this.client.getuser = JSON.parse(localStorage.getItem('user'));
		this.userService.getListUser(this.client).subscribe(
			success => {
				this.clients = success;
			},
			error => {
				console.log(error);
			}
		);
	}
	
	goBack() {
		this.route.navigateByUrl('calendar');
	}

	openModal(content) {
		this.modal.open(content, {size: 'sm', windowClass: 'repeat-modal', backdropClass: 'none-backdrop'});
	}
}