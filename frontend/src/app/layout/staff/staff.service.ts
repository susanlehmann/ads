import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpcallService } from '../../shared/services/httpcall.service';
import 'rxjs/add/operator/map';

@Injectable()
export class StaffService {

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


    // closed date
    getListClosedDate() {
        return this._http.post(`${this.baseUrl}/user/closed_date/list-close-date`, {ownerId : this.currentUserId});
    }

    findClosedDateById(id: string) {
        return this._http.post(`${this.baseUrl}/user/closed_date/show-close-date`, {id: id});
    }

    deleteClosedDateById(id: string) {
        return this._http.post(`${this.baseUrl}/user/closed_date/delete-close-date`, {id: id});
    }

    addClosedDate(closedDate) {
        closedDate.ownerId = this.currentUserId;
        return this._http.post(`${this.baseUrl}/user/closed_date/create-close-date`, closedDate);
    }

    updateClosedDate(closedDate) {
        closedDate.ownerId = this.currentUserId;
        return this._http.post(`${this.baseUrl}/user/closed_date/update-close-date`, closedDate);
    }

    // schedule
    getListSchedule() {
        return this._http.post(`${this.baseUrl}/user/closed_date/list-close-date`, {ownerId : this.currentUserId});
    }

    findScheduleById(id: string) {
        return this._http.post(`${this.baseUrl}/user/closed_date/show-close-date`, {id: id});
    }

    deleteScheduleById(id: string) {
        return this._http.post(`${this.baseUrl}/user/closed_date/delete-close-date`, {id: id});
    }

    addSchedule(closedDate) {
        closedDate.ownerId = this.currentUserId;
        return this._http.post(`${this.baseUrl}/user/closed_date/create-close-date`, closedDate);
    }

    updateCSchedule(closedDate) {
        closedDate.ownerId = this.currentUserId;
        return this._http.post(`${this.baseUrl}/user/closed_date/update-close-date`, closedDate);
    }
}
