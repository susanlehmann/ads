import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

@Injectable()
export class AppointmentService {
	private baseUrl = environment.baseUrl;

	constructor(private http: HttpClient) { }

	createAppointment(data: any) {
		return this.http.post<any>(this.baseUrl + '/user/appointment/create-appoint', data);
	}
	
}