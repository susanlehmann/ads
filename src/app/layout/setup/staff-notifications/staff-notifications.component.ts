import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'setup-staff-notification',
	templateUrl: './staff-notifications.component.html',
	styleUrls: ['./staff-notifications.component.scss']
})


export class StaffNotifiComponent implements OnInit {
	
	form: any = {};
	checkSwitch: boolean = false;

	constructor() {
		// code...
	}

	ngOnInit() {

	}


	switch(event) {
		if(event.srcElement.checked){
			this.form.staffMember = true;
			this.form.specific = true;
		} else {
			this.form.staffMember = false;
			this.form.specific = false;
		}
	}
}