import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpClientModule  } from '@angular/common/http';
import { HttpcallService } from '../../shared/services/httpcall.service';
import 'rxjs/add/operator/map';

@Injectable()
export class service_groupService {

    //const API_URL = environment.apiUrl;
    baseUrl: string;
    currentGroupId = JSON.parse(localStorage.getItem('service_group'));

  constructor(
      private _http: HttpClient,
      private httpService: HttpcallService,
    ) {
        this.baseUrl = this.httpService.getBaseUrl();
    }

    getList() {
        return this._http.post(`${this.baseUrl}/admin/service_group/list-service-group`, {id : this.currentGroupId.id});
    }

    findById(id) {
        return this._http.post(`${this.baseUrl}/admin/service_group/show-service-group`,{id : id});
    }

    add(service_group) {
        service_group.ownerId = this.currentGroupId.id;
        return this._http.post(`${this.baseUrl}/admin/service_group/create-service-group`, service_group);
    }

    update(service_group) {
        service_group.ownerId = this.currentGroupId;
        return this._http.post(`${this.baseUrl}/admin/service_group/update-service-group`, service_group);
    }

    deleteservice_group(id) {
        return this._http.post(`${this.baseUrl}/admin/service_group/delete-service-group`, {'id': id});
    }

}
