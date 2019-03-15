import {Component, OnInit} from '@angular/core';
import {Route, ActivatedRoute} from '@angular/router';
import {NgbDate} from "@ng-bootstrap/ng-bootstrap";
import {NotifierService} from "angular-notifier";
import {BusinessTypeService} from "../../../shared/services/services.service";
import * as data from './../../../../assets/timezone.json';
import * as countryCurrency from './../../../../assets/country_by_currency.json';
import {Setup_company_detailService} from "../setup_company_detail.service";

@Component({
  selector: 'company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  form: CompanyDetail = new CompanyDetail();
  data: any;
  dataCompany: any;
  mobile: any;
  business: any;
  timezone: any;
  countryCurrency: any[];
  country: any[];
  currency: any[];
  timeFomat: any[];

  constructor(
    private notifierService: NotifierService,
    private businessType: BusinessTypeService,
    private setupService: Setup_company_detailService
  ) {
    this.timeFomat = [{
      'value': '1',
      'text': '12-hours (e.g. 9:00pm)'
    },
      {
        'value': '2',
        'text': '24-hours (e.g. 21:00)'
      }
    ];
  }

  getCurreny() {
    let value = countryCurrency.filter(x => x.country == this.form.countrySelect);
    if (value.length > 0) {
      this.form.currencySelect = value[0].country;
    } else {
      this.form.currencySelect = "";
    }
  }

  saveCompany() {
    // console.log(this.mobile);
    this.form.contact_number = this.mobile.internationalNumber;
    this.setupService.save(this.form).subscribe(
      success => {
        this.notifierService.notify('success', 'Update successfully');
      },
      error => {
        console.log(error);
      }
    );
  }

  getCompanyDetail() {
    this.setupService.getListCompanyDetail().subscribe(
      success => {
        this.data = success;
        this.dataCompany = this.data.caompanydetail;
        if (this.dataCompany != null)
          this.mapCompany(this.dataCompany);
      },
      error => {
        console.log(error);
      }
    );
  }

  mapCompany(data: any) {
    this.form.businessName = data.company_name;
    this.form.description = data.company_desscription ? data.company_desscription : '';
    this.form.address = data.company_address;
    this.form.website = data.company_website;
    this.mobile = data.company_contac_number;
    this.form.businessType = data.id_business_type;
    this.form.timezoneSelect = data.company_timezone;
    this.form.timeFomatSelect = data.company_timeformat;
    this.form.countrySelect = data.company_countruy;
    console.log(this.mobile);
    this.getCurreny();
  }

  ngOnInit() {
    this.countryCurrency = countryCurrency;
    this.timezone = data;
    this.loadBusinessType();
    this.getCompanyDetail();
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
  contact_number: string;
  businessType: number;
  timeFomatSelect: number;
  timezoneSelect: string;
  countrySelect: string;
  currencySelect: string;
  count: number;

  constructor() {
    this.id = 1;
    this.count = 0;
    this.description = '';
    this.businessName = '';
    this.businessType = 0;
    this.address = '';
    this.website = '';
    this.timeFomatSelect = 0;
    this.timezoneSelect = '';
    this.countrySelect = '';
    this.currencySelect = '';
    this.contact_number = '';
  }
}
