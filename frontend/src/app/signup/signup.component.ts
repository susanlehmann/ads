import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { _AuthService } from './../shared/services/auth.service';
import { TokenService } from './../shared/services/token.service';
import { HttpcallService } from './../shared/services/httpcall.service';


@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {

    public form: any = {};

    public error: any = {};


    constructor(
        private httpcall: HttpcallService,
        private Token: TokenService,
        private router: Router,
        private auth: _AuthService

    ) {}

    ngOnInit() {}

    onSubmit() {
        // console.log(this.form);
        this.httpcall.signup(this.form).subscribe(
          data => this.handleResponse(data),
          error => this.handleError(error)
        );
      }

      handleResponse(data) {

        this.Token.handle(data.access_token, name);
        this.auth.changeAuthStatus(true);
        this.router.navigateByUrl('/login');

      }

      handleError(error) {
        this.error = error.error.errors;
    }
}
