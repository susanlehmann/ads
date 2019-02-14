import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../client';
import { Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { HttpcallService } from '../../../shared/services/httpcall.service';
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from '../../../shared/services/user.service';
import { NotifierService } from 'angular-notifier';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import {NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.scss'],
	providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class AddComponent implements OnInit {

	@ViewChild('f') floatingLabelForm: NgForm;
    @ViewChild('vform') validationForm: FormGroup;
    regularForm: FormGroup;

	form: any = {};

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
          'text': new FormControl(null, [Validators.required]),
          'select': new FormControl(null, [Validators.required])
        }, {updateOn: 'blur'});
		this.form.notificationType = "";
		this.form.gender = "";
		this.form.referral = "1";
	}


	onSubmit(): void {
		this.addUser(this.form);
	}

	addUser(client): void {
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
		client.address = "0";
		client.suburb = "0";
		client.city = "0";
		client.sate = '0';
		client.zip_postcode = 0;
		// this.http.post(`${this.baseUrl}/user/customer/create_user`, client)
		this.userService.createUser(client).subscribe(
			success => {
				this.notifierService.notify('success', 'A new has been successfully added');
				this.router.navigateByUrl('client');
			},
			error => {
				console.log(error);
			}
		)      
	}

	goBack() {
		const confirm = window.confirm('Are you sure you want to cancel?');
		if (confirm === true) {
			this.router.navigate(['client']);
		}
	}

}
