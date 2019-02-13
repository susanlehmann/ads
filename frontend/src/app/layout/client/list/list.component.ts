import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  clients: any;
  client: any = {};

  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.client.getuser = JSON.parse(localStorage.getItem('user'));
    this.userService.getListUser(this.client).subscribe(
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
