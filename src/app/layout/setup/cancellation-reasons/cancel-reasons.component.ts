import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
	selector: 'setup-cancellation-reasons',
	templateUrl: './cancel-reasons.component.html',
	styleUrls: ['./cancel-reasons.component.scss']
})

export class CancellationReasonsComponent implements OnInit {
	
	inputReferral: any;

	constructor(private modalService: NgbModal) {
		// code...
	}

	ngOnInit() {

	}

	addReferral(content) {
		this.modalService.open(content, { windowClass: 'container-modal' });
	}
	editReferral(content, data) {
		this.inputReferral = data;
		this.modalService.open(content, { windowClass: 'container-modal' });
	}
}