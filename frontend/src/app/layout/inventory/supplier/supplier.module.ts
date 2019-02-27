import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierService } from './supplier.service';
import { DataTableModule } from "angular-6-datatable";
@NgModule({
    imports: [SupplierRoutingModule, SharedModule, DataTableModule],
    providers: [SupplierService]
})
export class SupplierModule { }
