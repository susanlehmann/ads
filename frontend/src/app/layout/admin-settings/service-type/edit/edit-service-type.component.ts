import { Component, Output, EventEmitter, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LocationsService } from './../../../../shared/services/location.service';
import { NotifierService } from 'angular-notifier'; 

@Component({
	selector: 'edit-service-type',
	templateUrl: './edit-service-type.component.html',
	styleUrls: ['./edit-service-type.component.scss']
})

export class EditServiceTypeComponent implements OnInit {
	
	@Input() inputLocation: any;
	@Output() checkEditLocation: EventEmitter<any> = new EventEmitter<any>();
	@ViewChild('namelocation') namelocation: ElementRef;
	@ViewChild('streetaddress') streetaddress: ElementRef;
	@ViewChild('citylocation') citylocation: ElementRef;

	formUpdate: any = {};
	user: any;

	constructor(
		private modal: NgbModal,
		private localtionService: LocationsService,
		private notify: NotifierService
	) {}

	ngOnInit() {
		this.user = JSON.parse(localStorage.getItem('user'));
		this.checkEditLocation.emit(false);
		this.reloadData();
	}

	reloadData()
	{
		this.formUpdate.id = this.inputLocation.id;
		this.formUpdate.namelocation = this.inputLocation.name_location;
		this.formUpdate.streetaddress = this.inputLocation.street_address;
		this.formUpdate.statelocation = this.inputLocation.state_location;
		this.formUpdate.citylocation = this.inputLocation.city_location;
		this.formUpdate.contactemail = this.inputLocation.contact_email;
		this.formUpdate.contactmember = this.inputLocation.contact_member;
		this.formUpdate.zip_code = this.inputLocation.zip_code_location;
	}

	updateLocation(location: any) {
		var data : any = {};
		data.id = location.id;
		data.ownerId = this.user.id;
		data.name_location = location.namelocation;
		data.street_address = location.streetaddress;
		data.state_location = location.statelocation;
		data.city_location = location.citylocation;
		data.contact_email = location.contactemail;
		data.contact_member = location.contactmember;
		data.zip_code_location = location.zip_code;
		this.localtionService.updateLocation(data).subscribe(
			result => { 
				if(result.success){
					this.checkEditLocation.emit(true);
					this.notify.notify('success', 'Location Updated !');
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
			this.updateLocation(this.formUpdate);
		}
		// this.addLocation(this.form);
	}


	checkRequired() {
		if(this.formUpdate.namelocation == "" || this.formUpdate.namelocation == null) {
			this.notify.notify('warning', 'Location name is not empty !');
			this.namelocation.nativeElement.focus();
			this.namelocation.nativeElement.classList.add('required');
			return false;
		} else {
			this.namelocation.nativeElement.classList.remove('required');
			if(this.formUpdate.streetaddress == "" || this.formUpdate.streetaddress == null) {
				this.notify.notify('warning', 'Street address is not empty !');
				this.streetaddress.nativeElement.focus();
				this.streetaddress.nativeElement.classList.add('required');
				return false;
			} else {
				this.streetaddress.nativeElement.classList.remove('required');
				if(this.formUpdate.citylocation == "" || this.formUpdate.citylocation == null) {
					this.notify.notify('warning', 'City is not empty !');
					this.citylocation.nativeElement.focus();
					this.citylocation.nativeElement.classList.add('required');
					return false;
				} else {
					this.citylocation.nativeElement.classList.remove('required');
					return true;
				}
			}
		}
	}

	close() {
		this.modal.dismissAll();
	}

	deleteModal(content) {
		this.modal.open(content, { windowClass: 'container-modal' });
	}
	
	confirmRemove(){
		this.localtionService.removeLocation(this.inputLocation.id).subscribe(
			result => { 
				if(result.success) {
					this.checkEditLocation.emit(true);
					this.notify.notify('success', 'Location Deleted !');
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