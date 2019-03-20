import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../router.animations';
// import { SnotifyService } from 'ng-snotify';

import { HttpcallService } from './../../shared/services/httpcall.service';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.scss'],
  animations: [routerTransition()]
})
export class RequestResetComponent implements OnInit {
    public form :any = {};

  constructor(
      private httpcall: HttpcallService,
    //   private notify: SnotifyService
    ) { }

  ngOnInit() {
  }

  onSubmit() {
      console.log(this.form)
      this.httpcall.sendPasswordResetLink(this.form).subscribe(
          data => this.handleResponse(data),
        //   error => this.notify.error(error.error.error)
      );
  }

  handleResponse(res) {
      this.form.email = null;

  }

}
