import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { AuthService, TokenService } from '../../../shared';
import { HttpcallService } from './../../../shared/services/httpcall.service';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public pushRightClass: string;

    constructor(
        private translate: TranslateService, 
        public router: Router,
        public httpcall: HttpcallService,
        public auth: AuthService,
        public token: TokenService
    ) {

        this.translate.addLangs(['en', 'vi', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|vi|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
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
        if (document.querySelector('.sidebar.collapsed')) {
            return;
        }
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);

        if (!document.querySelector('.sidebar-mobile-menu.hide')) {
            document.querySelector('.sidebar-mobile-menu').classList.add('hide');
        }
    }

    toggleMobileMenu() {
        const dom: any = document.querySelector('.sidebar-mobile-menu');
        dom.classList.toggle('hide');
        if (document.querySelector('body.push-right')) {
            document.querySelector('body').classList.remove(this.pushRightClass);
        }
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('isLoggedin');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
