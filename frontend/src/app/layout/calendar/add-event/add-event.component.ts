import { Component, Input, OnInit } from '@angular/core';
import {NgbModal, NgbModalRef, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'add-event',
	templateUrl: './add-event.component.html',
    styleUrls: ['./add-event.component.css'],
})

export class AddEventComponent implements OnInit
{
	@Input() _clickEvent: any;
	daySelected: string;
	startTime: string;
	hours: any[] = [];
	service: any[] = [];
	event_info: any = {};

	constructor(private modal: NgbModal){}

	ngOnInit(){
		this.loadHours();
		this.daySelected = this._clickEvent.date._d.toDateString();
		const h = this._clickEvent.date._d.getUTCHours();
		const m = this._clickEvent.date._d.getUTCMinutes();
		if(m == 0){
			this.event_info.stTime = h+'0'+m;
		} else {
			this.event_info.stTime = h+''+m;
		}
		this.event_info.endTime = '000';
		this.event_info.serEvent = '';
		console.log(this._clickEvent);
	}

	loadHours(){
		this.hours = [];
		for(var i = 0; i < 24; i++) {
			this.hours.push({'value': i+"00", 'name': i+':00'});
			this.hours.push({'value': i+"30", 'name': i+':30'});
		}
		for (var x = 0; x < 4; x++){
			this.service.push({'value':x+'xxx', 'name': x+'-xxx'});
		}
	}

	closeModal(){
		this.modal.dismissAll();
	}
}