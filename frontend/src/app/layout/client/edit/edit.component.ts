import { Component, OnInit } from '@angular/core';
import { Client } from '../client';
import { Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpcallService } from '../../../shared/services/httpcall.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  // add mode or update mode
  isAdd = true; 

  form: Client;

  constructor(
    private http: HttpClient,
    private httpService: HttpcallService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.form = new Client();
    this.baseUrl = this.httpService.getBaseUrl();
   }

  ngOnInit() {
    this.test();
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
      console.table(dto);
      if (this.isAdd) {
        this.add(dto);
      } else {
        this.update(dto);
      }
      }
  
    add(client): void {
      this.http.post(`${this.baseUrl}/user/customer/create_user`, client)
      .subscribe((data:any) => {
      }), err => {

      };
      }
  
    update(client) {
      this.http.post(`${this.baseUrl}/user/customer/update_user`, client)
      .subscribe((data:any) => {
      }), err => {

      };
      }
  
    delete() {
      this.http.post(`${this.baseUrl}/user/customer/delete_user`, {'id': ''})
        .subscribe((data:any) => {
            });
    }

    goBack() {
      const confirm = window.confirm('Are you sure you want to cancel?');
      if (confirm === true) {
        this.router.navigate(['client']);
      }
    }
    
}
