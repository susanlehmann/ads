import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpcallService } from '../../../shared/services/httpcall.service';
import 'rxjs/add/operator/map';

@Injectable()
export class CategoryService {

    //const API_URL = environment.apiUrl;
    baseUrl: string;
    currentCategoryId = JSON.parse(localStorage.getItem('user')).id;

  constructor(
      private _http: HttpClient,
      private httpService: HttpcallService,
    ) {
        this.baseUrl = this.httpService.getBaseUrl();
    }

    getList() {
        return this._http.post(`${this.baseUrl}/user/inventory/category/list-category`, {id : this.currentCategoryId});
    }

    findById(id) {
        return this._http.post(`${this.baseUrl}/user/inventory/category/show-category`,{id : id});
    }

    add(category) {
        category.ownerId = this.currentCategoryId;
        return this._http.post(`${this.baseUrl}/user/inventory/category/create-category`, category);
    }

    update(category) {
        category.ownerId = this.currentCategoryId;
        return this._http.post(`${this.baseUrl}/user/inventory/category/update-category`, category);
    }

    deletecategory(id) {
        return this._http.post(`${this.baseUrl}/user/inventory/category/delete-category`, {'id': id});
    }
    searchCategory(content: any) {
      return this._http.post<any>(this.baseUrl + 'user/inventory/brand/search-brand', content);
    }

  getUsers(){
    return this._http.get('http://task-treking/public/api/users',{
        headers: new HttpHeaders({'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),})
    }).map(result => result);
    }
}
