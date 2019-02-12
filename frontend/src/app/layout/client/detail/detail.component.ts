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
			id: 123,
			name: 'Giang Mai',
			number: '123456789',
			email: 'giang@mai.com',
			gender: 'unknown'
		},
		{
			id: 12375,
			name: 'Giang Mai',
			number: '123456789',
			email: 'giang@mai.com',
			gender: 'unknown'
		},
		{
			id: 12345,
			name: 'Giang Mai',
			number: '123456789',
			email: 'giang@mai.com',
			gender: 'unknown'
		},
		{
			id: 123234,
			name: 'Giang Mai',
			number: '123456789',
			email: 'giang@mai.com',
			gender: 'unknown'
		},
		{
			id: 12354,
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

}
