import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ServiceTypeService } from './../../../shared/services/services.service';

@Component({
	selector: 'service-type',
	templateUrl: './service-type.component.html',
	styleUrls: ['./service-type.component.scss']
})

export class ServiceTypeComponent implements OnInit {
	
	service: any;
	inputService: any;
	numberList: number;
	
	constructor(
		private modalService: NgbModal,
		private serviceType: ServiceTypeService
	) {}

	ngOnInit(){
		this.loadServiceType();
	}

	loadServiceType() {
		var user = JSON.parse(localStorage.getItem('user'));
		this.serviceType.listServiceType(user.id).subscribe(
			success => { 
				console.log(success);
				this.service = success;
				this.numberList = success.service.length;
			},
			error => {
				console.log(error);
			}
		);
	}

	checkAddService(event) {
		if(event) {
			this.loadServiceType();
		}
	}

	checkEditService(event) {
		if(event) {
			this.loadServiceType();
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

	addService(content) {
		this.modalService.open(content, { windowClass: 'container-modal' });
	}

	editService(content, data) {
		this.inputService = data;
		this.modalService.open(content, { windowClass: 'container-modal' });
	}
}