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
        data: { title: 'Services'},
		children: [
			{
				path: '',
				component: ListServicesComponent, 
        		data: { title: 'Services'}
			},
			{
				path: 'add-services',
				component: AddServiceComponent, 
        		data: { title: 'Services'}
			},
			{
				path: 'edit-services/:id',
				component: EditServiceComponent, 
        		data: { title: 'Services'}
			}
		]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRoutingModule { }
