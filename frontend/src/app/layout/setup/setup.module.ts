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
import {NgxIntlTelInputModule} from "ngx-intl-tel-input";
import {ReferralSourcesComponent} from "./referral-sources/referral-sources.component";
import {AddReferralSourceComponent} from "./referral-sources/add/add-referral-source.component";
import {EditReferralSourceComponent} from "./referral-sources/edit/edit-referral-source.component";
import {PaymentTypesComponent} from "./payment-types/payment-types.component";
import {AddPaymentTypesComponent} from "./payment-types/add/add-payment-types.component";
import {EditPaymentTypesComponent} from "./payment-types/edit/edit-payment-types.component";
import { CalendarSettingsComponent } from './calendar/calendar-settings.component';
import { TaxesComponent } from './taxes/taxes.component';

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
    CompanyDetailsComponent,
    ReferralSourcesComponent,
    AddReferralSourceComponent,
    EditReferralSourceComponent,
    PaymentTypesComponent,
    AddPaymentTypesComponent,
    EditPaymentTypesComponent,
    CalendarSettingsComponent,
    TaxesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    NgbModule,
    SetupRoutingModule,
    NgxIntlTelInputModule,
    NgbModule
  ]
})
export class SetupModule { }
