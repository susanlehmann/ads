import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpcallService } from '../../../shared/services/httpcall.service';
import 'rxjs/add/operator/map';

@Injectable()
export class BrandService {

    //const API_URL = environment.apiUrl;
    baseUrl: string;
    currentBrandId = JSON.parse(localStorage.getItem('user')).id;

  constructor(
      private _http: HttpClient,
      private httpService: HttpcallService,
    ) {
        this.baseUrl = this.httpService.getBaseUrl();
    }

    getList() {
        return this._http.post(`${this.baseUrl}/user/inventory/brand/list-brand`, {id : this.currentBrandId});
    }

    findById(id) {
        return this._http.post(`${this.baseUrl}/user/inventory/brand/show-brand`,{id : id});
    }

    add(brand) {
        brand.ownerId = this.currentBrandId;
        return this._http.post(`${this.baseUrl}/user/inventory/brand/create-brand`, brand);
    }

    update(brand) {
        brand.ownerId = this.currentBrandId;
        return this._http.post(`${this.baseUrl}/user/inventory/brand/update-brand`, brand);
    }

    deletebrand(id) {
        return this._http.post(`${this.baseUrl}/user/inventory/brand/delete-brand`, {'id': id});
    }

  //getBrands(){
  //    return this._http.get('http://task-treking/public/api/brands',{
  //        headers: new HttpHeaders({'Accept': 'application/json',
  //            'Authorization': 'Bearer ' + localStorage.getItem('token'),})
  //    }).map(result => result);
  //}
  getUsers(){
    return this._http.get('http://task-treking/public/api/users',{
        headers: new HttpHeaders({'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),})
    }).map(result => result);
    }
}
