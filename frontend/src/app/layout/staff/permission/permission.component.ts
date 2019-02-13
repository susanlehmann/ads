import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpcallService } from '../../../shared/services/httpcall.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit {
  baseUrl: string;
  permission: any;
  permissionTypes = ['LOW', 'MEDIUM', 'HIGH']

  constructor(
  private notifierService: NotifierService,
  private http: HttpClient,
  private httpService: HttpcallService,
  ) { }

  ngOnInit() {
    this.http.post(`${this.baseUrl}/user/show_user`,{id : ''})
    .subscribe((data:any) => {

        });
  }

}
