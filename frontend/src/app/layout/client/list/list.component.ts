import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpcallService } from '../../../shared/services/httpcall.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  clients = [
    {
      name: 'Giang Mai',
      number: '123456789',
      email: 'giang@mai.com',
      gender: 'unknown'
    },
    {
      name: 'Giang Mai',
      number: '123456789',
      email: 'giang@mai.com',
      gender: 'unknown'
    },
    {
      name: 'Giang Mai',
      number: '123456789',
      email: 'giang@mai.com',
      gender: 'unknown'
    },
    {
      name: 'Giang Mai',
      number: '123456789',
      email: 'giang@mai.com',
      gender: 'unknown'
    },
    {
      name: 'Giang Mai',
      number: '123456789',
      email: 'giang@mai.com',
      gender: 'unknown'
    },
  ];

  constructor(
    private http: HttpClient,
    private httpService: HttpcallService,
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
		this.http.get(`${this.httpService.getBaseUrl()}/user/customer/list-user`)
		.subscribe((clients:any) => {
        clients
        //.map(Staff.toModel)
        .sort((a, b) => {
          return a.id - b.id;
        });
		}, err => {
    });
	}

}
