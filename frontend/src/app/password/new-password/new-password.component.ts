import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { routerTransition } from '../../router.animations';
// import { SnotifyService } from 'ng-snotify';

import { HttpcallService } from '../../shared/services/httpcall.service';
import { NgAnalyzeModulesHost } from '@angular/compiler';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
  animations: [routerTransition()]
})
export class NewPasswordComponent implements OnInit {
    public form :any = {};
    public error: any = {};
    public email : any;
    public token_email : any;
  constructor(
      private route: Router,
      private activatedRoute: ActivatedRoute,
      private httpcall: HttpcallService,
    //   private notify: SnotifyService
    ) { 
      this.activatedRoute.params.subscribe(params => {
        this.email = params.email;
        this.token_email = params.token;
      });
    }

  ngOnInit() {
  }

  onSubmit() {
      this.form.email = this.email;
      this.form.token_email = this.token_email;
      this.httpcall.newpassword(this.form).subscribe(
          data => this.handleResponse(data),
        //   error => this.notify.error(error.error.error)
      );
  }

  handleResponse(res) {
      this.form.password = null;

  }
  handleError(error) {
    this.error = error.error.errors;
  }
}
