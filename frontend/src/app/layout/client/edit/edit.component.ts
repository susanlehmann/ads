import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Client } from '../client';
import { Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { HttpcallService } from '../../../shared/services/httpcall.service';
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
		{ id: 2, name: "Femail" },
	];

	referralSources = [
		{ id: 1, name: "Walk-In" },
	];

	userId: any;
	user: any = {};

	constructor(
		private http: HttpClient,
		private httpService: HttpcallService,
		private router: ActivatedRoute,
		private route: Router,
		private userService: UserService,
		private notifierService: NotifierService,
		private datePipe: DatePipe
	) { }

	ngOnInit() {
		this.router.params.subscribe(params => {this.userId = params.id;});
		this.loadInfo(this.userId);
	}

	private loadInfo(id) {
		this.userService.getUserById(id).subscribe(
			async (success) => {
				this.form = success;
				this.form.mobile = this.form.phone;
				this.form.telephone = this.form.tele_phone;
				this.form.birthdayYear = this.datePipe.transform(this.form.birthday, 'yyyy');
				this.form.notificationType = this.form.appointment_notifications;
				if(this.form.accepts_notifications == 1) {
					this.form.acceptNotification = true;
				} else {
					this.form.acceptNotification = false;
				}
				if(this.form.display_bookings == 0 ){
					this.form.display_bookings = false;
				} else {
					this.form.display_bookings = true;
				}
				this.form.referral = this.form.referral_source;
				await Object.assign(this, this.model12, {
					year: Number(this.datePipe.transform(this.form.birthday, 'yyyy')), 
					month: Number(this.datePipe.transform(this.form.birthday, 'M')), 
					day: Number(this.datePipe.transform(this.form.birthday, 'dd'))
				});
			},
			error => {}
		);
	}

	onSubmit(): void {
		if(this.birthday.year){
			if(typeof(this.form.birthdayYear) == "undefined" || typeof(this.form.birthdayYear) == undefined){
				let dayNotYear = this.birthday.year + "-" + this.birthday.month + "-" + this.birthday.day;
				this.form.birthday = this.datePipe.transform(dayNotYear, 'yyyy-MM-dd');
			} else {
				let dayYear = this.form.birthdayYear + "-" + this.birthday.month + "-" + this.birthday.day;
				this.form.birthday = this.datePipe.transform(dayYear, 'yyyy-MM-dd');
			}
		} else {
			this.form.birthday = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
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
		client.password = "";
		client.birthday = this.datePipe.transform(this.form.birthday, 'yyyy-MM-dd');
		this.form.birthday = new Date(client.birthday);

		this.userService.updateUserById(client).subscribe(
			success => {
				this.notifierService.notify('success', 'Update has been successfully updated');
			},
			error => {
				console.log(error);
			}
		)
	}

	goBack() {
		const confirm = window.confirm('Are you sure you want to cancel?');
		if (confirm === true) {
			this.route.navigate(['client']);
		}
	}

	loadDate(dayxx){
		Object.assign(this, this.model12, {
			year: Number(this.datePipe.transform(dayxx, 'yyyy')), 
			month: Number(this.datePipe.transform(dayxx, 'M')), 
			day: Number(this.datePipe.transform(dayxx, 'dd'))
		});
	}

	selectDate(event) {
		this.birthday = event;
	}
}
