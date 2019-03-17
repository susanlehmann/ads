import { Component, OnInit, Input } from '@angular/core';
import { NgbModalRef, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'setup-client-notifi-cancellation',
	templateUrl: './cancellation.component.html',
	styleUrls: ['./cancellation.component.scss']
})


export class ClientNotifiCancellation implements OnInit {
	
	@Input() cancellation: any;
	enableCancel: boolean = false;
	
	constructor(private modal: NgbModal) {
		// code...
	}

	ngOnInit() {
		this.enableCancel = this.cancellation;
	}

	viewPreview (content) {
		this.modal.open(content, {size: 'md', windowClass: 'fixed-width'});
	}
}