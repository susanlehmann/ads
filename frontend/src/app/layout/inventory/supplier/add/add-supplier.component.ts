import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SupplierService } from '../supplier.service';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import * as data from './../../../../../assets/country.json';

@Component({
	selector: 'add-supplier',
	templateUrl: './add-supplier.component.html',
	styleUrls: ['./add-supplier.component.scss']
})


export class AddSupplierComponent implements OnInit {

	@Input() isCreate: any;
	@Input() supplier: any;
	@Output() reloadList: EventEmitter<any> = new EventEmitter<any>();
	modalOptions: NgbModalOptions;
	country: any;
	second_address: any = {};
	form: any = {};
	error: any = {};
	postal_address = true;
	mobile: any;
	telephone: any;
	closeResult: string;

	constructor(private spService: SupplierService,
		private modal: NgbModal,
		private notifierService: NotifierService){
		this.modalOptions = {
	      backdrop: 'static',
	      size: 'md',
	      windowClass: 'custom-modal',
	      backdropClass: 'custom-modal',
	    };
	}

	ngOnInit() {
		this.second_address.country = "empty";
		this.country = data;
		if(this.isCreate) {
			this.form = {};
			this.form.countryid_supplier = "empty";
		} else {
			this.form = this.supplier;
			this.mobile = this.supplier.mobilenumber_supplier;
            this.telephone = this.supplier.telephone_supplier;
            if(this.supplier.second_address != null) {
            	this.postal_address = false;
            	this.second_address = JSON.parse(this.supplier.second_address);
            }
		}
		this.reloadList.emit(false);
		
	}

	openModal(content: NgbModalRef) {
	    this.modal.open(content, this.modalOptions).result.then((result) => {
	      this.closeResult = `Closed with: ${result}`;
	    }, (reason) => {
	      this.closeResult = `Dismissed`;
	    });

	}

	dismiss() {
		this.modal.dismissAll();
	}

	deletesupplier() {
		let suppliserId = this.supplier.id;
		this.spService.deleteSupplier(suppliserId)
		.subscribe((data:any) => {
			this.reloadList.emit(true);
			this.modal.dismissAll();
			this.notifierService.notify('success', 'A supplier has been successfully deleted');
		});
	}

	save(): void {
		if(this.isCreate) {
			this.addsupplier(this.form);
		} else {
			this.updatesupplier(this.form);
		}
	}

	addsupplier(supplier): void {
	    if(this.postal_address){
	      supplier.second_address = "";
	    } else {
	      supplier.second_address = JSON.stringify(this.second_address);
	    }
	    supplier.mobilenumber_supplier = this.mobile.internationalNumber;
	    supplier.telephone_supplier = this.telephone.internationalNumber;
	    supplier.postal_address = this.postal_address;
	    this.spService.add(supplier).subscribe(
	    	(data:any) => {
	    		this.reloadList.emit(true);
				this.modal.dismissAll();
	      		this.notifierService.notify('success', 'A new supplier has been successfully added');
	    	},
	    	err => {}
	    );
    }

    updatesupplier(supplier) {
    	if(this.postal_address){
	      supplier.second_address = "";
	    } else {
	      supplier.second_address = JSON.stringify(this.second_address);
	    }
	    supplier.mobilenumber_supplier = this.mobile.internationalNumber;
	    supplier.telephone_supplier = this.telephone.internationalNumber;
	    supplier.postal_address = this.postal_address;
	    this.spService.update(supplier).subscribe(
	    	(data:any) => {
	    		this.reloadList.emit(true);
				this.modal.dismissAll();
	            this.notifierService.notify('success', 'Supplier information has been successfully updated');
	    	}, 
	    	err => {}
	    );
    }
}