import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminSettingsComponent } from './admin-settings.component';
import { ServiceTypeComponent } from './service-type/service-type.component';
import { BusinessTypeComponent } from './business-type/business-type.component';
import { PageComponent } from './page/page.component';
const routes: Routes = [
	{
		path: '',
		component: AdminSettingsComponent,
		data: {
			title: 'Administrator'
		},
		children: [
			{
				path: '',
				component: PageComponent
			},
			{
				path: 'service-type',
				component: ServiceTypeComponent,
				data: {
					title: 'Service Type'
				}
			},
			{
				path: 'business-type',
				component: BusinessTypeComponent,
				data: {
					title: 'Business Type'
				}
			}
		]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminSettingsRoutingModule { }
