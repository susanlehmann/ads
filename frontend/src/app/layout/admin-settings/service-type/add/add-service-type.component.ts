import { Component, Output, EventEmitter, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ServiceTypeService } from './../../../../shared/services/services.service';
import { NotifierService } from 'angular-notifier'; 
@Component({
	selector: 'add-service-type',
	templateUrl: './add-service-type.component.html',
	styleUrls: ['./add-service-type.component.scss']
})

export class AddServiceTypeComponent implements OnInit {
	
	@Output() checkAddService: EventEmitter<any> = new EventEmitter<any>();
	@ViewChild('type_name') type_name: ElementRef;

	form: any = {};
	user: any;

	constructor(
		private modal: NgbModal,
		private sService: ServiceTypeService,
		private notify: NotifierService
	) {}

	ngOnInit() {
		this.user = JSON.parse(localStorage.getItem('user'));
		this.checkAddService.emit(false);
	}

	addServiceType(location: any) {
		var service : any = {};
		service.ownerId = this.user.id;
		service.name_service_type = location.type_name;
		this.sService.createServiceType(service).subscribe(
			success => { 
				this.checkAddService.emit(true);
				this.notify.notify('success', 'Service Added !');
				this.modal.dismissAll();
			},
			error => { 
				console.log(error);
			}
		);
	}

	onSubmit(): void {
		if(this.checkRequired()) {
			this.addServiceType(this.form);
		}
		// this.addLocation(this.form);
	}


	checkRequired() {
		if(this.form.type_name == "" || this.form.type_name == null) {
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
}