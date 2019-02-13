import { Component, OnInit } from '@angular/core';
import { Client } from '../client';
import { Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpcallService } from '../../../shared/services/httpcall.service';
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from '../../../shared/services/user.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  // add mode or update mode
  isAdd = true; 

  form: Client;
  notificationTypes = [
    { id: 1, name: "Don't send notifications" },
    { id: 2, name: "Email" },
    { id: 3, name: "SMS" },
    { id: 4, name: "Email & SMS" },
  ];

  genders = [
    { id: 1, name: "Male" },
    { id: 2, name: "Femail" },
    { id: 3, name: "Unknown" },
  ];

  referralSources = [
    { id: 1, name: "Walk-In" },
  ];
  userId: any;
  user: any = {};

  constructor(
    private http: HttpClient,
    private httpService: HttpcallService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private notifierService: NotifierService
  ) {
    this.form = new Client();
    this.baseUrl = this.httpService.getBaseUrl();
   }

  ngOnInit() {
    this.test();
    this.route.paramMap.subscribe(params => {
      let id = params.get("id");
      //console.log(params.get("id"));
      if (id) {
        this.isAdd = false;
      } else {
        this.isAdd = true;
        this.userService.getUserById(id).subscribe(
          success => {
            console.log(success);
          },
        );
      }
    })
  }

    baseUrl: string;
  
    test() {
      const pressed = [];
      const secret = 'test';
      window.addEventListener('keyup', e => {
      pressed.push(e.key);
      pressed.splice(-secret.length - 1, pressed.length - secret.length);
      if (pressed.join('').includes(secret)) {
        this.form.mockData();
      }
      });
    }
  
    
    onSubmit(): void {
      const dto = this.form.toDto();
      const infoUser = this.form.newUser();
      //console.table(dto);
      if (this.isAdd) {
        this.addUser(infoUser);
      } else {
        this.update(dto);
      }
      }
  
    addUser(client): void {
      client.getuser = JSON.parse(localStorage.getItem('user'));
      if(this.form.acceptNotification){
        client.acceptNotification = 1;
      } else {
        client.acceptNotification = 0;
      }
      client.password = "";
      client.birthday = "2019-02-13 11:21:39";
      client.display_bookings = 0;
      client.notes = "0";
      client.address = "0";
      client.suburb = 0;
      client.city = 0;
      client.sate = 0;
      client.zip_postcode = 0;
      // this.http.post(`${this.baseUrl}/user/customer/create_user`, client)
      this.userService.createUser(client).subscribe(
        success => {
          this.notifierService.notify('success', 'A new has been successfully added');
          this.router.navigateByUrl('client');
        },
        error => {

        }
      )      
    }
  
    update(client) {

    }
  
    delete() {
      console.log(this.form.id);
      // this.http.post(`${this.baseUrl}/user/customer/delete_user`, {'id': this.form.id})
      //   .subscribe((data:any) => {
      //       });
    }

    goBack() {
      const confirm = window.confirm('Are you sure you want to cancel?');
      if (confirm === true) {
        this.router.navigate(['client']);
      }
    }
    
}
