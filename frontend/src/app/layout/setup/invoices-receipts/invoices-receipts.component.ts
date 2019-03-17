import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
	selector: 'setup-invoices-receipts',
	templateUrl: './invoices-receipts.component.html',
	styleUrls: ['./invoices-receipts.component.scss']
})

export class InvoiceReceiptComponent implements OnInit {
	
	constructor(private modalService: NgbModal) {
		// code...
	}

	ngOnInit() {

	}
}