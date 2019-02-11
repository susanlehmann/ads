import { Component, OnInit } from '@angular/core';
import { Client } from '../client';
import { Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpcallService } from '../../../shared/services/httpcall.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @Input() isAdd: boolean;
  form: Client;

  constructor(
    private http: HttpClient,
    private httpService: HttpcallService,
    private route: ActivatedRoute,
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
      if (this.isAdd) {
        this.addStaff(dto);
      } else {
        this.updateStaff(dto);
      }
      }
  
    addStaff(staff): void {
      this.http.post(`${this.baseUrl}/user/customer/create_user`, staff)
      .subscribe((data:any) => {
      }), err => {

      };
      }
  
    updateStaff(staff) {
      this.http.post(`${this.baseUrl}/user/customer/update_user`, staff)
      .subscribe((data:any) => {
      }), err => {

      };
      }
  
    deleteStaff() {
      this.http.post(`${this.baseUrl}/user/customer/delete_user`, {'id': ''})
        .subscribe((data:any) => {
            });
    }

    back() {
      
    }
    
}
