import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ServicesService } from '../../../../shared/services/serv.service';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'edit-service-group',
  templateUrl: './edit-service-group.component.html',
  styleUrls: ['./edit-service-group.component.scss']
})
export class EditServiceGroupComponent implements OnInit {

	@ViewChild('f') floatingLabelForm: NgForm;
    @ViewChild('vform') validationForm: FormGroup;
    regularForm: FormGroup;
	@Input() idGroup: any;
	@Output() checkEditGroup: EventEmitter<any> = new EventEmitter<any>();
	@ViewChild('name_service_group') nameGroup: ElementRef;

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

    form: any = {};
    strColor: string;

	constructor(private modalService: NgbModal,
		private servicesService: ServicesService,
		private notifierService: NotifierService
		) { }

	ngOnInit() {
		this.regularForm = new FormGroup({
          'text': new FormControl(null, [Validators.required])
        }, {updateOn: 'blur'});
		this.loadInfoGroup(this.idGroup);
		this.checkEditGroup.emit(false);
	}

	private loadInfoGroup(id) {
		let groupId: any = {id: id};
		this.servicesService.getService_GroupById(groupId).subscribe(
			success => {
				this.form = success.service_group;
				this.strColor = success.service_group.color_service_group;
			},
			error => {}
		);
	}

	selectColor(value) {
        this.form.color_service_group = value;
    }

	close(content) {
        this.modalService.dismissAll();
    }


    updateServiceGroup() {
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
            this.servicesService.updateService_Group(this.form).subscribe(
                success => {
                    this.checkEditGroup.emit(true);
                    this.notifierService.notify('success', 'Update Service Group Successfully !');
                    this.modalService.dismissAll();
                },
                error => {
                    console.log(error);
                }
            );
        }
    }

    confirmRemove() {
        let group: any = {id: this.form.id};
        this.servicesService.removeService_GroupById(group).subscribe(
            success => {
                this.checkEditGroup.emit(true);
                this.notifierService.notify('success', 'Service Group Deleted !');
                this.modalService.dismissAll();
            },
            error => {}
        );
    }

    openRemoveGroup(content) {
        this.modalService.open(content);
    }
}
