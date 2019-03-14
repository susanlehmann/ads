import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { SetupRoutingModule } from './setup-routing.module';
import { SetupComponent } from './setup.component';
import { LocationComponent } from './locations/locations.component';
import { AddLocationComponent } from './locations/add/add-location.component';
import { EditLocationComponent } from './locations/edit/edit-location.component';
import { PageComponent } from './page/page.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { ResourcesComponent } from './resources/resources.component';
import { DiscountTypeComponent } from './discount-type/discount-type.component'
import { SalesSettingsComponent } from './sales_settings/sales_settings.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
  	SetupComponent,
  	LocationComponent,
  	PageComponent,
  	AddLocationComponent,
    EditLocationComponent,
    ResourcesComponent,
    DiscountTypeComponent,
    SalesSettingsComponent,
    CompanyDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    NgbModule,
    SetupRoutingModule
  ]
})
export class SetupModule { }
