import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
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

  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userService.getListUser().subscribe(
      success => {
        console.log(success);
      },
      error => {
        console.log(error);
      }
      );
	}

}
