import { Component, OnInit, NgModule, ViewChild, ElementRef, EventEmitter  } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
// import { Collapse } from './../model/group';
import { NotifierService } from 'angular-notifier';
import { ServicesService } from '../../../shared/services/serv.service';

@Component({
	selector: 'app-list-services',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})

export class ListServicesComponent implements OnInit {

	@ViewChild('f') floatingLabelForm: NgForm;
    @ViewChild('vform') validationForm: FormGroup;
    regularForm: FormGroup;
    
	closeResult: string;
	form: any = {};
	group: any;
	public isCollapsed = false;
	idGroup: any;
    nameGroup: any;

	constructor(private modalService: NgbModal, 
		private notifierService: NotifierService,
		private services: ServicesService,
		private route: Router
	) { }

	ngOnInit() {
		this.regularForm = new FormGroup({
          'text': new FormControl(null, [Validators.required])
        }, {updateOn: 'blur'});
        this.loadListGroup();
	}


	private loadListGroup(){
		let userInfo = JSON.parse(localStorage.getItem('user'));
		this.form.ownerId = userInfo.id;
		this.services.getListService_Group(this.form).subscribe(
			success => {
				this.group = success;
			},
			error => {}
		);
	}

	open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    openServiceGroup(content,id) {
        this.idGroup = id;
    	this.modalService.open(content);
    }

    openRemoveGroup(content,id,name) {
        this.nameGroup = name;
        this.idGroup = id;
        this.modalService.open(content);
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

    checkAddGroup(event){
    	if(event == true){
    		this.loadListGroup();
    	}
    }

    checkEditGroup(event) {
        if(event == true){
            this.loadListGroup();
        }
    }

    confirmRemove(id) {
        let group: any = {id: id};
        this.services.removeService_GroupById(group).subscribe(
            success => {
                this.notifierService.notify('success', success.success);
                this.modalService.dismissAll();
                this.loadListGroup();
            },
            error => {}
        );
    }

    addService(groupId) {
    	this.route.navigate(['services/add-services'], { queryParams: { groupId: groupId } });
    }
}
