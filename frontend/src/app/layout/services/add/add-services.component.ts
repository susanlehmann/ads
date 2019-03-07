import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { ServicesService } from '../../../shared/services/serv.service';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { StaffService } from '../../staff/staff.service';
import { NotifierService } from 'angular-notifier';
@Component({
  selector: 'add-service',
  templateUrl: './add-services.component.html',
  styleUrls: ['./add-services.component.scss']
})
export class AddServiceComponent implements OnInit {

	@ViewChild('f') floatingLabelForm: NgForm;
    @ViewChild('vform') validationForm: FormGroup;
    regularForm: FormGroup;
    @ViewChild('service_description') svDescp: ElementRef;
    @ViewChild('service_available_for') svAvaiFor: ElementRef;
    @ViewChild('voucher_expiryperiod') expiryPeriod: ElementRef;
    @ViewChild('name_service') name_service: ElementRef;
    @ViewChild('settin_duration') settin_durations: ElementRef;
    @ViewChild('checkall') checkallBox: ElementRef;

	groupId: any;
	form: any = {};
	treatment_type: any = [];
	duration: any = [];

	arrStaff: any = [];
	staffCheckAll: any = [];
	listusers: any = [];
	checked: any;

	constructor(private activatedRoute: ActivatedRoute,
		private route: Router,
		private services: ServicesService,
		private staff: StaffService,
		private noti: NotifierService,
		private modalService: NgbModal
		) 
	{ 
		this.activatedRoute.queryParams.subscribe((params: Params) => {
			if(params.groupId == "" || typeof(params.groupId) == "undefined" || typeof(params.groupId) == undefined){
				this.route.navigateByUrl('services');
			} else {
				let groupId: any = {id: params.groupId};
				this.services.getService_GroupById(groupId).subscribe(
					success => {
						if(success.service_group == null || success.service_group == "null"){
							this.route.navigateByUrl('services');
						} else {
							this.groupId = params.groupId;
							this.form.id_service_group = params.groupId;
						}
					},
					error => {}
				);
			}
		});
	}

	ngOnInit() {
		this.regularForm = new FormGroup({
          'email': new FormControl(null, [Validators.required, Validators.email]),
          'text': new FormControl(null, [Validators.required])
        }, {updateOn: 'blur'});
		this.reloadForm();
	}

	goBack() {
		this.route.navigateByUrl('services');
	}



	private reloadForm() {
		let userInfo = JSON.parse(localStorage.getItem('user'));
		this.form.ownerId = userInfo.id;
		this.form.id_business = 0;
		for (var i = 1; i < 10; i++) {
			this.treatment_type.push({id: i, name: 'Treatment type ' + i});
		}
		this.form.duration_service = 60;
		// this.form.id_service_group = this.groupId;
		this.form.settin_duration = 15;
		this.form.extra_time_type = "notime";
		if(typeof(this.form.name_pricing_service) == "undefined" || typeof(this.form.name_pricing_service) == undefined) {
			this.form.name_pricing_service = "";
		}
		if(typeof(this.form.special_price_service) == "undefined" || typeof(this.form.special_price_service) == undefined) {
			this.form.special_price_service = "";
		}
		if(typeof(this.form.id_staff) == "undefined" || typeof(this.form.id_staff) == undefined) {
			this.form.id_staff = 0;
		}
		if(typeof(this.form.service_description) == "undefined" || typeof(this.form.service_description) == undefined) {
			this.form.service_description = "";
		}
		this.form.set_tax_rate_for_this_service = 1;
		this.form.service_available_for = "everyone";
		this.form.voucher_expiryperiod = "6";
		this.form.enable_online_bookings = true;
		this.form.enable_voucher_sales = true;
		this.form.enable_commission = true;
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
		this.staff.getList().subscribe(
			(success:any) => {
				let arrUser: any = [];
				for(let i = 0; i < success.user.length; i++) {
					arrUser.push({'id': success.user[i].id, 'name': success.user[i].firstName + ' ' + success.user[i].lastName});
				}
	        	this.listusers = arrUser;
	        	// console.log(this.listusers);
			}, 
			err => {}
		);
	}

