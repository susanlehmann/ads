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
		private route: ActivatedRoute,
		private router: Router,
		private userService: UserService,
		private notifierService: NotifierService,
		private datePipe: DatePipe
	) {}

	ngOnInit() {
		this.regularForm = new FormGroup({
          'email': new FormControl(null, [Validators.required, Validators.email]),
          'text': new FormControl(null, [Validators.required])
        }, {updateOn: 'blur'});
		this.form.notificationType = "0";
		this.form.gender = "3";
		this.form.referral = "1";
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
		
		if(typeof(this.form.telephone) == "undefined" || typeof(this.form.telephone) == undefined){ 
			client.telephone = "";
		} else {
			client.telephone = this.form.telephone;
		}
		if(typeof(this.form.notes) == "undefined" || typeof(this.form.notes) == undefined){
			client.notes = "";
		} else {
			client.notes = this.form.notes;
		}
		// this.http.post(`${this.baseUrl}/user/customer/create_user`, client)
		this.userService.createUser(client).subscribe(
			success => {
				this.notifierService.notify('success', 'A new has been successfully added');
				this.router.navigateByUrl('client');
			},
			error => {
				let message = error.error.message;
				if(message.search("users_email_unique") > 0){
					this.emailElement.nativeElement.focus();
					this.notifierService.notify('warning', 'Email Unique !');
				}
			}
		)      
	}

	goBack() {
		const confirm = window.confirm('Are you sure you want to cancel?');
		if (confirm === true) {
			this.router.navigate(['client']);
		}
	}

	selectDate(event) {
		this.birthday = event;
	}



}
