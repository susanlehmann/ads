import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { routerTransition } from '../router.animations';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core'

import { AuthService } from '../shared/services/auth.service';
import { TokenService } from '../shared/services/token.service';
import { HttpcallService } from '../shared/services/httpcall.service';
import { ngxLoadingAnimationTypes, NgxLoadingComponent } from 'ngx-loading';
// import {SnotifyService, SnotifyPosition, SnotifyToastConfig} from 'ng-snotify';
const PrimaryWhite = '#ffffff';
const SecondaryGrey = '#ccc';
const PrimaryRed = '#dd0031';
const SecondaryBlue = '#006ddd';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
 // public style = 'material';
 // public title = 'Snotify title!';
 // public body = 'Lorem ipsum dolor sit amet!';
 // public timeout = 3000;
 // public position: SnotifyPosition = SnotifyPosition.rightBottom;
 // public progressBar = true;
 // public closeClick = true;
 // public newTop = true;
 // public filterDuplicates = false;
 // public backdrop = -1;
 // public dockMax = 8;
 // public blockMax = 6;
 // public pauseHover = true;
 // public titleMaxLength = 15;
 // public bodyMaxLength = 80;

  @ViewChild('ngxLoading') ngxLoadingComponent: NgxLoadingComponent;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public primaryColour = PrimaryRed;
  public secondaryColour = SecondaryBlue;
  public config = { animationType: ngxLoadingAnimationTypes.none, primaryColour: this.primaryColour, secondaryColour: this.secondaryColour, tertiaryColour: this.primaryColour, backdropBorderRadius: '3px' };
    public form = {
        email: null,
        password: null
    };

    public error = null;
    public loading = false;
    constructor(
        private translate: TranslateService,
        public router: Router,
        private httpcall: HttpcallService,
        private Token: TokenService,
        private Auth: AuthService,
        // private snotifyService: SnotifyService
        ) {
            this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
            this.translate.setDefaultLang('en');
            const browserLang = this.translate.getBrowserLang();
            this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');
    }

  // getConfig(): SnotifyToastConfig {
  //   this.snotifyService.setDefaults({
  //     global: {
  //       newOnTop: this.newTop,
  //       maxAtPosition: this.blockMax,
  //       maxOnScreen: this.dockMax,
  //       filterDuplicates: this.filterDuplicates
  //     }
  //   });
  //   return {
  //     bodyMaxLength: this.bodyMaxLength,
  //     titleMaxLength: this.titleMaxLength,
  //     backdrop: this.backdrop,
  //     position: this.position,
  //     timeout: this.timeout,
  //     showProgressBar: this.progressBar,
  //     closeOnClick: this.closeClick,
  //     pauseOnHover: this.pauseHover
  //   };
  // }

    ngOnInit() {}

    onLoggedin() {
        // localStorage.setItem('isLoggedin', 'true');
    }

    onSubmit() {
        // localStorage.setItem('isLoggedin', 'true');
        //console.log(this.form);
        this.loading = true;
        this.httpcall.login(this.form).subscribe(
          data => this.handleResponse(data),
          error => this.handleError(error)
        );
      }

      handleResponse(data) {
        this.Token.handle(data.access_token, data.user);
        this.Auth.changeAuthStatus(true);
        // this.snotifyService.success(this.body, this.title, this.getConfig());
        localStorage.setItem('isLoggedin', 'true');
        this.loading = true;
        this.router.navigateByUrl('/dashboard');
      }

      handleError(error) {
        this.error = error.error.error;
    }


}
