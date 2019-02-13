import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

@Injectable()
export class UserService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getListUser() {
    return this.http.get(this.baseUrl + '/user/customer/list-user');
  }

  createUser(client: any) {
  	return this.http.post(this.baseUrl + '/user/customer/create_user', client);
  }
}
