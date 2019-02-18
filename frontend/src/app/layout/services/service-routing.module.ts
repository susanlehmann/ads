import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceComponent } from './service.component';
import { ListServicesComponent } from './list/list.component';
import { AddServiceComponent } from './add/add-services.component';
import { EditServiceComponent } from './edit/edit-service.component';

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
			},
			{
				path: 'edit-services/:id',
				component: EditServiceComponent
			}
		]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRoutingModule { }
