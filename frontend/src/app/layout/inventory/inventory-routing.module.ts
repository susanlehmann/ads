import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InventoryComponent } from './inventory.component';
import { BrandComponent } from './brand/brand.component';
import { OrderComponent } from './order/order.component';
import { CategoryComponent } from './category/category.component';
import { SupplierComponent } from './supplier/supplier.component';
import { ListProductComponent } from './product/list-product/list-product.component';
import { ViewProductComponent } from './product/view-product/view-product.component';

const routes: Routes = [
    {
      path: '', component: InventoryComponent, 
      data: {title : 'Inventory'},
      children: [
        {
          path: '',   redirectTo: 'products', pathMatch: 'full',
          data: {title : 'Inventory'}
        },
        {
          path: 'products',
          component: ListProductComponent, 
          data: {title : 'Inventory'}
        },
        {
          path: 'products/:id/view',
          component: ViewProductComponent, 
          data: {title : 'Inventory'}
        },
        {
          path: 'orders',
          component: OrderComponent, 
          data: {title : 'Inventory'}
        },
        {
          path: 'brands',
          component: BrandComponent, 
          data: {title : 'Inventory'}
        },
        {
          path: 'categories',
          component: CategoryComponent, 
          data: {title : 'Inventory'}
        },
        {
          path: 'supplier',
          component: SupplierComponent, 
          data: {title : 'Inventory'}
        },
      ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InventoryRoutingModule { }
