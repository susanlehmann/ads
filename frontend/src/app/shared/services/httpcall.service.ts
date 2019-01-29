import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpcallService {
  private baseUrl = 'http://localhost:8000/api';
  private Url = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  getBaseUrl() {
    return this.baseUrl;
  }

  createuser(data) {
    return this.http.post(`${this.Url}/signup`, data);
  }


  signup(data) {
    return this.http.post(`${this.baseUrl}/signup`, data);
  }


  login(data) {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  sendPasswordResetLink(data) {
    return this.http.post(`${this.baseUrl}/sendPasswordResetLink`, data);
  }

}
