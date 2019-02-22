import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

@Injectable()
export class HttpcallService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getBaseUrl() {
    return this.baseUrl;
  }


  signup(data) {
    return this.http.post(`${this.baseUrl}/signup`, data);
  }

  getuser() {
    return this.http.get(`${this.baseUrl}/user/staff/list-user`);
  }

  login(data) {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  sendPasswordResetLink(data) {
    return this.http.post(this.baseUrl + '/auth/password/email', data);
  }

  newpassword(data) {
    return this.http.post(this.baseUrl + '/password/reset', data);
  }

}
