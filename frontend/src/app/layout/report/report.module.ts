import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { SaleComponent } from './sale/sale.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { VoucherComponent } from './voucher/voucher.component';

@NgModule({
  declarations: [ReportComponent, SaleComponent, AppointmentComponent, InvoiceComponent, VoucherComponent],
  imports: [
    CommonModule,
    ReportRoutingModule
  ]
})
export class ReportModule { }
