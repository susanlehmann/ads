import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListProductModalComponent } from './list-product/list-product.component';
import { EditOrderComponent } from './edit-order/edit-order.component';

@NgModule({
  declarations: [ListProductModalComponent, EditOrderComponent],
  imports: [
    FormsModule,
    CommonModule,
    TranslateModule,
    NgbModule.forRoot()
  ]
})
export class OrderModule { }
