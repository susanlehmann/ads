import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetupComponent } from './setup.component';
import { LocationComponent } from './locations/locations.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { PageComponent } from './page/page.component';
import { ResourcesComponent } from './resources/resources.component';
import { DiscountTypeComponent} from './discount-type/discount-type.component';
import { SalesSettingsComponent } from './sales_settings/sales_settings.component'
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
      }
		]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupRoutingModule { }
