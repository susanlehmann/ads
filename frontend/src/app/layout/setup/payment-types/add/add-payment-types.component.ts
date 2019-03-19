import { Component, Output, EventEmitter, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BusinessTypeService } from './../../../../shared/services/services.service';
import { NotifierService } from 'angular-notifier'; 
@Component({
	selector: 'add-payment-types',
	templateUrl: './add-payment-types.component.html',
	styleUrls: ['./add-payment-types.component.scss']
})

export class AddPaymentTypesComponent implements OnInit {
	
	@Output() checkAddBusiness: EventEmitter<any> = new EventEmitter<any>();
	@ViewChild('payment_type') payment_type: ElementRef;

	form: any = {};
	user: any;

	constructor(
		private modal: NgbModal,
		private businessType: BusinessTypeService,
		private notify: NotifierService
	) {}

	ngOnInit() {
		this.user = JSON.parse(localStorage.getItem('user'));
		this.checkAddBusiness.emit(false);
	}

	addBusinessType(business: any) {
		var data : any = {};
		data.ownerId = this.user.id;
		data.name_business_type = business.type_name;
		this.businessType.createBusinessType(data).subscribe(
			success => { 
				this.checkAddBusiness.emit(true);
				this.notify.notify('success', 'Business Type Added !');
				this.modal.dismissAll();
			},
			error => { 
				console.log(error);
			}
		);
	}

	onSubmit(): void {
		if(this.checkRequired()) {
			this.addBusinessType(this.form);
		}
		// this.addLocation(this.form);
	}


	checkRequired() {
		if(this.form.type_name == "" || this.form.type_name == null) {
			this.notify.notify('warning', 'Payment type name is not empty !');
			this.payment_type.nativeElement.focus();
			this.payment_type.nativeElement.classList.add('required');
			return false;
		} else {
			this.payment_type.nativeElement.classList.remove('required');
			return true;
		}
	}

	close() {
		this.modal.dismissAll();
	}
}
