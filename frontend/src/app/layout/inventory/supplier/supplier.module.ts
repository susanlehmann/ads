import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierService } from './supplier.service';

@NgModule({
    imports: [SupplierRoutingModule, SharedModule],
    providers: [SupplierService]
})
export class SupplierModule { }
