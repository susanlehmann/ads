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
        return this._http.post(`${this.baseUrl}/user/staff/list-user`, {id : this.currentUserId});
    }

    findById(id) {
        return this._http.post(`${this.baseUrl}/user/staff/show_user`,{id : id});
    }

    add(staff) {
        staff.ownerId = this.currentUserId;
        return this._http.post(`${this.baseUrl}/user/staff/create_user`, staff);
    }

    update(staff) {
        staff.ownerId = this.currentUserId;
        return this._http.post(`${this.baseUrl}/user/staff/update_user`, staff);
    }

    deleteStaff(id) {
        return this._http.post(`${this.baseUrl}/user/staff/delete_user`, {'id': id});
    }


}
