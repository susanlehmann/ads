import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { ServicesService } from '../../../shared/services/serv.service';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { StaffService } from '../../staff/staff.service';

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

	groupId: any;
	form: any = {};
	treatment_type: any = [];
	duration: any = [];

	listusers: any = [];

	constructor(private activatedRoute: ActivatedRoute,
		private route: Router,
		private services: ServicesService,
		private staff: StaffService
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
		const confirm = window.confirm('Are you sure you want to cancel?');
		if (confirm === true) {
			this.route.navigate(['services']);
		}
	}

	private reloadForm() {
		let userInfo = JSON.parse(localStorage.getItem('user'));
		this.form.ownerId = userInfo.id;
		this.form.id_business = 0;
		for (var i = 1; i < 10; i++) {
			this.treatment_type.push({id: i, name: 'Treatment type ' + i});
		}
		this.form.duration_service = 60;
		this.form.id_group_service = this.groupId;
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
		this.form.voucher_expiryperiod = "d6";
		this.form.enable_online_bookings = true;
		this.form.enable_voucher_sales = true;
		this.form.enable_commission = true;
		this.staff.getList().subscribe(
			(success:any) => {
	        	this.listusers = success.user;
	        	console.log(this.listusers);
			}, 
			err => {}
		);
	}

	onSubmit(): void {
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
		this.services.createService(this.form).subscribe(
			success => {
				console.log(success);
			},
			error => {}
		);
	}

	selectStaff(id) {
		this.form.id_staff = id;
	}

	enableOnline() {
		if(!this.form.enable_online_bookings) {
			this.svDescp.nativeElement.setAttribute('readonly', true);
			this.svAvaiFor.nativeElement.setAttribute('readonly', true);
			this.form.service_description = "";
		} else {
			this.svDescp.nativeElement.removeAttribute('readonly');
			this.svAvaiFor.nativeElement.removeAttribute('readonly');
		}
	}

	enableVoucher() {
		if(!this.form.enable_voucher_sales) {
			this.expiryPeriod.nativeElement.setAttribute('readonly', true);
		} else {
			this.expiryPeriod.nativeElement.removeAttribute('readonly');
		}
	}

	getExtraTime() {
		// if(this.form.extra_time_type !== "notime") {
		// 	this.stDuration.nativeElement.removeAttribute('readonly');
		// }
	}
}
