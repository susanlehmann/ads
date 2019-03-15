import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgbModal, NgbModalRef, NgbDateStruct, NgbDateParserFormatter, NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { StaffService } from './../../staff/staff.service';
import { ServicesService } from './../../../shared/services/serv.service';
import { UserService } from './../../../shared/services/user.service';
import { AppClientComponent  } from './client/client.component';
import { AppointmentService } from './../../../shared/services/appointment.service';
import { NotifierService } from 'angular-notifier';

import * as data from './../../../../assets/time.json';
declare let Date: any;

@Component({
	selector: 'add-appointment',
	templateUrl: './add-appointment.component.html',
    styleUrls: ['./add-appointment.component.scss'],
    providers: [
    	{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },
  	]
})

export class AddAppointmentComponent implements OnInit
{
	@ViewChild('duration') duration: ElementRef;
	@ViewChild('panel_content') panel_content: ElementRef;
	@ViewChild('modal_body') modal_body: ElementRef;
	form: any = {};
	searchClient: string;
	dateSelected: string;
	listStaff: any = {};
	listService: any = {};
	times: any = [];
	stepAppoinent: any[] = [];
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
			if(params.start_date == "undefined" || params.start_date == undefined){
				this.dateSelected = Date.today().toString('dddd, dd MMM yyyy');
				this.stepAppoinent = [
					{
						startTime: 800,
						duration: "",
						service: "",
						staff: ""
					}
				];
			} else {
				this.dateSelected = this.datePipe.transform(new Date(params.start_date), 'EEEE, dd MMM yyyy');
				this.stepAppoinent = [
					{
						startTime: Number(params.start_time),
						duration: "",
						service: "",
						staff: params.staff_id
					}
				];
			}
		});
		
	}

	onSubmit() :void {
		let userInfo = JSON.parse(localStorage.getItem('user'));
		if(userInfo.level == 2) {
			this.form.id_client = userInfo.id;
		} else if (userInfo.level == 3) {
			this.form.id_client = userInfo.parent;
		}

		this.form.ownerId = userInfo.id;
		this.form.id_customer = this.clientAddBox.id;
		this.form.info_appoint = JSON.stringify(this.stepAppoinent);
		if(this.form.datePicker == "undefined" || this.form.datePicker == undefined ){
			this.form.date_appoint = this.datePipe.transform(this.dateSelected, 'yyyy/MM/dd');
		} else {
			this.form.date_appoint = this.datePipe.transform(this.form.datePicker, 'yyyy/MM/dd');
		}
		console.log(this.form);
		this.appService.createAppointment(this.form).subscribe(
			success => {
				if(success.success){
					this.route.navigateByUrl('calendar');
					this.notify.notify('success', 'Appointment Added');
				}
			},
			error => {}
		)

	}

	selectedTime() {
		console.log(this.form.startTime);
	}

	changeDate(event) {
		this.dateSelected = this.datePipe.transform(event, 'EEEE, dd MMM yyyy');
	}

	selectStaff(index){
		if(index == 0) {
			let nStaff = this.stepAppoinent[index].staff;
			this.stepAppoinent.push({startTime: 800, duration: "", service: "", staff: nStaff});
			this.panel_content.nativeElement.classList.add('dotter');
		} else {
			this.stepAppoinent[index].staff = this.stepAppoinent[0].staff;
		}
	}

	loadStaff() {
		this.staffService.getList()
		.subscribe(
			(listusers:any) => {
	        	this.listStaff = listusers;
	        	this.duration.nativeElement.setAttribute('disabled', true);
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
            strTime += Math.floor(time/60);
        }
        if(Math.ceil(time%60) > 0) {
            strTime += Math.ceil(time%60);
        }
        return strTime;
    }

	selectedService(index) {
		let filters = this.listService.service.filter(x => x.id == this.stepAppoinent[index].service);
		if(filters[0].price_options !== null){
			let data = JSON.parse(filters[0].price_options);
			let nDuration = data[0].duration_service;
			let xDuration = this.convertTime(nDuration);
			if(index == 0 && this.stepAppoinent[0].staff == "") {
				this.stepAppoinent[0].duration = nDuration;
			} else {
				this.stepAppoinent[index].startTime = 800;				
				this.stepAppoinent[index].duration = nDuration;
				this.stepAppoinent[index].service = "";
				this.stepAppoinent[index].staff = this.stepAppoinent[index].staff;
				if(index == (this.stepAppoinent.length - 1)){
					this.stepAppoinent.push({
						startTime: 800, 
						duration: "", 
						service: "", 
						staff: this.stepAppoinent[index].staff
					});
				}
			}
			this.duration.nativeElement.removeAttribute('disabled');
		} else {
			let nDuration = filters[0].duration_service;
			let xDuration = this.convertTime(nDuration);
			if(index == 0 && this.stepAppoinent[0].staff == "") {
				this.stepAppoinent[0].duration = nDuration;
			} else {
				this.stepAppoinent[index].startTime = 800;
				this.stepAppoinent[index].duration = nDuration;
				this.stepAppoinent[index].service = "";
				this.stepAppoinent[index].staff = this.stepAppoinent[index].staff;
				if(index == (this.stepAppoinent.length - 1)){
					this.stepAppoinent.push({
						startTime: 800, 
						duration: "", 
						service: "", 
						staff: this.stepAppoinent[index].staff
					});
				}
			}
			this.duration.nativeElement.removeAttribute('disabled');
		}
	}

	removeStep(o): void {
		this.stepAppoinent = this.stepAppoinent.filter(v => v!=o);
		if(this.stepAppoinent.length == 1){
			this.panel_content.nativeElement.classList.remove('dotter');
		}
	}
	
	focusSearchClient() {
		this.showAddClient = true;
		this.modal_body.nativeElement.classList.add('onHover');
	}

	blurSearchClient() {
		// this.showAddClient = false;
		// this.modal_body.nativeElement.classList.remove('onHover');
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
	
	outPutData(event){
		if(event){
			this.dynamicComponent = true;
			this.dataClient = event;
		}
	}

	outRemoveApp(event) {
		if(event) {
			this.dynamicComponent = false;
			this.dataClient = {};
		}
	}

	bindClient(event) {
		this.clientAddBox = event;
	}

	goBack() {
		this.route.navigateByUrl('calendar');
	}

	openModal(content) {
		this.modal.open(content, {size: 'sm', windowClass: 'repeat-modal', backdropClass: 'none-backdrop'});
	}
}