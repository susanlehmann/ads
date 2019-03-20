import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {NgbModal, NgbModalRef, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './../../../../shared/services/user.service';

@Component({
	selector: 'appointment-client',
	templateUrl: './client.component.html',
    styleUrls: ['./client.component.scss'],
})

export class AppClientComponent implements OnInit
{

	form: any = {};
	showAddClient: boolean = false;
	client: any = {};
	clients: any;
	@Output() outPutData: EventEmitter<any> = new EventEmitter<any>()
	constructor(
		private userService: UserService
	){}

	ngOnInit(){
		this.getUser();
		this.outPutData.emit(false);
	}

	focusSearchClient() {
		this.showAddClient = true;
		// this.modal_body.nativeElement.classList.add('onHover');
	}

	blurSearchClient() {
		this.showAddClient = false;
		// this.modal_body.nativeElement.classList.remove('onHover');
	}

	sendingData(client) {
		this.showAddClient = false;
		this.outPutData.emit(client);
	}

	getUser() {
		this.client.getuser = JSON.parse(localStorage.getItem('user'));
		this.userService.getListUser(this.client).subscribe(
			success => {
				this.clients = success;
			},
			error => {
				console.log(error);
			}
		);
	}

}