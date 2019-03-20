import { Component, OnInit, Input } from '@angular/core';
import { NgbModalRef, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'setup-client-notifi-confirmation',
	templateUrl: './confirmation.component.html',
	styleUrls: ['./confirmation.component.scss']
})


export class ClientNotifiConfirmation implements OnInit {
	
	@Input() confirmation: any;
	enableConfirm: boolean = false;
	
	constructor(private modal: NgbModal) {
		// code...
	}

	ngOnInit() {
		this.enableConfirm = this.confirmation;
	}

	viewPreview (content) {
		this.modal.open(content, {size: 'md', windowClass: 'fixed-width'});
	}
}