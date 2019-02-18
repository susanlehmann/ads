import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { ServicesService } from '../../../shared/services/serv.service';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.scss']
})
export class EditServiceComponent implements OnInit {

	@ViewChild('f') floatingLabelForm: NgForm;
    @ViewChild('vform') validationForm: FormGroup;
    regularForm: FormGroup;

	groupId: any;
	form: any = {};

	constructor(private activatedRoute: ActivatedRoute,
		private route: Router,
		private services: ServicesService
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
		
	}

	goBack() {
		const confirm = window.confirm('Are you sure you want to cancel?');
		if (confirm === true) {
			this.route.navigate(['services']);
		}
	}

}
