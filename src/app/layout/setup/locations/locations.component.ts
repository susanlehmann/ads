import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LocationsService } from './../../../shared/services/location.service';

@Component({
	selector: 'setup-locations',
	templateUrl: './locations.component.html',
	styleUrls: ['./locations.component.scss']
})

export class LocationComponent implements OnInit {
	
	location: any;
	inputLocation: any;
	numberList: number;
	constructor(
		private modalService: NgbModal,
		private locationService: LocationsService
	) {}

	ngOnInit(){
		this.loadLocation();
	}

	loadLocation() {
		var user = JSON.parse(localStorage.getItem('user'));
		this.locationService.listLocation(user.id).subscribe(
			success => { 
				this.location = success;
				this.numberList = success.location.length;
			},
			error => {
				console.log(error);
			}
		);
	}

	checkAddLocation(event) {
		if(event) {
			this.loadLocation();
		}
	}

	checkEditLocation(event) {
		if(event) {
			this.loadLocation();
		}
	}

	private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }

	addLocation(content) {
		this.modalService.open(content, { windowClass: 'container-modal' });
	}

	editLocation(content, data) {
		this.inputLocation = data;
		this.modalService.open(content, { windowClass: 'container-modal' });
	}
}