	onSubmit(): void {
		if(!this.checkEmpty()){
			this.noti.notify('warning', 'Service Name is not Empty !');
			this.name_service.nativeElement.focus();
		} else {
			if(this.form.enable_online_bookings) {
				this.form.enable_online_bookings = 1;
			} else {
				this.form.enable_online_bookings = 0;
			}
			if(this.form.enable_voucher_sales) {
				this.form.enable_voucher_sales = 1;
			} else {
				this.form.enable_voucher_sales = 0;
			}
			if(this.form.enable_commission) {
				this.form.enable_commission = 1;
			} else {
				this.form.enable_commission = 0;
			}
			// console.log(this.form);
			this.services.createService(this.form).subscribe(
				success => {
					this.noti.notify('success', success.success);
					this.route.navigateByUrl('services');
				},
				error => {}
			);
		}
		
	}

	selectStaff(listStaff) {
		var index = this.arrStaff.indexOf(listStaff)
		// this.arrStaff.push({'id': listStaff.id, 'name': listStaff.firstName +' '+listStaff.lastName});
		if (index === -1) {
			this.arrStaff.push(listStaff);
		} else {
			this.arrStaff.splice(index,1);
		}
		this.form.id_staff = JSON.stringify(this.arrStaff);
		console.log(this.arrStaff);
	}

	selectAllStaff(listStaffs, event) {
		var index = this.staffCheckAll.indexOf(listStaffs);

		if(event.srcElement.checked) {
			this.arrStaff = [];
			if (index === -1) {
				this.staffCheckAll.push(listStaffs);
				listStaffs.forEach(iSelect => {
					// iSelect.selected = true,
					this.arrStaff.push(iSelect)
				});
				this.checked = true;
			} else {
				listStaffs.forEach(iSelect => {
					// iSelect.selected = false,
					this.arrStaff.splice(this.arrStaff.indexOf(iSelect),1)
				});
				this.staffCheckAll.splice(index,1);
				this.checked = false;
			}
		} else {
			this.arrStaff = [];
			this.staffCheckAll = [];
		}
		// this.arrStaff.push({'id': listStaff.id, 'name': listStaff.firstName +' '+listStaff.lastName});
		
		// if (index === -1) {
		// 	this.staffCheckAll.push(listStaffs);
		// 	listStaffs.forEach(iSelect => {
		// 		// iSelect.selected = true,
		// 		this.arrStaff.push(iSelect)
		// 	});
		// 	this.checked = true;
		// } else {
		// 	listStaffs.forEach(iSelect => {
		// 		// iSelect.selected = false,
		// 		this.arrStaff.splice(this.arrStaff.indexOf(iSelect),1)
		// 	});
		// 	this.staffCheckAll.splice(index,1);
		// 	this.checked = false;
		// }

		this.form.id_staff = JSON.stringify(this.arrStaff);
		console.log(this.arrStaff);
	}

	checkEmpty() {
		if(typeof(this.form.name_service) == "undefined" || typeof(this.form.name_service) == undefined || this.form.name_service == "") {
			return false;
		} else {
			return true;
		}
	}

	checkedIf(id) {
		// for(var i = 0; i < this.listusers.length; i++){
		// 	if(this.listusers[i].id == id) {
		// 		return true;
		// 	}
		// }
		for(var i = 0; i < this.arrStaff.length; i++){
			if(this.arrStaff[i].id == id) {
				return true;
			}
		}
	}

	checkedAll() {
		console.log('abc');
	}
	
	enableOnline() {
		if(!this.form.enable_online_bookings) {
			this.svDescp.nativeElement.setAttribute('readonly', true);
			this.svAvaiFor.nativeElement.setAttribute('disabled', true);
			this.form.service_description = "";
		} else {
			this.svDescp.nativeElement.removeAttribute('readonly');
			this.svAvaiFor.nativeElement.removeAttribute('disabled');
		}
	}

	enableVoucher() {
		if(!this.form.enable_voucher_sales) {
			this.expiryPeriod.nativeElement.setAttribute('disabled', true);
		} else {
			this.expiryPeriod.nativeElement.removeAttribute('disabled');
		}
	}

	getExtraTime() {
		if(this.form.extra_time_type !== "notime") {
			this.settin_durations.nativeElement.removeAttribute('disabled');
		} else {
			this.settin_durations.nativeElement.setAttribute('disabled', true);
		}
	}

	close(value) {
		this.modalService.dismissAll();
	}
}
