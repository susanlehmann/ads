import {Component, OnInit} from '@angular/core';
import {Route, ActivatedRoute} from '@angular/router';
import {NgbDate} from "@ng-bootstrap/ng-bootstrap";
import {NotifierService} from "angular-notifier";
import {BusinessTypeService} from "../../../shared/services/services.service";
import * as data from './../../../../assets/timezone.json';

@Component({
  selector: 'company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  form: CompanyDetail;
  mobile: any;
  business: any;
  timezone: any;
  country: any[];
  currency: any[];
  timeFomat: any[];

  constructor(
    private notifierService: NotifierService,
    private businessType: BusinessTypeService
  ) {
    this.country = [
      'Viet Nam',
      'Nhat'
    ];
    this.currency = [
      'VietNam -VND',
      'My -USD'
    ];
    this.timeFomat = [
      '12-hours (e.g. 9:00pm)',
      '24-hours (e.g. 21:00)'
    ];
  }

  ngOnInit() {
    this.form = new CompanyDetail();
    this.timezone = data;
    this.loadBusinessType();
  }

  save() {
    this.notifierService.notify('error', ` is not a valid email`);
  }

  loadBusinessType() {
    var user = JSON.parse(localStorage.getItem('user'));
    this.businessType.listBusinessType(user.id).subscribe(
      success => {
        this.business = success;

      },
      error => {
        console.log(error);
      }
    );
  }
}

class CompanyDetail {
  id;
  description: string;
  businessName: string;
  address: string;
  website: string;
  businessType: string;
  timeFomatSelect: string;
  timezoneSelect: string;
  countrySelect: string;
  currencySelect: string;
  count: number;

  constructor() {
    this.id = 1;
    this.count = 0;
    this.description = '';
    this.businessName = '';
    this.address = '';
    this.website = '';
    this.timeFomatSelect = '12-hours (e.g. 9:00pm)';
    this.timezoneSelect = '(GMT -11:00) Midway';
    this.countrySelect = 'Viet Nam';
    this.currencySelect = 'VietNam -VND';
    this.timeFomatSelect = '12-hours (e.g. 9:00pm)';
  }
}
