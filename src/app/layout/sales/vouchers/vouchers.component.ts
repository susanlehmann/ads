import { Component, OnInit } from '@angular/core';

declare var Date: any;

@Component({
	selector: 'app-vourches',
	templateUrl: './vouchers.component.html',
	styleUrls: ['./vouchers.component.scss']
})

export class VouchersComponent implements OnInit {

	form: any = {};
	statusSelected: string;
	currentWeekModel: string;
	constructor(){}

	ngOnInit() {
		this.form.status = "";
		if(this.form.status == "") {
			this.statusSelected = "All statuses";
		}
		this.currentWeekModel = Date.today().toString('dddd, dd MMM yyyy');
	}


	exportEvent(event) {
		console.log(event.srcElement.value);
	}

	filterConf() {
		this.statusSelected = this.form.status;
		console.log(this.form);
	}
}