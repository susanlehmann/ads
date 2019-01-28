import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageHeaderModule } from '../../shared/modules/page-header/page-header.module';
import { InventoryRoutingModule } from './inventory-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { InventoryComponent } from './inventory.component';
import { ProductComponent } from './product/product.component';
import { BrandComponent } from './brand/brand.component';
import { NgxLoadingModule } from 'ngx-loading';
import { OrderComponent } from './order/order.component';
import { CategoryComponent } from './category/category.component';
import { SupplierComponent } from './supplier/supplier.component';
import { NewComponent } from './product/new/new.component';

@NgModule({
    imports: [CommonModule, InventoryRoutingModule, PageHeaderModule,FormsModule, NgbModule, NgxLoadingModule.forRoot({})],
    declarations: [InventoryComponent, ProductComponent, BrandComponent, OrderComponent, CategoryComponent, SupplierComponent, NewComponent]
})
export class InventoryModule { }
