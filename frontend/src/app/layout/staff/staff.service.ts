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

    sortStaff(sortedList: any[]) {
        return this._http.post(`${this.baseUrl}/user/staff/sort_user`, {listStaff: sortedList});
    }

    searchStaff(query: string) {
        return this._http.post(`${this.baseUrl}/user/staff/search_user`, {name_user : query, id:this.currentUserId});
    }

    resetPassword(email) {
        return this._http.post(`${this.baseUrl}/auth/password/email`, {'email': email});
    }

    verifyEmail(email) {
        return this._http.post(`${this.baseUrl}/send-verify`, {'email': email});
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
        return this._http.post(`${this.baseUrl}/user/workinghour/list-workinghour`, {ownerId : this.currentUserId});
    }

    deleteScheduleById(id) {
        return this._http.post(`${this.baseUrl}/user/workinghour/delete-workinghour`, {id: id});
    }

    addSchedule(schedule) {
        schedule.ownerId = this.currentUserId;
        return this._http.post(`${this.baseUrl}/user/workinghour/create-workinghour`, schedule);
    }

    updateSchedule(schedule) {
        schedule.ownerId = this.currentUserId;
        return this._http.post(`${this.baseUrl}/user/workinghour/update-workinghour`, schedule);
    }
}
