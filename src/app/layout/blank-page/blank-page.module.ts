import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BlankPageRoutingModule } from './blank-page-routing.module';
import { BlankPageComponent } from './blank-page.component';
import { MemberComponent } from './member/member.component';
import { PermissionComponent } from './permission/permission.component';
import { ProductComponent } from './product/product.component';
@NgModule({
    imports: [CommonModule, BlankPageRoutingModule, NgbModule.forRoot(), FormsModule],
    declarations: [BlankPageComponent, MemberComponent, PermissionComponent, ProductComponent]
})
export class BlankPageModule {}
