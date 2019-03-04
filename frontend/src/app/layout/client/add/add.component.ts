import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Client } from '../client';
import { Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { HttpcallService } from '../../../shared/services/httpcall.service';
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from '../../../shared/services/user.service';
import { NotifierService } from 'angular-notifier';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import {NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from '../../../shared/pipes/ngb-dateformat';


@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.scss'],
	providers: [{provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}]
})
export class AddComponent implements OnInit {

	@ViewChild('f') floatingLabelForm: NgForm;
    @ViewChild('vform') validationForm: FormGroup;
    @ViewChild('email') emailElement: ElementRef;
    @ViewChild('firstName') firstNameElement: ElementRef;
    @ViewChild('lastName') lastNameElement: ElementRef;
    @ViewChild('mobileChild') mobileElement: ElementRef;
    regularForm: FormGroup;


	form: any = {};
	navigation = "arrows";
	birthday: any = {};

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
	month: any = [];
	day: any = [];
	year: any = [];
	setYear: boolean = false;
	mobile: any;
	telephone: any;

	constructor(
		private http: HttpClient,
		private httpService: HttpcallService,
		private route: ActivatedRoute,
		private router: Router,
		private userService: UserService,
		private notifierService: NotifierService,
		private datePipe: DatePipe
	) {}

	ngOnInit() {
		this.regularForm = new FormGroup({
          'email': new FormControl(null, [Validators.required, Validators.email]),
          'text': new FormControl(null, [Validators.required]),
          'phone': new FormControl(undefined, [Validators.required])
        }, {updateOn: 'blur'});
		this.form.notificationType = "4";
		this.form.gender = "3";
		this.form.referral = "1";
		this.form.acceptNotification = true;
		this.loadMonth();
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
		this.addUser(this.form);
	}

	addUser(client:any = {}): void {
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
		client.address = "";
		client.suburb = "";
		client.city = "";
		client.sate = "";
		client.zip_postcode = 0;
		client.birthday = this.form.birthday;
		client.gender = this.form.gender;
		if(this.telephone == "null" || this.telephone == null){ 
			client.telephone = "";
		} else {
			client.telephone = this.telephone.internationalNumber;
		}
		if(typeof(this.form.notes) == "undefined" || typeof(this.form.notes) == undefined){
			client.notes = "";
		} else {
			client.notes = this.form.notes;
		}
		if(typeof(this.form.email) == "undefined" || typeof(this.form.email) == undefined){
			client.email = "";
		} else {
			client.email = this.form.email;
		}
		if(typeof(this.form.email) == "undefined" || typeof(this.form.email) == undefined){
			client.email = "";
		} else {
			client.email = this.form.email;
		}
		if(this.mobile == "null" || this.mobile == null){
			client.mobile = "";
		} else {
			client.mobile = this.mobile.internationalNumber;
		}
		if(typeof(this.form.lastName) == "undefined" || typeof(this.form.lastName) == undefined){
			client.lastName = "";
		} else {
			client.lastName = this.form.lastName;
		}
		// this.http.post(`${this.baseUrl}/user/customer/create_user`, client)
		this.userService.createUser(client).subscribe(
			success => {
				this.notifierService.notify('success', 'A new has been successfully added');
				this.router.navigateByUrl('client');
			},
			error => {
				let message = error.error.message;
				this.alertError(message);
			}
		)      
	}

	alertError(message: string) {
		let arrErr = message.split("$");
		if(message.search("users_email_unique") > 0){
			this.emailElement.nativeElement.focus();
			this.notifierService.notify('warning', 'Email Unique !');
		}
		if (arrErr[1] == "firstName") {
			this.firstNameElement.nativeElement.focus();
			this.notifierService.notify('warning', 'First Name is not empty !');
		}
		if (arrErr[1] == "mobile") {
			this.mobileElement.nativeElement.focus();
			this.notifierService.notify('warning', 'Mobile is not empty !');
		}
	}

	goBack() {
		this.router.navigateByUrl('client');
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
