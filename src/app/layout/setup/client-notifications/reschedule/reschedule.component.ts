import { Component, OnInit, Input } from '@angular/core';
import { NgbModalRef, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'setup-client-notifi-reschedule',
	templateUrl: './reschedule.component.html',
	styleUrls: ['./reschedule.component.scss']
})


export class ClientNotifiReschedule implements OnInit {
	
	@Input() reschedule : any;
	enableSchedule: boolean = false;
	
	constructor(
		private modal: NgbModal
	) {}

	ngOnInit() {
		this.enableSchedule = this.reschedule;
	}

	viewPreview (content) {
		this.modal.open(content, {size: 'md', windowClass: 'fixed-width'});
	}
}