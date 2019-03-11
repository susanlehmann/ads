import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { ServicesService } from '../../../shared/services/serv.service';
import { ServiceTypeService } from '../../../shared/services/services.service';
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
    @ViewChild('service_description') svDescp: ElementRef;
    @ViewChild('service_available_for') svAvaiFor: ElementRef;
    @ViewChild('voucher_expiryperiod') expiryPeriod: ElementRef;
    @ViewChild('name_service') _name_service: ElementRef;
    @ViewChild('settin_duration') settin_durations: ElementRef;
    @ViewChild('checkall') checkallBox: ElementRef;

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
	priceOptions: any[];

	constructor(private activatedRoute: ActivatedRoute,
		private route: Router,
		private services: ServicesService,
		private modalService: NgbModal, 
		private notify: NotifierService,
		private staff: StaffService,
		private serviceType: ServiceTypeService
		) 
	{ 
		this.priceOptions = [{
			duration_service: 60,
			retail_price_service: '',
			name_pricing_service: '',
			special_price_service: '',
		}]; 
	}

	ngOnInit() {
		this.regularForm = new FormGroup({
          'email': new FormControl(null, [Validators.required, Validators.email]),
          'text': new FormControl(null, [Validators.required])
        }, {updateOn: 'blur'});
		this.activatedRoute.params.subscribe(params => {this.serviceId = params.id;});
		this.loadServicesById(this.serviceId);
	}

	addPriceOption(): void {
		this.priceOptions.push({
			duration_service: 60,
			retail_price_service: '',
			name_pricing_service: '',
			special_price_service: '',
		});
	}
 
	removePriceOption(o): void {
		this.priceOptions = this.priceOptions.filter(v => v!=o);
	}

	private loadServicesById(id) {
		let userInfo = JSON.parse(localStorage.getItem('user'));
		this.serviceType.listServiceType(userInfo.id).subscribe(
			response => {
				this.treatment_type = response.service;
			}
		);
		let services: any = {'id': id};
		this.services.getServiceById(services).subscribe(
			success => {
				this.form = success.service;
				this.form.id_business = success.service.id_service_type;

				const priceOptions = JSON.parse(success.service.price_options);
				if (priceOptions && priceOptions.length > 0) {
					this.priceOptions = priceOptions;
				}

				this.listusers = JSON.parse(success.service.id_staff);
				for(var i = 0; i < JSON.parse(success.service.id_staff).length; i++) {
					this.arrStaff.push(JSON.parse(success.service.id_staff)[i]);
				}
				Object.assign(this.form, JSON.parse(success.service.online_booking_service));
				Object.assign(this.form, JSON.parse(success.service.setting_service));
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

	        	if(this.liststafs.length == this.arrStaff.length) {
	        		this.checkallBox.nativeElement.setAttribute('checked', true);
        		} else {
        			this.checkallBox.nativeElement.removeAttribute('checked');
    			}
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
		
		this.form.duration_service = this.priceOptions[0].duration_service;
		this.form.retail_price_service = this.priceOptions[0].retail_price_service;
		this.form.name_pricing_service = this.priceOptions[0].name_pricing_service;
		this.form.special_price_service = this.priceOptions[0].special_price_service;
		this.form.price_options = JSON.stringify(this.priceOptions);

        this.services.updateService(this.form).subscribe(
        	success => {
        		this.route.navigateByUrl('services');
        		this.notify.notify('success', 'Update service successfully !')
        	},
        	error => {}
        );
	}
	
	selectStaff(listStaff, event) {
		var index = this.arrStaff.indexOf(listStaff);
		if(!event.srcElement.checked) {
			this.arrStaff.splice(index, 1);
			this.checked = false;
		} else {
			this.arrStaff.push(listStaff);
		}
		this.form.id_staff = JSON.stringify(this.arrStaff);
	}

	selectAllStaff(listStaffs, event) {
		var index = this.staffCheckAll.indexOf(listStaffs)
		// this.arrStaff.push({'id': listStaff.id, 'name': listStaff.firstName +' '+listStaff.lastName});
		this.arrStaff = [];
		if(event.srcElement.checked) {
			this.staffCheckAll.push(listStaffs);
			listStaffs.forEach(iSelect => {
				this.arrStaff.push(iSelect);
				this.checkedIf(iSelect.id);
			});
		} else {
			this.arrStaff = [];
			this.listusers = [];
			listStaffs.forEach(iSelect => {
				this.checkedIf(iSelect.id);
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
		for(var i = 0; i < this.arrStaff.length; i++){
			if(this.arrStaff[i].id == id) {
				return true;
			}
		}
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

	checkOnline() {
		if(!this.form.enable_online_bookings) {
			return true;
		} else {
			return false;
		}
	}

	enableVoucher() {
		if(!this.form.enable_voucher_sales) {
			this.expiryPeriod.nativeElement.setAttribute('disabled', true);
		} else {
			this.expiryPeriod.nativeElement.removeAttribute('disabled');
		}
	}

	checkVoucher() {
		if(!this.form.enable_voucher_sales) {
			return true;
		} else {
			return false;
		}
	}

	getExtraTime() {
		if(this.form.extra_time_type !== "notime") {
			this.settin_durations.nativeElement.removeAttribute('disabled');
		} else {
			this.settin_durations.nativeElement.setAttribute('disabled', true);
		}
	}
	checkExtra() {
		if(this.form.extra_time_type !== "notime") {
			return false;
		} else {
			return true;
		}
	}
	goBack() {
		this.route.navigate(['services']);
	}

	close(value) {
		this.modalService.dismissAll();
	}
}
