import { Component, OnInit, NgModule, Input  } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
	selector: 'app-list-service-group',
	templateUrl: './list-service-group.component.html',
	styleUrls: ['./list-service-group.component.scss']
})

export class ListServiceGroupComponent implements OnInit {

    @Input() listGroup: any;

	closeResult: string;
	form: any = {};
	
	constructor(private modalService: NgbModal,
		private route: Router
	) { }

	ngOnInit() {
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

    closeModal() {
    	this.modalService.dismissAll();
    }

    addServiceToGroup(idGroup) {
        this.modalService.dismissAll();
    	this.route.navigate(['services/add-services'], { queryParams: { groupId: idGroup } });
    }
}
