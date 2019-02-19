import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InventoryComponent } from './inventory.component';
import { BrandComponent } from './brand/brand.component';
import { OrderComponent } from './order/order.component';
import { CategoryComponent } from './category/category.component';
import { SupplierComponent } from './supplier/supplier.component';
import { NeworderComponent} from './order/neworder/neworder.component';
import { ListProductComponent } from './product/list-product/list-product.component';
import { ViewProductComponent } from './product/view-product/view-product.component';

const routes: Routes = [
    {
      path: '', component: InventoryComponent, children: [
        {
          path: '',   redirectTo: 'products', pathMatch: 'full',
        },
        {
          path: 'products',
          component: ListProductComponent
        },
        {
          path: 'products/:id/view',
          component: ViewProductComponent
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
