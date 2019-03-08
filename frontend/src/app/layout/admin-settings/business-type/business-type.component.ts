import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BusinessTypeService } from './../../../shared/services/services.service';

@Component({
	selector: 'business-type',
	templateUrl: './business-type.component.html',
	styleUrls: ['./business-type.component.scss']
})

export class BusinessTypeComponent implements OnInit {
	
	business: any;
	inputBusiness: any;
	numberList: number;
	constructor(
		private modalService: NgbModal,
		private businessType: BusinessTypeService
	) {}

	ngOnInit(){
		this.loadBusinessType();
	}

	loadBusinessType() {
		var user = JSON.parse(localStorage.getItem('user'));
		this.businessType.listBusinessType(user.id).subscribe(
			success => { 
				this.business = success;
				this.numberList = success.business.length;
			},
			error => {
				console.log(error);
			}
		);
	}

	checkAddBusiness(event) {
		if(event) {
			this.loadBusinessType();
		}
	}

	checkEditBusiness(event) {
		if(event) {
			this.loadBusinessType();
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

	addBusiness(content) {
		this.modalService.open(content, { windowClass: 'container-modal' });
	}

	editBusinessType(content, data) {
		this.inputBusiness = data;
		this.modalService.open(content, { windowClass: 'container-modal' });
	}
}