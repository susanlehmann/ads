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
import { CalendarSettingsComponent } from './calendar/calendar-settings.component';
import { TaxesComponent } from './taxes/taxes.component';

@NgModule({
  declarations: [
  	SetupComponent,
  	LocationComponent,
  	PageComponent,
  	AddLocationComponent,
    EditLocationComponent,
    CompanyDetailsComponent,
    CalendarSettingsComponent,
    TaxesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    SetupRoutingModule
  ]
})
export class SetupModule { }
