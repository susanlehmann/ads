import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceComponent } from './service.component';
import { ListServicesComponent } from './list/list.component';
import { AddServiceComponent } from './add/add-services.component';

const routes: Routes = [
	{
		path: '', 
		component: ServiceComponent, 
		children: [
			{
				path: '',
				component: ListServicesComponent
			},
			{
				path: 'add-services',
				component: AddServiceComponent
			}
		]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRoutingModule { }
