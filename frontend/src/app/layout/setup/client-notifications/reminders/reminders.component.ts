import { Component, OnInit, Input } from '@angular/core';
import { NgbModalRef, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'setup-client-notifi-reminders',
	templateUrl: './reminders.component.html',
	styleUrls: ['./reminders.component.scss']
})


export class ClientNotifiReminders implements OnInit {
	
	@Input() reminders: any;
	enableReminder: boolean = false;
	form: any = {};

	constructor(private modal: NgbModal) {
		// code...
	}

	ngOnInit() {
		this.enableReminder = this.reminders;
	}

	viewPreview (content) {
		this.modal.open(content, {size: 'md', windowClass: 'fixed-width'});
	}
}