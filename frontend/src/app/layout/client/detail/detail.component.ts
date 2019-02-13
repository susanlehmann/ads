import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

	clients = [
		{
			id: 1,
			name: 'Giang Mai',
			number: '123456789',
			email: 'giang@mai.com',
			gender: 'unknown'
		},
		{
			id: 2,
			name: 'Giang Mai',
			number: '123456789',
			email: 'giang@mai.com',
			gender: 'unknown'
		},
		{
			id: 3,
			name: 'Giang Mai',
			number: '123456789',
			email: 'giang@mai.com',
			gender: 'unknown'
		},
		{
			id: 4,
			name: 'Giang Mai',
			number: '123456789',
			email: 'giang@mai.com',
			gender: 'unknown'
		},
		{
			id: 5,
			name: 'Giang Mai',
			number: '123456789',
			email: 'giang@mai.com',
			gender: 'unknown'
		},
	];

	client_id: any;
	client_info: any = {};

  	constructor(private route: Router,
  		private router: ActivatedRoute) { }

	ngOnInit() {
		this.router.params.subscribe(params => {this.client_id = params.id;});
		this.loadDetails(this.client_id);
	}

	private loadDetails(id: any){
		let info = this.clients.filter(s => s.id == id);
		this.client_info = info[0];
		console.log(this.client_info);
	}

	goBack() {
		this.route.navigate(['client']);
	}

}
