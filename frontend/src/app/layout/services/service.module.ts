import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServiceRoutingModule } from './service-routing.module';
import { ServiceComponent } from './service.component';
import { ListServicesComponent } from './list/list.component';
import { NgxLoadingModule } from 'ngx-loading';
import { AddServiceComponent } from './add/add-services.component';
import { EditServiceComponent } from './edit/edit-service.component';
import { AddServiceGroupComponent } from './service-group/add/add-service-group.component';
import { ListServiceGroupComponent } from './service-group/list/list-service-group.component';
import { EditServiceGroupComponent } from './service-group/edit/edit-service-group.component';

@NgModule({
  declarations: [
  	ServiceComponent,
  	ListServicesComponent,
  	AddServiceGroupComponent,
    ListServiceGroupComponent,
    EditServiceGroupComponent,
    AddServiceComponent,
    EditServiceComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ServiceRoutingModule,
    TranslateModule,
    NgxLoadingModule,
    NgbModule.forRoot()
  ]
})
export class ServiceModule { }
