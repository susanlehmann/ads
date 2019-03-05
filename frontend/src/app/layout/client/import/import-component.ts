import { Component } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'import-client',
	templateUrl: './import-component.html',
	styleUrls: ['./import-component.scss']
})

export class ImportComponent {

	constructor(private modal: NgbModal){}

	close() {
		this.modal.dismissAll();
	}
}