import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierComponent } from './supplier.component';
import { SupplierService } from './supplier.service';

@NgModule({
    imports: [SupplierRoutingModule, SharedModule],
    declarations: [SupplierComponent],
    providers: [SupplierService]
})
export class SupplierModule { }
