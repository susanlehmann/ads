import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

@Injectable()
export class ServiceTypeService {
	private baseUrl = environment.baseUrl;

	constructor(private http: HttpClient) { }

	listServiceType(id_client: any) {
		return this.http.post<any>(this.baseUrl + '/admin/setting/servive/list-servive', {id : id_client});
	}

	createServiceType(service: any) {
		return this.http.post<any>(this.baseUrl + '/admin/setting/servive/create-servive', service);
	}

	updateServiceType(service: any) {
		return this.http.post<any>(this.baseUrl + '/admin/setting/servive/update-servive', service);
	}

	removeServiceType(id_location: any) {
		return this.http.post<any>(this.baseUrl + '/admin/setting/servive/delete-servive', {id : id_location});
	}
	
}

@Injectable()
export class BusinessTypeService {
	private baseUrl = environment.baseUrl;

	constructor(private http: HttpClient) { }

	listBusinessType(id_client: any) {
		return this.http.post<any>(this.baseUrl + '/admin/setting/business/list-business', {id : id_client});
	}

	createBusinessType(service: any) {
		return this.http.post<any>(this.baseUrl + '/admin/setting/business/create-business', service);
	}

	updateBusinessType(service: any) {
		return this.http.post<any>(this.baseUrl + '/admin/setting/business/update-business', service);
	}

	removeBusinessType(id_location: any) {
		return this.http.post<any>(this.baseUrl + '/admin/setting/business/delete-business', {id : id_location});
	}
	
}