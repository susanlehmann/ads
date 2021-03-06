import { Component, Output, EventEmitter, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BusinessTypeService } from './../../../../shared/services/services.service';
import { NotifierService } from 'angular-notifier'; 

@Component({
	selector: 'edit-business-type',
	templateUrl: './edit-business-type.component.html',
	styleUrls: ['./edit-business-type.component.scss']
})

export class EditBusinessTypeComponent implements OnInit {
	
	@Input() inputBusiness: any;
	@Output() checkEditBusiness: EventEmitter<any> = new EventEmitter<any>();
	@ViewChild('type_name') type_name: ElementRef;

	formUpdate: any = {};
	user: any;

	constructor(
		private modal: NgbModal,
		private businessType: BusinessTypeService,
		private notify: NotifierService
	) {}

	ngOnInit() {
		this.user = JSON.parse(localStorage.getItem('user'));
		this.checkEditBusiness.emit(false);
		this.reloadData();
	}

	reloadData()
	{
		this.formUpdate.id = this.inputBusiness.id;
		this.formUpdate.type_name = this.inputBusiness.name_business_type;
	}

	updateBusinessType(business: any) {
		var data : any = {};
		data.id = business.id;
		data.ownerId = this.user.id;
		data.name_business_type = business.type_name;
		this.businessType.updateBusinessType(data).subscribe(
			result => { 
				if(result.success){
					this.checkEditBusiness.emit(true);
					this.notify.notify('success', 'Business Type Updated !');
					this.modal.dismissAll();
				}
			},
			error => { 
				console.log(error);
			}
		);
	}

	onSubmit(): void {
		this.notify.notify('warning', 'Business Type name is not empty !');
		// if(this.checkRequired()) {
		// 	this.updateBusinessType(this.formUpdate);
		// }
		// this.addLocation(this.form);
	}


	checkRequired() {
		if(this.formUpdate.type_name == "" || this.formUpdate.type_name == null) {
			this.notify.notify('warning', 'Business Type name is not empty !');
			this.type_name.nativeElement.focus();
			this.type_name.nativeElement.classList.add('required');
			return false;
		} else {
			this.type_name.nativeElement.classList.remove('required');
			return true;
		}
	}

	close() {
		this.modal.dismissAll();
	}

	deleteModal(content) {
		this.modal.open(content, { windowClass: 'container-modal delete-modal' });
	}
	
	confirmRemove(){
		this.businessType.removeBusinessType(this.inputBusiness.id).subscribe(
			result => { 
				if(result.success) {
					this.checkEditBusiness.emit(true);
					this.notify.notify('success', 'Business Type Deleted !');
					this.modal.dismissAll();
				} else {
					this.notify.notify('warning', 'Delete Error !');
				}
			},
			error => { 
				console.log(error);
			}
		);
	}
}