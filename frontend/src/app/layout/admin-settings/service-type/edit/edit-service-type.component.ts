import { Component, Output, EventEmitter, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ServiceTypeService } from './../../../../shared/services/services.service';
import { NotifierService } from 'angular-notifier'; 

@Component({
	selector: 'edit-service-type',
	templateUrl: './edit-service-type.component.html',
	styleUrls: ['./edit-service-type.component.scss']
})

export class EditServiceTypeComponent implements OnInit {
	
	@Input() inputService: any;
	@Output() checkEditService: EventEmitter<any> = new EventEmitter<any>();
	@ViewChild('type_name') type_name: ElementRef;

	formUpdate: any = {};
	user: any;

	constructor(
		private modal: NgbModal,
		private serviceType: ServiceTypeService,
		private notify: NotifierService
	) {}

	ngOnInit() {
		this.user = JSON.parse(localStorage.getItem('user'));
		this.checkEditService.emit(false);
		this.reloadData();
	}

	reloadData()
	{
		this.formUpdate.id = this.inputService.id;
		this.formUpdate.type_name = this.inputService.name_service_type;
	}

	updateServiceType(service: any) {
		var data : any = {};
		data.id = service.id;
		data.ownerId = this.user.id;
		data.name_service_type = service.type_name;
		this.serviceType.updateServiceType(data).subscribe(
			result => { 
				if(result.success){
					this.checkEditService.emit(true);
					this.notify.notify('success', 'Service Type Updated !');
					this.modal.dismissAll();
				}
			},
			error => { 
				console.log(error);
			}
		);
	}

	onSubmit(): void {
		if(this.checkRequired()) {
			this.updateServiceType(this.formUpdate);
		}
		// this.addLocation(this.form);
	}


	checkRequired() {
		if(this.formUpdate.type_name == "" || this.formUpdate.type_name == null) {
			this.notify.notify('warning', 'Service type name is not empty !');
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
		this.serviceType.removeServiceType(this.inputService.id).subscribe(
			result => { 
				if(result.success) {
					this.checkEditService.emit(true);
					this.notify.notify('success', 'Service Type Deleted !');
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