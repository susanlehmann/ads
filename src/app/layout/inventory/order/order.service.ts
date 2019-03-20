import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpcallService } from '../../../shared/services/httpcall.service';
import 'rxjs/add/operator/map';

@Injectable()
export class OrderService {

    //const API_URL = environment.apiUrl;
    baseUrl: string;
    currentOrderId = JSON.parse(localStorage.getItem('user')).id;

  constructor(
      private _http: HttpClient,
      private httpService: HttpcallService,
    ) {
        this.baseUrl = this.httpService.getBaseUrl();
    }

    getList() {
        return this._http.post(`${this.baseUrl}/user/inventory/order/list-order`, {id : this.currentOrderId});
    }

    findById(id) {
        return this._http.post(`${this.baseUrl}/user/inventory/order/show-order`,{id : id});
    }

    add(order) {
        order.ownerId = this.currentOrderId;
        return this._http.post(`${this.baseUrl}/user/inventory/order/create-order`, order);
    }

    update(order) {
        order.ownerId = this.currentOrderId;
        return this._http.post(`${this.baseUrl}/user/inventory/order/update-order`, order);
    }
    status(order) {
      order.ownerId = this.currentOrderId;
      return this._http.post(`${this.baseUrl}/user/inventory/order/update-status-order`, order);
    }
    deleteorder(id) {
        return this._http.post(`${this.baseUrl}/user/inventory/order/delete-order`, {'id': id});
    }

    sent_email(order) {
      return this._http.post(`${this.baseUrl}/user/inventory/order/send-email-order`, order);
    }

    export_pdf(data) {
        return this.baseUrl + '/user/inventory/order/export-pdf-order/' + data;
      }
  //getorders(){
  //    return this._http.get('http://task-treking/public/api/orders',{
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
