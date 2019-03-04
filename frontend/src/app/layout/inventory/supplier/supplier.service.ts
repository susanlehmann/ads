import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpcallService } from '../../../shared/services/httpcall.service';
import 'rxjs/add/operator/map';

@Injectable()
export class SupplierService {

    //const API_URL = environment.apiUrl;
    baseUrl: string;
    currentUserId = JSON.parse(localStorage.getItem('user')).id;

  constructor(
      private _http: HttpClient,
      private httpService: HttpcallService,
    ) {
        this.baseUrl = this.httpService.getBaseUrl();
    }

    getList() {
        return this._http.post(`${this.baseUrl}/user/inventory/supplier/list-supplier`, {id : this.currentUserId});
    }

    findById(id) {
        return this._http.post(`${this.baseUrl}/user/inventory/supplier/show-supplier`,{id : id});
    }

    add(supplier) {
        supplier.ownerId = this.currentUserId;
        return this._http.post(`${this.baseUrl}/user/inventory/supplier/create-supplier`, supplier);
    }

    update(supplier) {
        supplier.ownerId = this.currentUserId;
        return this._http.post(`${this.baseUrl}/user/inventory/supplier/update-supplier`, supplier);
    }

    deleteSupplier(id) {
        return this._http.post(`${this.baseUrl}/user/inventory/supplier/delete-supplier`, {'id': id});
    }
    searchSupplier(query){
      query.ownerId = this.currentUserId;
      return this._http.post(`${this.baseUrl}/user/inventory/supplier/search-supplier`, query);
    }
}
