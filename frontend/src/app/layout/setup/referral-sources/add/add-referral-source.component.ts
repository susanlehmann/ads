import { Component, Output, EventEmitter, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BusinessTypeService } from './../../../../shared/services/services.service';
import { NotifierService } from 'angular-notifier'; 
@Component({
	selector: 'add-referral-source',
	templateUrl: './add-referral-source.component.html',
	styleUrls: ['./add-referral-source.component.scss']
})

export class AddReferralSourceComponent implements OnInit {
	
	@Output() checkAddBusiness: EventEmitter<any> = new EventEmitter<any>();
	@ViewChild('referral_name') referral_name: ElementRef;

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
			this.notify.notify('warning', 'Referral Source name is not empty !');
			this.referral_name.nativeElement.focus();
			this.referral_name.nativeElement.classList.add('required');
			return false;
		} else {
			this.referral_name.nativeElement.classList.remove('required');
			return true;
		}
	}

	close() {
		this.modal.dismissAll();
	}
}
