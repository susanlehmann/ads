import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportComponent } from './report.component';
import { SaleComponent } from './sale/sale.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { VoucherComponent } from './voucher/voucher.component';

const routes: Routes = [{
  path: '', component: ReportComponent, children: [
      {
          path: '',   redirectTo: 'sale', pathMatch: 'full',
      },
      {
          path: 'sale',
          component: SaleComponent
      },
      {
          path: 'appointment',
          component: AppointmentComponent
      },
      {
          path: 'invoice',
          component: InvoiceComponent
      },
      {
          path: 'voucher',
          component: VoucherComponent
      },
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
