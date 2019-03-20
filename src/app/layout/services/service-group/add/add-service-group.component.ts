import { Component, OnInit, NgModule, ViewChild, ElementRef, EventEmitter, Output  } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { ServicesService } from '../../../../shared/services/serv.service';
@Component({
	selector: 'add-service-group',
	templateUrl: './add-service-group.component.html',
	styleUrls: ['./add-service-group.component.scss']
})

export class AddServiceGroupComponent implements OnInit {

	@ViewChild('f') floatingLabelForm: NgForm;
    @ViewChild('vform') validationForm: FormGroup;
    regularForm: FormGroup;
    @ViewChild('name_service_group') nameGroup: ElementRef;
    @Output() checkAddGroup: EventEmitter<any> = new EventEmitter<any>();
	closeResult: string;
	form: any = {};
	color: any = [
        {id: 1, value: 'ff9cbb'},
        {id: 2, value: 'e2a6e6'},
        {id: 3, value: 'bbc1e8'},
        {id: 4, value: 'a5dff8'},
        {id: 5, value: '91e3ee'},
        {id: 6, value: '6cd5cb'},
        {id: 7, value: 'a6e5bd'},
        {id: 8, value: 'e7f286'},
        {id: 9, value: 'ffec78'},
        {id: 10, value: 'ffbf69'},
    ];
    strColor: string = "ff9cbb";

	constructor(private modalService: NgbModal,
        private notifierService: NotifierService,
        private services: ServicesService
	) { }

	ngOnInit() {
		this.regularForm = new FormGroup({
          'text': new FormControl(null, [Validators.required])
        }, {updateOn: 'blur'});
        this.checkAddGroup.emit(false);
	}


	open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    close(content) {
        this.modalService.dismissAll();
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

    selectColor(value) {
        this.form.color_service_group = value;
    }


    addNewGroup() {
        let userInfo = JSON.parse(localStorage.getItem('user'));
        if(typeof(this.form.name_service_group) == undefined || typeof(this.form.name_service_group) == "undefined") {
            this.notifierService.notify('warning', 'Name Service Group not empty !');
            this.nameGroup.nativeElement.focus();
        } else {
            if(typeof(this.form.color_service_group) == undefined || typeof(this.form.color_service_group) == "undefined") {
                this.form.color_service_group = this.strColor;
            }
            if(typeof(this.form.description_service_group) == undefined || typeof(this.form.description_service_group) == "undefined") {
                this.form.description_service_group = "";
            }
            this.form.ownerId = userInfo.id;
            this.services.createService_Group(this.form).subscribe(
                success => {
                    this.checkAddGroup.emit(true);
                    this.notifierService.notify('success', 'Add Service Group Successfully !');
                    this.modalService.dismissAll();
                },
                error => {
                    console.log(error);
                }
            );
        }
        
    }
}
