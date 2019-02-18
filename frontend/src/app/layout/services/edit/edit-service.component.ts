import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { ServicesService } from '../../../shared/services/serv.service';
import { StaffService } from '../../staff/staff.service';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'edit-service-component',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.scss']
})
export class EditServiceComponent implements OnInit {

	@ViewChild('f') floatingLabelForm: NgForm;
    @ViewChild('vform') validationForm: FormGroup;
    regularForm: FormGroup;

	groupId: any;
	form: any = {};
	serviceId: any;
	closeResult: string;
	treatment_type: any = [];
	listusers: any = [];
	liststafs: any = [];
	arrStaff: any = [];
	staffCheckAll: any = [];
	checked: any;

	constructor(private activatedRoute: ActivatedRoute,
		private route: Router,
		private services: ServicesService,
		private modalService: NgbModal, 
		private notify: NotifierService,
		private staff: StaffService
		) 
	{ 
		
	}

	ngOnInit() {
		this.regularForm = new FormGroup({
          'email': new FormControl(null, [Validators.required, Validators.email]),
          'text': new FormControl(null, [Validators.required])
        }, {updateOn: 'blur'});
		this.activatedRoute.params.subscribe(params => {this.serviceId = params.id;});
		this.loadServicesById(this.serviceId);
	}

	private loadServicesById(id) {
		for (var i = 1; i < 10; i++) {
			this.treatment_type.push({id: i, name: 'Treatment type ' + i});
		}
		let services: any = {'id': id};
		this.services.getServiceById(services).subscribe(
			success => {
				this.form = success.service;
				this.listusers = JSON.parse(success.service.id_staff);
				this.arrStaff = JSON.parse(success.service.id_staff);
				Object.assign(this.form, JSON.parse(success.service.online_booking_service));
				Object.assign(this.form, JSON.parse(success.service.setting_service));
				console.log(this.form);
			},
			error => {}
		);
		this.staff.getList().subscribe(
			(success:any) => {
				let arrUser: any = [];
				for(let i = 0; i < success.user.length; i++) {
					arrUser.push({'id': success.user[i].id, 'name': success.user[i].firstName + ' ' + success.user[i].lastName});
				}
	        	this.liststafs = arrUser;
	        	console.log(this.listusers);
			}, 
			err => {}
		);
	}

	open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
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

	removeServices(id) {
		this.services.removeServiceById(id).subscribe(
			success => {
				this.modalService.dismissAll();
				this.route.navigate(['services']);
				this.notify.notify('warning', 'Delete service successfully !')
			},
			error => {}
		);
	}

	onSubmit(): void {
		let userInfo = JSON.parse(localStorage.getItem('user'));
		this.form.ownerId = userInfo.id;
		this.form.online_booking_service = JSON.stringify({
			'enable_online_bookings': this.form.enable_online_bookings,
            'service_description': this.form.service_description,
            'service_available_for': this.form.service_available_for
        });
        this.form.setting_service = JSON.stringify({
            'extra_time_type': this.form.extra_time_type,
            'settin_duration': this.form.settin_duration,
            'set_tax_rate_for_this_service': this.form.set_tax_rate_for_this_service,
            'enable_voucher_sales': this.form.enable_voucher_sales,
            'enable_commission': this.form.enable_commission,
            'voucher_expiryperiod': this.form.voucher_expiryperiod,
        });

        this.services.updateService(this.form).subscribe(
        	success => {
        		this.notify.notify('success', 'Update service successfully !')
        	},
        	error => {}
        );
	}

	selectStaff(listStaff) {
		var index = this.arrStaff.indexOf(listStaff);
		// this.arrStaff.push({'id': listStaff.id, 'name': listStaff.firstName +' '+listStaff.lastName});
		if (index === -1) {
			this.arrStaff.push(listStaff);
		} else {
			this.arrStaff.splice(index,1);
		}
		this.form.id_staff = JSON.stringify(this.arrStaff);
	}

	selectAllStaff(listStaffs, event) {
		var index = this.staffCheckAll.indexOf(listStaffs)
		// this.arrStaff.push({'id': listStaff.id, 'name': listStaff.firstName +' '+listStaff.lastName});
		
		if (index === -1) {
			this.staffCheckAll.push(listStaffs);
			listStaffs.forEach(iSelect => {
				iSelect.selected = true,
				this.arrStaff.push(iSelect)
			});
		} else {
			listStaffs.forEach(iSelect => {
				iSelect.selected = false,
				this.arrStaff.splice(this.arrStaff.indexOf(iSelect),1)
			});
			this.staffCheckAll.splice(index,1);
		}

		this.form.id_staff = JSON.stringify(this.arrStaff);
	}

	checkedIf(id) {
		for(var i = 0; i < this.listusers.length; i++){
			if(this.listusers[i].id == id) {
				return true;
			}
		}
	}

	goBack() {
		const confirm = window.confirm('Are you sure you want to cancel?');
		if (confirm === true) {
			this.route.navigate(['services']);
		}
	}

}
