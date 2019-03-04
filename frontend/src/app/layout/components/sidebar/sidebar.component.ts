import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpcallService } from '../../../shared/services/httpcall.service';
@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    isActive: boolean;
    collapsed: boolean;
    showMenu: string;
    pushRightClass: string;
    listusers: {};
    @Output() collapsedEvent = new EventEmitter<boolean>();

    constructor(
        private translate: TranslateService,
        public router: Router,
        private httpService: HttpcallService,
        private http: HttpClient,
        ) {
        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de/) ? browserLang : 'en');

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
        this.getUser();
        this.isActive = false;
        this.collapsed = true;
        this.showMenu = '';
        this.pushRightClass = 'push-right';

        document.addEventListener("mousedown", this.handleClick, false);
    }

    getUser() {
            return this.http.get(`${this.httpService.getBaseUrl()}/getinfo_user`)
            .subscribe((listusers:any) => {
            this.listusers = listusers.user;
            });
        }

    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.collapsedEvent.emit(this.collapsed);
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    changeLang(language: string) {
        this.translate.use(language);

        // close menu after change language (mobile only)
        document.querySelector('.sidebar.sidebar-mobile-menu').classList.add("hide");
        setTimeout(() => this.addExpandClass("languages"), 500);
    }

    onLoggedout() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedin');
        this.router.navigate(['/login']);
    }

    handleClick(e) {
        // do nothing if sidebar is hidden
        if (!document.querySelector('.sidebar')) {
            return;
        }

        if (!document.querySelector('.navbar-toggler.mobile').contains(e.target)
        && !document.querySelector('.navbar-toggler.desktop').contains(e.target)
        && !document.querySelector('.sidebar').contains(e.target)
        && document.body.classList.contains("push-right")
        && screen.width < 993
        ) {
            document.body.classList.remove("push-right");
        }

        const mobileMenu = document.querySelector('.sidebar.sidebar-mobile-menu');
        if (!mobileMenu.contains(e.target)
        && !document.querySelector('.navbar-toggler.mobile.mobile-menu').contains(e.target)
        && !mobileMenu.classList.contains("hide")) {
            mobileMenu.classList.add("hide");
        }
    }

}
