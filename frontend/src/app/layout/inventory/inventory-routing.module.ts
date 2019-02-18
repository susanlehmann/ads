import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InventoryComponent } from './inventory.component';
import { ProductComponent } from './product/product.component';
import { BrandComponent } from './brand/brand.component';
import { OrderComponent } from './order/order.component';
import { CategoryComponent } from './category/category.component';
import { SupplierComponent } from './supplier/supplier.component';
import { NewComponent } from './product/new/new.component';
import { NeworderComponent} from './order/neworder/neworder.component';

const routes: Routes = [
    {
      path: '', component: InventoryComponent, children: [
        {
          path: '',   redirectTo: 'products', pathMatch: 'full',
        },
        {
          path: 'products',
          component: ProductComponent
        },
        {
          path: 'products/new',
          component: NewComponent
        },
        {
          path: 'orders',
          component: OrderComponent
        },
        {
          path: '/orders/neworder',
          component: NeworderComponent
        },
        {
          path: 'brands',
          component: BrandComponent
        },
        {
          path: 'categories',
          component: CategoryComponent
        },
        {
          path: 'supplier',
          component: SupplierComponent
        },
      ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InventoryRoutingModule { }
