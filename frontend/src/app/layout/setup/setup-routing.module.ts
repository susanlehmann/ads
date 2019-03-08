import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetupComponent } from './setup.component';
import { LocationComponent } from './locations/locations.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { PageComponent } from './page/page.component';
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
			}
		]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupRoutingModule { }
