import { Component, Output, EventEmitter, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LocationsService } from './../../../../shared/services/location.service';
import { NotifierService } from 'angular-notifier'; 
@Component({
	selector: 'add-locations',
	templateUrl: './add-location.component.html',
	styleUrls: ['./add-location.component.scss']
})

export class AddLocationComponent implements OnInit {
	
	@Output() checkAddLocation: EventEmitter<any> = new EventEmitter<any>();
	@ViewChild('name_location') name_location: ElementRef;
	@ViewChild('street_address') street_address: ElementRef;
	@ViewChild('city_location') city_location: ElementRef;

	form: any = {};
	user: any;

	constructor(
		private modal: NgbModal,
		private localtionService: LocationsService,
		private notify: NotifierService
	) {}

	ngOnInit() {
		this.user = JSON.parse(localStorage.getItem('user'));
		this.form.contact_email = this.user.email;
		this.checkAddLocation.emit(false);
	}

	addLocation(location: any) {
		location.ownerId = this.user.id;
      this.localtionService.createLocation(location).subscribe(
			success => { 
				this.checkAddLocation.emit(true);
				this.notify.notify('success', 'Location Added !');
				this.modal.dismissAll();
			},
			error => { 
				console.log(error);
			}
		);
	}

	onSubmit(): void {
		if(this.checkRequired()) {
			this.addLocation(this.form);
		}
		// this.addLocation(this.form);
	}


	checkRequired() {
		if(this.form.name_location == "" || this.form.name_location == null) {
			this.notify.notify('warning', 'Location name is not empty !');
			this.name_location.nativeElement.focus();
			this.name_location.nativeElement.classList.add('required');
			return false;
		} else {
			this.name_location.nativeElement.classList.remove('required');
			if(this.form.street_address == "" || this.form.street_address == null) {
				this.notify.notify('warning', 'Street address is not empty !');
				this.street_address.nativeElement.focus();
				this.street_address.nativeElement.classList.add('required');
				return false;
			} else {
				this.street_address.nativeElement.classList.remove('required');
				if(this.form.city_location == "" || this.form.city_location == null) {
					this.notify.notify('warning', 'City is not empty !');
					this.city_location.nativeElement.focus();
					this.city_location.nativeElement.classList.add('required');
					return false;
				} else {
					this.city_location.nativeElement.classList.remove('required');
					return true;
				}
			}
		}
	}

	close() {
		this.modal.dismissAll();
	}
}
