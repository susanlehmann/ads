import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'setup-client-notification',
	templateUrl: './client-notifications.component.html',
	styleUrls: ['./client-notifications.component.scss']
})


export class ClientNotifiComponent implements OnInit {
	
	form: any = {};
	checkSwitch: boolean = true;

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