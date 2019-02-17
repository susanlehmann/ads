import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageHeaderModule } from '../../shared/modules/page-header/page-header.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ServicesComponent } from './services.component';
import { NgxLoadingModule } from 'ngx-loading';
import { ServiceRoutingModule } from './service-route.module';


@NgModule({
    imports: [CommonModule, ServiceRoutingModule, PageHeaderModule,FormsModule, NgbModule, NgxLoadingModule.forRoot({})],
    declarations: [ServicesComponent]
})
export class ServiceModule { }
