import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../shared/services/user.service';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
	loading: boolean;
	clients: any;
	client: any = {};

	constructor(
		private http: HttpClient,
		private userService: UserService,
		private route: Router,
	) { }

	ngOnInit() {
		this.getUser();
	}

	getUser() {
		this.startLoading();
		this.client.getuser = JSON.parse(localStorage.getItem('user'));
		this.userService.getListUser(this.client).subscribe(
			success => {
				this.stopLoading();
				this.clients = success;
				console.log(success);
			},
			error => {
				this.stopLoading();
				console.log(error);
			}
		);
	}

	addNewClient() {
		this.route.navigateByUrl('client/add');
	}

	startLoading(): void {
		this.loading = true;
	}

	stopLoading(): void {
		this.loading = false;
	}

	searchClient(event) {
		this.userService.searchUser(event.target.value).subscribe(
			success => {
				this.clients = success;
				console.log(success);
			},
			error => {
				console.log(error);
			}
		);
	}
}
