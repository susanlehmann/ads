import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

@Injectable()
export class ServicesService {
	private baseUrl = environment.baseUrl;

	constructor(private http: HttpClient) { }

	getListService_Group(ownerId: any) {
		return this.http.post<any>(this.baseUrl + '/admin/service_group/list-service-group', ownerId);
	}

	createService_Group(service_group: any) {
		return this.http.post<any>(this.baseUrl + '/admin/service_group/create-service-group', service_group);
	}

	getService_GroupById(idGroup: any){
		return this.http.post<any>(this.baseUrl + '/admin/service_group/show-service-group', idGroup);
	}
	
	updateService_Group(service_group: any) {
		return this.http.post<any>(this.baseUrl + '/admin/service_group/update-service-group', service_group);
	}

	removeService_GroupById(idGroup: any){
		return this.http.post<any>(this.baseUrl + '/admin/service_group/delete-service-group', idGroup);
	}


	createService(services: any){
		return this.http.post<any>(this.baseUrl + '/user/service/create-service', services);
	}
}
