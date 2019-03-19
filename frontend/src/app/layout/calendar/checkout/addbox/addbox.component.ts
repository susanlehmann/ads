import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import {NgbModal, NgbModalRef, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './../../../../shared/services/user.service';

@Component({
	selector: 'checkout-addbox',
	templateUrl: './addbox.component.html',
    styleUrls: ['./addbox.component.scss'],
})

export class AddBoxCheckoutComponent implements OnInit
{
	@Input() client: any;
	@Output() removeApp: EventEmitter<any> = new EventEmitter<any>();
	@Output() bindClient: EventEmitter<any> = new EventEmitter<any>();

	constructor(
		private route: Router,
		private datePipe: DatePipe
	){}

	ngOnInit(){
		this.removeApp.emit(false);
		this.bindClient.emit(this.client);
	}


	routerEdit(id) {
		this.route.navigateByUrl('clients/edit/'+id);
	}

	removeFromAppointment() {
		this.removeApp.emit(true);
	}

	getDateofBirth(value) {
		return this.datePipe.transform(value, value.length > 5 ? 'dd MMMM yyyy' : 'dd MMMM');
    }
}