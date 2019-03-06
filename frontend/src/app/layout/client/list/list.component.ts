import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../shared/services/user.service';
import { ExcelService } from '../../../shared/services/export.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
	loading: boolean;
	clients: any;
	client: any = {};
	numberList: number;
	download: boolean = false;
	closeResult: string;

	constructor(
		private http: HttpClient,
		private userService: UserService,
		private route: Router,
		private excel: ExcelService,
		private modalService: NgbModal
	) { }

	ngOnInit() {
		this.getUser();
	}

	getUser() {
		this.client.getuser = JSON.parse(localStorage.getItem('user'));
		this.userService.getListUser(this.client).subscribe(
			success => {
				this.clients = success;
				this.numberList = this.clients.user.length;
			},
			error => {
				console.log(error);
			}
		);
	}

	openImport(content) {
		this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
	}

	private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }

	addNewClient() {
		this.route.navigateByUrl('clients/add');
	}

	searchClient(event) {
		const search: any = {};
		Object.assign(search, { 'getuser': JSON.parse(localStorage.getItem('user')), 'name_user': event.target.value});
		this.userService.searchUser(search).subscribe(
			success => {
				this.clients = success;
				this.numberList = this.clients.user.length;
			},
			error => {
				console.log(error);
			}
		);
	}

	exportExcel(type) {
		this.download = true;
		var arr: any = [];
		for(var i = 0; i < this.clients.user.length; i++) {
			var gender = "";
			var accept_marketing = "";
			if(this.clients.user[i].gender == 1) {
				gender = "Male";
			} else if (this.clients.user[i].gender == 2) {
				gender = "Female";
			} else {
				gender = "Unknown";
			}

			if(this.clients.user[i].accepts_notifications == 1) {
				accept_marketing = "Yes";
			} else {
				accept_marketing = "No";
			}

			if(this.clients.user[i].status === 1) {
				arr.push({
					'Client Id': this.clients.user[i].id,
					'First Name': this.clients.user[i].firstName,
					'Last Name': this.clients.user[i].lastName,
					'Name': this.clients.user[i].firstName + ' ' + this.clients.user[i].lastName,
					'Blocked': 'No',
					'Block Reason': this.clients.user[i].block_reason,
					'Gender': gender,
					'Mobile Number': this.clients.user[i].phone,
					'Telephone': this.clients.user[i].tele_phone,
					'Email': this.clients.user[i].email,
					'Accepts Marketing': accept_marketing,
					'Address': this.clients.user[i].address,
					'City': this.clients.user[i].city,
					'State': this.clients.user[i].state,
					'Post Code': this.clients.user[i].zip_postcode,
					'Date of Birth': this.clients.user[i].birthday,
					'Added': this.clients.user[i].created_at,
				});
			} else {
				arr.push({
					'Client Id': this.clients.user[i].id,
					'First Name': this.clients.user[i].firstName,
					'Last Name': this.clients.user[i].lastName,
					'Name': this.clients.user[i].firstName + ' ' + this.clients.user[i].lastName,
					'Blocked': 'Yes',
					'Block Reason': this.clients.user[i].block_reason,
					'Gender': gender,
					'Mobile Number': this.clients.user[i].phone,
					'Telephone': this.clients.user[i].tele_phone,
					'Email': this.clients.user[i].email,
					'Accepts Marketing': accept_marketing,
					'Address': this.clients.user[i].address,
					'City': this.clients.user[i].city,
					'State': this.clients.user[i].state,
					'Post Code': this.clients.user[i].zip_postcode,
					'Date of Birth': this.clients.user[i].birthday,
					'Added': this.clients.user[i].created_at,
				});
			}
		}
		if(type == 'excel') {
			this.excel.exportAsExcelFile(arr, 'client_list');
		} else if (type == 'csv') {
			this.excel.exportAsCSVFile(arr, 'client_list');
		}
		this.download = false;
	}
}
