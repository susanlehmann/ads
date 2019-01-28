import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class PaginationComponent {
    defaultPagination: number;
    advancedPagination: number;
    paginationSize: number;
    disabledPagination: number;
    isDisabled: boolean;

    constructor() {
        this.defaultPagination = 1;
        this.advancedPagination = 1;
        this.paginationSize = 1;
        this.disabledPagination = 1;
        this.isDisabled = true;
    }

    toggleDisabled() {
        this.isDisabled = !this.isDisabled;
    }
}
