import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetupComponent } from './setup.component';
import { LocationComponent } from './locations/locations.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { PageComponent } from './page/page.component';
import { ResourcesComponent } from './resources/resources.component';
import { DiscountTypeComponent} from './discount-type/discount-type.component';
import { SalesSettingsComponent } from './sales_settings/sales_settings.component'
import {ReferralSourcesComponent} from "./referral-sources/referral-sources.component";
import {PaymentTypesComponent} from "./payment-types/payment-types.component";
import { CalendarSettingsComponent } from './calendar/calendar-settings.component';
import { TaxesComponent } from './taxes/taxes.component';

const routes: Routes = [
	{
		path: '',
		component: SetupComponent,
		data : { title: 'Setup' },
		children: [
			{
				path: '',
				component: PageComponent,
				data : { title: 'Setup' }
			},
			{
				path: 'locations',
				component: LocationComponent,
				data : { title: 'Setup > Locations' }
			},
			{
				path: 'company_details',
				component: CompanyDetailsComponent,
				data : { title: 'Setup > Company Details' }
      },
      {
				path: 'resources',
				component: ResourcesComponent,
				data : { title: 'Setup > Resources' }
      },
      {
				path: 'discount-type',
				component: DiscountTypeComponent,
				data : { title: 'Setup > Discounts' }
      },
      {
				path: 'sales-settings',
				component: SalesSettingsComponent,
				data : { title: 'Setup > Sales Settings' }
      },
      {
        path: 'referral_sources',
        component: ReferralSourcesComponent,
        data : { title: 'Setup > Referral Sources' }
      },
      {
        path: 'payment_methods',
        component: PaymentTypesComponent,
        data : { title: 'Setup > Payment Types' }
      },
			{
				path: 'calendar_settings',
				component: CalendarSettingsComponent,
				data : { title: 'Setup > Calendar Settings' }
			},
			{
				path: 'taxes',
				component: TaxesComponent,
				data : { title: 'Setup > Taxes' }
			}
		]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupRoutingModule { }
