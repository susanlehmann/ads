import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesComponent } from './sales.component';
import { DailySalesComponent } from './daily-sales/daily-sales.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { VouchersComponent } from './vouchers/vouchers.component';

const routes: Routes = [
	{
		path: '',
		component: SalesComponent,
		data : { title: 'Sales' },
		children: [
			{
				path: '',
				redirectTo: 'daily-sales',
				component: DailySalesComponent,
				data : { title: 'Sales' }
			},
			{
				path: 'daily-sales',
				component: DailySalesComponent,
				data : { title: 'Sales' }
			},
			{
				path: 'appointments',
				component: AppointmentsComponent,
				data : { title: 'Sales' }
			},
			{
				path: 'invoices',
				component: InvoicesComponent,
				data : { title: 'Sales' }
			},
			{
				path: 'vouchers',
				component: VouchersComponent,
				data : { title: 'Sales' }
			}
		]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
