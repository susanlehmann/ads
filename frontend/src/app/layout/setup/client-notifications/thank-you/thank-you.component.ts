import { Component, OnInit, Input } from '@angular/core';
import { NgbModalRef, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
@Component({
	selector: 'setup-client-notifi-thank-you',
	templateUrl: './thank-you.component.html',
	styleUrls: ['./thank-you.component.scss']
})


export class ClientNotifiThankYou implements OnInit {
	
	@Input() thankyou: any;
	enableThanks: boolean = false;
	
	constructor(
		private modal: NgbModal
	) {}

	ngOnInit() {
		this.enableThanks = this.thankyou;
	}

	viewPreview(content) {
		this.modal.open(content, {size: 'md', windowClass: 'fixed-width'});
	}

}