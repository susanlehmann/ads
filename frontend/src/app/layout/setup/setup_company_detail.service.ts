import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HttpcallService} from '../../shared/services/httpcall.service';
import 'rxjs/add/operator/map';

@Injectable()
export class Setup_company_detailService {

  baseUrl: string;
  currentUserId = JSON.parse(localStorage.getItem('user')).id;

  constructor(
    private _http: HttpClient,
    private httpService: HttpcallService,
  ) {
    this.baseUrl = this.httpService.getBaseUrl();
  }

  getListCompanyDetail() {
    return this._http.post(`${this.baseUrl}/user/setup/companydetail/list-companydetail`, {id: this.currentUserId});
  }

  toDto(company): any {
    return {
      ownerId: this.currentUserId,
      id_business_type: company.businessType,
      company_name: company.businessName,
      company_desscription: company.description,
      company_address: company.address,
      company_website: company.website,
      company_contac_number: company.contact_number,
      company_timezone: company.timezoneSelect,
      company_timeformat: company.timeFomatSelect,
      company_countruy: company.countrySelect,
      company_currency: company.currencySelect
    };
  }
  save(company) {
    const companyDetail = this.toDto(company);
    return this._http.post(`${this.baseUrl}/user/setup/companydetail/update-companydetail`, companyDetail);
  }
}
