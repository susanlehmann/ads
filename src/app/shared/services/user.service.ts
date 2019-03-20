import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

@Injectable()
export class UserService {
	private baseUrl = environment.baseUrl;

	constructor(private http: HttpClient) { }

	getListUser(client: any) {
		return this.http.post<any>(this.baseUrl + '/user/customer/list-user', client);
	}

	createUser(client: any) {
		return this.http.post<any>(this.baseUrl + '/user/customer/create_user', client);
	}

	getUserById(userId: any) {
		return this.http.post<any>(this.baseUrl + '/user/customer/detail_user', userId);
	}

	removeUserById(userId: any) {
		return this.http.post<any>(this.baseUrl + '/user/customer/delete_user', userId);
	}

	updateUserById(client: any) {
		return this.http.post<any>(this.baseUrl + '/user/customer/update_user', client);
	}

	searchUser(content: any) {
		return this.http.post<any>(this.baseUrl + '/user/customer/search_user', content);
	}

	blockUser(userInfo: any) {
		return this.http.post<any>(this.baseUrl + '/user/customer/block_user', userInfo);
	}

	unblockUser(userInfo: any) {
		return this.http.post<any>(this.baseUrl + '/user/customer/unblock_user', userInfo);
	}
}
