import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { _AuthService, TokenService } from '../../../shared';
import { HttpcallService } from './../../../shared/services/httpcall.service';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public pushRightClass: string;
    title: string;

    constructor(
        private translate: TranslateService, 
        public router: Router,
        public httpcall: HttpcallService,
        public auth: _AuthService,
        public token: TokenService
    ) {

        this.translate.addLangs(['en', 'vi', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|vi|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');

        this.router.events.subscribe(val => {
            if (val instanceof NavigationEnd) {
                if(val.url.split('/')[2] == undefined || val.url.split('/')[2] == "undefined") {
                    this.title = val.url.split('/')[1];
                } else {
                    if(val.url.split('/')[1] == "clients") {
                        if(val.url.split('/')[2] == "detail") {
                            this.title = val.url.split('/')[1] + " / Profile";
                        } else {
                            this.title = val.url.split('/')[1];
                        }
                    } else {
                        this.title = val.url.split('/')[1];
                    }
                }
            }
        });
    }

    ngOnInit() {
        this.pushRightClass = 'push-right';
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        if (document.querySelector('.sidebar.collapsed')) {
            dom.classList.toggle('cls');
        }
        dom.classList.toggle(this.pushRightClass);

    }

    toggleMobileMenu() {
        const dom: any = document.querySelector('.sidebar-mobile-menu');
        dom.classList.toggle('hide');
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedin');
        this.router.navigate(['/login']);
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
