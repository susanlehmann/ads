import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Client } from '../client';
import { Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { HttpcallService } from '../../../shared/services/httpcall.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from '../../../shared/services/user.service';
import { NotifierService } from 'angular-notifier';
import {NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from '../../../shared/pipes/ngb-dateformat';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss'],
	providers: [{provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}]
})
export class EditComponent implements OnInit {

	form: any = {};
	birthday: any = {};
	model12: any = {};

	notificationTypes = [
		{ id: 1, name: "Don't send notifications" },
		{ id: 2, name: "Email" },
		{ id: 3, name: "SMS" },
		{ id: 4, name: "Email & SMS" },
	];

	genders = [
		{ id: 1, name: "Male" },
		{ id: 2, name: "Female" },
		{ id: 3, name: "Unknown" },
	];

	referralSources = [
		{ id: 2, name: "Walk-In" },
	];

	userId: any;
	user: any = {};
	closeResult: string;
	month: any = [];
	day: any = [];
	year: any = [];
	setYear: boolean = false;
	mobile: any;
	telephone: any;

	constructor(
		private http: HttpClient,
		private httpService: HttpcallService,
		private router: ActivatedRoute,
		private route: Router,
		private userService: UserService,
		private notifierService: NotifierService,
		private datePipe: DatePipe,
		private modalService: NgbModal,
	) { }

	ngOnInit() {
		this.router.params.subscribe(params => {this.userId = params.id;});
		this.loadInfo(this.userId);
		this.loadMonth();
	}

	resetMonth(): void {
		this.birthday.month = "";
	}

	resetDay(): void {
		this.birthday.day = "";
	}

	resetYear(): void {
		this.setYear = !this.setYear;
		this.birthday.year = "";
	}

	private loadInfo(id) {
		this.userService.getUserById(id).subscribe(
			(success) => {
				this.form = success;
				this.mobile = this.form.phone;
				this.telephone = this.form.tele_phone;
				this.form.notificationType = this.form.appointment_notifications;
				if(this.form.accepts_notifications == 1) {
					this.form.acceptNotification = true;
				} else {
					this.form.acceptNotification = false;
				}
				if(this.form.display_bookings == 0 ){
					this.form.displayAllBooking = false;
				} else {
					this.form.displayAllBooking = true;
				}
				this.form.referral = this.form.referral_source;
				if(this.form.birthday && this.form.birthday.length > 5){
					this.setYear = true;
					this.birthday.year = Number(this.datePipe.transform(this.form.birthday, 'yyyy'));
				} else {
					this.setYear = false;
				}
				if (this.form.birthday) {
					this.birthday.month = Number(this.datePipe.transform(this.form.birthday, 'M'));
					this.birthday.day = Number(this.datePipe.transform(this.form.birthday, 'dd'));
				}
			},
			error => {}
		);
	}

	onSubmit(): void {
		if (this.form.email && this.form.email.length > 0 && !this.form.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
			this.notifierService.notify('error', `${this.form.email} is not a valid email`);
			document.querySelector('input[name="email"]').classList.add('is-invalid');
			return;
		}

		if (this.birthday.month && this.birthday.day) {
			if(!this.birthday.year){
				let dayNotYear = this.birthday.month + "-" + this.birthday.day;
				this.form.birthday = this.datePipe.transform(dayNotYear, 'MM-dd');
			} else {
				let dayYear = this.birthday.year + "-" + this.birthday.month + "-" + this.birthday.day;
				this.form.birthday = this.datePipe.transform(dayYear, 'yyyy-MM-dd');
			}
		} else {
			this.form.birthday = "";
		}
		this.update(this.form);
	}

	update(client: any = {}) {
		client.getuser = JSON.parse(localStorage.getItem('user'));
		if(this.form.acceptNotification){
			client.acceptNotification = 1;
		} else {
			client.acceptNotification = 0;
		}
		if(this.form.displayAllBooking){
			client.display_bookings = 1;
		} else {
			client.display_bookings = 0;
		}
		if(this.telephone == "null" || this.telephone == null){
			client.telephone = "";
		} else {
			client.telephone = this.telephone.internationalNumber;
		}
		if(this.mobile == "null" || this.mobile == null){
			client.mobile = "";
		} else {
			client.mobile = this.mobile.internationalNumber;
		}
		client.password = "";

		this.userService.updateUserById(client).subscribe(
			success => {
				if(success.existed){
					this.notifierService.notify('warning', success.existed);
					return;
				}
				this.route.navigateByUrl('clients/detail/' + this.userId);
				this.notifierService.notify('success', 'Client information has been successfully updated');
			},
			error => {
				console.log(error);
			}
		)
	}

	goBack() {
		this.route.navigateByUrl('clients/detail/' + this.userId);
	}


	selectDate(event) {
		this.birthday = event;
	}

	open(content) {
        this.modalService.open(content).result.then((result) => {
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
            return  `with: ${reason}`;
        }
    }

	removeUser(userId) {
		this.userService.removeUserById(userId).subscribe(
    		success => {
    			this.notifierService.notify('success', 'Delete successfully !!');
    			this.modalService.dismissAll();
    			this.route.navigateByUrl('clients');
    		},
    		error => {}
    	);
	}

	selectMonth() {
		this.birthday.month = Number(this.birthday.month);
	}
	selectDay() {
		this.birthday.day = Number(this.birthday.day);
	}
	selectYear() {
		this.birthday.year = Number(this.birthday.year);
	}

	showYear() {
		this.setYear = true;
	}

	loadMonth(){
		this.birthday.month = "";
		this.birthday.day = "";
		this.birthday.year = "";
		this.month.push({'id': 1, 'name': 'January'});
		this.month.push({'id': 2, 'name': 'February'});
		this.month.push({'id': 3, 'name': 'March'});
		this.month.push({'id': 4, 'name': 'April'});
		this.month.push({'id': 5, 'name': 'May'});
		this.month.push({'id': 6, 'name': 'June'});
		this.month.push({'id': 7, 'name': 'July'});
		this.month.push({'id': 8, 'name': 'August'});
		this.month.push({'id': 9, 'name': 'September'});
		this.month.push({'id': 10, 'name': 'October'});
		this.month.push({'id': 11, 'name': 'November'});
		this.month.push({'id': 12, 'name': 'December'});
		for (var i = 1; i <= 31; i++) {
			this.day.push({'id': i, 'name': i});
		}
		for (var i = 2018; i >= 1900; i--) {
			this.year.push({'id': i, 'name': i});
		}
	}
}
