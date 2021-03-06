import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageHeaderModule } from '../../shared/modules/page-header/page-header.module';
import { InventoryRoutingModule } from './inventory-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataTableModule } from "angular-6-datatable";

import { InventoryComponent } from './inventory.component';
import { BrandComponent } from './brand/brand.component';
import { OrderComponent } from './order/order.component';
import { CategoryComponent } from './category/category.component';
import { SupplierComponent } from './supplier/supplier.component';
import { ListProductComponent } from './product/list-product/list-product.component';
import { ViewProductComponent } from './product/view-product/view-product.component';
import { AddSupplierComponent } from './supplier/add/add-supplier.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { BsDropdownModule } from 'ngx-bootstrap';

@NgModule({
    imports: [
    SharedModule,
    CommonModule,
    InventoryRoutingModule,
    PageHeaderModule,
    FormsModule,
    NgbModule.forRoot(),
    NgxIntlTelInputModule,BsDropdownModule.forRoot(),
    DataTableModule
    ],
    declarations: [
        InventoryComponent, 
        BrandComponent, 
        OrderComponent, 
        CategoryComponent, 
        SupplierComponent,
        ListProductComponent,
        ViewProductComponent,
        AddSupplierComponent
    ]
})
export class InventoryModule { }
