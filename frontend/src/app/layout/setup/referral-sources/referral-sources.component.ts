import {Component, OnInit} from '@angular/core';
import {NotifierService} from "angular-notifier";
import {BusinessTypeService} from "../../../shared/services/services.service";
import * as data from './../../../../assets/timezone.json';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'referral-sources',
  templateUrl: './referral-sources.component.html',
  styleUrls: ['./referral-sources.component.scss']
})
export class ReferralSourcesComponent implements OnInit {
  form: CompanyDetail;
  inputReferral: any;
  mobile: any;
  business: any;
  timezone: any;
  country: any[];

  constructor(
    private modalService: NgbModal
  ) {
  }

  ngOnInit() {

  }

  addReferral(content) {
    this.modalService.open(content, { windowClass: 'container-modal' });
  }
  editReferral(content, data) {
    this.inputReferral = data;
    this.modalService.open(content, { windowClass: 'container-modal' });
  }

}

class CompanyDetail {
  id;
  businessName: string;
  address1: string;
  businessType: string;
  timeFomatSelect: string;
  timezoneSelect: string;
  countrySelect: string;
  currencySelect: string;

  constructor() {
    this.id = 1;
    this.businessName = '';
    this.address1 = '';
    this.timeFomatSelect = '12-hours (e.g. 9:00pm)';
    this.timezoneSelect = '(GMT -11:00) Midway';
    this.countrySelect = 'Viet Nam';
    this.currencySelect = 'VietNam -VND';
    this.timeFomatSelect = '12-hours (e.g. 9:00pm)';
  }
}
