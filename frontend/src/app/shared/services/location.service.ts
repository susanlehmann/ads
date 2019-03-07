import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

@Injectable()
export class LocationsService {
	private baseUrl = environment.baseUrl;

	constructor(private http: HttpClient) { }

	listLocation(id_client: any) {
		return this.http.post<any>(this.baseUrl + '/user/setup/location/list-location', {id : id_client});
	}

	createLocation(location: any) {
		return this.http.post<any>(this.baseUrl + '/user/setup/location/create-location', location);
	}

	updateLocation(location: any) {
		return this.http.post<any>(this.baseUrl + '/user/setup/location/update-location', location);
	}

	removeLocation(id_location: any) {
		return this.http.post<any>(this.baseUrl + '/user/setup/location/delete-location', {id : id_location});
	}
	
}