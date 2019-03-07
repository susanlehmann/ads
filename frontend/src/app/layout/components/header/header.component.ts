import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { _AuthService, TokenService, TitleService } from '../../../shared';
import { HttpcallService } from './../../../shared/services/httpcall.service';
import { Title } from '@angular/platform-browser';

const APP_TITLE = 'Kyrio';
const SEPARATOR = ' > ';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public pushRightClass: string;
    title: string;
    title_path: string;
    showPath: boolean = false;
    _path: any;

    constructor(
        private translate: TranslateService, 
        public router: Router,
        public route: ActivatedRoute,
        public titleService: TitleService,
        public httpcall: HttpcallService,
        public auth: _AuthService,
        public token: TokenService,
        private _title: Title
    ) {
        this.translate.addLangs(['en', 'vi', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|vi|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');
        this.titleService.init().subscribe(
            event => { 
                this._title.setTitle(APP_TITLE + ' | ' + event);
                if(event.search(SEPARATOR) > 0){
                    var str = event.split(SEPARATOR);
                    this.title = str[0];
                    this.title_path = str[1];
                    this.showPath = true;
                } else {
                    this.title = event;
                    this.showPath = false;
                }
            }
        );
        this.router.events.subscribe(val => {
            if (val instanceof NavigationEnd) {
                this._path = val.url.split('/')[1];
            }
        });
    }

    routerBack(event) {
        this.router.navigateByUrl(event);
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
