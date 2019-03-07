import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { AdminSettingsRoutingModule } from './admin-settings-routing.module';
import { AdminSettingsComponent } from './admin-settings.component';
import { ServiceTypeComponent } from './service-type/service-type.component';
import { BusinessTypeComponent } from './business-type/business-type.component';
import { AddServiceTypeComponent } from './service-type/add/add-service-type.component';
import { EditServiceTypeComponent } from './service-type/edit/edit-service-type.component';
import { PageComponent } from './page/page.component';

@NgModule({
  declarations: [
  	AdminSettingsComponent,
  	ServiceTypeComponent,
  	PageComponent,
  	AddServiceTypeComponent,
    EditServiceTypeComponent,
    BusinessTypeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    AdminSettingsRoutingModule
  ]
})
export class AdminSettingsModule { }
