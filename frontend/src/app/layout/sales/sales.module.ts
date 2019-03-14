import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SalesRoutingModule } from './sales-routing.module';
import { SalesComponent } from './sales.component';
import { DailySalesComponent } from './daily-sales/daily-sales.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { VouchersComponent } from './vouchers/vouchers.component';
import { LocationsService } from './../../shared/services/location.service';

@NgModule({
  declarations: [
    SalesComponent,
    DailySalesComponent,
    AppointmentsComponent,
    InvoicesComponent,
    VouchersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    SalesRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [ LocationsService ]
})
export class SalesModule { }
